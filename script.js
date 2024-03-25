const board = document.getElementById('board');
const timeDisplay = document.getElementById('time');
const scoreDisplay = document.getElementById('score');
const movesDisplay = document.getElementById('moves');

let tiles = [];
let selectedTiles = [];
let score = 0;
let moves = 0;
let timeLeft = 50;
let timerId;

function initializeBoard() {
    for (let i = 1; i <= 25; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.dataset.number = getRandomNumber();
        tile.addEventListener('click', () => selectTile(tile));
        tiles.push(tile);
        board.appendChild(tile);
    }
}

function getRandomNumber() {
    return Math.floor(Math.random() * 9) + 1;
}

function selectTile(tile) {
    if (!selectedTiles.includes(tile) && selectedTiles.length < 2) {
        tile.textContent = tile.dataset.number;
        selectedTiles.push(tile);
        tile.classList.add('selected');
        if (selectedTiles.length === 2) {
            setTimeout(checkTiles, 1000);
        }
    }
}

function checkTiles() {
    moves++;
    movesDisplay.textContent = `Movimientos: ${moves}`;

    const [tile1, tile2] = selectedTiles;
    const num1 = parseInt(tile1.dataset.number);
    const num2 = parseInt(tile2.dataset.number);

    if (num1 === num2) {
        score++;
        scoreDisplay.textContent = `Aciertos: ${score}`;
        tile1.removeEventListener('click', selectTile);
        tile2.removeEventListener('click', selectTile);
        tile1.style.backgroundColor = 'green';
        tile2.style.backgroundColor = 'green';
    } else {
        tile1.textContent = '';
        tile2.textContent = '';
    }

    tile1.classList.remove('selected');
    tile2.classList.remove('selected');
    selectedTiles = [];

    if (score === 12) {
        endGame();
    }
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeDisplay.textContent = `Tiempo : ${timeLeft}`;
    } else {
        endGame();
    }
}

function endGame() {
    clearInterval(timerId);
    alert(`¡Juego terminado! Aciertos: ${score}, Movimientos: ${moves}`);
    resetGame();
}

function resetGame() {
    tiles.forEach(tile => board.removeChild(tile));
    tiles = [];
    selectedTiles = [];
    score = 0;
    moves = 0;
    timeLeft = 30;
    timeDisplay.textContent = 'Tiempo: 50';
    scoreDisplay.textContent = 'Aciertos: 0';
    movesDisplay.textContent = 'Movimientos: 0';
    initializeBoard();
    startTimer();
}

function startTimer() {
    timerId = setInterval(updateTimer, 1000);
}

initializeBoard();
startTimer();
