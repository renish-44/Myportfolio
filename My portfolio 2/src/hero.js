// Hero animations: particles, lasers, spotlight, and meter animations
const particleCanvas = document.getElementById('hero-particles');
const mouseSpot = document.getElementById('mouse-spot');

function setupParticles() {
  if (!particleCanvas) return;
  const ctx = particleCanvas.getContext('2d');
  function resize() {
    particleCanvas.width = particleCanvas.clientWidth * devicePixelRatio;
    particleCanvas.height = particleCanvas.clientHeight * devicePixelRatio;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = Array.from({length: 80}, () => ({
    x: Math.random()*particleCanvas.width,
    y: Math.random()*particleCanvas.height,
    vx: (Math.random()-0.5)*0.6,
    vy: (Math.random()-0.5)*0.6,
    r: 0.6 + Math.random()*2.2,
    a: 0.08 + Math.random()*0.25
  }));

  function draw() {
    ctx.clearRect(0,0,particleCanvas.width, particleCanvas.height);
    for (let p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -10) p.x = particleCanvas.width + 10;
      if (p.x > particleCanvas.width + 10) p.x = -10;
      if (p.y < -10) p.y = particleCanvas.height + 10;
      if (p.y > particleCanvas.height + 10) p.y = -10;
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r*6*devicePixelRatio);
      g.addColorStop(0, `rgba(215,255,47,${p.a})`);
      g.addColorStop(1, 'rgba(215,255,47,0)');
      ctx.fillStyle = g;
      ctx.fillRect(p.x - p.r*4, p.y - p.r*4, p.r*8, p.r*8);
    }
    requestAnimationFrame(draw);
  }
  draw();
}

function setupMouseSpot() {
  if (!mouseSpot) return;
  document.addEventListener('mousemove', (e) => {
    const rect = document.body.getBoundingClientRect();
    mouseSpot.style.left = e.clientX + 'px';
    mouseSpot.style.top = e.clientY + 'px';
    mouseSpot.style.transform = 'translate(-50%,-50%) scale(1)';
  });
  document.addEventListener('mouseleave', () => {
    mouseSpot.style.transform = 'translate(-50%,-50%) scale(0.6)';
  });
}

function animateMeters() {
  const cpu = document.getElementById('cpu-meter');
  const gpu = document.getElementById('gpu-meter');
  const npu = document.getElementById('npu-meter');
  function run(el) {
    if (!el) return;
    const target = parseInt(el.dataset.value,10) || 0;
    requestAnimationFrame(() => {
      el.style.width = target + '%';
      let start = 0;
      const startT = performance.now();
      function tick(now){
        const t = Math.min(1, (now - startT) / 1200);
        const v = Math.floor(target * t);
        el.textContent = v + '%';
        if (t<1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }
  run(cpu); run(gpu); run(npu);
}

// subtle core animation: pulse cpu cores based on npu value
function animateCpuSvg() {
  const cpuSvg = document.querySelector('.cpu-svg');
  const cores = cpuSvg ? cpuSvg.querySelectorAll('.cpu-cores rect') : [];
  let idx = 0;
  setInterval(()=>{
    cores.forEach((r,i)=> r.setAttribute('fill', i%2===idx ? 'rgba(215,255,47,0.12)' : 'rgba(215,255,47,0.04)'));
    idx = (idx+1)%2;
  }, 420);
}

// lasers subtle movement
function animateLasers() {
  const lasers = document.querySelector('.hero-lasers');
  if (!lasers) return;
  let t=0;
  function step(){
    t+=0.002;
    lasers.style.transform = `translateX(${Math.sin(t)*8}px) rotate(${Math.sin(t/2)*0.4}deg)`;
    requestAnimationFrame(step);
  }
  step();
}

// init
if (document.readyState==='loading') {
  document.addEventListener('DOMContentLoaded', ()=>{ setupParticles(); setupMouseSpot(); animateMeters(); animateCpuSvg(); animateLasers(); });
} else {
  setupParticles(); setupMouseSpot(); animateMeters(); animateCpuSvg(); animateLasers();
}
