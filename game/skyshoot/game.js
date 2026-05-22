const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
const scoreEl = document.querySelector("#score");
const lifeEl = document.querySelector("#life");
const levelEl = document.querySelector("#level");
const startPanel = document.querySelector("#startPanel");
const startButton = document.querySelector("#startButton");
const gameFrame = document.querySelector(".game-frame");
const touchHint = document.querySelector(".touch-hint");
const character = new Image();
character.src = "./nakano.svg";
const enemyImages = ["nerima.svg", "shibuya.svg", "shinjuku.svg", "suginami.svg"].map((src) => {
  const image = new Image();
  image.src = `./${src}`;
  return image;
});

const W = 960;
const H = 540;
const keys = new Set();

let player;
let bullets;
let enemies;
let particles;
let stars;
let score;
let life;
let level;
let spawnTimer;
let starTimer;
let fireTimer;
let state = "ready";
let lastTime = 0;
let currentDpr = 1;
let touchMoveId = null;
let touchFireId = null;
let touchTarget = null;
let touchFiring = false;
let touchHintTimer = 0;

function syncCanvasResolution() {
  const dpr = Math.min(window.devicePixelRatio || 1, 3);
  const pixelWidth = Math.round(W * dpr);
  const pixelHeight = Math.round(H * dpr);
  if (canvas.width === pixelWidth && canvas.height === pixelHeight && currentDpr === dpr) return;
  currentDpr = dpr;
  canvas.width = pixelWidth;
  canvas.height = pixelHeight;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
}

function resetGame() {
  player = {
    x: W - 86,
    y: H * 0.5,
    w: 86,
    h: 86,
    speed: 340,
    invincible: 0,
  };
  bullets = [];
  enemies = [];
  particles = [];
  stars = [];
  score = 0;
  life = 3;
  level = 1;
  spawnTimer = 0.3;
  starTimer = 1.8;
  fireTimer = 0;
  touchTarget = null;
  touchFiring = false;
  updateHud();
}

function startGame() {
  resetGame();
  state = "playing";
  startPanel.classList.add("hidden");
  lastTime = performance.now();
  requestAnimationFrame(loop);
}

function updateHud() {
  scoreEl.textContent = score.toString();
  lifeEl.textContent = life.toString();
  levelEl.textContent = level.toString();
}

function loop(now) {
  const dt = Math.min((now - lastTime) / 1000, 0.033);
  lastTime = now;
  update(dt);
  draw();
  if (state === "playing") requestAnimationFrame(loop);
}

function update(dt) {
  fireTimer -= dt;
  spawnTimer -= dt;
  starTimer -= dt;
  player.invincible = Math.max(0, player.invincible - dt);

  const dx = (keys.has("ArrowRight") || keys.has("KeyD") ? 1 : 0) - (keys.has("ArrowLeft") || keys.has("KeyA") ? 1 : 0);
  const dy = (keys.has("ArrowDown") || keys.has("KeyS") ? 1 : 0) - (keys.has("ArrowUp") || keys.has("KeyW") ? 1 : 0);
  const length = Math.hypot(dx, dy) || 1;
  player.x = clamp(player.x + (dx / length) * player.speed * dt, 20, W - 20);
  player.y = clamp(player.y + (dy / length) * player.speed * dt, 50, H - 50);

  if (touchTarget) {
    const targetX = clamp(touchTarget.x, 20, W - 20);
    const targetY = clamp(touchTarget.y, 50, H - 50);
    const easing = 1 - Math.pow(0.001, dt);
    player.x += (targetX - player.x) * easing;
    player.y += (targetY - player.y) * easing;
  }

  if (keys.has("Space") || keys.has("Enter") || touchFiring) shoot();

  if (spawnTimer <= 0) {
    spawnEnemy();
    spawnTimer = Math.max(0.42, 1.1 - level * 0.06 - Math.random() * 0.28);
  }

  if (starTimer <= 0) {
    stars.push({ x: -18, y: 70 + Math.random() * (H - 140), r: 12, vx: 150 + level * 10 });
    starTimer = 2.1 + Math.random() * 1.8;
  }

  bullets.forEach((bullet) => {
    bullet.x += bullet.vx * dt;
    bullet.life -= dt;
  });

  enemies.forEach((enemy) => {
    enemy.x += enemy.vx * dt;
    enemy.y += Math.sin(nowish(enemy.seed) + enemy.x * 0.018) * enemy.wave * dt;
    enemy.spin += dt * enemy.spinSpeed;
  });

  stars.forEach((star) => {
    star.x += star.vx * dt;
  });

  particles.forEach((particle) => {
    particle.x += particle.vx * dt;
    particle.y += particle.vy * dt;
    particle.life -= dt;
  });

  handleCollisions();

  bullets = bullets.filter((bullet) => bullet.x > -40 && bullet.life > 0);
  enemies = enemies.filter((enemy) => enemy.x < W + 80 && enemy.hp > 0);
  stars = stars.filter((star) => star.x < W + 30);
  particles = particles.filter((particle) => particle.life > 0);

  level = 1 + Math.floor(score / 900);
  updateHud();
}

function shoot() {
  if (fireTimer > 0) return;
  bullets.push({
    x: player.x - player.w * 0.44,
    y: player.y - 7,
    vx: -560,
    life: 1.4,
  });
  bullets.push({
    x: player.x - player.w * 0.36,
    y: player.y + 13,
    vx: -520,
    life: 1.4,
  });
  fireTimer = 0.18;
}

function spawnEnemy() {
  const size = 48 + Math.random() * 28 + level * 1.5;
  enemies.push({
    x: -size,
    y: 54 + Math.random() * (H - 108),
    size,
    vx: 120 + level * 20 + Math.random() * 85,
    hp: size > 66 ? 2 : 1,
    image: enemyImages[Math.floor(Math.random() * enemyImages.length)],
    wave: 30 + Math.random() * 55,
    seed: Math.random() * 100,
    spin: 0,
    spinSpeed: (Math.random() - 0.5) * 0.7,
  });
}

function handleCollisions() {
  for (const bullet of bullets) {
    for (const enemy of enemies) {
      if (enemy.hp <= 0 || distance(bullet, enemy) > enemy.size * 0.58) continue;
      bullet.life = 0;
      enemy.hp -= 1;
      burst(enemy.x, enemy.y, enemy.hp > 0 ? "#ffd166" : "#f05c91", 10);
      if (enemy.hp <= 0) score += 100 + level * 12;
    }
  }

  for (const enemy of enemies) {
    if (player.invincible > 0 || enemy.hp <= 0) continue;
    if (distance({ x: player.x, y: player.y }, enemy) > enemy.size * 0.58 + 31) continue;
    enemy.hp = 0;
    life -= 1;
    player.invincible = 1.35;
    burst(player.x, player.y, "#55cdfc", 22);
    if (life <= 0) gameOver();
  }

  for (const star of stars) {
    if (distance({ x: player.x, y: player.y }, star) > 42) continue;
    const collectedX = star.x;
    const collectedY = star.y;
    star.x = -100;
    score += 250;
    burst(collectedX, collectedY, "#ffd166", 12);
  }
}

function gameOver() {
  state = "over";
  startPanel.classList.remove("hidden");
  startPanel.querySelector("h1").innerHTML = "GAME OVER<br />もう一度";
  startPanel.querySelector("p:not(.eyebrow)").textContent = `スコア ${score}。スタートで再挑戦できます。`;
}

function burst(x, y, color, count) {
  for (let i = 0; i < count; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 65 + Math.random() * 180;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      color,
      life: 0.35 + Math.random() * 0.45,
    });
  }
}

function draw() {
  syncCanvasResolution();
  drawBackground();
  drawStars();
  drawPlayer();
  drawBullets();
  drawEnemies();
  drawParticles();
}

function drawBackground() {
  const sky = ctx.createLinearGradient(0, 0, W, H);
  sky.addColorStop(0, "#142a4b");
  sky.addColorStop(0.55, "#342a5d");
  sky.addColorStop(1, "#6b2b58");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = "rgba(255,255,255,0.78)";
  for (let i = 0; i < 54; i += 1) {
    const x = (i * 211 + performance.now() * (0.018 + (i % 3) * 0.01)) % W;
    const y = (i * 97) % H;
    ctx.globalAlpha = 0.25 + (i % 4) * 0.12;
    ctx.fillRect(x, y, 2, 2);
  }
  ctx.globalAlpha = 1;

  ctx.fillStyle = "rgba(85,205,252,0.18)";
  for (let i = 0; i < 7; i += 1) {
    const x = ((i * 180 + performance.now() * 0.03) % (W + 180)) - 120;
    const y = 78 + i * 56;
    ctx.beginPath();
    ctx.ellipse(x, y, 110, 20, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawPlayer() {
  ctx.save();
  ctx.translate(player.x, player.y);
  if (player.invincible > 0 && Math.floor(performance.now() / 90) % 2 === 0) ctx.globalAlpha = 0.45;
  ctx.shadowColor = "rgba(0,0,0,0.35)";
  ctx.shadowBlur = 18;
  ctx.drawImage(character, -player.w * 0.52, -player.h * 0.52, player.w, player.h);
  ctx.restore();
}

function drawBullets() {
  bullets.forEach((bullet) => {
    ctx.fillStyle = "#fff7a8";
    ctx.shadowColor = "#ffd166";
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.roundRect(bullet.x - 24, bullet.y, 24, 8, 4);
    ctx.fill();
    ctx.shadowBlur = 0;
  });
}

function drawEnemies() {
  enemies.forEach((enemy) => {
    ctx.save();
    ctx.translate(enemy.x, enemy.y);
    ctx.rotate(enemy.spin);
    ctx.shadowColor = "rgba(0,0,0,0.28)";
    ctx.shadowBlur = 12;
    ctx.drawImage(enemy.image, -enemy.size * 0.5, -enemy.size * 0.5, enemy.size, enemy.size);
    ctx.restore();
  });
}

function drawStars() {
  stars.forEach((star) => {
    ctx.save();
    ctx.translate(star.x, star.y);
    ctx.rotate(performance.now() * 0.004);
    ctx.fillStyle = "#ffd166";
    ctx.strokeStyle = "#fff8fd";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < 10; i += 1) {
      const radius = i % 2 === 0 ? star.r : star.r * 0.46;
      const angle = (Math.PI * 2 * i) / 10 - Math.PI / 2;
      ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  });
}

function drawParticles() {
  particles.forEach((particle) => {
    ctx.globalAlpha = Math.max(0, particle.life / 0.8);
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, 3.5, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function nowish(seed) {
  return performance.now() * 0.002 + seed;
}

function pointToGame(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * W,
    y: ((event.clientY - rect.top) / rect.height) * H,
    screenX: event.clientX - rect.left,
    screenY: event.clientY - rect.top,
  };
}

function placeTouchAim(point) {
  let aim = document.querySelector(".touch-aim");
  if (!aim) {
    aim = document.createElement("div");
    aim.className = "touch-aim";
    gameFrame.append(aim);
  }
  aim.style.left = `${point.screenX}px`;
  aim.style.top = `${point.screenY}px`;
  aim.style.display = "block";
}

function clearTouchAim() {
  const aim = document.querySelector(".touch-aim");
  if (aim) aim.style.display = "none";
}

function fadeTouchHint() {
  if (!touchHint || touchHintTimer) return;
  touchHintTimer = window.setTimeout(() => {
    touchHint.classList.add("fade");
  }, 1600);
}

window.addEventListener("keydown", (event) => {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(event.code)) event.preventDefault();
  keys.add(event.code);
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "KeyW", "KeyA", "KeyS", "KeyD"].includes(event.code)) {
    touchTarget = null;
    clearTouchAim();
  }
  if (state !== "playing" && (event.code === "Space" || event.code === "Enter")) startGame();
});

window.addEventListener("keyup", (event) => {
  keys.delete(event.code);
});

canvas.addEventListener("pointerdown", (event) => {
  if (event.pointerType === "mouse") return;
  event.preventDefault();
  canvas.setPointerCapture(event.pointerId);
  fadeTouchHint();

  if (state !== "playing") {
    startGame();
  }

  const point = pointToGame(event);
  if (point.x < W * 0.48 && touchMoveId !== null) {
    touchFireId = event.pointerId;
    touchFiring = true;
    shoot();
    return;
  }

  touchMoveId = event.pointerId;
  touchTarget = { x: point.x, y: point.y };
  touchFiring = true;
  placeTouchAim(point);
});

canvas.addEventListener("pointermove", (event) => {
  if (event.pointerType === "mouse" || event.pointerId !== touchMoveId) return;
  event.preventDefault();
  const point = pointToGame(event);
  touchTarget = { x: point.x, y: point.y };
  placeTouchAim(point);
});

function releaseTouch(event) {
  if (event.pointerType === "mouse") return;
  if (event.pointerId === touchMoveId) {
    touchMoveId = null;
    clearTouchAim();
  }
  if (event.pointerId === touchFireId) {
    touchFireId = null;
  }
  if (touchMoveId === null && touchFireId === null) {
    touchFiring = false;
  }
}

canvas.addEventListener("pointerup", releaseTouch);
canvas.addEventListener("pointercancel", releaseTouch);
startButton.addEventListener("click", startGame);
window.addEventListener("resize", () => {
  syncCanvasResolution();
  draw();
});
character.addEventListener("load", draw);
enemyImages.forEach((image) => image.addEventListener("load", draw));
syncCanvasResolution();
resetGame();
draw();
