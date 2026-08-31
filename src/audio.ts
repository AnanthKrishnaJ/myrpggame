export class AudioEngine {
  private ctx: AudioContext | null = null;
  
  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, type: OscillatorType, duration: number, vol: number = 0.1, slideFreq?: number) {
    try {
      this.init();
      if (!this.ctx) return;
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      if (slideFreq) {
        osc.frequency.exponentialRampToValueAtTime(slideFreq, this.ctx.currentTime + duration);
      }
      
      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio play failed', e);
    }
  }

  playAttack() {
    this.playTone(150, 'triangle', 0.15, 0.2, 50);
  }

  playHit() {
    this.playTone(100, 'sawtooth', 0.2, 0.2, 40);
  }

  playHeal() {
    this.playTone(400, 'sine', 0.3, 0.1, 800);
    setTimeout(() => this.playTone(600, 'sine', 0.4, 0.1, 1000), 100);
  }

  playFlee() {
    this.playTone(400, 'sine', 0.1, 0.1, 200);
    setTimeout(() => this.playTone(300, 'sine', 0.1, 0.1, 150), 100);
    setTimeout(() => this.playTone(200, 'sine', 0.1, 0.1, 100), 200);
  }

  playTreasure() {
    this.playTone(800, 'square', 0.1, 0.05);
    setTimeout(() => this.playTone(1200, 'square', 0.2, 0.05), 100);
  }

  playLevelUp() {
    [440, 554, 659, 880].forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 'square', 0.3, 0.05), i * 150);
    });
  }

  playExplore() {
    this.playTone(300, 'sine', 0.2, 0.05, 350);
  }

  playStart() {
    this.playTone(300, 'square', 0.2, 0.1);
    setTimeout(() => this.playTone(400, 'square', 0.2, 0.1), 200);
    setTimeout(() => this.playTone(500, 'square', 0.4, 0.1), 400);
  }

  playSelect() {
    this.playTone(600, 'sine', 0.1, 0.05, 800);
  }

  playGameOver() {
    this.playTone(300, 'sawtooth', 0.5, 0.2, 150);
    setTimeout(() => this.playTone(250, 'sawtooth', 0.5, 0.2, 100), 400);
    setTimeout(() => this.playTone(200, 'sawtooth', 1.0, 0.2, 50), 800);
  }

  playVictory() {
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 'triangle', 0.4, 0.1), i * 200);
    });
  }
  
  playEncounter() {
    this.playTone(200, 'sawtooth', 0.2, 0.1, 300);
    setTimeout(() => this.playTone(300, 'sawtooth', 0.3, 0.1, 400), 150);
  }
}

export const audio = new AudioEngine();
