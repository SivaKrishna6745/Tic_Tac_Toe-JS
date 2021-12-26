let winMessage = document.querySelector(".winMessage");
let game = document.querySelector(".game");
let tiles = document.querySelectorAll(".tile");
let restart = document.querySelector(".restart");
restart.disabled = true;

let winCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];
let board = ['', '', '', '', '', '', '', '', ''];

let currentPlayer = 'X';
let isGameActive = true;

function updateBoard(index) {
    board[index] = currentPlayer;
};

function checkWinOrTie() {
    let roundWon = false;
    for( let i = 0; i < 8; i++) {
        let comb = winCombinations[i];
        const a = tiles[comb[0]].innerText;
        const b = tiles[comb[1]].innerText;
        const c = tiles[comb[2]].innerText;
        if(a === '' || b === '' || c === '') {
            continue;
        }
        if(a === b && b === c) {
            roundWon = true;
            break;
        }
    }
    if(roundWon) {
        winMessage.innerText = "\"" + currentPlayer + " Wins\"";
        restart.disabled = false;
        isGameActive = false;
    }
    if(!board.includes('')) {
        winMessage.innerText = "Tie";
        restart.disabled = false;
    }
};

function changePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

function style(tile) {
    tile.style.fontSize = "4rem";
    tile.style.textAlign = "center";
    if(currentPlayer === 'X') {
        tile.style.color = "hsl(168 60% 60%)";
    } else {
        tile.style.color = "hsl(154 40% 60%)";
    }
}

function userAction(tile, index) {
    if(isGameActive) {
        tile.innerText = currentPlayer;
        style(tile);
        updateBoard(index);
        checkWinOrTie();
        changePlayer();
    }
};

restart.addEventListener("click", () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    if(currentPlayer === 'O') {
        changePlayer();
    }
    tiles.forEach(tile => {
        tile.innerText = '';
    });
    winMessage.innerText = '';
    restart.disabled = true;
});

tiles.forEach((tile, index) => {
    tile.addEventListener("click", () => userAction(tile, index));
});