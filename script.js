"use strict";

const closeModalBtn = document.querySelectorAll(".btn-close-modal");
const rulesBtn = document.querySelector(".btn-rules");
const modalBox = document.querySelector(".modal-box");
const overlay = document.querySelector(".overlay");
const selectionStage = document.querySelector(".selection-stage");
const duelStage = document.querySelector(".duel-stage");
const playerPlaceholder = document.querySelector(".player-placeholder");
const opponentPlaceholder = document.querySelector(".opponent-placeholder");
const resultsContainer = document.querySelectorAll(".results-container");
const playAgainBtn = document.querySelectorAll(".btn-play-again");
const scoreResult = document.querySelector(".score-result");
let playerSymbol, opponentSymbol;
let currentScore = 0;

closeModalBtn.forEach((btn) =>
  btn.addEventListener("click", function () {
    modalBox.classList.add("hidden");
    overlay.classList.add("hidden");
  })
);

rulesBtn.addEventListener("click", function () {
  modalBox.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

duelStage.addEventListener("click", function (e) {
  console.log(e.target.classList);
  if (e.target.classList.contains("btn-play-again")) playAgain();
});

selectionStage.addEventListener("click", function (e) {
  const el = e.target.closest(".symbol-container");
  if (!el) return;
  playerSymbol = el.id;
  opponentSymbol = generateSymbol();
  console.log(playerSymbol, opponentSymbol);
  selectionStage.classList.add("hidden");
  duelStage.classList.remove("hidden");
  setTimeout(() => {
    createSymbol(playerSymbol, playerPlaceholder);
    setTimeout(() => {
      createSymbol(opponentSymbol, opponentPlaceholder);
      setTimeout(() => {
        playGame(playerSymbol, opponentSymbol);
      }, 500);
    }, 500);
  }, 500);
});

const generateSymbol = () => {
  let randomSymbol;
  const randomNumber = Math.floor(Math.random() * 3) + 1;
  if (randomNumber === 1) randomSymbol = "rock";
  if (randomNumber === 2) randomSymbol = "paper";
  if (randomNumber === 3) randomSymbol = "scissors";
  return randomSymbol;
};

const checkResult = function (player, opponent) {
  let result;
  if (player === "rock")
    opponent === "paper" ? (result = "lose") : (result = "win");
  if (player === "paper")
    opponent === "scissors" ? (result = "lose") : (result = "win");
  if (player === "scissors")
    opponent === "rock" ? (result = "lose") : (result = "win");
  if (player === opponent) result = "draw";
  return result;
};

const playGame = function (player, opponent) {
  const result = checkResult(player, opponent);
  const playerSymbol = document.querySelector(".player-symbol");
  const opponentSymbol = document.querySelector(".opponent-symbol");
  if (result === "win") {
    currentScore++;
    playerSymbol.classList.add("winner");
  }
  if (result === "lose") {
    currentScore--;
    opponentSymbol.classList.add("winner");
  }
  result === "draw" ? playAgain() : showResults(result);
  updateScore(currentScore);
  console.log(result, currentScore);
};

const showResults = function (result) {
  const html = `
  <span class="result-info">you ${result}</span>
  <button class="btn-play-again">play again</button>`;
  resultsContainer.forEach((container) => {
    container.classList.remove("hidden");
    container.insertAdjacentHTML("afterbegin", html);
  });
};

const createSymbol = function (symbol, position) {
  const html = `
  <div id="${symbol}" class="symbol-container ${
    position === playerPlaceholder ? "player-symbol" : "opponent-symbol"
  }">
    <div class="inner-circle">
      <img src="images/icon-${symbol}.svg" alt="" />
    </div>
  </div>`;
  console.log(html, position);
  position.insertAdjacentHTML("beforebegin", html);
  position.classList.add("hidden");
};

const clearSymbol = function (position) {
  position.previousSibling.remove();
};

const playAgain = function () {
  duelStage.classList.add("hidden");
  selectionStage.classList.remove("hidden");
  clearSymbol(playerPlaceholder);
  clearSymbol(opponentPlaceholder);
  playerPlaceholder.classList.remove("hidden");
  opponentPlaceholder.classList.remove("hidden");
  resultsContainer.forEach((container) => (container.innerHTML = ""));
};

const updateScore = function (score) {
  scoreResult.innerHTML = "";
  scoreResult.innerHTML = score;
};
