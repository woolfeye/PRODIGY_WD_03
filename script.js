let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;
let againstComputer = false;

function startGame(option) {
  gameActive = true;
  againstComputer = option === 'computer';

  document.getElementById('gameOptions').style.display = 'none';
  document.getElementById('board').style.display = 'grid';

  resetGame();
}

function resetGame() {
  currentPlayer = 'X';
  board = ['', '', '', '', '', '', '', '', ''];
  document.getElementById('result').innerText = '';
  document.querySelectorAll('.cell').forEach(cell => {
    cell.innerText = '';
  });

  if (againstComputer && currentPlayer === 'O') {
    makeComputerMove();
  }
}

function handleClick(event) {
  const cellIndex = event.target.dataset.index;

  if (gameActive && board[cellIndex] === '') {
    board[cellIndex] = currentPlayer;
    event.target.innerText = currentPlayer;

    if (checkWinner()) {
      document.getElementById('result').innerText = againstComputer ? (currentPlayer === 'X' ? 'You win!' : 'Computer wins!') : `Player ${currentPlayer} wins!`;
      gameActive = false;
    } else if (board.every(cell => cell !== '')) {
      document.getElementById('result').innerText = 'It\'s a tie!';
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      if (againstComputer && currentPlayer === 'O') {
        setTimeout(makeComputerMove, 500);
      }
    }
  }
}

function makeComputerMove() {
  if (gameActive) {
    let emptyCells = board.reduce((acc, cell, index) => {
      if (cell === '') acc.push(index);
      return acc;
    }, []);

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const computerMove = emptyCells[randomIndex];

    board[computerMove] = 'O';
    document.querySelector(`[data-index="${computerMove}"]`).innerText = 'O';

    if (checkWinner()) {
      document.getElementById('result').innerText = 'Computer wins!';
      gameActive = false;
    } else if (board.every(cell => cell !== '')) {
      document.getElementById('result').innerText = 'It\'s a tie!';
      gameActive = false;
    } else {
      currentPlayer = 'X';
    }
  }
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] !== '' && board[a] === board[b] && board[b] === board[c];
  });
}
