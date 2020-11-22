let informationBox = document.getElementById('informationBox')
let shieldItems = document.getElementsByClassName("shield-item")

let selectedCharacter = []

for (const item of shieldItems) {
    item.addEventListener("click", e => {

        item.classList.toggle('badge-item-focus')
        if(item.classList.contains('badge-item-focus')){
            selectedCharacter.push(item)
        }else{
            selectedCharacter = selectedCharacter.filter(i => i !== item)
        }
        if(selectedCharacter.length > 2){
            informationBox.classList.add('invisable')
            for (const schars of selectedCharacter) {
                schars.classList.toggle('badge-item-focus')
            }
            selectedCharacter = []
            document.getElementById('errorAlert').classList.remove('warning')
            setTimeout(() =>{
                document.getElementById('errorAlert').classList.add('warning')
            }, 100)

        }else{

            informationBox.classList.remove('invisable')
            showPlayerInfo (getCharacterByHTMLValue(item))
        }
        if(selectedCharacter.length == 2){
            playButton.classList.remove('invisable')
            playButtonListner = playButton.addEventListener('click', () => {
                
                player1 = getCharacterByHTMLValue (selectedCharacter[0])
                player2 = getCharacterByHTMLValue (selectedCharacter[1])

                sessionStorage.setItem('player1', JSON.stringify(player1))
                sessionStorage.setItem('player2', JSON.stringify(player2))
                

                window.location.href = "gotgame.html"

            })
        }else{
            playButton.removeEventListener('click',playButtonListner)
            playButton.classList.add('invisable')
        }
    })    
}


function showPlayerInfo(character) {
    document.getElementById('chracterName').innerText       = character.name
    document.getElementById('ancestralWeapons').innerText   = character.ancestralWeapons
    document.getElementById('coatOfArms').innerText         = character.coatOfArms
    document.getElementById('house').innerText              = character.house
    document.getElementById('charcterAlias').innerText      = character.alias
    document.getElementById('characterTitle').innerText     = character.title
    document.getElementById('houseWords').innerText         = character.words

}


function getCharacterByHTMLValue(item) {
    switch (item.getAttribute('value')) {
                
        case 'jon': return playableCharacters[0]
        
        case 'danny': return playableCharacters[1]
        
        case 'tyri': return playableCharacters[2]

        case 'brien': return playableCharacters[3]
    }
}


let playButton = document.getElementById('playButton')
let playButtonListner = null


let player1
let player2


let playableCharacters = 
    [
        {
            name:"Jon Snow", 
            ID:583,
            modefiers:[]
        },
        {
            name:"Daenerys Targaryen", 
            ID:1303,
            modefiers:[]
        },
        {
            name:"Tyrion Lannister", 
            ID:1052,
            modefiers:[]
        },
        {
            name:"Brienne of Tarth",
            ID:216,
            modefiers:[]
        }
    ]

    
        
function fetchCharacter(charcterObject){
    let returnCharacter = {}
    
    fetch('https://anapioficeandfire.com/api/characters/' + charcterObject.ID)
        .then(respons => respons.json())
        .then(json => {


            charcterObject.name = json.name
            charcterObject.title = (json.titles.length != 0) ? json.titles[0] : "None"
            charcterObject.alias = (json.aliases.length
            != 0) ? json.aliases[0] : "None"

            fetch(json.allegiances[0])
                .then(respons => respons.json())
                .then(json => {

                    charcterObject.house = json.name
                    charcterObject.coatOfArms = json.coatOfArms
                    charcterObject.words = json.words
                    charcterObject.ancestralWeapons = json.ancestralWeapons 
                    // console.log(returnCharacter);
                    // charcterObject.stats = charcterObject
            })
            .then( () => {
                // console.log(charcterObject)
                return charcterObject
            })
        })
        .catch(error => console.log("ERROR!",error))
        
}

for (let character of playableCharacters) {
    character = fetchCharacter(character) 
}

function fadeEffect(type) {
    switch (type) {
        case 'FADE_OUT':
            
            break;
        case 'FADE_INN':
            
            break;
    }
    if(document.getElementById('fadeBox')){
        let fadeBox = document.getElementById('fadeBox')
        let parent = fadeBox.parentElement
        console.log(parent)
        parent.removeChild(fadeBox)
        console.log(parent)
    }
    let fadeHtml = `
        <style id="fadeAnimStyle">
        #fadeBox{
            top: 0;
            left: 0;
            position: absolute;
            z-index: 9999;
            width: 200%;
            height: 200%;
            background: black;
        }
        .fade-inn{
            animation: anim-fade-inn 1s forwards
        }
        @keyframes anim-fade-inn{
            0%      {opacity: 1;}
            100%    {opacity: 0; z-index: -1;}
        }
        .fade-out{
            animation: anim-fade-out 1s forwards
        }
        @keyframes anim-fade-out{
            0%        {opacity: 0;}
            100%      {opacity: 1; z-index: 9999;}
        }
        </style>
        <div id="fadeBox" class="fade-out"></div>
    `
}
