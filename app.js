/**
 * ============================================================================
 * SOLAR COMMAND — GESTURE-CONTROLLED 3D SOLAR SYSTEM
 * Master Spatial Computing & Computer Vision Interaction Engine
 * Enhanced Realism, Rich Planetary Telemetry & Mobile Control System
 * ============================================================================
 */

'use strict';

/* ============================================================================
   1. PROCEDURAL AUDIO SYNTHESIZER
   ============================================================================ */
class CommandAudio {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isEnabled = true;
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.65, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
      this.isInitialized = true;
    } catch (e) {
      console.warn('Web Audio API unavailable:', e);
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle(enable) {
    this.isEnabled = enable !== undefined ? enable : !this.isEnabled;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isEnabled ? 0.65 : 0, this.ctx.currentTime, 0.05);
    }
    return this.isEnabled;
  }

  playStartup() {
    if (!this.isEnabled || !this.ctx) return;
    this.resume();
    try {
      const now = this.ctx.currentTime;
      [130.81, 164.81, 196.00, 261.63].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);
        gain.gain.setValueAtTime(0.01, now + idx * 0.1);
        gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.1 + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.6);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.65);
      });
    } catch (e) {}
  }

  playTargetLock() {
    if (!this.isEnabled || !this.ctx) return;
    this.resume();
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.setValueAtTime(1174.66, now + 0.05);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) {}
  }

  playGrab() {
    if (!this.isEnabled || !this.ctx) return;
    this.resume();
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.25);
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(500, now);
      filter.Q.setValueAtTime(4, now);
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.32);
    } catch (e) {}
  }

  playPause() {
    if (!this.isEnabled || !this.ctx) return;
    this.resume();
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.4);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.48);
    } catch (e) {}
  }

  playReset() {
    if (!this.isEnabled || !this.ctx) return;
    this.resume();
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(660, now + 0.35);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.42);
    } catch (e) {}
  }
}

/* ============================================================================
   2. HIGH-FIDELITY PROCEDURAL TEXTURE GENERATOR
   Creates high-res, astronomically accurate canvas textures for Sun, Planets, and Moon
   ============================================================================ */
class TextureFactory {
  static createSun() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Solar Photosphere Gradient
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0, '#fffbe6');
    grad.addColorStop(0.2, '#ffd000');
    grad.addColorStop(0.5, '#f77f00');
    grad.addColorStop(0.8, '#d62828');
    grad.addColorStop(1, '#9e0018');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

    // Convective Granulation Cells
    ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
    for (let i = 0; i < 600; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 512;
      const r = Math.random() * 16 + 3;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Solar Flare Turbulence Streaks
    ctx.fillStyle = 'rgba(255, 230, 150, 0.12)';
    for (let i = 0; i < 60; i++) {
      const y = Math.random() * 512;
      const h = Math.random() * 8 + 2;
      ctx.fillRect(0, y, 1024, h);
    }

    // Authentic Bipolar Sunspot Pairs (Penumbra + Umbra)
    const sunspots = [
      { x: 320, y: 180, r: 14 },
      { x: 350, y: 195, r: 9 },
      { x: 680, y: 310, r: 16 },
      { x: 715, y: 300, r: 11 },
      { x: 500, y: 220, r: 10 }
    ];

    sunspots.forEach(s => {
      // Penumbra (Outer cooler reddish-brown halo)
      ctx.fillStyle = 'rgba(120, 25, 0, 0.75)';
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r * 1.6, 0, Math.PI * 2);
      ctx.fill();

      // Umbra (Dark magnetic core)
      ctx.fillStyle = 'rgba(30, 4, 0, 0.95)';
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    });

    return new THREE.CanvasTexture(canvas);
  }

  static createSunCorona() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    grad.addColorStop(0, 'rgba(255, 255, 240, 1)');
    grad.addColorStop(0.2, 'rgba(255, 210, 50, 0.8)');
    grad.addColorStop(0.45, 'rgba(255, 120, 0, 0.35)');
    grad.addColorStop(0.75, 'rgba(230, 40, 0, 0.12)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  static createMercury() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Real Basaltic Grey Crust
    ctx.fillStyle = '#726d67';
    ctx.fillRect(0, 0, 512, 256);

    // Darker volcanic maria/lowland plains
    ctx.fillStyle = '#544f49';
    ctx.beginPath();
    ctx.ellipse(150, 110, 80, 50, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(370, 140, 95, 60, -0.3, 0, Math.PI * 2);
    ctx.fill();

    // Caloris Basin (Multi-ring impact structure)
    ctx.strokeStyle = '#433f3a';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(140, 100, 36, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(140, 100, 22, 0, Math.PI * 2);
    ctx.stroke();

    // High-albedo Ray Craters (Kuiper, Hokusai radial ejecta rays)
    const rayCraters = [
      { x: 310, y: 80, r: 6 },
      { x: 440, y: 190, r: 7 },
      { x: 190, y: 170, r: 5 }
    ];

    rayCraters.forEach(rc => {
      ctx.strokeStyle = 'rgba(215, 210, 200, 0.35)';
      ctx.lineWidth = 1.2;
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 8) {
        ctx.beginPath();
        ctx.moveTo(rc.x, rc.y);
        ctx.lineTo(rc.x + Math.cos(a) * (Math.random() * 60 + 30), rc.y + Math.sin(a) * (Math.random() * 40 + 20));
        ctx.stroke();
      }
    });

    // 250+ Random Impact Craters with shadows & illuminated rims
    for (let i = 0; i < 260; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 256;
      const r = Math.random() * 6 + 1.2;

      // Dark floor
      ctx.fillStyle = '#3c3834';
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();

      // Sunlit rim
      ctx.fillStyle = '#aba298';
      ctx.beginPath();
      ctx.arc(x - 0.7, y - 0.7, r * 0.7, 0, Math.PI * 2);
      ctx.fill();
    }

    return new THREE.CanvasTexture(canvas);
  }

  static createVenus() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // True visible sulfuric haze cream color
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, '#f8f1e4');
    grad.addColorStop(0.3, '#ebd8b2');
    grad.addColorStop(0.7, '#dec59b');
    grad.addColorStop(1, '#f8f1e4');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);

    // Subtle atmospheric chevron bands (Westward cloud super-rotation)
    ctx.strokeStyle = 'rgba(195, 160, 95, 0.15)';
    ctx.lineWidth = 4;
    for (let y = 30; y < 230; y += 12) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.quadraticCurveTo(256, y + (y < 128 ? 14 : -14), 512, y);
      ctx.stroke();
    }

    // Bright polar cloud hoods
    ctx.fillStyle = 'rgba(255, 255, 245, 0.45)';
    ctx.fillRect(0, 0, 512, 22);
    ctx.fillRect(0, 234, 512, 22);

    return new THREE.CanvasTexture(canvas);
  }

  static createEarth() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // 1. Deep Ocean Sapphire Base
    const oceanGrad = ctx.createLinearGradient(0, 0, 0, 512);
    oceanGrad.addColorStop(0, '#0c284d');
    oceanGrad.addColorStop(0.5, '#0f386b');
    oceanGrad.addColorStop(1, '#0b2447');
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(0, 0, 1024, 512);

    // Continental shelf turquoise rim
    ctx.fillStyle = 'rgba(22, 101, 138, 0.35)';
    const shelves = [
      { x: 240, y: 150, rx: 140, ry: 95 },
      { x: 330, y: 320, rx: 100, ry: 120 },
      { x: 530, y: 160, rx: 110, ry: 90 },
      { x: 550, y: 290, rx: 120, ry: 110 },
      { x: 750, y: 180, rx: 170, ry: 110 },
      { x: 820, y: 370, rx: 95, ry: 75 }
    ];
    shelves.forEach(s => {
      ctx.beginPath();
      ctx.ellipse(s.x, s.y, s.rx, s.ry, 0, 0, Math.PI * 2);
      ctx.fill();
    });

    // 2. Realistic Landmass Continents
    const continents = [
      // North America
      {
        path: [[140, 80], [210, 70], [300, 90], [320, 150], [260, 210], [200, 210], [170, 160], [130, 120]],
        desert: [200, 180, 50, 30],
        forest: [220, 110, 60, 45]
      },
      // South America
      {
        path: [[280, 230], [360, 260], [370, 330], [330, 420], [300, 430], [270, 330], [260, 260]],
        desert: [320, 370, 30, 40],
        forest: [290, 270, 65, 60] // Amazon
      },
      // Europe & North Asia
      {
        path: [[480, 80], [580, 70], [700, 80], [860, 90], [870, 170], [750, 210], [620, 190], [500, 160], [470, 110]],
        desert: [680, 180, 70, 35], // Gobi
        forest: [520, 110, 90, 50]
      },
      // Africa
      {
        path: [[480, 180], [580, 180], [600, 260], [570, 360], [520, 370], [470, 270], [460, 210]],
        desert: [480, 190, 110, 60], // Sahara
        forest: [490, 270, 70, 60]  // Congo
      },
      // South Asia & India
      {
        path: [[680, 190], [740, 200], [720, 280], [670, 240]],
        desert: [680, 210, 30, 20],
        forest: [690, 230, 35, 40]
      },
      // Australia
      {
        path: [[770, 330], [860, 330], [870, 400], [800, 410], [760, 370]],
        desert: [780, 350, 70, 40], // Outback
        forest: [850, 350, 20, 45]
      }
    ];

    continents.forEach(c => {
      // Base continent shape
      ctx.fillStyle = '#2d6a4f'; // Temperate Green
      ctx.beginPath();
      ctx.moveTo(c.path[0][0], c.path[0][1]);
      for (let i = 1; i < c.path.length; i++) {
        ctx.lineTo(c.path[i][0], c.path[i][1]);
      }
      ctx.closePath();
      ctx.fill();

      // Rainforest layer
      if (c.forest) {
        ctx.fillStyle = '#1b4332';
        ctx.fillRect(c.forest[0], c.forest[1], c.forest[2], c.forest[3]);
      }

      // Desert / Arid sand layer
      if (c.desert) {
        ctx.fillStyle = '#d4a373';
        ctx.fillRect(c.desert[0], c.desert[1], c.desert[2], c.desert[3]);
      }
    });

    // Mountain Ridges (Rockies, Andes, Himalayas in stone/snow)
    ctx.fillStyle = '#6c584c';
    ctx.fillRect(200, 100, 14, 80); // Rockies
    ctx.fillRect(280, 250, 12, 130); // Andes
    ctx.fillRect(660, 170, 70, 14); // Himalayas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(675, 172, 40, 8); // Snow caps

    // Polar Ice Sheets
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, 1024, 28);   // Arctic
    ctx.fillRect(0, 480, 1024, 32);  // Antarctica

    // 3. Night-Side Golden City Light Clusters
    ctx.fillStyle = '#fed7aa';
    const cities = [
      [240, 140], [260, 135], [230, 150], [250, 160], // US East
      [510, 120], [530, 125], [520, 135], [545, 130], // Europe
      [730, 220], [710, 240], [740, 250],             // India
      [790, 160], [810, 170], [825, 150], [840, 180]  // East Asia / Japan
    ];
    cities.forEach(pt => {
      for (let i = 0; i < 14; i++) {
        const cx = pt[0] + (Math.random() - 0.5) * 22;
        const cy = pt[1] + (Math.random() - 0.5) * 22;
        ctx.fillRect(cx, cy, 2, 2);
      }
    });

    return new THREE.CanvasTexture(canvas);
  }

  static createMoon() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Regolith Grey Base
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(0, 0, 512, 256);

    // Dark Basaltic Maria (Lava seas)
    ctx.fillStyle = '#475569';
    // Oceanus Procellarum
    ctx.beginPath();
    ctx.ellipse(160, 100, 70, 60, 0.2, 0, Math.PI * 2);
    ctx.fill();
    // Mare Imbrium
    ctx.beginPath();
    ctx.ellipse(190, 75, 45, 35, 0, 0, Math.PI * 2);
    ctx.fill();
    // Mare Serenitatis & Tranquillitatis
    ctx.beginPath();
    ctx.ellipse(260, 95, 40, 30, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(275, 135, 45, 35, 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Crater Tycho with bright ejecta rays
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1;
    const tychoX = 230, tychoY = 200;
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 10) {
      ctx.beginPath();
      ctx.moveTo(tychoX, tychoY);
      ctx.lineTo(tychoX + Math.cos(a) * (Math.random() * 80 + 40), tychoY + Math.sin(a) * (Math.random() * 60 + 30));
      ctx.stroke();
    }

    // Highlands micro-craters
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 256;
      const r = Math.random() * 5 + 1;
      ctx.fillStyle = '#334155';
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#cbd5e1';
      ctx.beginPath();
      ctx.arc(x - 0.5, y - 0.5, r * 0.7, 0, Math.PI * 2);
      ctx.fill();
    }

    return new THREE.CanvasTexture(canvas);
  }

  static createMars() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Real Iron-Oxide Butterscotch Rust Terrain
    const rustGrad = ctx.createLinearGradient(0, 0, 0, 256);
    rustGrad.addColorStop(0, '#be5332');
    rustGrad.addColorStop(0.5, '#d97757');
    rustGrad.addColorStop(1, '#a64426');
    ctx.fillStyle = rustGrad;
    ctx.fillRect(0, 0, 512, 256);

    // Dark Basaltic Albedo Plains (Syrtis Major & Acidalia)
    ctx.fillStyle = '#59281a';
    // Syrtis Major (distinctive triangular volcanic plateau)
    ctx.beginPath();
    ctx.moveTo(270, 90);
    ctx.lineTo(330, 140);
    ctx.lineTo(260, 160);
    ctx.closePath();
    ctx.fill();
    // Acidalia Planitia & Sinus Sabaeus
    ctx.fillRect(160, 70, 70, 30);
    ctx.fillRect(220, 145, 90, 18);

    // Olympus Mons (Solar System's largest shield volcano)
    ctx.fillStyle = '#783626';
    ctx.beginPath();
    ctx.arc(110, 110, 22, 0, Math.PI * 2);
    ctx.fill();
    // Central Caldera Summit Crater
    ctx.fillStyle = '#38140a';
    ctx.beginPath();
    ctx.arc(110, 110, 6, 0, Math.PI * 2);
    ctx.fill();

    // Valles Marineris (Great Equatorial Canyon Rift)
    ctx.strokeStyle = '#3a150c';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(140, 140);
    ctx.bezierCurveTo(180, 150, 220, 135, 250, 145);
    ctx.stroke();

    // Polar Ice Caps (Frozen CO2 & Water Ice)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 512, 14);   // North Cap
    ctx.fillRect(0, 242, 512, 14); // South Cap

    return new THREE.CanvasTexture(canvas);
  }

  static createJupiter() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Multi-Tone Alternating Zonal Belts & Zones
    const jupiterBands = [
      { y: 0,   h: 45,  col: '#6b4626' }, // N. Polar
      { y: 45,  h: 35,  col: '#b87c4c' },
      { y: 80,  h: 40,  col: '#eadeca' }, // N. Tropical Zone
      { y: 120, h: 55,  col: '#8a3b14' }, // N. Equatorial Belt
      { y: 175, h: 50,  col: '#f5ede1' }, // Equatorial Zone
      { y: 225, h: 60,  col: '#8c3612' }, // S. Equatorial Belt
      { y: 285, h: 50,  col: '#dfceb5' }, // S. Tropical Zone (Home of GRS)
      { y: 335, h: 45,  col: '#9e5927' },
      { y: 380, h: 45,  col: '#cba87c' },
      { y: 425, h: 87,  col: '#634022' }  // S. Polar
    ];

    jupiterBands.forEach(b => {
      ctx.fillStyle = b.col;
      ctx.fillRect(0, b.y, 1024, b.h);
    });

    // Sinusoidal Zonal Shear Boundaries (Atmospheric wave turbulence)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    for (let y = 50; y < 450; y += 40) {
      ctx.beginPath();
      for (let x = 0; x <= 1024; x += 30) {
        const offset = Math.sin(x * 0.04) * 6;
        if (x === 0) ctx.moveTo(x, y + offset);
        else ctx.lineTo(x, y + offset);
      }
      ctx.stroke();
    }

    // Great Red Spot (Massive anticyclonic storm with internal vortex)
    const grsX = 660, grsY = 300;
    // Outer terracotta storm rim
    ctx.fillStyle = '#b9381e';
    ctx.beginPath();
    ctx.ellipse(grsX, grsY, 65, 36, 0, 0, Math.PI * 2);
    ctx.fill();
    // Swirling inner halo
    ctx.fillStyle = '#d95a32';
    ctx.beginPath();
    ctx.ellipse(grsX, grsY, 46, 24, 0, 0, Math.PI * 2);
    ctx.fill();
    // Inner white eye
    ctx.fillStyle = '#fceade';
    ctx.beginPath();
    ctx.ellipse(grsX - 8, grsY, 16, 9, 0, 0, Math.PI * 2);
    ctx.fill();

    // White Oval Storms
    const ovals = [[300, 360], [420, 370], [850, 355]];
    ovals.forEach(o => {
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(o[0], o[1], 16, 9, 0, 0, Math.PI * 2);
      ctx.fill();
    });

    return new THREE.CanvasTexture(canvas);
  }

  static createSaturn() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Muted Golden Butterscotch Cloud Bands
    const bands = ['#e6c88b', '#d9b775', '#edd59e', '#c9a45e', '#dfc385', '#bfa060'];
    for (let y = 0; y < 256; y++) {
      const idx = Math.floor((y / 256) * bands.length);
      ctx.fillStyle = bands[idx % bands.length];
      ctx.fillRect(0, y, 512, 1);
    }

    // North Polar Hexagonal Vortex Tint
    ctx.fillStyle = 'rgba(158, 148, 100, 0.45)';
    ctx.fillRect(0, 0, 512, 25);

    return new THREE.CanvasTexture(canvas);
  }

  static createSaturnRings() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createLinearGradient(0, 0, 512, 0);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
    grad.addColorStop(0.10, 'rgba(170, 140, 95, 0.18)'); // Ring C (Crepe ring)
    grad.addColorStop(0.30, 'rgba(235, 205, 145, 0.90)'); // Ring B (Brightest)
    grad.addColorStop(0.56, 'rgba(245, 220, 160, 0.95)');
    grad.addColorStop(0.58, 'rgba(0, 0, 0, 0)');          // Cassini Division Gap
    grad.addColorStop(0.65, 'rgba(0, 0, 0, 0)');
    grad.addColorStop(0.68, 'rgba(215, 185, 130, 0.78)'); // Ring A
    grad.addColorStop(0.82, 'rgba(205, 175, 120, 0.75)');
    grad.addColorStop(0.84, 'rgba(0, 0, 0, 0.05)');       // Encke Gap
    grad.addColorStop(0.92, 'rgba(180, 150, 100, 0.35)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 1);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }

  static createUranus() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    // True Methane-rich Cyan-Aquamarine
    const grad = ctx.createLinearGradient(0, 0, 0, 128);
    grad.addColorStop(0, '#a5ebe5');
    grad.addColorStop(0.5, '#78d4cb');
    grad.addColorStop(1, '#5bbab2');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 128);

    // Subtle Summer Polar Collar
    ctx.fillStyle = 'rgba(220, 255, 250, 0.25)';
    ctx.fillRect(0, 0, 256, 18);

    return new THREE.CanvasTexture(canvas);
  }

  static createNeptune() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    // Deep Azure Cobalt Blue
    const grad = ctx.createLinearGradient(0, 0, 0, 128);
    grad.addColorStop(0, '#2b58b4');
    grad.addColorStop(0.5, '#1b3f8e');
    grad.addColorStop(1, '#112963');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 128);

    // The Great Dark Spot (Supersonic cyclonic storm)
    ctx.fillStyle = '#0b1d47';
    ctx.beginPath();
    ctx.ellipse(90, 65, 24, 14, -0.2, 0, Math.PI * 2);
    ctx.fill();

    // Supersonic Methane Cirrus Cloud Streaks
    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.fillRect(75, 48, 55, 3);
    ctx.fillRect(140, 80, 45, 2.5);
    ctx.fillRect(30, 92, 40, 2);

    return new THREE.CanvasTexture(canvas);
  }
}

/* ============================================================================
   3. RICH ASTRONOMICAL DATABASE & AI INTEL (SUN + 8 PLANETS)
   ============================================================================ */
const ASTRONOMICAL_DATA = {
  sun: {
    name: 'SOL (THE SUN)',
    type: 'G2V YELLOW DWARF STAR',
    realDist: '0.00 AU (CENTER)',
    diameter: '1,392,700 km (109 Earths)',
    mass: '1.989 × 10³⁰ kg (333,000 Earths)',
    gravity: '274.0 m/s² (27.9g)',
    escape: '617.7 km/s',
    orbitPeriod: '230 Million Years (Galactic)',
    rotPeriod: '25.05 Days (Equator)',
    tilt: '7.25°',
    temp: '5,778 K (Surface) / 15,000,000 K (Core)',
    pressure: '247.7 Billion bar (Core)',
    gases: [
      { name: 'Hydrogen (H₂)', pct: 73.4 },
      { name: 'Helium (He)', pct: 25.0 },
      { name: 'Oxygen (O)', pct: 0.8 },
      { name: 'Carbon (C)', pct: 0.3 }
    ],
    aiStatus: 'MAIN SEQUENCE HYDROGEN FUSION',
    aiSummary: 'Contains 99.86% of total Solar System mass. Fuses 600 million tons of hydrogen into helium every second, generating the heliospheric magnetic field that protects the entire planetary system from interstellar cosmic rays.',
    aiGeology: 'Granulated photosphere, solar flare prominence loops, dynamic 11-year sunspot polarity cycle.',
    missions: [
      { name: 'Parker Solar Probe', year: '2018–Present', agency: 'NASA', badge: 'HELIOSPHERE', desc: 'First spacecraft to "touch the Sun", diving inside the corona at speeds up to 690,000 km/h to sample solar wind heating.' },
      { name: 'SOHO Observatory', year: '1995–Present', agency: 'ESA / NASA', badge: 'DEEP MONITOR', desc: 'Continuous coronal mass ejection monitor situated at Sun-Earth L1 Lagrange point; discovered over 4,000 sun-grazing comets.' },
      { name: 'Solar Orbiter', year: '2020–Present', agency: 'ESA / NASA', badge: 'POLAR SCOUT', desc: 'High-inclination orbital recon capturing the highest-resolution images ever taken of the Sun\'s uncharted polar regions.' }
    ]
  },
  mercury: {
    name: 'MERCURY',
    type: 'TERRESTRIAL PLANET',
    realDist: '57.9M km (0.39 AU)',
    diameter: '4,879 km',
    mass: '3.301 × 10²³ kg (0.055 Earths)',
    gravity: '3.70 m/s² (0.38g)',
    escape: '4.25 km/s',
    orbitPeriod: '87.97 Days',
    rotPeriod: '58.65 Days',
    tilt: '0.034°',
    temp: '-180°C to +430°C (Extreme)',
    pressure: '1 × 10⁻¹⁴ bar (Trace Exosphere)',
    gases: [
      { name: 'Oxygen (O₂)', pct: 42.0 },
      { name: 'Sodium (Na)', pct: 29.0 },
      { name: 'Hydrogen (H₂)', pct: 22.0 },
      { name: 'Helium (He)', pct: 6.0 }
    ],
    aiStatus: 'DESOLATE METALLIC CORE',
    aiSummary: 'Possesses the highest orbital velocity in the Solar System (47.4 km/s). Immense iron core accounts for 85% of planetary radius. Surface experiences the most violent diurnal temperature oscillations in the system.',
    aiGeology: 'Caloris Basin impact crater (1,550 km), lobate thrust fault scarps indicating planetary contraction.',
    missions: [
      { name: 'MESSENGER', year: '2004–2015', agency: 'NASA', badge: 'ORBITER', desc: 'First probe to orbit Mercury; confirmed water ice in permanently shadowed polar craters and discovered widespread ancient volcanism.' },
      { name: 'BepiColombo', year: '2018–Present', agency: 'ESA / JAXA', badge: 'DUAL PROBE', desc: 'Dual-orbiter mission executing multiple gravitational flybys to map composition, exosphere, and magnetosphere in extreme detail.' },
      { name: 'Mariner 10', year: '1973–1975', agency: 'NASA', badge: 'FLYBY PIONEER', desc: 'First spacecraft to visit Mercury, revealing a heavily cratered, Moon-like surface and unexpected active intrinsic magnetic field.' }
    ]
  },
  venus: {
    name: 'VENUS',
    type: 'TERRESTRIAL (RUNAWAY INFERNO)',
    realDist: '108.2M km (0.72 AU)',
    diameter: '12,104 km',
    mass: '4.867 × 10²⁴ kg (0.815 Earths)',
    gravity: '8.87 m/s² (0.90g)',
    escape: '10.36 km/s',
    orbitPeriod: '224.70 Days',
    rotPeriod: '243.02 Days (Retrograde)',
    tilt: '177.36°',
    temp: '464°C (Constant Superheated)',
    pressure: '92.0 bar (90 Atmospheres)',
    gases: [
      { name: 'Carbon Dioxide (CO₂)', pct: 96.5 },
      { name: 'Nitrogen (N₂)', pct: 3.5 },
      { name: 'Sulfur Dioxide (SO₂)', pct: 0.015 }
    ],
    aiStatus: 'RUNAWAY GREENHOUSE COLLAPSE',
    aiSummary: 'Surface temperature exceeds the melting point of lead due to extreme greenhouse trapping. Rotates backwards (retrograde) slower than its orbital year. Clouds consist of concentrated sulfuric acid droplets.',
    aiGeology: 'Maxwell Montes highlands (11 km elevation), volcanic pancake domes, lack of global magnetic dynamo.',
    missions: [
      { name: 'Magellan Radar Mapper', year: '1989–1994', agency: 'NASA', badge: 'SAR MAPPING', desc: 'Synthetic aperture radar mapped 98% of Venusian surface at 100m resolution, unveiling extensive lava plains and impact craters.' },
      { name: 'Venera 13 Lander', year: '1981–1982', agency: 'SOVIET UNION', badge: 'SURFACE LANDER', desc: 'Survived 127 minutes in 457°C / 89 atm conditions; transmitted first color panoramas and performed X-ray soil fluorescence.' },
      { name: 'Akatsuki Climate Orbiter', year: '2010–Present', agency: 'JAXA', badge: 'ATMOSPHERE', desc: 'Investigates the 360 km/h super-rotating cloud dynamics and equatorial gravity waves using multi-wavelength infrared cameras.' }
    ]
  },
  earth: {
    name: 'EARTH',
    type: 'TERRESTRIAL (HABITABLE BIOSPHERE)',
    realDist: '149.6M km (1.00 AU)',
    diameter: '12,742 km',
    mass: '5.972 × 10²⁴ kg',
    gravity: '9.81 m/s² (1.00g)',
    escape: '11.19 km/s',
    orbitPeriod: '365.25 Days',
    rotPeriod: '23.93 Hours',
    tilt: '23.44°',
    temp: '-88°C to +58°C (Mean 15°C)',
    pressure: '1.013 bar (1 Atmosphere)',
    gases: [
      { name: 'Nitrogen (N₂)', pct: 78.08 },
      { name: 'Oxygen (O₂)', pct: 20.95 },
      { name: 'Argon (Ar)', pct: 0.93 },
      { name: 'Carbon Dioxide (CO₂)', pct: 0.04 }
    ],
    aiStatus: 'OPTIMAL BIOLOGICAL STABILITY',
    aiSummary: 'The only known world harboring active biological life and stable liquid surface oceans (71% coverage). Dynamic liquid iron outer core produces a robust magnetosphere deflecting solar coronal mass ejections.',
    aiGeology: 'Active continental tectonic drift, volcanic subduction arcs, persistent oxygenated troposphere.',
    missions: [
      { name: 'International Space Station', year: '1998–Present', agency: 'NASA / ESA / JAXA', badge: 'CREWED LAB', desc: 'Continuous human presence in low Earth orbit conducting microgravity biology, physics, and astronomical observations for 25+ years.' },
      { name: 'Landsat Constellation', year: '1972–Present', agency: 'NASA / USGS', badge: 'EARTH RECON', desc: 'Longest continuous space-based record of Earth\'s land surface, monitoring deforestation, urban growth, and glacier retreats.' },
      { name: 'Terra & Aqua', year: '1999–Present', agency: 'NASA', badge: 'CLIMATE FLEET', desc: 'EOS flagship satellites measuring global atmospheric moisture, radiative flux, ocean phytoplankton blooms, and ice sheets.' }
    ]
  },
  moon: {
    name: 'THE MOON (LUNA)',
    type: 'NATURAL SATELLITE',
    realDist: '384,400 km from Earth',
    diameter: '3,474 km (0.27 Earths)',
    mass: '7.342 × 10²² kg (0.012 Earths)',
    gravity: '1.62 m/s² (0.166g)',
    escape: '2.38 km/s',
    orbitPeriod: '27.32 Days',
    rotPeriod: '27.32 Days (Tidally Locked)',
    tilt: '6.68°',
    temp: '-130°C to +120°C',
    pressure: '3 × 10⁻¹⁵ bar (Hard Vacuum)',
    gases: [
      { name: 'Helium (He)', pct: 29.0 },
      { name: 'Neon (Ne)', pct: 29.0 },
      { name: 'Hydrogen (H₂)', pct: 22.0 },
      { name: 'Argon (Ar)', pct: 20.0 }
    ],
    aiStatus: 'TIDALLY LOCKED SATELLITE',
    aiSummary: 'Stabilizes Earth\'s orbital obliquity (axial tilt), mitigating extreme climatic chaos over geological epochs. Formed ~4.5 billion years ago via the giant impact hypothesis (Theia proto-planet collision with primordial Earth).',
    aiGeology: 'Dark basaltic volcanic maria (Sea of Tranquility), anorthosite bright highlands, pervasive impact regolith dust.',
    missions: [
      { name: 'Apollo 11', year: '1969', agency: 'NASA', badge: 'FIRST CREWED', desc: 'Neil Armstrong and Buzz Aldrin conducted humanity\'s first crewed lunar landing at Mare Tranquillitatis, returning 21.5 kg of rocks.' },
      { name: 'Artemis I', year: '2022', agency: 'NASA / ESA', badge: 'DEEP SPACE', desc: 'Successful uncrewed flight test of the Space Launch System and Orion spacecraft to lunar distant retrograde orbit and back.' },
      { name: 'Chandrayaan-3', year: '2023', agency: 'ISRO', badge: 'SOUTH POLE', desc: 'Historic precision touchdown near the lunar south pole with Pragyan rover, detecting sulfur and measuring surface thermal plasma.' }
    ]
  },
  mars: {
    name: 'MARS',
    type: 'TERRESTRIAL (RED PLANET)',
    realDist: '227.9M km (1.52 AU)',
    diameter: '6,779 km',
    mass: '6.417 × 10²³ kg (0.107 Earths)',
    gravity: '3.72 m/s² (0.38g)',
    escape: '5.03 km/s',
    orbitPeriod: '686.98 Days',
    rotPeriod: '24.62 Hours',
    tilt: '25.19°',
    temp: '-140°C to +20°C (Mean -65°C)',
    pressure: '0.006 bar (0.6% of Earth)',
    gases: [
      { name: 'Carbon Dioxide (CO₂)', pct: 95.32 },
      { name: 'Nitrogen (N₂)', pct: 2.60 },
      { name: 'Argon (Ar)', pct: 1.90 },
      { name: 'Water Vapor (H₂O)', pct: 0.03 }
    ],
    aiStatus: 'ANCIENT HYDRAULIC COLLAPSE',
    aiSummary: 'Hosts vast subterranean permafrost and dry riverbeds indicating warm ancient oceans 3.8 billion years ago. Stripped of global magnetic field, exposing the thin atmosphere to continuous solar wind erosion.',
    aiGeology: 'Olympus Mons (highest shield volcano in solar system, 21.9 km), Valles Marineris canyon (4,000 km).',
    missions: [
      { name: 'Perseverance & Ingenuity', year: '2021–Present', agency: 'NASA', badge: 'SAMPLE CACHING', desc: 'Exploring Jezero Crater delta for ancient biosignatures while completing 72 aerial flights with Ingenuity helicopter.' },
      { name: 'Curiosity Rover (MSL)', year: '2012–Present', agency: 'NASA', badge: 'HABITABILITY', desc: 'Over 12 years traversing Gale Crater and Mount Sharp, proving Mars once had hospitable freshwater lake environments.' },
      { name: 'Mars Reconnaissance Orbiter', year: '2005–Present', agency: 'NASA', badge: 'HIGH-RES IMAGER', desc: 'HiRISE camera provides ultra-detailed sub-meter orbital photos of Martian dunes, gullies, and mineral deposits.' }
    ]
  },
  jupiter: {
    name: 'JUPITER',
    type: 'GAS GIANT (JOVIAN MONARCH)',
    realDist: '778.5M km (5.20 AU)',
    diameter: '139,820 km (11 Earths)',
    mass: '1.898 × 10²⁷ kg (317.8 Earths)',
    gravity: '24.79 m/s² (2.53g)',
    escape: '59.50 km/s',
    orbitPeriod: '11.86 Years',
    rotPeriod: '9.93 Hours',
    tilt: '3.13°',
    temp: '-110°C (Cloud Tops)',
    pressure: '> 2,000,000 bar (Metallic Core)',
    gases: [
      { name: 'Hydrogen (H₂)', pct: 89.8 },
      { name: 'Helium (He)', pct: 10.2 },
      { name: 'Methane (CH₄)', pct: 0.3 }
    ],
    aiStatus: 'MASSIVE HYDROGEN COMPRESSOR',
    aiSummary: 'Largest planetary body in the system. High rotational velocity generates fierce alternating zonal jet streams. Deep interior transitions into liquid metallic hydrogen, driving a gargantuan radiation belt.',
    aiGeology: 'Great Red Spot anticyclonic storm (active for over 350 years), complex mini-system of 95 orbital moons.',
    missions: [
      { name: 'Juno Orbiter', year: '2016–Present', agency: 'NASA', badge: 'POLAR SCOUT', desc: 'Spins in elliptical polar orbit measuring Jovian gravity anomalies, atmospheric water abundance, and colossal 3D cyclones.' },
      { name: 'Galileo Orbiter & Probe', year: '1989–2003', agency: 'NASA', badge: 'JOVIAN EXPLORER', desc: 'First spacecraft to orbit Jupiter; deployed atmospheric heatshield probe and found evidence of subsurface ocean on moon Europa.' },
      { name: 'JUICE (JUpiter ICy moons)', year: '2023–Present', agency: 'ESA', badge: 'OCEAN WORLDS', desc: 'En route to perform in-depth investigations of Ganymede, Callisto, and Europa as potential habitats for microbial life.' }
    ]
  },
  saturn: {
    name: 'SATURN',
    type: 'GAS GIANT (RINGED JEWEL)',
    realDist: '1.43B km (9.58 AU)',
    diameter: '116,460 km (9.5 Earths)',
    mass: '5.683 × 10²⁶ kg (95.2 Earths)',
    gravity: '10.44 m/s² (1.06g)',
    escape: '35.50 km/s',
    orbitPeriod: '29.45 Years',
    rotPeriod: '10.70 Hours',
    tilt: '26.73°',
    temp: '-140°C (Cloud Tops)',
    pressure: '1,000,000 bar (Core Interface)',
    gases: [
      { name: 'Hydrogen (H₂)', pct: 96.3 },
      { name: 'Helium (He)', pct: 3.25 },
      { name: 'Methane (CH₄)', pct: 0.45 }
    ],
    aiStatus: 'SUB-AQUEOUS DENSITY ANOMALY',
    aiSummary: 'Only planet in the Solar System with a mean density lower than water (0.687 g/cm³). Magnificent ring system spans 282,000 km with an average thickness of just 10 meters, consisting of 99% pure water ice.',
    aiGeology: 'Cassini Division gap cleared by moon Mimas resonance, north polar hexagonal jet stream vortex.',
    missions: [
      { name: 'Cassini-Huygens', year: '1997–2017', agency: 'NASA / ESA / ASI', badge: 'FLAGSHIP', desc: '13-year tour of Saturn system; landed Huygens on Titan (methane seas) and discovered warm water geysers venting from Enceladus.' },
      { name: 'Voyager 1 & 2', year: '1980–1981', agency: 'NASA', badge: 'GRAND TOUR', desc: 'Revealed thousands of delicate ringlets, spokes in Ring B, and detailed atmospheric structure before heading to interstellar space.' },
      { name: 'Dragonfly Rotorcraft', year: 'Launching 2028', agency: 'NASA', badge: 'OCTOCOPTER', desc: 'Will fly across prebiotic hydrocarbon sands of giant moon Titan to investigate prebiotic chemical building blocks.' }
    ]
  },
  uranus: {
    name: 'URANUS',
    type: 'ICE GIANT (SIDEWAYS REALM)',
    realDist: '2.87B km (19.2 AU)',
    diameter: '50,724 km (4.0 Earths)',
    mass: '8.681 × 10²⁵ kg (14.5 Earths)',
    gravity: '8.69 m/s² (0.89g)',
    escape: '21.30 km/s',
    orbitPeriod: '84.02 Years',
    rotPeriod: '17.24 Hours (Retrograde)',
    tilt: '97.77°',
    temp: '-195°C (Coldest System Atmosphere: -224°C)',
    pressure: 'Atmospheric Mantle Fluid',
    gases: [
      { name: 'Hydrogen (H₂)', pct: 82.5 },
      { name: 'Helium (He)', pct: 15.2 },
      { name: 'Methane (CH₄)', pct: 2.3 }
    ],
    aiStatus: 'EXTREME IMPACT ROTATION TILT',
    aiSummary: 'Rotates completely on its side, likely knocked by an Earth-sized protoplanet collision during system formation. Emits very little internal geothermal heat compared to other giants.',
    aiGeology: 'Methane upper-troposphere absorbs red light yielding cyan hue, highly asymmetric tilted magnetosphere.',
    missions: [
      { name: 'Voyager 2', year: '1986', agency: 'NASA', badge: 'HISTORIC FLYBY', desc: 'Only spacecraft to visit Uranus, discovering 10 new moons, 2 rings, and a magnetic field tilted 59 degrees from its rotational axis.' },
      { name: 'Uranus Orbiter & Probe', year: 'Decadal Top Priority', agency: 'NASA / ESA', badge: 'FUTURE FLAGSHIP', desc: 'Recommended NASA flagship mission to orbit the ice giant and drop an atmospheric dive probe into its uncharted mantle.' }
    ]
  },
  neptune: {
    name: 'NEPTUNE',
    type: 'ICE GIANT (WINDSWEPT SENTINEL)',
    realDist: '4.50B km (30.1 AU)',
    diameter: '49,244 km (3.9 Earths)',
    mass: '1.024 × 10²⁶ kg (17.1 Earths)',
    gravity: '11.15 m/s² (1.14g)',
    escape: '23.50 km/s',
    orbitPeriod: '164.79 Years',
    rotPeriod: '16.11 Hours',
    tilt: '28.32°',
    temp: '-200°C (Mean Cloud Base)',
    pressure: 'Atmospheric Mantle Fluid',
    gases: [
      { name: 'Hydrogen (H₂)', pct: 80.0 },
      { name: 'Helium (He)', pct: 19.0 },
      { name: 'Methane (CH₄)', pct: 1.5 }
    ],
    aiStatus: 'SUPERSONIC ATMOSPHERIC JETS',
    aiSummary: 'Farthest known planet from the Sun. Exhibits the fastest atmospheric winds in the Solar System, clocked at over 2,100 km/h. Internal heat engine drives volatile convective storms in deep methane layers.',
    aiGeology: 'Great Dark Spot cyclonic storm system, geysers of liquid nitrogen observed on retrograde moon Triton.',
    missions: [
      { name: 'Voyager 2 Flyby', year: '1989', agency: 'NASA', badge: 'HISTORIC FLYBY', desc: 'Closest approach came within 4,950 km of north pole, discovering the Great Dark Spot, complete ring arcs, and active geysers on moon Triton.' },
      { name: 'Neptune Odyssey Concept', year: 'Proposed Concept', agency: 'NASA', badge: 'FUTURE ORBITER', desc: 'Orbital mission proposed to investigate retrograde captured Kuiper Belt object Triton and deep ice-giant convection.' }
    ]
  }
};

/* ============================================================================
   4. PLANETARY 3D CONFIGURATIONS
   ============================================================================ */
const PLANET_OBJECT_CONFIGS = [
  { id: 'mercury', name: 'MERCURY', texture: TextureFactory.createMercury, radius: 0.9, dist: 15, speed: 0.040, rotSpeed: 0.015, tilt: 0.001 },
  { id: 'venus',   name: 'VENUS',   texture: TextureFactory.createVenus,   radius: 1.4, dist: 22, speed: 0.028, rotSpeed: -0.008, tilt: 3.09 },
  { id: 'earth',   name: 'EARTH',   texture: TextureFactory.createEarth,   radius: 1.5, dist: 31, speed: 0.020, rotSpeed: 0.025, tilt: 0.409 },
  { id: 'mars',    name: 'MARS',    texture: TextureFactory.createMars,    radius: 1.1, dist: 41, speed: 0.016, rotSpeed: 0.024, tilt: 0.439 },
  { id: 'jupiter', name: 'JUPITER', texture: TextureFactory.createJupiter, radius: 3.8, dist: 58, speed: 0.009, rotSpeed: 0.045, tilt: 0.054 },
  { id: 'saturn',  name: 'SATURN',  texture: TextureFactory.createSaturn,  radius: 3.2, dist: 76, speed: 0.006, rotSpeed: 0.040, tilt: 0.466, hasRings: true },
  { id: 'uranus',  name: 'URANUS',  texture: TextureFactory.createUranus,  radius: 2.2, dist: 93, speed: 0.004, rotSpeed: -0.030, tilt: 1.706 },
  { id: 'neptune', name: 'NEPTUNE', texture: TextureFactory.createNeptune, radius: 2.1, dist: 110, speed: 0.003, rotSpeed: 0.032, tilt: 0.494 }
];

/* ============================================================================
   5. MASTER SOLAR COMMAND APPLICATION
   ============================================================================ */
class SolarCommandApp {
  constructor() {
    // Canvases
    this.solarCanvas = document.getElementById('solar-canvas');
    this.skeletonCanvas = document.getElementById('skeleton-canvas');
    this.skeletonCtx = this.skeletonCanvas ? this.skeletonCanvas.getContext('2d') : null;
    this.webcamVideo = document.getElementById('webcam-video');

    // UI Overlays & HUD (Zero Permission Gate - Direct HUD Access)
    this.commandHud = document.getElementById('command-hud');
    this.pausedOverlay = document.getElementById('paused-overlay');
    this.userGuidance = document.getElementById('user-guidance');

    // Cursors & Reticle
    this.virtualCursor = document.getElementById('virtual-cursor');
    this.cursorBadge = document.getElementById('cursor-badge');
    this.planetTargetBox = document.getElementById('planet-target-box');
    this.targetPlanetName = document.getElementById('target-planet-name');
    this.targetActionLabel = document.getElementById('target-action-label');

    // Top Bar Badges & Toggles
    this.pillCamera = document.getElementById('pill-camera');
    this.gestureBadge = document.getElementById('gesture-badge');
    this.gestureNameDisplay = document.getElementById('gesture-name-display');
    this.camIndicatorDot = document.getElementById('cam-indicator-dot');
    this.camStatusLabel = document.getElementById('cam-status-label');
    this.handIndicatorDot = document.getElementById('hand-indicator-dot');
    this.handStatusLabel = document.getElementById('hand-status-label');
    this.fpsDisplay = document.getElementById('fps-display');
    this.missionStatusText = document.getElementById('mission-status-text');

    // Telemetry Card Elements
    this.planetInfoPanel = document.getElementById('planet-info-panel');
    this.cardPlanetType = document.getElementById('card-planet-type');
    this.cardPlanetName = document.getElementById('card-planet-name');
    this.cardDistance = document.getElementById('card-distance');
    this.cardDiameter = document.getElementById('card-diameter');
    this.cardMass = document.getElementById('card-mass');
    this.cardGravity = document.getElementById('card-gravity');
    this.cardEscape = document.getElementById('card-escape');
    this.cardOrbitPeriod = document.getElementById('card-orbit-period');
    this.cardRotationPeriod = document.getElementById('card-rotation-period');
    this.cardTilt = document.getElementById('card-tilt');
    this.cardPressure = document.getElementById('card-pressure');
    this.cardTemp = document.getElementById('card-temp');
    this.atmoBarsContainer = document.getElementById('atmo-bars-container');
    this.cardAiStatus = document.getElementById('card-ai-status');
    this.cardAiSummary = document.getElementById('card-ai-summary');
    this.cardAiGeology = document.getElementById('card-ai-geology');
    this.cardMissionsContainer = document.getElementById('card-missions-container');
    this.btnPrevPlanet = document.getElementById('btn-prev-planet');
    this.btnNextPlanet = document.getElementById('btn-next-planet');
    this.sheetDragHandle = document.getElementById('sheet-drag-handle');
    this.mbtnInfo = document.getElementById('mbtn-info');

    this.gestureGuidePanel = document.getElementById('gesture-guide-panel');
    this.systemStatusPanel = document.getElementById('system-status-panel');
    this.btnToggleFleet = document.getElementById('btn-toggle-fleet');
    this.btnToggleDossier = document.getElementById('btn-toggle-dossier');
    this.btnToggleManual = document.getElementById('btn-toggle-manual');
    this.btnCloseFleet = document.getElementById('btn-close-fleet');
    this.fleetDirectoryList = document.getElementById('fleet-directory-list');

    this.toastEl = document.getElementById('toast');
    this.toastMsg = document.getElementById('toast-message');
    this.settingsModal = document.getElementById('settings-modal');

    // Audio Engine
    this.audio = new CommandAudio();

    // Three.js Scene State
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.clock = new THREE.Clock();
    this.raycaster = new THREE.Raycaster();
    this.mouseNDC = new THREE.Vector2(-999, -999);

    // Planetary Objects
    this.sunMesh = null;
    this.sunCoronaSprite = null;
    this.moonMesh = null;
    this.moonPivot = null;
    this.planetObjects = [];
    this.orbitRings = [];
    this.asteroidInstancedMesh = null;
    this.asteroidData = [];
    this.solarSystemGroup = null;

    // Simulation State
    this.isPaused = false;
    this.isPinching = false;
    this.isOrbitInspect = false;
    this.timeScale = 1.0;
    this.cameraMode = 'overview';
    this.selectedBody = null; // Can be a planet, moon or the Sun
    this.hoveredBody = null;

    // Camera Navigation & Damping
    this.cameraTargetPos = new THREE.Vector3(0, 58, 115);
    this.cameraLookAtTarget = new THREE.Vector3(0, 0, 0);
    this.cameraDefaultPos = new THREE.Vector3(0, 58, 115);
    this.systemRotation = { x: 0.25, y: 0 };
    this.systemTargetRotation = { x: 0.25, y: 0 };
    this.systemPos = new THREE.Vector3(0, 0, 0);
    this.systemTargetPos = new THREE.Vector3(0, 0, 0);

    // Zoom Bounds
    this.minZoomDist = 18;
    this.maxZoomDist = 260;

    // Tracking State
    this.mediaPipeHands = null;
    this.cameraUtilsInstance = null;
    this.isCameraActive = false;
    this.isFallbackMouse = false;
    this.handDetected = false;
    this.firstHandSeen = false;
    this.cameraMirror = true;
    this.trackingSensitivity = 3;
    this.renderSkeleton = true;
    this.renderAsteroids = true;

    // Smoothing Coordinates
    this.cursorScreen = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.prevPinchDist = null;
    this.wristVelocityHistory = [];
    this.lastSwipeTime = 0;
    this.lastResetTime = 0;
    this.lastPauseToggleTime = 0;

    // FPS Meter
    this.fpsFrames = 0;
    this.fpsLastTime = performance.now();

    // Mouse & Touch Interaction State
    this.mouse = {
      isDown: false,
      isRightDown: false,
      lastX: 0,
      lastY: 0,
      touchStartDist: 0
    };

    this.init();
  }

  init() {
    this.setupThreeScene();
    this.buildSolarSystem();
    this.buildAsteroidBelt();
    this.setupEventListeners();
    this.setupMouseTouchHandlers();
    this.onResize();

    // Zero Permission System: Immediately activate system HUD and spatial controls on load
    this.isFallbackMouse = true;
    if (this.commandHud) {
      this.commandHud.classList.remove('hidden');
    }
    if (this.camStatusLabel) {
      this.camStatusLabel.textContent = 'CAM: OFF';
    }
    if (this.handStatusLabel) {
      this.handStatusLabel.textContent = 'MOUSE / TOUCH';
    }
    if (this.handIndicatorDot) {
      this.handIndicatorDot.className = 'pill-dot active';
    }

    // Initialize with Earth selected so all content and telemetry are immediately visible on startup
    const defaultBody = this.planetObjects.find(p => p.userData && p.userData.id === 'earth') || this.planetObjects[2] || this.sunMesh;
    if (defaultBody) {
      this.selectBody(defaultBody);
    }

    this.animate();
  }

  /* --------------------------------------------------------------------------
     Three.js Scene Setup & Starfield
     -------------------------------------------------------------------------- */
  setupThreeScene() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x000003, 0.0022);

    this.camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 2500);
    this.camera.position.copy(this.cameraDefaultPos);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.solarCanvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000003, 1);

    this.createStarfield();

    // Cosmic ambient light
    const ambientLight = new THREE.AmbientLight(0x281828, 1.4);
    this.scene.add(ambientLight);

    // Group containing the entire revolving solar system
    this.solarSystemGroup = new THREE.Group();
    this.solarSystemGroup.rotation.x = this.systemRotation.x;
    this.scene.add(this.solarSystemGroup);

    window.addEventListener('resize', () => this.onResize());
  }

  onResize() {
    if (!this.camera || !this.renderer) return;
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);

    if (this.skeletonCanvas) {
      this.skeletonCanvas.width = width;
      this.skeletonCanvas.height = height;
    }
  }

  createStarfield() {
    const starCount = 5000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      const r = 380 + Math.random() * 600;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);

      const b = Math.random() * 0.7 + 0.3;
      colors[i3] = b;
      colors[i3 + 1] = b * (Math.random() > 0.3 ? 0.92 : 0.65);
      colors[i3 + 2] = b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.3,
      vertexColors: true,
      transparent: true,
      opacity: 0.88
    });

    this.starfield = new THREE.Points(geometry, material);
    this.scene.add(this.starfield);
  }

  /* --------------------------------------------------------------------------
     Build 3D Solar System (Sun, 8 Planets, Rings, Orbits)
     -------------------------------------------------------------------------- */
  buildSolarSystem() {
    // 1. Central Star: The Sun
    const sunGeo = new THREE.SphereGeometry(7.0, 40, 40);
    const sunMat = new THREE.MeshBasicMaterial({
      map: TextureFactory.createSun()
    });
    this.sunMesh = new THREE.Mesh(sunGeo, sunMat);
    this.sunMesh.userData = { id: 'sun', isSun: true };
    this.solarSystemGroup.add(this.sunMesh);

    // Pulsating Solar Corona Halo Sprite
    const spriteMat = new THREE.SpriteMaterial({
      map: TextureFactory.createSunCorona(),
      color: 0xffffff,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.85
    });
    this.sunCoronaSprite = new THREE.Sprite(spriteMat);
    this.sunCoronaSprite.scale.set(30, 30, 1);
    this.sunMesh.add(this.sunCoronaSprite);

    // Warm, omnidirectional solar light source
    const sunLight = new THREE.PointLight(0xfff5d6, 3.6, 800);
    this.sunMesh.add(sunLight);

    // 2. The 8 Planets
    PLANET_OBJECT_CONFIGS.forEach((cfg, index) => {
      const pivot = new THREE.Group();
      this.solarSystemGroup.add(pivot);

      const geo = new THREE.SphereGeometry(cfg.radius, 32, 32);
      const mat = new THREE.MeshStandardMaterial({
        map: cfg.texture(),
        roughness: 0.75,
        metalness: 0.1
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.x = cfg.dist;
      mesh.rotation.z = cfg.tilt; // Authentic axial tilt
      pivot.add(mesh);

      mesh.userData = {
        id: cfg.id,
        config: cfg,
        index: index,
        pivot: pivot,
        initialDist: cfg.dist,
        angle: Math.random() * Math.PI * 2
      };

      // Earth Atmospheric Rayleigh Glow & Swirling Clouds
      if (cfg.id === 'earth') {
        const cloudGeo = new THREE.SphereGeometry(cfg.radius * 1.028, 32, 32);
        const cloudMat = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.38,
          blending: THREE.AdditiveBlending
        });
        const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
        mesh.add(cloudMesh);
        mesh.userData.cloudMesh = cloudMesh;

        // Atmospheric Rayleigh Glow Halo
        const atmoGeo = new THREE.SphereGeometry(cfg.radius * 1.08, 32, 32);
        const atmoMat = new THREE.MeshBasicMaterial({
          color: 0x38bdf8,
          transparent: true,
          opacity: 0.25,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending
        });
        const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
        mesh.add(atmoMesh);

        // Earth's Natural Satellite: The Moon (Luna)
        const moonPivot = new THREE.Group();
        mesh.add(moonPivot);
        this.moonPivot = moonPivot;

        const moonGeo = new THREE.SphereGeometry(0.44, 24, 24);
        const moonMat = new THREE.MeshStandardMaterial({
          map: TextureFactory.createMoon(),
          roughness: 0.85,
          metalness: 0.05
        });
        this.moonMesh = new THREE.Mesh(moonGeo, moonMat);
        this.moonMesh.position.x = 3.6;
        moonPivot.add(this.moonMesh);

        this.moonMesh.userData = {
          id: 'moon',
          isMoon: true,
          config: { radius: 0.44, speed: 0.08, rotSpeed: 0.02 },
          parentPlanet: mesh,
          pivot: moonPivot
        };
        this.planetObjects.push(this.moonMesh);
      }

      // Saturn Cassini Rings
      if (cfg.hasRings) {
        const ringGeo = new THREE.RingGeometry(cfg.radius * 1.35, cfg.radius * 2.5, 64);
        const ringMat = new THREE.MeshBasicMaterial({
          map: TextureFactory.createSaturnRings(),
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.85
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2.3;
        ringMesh.rotation.y = Math.PI / 8;
        mesh.add(ringMesh);
        mesh.userData.ringMesh = ringMesh;
      }

      // Orbital Trajectory Line
      const orbitCurve = new THREE.EllipseCurve(0, 0, cfg.dist, cfg.dist, 0, 2 * Math.PI, false, 0);
      const orbitPts = orbitCurve.getPoints(120);
      const orbitGeo = new THREE.BufferGeometry().setFromPoints(orbitPts);
      const orbitMat = new THREE.LineBasicMaterial({
        color: 0xff1744,
        transparent: true,
        opacity: 0.22
      });
      const orbitLine = new THREE.Line(orbitGeo, orbitMat);
      orbitLine.rotation.x = Math.PI / 2;
      this.solarSystemGroup.add(orbitLine);

      this.orbitRings.push(orbitLine);
      this.planetObjects.push(mesh);
    });
  }

  /* --------------------------------------------------------------------------
     Build Asteroid Belt (600 Procedural Asteroids between Mars & Jupiter)
     -------------------------------------------------------------------------- */
  buildAsteroidBelt() {
    const asteroidCount = 600;
    const asteroidGeo = new THREE.DodecahedronGeometry(0.18, 1);
    const asteroidMat = new THREE.MeshStandardMaterial({
      color: 0x7c7365,
      roughness: 0.9,
      metalness: 0.1
    });

    this.asteroidInstancedMesh = new THREE.InstancedMesh(asteroidGeo, asteroidMat, asteroidCount);
    const dummy = new THREE.Object3D();

    for (let i = 0; i < asteroidCount; i++) {
      const radius = 45 + Math.random() * 8.5; // Orbit between Mars (41) and Jupiter (58)
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 2.2;
      const speed = (0.012 + Math.random() * 0.005) * (Math.random() > 0.5 ? 1 : 1);
      const rotSpeed = { x: Math.random() * 0.05, y: Math.random() * 0.05 };

      this.asteroidData.push({ radius, angle, height, speed, rotSpeed });

      dummy.position.set(Math.cos(angle) * radius, height, Math.sin(angle) * radius);
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      const scale = Math.random() * 1.5 + 0.5;
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();

      this.asteroidInstancedMesh.setMatrixAt(i, dummy.matrix);
    }

    this.asteroidInstancedMesh.instanceMatrix.needsUpdate = true;
    this.solarSystemGroup.add(this.asteroidInstancedMesh);
  }

  /* --------------------------------------------------------------------------
     MediaPipe Computer Vision & Hand Tracking (Zero Permission Blockers)
     -------------------------------------------------------------------------- */
  async toggleCamera() {
    this.audio.init();
    if (this.isCameraActive) {
      this.stopCamera();
      this.showToast('Optical Tracking Disengaged // Mouse & Touch Active');
    } else {
      this.showToast('Connecting Optical Sensor...');
      await this.startCameraSilently();
    }
  }

  stopCamera() {
    this.isCameraActive = false;
    if (this.webcamVideo && this.webcamVideo.srcObject) {
      try {
        const tracks = this.webcamVideo.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      } catch (e) {}
      this.webcamVideo.srcObject = null;
    }
    if (this.camIndicatorDot) this.camIndicatorDot.className = 'pill-dot';
    if (this.camStatusLabel) this.camStatusLabel.textContent = 'CAM: OFF';
    if (this.handIndicatorDot) this.handIndicatorDot.className = 'pill-dot active';
    if (this.handStatusLabel) this.handStatusLabel.textContent = 'MOUSE / TOUCH';
    if (this.setSystemStatus) this.setSystemStatus('status-hand-label', 'MOUSE / TOUCH', false);
    if (this.virtualCursor) this.virtualCursor.classList.add('hidden');
    if (this.skeletonCtx && this.skeletonCanvas) {
      this.skeletonCtx.clearRect(0, 0, this.skeletonCanvas.width, this.skeletonCanvas.height);
    }
  }

  async startCameraSilently() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      this.showToast('Camera API unavailable in this browser // Using Mouse & Touch');
      return;
    }

    try {
      if (typeof Hands === 'undefined') {
        this.showToast('Optical tracking library not loaded // Using Mouse & Touch');
        return;
      }

      if (!this.mediaPipeHands) {
        this.mediaPipeHands = new Hands({
          locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
        });

        this.mediaPipeHands.setOptions({
          maxNumHands: 2,
          modelComplexity: 1,
          minDetectionConfidence: 0.55,
          minTrackingConfidence: 0.55
        });

        this.mediaPipeHands.onResults((results) => this.onHandResults(results));
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' },
        audio: false
      });

      this.webcamVideo.srcObject = stream;
      await this.webcamVideo.play();

      if (typeof Camera !== 'undefined') {
        this.cameraUtilsInstance = new Camera(this.webcamVideo, {
          onFrame: async () => {
            if (this.isCameraActive) {
              await this.mediaPipeHands.send({ image: this.webcamVideo });
            }
          },
          width: 640,
          height: 480
        });
        this.cameraUtilsInstance.start();
      } else {
        const processFrame = async () => {
          if (this.isCameraActive && this.webcamVideo.readyState >= 2) {
            await this.mediaPipeHands.send({ image: this.webcamVideo });
          }
          if (this.isCameraActive) requestAnimationFrame(processFrame);
        };
        requestAnimationFrame(processFrame);
      }

      this.isCameraActive = true;
      if (this.camIndicatorDot) this.camIndicatorDot.className = 'pill-dot active';
      if (this.camStatusLabel) this.camStatusLabel.textContent = 'CAM: ON';
      this.showToast('Optical Tracking Engaged // Point & Pinch Active');
    } catch (err) {
      console.warn('Silent camera access info:', err);
      this.stopCamera();
      this.showToast('Camera inactive // Exploring with Mouse & Touch');
    }
  }

  /* --------------------------------------------------------------------------
     Live Hand Tracking & Holographic Skeleton Rendering
     -------------------------------------------------------------------------- */
  onHandResults(results) {
    if (!this.skeletonCanvas || !this.skeletonCtx) return;
    const ctx = this.skeletonCtx;
    const width = this.skeletonCanvas.width;
    const height = this.skeletonCanvas.height;

    ctx.clearRect(0, 0, width, height);

    const hasHands = results.multiHandLandmarks && results.multiHandLandmarks.length > 0;

    if (!hasHands) {
      this.handDetected = false;
      this.handIndicatorDot.className = 'pill-dot';
      this.handStatusLabel.textContent = 'HAND: NONE';
      this.setSystemStatus('status-hand-label', 'NOT DETECTED', false);
      this.virtualCursor.classList.add('hidden');
      return;
    }

    this.handDetected = true;
    this.handIndicatorDot.className = 'pill-dot crimson-active';
    this.handStatusLabel.textContent = `HAND: ${results.multiHandLandmarks.length} DETECTED`;
    this.setSystemStatus('status-hand-label', 'TRACKED // LOCKED', true);

    if (!this.firstHandSeen) {
      this.firstHandSeen = true;
      this.userGuidance.classList.remove('hidden');
      setTimeout(() => {
        this.userGuidance.classList.add('hidden');
      }, 4500);
    }

    const landmarks = results.multiHandLandmarks[0];

    if (this.renderSkeleton) {
      this.drawHolographicSkeleton(ctx, landmarks, width, height);
    }

    this.processGestures(landmarks);
  }

  drawHolographicSkeleton(ctx, landmarks, width, height) {
    const connections = [
      [0, 1], [1, 2], [2, 3], [3, 4],
      [0, 5], [5, 6], [6, 7], [7, 8],
      [5, 9], [9, 10], [10, 11], [11, 12],
      [9, 13], [13, 14], [14, 15], [15, 16],
      [13, 17], [17, 18], [18, 19], [19, 20],
      [0, 17]
    ];

    ctx.save();
    ctx.lineWidth = 2.0;
    ctx.strokeStyle = 'rgba(255, 23, 68, 0.8)';
    ctx.shadowColor = '#ff1744';
    ctx.shadowBlur = 8;

    connections.forEach(([i, j]) => {
      const p1 = landmarks[i];
      const p2 = landmarks[j];
      const x1 = (this.cameraMirror ? (1 - p1.x) : p1.x) * width;
      const y1 = p1.y * height;
      const x2 = (this.cameraMirror ? (1 - p2.x) : p2.x) * width;
      const y2 = p2.y * height;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    });

    landmarks.forEach((lm, index) => {
      const x = (this.cameraMirror ? (1 - lm.x) : lm.x) * width;
      const y = lm.y * height;
      const isIndexTip = index === 8;

      ctx.beginPath();
      ctx.arc(x, y, isIndexTip ? 6 : 3.5, 0, Math.PI * 2);
      ctx.fillStyle = isIndexTip ? '#ffffff' : '#ff3366';
      ctx.shadowColor = isIndexTip ? '#ffffff' : '#ff1744';
      ctx.shadowBlur = isIndexTip ? 12 : 6;
      ctx.fill();
    });

    ctx.restore();
  }

  /* --------------------------------------------------------------------------
     Gesture Classification & Interaction
     -------------------------------------------------------------------------- */
  processGestures(landmarks) {
    const wrist = landmarks[0];
    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];
    const middleTip = landmarks[12];
    const ringTip = landmarks[16];
    const pinkyTip = landmarks[20];

    const indexPip = landmarks[6];
    const middlePip = landmarks[10];
    const ringPip = landmarks[14];
    const pinkyPip = landmarks[18];

    const handScale = Math.hypot(landmarks[9].x - wrist.x, landmarks[9].y - wrist.y) || 0.1;

    // Mirrored screen coordinates
    const normX = this.cameraMirror ? (1 - indexTip.x) : indexTip.x;
    const screenX = normX * window.innerWidth;
    const screenY = indexTip.y * window.innerHeight;

    const alpha = 0.32 * (this.trackingSensitivity / 3);
    this.cursorScreen.x += (screenX - this.cursorScreen.x) * alpha;
    this.cursorScreen.y += (screenY - this.cursorScreen.y) * alpha;

    this.virtualCursor.classList.remove('hidden');
    this.virtualCursor.style.transform = `translate3d(${this.cursorScreen.x}px, ${this.cursorScreen.y}px, 0)`;

    this.mouseNDC.x = (this.cursorScreen.x / window.innerWidth) * 2 - 1;
    this.mouseNDC.y = -(this.cursorScreen.y / window.innerHeight) * 2 + 1;

    // Finger extensions
    const isIndexExtended = Math.hypot(indexTip.x - wrist.x, indexTip.y - wrist.y) > Math.hypot(indexPip.x - wrist.x, indexPip.y - wrist.y) * 1.15;
    const isMiddleExtended = Math.hypot(middleTip.x - wrist.x, middleTip.y - wrist.y) > Math.hypot(middlePip.x - wrist.x, middlePip.y - wrist.y) * 1.15;
    const isRingExtended = Math.hypot(ringTip.x - wrist.x, ringTip.y - wrist.y) > Math.hypot(ringPip.x - wrist.x, ringPip.y - wrist.y) * 1.15;
    const isPinkyExtended = Math.hypot(pinkyTip.x - wrist.x, pinkyTip.y - wrist.y) > Math.hypot(pinkyPip.x - wrist.x, pinkyPip.y - wrist.y) * 1.15;
    const isThumbExtended = Math.hypot(thumbTip.x - wrist.x, thumbTip.y - wrist.y) > handScale * 0.7;

    const pinchDist = Math.hypot(thumbTip.x - indexTip.x, thumbTip.y - indexTip.y) / handScale;
    const isPinching = pinchDist < 0.34;
    const isFist = !isIndexExtended && !isMiddleExtended && !isRingExtended && !isPinkyExtended;
    const isOpenPalm = isIndexExtended && isMiddleExtended && isRingExtended && isPinkyExtended && isThumbExtended;
    const isTwoFingers = isIndexExtended && isMiddleExtended && !isRingExtended && !isPinkyExtended;

    // Velocity swipe detection
    this.wristVelocityHistory.push({ x: normX, time: performance.now() });
    if (this.wristVelocityHistory.length > 8) this.wristVelocityHistory.shift();

    let swipeDetected = false;
    if (this.wristVelocityHistory.length >= 6) {
      const first = this.wristVelocityHistory[0];
      const last = this.wristVelocityHistory[this.wristVelocityHistory.length - 1];
      const dt = (last.time - first.time) / 1000;
      const dx = last.x - first.x;
      const vx = dx / (dt || 0.1);

      const now = performance.now();
      if (Math.abs(vx) > 2.0 && isOpenPalm && (now - this.lastSwipeTime > 1200)) {
        this.lastSwipeTime = now;
        this.systemTargetRotation.y += (vx > 0 ? 0.9 : -0.9);
        this.setGestureBadge('SWIPE // ROTATE VIEW', 'swipe');
        this.audio.playPause();
        swipeDetected = true;
        this.wristVelocityHistory = [];
      }
    }

    if (swipeDetected) return;

    // Raycast for Hovered Body (Planets or Sun)
    this.updateRaycastHover();

    // ------------------------------------------------------------------------
    // GESTURE STATE DISPATCHER
    // ------------------------------------------------------------------------
    if (isFist) {
      const now = performance.now();
      if (now - this.lastResetTime > 1600) {
        this.lastResetTime = now;
        this.resetSolarSystem();
      }
      this.setGestureBadge('FIST // RESET SYSTEM', 'fist');
      this.cursorBadge.textContent = 'RESET';
    } else if (isOpenPalm) {
      this.togglePause(true);
      this.setGestureBadge('OPEN PALM // PAUSED', 'palm');
      this.cursorBadge.textContent = 'PAUSE';
    } else {
      if (this.isPaused && (performance.now() - this.lastPauseToggleTime > 600)) {
        this.togglePause(false);
      }

      if (isTwoFingers) {
        if (!this.isOrbitInspect) {
          this.enterOrbitInspect();
        }
        this.systemTargetRotation.y += (normX - 0.5) * 0.05;
        this.setGestureBadge('TWO FINGERS // ORBIT INSPECT', 'twofinger');
        this.cursorBadge.textContent = 'ORBIT';
      } else if (isPinching) {
        this.virtualCursor.classList.add('pinch-mode');

        if (!this.isPinching) {
          this.isPinching = true;
          this.audio.playGrab();

          if (this.hoveredBody) {
            this.selectBody(this.hoveredBody);
            this.targetActionLabel.textContent = 'GRABBED';
            this.showToast(`TARGET LOCKED: ${this.hoveredBody.userData.id.toUpperCase()}`);
          }
          this.prevPinchDist = pinchDist;
        } else {
          // Pinch + Distance (Zoom)
          if (this.prevPinchDist !== null) {
            const deltaDist = pinchDist - this.prevPinchDist;
            if (Math.abs(deltaDist) > 0.015) {
              const zoomFactor = deltaDist * 85;
              this.adjustCameraZoom(-zoomFactor);
            }
          }
          this.prevPinchDist = pinchDist;

          // Pinch + Move (Pan scene if no planet selected)
          if (!this.selectedBody) {
            const deltaX = (normX - 0.5) * 0.4;
            const deltaY = (indexTip.y - 0.5) * 0.4;
            this.systemTargetPos.x += deltaX;
            this.systemTargetPos.y -= deltaY;
          }
        }

        this.setGestureBadge('PINCH // GRAB & ZOOM', 'pinch');
        this.cursorBadge.textContent = 'GRAB';
      } else {
        this.isPinching = false;
        this.prevPinchDist = null;
        this.virtualCursor.classList.remove('pinch-mode');

        if (this.hoveredBody) {
          this.targetActionLabel.textContent = 'PINCH TO SELECT';
          this.setGestureBadge(`POINT // TARGETING ${this.hoveredBody.userData.id.toUpperCase()}`, 'point');
        } else {
          this.setGestureBadge('POINT // CURSOR BEACON', 'point');
        }
        this.cursorBadge.textContent = 'POINT';
      }
    }
  }

  setGestureBadge(name, typeKey) {
    this.gestureNameDisplay.textContent = name;
    document.querySelectorAll('.guide-entry').forEach(entry => {
      entry.classList.toggle('active-gesture', entry.dataset.gestureType === typeKey);
    });
  }

  setSystemStatus(id, text, active) {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = text;
      el.className = active ? 'row-value highlight-active' : 'row-value';
    }
  }

  /* --------------------------------------------------------------------------
     Raycasting & Body Targeting
     -------------------------------------------------------------------------- */
  updateRaycastHover() {
    this.raycaster.setFromCamera(this.mouseNDC, this.camera);
    const targets = [...this.planetObjects, this.sunMesh];
    const intersects = this.raycaster.intersectObjects(targets);

    if (intersects.length > 0) {
      const hit = intersects[0].object;
      if (this.hoveredBody !== hit) {
        this.hoveredBody = hit;
        this.audio.playTargetLock();
      }

      const worldPos = new THREE.Vector3();
      hit.getWorldPosition(worldPos);
      const screenPos = worldPos.clone().project(this.camera);

      const sx = (screenPos.x * 0.5 + 0.5) * window.innerWidth;
      const sy = (-(screenPos.y * 0.5) + 0.5) * window.innerHeight;

      this.planetTargetBox.classList.remove('hidden');
      this.planetTargetBox.style.left = `${sx}px`;
      this.planetTargetBox.style.top = `${sy}px`;
      this.targetPlanetName.textContent = hit.userData.id.toUpperCase();
    } else {
      this.hoveredBody = null;
      this.planetTargetBox.classList.add('hidden');
    }
  }

  /* --------------------------------------------------------------------------
     Rich Telemetry Display & Tab Switching
     -------------------------------------------------------------------------- */
  selectBody(bodyMesh) {
    this.selectedBody = bodyMesh;
    const bodyId = bodyMesh.userData.id.toLowerCase();
    const data = ASTRONOMICAL_DATA[bodyId];
    if (!data) return;

    // Highlight in Mobile Navigation Dock
    document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
      const idx = btn.dataset.planetIndex;
      const isSun = (bodyId === 'sun' && idx === '-1');
      const isMoon = (bodyId === 'moon' && idx === 'moon');
      const isPlanet = (bodyMesh.userData.index !== undefined && parseInt(idx, 10) === bodyMesh.userData.index);
      btn.classList.toggle('active', Boolean(isSun || isMoon || isPlanet));
    });

    // Populate Specs Tab
    this.cardPlanetType.textContent = data.type;
    this.cardPlanetName.textContent = data.name;
    this.cardDistance.textContent = data.realDist;
    this.cardDiameter.textContent = data.diameter;
    this.cardMass.textContent = data.mass;
    this.cardGravity.textContent = data.gravity;
    this.cardEscape.textContent = data.escape;
    this.cardOrbitPeriod.textContent = data.orbitPeriod;
    this.cardRotationPeriod.textContent = data.rotPeriod;
    this.cardTilt.textContent = data.tilt;

    // Populate Atmosphere Tab
    this.cardPressure.textContent = data.pressure;
    this.cardTemp.textContent = data.temp;

    // Render Atmospheric Gas Composition Bars
    this.atmoBarsContainer.innerHTML = '';
    if (data.gases && data.gases.length > 0) {
      data.gases.forEach(g => {
        const row = document.createElement('div');
        row.className = 'gas-row';
        row.innerHTML = `
          <span class="gas-name">${g.name}</span>
          <div class="gas-meter">
            <div class="gas-fill" style="width: ${Math.min(100, g.pct)}%"></div>
          </div>
          <span class="gas-percent">${g.pct}%</span>
        `;
        this.atmoBarsContainer.appendChild(row);
      });
    }

    // Populate AI Intel Tab
    this.cardAiStatus.textContent = data.aiStatus;
    this.cardAiSummary.textContent = data.aiSummary;
    this.cardAiGeology.textContent = data.aiGeology;

    // Populate Tab 4: Exploration History & Missions
    if (this.cardMissionsContainer) {
      this.cardMissionsContainer.innerHTML = '';
      if (data.missions && data.missions.length > 0) {
        data.missions.forEach(m => {
          const card = document.createElement('div');
          card.className = 'mission-card';
          card.innerHTML = `
            <div class="mission-top">
              <span class="mission-name">${m.name}</span>
              <span class="mission-badge">${m.badge || 'PROBE'}</span>
            </div>
            <div class="mission-agency-year">${m.agency} &bull; ${m.year}</div>
            <p class="mission-detail">${m.desc}</p>
          `;
          this.cardMissionsContainer.appendChild(card);
        });
      } else {
        this.cardMissionsContainer.innerHTML = '<p class="mission-detail">No dedicated orbital missions recorded.</p>';
      }
    }

    this.planetInfoPanel.classList.remove('hidden');
    this.planetInfoPanel.classList.remove('minimized');
    this.missionStatusText.textContent = `TARGET LOCKED: ${data.name}`;

    // Highlight in Celestial Fleet Directory
    document.querySelectorAll('.fleet-item').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.bodyId === bodyId);
    });

    if (this.btnToggleDossier) {
      this.btnToggleDossier.classList.add('active');
    }

    // Tactile Feedback
    this.triggerHaptic(18);

    // Focus Camera on Selected Celestial Body
    this.focusCameraOnBody(bodyMesh);
  }

  getOrderedBodies() {
    const bodies = [this.sunMesh];
    const orderedIds = ['mercury', 'venus', 'earth', 'moon', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
    orderedIds.forEach(id => {
      const found = this.planetObjects.find(p => p.userData && p.userData.id === id);
      if (found) bodies.push(found);
    });
    return bodies;
  }

  navigatePlanet(direction) {
    const bodies = this.getOrderedBodies();
    if (bodies.length === 0) return;
    let currIdx = 0;
    if (this.selectedBody) {
      const idx = bodies.indexOf(this.selectedBody);
      if (idx !== -1) currIdx = idx;
    }
    const nextIdx = (currIdx + direction + bodies.length) % bodies.length;
    this.selectBody(bodies[nextIdx]);
  }

  setViewMode(mode) {
    this.cameraMode = mode;
    this.triggerHaptic(15);
    document.querySelectorAll('[data-view-mode]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.viewMode === mode);
    });

    if (mode === 'overview') {
      this.isOrbitInspect = false;
      this.cameraTargetPos.set(0, 58, 115);
      this.cameraLookAtTarget.set(0, 0, 0);
      this.systemTargetRotation.x = 0.25;
      this.systemTargetRotation.y = 0;
      this.showToast('VIEW: SYSTEM OVERVIEW');
    } else if (mode === 'orrery') {
      this.isOrbitInspect = false;
      this.cameraTargetPos.set(0, 210, 0.1);
      this.cameraLookAtTarget.set(0, 0, 0);
      this.systemTargetRotation.x = 0;
      this.systemTargetRotation.y = 0;
      this.showToast('VIEW: TOP-DOWN ORRERY');
    } else if (mode === 'sun') {
      this.isOrbitInspect = false;
      this.selectBody(this.sunMesh);
      this.cameraTargetPos.set(0, 10, 26);
      this.cameraLookAtTarget.set(0, 0, 0);
      this.showToast('VIEW: SOL CLOSE-UP');
    }
  }

  setTimeScale(scale) {
    this.timeScale = scale;
    this.triggerHaptic(15);
    document.querySelectorAll('.speed-btn').forEach(btn => {
      btn.classList.toggle('active', parseFloat(btn.dataset.speed) === scale);
    });
    this.showToast(`WARP SPEED: ${scale}×`);
  }

  triggerHaptic(ms = 15) {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try { navigator.vibrate(ms); } catch (e) {}
    }
  }

  focusCameraOnBody(bodyMesh) {
    const worldPos = new THREE.Vector3();
    bodyMesh.getWorldPosition(worldPos);

    this.cameraLookAtTarget.copy(worldPos);
    const radius = bodyMesh.userData.isSun ? 8 : bodyMesh.userData.config.radius;
    this.cameraTargetPos.copy(worldPos).add(new THREE.Vector3(0, radius * 3.5, radius * 6.5));
  }

  enterOrbitInspect() {
    this.isOrbitInspect = true;
    const target = this.selectedBody || this.planetObjects[2]; // Default to Earth
    this.selectBody(target);
    this.showToast(`ORBIT INSPECT ENGAGED // TRACKING ${target.userData.id.toUpperCase()}`);
    this.missionStatusText.textContent = `ORBIT INSPECT: ${target.userData.id.toUpperCase()}`;
  }

  adjustCameraZoom(delta) {
    const dir = new THREE.Vector3().subVectors(this.cameraTargetPos, this.cameraLookAtTarget);
    const currentDist = dir.length();
    const newDist = THREE.MathUtils.clamp(currentDist + delta, this.minZoomDist, this.maxZoomDist);
    dir.normalize().multiplyScalar(newDist);
    this.cameraTargetPos.copy(this.cameraLookAtTarget).add(dir);
  }

  togglePause(paused) {
    if (this.isPaused === paused) return;
    this.isPaused = paused;
    this.lastPauseToggleTime = performance.now();

    if (this.isPaused) {
      this.audio.playPause();
      this.pausedOverlay.classList.add('active');
      this.setSystemStatus('status-sim-label', 'HALTED // PAUSED', false);
      const mIcon = document.getElementById('m-pause-icon');
      if (mIcon) mIcon.textContent = '▶';
    } else {
      this.pausedOverlay.classList.remove('active');
      this.setSystemStatus('status-sim-label', 'RUNNING', true);
      const mIcon = document.getElementById('m-pause-icon');
      if (mIcon) mIcon.textContent = '⏸';
    }
  }

  resetSolarSystem() {
    this.audio.playReset();
    this.isOrbitInspect = false;
    this.hoveredBody = null;
    this.planetTargetBox.classList.add('hidden');

    this.cameraTargetPos.copy(this.cameraDefaultPos);
    this.cameraLookAtTarget.set(0, 0, 0);
    this.systemTargetPos.set(0, 0, 0);
    this.systemTargetRotation.x = 0.25;
    this.systemTargetRotation.y = 0;

    // Display Sol data in the dossier while returning camera to overview
    if (this.sunMesh) {
      this.selectBody(this.sunMesh);
      // Keep camera target at system overview
      this.cameraTargetPos.copy(this.cameraDefaultPos);
      this.cameraLookAtTarget.set(0, 0, 0);
    }

    this.missionStatusText.textContent = 'MISSION: ORBITAL OVERVIEW';
    this.showToast('SYSTEM RESET // ORBITAL OVERVIEW RESTORED');

    document.querySelectorAll('.mobile-nav-btn').forEach(b => b.classList.remove('active'));
    const sunBtn = document.getElementById('mbtn-sun');
    if (sunBtn) sunBtn.classList.add('active');
  }

  showToast(message) {
    if (!this.toastEl) return;
    this.toastMsg.textContent = message;
    this.toastEl.classList.remove('hidden');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      this.toastEl.classList.add('hidden');
    }, 2600);
  }

  /* --------------------------------------------------------------------------
     Mouse & Touch Fallback System
     -------------------------------------------------------------------------- */
  setupMouseTouchHandlers() {
    window.addEventListener('mousemove', (e) => {
      if (!this.isCameraActive || this.isFallbackMouse) {
        this.cursorScreen.x = e.clientX;
        this.cursorScreen.y = e.clientY;
        this.virtualCursor.classList.remove('hidden');
        this.virtualCursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

        this.mouseNDC.x = (e.clientX / window.innerWidth) * 2 - 1;
        this.mouseNDC.y = -(e.clientY / window.innerHeight) * 2 + 1;
        this.updateRaycastHover();
      }

      if (this.mouse.isDown) {
        const dx = e.clientX - this.mouse.lastX;
        const dy = e.clientY - this.mouse.lastY;
        this.systemTargetRotation.y += dx * 0.006;
        this.systemTargetRotation.x += dy * 0.006;
        this.mouse.lastX = e.clientX;
        this.mouse.lastY = e.clientY;
      } else if (this.mouse.isRightDown) {
        const dx = e.clientX - this.mouse.lastX;
        const dy = e.clientY - this.mouse.lastY;
        this.systemTargetPos.x += dx * 0.08;
        this.systemTargetPos.y -= dy * 0.08;
        this.mouse.lastX = e.clientX;
        this.mouse.lastY = e.clientY;
      }
    });

    window.addEventListener('mousedown', (e) => {
      if (e.target.closest('button, .glass-panel, .modal-card, input, select')) return;
      this.audio.resume();

      if (e.button === 0) {
        this.mouse.isDown = true;
        this.mouse.lastX = e.clientX;
        this.mouse.lastY = e.clientY;

        if (this.hoveredBody) {
          this.selectBody(this.hoveredBody);
          this.audio.playGrab();
        }
      } else if (e.button === 2) {
        e.preventDefault();
        this.mouse.isRightDown = true;
        this.mouse.lastX = e.clientX;
        this.mouse.lastY = e.clientY;
      }
    });

    window.addEventListener('mouseup', (e) => {
      if (e.button === 0) this.mouse.isDown = false;
      if (e.button === 2) this.mouse.isRightDown = false;
    });

    window.addEventListener('wheel', (e) => {
      if (e.target.closest('.modal-card, .planet-info-panel')) return;
      e.preventDefault();
      this.adjustCameraZoom(e.deltaY * 0.08);
    }, { passive: false });

    window.addEventListener('contextmenu', (e) => {
      if (!e.target.closest('input, select')) e.preventDefault();
    });

    // Touch Handling for Mobile Devices
    window.addEventListener('touchstart', (e) => {
      if (e.target.closest('button, .glass-panel, .modal-card, input, select')) return;
      this.audio.resume();

      if (e.touches.length === 1) {
        this.mouse.lastX = e.touches[0].clientX;
        this.mouse.lastY = e.touches[0].clientY;

        this.mouseNDC.x = (this.mouse.lastX / window.innerWidth) * 2 - 1;
        this.mouseNDC.y = -(this.mouse.lastY / window.innerHeight) * 2 + 1;
        this.updateRaycastHover();

        if (this.hoveredBody) {
          this.selectBody(this.hoveredBody);
        }
      } else if (e.touches.length === 2) {
        // Pinch-to-zoom touch start
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        this.mouse.touchStartDist = Math.hypot(dx, dy);
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1) {
        const dx = e.touches[0].clientX - this.mouse.lastX;
        const dy = e.touches[0].clientY - this.mouse.lastY;
        this.systemTargetRotation.y += dx * 0.008;
        this.systemTargetRotation.x += dy * 0.008;
        this.mouse.lastX = e.touches[0].clientX;
        this.mouse.lastY = e.touches[0].clientY;
      } else if (e.touches.length === 2 && this.mouse.touchStartDist > 0) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const currentDist = Math.hypot(dx, dy);
        const delta = this.mouse.touchStartDist - currentDist;
        this.adjustCameraZoom(delta * 0.25);
        this.mouse.touchStartDist = currentDist;
      }
    }, { passive: true });

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      if (e.target.closest('input, select')) return;

      if (e.code === 'Space') {
        e.preventDefault();
        this.togglePause(!this.isPaused);
      } else if (e.code === 'Escape') {
        this.resetSolarSystem();
      } else if (e.key.toLowerCase() === 'm') {
        const btn = document.getElementById('btn-toggle-sound');
        if (btn) btn.click();
      } else if (e.key.toLowerCase() === 'r') {
        this.resetSolarSystem();
      } else if (e.key.toLowerCase() === 'o') {
        this.enterOrbitInspect();
      }
    });
  }

  /* --------------------------------------------------------------------------
     DOM Buttons & UI Controller
     -------------------------------------------------------------------------- */
  setupEventListeners() {
    // Optional Camera Toggle (Zero Permission Blockers)
    if (this.pillCamera) {
      this.pillCamera.addEventListener('click', () => {
        this.toggleCamera();
      });
    }

    // Sound Toggle
    const soundBtn = document.getElementById('btn-toggle-sound');
    const soundIcon = document.getElementById('sound-icon');
    soundBtn.addEventListener('click', () => {
      const enabled = this.audio.toggle();
      soundIcon.textContent = enabled ? '🔊' : '🔇';
      this.showToast(enabled ? 'Spatial Audio Active' : 'Spatial Audio Muted');
    });

    // Fullscreen Toggle
    document.getElementById('btn-toggle-fullscreen').addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });

    // Guide Drawer Collapse
    document.getElementById('btn-toggle-guide').addEventListener('click', () => {
      this.gestureGuidePanel.classList.toggle('collapsed');
      const chev = document.getElementById('guide-chevron');
      if (chev) chev.textContent = this.gestureGuidePanel.classList.contains('collapsed') ? '▸' : '▾';
    });

    // Telemetry Card Close & Actions
    document.getElementById('btn-close-planet-card').addEventListener('click', () => {
      this.planetInfoPanel.classList.add('hidden');
      if (this.btnToggleDossier) this.btnToggleDossier.classList.remove('active');
    });

    // Top Bar HUD Toggles: Fleet Directory, Dossier, Gesture Manual
    if (this.btnToggleFleet) {
      this.btnToggleFleet.addEventListener('click', () => {
        const isVis = this.systemStatusPanel.classList.toggle('mobile-visible');
        this.btnToggleFleet.classList.toggle('active', isVis);
        this.triggerHaptic(12);
      });
    }

    if (this.btnCloseFleet) {
      this.btnCloseFleet.addEventListener('click', () => {
        this.systemStatusPanel.classList.remove('mobile-visible');
        if (this.btnToggleFleet) this.btnToggleFleet.classList.remove('active');
        this.triggerHaptic(10);
      });
    }

    if (this.btnToggleDossier) {
      this.btnToggleDossier.addEventListener('click', () => {
        const isHidden = this.planetInfoPanel.classList.toggle('hidden');
        this.btnToggleDossier.classList.toggle('active', !isHidden);
        if (!isHidden && !this.selectedBody) {
          const earthObj = this.planetObjects.find(p => p.userData && p.userData.id === 'earth') || this.sunMesh;
          if (earthObj) this.selectBody(earthObj);
        }
        this.triggerHaptic(12);
      });
    }

    if (this.btnToggleManual) {
      this.btnToggleManual.addEventListener('click', () => {
        const isVis = this.gestureGuidePanel.classList.toggle('mobile-visible');
        this.gestureGuidePanel.classList.remove('collapsed');
        this.btnToggleManual.classList.toggle('active', isVis);
        this.triggerHaptic(12);
      });
    }

    // Celestial Fleet Directory Click Handlers
    document.querySelectorAll('.fleet-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const bodyId = btn.dataset.bodyId;
        let target = null;
        if (bodyId === 'sun') {
          target = this.sunMesh;
        } else if (bodyId === 'moon') {
          target = this.moonMesh;
        } else {
          target = this.planetObjects.find(p => p.userData && p.userData.id === bodyId);
        }

        if (target) {
          this.selectBody(target);
          this.audio.playGrab();
          this.triggerHaptic(15);
        }
      });
    });

    document.getElementById('btn-inspect-planet').addEventListener('click', () => {
      this.enterOrbitInspect();
    });

    document.getElementById('btn-overview-return').addEventListener('click', () => {
      this.resetSolarSystem();
    });

    // Telemetry Tabs Switching (ALL CONTENT, SPECS, ATMOSPHERE, AI INTEL, MISSIONS)
    document.querySelectorAll('.telemetry-tab').forEach(tabBtn => {
      tabBtn.addEventListener('click', () => {
        const tabId = tabBtn.dataset.tab;
        document.querySelectorAll('.telemetry-tab').forEach(b => b.classList.remove('active'));
        tabBtn.classList.add('active');

        if (tabId === 'all') {
          this.planetInfoPanel.classList.add('show-all-content');
          document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        } else {
          this.planetInfoPanel.classList.remove('show-all-content');
          document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
          const content = document.getElementById(`tab-content-${tabId}`);
          if (content) content.classList.add('active');
        }
        this.triggerHaptic(10);
      });
    });

    // Prev / Next Planet Navigation
    if (this.btnPrevPlanet) {
      this.btnPrevPlanet.addEventListener('click', () => {
        this.navigatePlanet(-1);
      });
    }
    if (this.btnNextPlanet) {
      this.btnNextPlanet.addEventListener('click', () => {
        this.navigatePlanet(1);
      });
    }

    // Camera Perspective Modes (Overview, Orrery, Sol)
    document.querySelectorAll('[data-view-mode]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.setViewMode(btn.dataset.viewMode);
      });
    });

    // Orbital Warp Speed Multipliers (0.5x, 1x, 2x, 5x)
    document.querySelectorAll('.speed-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.setTimeScale(parseFloat(btn.dataset.speed));
      });
    });

    // Mobile Bottom Sheet Drag Handle Collapse/Expand
    if (this.sheetDragHandle) {
      this.sheetDragHandle.addEventListener('click', () => {
        this.planetInfoPanel.classList.toggle('minimized');
        this.triggerHaptic(12);
      });
    }

    // Mobile Action Dock: Dossier Toggle
    if (this.mbtnInfo) {
      this.mbtnInfo.addEventListener('click', () => {
        if (this.planetInfoPanel.classList.contains('hidden')) {
          const target = this.selectedBody || this.planetObjects[2] || this.sunMesh;
          this.selectBody(target);
        } else if (this.planetInfoPanel.classList.contains('minimized')) {
          this.planetInfoPanel.classList.remove('minimized');
        } else {
          this.planetInfoPanel.classList.add('minimized');
        }
        this.triggerHaptic(15);
      });
    }

    // Mobile Action Dock: Zoom Controls
    document.getElementById('mbtn-zoom-in').addEventListener('click', () => {
      this.adjustCameraZoom(-15);
      this.triggerHaptic(10);
    });

    document.getElementById('mbtn-zoom-out').addEventListener('click', () => {
      this.adjustCameraZoom(15);
      this.triggerHaptic(10);
    });

    // Mobile Action Dock: Planet Pills
    document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idxStr = btn.dataset.planetIndex;
        if (idxStr === '-1') {
          this.selectBody(this.sunMesh);
        } else if (idxStr === 'moon') {
          if (this.moonMesh) this.selectBody(this.moonMesh);
        } else {
          const idx = parseInt(idxStr, 10);
          if (this.planetObjects[idx]) {
            this.selectBody(this.planetObjects[idx]);
          }
        }
        this.triggerHaptic(15);
      });
    });

    document.getElementById('mbtn-inspect').addEventListener('click', () => {
      this.enterOrbitInspect();
      this.triggerHaptic(15);
    });

    document.getElementById('mbtn-pause').addEventListener('click', () => {
      this.togglePause(!this.isPaused);
      this.triggerHaptic(15);
    });

    document.getElementById('mbtn-reset').addEventListener('click', () => {
      this.resetSolarSystem();
      this.triggerHaptic(15);
    });

    // Settings Modal
    document.getElementById('btn-open-settings').addEventListener('click', () => {
      this.settingsModal.classList.remove('hidden');
    });
    document.getElementById('btn-close-settings').addEventListener('click', () => {
      this.settingsModal.classList.add('hidden');
    });
    document.getElementById('btn-save-settings').addEventListener('click', () => {
      this.applySettings();
      this.settingsModal.classList.add('hidden');
      this.showToast('Configuration Applied');
    });
  }

  applySettings() {
    const toggleSkel = document.getElementById('toggle-skeleton-render');
    const toggleAud = document.getElementById('toggle-audio-enabled');
    const toggleMir = document.getElementById('toggle-camera-mirror');
    const toggleAst = document.getElementById('toggle-asteroids');
    const rangeSens = document.getElementById('range-sensitivity');

    this.renderSkeleton = toggleSkel.checked;
    this.cameraMirror = toggleMir.checked;
    this.renderAsteroids = toggleAst.checked;
    this.trackingSensitivity = parseInt(rangeSens.value, 10) || 3;

    if (this.asteroidInstancedMesh) {
      this.asteroidInstancedMesh.visible = this.renderAsteroids;
    }

    this.audio.toggle(toggleAud.checked);
    document.getElementById('sound-icon').textContent = toggleAud.checked ? '🔊' : '🔇';

    if (!this.renderSkeleton && this.skeletonCtx) {
      this.skeletonCtx.clearRect(0, 0, this.skeletonCanvas.width, this.skeletonCanvas.height);
    }
  }

  /* --------------------------------------------------------------------------
     Master Render & Simulation Loop
     -------------------------------------------------------------------------- */
  animate() {
    requestAnimationFrame(() => this.animate());

    const dt = Math.min(this.clock.getDelta(), 0.1);
    const time = this.clock.getElapsedTime();

    // FPS Counter
    this.fpsFrames++;
    const now = performance.now();
    if (now - this.fpsLastTime >= 1000) {
      if (this.fpsDisplay) {
        this.fpsDisplay.textContent = `${this.fpsFrames} FPS`;
      }
      this.fpsFrames = 0;
      this.fpsLastTime = now;
    }

    // 1. Orbital Revolution, Axial Rotation & Asteroid Belt
    if (!this.isPaused) {
      const simDt = dt * this.timeScale;

      // Planets
      this.planetObjects.forEach(planet => {
        const u = planet.userData;
        if (u.isMoon) return; // Moon orbits Earth via pivot
        u.angle += u.config.speed * simDt * 2.2;
        planet.position.x = Math.cos(u.angle) * u.initialDist;
        planet.position.z = Math.sin(u.angle) * u.initialDist;

        planet.rotation.y += u.config.rotSpeed * simDt * 30.0;

        if (u.cloudMesh) {
          u.cloudMesh.rotation.y += simDt * 0.14;
        }
      });

      // Earth's Natural Satellite: The Moon (Luna)
      if (this.moonPivot) {
        this.moonPivot.rotation.y += simDt * 0.55;
      }
      if (this.moonMesh) {
        this.moonMesh.rotation.y += simDt * 0.04;
      }

      // Sun & Pulsating Corona
      if (this.sunMesh) {
        this.sunMesh.rotation.y += simDt * 0.08;
      }
      if (this.sunCoronaSprite) {
        const pulse = 28 + Math.sin(time * 3.0) * 2.5;
        this.sunCoronaSprite.scale.set(pulse, pulse, 1);
      }

      // Asteroid Belt Simulation
      if (this.asteroidInstancedMesh && this.renderAsteroids) {
        const dummy = new THREE.Object3D();
        const count = this.asteroidData.length;

        for (let i = 0; i < count; i++) {
          const a = this.asteroidData[i];
          a.angle += a.speed * simDt * 2.0;

          dummy.position.set(Math.cos(a.angle) * a.radius, a.height, Math.sin(a.angle) * a.radius);
          dummy.rotation.x += a.rotSpeed.x;
          dummy.rotation.y += a.rotSpeed.y;
          dummy.updateMatrix();

          this.asteroidInstancedMesh.setMatrixAt(i, dummy.matrix);
        }
        this.asteroidInstancedMesh.instanceMatrix.needsUpdate = true;
      }

      // Starfield Slow Drift
      if (this.starfield) {
        this.starfield.rotation.y += dt * 0.003;
      }
    }

    // 2. Solar System Group Damped Rotation & Pan
    this.systemRotation.x += (this.systemTargetRotation.x - this.systemRotation.x) * 0.08;
    this.systemRotation.y += (this.systemTargetRotation.y - this.systemRotation.y) * 0.08;
    this.solarSystemGroup.rotation.x = this.systemRotation.x;
    this.solarSystemGroup.rotation.y = this.systemRotation.y;

    this.systemPos.lerp(this.systemTargetPos, 0.08);
    this.solarSystemGroup.position.copy(this.systemPos);

    // 3. Camera Smooth Damping & Orbit Inspect Follow
    if (this.selectedBody) {
      const worldPos = new THREE.Vector3();
      this.selectedBody.getWorldPosition(worldPos);
      this.cameraLookAtTarget.lerp(worldPos, 0.06);

      if (this.isOrbitInspect) {
        const radius = this.selectedBody.userData.isSun ? 8 : this.selectedBody.userData.config.radius;
        const offset = new THREE.Vector3(0, radius * 3.0, radius * 6.5);
        this.cameraTargetPos.copy(worldPos).add(offset);
      }
    }

    this.camera.position.lerp(this.cameraTargetPos, 0.06);
    this.camera.lookAt(this.cameraLookAtTarget);

    // 4. Update Reticle Screen Position for Hovered Body
    if (this.hoveredBody && !this.planetTargetBox.classList.contains('hidden')) {
      const worldPos = new THREE.Vector3();
      this.hoveredBody.getWorldPosition(worldPos);
      const screenPos = worldPos.clone().project(this.camera);

      const sx = (screenPos.x * 0.5 + 0.5) * window.innerWidth;
      const sy = (-(screenPos.y * 0.5) + 0.5) * window.innerHeight;
      this.planetTargetBox.style.left = `${sx}px`;
      this.planetTargetBox.style.top = `${sy}px`;
    }

    this.renderer.render(this.scene, this.camera);
  }
}

/* ============================================================================
   6. BOOTSTRAP INITIALIZATION
   ============================================================================ */
window.addEventListener('DOMContentLoaded', () => {
  window.solarCommandApp = new SolarCommandApp();
});
