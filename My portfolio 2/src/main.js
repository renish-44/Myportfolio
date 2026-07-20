/* ==========================================================================
   AETHER_OS CORE MAIN CONTROLLER (VITE + GSAP COORDINATOR)
   ========================================================================== */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sound } from './sound-manager.js';
import { bgBackground } from './canvas-background.js';
import { telemetryCharts } from './telemetry-charts.js';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

class MainController {
  constructor() {
    this.bootProgress = 0;
    this.latencyInterval = null;
    this.clockInterval = null;
  }

  init() {
    // 1. Initialize Visual Telemetry Background Canvas
    bgBackground.init();

    // 2. Initialize Telemetry Canvas Charts
    telemetryCharts.init();

    // 3. Start BIOS Diagnostic Boot Sequencer
    this.runBootSequence();

    // 4. Register Custom Cursor Handlers
    this.initCustomCursor();

    // 5. Initialize Clock and Latency telemetry
    this.startGlobalTelemetry();

    // 6. Draw GitHub mock matrix heatmap commits
    this.buildGitHubHeatmap();

    // 7. Initialize Scroll Animations & Counters
    this.initScrollAnimations();

    // 8. Bind global click/hover synthesizers
    this.bindAudioSignals();

    // 9. Bind timeline circuit trace
    this.initTimelineCircuit();

    // 10. Bind Contact Console submission handler
    this.initContactConsole();
  }

  // --- 1. BOOT TERMINAL SEQUENCER ---
  runBootSequence() {
    const bootLogs = document.getElementById('boot-logs');
    const progressBar = document.getElementById('boot-progress-bar');
    const percentageText = document.getElementById('boot-percentage');
    const operationText = document.getElementById('boot-operation');

    const logEntries = [
      { text: "AETHER_BIOS ROM Version 4.82 (C) 2026", type: "success" },
      { text: "CPU Core Load Level: OK [x8 Cores Detected]", type: "info" },
      { text: "Initializing Core Memory channels: 16384 MB... Checked", type: "info" },
      { text: "WARNING: Latency vector variance detected, normalizing...", type: "warning" },
      { text: "Web Audio Synthesizer Interface: READY", type: "success" },
      { text: "Injecting GSAP Animation Timelines & Easing Nodes... Loaded", type: "info" },
      { text: "Mapping Canvas Hologram Grid Matrices: OK", type: "info" },
      { text: "Connecting Secure Protocol Tunnel: ESTABLISHED on Port 443", type: "success" },
      { text: "SYS_COM_PORT: Listening for transmission packets...", type: "info" },
      { text: "Booting AETHER_OS GUI shell: boot_portfolio.exe", type: "success" }
    ];

    let currentLogIndex = 0;

    // Simulate logs printing with timer
    const printLogsInterval = setInterval(() => {
      if (currentLogIndex < logEntries.length) {
        const entry = logEntries[currentLogIndex];
        const logRow = document.createElement('div');
        logRow.className = `log-entry ${entry.type}`;
        logRow.innerHTML = `<span class="log-indicator">//</span> <span class="log-text">${entry.text}</span>`;
        bootLogs.appendChild(logRow);
        
        // Auto-scroll logs container
        bootLogs.parentElement.scrollTop = bootLogs.parentElement.scrollHeight;

        currentLogIndex++;
      } else {
        clearInterval(printLogsInterval);
      }
    }, 120);

    // Simulate progress bar increase
    const progressInterval = setInterval(() => {
      if (this.bootProgress < 100) {
        this.bootProgress += Math.floor(Math.random() * 5) + 1;
        if (this.bootProgress > 100) this.bootProgress = 100;
        
        progressBar.style.width = `${this.bootProgress}%`;
        percentageText.textContent = `${this.bootProgress.toString().padStart(2, '0')}%`;

        // Update operations message
        if (this.bootProgress < 30) {
          operationText.textContent = "INITIALIZING CORE INTELLIGENCE...";
        } else if (this.bootProgress < 60) {
          operationText.textContent = "MAPPING DIGITAL NETWORKS...";
        } else if (this.bootProgress < 90) {
          operationText.textContent = "STABILIZING GRAPHICAL HUD VIEWS...";
        } else {
          operationText.textContent = "LAUNCHING OPERATING ENVIRONMENT...";
        }
      } else {
        clearInterval(progressInterval);
        setTimeout(() => this.unlockDashboard(), 400);
      }
    }, 80);
  }

  unlockDashboard() {
    // Play sci-fi system boot sound (requires user click audio state toggle check, but handles gracefully)
    sound.playBoot();

    // GSAP Timeline to transition out boot screen and introduce UI elements
    const tl = gsap.timeline();
    tl.to('#boot-screen', {
      duration: 0.8,
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
      ease: 'power4.inOut'
    })
    .to('#boot-screen', {
      display: 'none'
    })
    .to('body', {
      onStart: () => {
        document.body.classList.remove('loading');
        document.getElementById('custom-cursor').style.display = 'block';
      }
    })
    .fromTo('.hud-header', {
      y: -60,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.4')
    .fromTo('#hero', {
      y: 40,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.6');
  }

  // --- 2. CUSTOM HUD CURSOR ---
  initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    const cCoords = cursor.querySelector('.cursor-coords');

    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Update technical coordinate tags
      const formatX = mouseX.toString().padStart(4, '0');
      const formatY = mouseY.toString().padStart(4, '0');
      cCoords.textContent = `X: ${formatX} // Y: ${formatY}`;

      // Smooth custom cursor lag using GSAP quickSetter
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: 'power2.out'
      });
    });

    // Add active state to interactive hover elements
    const hoverables = 'a, button, .db-row, input, textarea, [data-tilt]';
    
    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest(hoverables);
      if (target) {
        cursor.classList.add('active');
        const label = cursor.querySelector('.cursor-label');
        
        if (target.tagName === 'A' || target.classList.contains('btn-db-link')) {
          label.textContent = "SYS.EXECUTE_LINK()";
        } else if (target.tagName === 'BUTTON' || target.type === 'submit') {
          label.textContent = "SYS.TRIGGER_CMD()";
        } else if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
          label.textContent = "SYS.WRITE_PAYLOAD()";
        } else if (target.classList.contains('db-row')) {
          label.textContent = "SYS.QUERY_DATAPACK()";
        } else {
          label.textContent = "SYS.INTERACT()";
        }
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest(hoverables);
      if (target) {
        cursor.classList.remove('active');
        cursor.querySelector('.cursor-label').textContent = "SYSTEM_READY";
      }
    });
  }

  // --- 3. SYSTEM TELEMETRY (CLOCK & LATENCY) ---
  startGlobalTelemetry() {
    const clockVal = document.getElementById('hud-clock');
    const latencyVal = document.getElementById('hud-latency');
    
    // Live HUD Operating Clock
    this.clockInterval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      clockVal.textContent = timeStr;
    }, 1000);

    // Live Latency Simulator
    this.latencyInterval = setInterval(() => {
      const lat = Math.floor(Math.random() * 8) + 11;
      latencyVal.textContent = `${lat}ms`;
    }, 3000);
  }

  // --- 4. GITHUB SYSTEM MATRIX HEATMAP ---
  buildGitHubHeatmap() {
    const grid = document.getElementById('git-commits-grid');
    if (!grid) return;

    // Build 53 columns * 7 rows = 371 mockup contribution days
    const cellCount = 53 * 7;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div');
      
      // Randomize activity level (favor lower levels for natural representation)
      const rand = Math.random();
      let lvl = 0;
      let count = 0;

      if (rand > 0.90) {
        lvl = 4;
        count = Math.floor(Math.random() * 4) + 9;
      } else if (rand > 0.75) {
        lvl = 3;
        count = Math.floor(Math.random() * 3) + 6;
      } else if (rand > 0.55) {
        lvl = 2;
        count = Math.floor(Math.random() * 3) + 3;
      } else if (rand > 0.25) {
        lvl = 1;
        count = Math.floor(Math.random() * 2) + 1;
      }
      
      cell.className = `commit-cell lvl-${lvl}`;
      cell.setAttribute('data-count', count);
      fragment.appendChild(cell);
    }

    grid.appendChild(fragment);
  }

  // --- 5. GSAP SCROLL TRIGGERS ---
  initScrollAnimations() {
    // Fade-in sections on scroll
    const sections = gsap.utils.toArray('.hud-section');
    sections.forEach(section => {
      gsap.to(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      });
    });

    // Decrypting Text Reveal Effect (About section paragraphs)
    const decryptEls = document.querySelectorAll('.decrypt-text');
    decryptEls.forEach(el => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => this.decryptText(el)
      });
    });

    // Animated HUD Counters
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      ScrollTrigger.create({
        trigger: counter,
        start: 'top 90%',
        onEnter: () => {
          gsap.to(counter, {
            innerText: target,
            duration: 2,
            snap: { innerText: 1 },
            ease: 'power3.out'
          });
        }
      });
    });

    // 3D Tilt Effect on cards
    const tiltCards = document.querySelectorAll('[data-tilt]');
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xc = rect.width / 2;
        const yc = rect.height / 2;

        const angleX = (yc - y) / 15; // vertical tilt degrees
        const angleY = (x - xc) / 30; // horizontal tilt degrees

        gsap.to(card, {
          transform: `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.01)`,
          duration: 0.2,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`,
          duration: 0.4,
          ease: 'power2.out'
        });
      });
    });

    // Magnetic Button Effect
    const magneticBtns = document.querySelectorAll('.magnetic');
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.35,
          y: y * 0.35,
          duration: 0.2,
          ease: 'power2.out'
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.4,
          ease: 'power3.out'
        });
      });
    });
  }

  decryptText(el) {
    const originalText = el.textContent.trim();
    const chars = "$%#@!*&+=?[]{}<>abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let speed = parseInt(el.getAttribute('data-speed'), 10) || 50;
    
    let frame = 0;
    el.textContent = "";

    const doDecrypt = () => {
      let currentText = "";
      let completeCount = 0;

      for (let i = 0; i < originalText.length; i++) {
        if (originalText[i] === " ") {
          currentText += " ";
          completeCount++;
          continue;
        }

        // How many frames this character decrypts over
        const delayFrames = i * 0.4;
        if (frame > delayFrames) {
          if (frame - delayFrames > 12) {
            currentText += originalText[i];
            completeCount++;
          } else {
            currentText += chars[Math.floor(Math.random() * chars.length)];
          }
        } else {
          currentText += " ";
        }
      }

      el.textContent = currentText;
      frame++;

      if (completeCount < originalText.length) {
        requestAnimationFrame(doDecrypt);
      }
    };

    doDecrypt();
  }

  // --- 6. AUDIO SYSTEM BINDING AND SIGNALS ---
  bindAudioSignals() {
    const audioBtn = document.getElementById('sound-toggle');
    const audioStatus = document.getElementById('audio-status');

    audioBtn.addEventListener('click', () => {
      const active = sound.toggle();
      if (active) {
        audioBtn.classList.add('active');
        audioStatus.textContent = "ON";
        sound.playSuccess();
      } else {
        audioBtn.classList.remove('active');
        audioStatus.textContent = "OFF";
      }
    });

    // Attach click/hover audio synthesis sweeps to controls
    const triggerAudioEls = document.querySelectorAll('a, button, .db-row, input, textarea');
    triggerAudioEls.forEach(el => {
      el.addEventListener('mouseenter', () => sound.playHover());
      el.addEventListener('click', () => sound.playClick());
    });
  }

  // --- 7. SVG TIMELINE CIRCUIT PATH ---
  initTimelineCircuit() {
    const svg = document.getElementById('timeline-svg-path');
    const circuitWire = document.getElementById('circuit-wire');
    const circuitWireActive = document.getElementById('circuit-wire-active');
    
    if (!svg || !circuitWire) return;

    const drawWire = () => {
      const nodes = document.querySelectorAll('.timeline-node');
      if (nodes.length === 0) return;

      const svgRect = svg.getBoundingClientRect();
      let pathD = "";

      nodes.forEach((node, index) => {
        const dot = node.querySelector('.node-dot');
        const dotRect = dot.getBoundingClientRect();
        
        // Coordinates relative to the parent SVG
        const x = dotRect.left - svgRect.left + dotRect.width / 2;
        const y = dotRect.top - svgRect.top + dotRect.height / 2;

        if (index === 0) {
          pathD += `M ${x} ${y}`;
        } else {
          // Create circuit board step joints (horizontal offsets before going vertical)
          const prevDot = nodes[index - 1].querySelector('.node-dot');
          const prevDotRect = prevDot.getBoundingClientRect();
          const prevY = prevDotRect.top - svgRect.top + prevDotRect.height / 2;
          
          const midY = prevY + (y - prevY) / 2;

          pathD += ` L ${x} ${midY} L ${x} ${y}`;
        }
      });

      circuitWire.setAttribute('d', pathD);
      circuitWireActive.setAttribute('d', pathD);

      // Setup ScrollTrigger for animating trace glowing pulse
      gsap.fromTo(circuitWireActive, {
        strokeDasharray: '3000',
        strokeDashoffset: '3000'
      }, {
        strokeDashoffset: '0',
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 70%',
          end: 'bottom 40%',
          scrub: true
        }
      });
    };

    // Calculate position
    setTimeout(drawWire, 500); // delay to ensure layouts stabilize
    window.addEventListener('resize', drawWire);
  }

  // --- 8. CONTACT TERMINAL TRANSMISSION PORT ---
  initContactConsole() {
    const form = document.getElementById('contact-form');
    const cliOutput = document.querySelector('.console-diagnostic-output');
    
    if (!form || !cliOutput) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Trigger high-tech transmission sounds
      sound.playSuccess();

      const name = document.getElementById('input-name').value;
      const email = document.getElementById('input-email').value;

      // Print transmission telemetry to form terminal console
      const steps = [
        `sys.compile_packet("${name}", "${email}")`,
        `sys.encrypt_headers(SSL_TLS_v1.3)... OK`,
        `sys.routing_route_ip(52.5200° N, 13.4050° E)... OK`,
        `sys.transmit_payload_buffer()... COMPLETED`,
        `TRANSMISSION GRANTED: MESSAGE DELIVERED`
      ];

      steps.forEach((stepText, idx) => {
        setTimeout(() => {
          const logLine = document.createElement('div');
          
          if (idx === steps.length - 1) {
            logLine.className = "cli-line cli-success";
            logLine.innerHTML = `<span class="cli-prompt">></span> [SUCCESS] ${stepText}`;
            
            // Clear inputs
            form.reset();
            alert("UPLINK SUCCESS: TRANSMISSION GRANTED");
          } else {
            logLine.className = "cli-line";
            logLine.innerHTML = `<span class="cli-prompt">></span> ${stepText}`;
          }
          
          cliOutput.appendChild(logLine);
          cliOutput.scrollTop = cliOutput.scrollHeight;
        }, (idx + 1) * 600);
      });
    });
  }

  destroy() {
    if (this.latencyInterval) clearInterval(this.latencyInterval);
    if (this.clockInterval) clearInterval(this.clockInterval);
    bgBackground.destroy();
    telemetryCharts.destroy();
  }
}

// Instantiate and coordinate
const controller = new MainController();
window.addEventListener('DOMContentLoaded', () => {
  controller.init();
});
