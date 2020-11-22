const KEY = {
    E:101,
}


function moveToTile(element, number){
         
    let elementPos    = {x:0, y:0}
    let elementOffset = {x:42, y:-1}

    let tileVectors = [

        {x:0,y:0},
        {x:1,y:0},
        {x:2,y:0},
        {x:3,y:0},
        {x:4,y:0},
        {x:5,y:0},
        {x:6,y:0},
        {x:7,y:0},
        {x:8,y:0},  // 09
                   
        {x:8,y:1},
        {x:8,y:2},
        {x:8,y:3},
        {x:8,y:4},
        {x:8,y:5},
        {x:8,y:6},  // 15
                   
        {x:8,y:7},
        {x:7,y:7},
        {x:6,y:7},
        {x:5,y:7},
        {x:4,y:7},
        {x:3,y:7},
        {x:2,y:7},
        {x:1,y:7},
        {x:0,y:7},  // 24
                   
        {x:0,y:6},
        {x:0,y:5},
        {x:0,y:4},
        {x:0,y:3},
        {x:0,y:2},
        {x:0,y:1}   // 30
    ] 
    
    if(number > tileVectors.length){number = 1}

    elementPos.x = 120 * tileVectors[number -1].x 
    elementPos.y = 120 * tileVectors[number -1].y
    
    elementPos.x += elementOffset.x
    elementPos.y += elementOffset.y

    element.style.left = `${elementPos.x}px`
    element.style.top = `${elementPos.y}px`

    element.tile = number
}




function shuffle(array){
    let i = 0
    for (const item of array) {
        let j = Math.floor(Math.random() * (i))
        let tmpI = array[i]
        let tmpJ = array[j]
        array[i] = tmpJ
        array[j] = tmpI 
        i++
    }
    return array

function changeTurns(){
    if(activePlayer.id == 'player1'){activePlayer = player2}
    else{activePlayer = player1}
    // startRound()
    updateTurnInterface()
}





function createHTMLCard(card){
    // console.log("CreatecardTime:")
    let tileCard = document.getElementById('tileCard')
    let name = Object.keys(card)[0]
    let cardInner = `
        <h3 class="tile-card__name">${name}</h3>
        <div class="tile-card__image-container"></div>
        <ul class="tile-card__stats-container">
            <li class="tile-card__stat stats__strength id="tileCardStrenght">${ card[name].strength }</li>
            <li class="tile-card__stat stats__magic" id="tileCardMagic">${ card[name].magic }</li>
            <li class="tile-card__stat stats__life" id="tileCardLife">${ card[name].lives }</li>
        </ul>
    `
    tileCard.innerHTML = cardInner
    let cardStat = Array.from(document.getElementsByClassName('tile-card__stat'))
    cardStat.forEach(li => {
        if(li.innerText == "undefined"){hide(li)}
    });
    show(tileCard)
    tileCard.classList.add('tile-card--anim-appear')
    
    tileCard.cardInfo = card
    return tileCard
}




//DEPRECETED
function resetGraphics(){
    roleDiceButton.classList.add('hide')
}




function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }



function updateHTMLStats() {
    let strengthStatHTML    = document.getElementById('playerStrength')
    let magicStatHTML       = document.getElementById('playerMagic')
    let expStatHTML         = document.getElementById('playerExperience')
    let goldStatHTML        = document.getElementById('playerGold')
    let lifeStatHTML        = document.getElementById('playerLife')
    
    let playerNaneHTML        = document.getElementById('playerNameHTML')


    playerNaneHTML.innerText = activePlayer.stats.name
    
    strengthStatHTML.querySelector('.stinfo__number').innerText  = activePlayer.stats.strength
    magicStatHTML.querySelector('.stinfo__number').innerText     = activePlayer.stats.magic
    expStatHTML.querySelector('.stinfo__number').innerText       = activePlayer.stats.expiriance
    goldStatHTML.querySelector('.stinfo__number').innerText      = activePlayer.stats.gold
    lifeStatHTML.querySelector('.stinfo__number').innerText      = activePlayer.stats.life

}



function updateTurnInterface() {
    playerTurnLabel.innerHTML = `${activePlayer.id}'s turn`
    updateHTMLStats()
    
    updateCurrentPlayer()
    
    nextGeneratorStep("... updateTurnInterface()")
}

function endListner(element ,event, funcName){
    element.removeEventListener(event, funcName)
}


function addTmpListner(element, type, func) {
    element.addEventListener(type, function listner(){
    func()
    endListner(element, type, listner)
    })
}


function nextGeneratorStep(currentFunctionName) {
    setTimeout(() => {
        console.log(currentFunctionName)
        runStateGenerator.next()
    }, 100)
}


function updateCurrentPlayer() {
    let badgepersonUrl = null
    switch (activePlayer.stats.name) {
        case "Jon Snow":
            badgepersonUrl = "img/jonsnowbadge.svg"
            break;

        case "Daenerys Targaryen":
            badgepersonUrl = "img/deanerysbadge.svg"
            break;

        case "Tyrion Lannister":
            badgepersonUrl = "img/tyrionbadge.svg"
            break;

        case "Brienne of Tarth":
            badgepersonUrl ="img/briennebadge.svg"
            break;
    }

    document.getElementById('currentPlayerHTML').innerHTML =
        `
        <h4> ACTIVE PLAYER </h4>
        <img src="${badgepersonUrl}" alt="">
        <h4>${activePlayer.stats.name}</h4>
        `
}
