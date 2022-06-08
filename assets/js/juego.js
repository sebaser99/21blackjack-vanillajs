/**
 * 2C = Two of clubs(Tréboles)
 * 2D = Two of diamons(Diamantes)
 * 2H = Two of hearts(Corazones)
 * 2S = Two of spades(Espadas)
 */

//variables
let deck = [];
const specials = ["A", "J", "Q", "K"];
const types = ["C", "D", "H", "S"];

let pointsPlayer1 = 0;
let pointsPC = 0;

//referencias al html
const newGame = document.querySelector("#newGame");
const askCard = document.querySelector("#askCard");
const stopGame = document.querySelector("#stopGame");

const divPlayerCards = document.querySelector('#jugador-cartas');
const divPcCards = document.querySelector('#computadora-cartas'); 

const htmlPoints = document.querySelectorAll('small');

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
    deck = _.shuffle(deck)
    return deck;
}
createDeck()

const getCard = () => {
    if(deck.length === 0){
        throw "No hay cartas en el deck";
    }
    const eliminatedCard =  deck.shift()

    return eliminatedCard
}

const cardValue = (card) => {
    let valor = card.substring(0, card.length -1);
    return (isNaN(valor)) ? 
        (valor === "A") ? 11 : 10
                : valor * 1;
    
}
const pcTurn = (minPoints)=> {
    do {
        const card = getCard()
        pointsPC = pointsPC + cardValue(card);
        htmlPoints[1].innerText = pointsPC;
    
        const carta = document.createElement('img');
        carta.src = `./assets/cartas/${card}.png`;
        carta.classList.add('carta');
        divPcCards.append(carta);

        if(minPoints > 21){
            break;
        }
        
    } while((pointsPC < minPoints) && (minPoints <= 21) )

    setTimeout(()=> {
        if(pointsPC ===  pointsPlayer1) {
            alert("Empate, la máquinay tu hiceron los mismos puntos")
        } else if(minPoints > 21) {
            alert('PC Gana!!!, hiciste más de 21 puntos')
        } else if(pointsPC > 21) {
            alert("Ganaste, Pc hizo más de 21 puntos")
        } else {
            alert(`PC Gana hizo ${pointsPC} y tu ${pointsPlayer1} puntos`)
        }
    }, 200)
}


//actions
askCard.addEventListener("click", ()=> {
    const card = getCard();

    pointsPlayer1 = pointsPlayer1 + cardValue(card);
    htmlPoints[0].innerText = pointsPlayer1;

    const carta = document.createElement('img');
    carta.src = `./assets/cartas/${card}.png`;
    carta.classList.add('carta');
    divPlayerCards.append(carta);
    

    if(pointsPlayer1 > 21){
        console.warn("Lo siento, hiciste más de 21 puntos")
        askCard.disabled = true;
        stopGame.disabled = true;
        pcTurn(pointsPlayer1)
        
    } else if(pointsPlayer1 === 21){
        console.warn("Genial, hiciste 21 puntos")
        askCard.disabled = true;
        stopGame.disabled = true;
        pcTurn(pointsPlayer1)
    }
        
    
    
    
})

stopGame.addEventListener('click', ()=> {
    console.log(`Tu puntaje es de ${pointsPlayer1} puntos `);
    stopGame.disabled = true;
    askCard.disabled = true;
    pcTurn(pointsPlayer1)
    
})

newGame.addEventListener('click', ()=> {
    console.clear();
    deck = [];
    deck = createDeck();

    pointsPlayer1 = 0;
    pointsPC = 0;
    divPlayerCards.innerText = '';
    divPcCards.innerText = '';

    htmlPoints[0].innerText = 0;
    htmlPoints[1].innerText = 0;

    stopGame.disabled = false;
    askCard.disabled = false;
        
})




