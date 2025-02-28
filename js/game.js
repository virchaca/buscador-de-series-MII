"use strict";

/*
1- crear html: select, btn, texto vamos a jugar (al arrancar la pagina) y parrafos resultados
2- dar clases a todo y traerlo a JS --> crear constantes

3 -  jugadora seleciona option en select y da CLICK al boton:
     aparece TEXTO en cuadro vamos a jugar que dice:
            - Empate: SI coinciden
            - Has Ganado! : si gana usuaria
            - Has Perdido! falle usuaria
    
4 - crear eventos y funciones manejadoras para BTN JUGAR

* recoger RESULTADO SELECT: const value= select.value;
  parrafo.innerHTML= value;

* hacer numeros aleatorios para computer:
    -const numAlea = funcion numAleatorio (1 al 9)
                    número aleatorio <= 3 -> piedra
                    número aleatorio >= 7 -> papel
                    número aleatorio 4 - 6 -> tijera ¿ELSE?

    - CONDICIONES = si el numero usuaria === numero computer --> EMPATE
                    si num usuaria
                    si num usuaria


                    piedra> tijera
                    tijar>papel
                    papel>piedra

function handleClick(event) {
   - funcion generar num aleatorio cuando btnPlayfuncion 
   - comparar select.value  con resultado numero aleatorio
}
    
cuando la usuaria selecciona una opcion y le da a jugar al btn, se genera un nuemro aleatorio y entran los condicionales --> se pinta en parrafo result si GANA, PIERDE, EMPATA
*/

/*
BONUS: Se acumulan los resultados hasta 10 vueltas
*/

//constantes
const select = document.querySelector(".js-select");
const btnPlay = document.querySelector(".js-btnPlay");
const result = document.querySelector(".js-result"); 
const playerResult = document.querySelector(".js-playerResult");
const computerResult = document.querySelector(".js-computerResult");
const pPlayer = document.querySelector(".js-playerScore");
const pComputer = document.querySelector(".js-computerScore");
const pRound = document.querySelector(".js-roundScore");
const btnInstructions = document.querySelector(".js-btnInstructions");
const instructionsList = document.querySelector(".js-instructionsList");

// Variables
let roundsPlayed = 0; //new
let playerScore = 0; //new
let computerScore = 0; //new

//funciones

function getRandomNumber(max) {
  return Math.ceil(Math.random() * max);
}

function updateScores() {
  //new
  pPlayer.innerHTML = playerScore; //new
  pComputer.innerHTML = computerScore; //new
  pRound.innerHTML = roundsPlayed; //new
}

function getResult() {
  const resultUsuaria = select.value;
  const randonNumber = getRandomNumber(9);
  console.log(randonNumber);

  if (randonNumber <= 3) {
    //piedra
    if (resultUsuaria === "piedra") {
      result.innerHTML = "Empate";
      playerResult.innerHTML = "PIEDRA";
      computerResult.innerHTML = "PIEDRA";
      roundsPlayed++;
    } else if (resultUsuaria === "papel") {
      result.innerHTML = "Has ganado";
      playerResult.innerHTML = "PAPEL";
      computerResult.innerHTML = "PIEDRA";
      playerScore++; //new
      roundsPlayed++;
    } else if (resultUsuaria === "tijera") {
      result.innerHTML = "Has Perdido";
      playerResult.innerHTML = "TIJERA";
      computerResult.innerHTML = "PIEDRA";
      computerScore++; //new
      roundsPlayed++;
    }
  } else if (randonNumber >= 7) {
    //papel
    if (resultUsuaria === "piedra") {
      result.innerHTML = "Has Perdido";
      playerResult.innerHTML = "PIEDRA";
      computerResult.innerHTML = "PAPEL";
      computerScore++; 
      roundsPlayed++;
    } else if (resultUsuaria === "papel") {
      result.innerHTML = "Empate";
      playerResult.innerHTML = "PAPEL";
      computerResult.innerHTML = "PAPEL";
      roundsPlayed++;
    } else if (resultUsuaria === "tijera") {
      result.innerHTML = "Has ganado";
      playerResult.innerHTML = "TIJERA";
      computerResult.innerHTML = "PAPEL";
      playerScore++; 
      roundsPlayed++;
    }
  } else if (randonNumber >= 4 && randonNumber <= 6) {
    //tijera
    if (resultUsuaria === "piedra") {
      result.innerHTML = "Has ganado";
      playerResult.innerHTML = "PIEDRA";
      computerResult.innerHTML = "TIJERA";
      playerScore++; 
      roundsPlayed++;
    } else if (resultUsuaria === "papel") {
      result.innerHTML = "Has perdido";
      playerResult.innerHTML = "PAPEL";
      computerResult.innerHTML = "TIJERA";
      computerScore++; 
      roundsPlayed++;
    } else if (resultUsuaria === "tijera") {
      result.innerHTML = "Empate, los dos habeis sacado TIJERA";
      playerResult.innerHTML = " TIJERA";
      computerResult.innerHTML = "TIJERA";
      roundsPlayed++;
    }
  }  
  updateScores(); //new
}

function handleClick(event) {
  event.preventDefault();
  if (roundsPlayed < 3) {
    getResult();
  } else {
    result.textContent =
      '¡Juego terminado! Haz clic en "reset" para jugar de nuevo.';
  }
}

function handleClickInstructions(event) {
  event.preventDefault();
  instructionsList.classList.toggle("hidden");
}
//eventos
btnPlay.addEventListener("click", handleClick);

btnInstructions.addEventListener("click", handleClickInstructions);

/*** a los 10 clicks se acaba la partida -- se resetea 
 * ***/

function reset() {
  if (playerScore > computerScore) {
    result.innerHTML = "Gana player!!";
  } else if (playerScore < computerScore) {
    result.innerHTML = "Gana computer!!";
  } else {
    result.innerHTML = "Empatados! Vuelve a probar!";
  }
}

let end = 0; // Inicializamos end en 0
const resetGame = document.querySelector(".js-reset");
const pEnd = document.querySelector(".js-pEnd");

btnPlay.addEventListener("click", () => {
  if (end < 4) {
    end++;
    console.log(`end: ${end}`);
    if (end === 4) {
      resetGame.classList.remove("hidden");
      pEnd.classList.remove("hidden");
      reset();
      console.log("¡El juego se detiene!");
    }
  }
});
resetGame.addEventListener("click", () => {
  location.reload();
});
