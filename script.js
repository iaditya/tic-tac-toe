var origBoard; // array , which checked the data of every cell

const humPlayer = '0';
const aiPlayer = 'X';

const winningComb = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8]
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8],
];

const cells = document.querySelectorAll('.cell');
console.log(typeof cells);