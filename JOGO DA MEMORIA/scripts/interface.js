// Definições do jogo
let board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
let playerTime = 0;
let symbols = ['x', 'o'];
let gameOver = false;

// Estados vencedores
function isWin() {
    let winStates = [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8],  
        [0, 3, 6],  
        [1, 4, 7],  
        [2, 5, 8],  
        [0, 4, 8],  
        [2, 4, 6]
    ];

    for (let i = 0; i < winStates.length; i++) {
        let seq = winStates[i];

        let pos1 = seq[0];
        let pos2 = seq[1];
        let pos3 = seq[2];

        if (board[pos1] == board[pos2] && board[pos1] == board[pos3] && board[pos1] != ' ') {
            return true;
        }
    }
    return false;
}

// Manipula o movimento do jogador
function handleMove(position) {
    if (gameOver) {
        return false;
    }

    if (board[position] == ' ') {
        board[position] = symbols[playerTime];

        gameOver = isWin();

        if (!gameOver) {
            playerTime = (playerTime == 0) ? 1 : 0;
        }
    }
    return gameOver;
}

// Inicializa o evento DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    let squares = document.querySelectorAll(".square");

    squares.forEach((square) => {
        square.addEventListener('click', handleClick);
    });
});

// Manipulador de clique
function handleClick(event) {
    let square = event.target;
    let position = square.id;

    if (handleMove(position)) {
        setTimeout(() => {
            alert("O jogo Acabou - O vencedor foi " + playerTime);
        }, 10);
    }
    updateSquares();
}

// Atualiza os quadrados no DOM
function updateSquares() {
    let squares = document.querySelectorAll(".square");

    squares.forEach((square) => {
        let position = square.id;
        let symbol = board[position];

        if (symbol != ' ') {
            square.innerHTML = `<div class='${symbol}'></div>`;
        }
    });
}