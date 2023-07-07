"use strict";

//*****/ Selectiong Elements /*****//

// Buttons
const btnNewEl = document.querySelector(".btn--new");
const btnRollEl = document.querySelector(".btn--roll");
const btnHoldEl = document.querySelector(".btn--hold");

// Dice
const diceEl = document.querySelector(".dice");

//Scores
const currentScore0 = document.getElementById("current--score--0");
const currentScore1 = document.getElementById("current--score--1");
const totalScore0 = document.getElementById("total-score--0");
const totalScore1 = document.getElementById("total-score--1");

// Players
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

// Global variables
let playing, activePlayer, currentScore, scores, currentPlayer, currentScoreEl;

// Functions
function init() {
  player0.classList.add("player--active");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--active");
  player1.classList.remove("player--winner");
  diceEl.classList.add("hidden");

  playing = true;
  activePlayer = 0;
  currentScore = 0;
  scores = [0, 0];
  currentPlayer = 0;
  currentScoreEl = "current--score--0";

  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  totalScore0.textContent = 0;
  totalScore1.textContent = 0;
  document.getElementById(`player--0--title`).classList.remove("white-text");
  document.getElementById(`player--1--title`).classList.remove("white-text");
}
init();

// Confetti function(in case someone wins the game)
function confetti() {
  const svgContainer = document.getElementById("svg");
  svgContainer.classList.remove("hidden");
  const animItem = bodymovin.loadAnimation({
    wrapper: svgContainer,
    animType: "svg",
    loop: false,
    autoplay: false,
    path: "https://assets5.lottiefiles.com/packages/lf20_rovf9gzu.json",
  });
  animItem.goToAndPlay(0, true);
  animItem.addEventListener("complete", function () {
    animItem.destroy();
    svgContainer.classList.add("hidden");
  });
}
// Switch player function
function switchPlayer() {
  currentPlayer = activePlayer === 0 ? 0 : 1;
  currentScoreEl = `current--score--${currentPlayer}`;
  currentScore = 0;
  document.getElementById(currentScoreEl).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
}

//*********************/ Handling Events /*********************//

// Roll Botton Event Handler
btnRollEl.addEventListener("click", function () {
  if (playing) {
    //Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //Displaying dice roll
    diceEl.src = `Dice-imgs/dice-${dice}.png`;
    diceEl.classList.remove("hidden");

    currentPlayer = activePlayer === 0 ? 0 : 1;
    currentScoreEl = `current--score--${currentPlayer}`;
    if (dice !== 1) {
      // Add dice roll to current score
      currentScore += dice;
      document.getElementById(currentScoreEl).textContent = currentScore;
    } else {
      // Switching player
      switchPlayer();
    }
  }
});

// Hold Botton Event Handler
btnHoldEl.addEventListener("click", function () {
  if (playing) {
    // Adding current score to total score
    currentPlayer = activePlayer === 0 ? 0 : 1;
    scores[currentPlayer] += currentScore;
    document.getElementById(`total-score--${activePlayer}`).textContent =
      scores[currentPlayer];

    // Check if active player wins the game or not?
    if (scores[currentPlayer] >= 10) {
      document
        .getElementById(`player--${currentPlayer}--title`)
        .classList.add("white-text");
      confetti();
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add("player--winner");

      diceEl.classList.add("hidden");
      playing = false;
    } else {
      // Switching player
      switchPlayer();
    }
  }
});

// New Botton Event Handler(RESETING THE GAME)
btnNewEl.addEventListener("click", init);
