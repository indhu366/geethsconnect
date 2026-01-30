let rows = 6;
let cols = 7;
let board = [];
let currentPlayer = 'red';
let gameOver = false;

// Create the board
function createBoard() {
    const boardDiv = document.getElementById('board');
    boardDiv.innerHTML = "";
    board = [];

    for (let r = 0; r < rows; r++) {
        board[r] = [];
        for (let c = 0; c < cols; c++) {
            board[r][c] = '';
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.addEventListener('click', () => dropDisc(c));
            boardDiv.appendChild(cell);
        }
    }
}

// Drop disc into column
function dropDisc(col) {
    if (gameOver) return;

    for (let r = rows - 1; r >= 0; r--) {
        if (board[r][col] === '') {
            board[r][col] = currentPlayer;
            updateCell(r, col);
            if (checkWinner(r, col)) {
                document.getElementById('message').textContent = 
                    (currentPlayer === 'red' ? "Player 1" : "Player 2") + " wins!";
                gameOver = true;
            } else {
                currentPlayer = (currentPlayer === 'red') ? 'yellow' : 'red';
                document.getElementById('message').textContent = 
                    currentPlayer === 'red' ? "Player 1's turn (Red)" : "Player 2's turn (Yellow)";
            }
            return;
        }
    }
}

// Update cell color
function updateCell(row, col) {
    const cells = document.getElementsByClassName('cell');
    const index = row * cols + col;
    cells[index].classList.add(currentPlayer);
}

// Check for winner
function checkWinner(row, col) {
    return checkDirection(row, col, 1, 0) || // horizontal
           checkDirection(row, col, 0, 1) || // vertical
           checkDirection(row, col, 1, 1) || // diagonal down-right
           checkDirection(row, col, 1, -1);  // diagonal up-right
}

// Check a single direction
function checkDirection(row, col, rowDir, colDir) {
    let count = 1;
    count += countDiscs(row, col, rowDir, colDir);
    count += countDiscs(row, col, -rowDir, -colDir);
    return count >= 4;
}

// Count discs in a direction
function countDiscs(row, col, rowDir, colDir) {
    let r = row + rowDir;
    let c = col + colDir;
    let count = 0;
    while (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c] === currentPlayer) {
        count++;
        r += rowDir;
        c += colDir;
    }
    return count;
}

// Reset the game
function resetGame() {
    currentPlayer = 'red';
    gameOver = false;
    document.getElementById('message').textContent = "Player 1's turn (Red)";
    createBoard();
}

// Start the game
createBoard();
