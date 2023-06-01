const gameBoard = document.getElementById("game-board");
const scoreDisplay = document.createElement("div");
const timerDisplay = document.createElement("div");
const restartButton = document.createElement("button");

const startButton = document.getElementById("start-button");
const pauseButton = document.getElementById("pause-button");

let score = 0;
let moleTimer;
let timeRemaining = 60;

function startGame() {
  score = 0;
  scoreDisplay.textContent = "Score: 0";
  gameBoard.appendChild(scoreDisplay);
  timeRemaining = 60;
  gameBoard.appendChild(timerDisplay);
  moleTimer = setInterval(createMole, 700);
  startTimer();
  
  startButton.addEventListener("click", startGame);
  pauseButton.addEventListener("click", pauseGame);

}

function createMole() {
  const mole = document.createElement("div");
  mole.classList.add("mole");
  mole.style.left = Math.random() * 250 + "px";
  mole.style.top = Math.random() * 250 + "px";
  mole.addEventListener("click", whackMole);
  gameBoard.appendChild(mole);
}

function whackMole() {
  score++;
  this.parentNode.removeChild(this);
  scoreDisplay.textContent = "Score: " + score;
}

function startTimer() {
  const timerInterval = setInterval(() => {
    timeRemaining--;
    timerDisplay.textContent = "Time: " + timeRemaining;

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

function pauseGame() {
  clearInterval(moleTimer);
}


function endGame() {
  clearInterval(moleTimer);
  alert("Game Over! Skor Mu : " + score);
  gameBoard.removeChild(scoreDisplay);
  gameBoard.removeChild(timerDisplay);
  gameBoard.innerHTML = "";

  createRestartButton();
}

function createRestartButton() {
  restartButton.textContent = "Restart";
  restartButton.addEventListener("click", restartGame);
  gameBoard.appendChild(restartButton);
}

function restartGame() {
  gameBoard.removeChild(restartButton);
  startGame();
}

startGame();
