// Simple futuristic loader sequence with particles and timed messages
const messages = [
  'Initializing AI Core...',
  'Loading Neural Network...',
  'Loading Computer Vision Engine...',
  'Loading Portfolio...'
];

const loader = document.getElementById('futuristic-loader');
const lineEl = document.getElementById('loader-line');
const line2El = document.getElementById('loader-line-2');
const percentEl = document.getElementById('loader-percent');
const canvas = document.getElementById('loader-particles');

let raf = null;

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = canvas.clientWidth * devicePixelRatio;
  canvas.height = canvas.clientHeight * devicePixelRatio;
}

class Particle {
  constructor(w, h) {
    this.reset(w, h);
  }
  reset(w, h) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * 0.2;
    this.vy = -0.05 - Math.random() * 0.15;
    this.r = 0.6 + Math.random() * 2.4;
    this.alpha = 0.08 + Math.random() * 0.2;
  }
  step(w, h) {
    this.x += this.vx;
    this.y += this.vy;
    if (this.y < -10 || this.x < -10 || this.x > w + 10) this.reset(w, h);
  }
}

function startParticles() {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  resizeCanvas();
  const w = canvas.width;
  const h = canvas.height;
  const particles = Array.from({length: 60}, () => new Particle(w, h));

  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for (let p of particles) {
      p.step(canvas.width, canvas.height);
      ctx.beginPath();
      const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * devicePixelRatio * 6);
      glow.addColorStop(0, `rgba(215,255,47,${p.alpha})`);
      glow.addColorStop(1, 'rgba(215,255,47,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(p.x - p.r*4, p.y - p.r*4, p.r*8, p.r*8);
    }
    raf = requestAnimationFrame(draw);
  }
  draw();
  window.addEventListener('resize', resizeCanvas);
  return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resizeCanvas); };
}

async function runSequence() {
  if (!loader) return;
  document.body.classList.add('loading');
  const stopParticles = startParticles();

  // show each message briefly
  for (let i = 0; i < messages.length; i++) {
    lineEl.textContent = messages[i];
    lineEl.classList.add('visible');
    await new Promise(r => setTimeout(r, 320));
    lineEl.classList.remove('visible');
  }

  // show 97% then 100%
  lineEl.textContent = 'Finalizing...';
  lineEl.classList.add('visible');
  // animate percent to 97
  await animatePercent(0, 97, 480);
  line2El.textContent = '97%';
  line2El.classList.add('visible');
  await new Promise(r => setTimeout(r, 220));
  await animatePercent(97, 100, 300);
  line2El.textContent = '100%';

  // brief pause then fade
  await new Promise(r => setTimeout(r, 260));
  loader.classList.add('fade-out');
  // remove particle loop
  if (stopParticles) stopParticles();
  // unhide hero and other UI after fade
  setTimeout(() => {
    loader.style.display = 'none';
    document.body.classList.remove('loading');
    // add subtle hero transition
    const hero = document.getElementById('hero');
    if (hero) hero.classList.remove('hero-fade');
  }, 480);
}

function animatePercent(from, to, duration) {
  return new Promise(resolve => {
    const start = performance.now();
    function step(now) {
      const t = Math.min(1, (now - start) / duration);
      const v = Math.floor(from + (to - from) * t);
      percentEl.textContent = v + '%';
      if (t < 1) requestAnimationFrame(step);
      else resolve();
    }
    requestAnimationFrame(step);
  });
}

// Kick off when DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => runSequence());
} else {
  runSequence();
}
