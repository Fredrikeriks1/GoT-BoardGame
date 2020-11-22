let victoryEmblem = document.getElementById('victoryEmblem')
        let playerInstructions = document.getElementById('playerInstructions')
        let coatOfArms = document.getElementById('coatOfArms')
        
        
        let victor = JSON.parse (sessionStorage.getItem('victor'))
        console.log(victor.stats.name)
        
        switch (victor.stats.name) {
            case "Jon Snow":
                victoryEmblem.setAttribute('src', "img/winnerjonsnowbadge.svg") 
                playerInstructions.innerText = `Congratulations “${victor.stats.name}”, you reached The North on your own`
                coatOfArms.setAttribute('src', "img/wolfheadbadge.svg")
                break;
        
            
            case "Daenerys Targaryen":
                victoryEmblem.setAttribute('src', "img/winnerdeanerysbadge.svg")
                playerInstructions.innerText = `Congratulations “${victor.stats.name}”, you reached The North on your own`
                coatOfArms.setAttribute('src', "img/dragonbadge.svg")
                break;
        

            case "Tyrion Lannister":
                victoryEmblem.setAttribute('src', "img/winnertyrionbadge.svg") 
                playerInstructions.innerText = `Congratulations “${victor.stats.name}”, you reached The North on your own`
                coatOfArms.setAttribute('src', "img/lionbadge.svg")
                break;
        

            case "Brienne of Tarth":
                victoryEmblem.setAttribute('src', "img/winnerbriennebadge.svg") 
                playerInstructions.innerText = `Congratulations “${victor.stats.name}”, you reached The North on your own`
                coatOfArms.setAttribute('src', "img/stagbadge.svg")
                break;
        
            
        }

        document.getElementById('playButton').addEventListener('click', e =>{
            window.location.href = "char.html"
        })
