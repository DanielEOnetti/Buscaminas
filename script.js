
let rows = 8;
let cols = 8;
let minesCount = 10;

const levels = {
  easy: { rows: 8, cols: 8, mines: 10 },
  medium: { rows: 16, cols: 16, mines: 40 },
  hard: { rows: 24, cols: 24, mines: 99 },
};

let board = [];
let gameContainer = document.getElementById('game');
let timer = document.getElementById('timer');
let minesDisplay = document.getElementById('mines-count');
let resetButton = document.getElementById('reset');
let difficultySelect = document.getElementById('difficulty');

let seconds = 0;
let timerInterval;

// Inicio de juego
function init() {
  board = [];
  gameContainer.innerHTML = '';
  gameContainer.style.gridTemplateColumns = `repeat(${cols}, 30px)`;
  seconds = 0;
  timer.textContent = seconds;
  clearInterval(timerInterval);

  // Crear tablero
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < cols; c++) {
      const cell = {
        row: r,
        col: c,
        mine: false,
        revealed: false,
        flagged: false,
        adjacent: 0,
        element: null
      };
      row.push(cell);

      
      const div = document.createElement('div');
      div.classList.add('cell');
      div.addEventListener('click', () => revealCell(r, c));
      div.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        toggleFlag(r, c);
      });
      gameContainer.appendChild(div);
      cell.element = div;
    }
    board.push(row);
  }

  placeMines();
  calculateAdjacent();
  updateMinesDisplay();


  timerInterval = setInterval(() => {
    seconds++;
    timer.textContent = seconds;
  }, 1000);
}

// Posicionamiento de las minas
function placeMines() {
  let placed = 0;
  while (placed < minesCount) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * cols);
    if (!board[r][c].mine) {
      board[r][c].mine = true;
      placed++;
    }
  }
}

// Minas en los alrededores
function calculateAdjacent() {
  const directions = [
    [-1,-1],[-1,0],[-1,1],
    [0,-1],       [0,1],
    [1,-1],[1,0],[1,1]
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c].mine) continue;
      let count = 0;
      directions.forEach(([dr, dc]) => {
        let nr = r + dr;
        let nc = c + dc;
        if (nr >=0 && nr < rows && nc >=0 && nc < cols) {
          if (board[nr][nc].mine) count++;
        }
      });
      board[r][c].adjacent = count;
    }
  }
}

// Celda revelada
function revealCell(r, c) {
  const cell = board[r][c];
  if (cell.revealed || cell.flagged) return;

  cell.revealed = true;
  cell.element.classList.add('revealed');

  if (cell.mine) {
    cell.element.textContent = '💣';
    gameOver(false);
  } else if (cell.adjacent > 0) {
    cell.element.textContent = cell.adjacent;
  } else {
    revealEmpty(r, c);
  }

  checkWin();
}

// Celdas vacias con recursividad
function revealEmpty(r, c) {
  const directions = [
    [-1,-1],[-1,0],[-1,1],
    [0,-1],       [0,1],
    [1,-1],[1,0],[1,1]
  ];

  directions.forEach(([dr, dc]) => {
    let nr = r + dr;
    let nc = c + dc;
    if (nr >=0 && nr < rows && nc >=0 && nc < cols) {
      const neighbor = board[nr][nc];
      if (!neighbor.revealed && !neighbor.mine) {
        neighbor.revealed = true;
        neighbor.element.classList.add('revealed');
        if (neighbor.adjacent > 0) {
          neighbor.element.textContent = neighbor.adjacent;
        } else {
          revealEmpty(nr, nc);
        }
      }
    }
  });
}

// Banderas
function toggleFlag(r, c) {
  const cell = board[r][c];
  if (cell.revealed) return;

  cell.flagged = !cell.flagged;
  if (cell.flagged) {
    cell.element.classList.add('flagged');
    cell.element.textContent = '🚩';
  } else {
    cell.element.classList.remove('flagged');
    cell.element.textContent = '';
  }

  updateMinesDisplay();
}

// Contador de minas
function updateMinesDisplay() {
  const flags = board.flat().filter(cell => cell.flagged).length;
  minesDisplay.textContent = `Minas restantes: ${minesCount - flags}`;
}

// Fin de Juego
function gameOver(win) {
  clearInterval(timerInterval);
  board.flat().forEach(cell => {
    if (cell.mine) cell.element.textContent = '💣';
  });
  setTimeout(() => {
    alert(win ? `¡Ganaste en ${seconds} segundos!` : '¡Perdiste!');
    if (win) saveBestTime(rows, cols, seconds);
  }, 100);
}

// Guardar y mostrar tiempo
function saveBestTime(rows, cols, time) {
  const key = `bestTime_${rows}x${cols}`;
  const best = localStorage.getItem(key);
  if (!best || time < best) {
    localStorage.setItem(key, time);
    alert(`Nuevo mejor tiempo para ${rows}x${cols}: ${time} segundos`);
  }
}

function checkWin() {
  let won = board.flat().every(cell => (cell.revealed || cell.mine));
  if (won) gameOver(true);
}

// Dificultad
difficultySelect.addEventListener('change', () => {
  const level = levels[difficultySelect.value];
  rows = level.rows;
  cols = level.cols;
  minesCount = level.mines;
  init();
});


resetButton.addEventListener('click', init);

init();
