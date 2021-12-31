var originalBoard;
const humanPlayer = "o",
  aiPlayer = "x",
  winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
  ];

// all boxes
let cells = document.querySelectorAll(".cell");

// on load start the game
startGame();

function startGame() {
  document.querySelector(".endgame").style.display = "none";

  originalBoard = Array.from(Array(9).keys());

  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
    cells[i].style.removeProperty("background-color");
    cells[i].addEventListener("click", turnClick, false);
  }
}

function turnClick(e) {
  //can not click on the box that is already clicked.
  if (typeof originalBoard[e.target.id] === "number") {
    turn(e.target.id, humanPlayer);
    //runs ai player
    if (!checkWin(originalBoard, humanPlayer) && !checkTie())
      turn(bestSpot(), aiPlayer);
  }
}

function turn(boxId, player) {
  originalBoard[boxId] = player;
  document.getElementById(boxId).innerText = player;
  document.getElementById(boxId).style.backgroundColor = "whitesmoke";

  let gameWon = checkWin(originalBoard, player);
  if (gameWon) gameOver(gameWon);
}

function checkWin(board, player) {
  // storing indexes of selected box index
  const plays = board.reduce((acc, value, index) => {
    return value === player ? acc.concat(index) : acc;
  }, []);

  //on every call we check game status
  let gameWon = null;

  for (let i = 0; i < winningCombos.length; i++) {
    if (winningCombos[i].every((item) => plays.indexOf(item) > -1)) {
      gameWon = { index: i, player: player };
      break;
    }
  }
  return gameWon;
}

function gameOver(gameWon) {
  if (!gameWon) {
    return;
  }

  for (let index of winningCombos[gameWon.index]) {
    document.getElementById(index).style.backgroundColor =
      gameWon.player === humanPlayer ? "lightgreen" : "red";
  }

  //removes click event listener
  for (let i = 0; i < cells.length; i++) {
    cells[i].removeEventListener("click", turnClick, false);
  }

  decalreWinner(gameWon.player === humanPlayer ? "You win." : "You lose.");
}

function bestSpot() {
  //For now returns first empty box
  return emptyBox()[0];
}

function emptyBox() {
  return originalBoard.filter((item) => typeof item === "number");
}

function checkTie() {
  if (emptyBox().length === 0) {
    for (let i = 0; i < cells.length; i++) {
      cells[i].removeEventListener("click", turnClick, false);
      cells[i].style.backgroundColor = "gray";
    }
    decalreWinner("Tie Game");
    return true;
  }
  return false;
}

function decalreWinner(who) {
  document.querySelector(".endgame").style.display = "block";
  document.querySelector(".endgame .text").innerText = who;
}
