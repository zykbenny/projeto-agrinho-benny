const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');
const gameArea = document.getElementById('gameArea');
const scoreEl = document.getElementById('score');
const gameOverEl = document.getElementById('gameover');

const gridSize = 3;
const tileSize = canvas.width / gridSize;
let score = 0;
let gameOver = false;
let larva = { x: 0, y: 0 };
let planta = { x: 1, y: 1 };

const larvaImg = new Image();
larvaImg.src = 'larva.png';
const plantaImg = new Image();
plantaImg.src = 'milho.png'; 

function gerarPosicaoAleatoria() {
  return {
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize)
  };
}

function desenhar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = 'green';
  for (let i = 0; i <= gridSize; i++) {
    ctx.moveTo(i * tileSize, 0);
    ctx.lineTo(i * tileSize, canvas.height);
    ctx.moveTo(0, i * tileSize);
    ctx.lineTo(canvas.width, i * tileSize);
  }
  ctx.stroke();

  if (larvaImg.complete) {
    ctx.drawImage(
      larvaImg,
      larva.x * tileSize + 5,
      larva.y * tileSize + 5,
      tileSize - 10,
      tileSize - 10
    );
  }

  if (plantaImg.complete) {
    ctx.drawImage(
      plantaImg,
      planta.x * tileSize + 5,
      planta.y * tileSize + 5,
      tileSize - 10,
      tileSize - 10
    );
  }
}

function atualizarPosicoes() {
  do {
    larva = gerarPosicaoAleatoria();
    planta = gerarPosicaoAleatoria();
  } while (larva.x === planta.x && larva.y === planta.y);
}

function iniciarJogo() {
  score = 0;
  gameOver = false;
  scoreEl.textContent = 'Score: ' + score;
  gameOverEl.textContent = '';
  atualizarPosicoes();
  desenhar();
}

startBtn.addEventListener('click', () => {
  startBtn.style.display = 'none';
  gameArea.style.display = 'block';
  iniciarJogo();
});

canvas.addEventListener('click', (e) => {
  if (gameOver) return;

  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) / tileSize);
  const y = Math.floor((e.clientY - rect.top) / tileSize);

  if (x === planta.x && y === planta.y) {
    score += 10;
    scoreEl.textContent = 'Score: ' + score;
    atualizarPosicoes();
    desenhar();
  } else if (x === larva.x && y === larva.y) {
    gameOver = true;
    gameOverEl.textContent = 'Perdeu! Score final: ' + score;
      atualizarPosicoes();
  desenhar();
  }
});
