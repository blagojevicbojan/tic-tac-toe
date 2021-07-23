// HTML Elements
const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');

// game constants
const xSymbol = '×';
const oSymbol = '○';

// game variables
let gameIsLive = true;
let xIsNext = true;

// functions
const handleWin = (letter) => {
    gameIsLive = false;
    if (letter === 'x') {
        statusDiv.innerHTML = 'x has won';
    } else {
        statusDiv.innerHTML = '<span>o has won</span>';
    }
}

const addWon = (i, j, k) => {
    cellDivs[i].classList.add('won');
    cellDivs[j].classList.add('won');
    cellDivs[k].classList.add('won');
}

const checkGameStatus = () => {
    const topLeft = cellDivs[0].classList[1];
    const topMiddle = cellDivs[1].classList[1];
    const topRight = cellDivs[2].classList[1];
    const middleLeft = cellDivs[3].classList[1];
    const middleMiddle = cellDivs[4].classList[1];
    const middleRight = cellDivs[5].classList[1];
    const bottomLeft = cellDivs[6].classList[1];
    const bottomMiddle = cellDivs[7].classList[1];
    const bottomRight = cellDivs[8].classList[1];

    if (topLeft && topLeft === topMiddle && topLeft === topRight) {
        handleWin(topLeft);
        addWon(0, 1, 2);
    } else if (middleLeft && middleLeft === middleMiddle && middleLeft === middleRight) {
        handleWin(middleLeft);
        addWon(3, 4, 5);
    } else if (bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight) {
        handleWin(bottomLeft);
        addWon(6, 7, 8);
    } else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
        handleWin(topLeft);
        addWon(0, 3, 6);
    } else if (topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle) {
        handleWin(topMiddle);
        addWon(1, 4, 7);
    } else if (topRight && topRight === middleRight && topRight === bottomRight) {
        handleWin(topRight);
        addWon(2, 5, 8);
    } else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
        handleWin(topLeft);
        addWon(0, 4, 8);
    } else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
        handleWin(topRight);
        addWon(2, 4, 6);
    } else if (topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight) {
        gameIsLive = false;
        statusDiv.innerHTML = 'Game is tied';
    } else {
        xIsNext = !xIsNext;
        if (xIsNext) {
            statusDiv.innerHTML = 'x is next';
        } else {
            statusDiv.innerHTML = '<span>o is next</span>';
        }
    }

}


// event handlers
const handleReset = (e) => {
    xIsNext = true;
    for (const cellDiv of cellDivs) {
        cellDiv.classList.remove('x');
        cellDiv.classList.remove('o');
        cellDiv.classList.remove('won');
    }
    statusDiv.innerHTML = 'x is next';
    gameIsLive = true;
}

const handleCellClick = (e) => {
    const classList = e.target.classList;

    if (!gameIsLive || classList[1] === 'x' || classList[1] === 'o') return;

    if (xIsNext) {
        classList.add('x');
        checkGameStatus();
    } else {
        classList.add('o');
        checkGameStatus();
    }
}


// event listeners
resetDiv.addEventListener('click', handleReset);

for (const cellDiv of cellDivs) {
    cellDiv.addEventListener('click', handleCellClick);
}