/* ==========================================================================
   AETHER_OS INTERACTIVE CANVAS GRID BACKGROUND SYSTEM
   ========================================================================= */

class CanvasBackground {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.width = 0;
    this.height = 0;
    
    // Mouse properties (with lerped tracking for premium fluid motion)
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.particles = [];
    this.gridSize = 60; // Grid line spacing
    this.gridNodes = [];
    
    this.animationFrameId = null;
  }

  init() {
    this.canvas = document.getElementById('bg-canvas');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.resize();
    
    // Set initial mouse coordinates to center
    this.mouse.x = this.width / 2;
    this.mouse.y = this.height / 2;
    this.mouse.targetX = this.mouse.x;
    this.mouse.targetY = this.mouse.y;

    // Generate floating HUD data particles
    this.createParticles(35);

    // Bind event listeners
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => this.handleMouseMove(e));

    // Start render loop
    this.loop();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    
    // Re-create background grid layout nodes
    this.gridNodes = [];
    for (let x = 0; x < this.width; x += this.gridSize) {
      for (let y = 0; y < this.height; y += this.gridSize) {
        this.gridNodes.push({
          baseX: x,
          baseY: y,
          x: x,
          y: y,
          vx: 0,
          vy: 0
        });
      }
    }
  }

  handleMouseMove(e) {
    this.mouse.targetX = e.clientX;
    this.mouse.targetY = e.clientY;
  }

  createParticles(count) {
    const chars = ['0', '1', '[SYS]', '[OS]', '+', '//', 'x', '[TEL]'];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 8 + 6,
        text: chars[Math.floor(Math.random() * chars.length)],
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.15 + 0.05,
        drift: Math.random() * 0.2 - 0.1
      });
    }
  }

  loop() {
    // Lerp mouse movement for smoother visual inertia
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.08;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.08;

    // Clear buffer
    this.ctx.fillStyle = '#050505';
    this.ctx.fillRect(0, 0, this.width, this.height);

    // 1. Draw Mouse Spotlight Radial Glow
    const gradient = this.ctx.createRadialGradient(
      this.mouse.x, this.mouse.y, 50,
      this.mouse.x, this.mouse.y, 350
    );
    gradient.addColorStop(0, 'rgba(215, 255, 47, 0.04)');
    gradient.addColorStop(0.5, 'rgba(215, 255, 47, 0.015)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // 2. Render & Animate Grid Lines
    this.ctx.strokeStyle = 'rgba(215, 255, 47, 0.04)';
    this.ctx.lineWidth = 1;

    // Vertical lines
    for (let x = 0; x < this.width; x += this.gridSize) {
      this.ctx.beginPath();
      for (let y = 0; y < this.height; y += 15) {
        // Apply slight warp based on mouse distance
        const dx = this.mouse.x - x;
        const dy = this.mouse.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let warp = 0;
        
        if (dist < 220) {
          const force = (220 - dist) / 220;
          warp = Math.sin(y * 0.05) * force * 6 * (dx > 0 ? -1 : 1);
        }
        
        if (y === 0) this.ctx.moveTo(x + warp, y);
        else this.ctx.lineTo(x + warp, y);
      }
      this.ctx.stroke();
    }

    // Horizontal lines
    for (let y = 0; y < this.height; y += this.gridSize) {
      this.ctx.beginPath();
      for (let x = 0; x < this.width; x += 15) {
        const dx = this.mouse.x - x;
        const dy = this.mouse.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let warp = 0;
        
        if (dist < 220) {
          const force = (220 - dist) / 220;
          warp = Math.sin(x * 0.05) * force * 6 * (dy > 0 ? -1 : 1);
        }
        
        if (x === 0) this.ctx.moveTo(x, y + warp);
        else this.ctx.lineTo(x, y + warp);
      }
      this.ctx.stroke();
    }

    // 3. Render Technical Crosshair intersections under mouse
    const alignedX = Math.round(this.mouse.x / this.gridSize) * this.gridSize;
    const alignedY = Math.round(this.mouse.y / this.gridSize) * this.gridSize;

    this.ctx.strokeStyle = 'rgba(215, 255, 47, 0.2)';
    this.ctx.lineWidth = 0.5;
    
    // Draw tick marker on intersection near mouse
    this.ctx.beginPath();
    this.ctx.arc(alignedX, alignedY, 4, 0, Math.PI * 2);
    this.ctx.stroke();

    // 4. Render and animate floating digital trace particles
    this.ctx.font = '7px JetBrains Mono';
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      
      // Float up
      p.y -= p.speed;
      p.x += p.drift;
      
      // Screen wrap
      if (p.y < -10) {
        p.y = this.height + 10;
        p.x = Math.random() * this.width;
      }
      if (p.x < -10) p.x = this.width + 10;
      if (p.x > this.width + 10) p.x = -10;

      // Draw particle text/element
      this.ctx.fillStyle = `rgba(215, 255, 47, ${p.opacity})`;
      this.ctx.fillText(p.text, p.x, p.y);
    }

    this.animationFrameId = requestAnimationFrame(() => this.loop());
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}

export const bgBackground = new CanvasBackground();
