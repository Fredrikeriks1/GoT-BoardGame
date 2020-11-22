let tiles = document.getElementsByClassName('tile')
let player1 = document.getElementById('player1')
let player2 = document.getElementById('player2')

let activePlayer = player1
let playerTurnLabel = document.getElementById('playerTurnLabel')


let diceButton = document.getElementById('graphicDiceBtn')
let diceNumberLabel = document.getElementById('diceNumberLabel')


let enemyStaminaLabel = document.getElementById('enemyStaminaLabel')
let playerStaminaLabel = document.getElementById('playerStaminaLabel')


let dialogElement = document.getElementById('informationDialog')




function show(element) {element.classList.remove('hide')}
function hide(element) {element.classList.add('hide')}


const movingTileList = {
    SKIP_THIS_ROUND : "SKIP_THIS_ROUND",
    DRAW_CARD       : "DRAW_CARD",
    DICE_OUTCOME    : "DICE_OUTCOME",
    STORE           : "STORE",
    OTHER_LAND      : "OTHER_LAND",
    MOVE_X_SPACES   : "MOVE_X_SPACES",
    EMPTY_TILE      : "EMPTY_TILE",
}

let tileDetialsCard = document.getElementById('tileDetialsCard')

const tileDitails = [
    {
        nr:1,
        name:"Kings Landing",
        // movingTile:movingTileList.DRAW_CARD,
        flavorText:""
    },
    {
        nr:2,
        name:"tile",
        movingTile:movingTileList.SKIP_THIS_ROUND,
        flavorText:""
    },
    {
        nr:3,
        name:"tile",
        movingTile:movingTileList.EMPTY_TILE,
        flavorText:""
    },
    {
        nr:4,
        name:"tile",
        movingTile:movingTileList.EMPTY_TILE,
        flavorText:""
    },
    {
        nr:5,
        name:"tile",
        movingTile:movingTileList.SKIP_THIS_ROUND,
        flavorText:""
    },
    {
        nr:6,
        name:"tile",
        movingTile:movingTileList.EMPTY_TILE,
        flavorText:""
    },
    {
        nr:7,
        name:"tile",
        movingTile:movingTileList.MOVE_X_SPACES,
        flavorText:"",
        xSpaces: -1
    },
    {
        nr:8,
        name:"tile",
        movingTile:movingTileList.SKIP_THIS_ROUND,
        flavorText:""
    },
    {
        nr:9,
        name:"tile",
        movingTile:movingTileList.EMPTY_TILE,
        flavorText:""
    },
    {
        nr:10,
        name:"tile",
        movingTile:movingTileList.EMPTY_TILE,
        flavorText:""
    },
    {
        nr:11,
        name:"tile",
        movingTile:movingTileList.SKIP_THIS_ROUND,
        flavorText:""
    },
    {
        nr:12,
        name:"tile",
        movingTile:movingTileList.MOVE_X_SPACES,
        flavorText:"",
        xSpaces: -3
    },
    {
        nr:13,
        name:"tile",
        movingTile:movingTileList.EMPTY_TILE,
        flavorText:""
    },
    {
        nr:14,
        name:"tile",
        movingTile:movingTileList.SKIP_THIS_ROUND,
        flavorText:""
    },
    {
        nr:15,
        name:"tile",
        movingTile:movingTileList.EMPTY_TILE,
        flavorText:""
    },
    {
        nr:16,
        name:"tile",
        movingTile:movingTileList.MOVE_X_SPACES,
        flavorText:"",
        xSpaces: 3
    },
    {
        nr:17,
        name:"tile",
        movingTile:movingTileList.EMPTY_TILE,
        flavorText:""
    },
    {
        nr:18,
        name:"tile",
        movingTile:movingTileList.EMPTY_TILE,
        flavorText:""
    },
    {
        nr:19,
        name:"tile",
        movingTile:movingTileList.SKIP_THIS_ROUND,
        flavorText:""
    },
    {
        nr:20,
        name:"tile",
        movingTile:movingTileList.MOVE_X_SPACES,
        flavorText:"",
        xSpaces: 2
    },
    {
        nr:21,
        name:"tile",
        movingTile:movingTileList.EMPTY_TILE,
        flavorText:""
    },
    {
        nr:22,
        name:"tile",
        movingTile:movingTileList.EMPTY_TILE,
        flavorText:""
    },
    {
        nr:23,
        name:"tile",
        movingTile:movingTileList.EMPTY_TILE,
        flavorText:""
    },
    {
        nr:24,
        name:"tile",
        movingTile:movingTileList.SKIP_THIS_ROUND,
        flavorText:""
    },
    {
        nr:25,
        name:"tile",
        movingTile:movingTileList.MOVE_X_SPACES,
        flavorText:"",
        xSpaces: 3
    },
    {
        nr:26,
        name:"tile",
        movingTile:movingTileList.SKIP_THIS_ROUND,
        flavorText:""
    },
    {
        nr:27,
        name:"tile",
        movingTile:movingTileList.EMPTY_TILE,
        flavorText:""
    },
    {
        nr:28,
        name:"tile",
        movingTile:movingTileList.MOVE_X_SPACES,
        flavorText:"",
        xSpaces: -5
    },
    {
        nr:29,
        name:"tile",
        movingTile:movingTileList.EMPTY_TILE,
        flavorText:""
    },
    {
        nr:30,
        name:"tile",
        movingTile:movingTileList.MOVE_X_SPACES,
        flavorText:"",
        xSpaces: -10
    }
]
let allHTMLTiles = []
function polulateTileDetails(){

    ['topTiles','rightTiles','bottomTiles','leftTiles'].forEach(section => {
        section = document.getElementById(section).children
        Array.prototype.slice.call(section)
        .filter(item => item.nodeName == "LI")
        .map(item => allHTMLTiles.push(item))
    })

    let i = 0
    allHTMLTiles.forEach(element => {
        element.tileDitails = tileDitails[i]
        element.addEventListener('mouseover', e => {
            let ditails = element.tileDitails
            tileDetialsCard.querySelector('h2').innerText = ditails.tile
            tileDetialsCard.querySelector('h3').innerText = ditails.movingTile
        })
        i++
    });
}




let tileCardDeck = []

function fetchTileCardDeck(){
    fetch("./tileCards.json")
    .then(response => response.json())
    .then(json => {
        tileCardDeck = Object.keys(json[0]).map(key => {
            json[0][key].name = key
            let tmpObj = {}
            tmpObj[key] = json[0][key]
            return tmpObj   
        })   
    })
    .then(e => {
        tileCardDeck = shuffle(tileCardDeck)
    })
}


fetchTileCardDeck()

let gameInterval

function onReady(){

    polulateTileDetails()
    

    
    player1.stats = JSON.parse(sessionStorage.getItem('player1'))
    player2.stats = JSON.parse(sessionStorage.getItem('player2'))

    player1.tile = 1
    player2.tile = 1

    moveToTile(player1, player1.tile)
    moveToTile(player2, player2.tile)


    player1.roundModifer = []
    player2.roundModifer = []

    player1.overflowSteps = 0
    player2.overflowSteps = 0

    player1.gameDrawDiceThrow = null
    player2.gameDrawDiceThrow = null

    setRightBoardPiece(player1, document.getElementById('player1Img'))
    setRightBoardPiece(player2, document.getElementById('player2Img'))

    updateCurrentPlayer()
    updateHTMLStats()
    startRound()

}

document.addEventListener('DOMContentLoaded', onReady)


function setRightBoardPiece(player, piceImg) {
    
    
    player2.boardPieceImg = document.getElementById('player2Img')

    let allBoardPieceURLs = [
        'img/wolfheadpiece.svg',
        'img/stagpiece.svg',
        'img/dragonpiece.svg',
        'img/lionpiece.svg'
    ] 

    switch (player.stats.name) {
        case 'Jon Snow':
            piceImg.setAttribute('src',allBoardPieceURLs[0])
            break;
    
        case 'Brienne of Tarth':
            piceImg.setAttribute('src',allBoardPieceURLs[1])
            break;
    
        case 'Daenerys Targaryen':
            piceImg.setAttribute('src',allBoardPieceURLs[2])
            break;
    
        case 'Tyrion Lannister':
            piceImg.setAttribute('src',allBoardPieceURLs[3])
            break;
    
        default:
            break;
    }
}
