/**
 * 2C = Two of clubs(Tréboles)
 * 2D = Two of diamons(Diamantes)
 * 2H = Two of hearts(Corazones)
 * 2S = Two of spades(Espadas)
 */
const miModulo = (()=> {
    //variables
    let deck = [];
    const specials = ["A", "J", "Q", "K"],
          types = ["C", "D", "H", "S"];

    // let pointsPlayer1 = 0,
    //     pointsPC = 0;
    let playersPoints = [],
        cardsContainer = document.querySelectorAll('.cartas-contenedor');

    //referencias al html
    const newGame = document.querySelector("#newGame"),
          askCard = document.querySelector("#askCard"),
          stopGame = document.querySelector("#stopGame"),
          htmlPoints = document.querySelectorAll('small');

    //Inicializar juego
    const initilizeGame = (players = 2) => {
        switchButtons(!askCard.disabled, !stopGame.disabled)
        deck = [];
        deck = createDeck()
        playersPoints = [];
        for(let i = 0; i < players; i++){
            playersPoints.push(0);
            
        }
        console.clear();
        htmlPoints.forEach(elem => elem.innerText = 0);
        cardsContainer.forEach(elem => elem.innerText = '');
    }
    const switchButtons = (get, stop)=> {
        askCard.disabled = get
        stopGame.disabled = stop
    }
    //funciones
    const createDeck = ()=> {
        for(let i = 2; i < 10; i++){
            // deck.push(i + baraja)
            for(let type of types){
                deck.push(i + type);
            } 
        }
        for(let type of types){
            for(let special of specials){
                deck.push(special + type)
            }
        }
        return  _.shuffle(deck)  
    }

    const getCard = () => {
        if(deck.length === 0){
            throw "No hay cartas en el deck";
        }
        return deck.shift()   
    }

    const cardValue = (card) => {
        let valor = card.substring(0, card.length -1);
        return (isNaN(valor)) ? 
            (valor === "A") ? 11 : 10
                    : valor * 1; 
    }
    const createCard = (card, turno) => {
        const carta = document.createElement('img');
        carta.src = `./assets/cartas/${card}.png`;
        carta.classList.add('carta');
        cardsContainer[turno].append(carta);
    }
    const calculateWinner = (pcPoints, playerPoints) => {
        setTimeout(()=> {
            if(pcPoints ===  playerPoints) {
                alert("Empate, la máquinay tu hiceron los mismos puntos")
            } else if(playerPoints > 21) {
                alert('PC Gana!!!, hiciste más de 21 puntos')
            } else if(pcPoints > 21) {
                alert("Ganaste, Pc hizo más de 21 puntos")
            } else {
                alert(`PC Gana hizo ${pcPoints} y tu ${playerPoints} puntos`)
            }
        }, 200)
    }

    //Turno: 0 = computador .length -1 = computadora
    const accumulatePoints = (card, turn) => {
        playersPoints[turn] = playersPoints[turn] + cardValue(card);
        htmlPoints[turn].innerText = playersPoints[turn];
        return playersPoints[turn]
    }
    const player1Result = (player1Points) => {
        if(player1Points > 21){
            console.warn("Lo siento, hiciste más de 21 puntos")
            switchButtons(!askCard.disabled, !stopGame.disabled)
            pcTurn(player1Points)
            
        } else if(player1Points === 21){
            console.warn("Genial, hiciste 21 puntos")
            switchButtons(!askCard.disabled, !stopGame.disabled)
            pcTurn(player1Points)
        } 
    }

    const pcTurn = (minPoints)=> {
        console.log(`Tu puntaje es de ${minPoints} puntos `);
        const card = getCard()
        do {
            accumulatePoints(card, playersPoints.length -1)
            createCard(card, playersPoints.length -1)
        } while((playersPoints[playersPoints.length - 1] < minPoints) && (minPoints <= 21) )

        calculateWinner(playersPoints[playersPoints.length - 1], minPoints);
    }


    //actions
    askCard.addEventListener("click", ()=> {
        const card = getCard()
        accumulatePoints(card, 0)
        createCard(card, 0);
        player1Result(playersPoints[0]);  
    })

    stopGame.addEventListener('click', ()=> {
        switchButtons(!askCard.disabled, !stopGame.disabled)
        pcTurn(playersPoints[0])
        
    })

    // newGame.addEventListener('click', ()=> {
    //     initilizeGame();
         
    // })

    return {
        nuevoJuego: initilizeGame
    }
})()



