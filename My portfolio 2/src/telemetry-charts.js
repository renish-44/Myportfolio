/* ==========================================================================
   AETHER_OS DYNAMIC HUD METRICS AND TELEMETRY CHARTS
   ========================================================================== */

class TelemetryCharts {
  constructor() {
    this.radarCanvas = null;
    this.radarCtx = null;
    this.oscCanvas = null;
    this.oscCtx = null;
    
    this.radarFrameId = null;
    this.oscFrameId = null;
    
    this.oscTime = 0;
    
    // Skills configuration
    this.skills = [
      { name: "FRONTEND", val: 0.95, current: 0 },
      { name: "ANIMATION", val: 0.90, current: 0 },
      { name: "LOGIC", val: 0.88, current: 0 },
      { name: "DEV PIPELINES", val: 0.82, current: 0 },
      { name: "BACKEND/RUST", val: 0.80, current: 0 },
      { name: "UI SYSTEM", val: 0.92, current: 0 }
    ];

    this.skillsSecondary = [
      { val: 0.70, current: 0 },
      { val: 0.85, current: 0 },
      { val: 0.75, current: 0 },
      { val: 0.90, current: 0 },
      { val: 0.65, current: 0 },
      { val: 0.80, current: 0 }
    ];
  }

  init() {
    this.initRadar();
    this.initOscilloscope();
    
    window.addEventListener('resize', () => {
      this.resizeRadar();
      this.resizeOsc();
    });
  }

  // --- 1. HUD RADAR CHART ---
  initRadar() {
    this.radarCanvas = document.getElementById('skills-radar-canvas');
    if (!this.radarCanvas) return;
    this.radarCtx = this.radarCanvas.getContext('2d');
    
    this.resizeRadar();
    this.animateRadar();
  }

  resizeRadar() {
    if (!this.radarCanvas) return;
    const rect = this.radarCanvas.parentElement.getBoundingClientRect();
    this.radarCanvas.width = rect.width;
    this.radarCanvas.height = rect.height;
  }

  animateRadar() {
    if (!this.radarCanvas) return;
    
    const ctx = this.radarCtx;
    const w = this.radarCanvas.width;
    const h = this.radarCanvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) * 0.35;
    const numPoints = this.skills.length;
    
    ctx.clearRect(0, 0, w, h);

    // Ease skill values up on first load
    this.skills.forEach(s => s.current += (s.val - s.current) * 0.05);
    this.skillsSecondary.forEach((s, idx) => s.current += (s.val - s.current) * 0.05);

    // A. Draw Concentric Hexagonal Blueprint Grid
    ctx.strokeStyle = 'rgba(215, 255, 47, 0.08)';
    ctx.lineWidth = 1;
    for (let j = 1; j <= 4; j++) {
      const scale = j / 4;
      ctx.beginPath();
      for (let i = 0; i < numPoints; i++) {
        const angle = (i * 2 * Math.PI) / numPoints - Math.PI / 2;
        const x = cx + Math.cos(angle) * radius * scale;
        const y = cy + Math.sin(angle) * radius * scale;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }

    // B. Draw Axis lines
    ctx.beginPath();
    for (let i = 0; i < numPoints; i++) {
      const angle = (i * 2 * Math.PI) / numPoints - Math.PI / 2;
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
    }
    ctx.stroke();

    // C. Draw Labels on vertices
    ctx.font = '8px JetBrains Mono';
    ctx.fillStyle = '#8A8A8A';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let i = 0; i < numPoints; i++) {
      const angle = (i * 2 * Math.PI) / numPoints - Math.PI / 2;
      const x = cx + Math.cos(angle) * radius * 1.2;
      const y = cy + Math.sin(angle) * radius * 1.25;
      ctx.fillText(this.skills[i].name, x, y);
    }

    // D. Render Secondary Skill Layer (Electric Green)
    ctx.fillStyle = 'rgba(166, 255, 0, 0.06)';
    ctx.strokeStyle = 'rgba(166, 255, 0, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i < numPoints; i++) {
      const angle = (i * 2 * Math.PI) / numPoints - Math.PI / 2;
      const val = this.skillsSecondary[i].current;
      const x = cx + Math.cos(angle) * radius * val;
      const y = cy + Math.sin(angle) * radius * val;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // E. Render Primary Skill Layer (Neon Lime)
    ctx.fillStyle = 'rgba(215, 255, 47, 0.12)';
    ctx.strokeStyle = 'rgba(215, 255, 47, 0.85)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let i = 0; i < numPoints; i++) {
      const angle = (i * 2 * Math.PI) / numPoints - Math.PI / 2;
      const val = this.skills[i].current;
      const x = cx + Math.cos(angle) * radius * val;
      const y = cy + Math.sin(angle) * radius * val;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // F. Draw Glowing Nodes on intersections
    for (let i = 0; i < numPoints; i++) {
      const angle = (i * 2 * Math.PI) / numPoints - Math.PI / 2;
      const val = this.skills[i].current;
      const x = cx + Math.cos(angle) * radius * val;
      const y = cy + Math.sin(angle) * radius * val;
      
      ctx.fillStyle = '#D7FF2F';
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.strokeStyle = 'rgba(215, 255, 47, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.stroke();
    }

    // G. 360 Sweep radar line
    const sweepAngle = (Date.now() * 0.0006) % (Math.PI * 2);
    ctx.strokeStyle = 'rgba(215, 255, 47, 0.15)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(sweepAngle) * radius, cy + Math.sin(sweepAngle) * radius);
    ctx.stroke();

    this.radarFrameId = requestAnimationFrame(() => this.animateRadar());
  }

  // --- 2. HERO SIDEBAR SYSTEM OSCILLOSCOPE ---
  initOscilloscope() {
    this.oscCanvas = document.getElementById('oscilloscope-canvas');
    if (!this.oscCanvas) return;
    this.oscCtx = this.oscCanvas.getContext('2d');
    
    this.resizeOsc();
    this.animateOscilloscope();
  }

  resizeOsc() {
    if (!this.oscCanvas) return;
    this.oscCanvas.width = this.oscCanvas.clientWidth;
    this.oscCanvas.height = this.oscCanvas.clientHeight;
  }

  animateOscilloscope() {
    if (!this.oscCanvas) return;
    
    const ctx = this.oscCtx;
    const w = this.oscCanvas.width;
    const h = this.oscCanvas.height;
    
    ctx.fillStyle = '#080808';
    ctx.fillRect(0, 0, w, h);

    // Draw background sub-grid
    ctx.strokeStyle = 'rgba(215, 255, 47, 0.02)';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < w; x += 15) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 15) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Draw dual simulated waveforms
    this.oscTime += 0.05;

    // Wave 1: Sine + Noise
    ctx.strokeStyle = 'rgba(215, 255, 47, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.shadowColor = '#D7FF2F';
    ctx.shadowBlur = 4;
    ctx.beginPath();
    for (let x = 0; x < w; x++) {
      const sineVal1 = Math.sin(x * 0.05 + this.oscTime) * (h * 0.25);
      const sineVal2 = Math.cos(x * 0.012 - this.oscTime * 0.5) * (h * 0.15);
      const noise = (Math.random() - 0.5) * 2.5;
      const y = (h / 2) + sineVal1 + sineVal2 + noise;
      
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.shadowBlur = 0; // reset shadow glow

    // Wave 2: Faded Out of Phase reference Wave
    ctx.strokeStyle = 'rgba(166, 255, 0, 0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x < w; x++) {
      const sineVal = Math.sin(x * 0.03 - this.oscTime * 1.2) * (h * 0.35);
      const y = (h / 2) + sineVal;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    this.oscFrameId = requestAnimationFrame(() => this.animateOscilloscope());
  }

  destroy() {
    if (this.radarFrameId) cancelAnimationFrame(this.radarFrameId);
    if (this.oscFrameId) cancelAnimationFrame(this.oscFrameId);
  }
}

export const telemetryCharts = new TelemetryCharts();
