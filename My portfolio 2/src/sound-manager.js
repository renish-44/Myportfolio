/* ==========================================================================
   AETHER_OS WEB AUDIO SYNTHESIZER ENGINE (SOUND MANAGER)
   ========================================================================== */

class SoundManager {
  constructor() {
    this.ctx = null;
    this.enabled = false;
    this.masterGain = null;
  }

  // Safe initialization on user gesture
  init() {
    if (this.ctx) return;
    
    try {
      // Standardize AudioContext across browsers
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContextClass();
      
      // Setup master gain control
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.12, this.ctx.currentTime); // keep volume subtle and premium
      this.masterGain.connect(this.ctx.destination);
    } catch (e) {
      console.warn("Web Audio API not supported in this browser environment.", e);
    }
  }

  toggle() {
    this.init();
    
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    
    this.enabled = !this.enabled;
    return this.enabled;
  }

  // Synthesize a high-tech boot sweep
  playBoot() {
    if (!this.enabled || !this.ctx) return;

    const time = this.ctx.currentTime;
    
    // Deep oscillator for engine hum
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(60, time);
    osc1.frequency.exponentialRampToValueAtTime(120, time + 1.2);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(120, time);
    osc2.frequency.exponentialRampToValueAtTime(240, time + 1.5);

    gainNode.gain.setValueAtTime(0.01, time);
    gainNode.gain.linearRampToValueAtTime(0.2, time + 0.3);
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + 1.5);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(this.masterGain);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + 1.6);
    osc2.stop(time + 1.6);

    // Chime sweep overlay
    setTimeout(() => this.playSuccess(), 500);
  }

  // Synthesize a short, crisp technical click
  playClick() {
    if (!this.enabled || !this.ctx) return;
    
    const time = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1800, time);
    osc.frequency.exponentialRampToValueAtTime(800, time + 0.08);

    gainNode.gain.setValueAtTime(0.15, time);
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.08);

    osc.connect(gainNode);
    gainNode.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.09);
  }

  // Synthesize a rapid, futuristic hover sweep
  playHover() {
    if (!this.enabled || !this.ctx) return;
    
    const time = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, time);
    osc.frequency.exponentialRampToValueAtTime(1400, time + 0.06);

    gainNode.gain.setValueAtTime(0.05, time);
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.06);

    osc.connect(gainNode);
    gainNode.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.07);
  }

  // Synthesize double computer chime for success operations
  playSuccess() {
    if (!this.enabled || !this.ctx) return;

    const time = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    const gain2 = this.ctx.createGain();

    // First chime note
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(987.77, time); // B5 Note
    gain1.gain.setValueAtTime(0.1, time);
    gain1.gain.exponentialRampToValueAtTime(0.001, time + 0.25);
    osc1.connect(gain1);
    gain1.connect(this.masterGain);

    // Second chime note, slightly offset in time
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1318.51, time + 0.08); // E6 Note
    gain2.gain.setValueAtTime(0.1, time + 0.08);
    gain2.gain.exponentialRampToValueAtTime(0.001, time + 0.35);
    osc2.connect(gain2);
    gain2.connect(this.masterGain);

    osc1.start(time);
    osc1.stop(time + 0.3);
    
    osc2.start(time + 0.08);
    osc2.stop(time + 0.4);
  }
}

export const sound = new SoundManager();
