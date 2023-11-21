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

const setActivePlayer = function (player) {
  if (player === "playerZero") {
    playerZero.classList.add("player--active");
    playerOne.classList.remove("player--active");
  } else {
    playerOne.classList.add("player--active");
    playerZero.classList.remove("player--active");
  }
  playerOneCurrentScore.textContent = 0;
  playerZeroCurrentScore.textContent = 0;
};

const getActivePlayer = function () {
  const playerActive = document.querySelector(".player--active");
  return playerActive;
};

const switchPlayer = function () {
  getActivePlayer().classList.contains("player--0")
    ? setActivePlayer("playerOne")
    : setActivePlayer("playerZero");
};

let currentScore = 0;
const rollDice = function () {
  if (!getActivePlayer().classList.contains("player--winner")) {
    const diceNum = Math.trunc(Math.random() * 6) + 1;
    x;
    dice.classList.remove("hidden");
    dice.src = `dice-${diceNum}.png`;

    if (diceNum === 1) {
      currentScore = 0;
      switchPlayer();
    } else {
      currentScore += diceNum;
      getActivePlayer().children[2].children[1].textContent = currentScore;
    }
  }
};

const holdScore = function () {
  getActivePlayer().children[1].textContent =
    Number(getActivePlayer().children[1].textContent) + currentScore;

  if (Number(getActivePlayer().children[1].textContent) >= 100) {
    getActivePlayer().classList.add("player--winner");
    dice.classList.add("hidden");
  } else {
    currentScore = 0;
    getActivePlayer().children[2].children[1].textContent = currentScore;
    switchPlayer();
  }
};

const reset = function () {
  dice.classList.add("hidden");
  playerZeroScore.textContent = 0;
  playerOneScore.textContent = 0;
  setActivePlayer("playerZero");
};

reset();

btnNewGame.addEventListener("click", reset);

btnRollDice.addEventListener("click", rollDice);

btnHoldDice.addEventListener("click", holdScore);
