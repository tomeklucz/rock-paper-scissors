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

/* ROCK, PAPER, SCISSORS GAME APP */
const gameApp = function () {
  let playerSymbol, opponentSymbol;
  let currentScore = 0;
  const timeDelay = 500;

  /* EVENT LISTENERS */
  /* showing modal window with rules */
  rulesBtn.addEventListener("click", function () {
    show(modalBox);
    show(overlay);
    document.body.classList.add("overflow");
  });

  /* closing modal window */
  closeModalBtn.forEach((btn) =>
    btn.addEventListener("click", function () {
      hide(modalBox);
      hide(overlay);
      document.body.classList.remove("overflow");
    })
  );

  /* handling play again button */
  duelStage.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-play-again")) playAgain();
  });

  /* handling selection and triggering the game */
  selectionStage.addEventListener("click", function (e) {
    const el = e.target.closest(".symbol-container");
    if (!el) return;
    playerSymbol = el.id;
    opponentSymbol = generateSymbol();
    hide(selectionStage);
    show(duelStage);
    setTimeout(() => {
      renderSymbol(playerSymbol, playerPlaceholder);
      setTimeout(() => {
        renderSymbol(opponentSymbol, opponentPlaceholder);
        setTimeout(() => {
          playGame(playerSymbol, opponentSymbol);
        }, timeDelay);
      }, timeDelay);
    }, timeDelay);
  });

  /* FUNCTIONS */
  const hide = (element) => element.classList.add("hidden");

  const show = (element) => element.classList.remove("hidden");

  /* generating random symbol for opponent */
  const generateSymbol = () => {
    let randomSymbol;
    const randomNumber = Math.floor(Math.random() * 3) + 1;
    if (randomNumber === 1) randomSymbol = "rock";
    if (randomNumber === 2) randomSymbol = "paper";
    if (randomNumber === 3) randomSymbol = "scissors";
    return randomSymbol;
  };

  /* rendering chosen or generated symbol */
  const renderSymbol = function (symbol, position) {
    const html = `
      <div id="${symbol}" class="symbol-container flex-row-center ${
      position === playerPlaceholder ? "player-symbol" : "opponent-symbol"
    }">
        <div class="inner-circle flex-row-center">
          <img src="images/icon-${symbol}.svg" alt="" />
        </div>
      </div>`;
    position.insertAdjacentHTML("beforebegin", html);
    hide(position);
  };

  /* handling game logic */
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
    result === "draw" ? playAgain() : renderResult(result);
    updateScore(currentScore);
  };

  /* comparing symbols and checking the winner */
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

  /* rendering result */
  const renderResult = function (result) {
    const html = `
      <span class="result-info">you ${result}</span>
      <button class="btn-play-again">play again</button>`;
    resultsContainer.forEach((container) =>
      container.insertAdjacentHTML("afterbegin", html)
    );
  };

  const updateScore = function (score) {
    scoreResult.innerHTML = "";
    scoreResult.innerHTML = score;
  };

  /* going back to selection stage and playing next round */
  const playAgain = function () {
    hide(duelStage);
    show(selectionStage);
    removeSymbol(playerPlaceholder);
    removeSymbol(opponentPlaceholder);
    show(playerPlaceholder);
    show(opponentPlaceholder);
    resultsContainer.forEach((container) => (container.innerHTML = ""));
  };

  const removeSymbol = function (position) {
    position.previousSibling.remove();
  };
};

gameApp();
