var origBoard; // array , which checked the data of every cell

const humPlayer = '0';
const aiPlayer = 'X';

const winningComb = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8],
];

const cells = document.querySelectorAll('.cell');
console.log(typeof cells);

startGame();

function startGame() {
    document.querySelector('.endgame').style.display = "none";
    origBoard = Array.from(Array(9).keys());
    console.log(origBoard);

    for(var i=0; i< cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty = 'background-color';
        cells[i].addEventListener('click', turnClick, false);
    }

    function turnClick(squre) {
        turn(squre.target.id, humPlayer);
        //console.log(e.target.id);
    }

    function turn (squreId, player) {
        //console.log(player);
        origBoard[squreId] = player;
        console.log(origBoard);
        document.getElementById(squreId).innerText = player;

        let gameWon = checkWin(origBoard, player);
        if(gameWon) gameOver(gameWon)
    }

    // function checkWin(board, player) {
    //     let plays = board.reduce((a, e, i) =>
    //      (e === player) ? a.concat(i) : a , []);
    // }

    // function checkWin(board, player) {
    //     let plays = board.reduce(function(a, e, i) {
    //         //console.log(a);
    //         console.log(e);
    //         //console.log(i);
    //         return (e === player) ? a.concat(i) : a;
    //     }, []);
    // }

    function checkWin(board, player) {
        let plays = board.reduce((a, e, i) =>
         (e === player) ? a.concat(i) : a , []);

         let gameWon = null;
         //console.log(winningComb.entries());

         for(let[index, win] of winningComb.entries()) {
             
            if (win.every(elem => plays.indexOf(elem) > -1)) {
                gameWon = {player: player, index: index};
                break;
            }
         }
         return gameWon;
    }

    function gameOver(gameWon) {
        console.log("Game over");
    }
}