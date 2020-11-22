const STATE = {
    GAME_BASICS:"GAME_BASICS",

    MOVE_DICE:"MOVE_DICE",

    MOVE_PLAYER:"MOVE_PLAYER",

    FINISH_ROUND:"FINISH_ROUND",

    SKIP_THIS_ROUND:"SKIP_THIS_ROUND",

    MOVE_X_SPACES:"MOVE_X_SPACES",

    SCORE_DRAW:"SCORE_DRAW"

}

let currentStat = STATE.GAME_BASICS

function * stateMachine() {
    switch (currentStat) {
        

        case STATE.GAME_BASICS:
            yield checkRoundModifiers()
            yield swapState(STATE.MOVE_DICE)
        break


        case STATE.MOVE_DICE:
            yield moveButtnConfig()
            yield swapState(STATE.MOVE_PLAYER)
        break
            

        case STATE.MOVE_PLAYER:
            yield movePlayer(diceRollCount)
            yield movingTile()
            yield movingTileNextFunction()
        break
        

        case STATE.FINISH_ROUND:
            yield checkForExtraRound()
            yield isLastRound()
            yield swapTurns()
            console.log("END OF GAME")
            console.log(activePlayer.stats.name)
            swapState(STATE.GAME_BASICS) 
        break
   

        case STATE.SKIP_THIS_ROUND:
            yield swapState(STATE.FINISH_ROUND) 
        break
        
        
        case STATE.MOVE_X_SPACES:
            yield movePlayer(xSpaces)
            xSpaces = 0
            yield swapState(STATE.FINISH_ROUND)
        break
        
        case STATE.SCORE_DRAW:
            yield swapTurns()
            console.log("DRAW ROUND")
            console.log(activePlayer.stats.name)
            yield setupDrawDiceButtn()
            yield checkDrawDiceWinner()
            yield swapState(STATE.SCORE_DRAW)
        break

    }
    
    
}


let runStateGenerator = stateMachine()

function swapState(newState) {
    currentStat = newState
    runStateGenerator = stateMachine()
    nextGeneratorStep(`... swapState(${newState})`)
}

function isLastRound() {
    if(endGame && oneLastRound){
            oneLastRound = false
            console.log("One More Round")
            return nextGeneratorStep("... isLastRound()")
    }
    if(endGame){
        if(playersFinsihed.length == 1){ 
            console.log(playersFinsihed[0].stats.name, "reached the end alone")
            victory(playersFinsihed[0]) 
        }
        else if(player1.overflowSteps == player2.overflowSteps){
            return swapState(STATE.SCORE_DRAW)
        }else{
            console.log("overflowSteps: ", player1.overflowSteps, " | ", player2.overflowSteps)
            if(player1.overflowSteps > player2.overflowSteps){
                return victory(player1)
            }else{
                return victory(player2)
            }
            
        }
        
    }
    else{nextGeneratorStep("... isLastRound()")}
   
}

function checkDrawDiceWinner() {
    if(player1.gameDrawDiceThrow > 0 && player2.gameDrawDiceThrow > 0){
        
        if(player1.gameDrawDiceThrow == player2.gameDrawDiceThrow){
            console.log("round was a draw ")
            player1.gameDrawDiceThrow = null
            player2.gameDrawDiceThrow = null
        }else{

            if(player1.gameDrawDiceThrow > player2.gameDrawDiceThrow){
                return victory(player1)
            }else{ 
                return victory(player2)
            }
        }
    }
    nextGeneratorStep("... checkDrawDiceWinner")
}


let extraRound = false
let endGame = false
let oneLastRound = false


function checkForExtraRound() {

    if(extraRound){
        swapState(STATE.GAME_BASICS)
        extraRound = false
    }
    else{nextGeneratorStep("... checkForExtraRound()")}
}

let playerHasInteracted = false

function moveButtnConfig() {
    diceButton.focus()

    addTmpListner(diceButton,'click', function (){
        playerHasInteracted = true
        diceRoll()
        if(diceRollCount == 6){extraRound = true}

        setTimeout( () => nextGeneratorStep("... moveButtnConfig()"), 1500)
     })
}


function setupDrawDiceButtn() {
    diceButton.focus()

    addTmpListner(diceButton,'click', function (){
        diceRoll()
        activePlayer.gameDrawDiceThrow = diceRollCount
        setTimeout( () => nextGeneratorStep("... setupDrawDiceButtn()"), 1000)
        
    })
}


function checkRoundModifiers(){

    switch(activePlayer.roundModifer.shift()){
        case "SKIP_THIS_ROUND":
            swapState(STATE.SKIP_THIS_ROUND)

        break
        case STATE.SCORE_DRAW:
            swapState(STATE.SCORE_DRAW)
        break

        default:
        nextGeneratorStep("... checkRoundModifiers()")
    }
    
}


function victory(player) {
    console.log(player.stats.name, " is Victoris!")
    sessionStorage.setItem('victor' ,JSON.stringify(player))
    
    setTimeout( () => window.location.href = "end.html", 1000)
}


let movingTileNextFunction

function movingTile(){
    let tileNumber = activePlayer.tile - 1
    let tileInfo = allHTMLTiles[tileNumber].tileDitails
    console.log("movingTile: " ,tileInfo.movingTile)
    switch(tileInfo.movingTile){


        case movingTileList.DICE_OUTCOME:
            
            break

            
        case movingTileList.SKIP_THIS_ROUND:
            activePlayer.roundModifer.push('SKIP_THIS_ROUND')
            movingTileNextFunction = swapState.bind(null, STATE.FINISH_ROUND)
            break
        

        case movingTileList.MOVE_X_SPACES:
            xSpaces = tileInfo.xSpaces
            
            movingTileNextFunction = swapState.bind(null, STATE.MOVE_X_SPACES)
            break    
        

        case movingTileList.EMPTY_TILE:
            movingTileNextFunction = swapState.bind(null, STATE.FINISH_ROUND)
            break
            
            
        default:
            movingTileNextFunction = swapState.bind(null, STATE.FINISH_ROUND)
        
    }
    console.log(movingTile)
    if(tileInfo.movingTile == movingTileList.EMPTY_TILE){return nextGeneratorStep("... Empty Tile")}

    dialogElement.querySelector('h2').innerText = tileInfo.name 
    dialogElement.querySelector('h4').innerText = tileInfo.movingTile 
    dialogElement.querySelector('p').innerText = tileInfo.flavorText 
    dialogElement.classList.remove('hide')
    dialogElement.classList.toggle('anim-dialog-hide')
    dialogElement.querySelector('button').focus()
    
    addTmpListner(dialogElement, 'click', function () {
        dialogElement.classList.toggle('anim-dialog-hide')
        nextGeneratorStep("... dialogButton")
    })
}

//# Deprecated
function endRound(){
    // initialise extra round
    if(extraRound){
        startRound()
        extraRound = false
        return
    }
    
    swapTurns()
    swapState(STATE.GAME_BASICS)
}


function evaluateDrawnTileCard(tileCardHTML) {
    
        let card = tileCardHTML.cardInfo
        const cardType = card[Object.keys(card)[0]].cardType
        let tmpListner = tileCardHTML.addEventListener("animationend", e =>{
            this.removeEventListener("animationend", tmpListner)
            switch (cardType){
    
                case "FIGHT":
                    setTimeout(e => startFight(card), 500)
                    break
            }
        })
}

function startFight(enemy) {
    playerStamina = 0
    EnemyStamina = 0

    show(diceButton)
    // diceButton.addEventListener('click', 
    // function listner() {

    
    addTmpListner(diceButton,'click', function (){
    diceRoll(
    playerDiceStamina => {
        
        playerStamina += playerDiceStamina
        if('strength' in enemy[Object.keys(enemy)[0]]){
            playerStamina += activePlayer.stats.strength
            showStaminaLabel("Player", activePlayer.stats.strength, null, playerDiceStamina)
        }
        if('magic' in enemy[Object.keys(enemy)[0]]){
            playerStamina += activePlayer.stats.magic
            showStaminaLabel("Player", null, activePlayer.stats.magic, playerDiceStamina)
        } 
        
    }, 

    diceRoll(
    enemyDiceStamina => {
        console.log("enemyDiceStamina: ", enemyDiceStamina)

        let strengthStat = document.getElementById("tileCardStrenght")
        let magicStat = document.getElementById("tileCardMagic")
        
        console.log(strengthStat)

        enemyStamina += enemyDiceStamina
        if('strength' in enemy[Object.keys(enemy)[0]]){
            enemyStamina += activePlayer.stats.strength
            showStaminaLabel("Player", activePlayer.stats.strength, null, enemyDiceStamina)
        }
        if('magic' in enemy[Object.keys(enemy)[0]]){
            enemyStamina += activePlayer.stats.magic
            showStaminaLabel("Player", null, activePlayer.stats.magic, enemyDiceStamina)
        } 
        
    }))

    function showStaminaLabel(actor, strength, magic, diceStamina){    

        if(actor == "Player"){
            show(playerStaminaLabel)
            playerStaminaLabel.innerText = 
            `Player Stamina: ${(strength)? strength:magic} + ${diceStamina} = ${playerStamina}`
        }
        if(actor == "Enemy"){
            show(enemyStaminaLabel)
            enemyStaminaLabel.innerText = 
            `Player Stamina: ${(strength)? strength:magic} + ${diceStamina} = ${playerStamina}`
        }
    }

    // endListner(diceButton, 'click',listner)
    })
}


function elementPos(obj){return obj.getClientRects()[0]}


let diceRollCount = null

function diceRoll(actingFuction){
    // hide(diceButton)
    let randCount = Math.round(Math.random() * 5 + 1)
    showAnimation(randCount)

    diceCountLabel.innerHTML = randCount
    show(diceCountLabel)
    diceRollCount = randCount
}


const boardMovmentSpeed = 200 
let playersFinsihed = []

function movePlayer(steps, nextFunction){
    
    let signNr = Math.sign(steps)
    
    let moveInterval = setInterval(() => {  

        if(isOnLastTile(steps)){
            clearInterval(moveInterval)
            return swapState(STATE.FINISH_ROUND)
        }


        moveToTile(activePlayer, activePlayer.tile + signNr)
        
        console.log("steps: ", steps)
        steps -= signNr
        if(steps == 0){
            console.log("end tile: ", activePlayer.tile)
            diceRollCount = null
            clearInterval(moveInterval)
            nextGeneratorStep("... movePlayer()") 
        }
    }, boardMovmentSpeed)
}

// Is it last tile? 

function isOnLastTile(steps) {
    
    if(activePlayer.tile == 30 && steps >= 1){

        console.log("steps when on tile 30: ", steps)
        //last round...
        if(player1 == activePlayer){
            player1.overflowSteps = steps
            playersFinsihed.push(player1)
            oneLastRound = true
            console.log("player1: ", player1.stats.name, "  :  oneLastRound: ", oneLastRound )
        }
        if(player2 == activePlayer){
            player2.overflowSteps = steps
            playersFinsihed.push(player2)
        }
        endGame = true

        extraRound = false

        console.log(activePlayer.stats.name, "overflowSteps: ", activePlayer.overflowSteps)
        console.log("oneLastRound: ", oneLastRound)
        return true
    }    
}

function drawCard() {
    let card = tileCardDeck.shift() 
    let tileCardHTML = createHTMLCard(card)
    return tileCardHTML
}


function startRound(){
    console.log("_START_")
    console.log(activePlayer.stats.name)
    swapState(STATE.GAME_BASICS)
}

function showAnimation(number) {
    let diceImg = [
        'img/onedot.svg',
        'img/twodot.svg',
        'img/threedot.svg',
        'img/fourdot.svg',
        'img/fivedot.svg',
        'img/sixdot.svg'
    ]

    diceButton.classList.add('dice-roll-anim')
    setTimeout(() => {
        diceButton.setAttribute('src', diceImg[number -1])
    },500)
    setTimeout( () => diceButton.classList.remove('dice-roll-anim'), 1500)
}


setTimeout( () => {

    if(playerHasInteracted == false){
        document.getElementById('errorAlert').classList.add('warning')
    }

}, 5000)

