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
  turn(e.target.id, humanPlayer);
}

function turn(boxId, player) {
  originalBoard[boxId] = player;
  document.getElementById(boxId).innerText = player;
  document.getElementById(boxId).style.backgroundColor = "whitesmoke";
}
