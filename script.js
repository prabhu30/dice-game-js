"use strict";

const dice = document.querySelector(".dice");
const btnNewGame = document.querySelector(".btn--new");
const btnRollDice = document.querySelector(".btn--roll");
const btnHoldDice = document.querySelector(".btn--hold");
const playerZeroScore = document.querySelector("#score--0");
const playerOneScore = document.querySelector("#score--1");
const playerZeroCurrentScore = document.querySelector("#current--0");
const playerOneCurrentScore = document.querySelector("#current--1");
const playerZero = document.querySelector(".player--0");
const playerOne = document.querySelector(".player--1");

let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];

// Reset Styles on New Game
const reset = function () {
  currentScore = 0;
  scores[0] = 0;
  scores[1] = 0;
  
  dice.classList.add("hidden");
  playerZeroScore.textContent = 0;
  playerOneScore.textContent = 0;

  playerZeroCurrentScore.textContent = 0;
  playerOneCurrentScore.textContent = 0;

  document.querySelector(`#name--${activePlayer}`).textContent = `Player ${activePlayer + 1}`;
  document.querySelector(`.player--${activePlayer}`).classList.remove("player--winner");

  playerZero.classList.add("player--active");
  playerOne.classList.remove("player--active");

  activePlayer = 0;
};

reset();

// Switch Player Turn
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;

  playerZero.classList.toggle("player--active");
  playerOne.classList.toggle("player--active");
};

// Roll Dice Function
const rollDice = function () {
  if ( !document.querySelector(`.player--${activePlayer}`).classList.contains("player--winner") ) {
    const diceNum = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove("hidden");
    dice.src = `assets/dice-${diceNum}.png`;

    if (diceNum === 1) {
      switchPlayer();
    } else {
      currentScore += diceNum;
      document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
    }
  }
};

// Hold the Dice Score
const holdScore = function () {
  scores[activePlayer] += currentScore;

  document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];

  if (scores[activePlayer] >= 100) {
    document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
    document.querySelector(`#name--${activePlayer}`).textContent += ' wins';
    document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
    dice.classList.add("hidden");
    currentScore = 0;
  } else {
    switchPlayer();
  }
};

btnNewGame.addEventListener("click", reset);

btnRollDice.addEventListener("click", rollDice);

btnHoldDice.addEventListener("click", holdScore);
