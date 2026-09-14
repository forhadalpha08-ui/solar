/**
 * ============================================================================
 * AURA — ADVANCED GESTURE UNIVERSE
 * Brand: Abdullah Psychotic / AP Universe
 * Luxury Futuristic Digital Art Installation Engine
 * ============================================================================
 */

'use strict';

/* ============================================================================
   1. PROCEDURAL WEB AUDIO ENGINE
   Spatial space drone, magnetic singularity resonance, supernova blasts, and freeze SFX
   ============================================================================ */
class AudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.ambientGain = null;
    this.droneOsc1 = null;
    this.droneOsc2 = null;
    this.droneFilter = null;
    this.isEnabled = true;
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      this.ctx = new AudioContext();

      // Master Gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.setupAmbientDrone();
      this.isInitialized = true;
    } catch (e) {
      console.warn('Web Audio API unavailable:', e);
    }
  }

  setupAmbientDrone() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.setValueAtTime(0.08, now);

    this.droneFilter = this.ctx.createBiquadFilter();
    this.droneFilter.type = 'lowpass';
    this.droneFilter.frequency.setValueAtTime(200, now);

    // Deep sub-bass resonance
    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc1.type = 'sine';
    this.droneOsc1.frequency.setValueAtTime(55, now); // A1

    // Harmonic fifth drone
    this.droneOsc2 = this.ctx.createOscillator();
    this.droneOsc2.type = 'triangle';
    this.droneOsc2.frequency.setValueAtTime(82.4, now); // E2

    this.droneOsc1.connect(this.droneFilter);
    this.droneOsc2.connect(this.droneFilter);
    this.droneFilter.connect(this.ambientGain);
    this.ambientGain.connect(this.masterGain);

    this.droneOsc1.start();
    this.droneOsc2.start();
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle(enable) {
    this.isEnabled = enable !== undefined ? enable : !this.isEnabled;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isEnabled ? 0.7 : 0, this.ctx.currentTime, 0.05);
    }
    return this.isEnabled;
  }

  playPinchHum(intensity = 0.5) {
    if (!this.isEnabled || !this.ctx) return;
    this.resume();
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      const baseFreq = 150 + intensity * 280;
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.4, now + 0.28);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(450 + intensity * 600, now);
      filter.Q.setValueAtTime(5, now);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {}
  }

  playSupernovaBlast() {
    if (!this.isEnabled || !this.ctx) return;
    this.resume();
    try {
      const now = this.ctx.currentTime;

      // 1. Low frequency seismic thud
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(110, now);
      subOsc.frequency.exponentialRampToValueAtTime(26, now + 0.85);

      subGain.gain.setValueAtTime(0.4, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

      subOsc.connect(subGain);
      subGain.connect(this.masterGain);
      subOsc.start(now);
      subOsc.stop(now + 0.95);

      // 2. High-energy filtered particle burst
      const bufferSize = this.ctx.sampleRate * 0.75;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.setValueAtTime(2800, now);
      noiseFilter.frequency.exponentialRampToValueAtTime(160, now + 0.75);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.26, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.masterGain);

      whiteNoise.start(now);
      whiteNoise.stop(now + 0.8);
    } catch (e) {}
  }

  playFreezeSound() {
    if (!this.isEnabled || !this.ctx) return;
    this.resume();
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.45);

      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.55);
    } catch (e) {}
  }

  playMorphSound() {
    if (!this.isEnabled || !this.ctx) return;
    this.resume();
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(90, now);
      osc.frequency.exponentialRampToValueAtTime(480, now + 0.3);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.6);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, now);
      filter.frequency.exponentialRampToValueAtTime(2200, now + 0.3);
      filter.frequency.exponentialRampToValueAtTime(400, now + 0.6);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.7);
    } catch (e) {}
  }
}

/* ============================================================================
   2. PROCEDURAL PARTICLE TEXTURE GENERATOR
   Creates radiant gold metallic star core sprite via HTML5 canvas
   ============================================================================ */
function createParticleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
  gradient.addColorStop(0.2, 'rgba(255, 240, 200, 0.9)');
  gradient.addColorStop(0.5, 'rgba(229, 180, 75, 0.4)');
  gradient.addColorStop(0.8, 'rgba(180, 130, 40, 0.1)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/* ============================================================================
   3. COLOR PALETTES DEFINITIONS
   Gold, Crimson, Ice, Aurora
   ============================================================================ */
const COLOR_THEMES = {
  gold: {
    id: 'gold',
    name: 'METALLIC GOLD',
    pointLightColor: 0xffd700,
    cursorColor: '#ffd700',
    primary: new THREE.Color(0xfff2a1),
    secondary: new THREE.Color(0xffd700),
    tertiary: new THREE.Color(0xd4af37),
    dark: new THREE.Color(0x9c8242)
  },
  crimson: {
    id: 'crimson',
    name: 'IMPERIAL CRIMSON',
    pointLightColor: 0xff1744,
    cursorColor: '#ff1744',
    primary: new THREE.Color(0xffffff),
    secondary: new THREE.Color(0xff2a5f),
    tertiary: new THREE.Color(0xd90429),
    dark: new THREE.Color(0x7a0018)
  },
  ice: {
    id: 'ice',
    name: 'CRYSTALLINE ICE',
    pointLightColor: 0x38bdf8,
    cursorColor: '#38bdf8',
    primary: new THREE.Color(0xffffff),
    secondary: new THREE.Color(0xbbf2f6),
    tertiary: new THREE.Color(0x38bdf8),
    dark: new THREE.Color(0x0284c7)
  },
  aurora: {
    id: 'aurora',
    name: 'AURORA EMERALD',
    pointLightColor: 0x10b981,
    cursorColor: '#10b981',
    primary: new THREE.Color(0x2dd4bf),
    secondary: new THREE.Color(0x10b981),
    tertiary: new THREE.Color(0x8b5cf6),
    dark: new THREE.Color(0x4c1d95)
  }
};

/* ============================================================================
   4. PARAMETRIC 3D MORPH FORMATIONS
   Heart, Flower, Saturn, Galaxy, Meditate
   ============================================================================ */
const FORMATIONS = {
  galaxy: {
    id: 'galaxy',
    name: 'COSMIC GALAXY',
    generate(count) {
      const positions = new Float32Array(count * 3);
      const phases = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        phases[i] = Math.random() * Math.PI * 2;

        if (i < count * 0.75) {
          // Logarithmic spiral accretion arms
          const arm = i % 3;
          const armAngle = (arm * 2 * Math.PI) / 3;
          const radius = Math.pow(Math.random(), 1.6) * 46 + 2.5;
          const spinAngle = radius * 0.22;
          const spread = Math.pow(Math.random(), 2) * (radius * 0.2);
          const theta = armAngle + spinAngle + (Math.random() - 0.5) * 0.35;

          positions[i3] = Math.cos(theta) * radius + (Math.random() - 0.5) * spread;
          positions[i3 + 1] = (Math.random() - 0.5) * (spread * 0.6) + Math.sin(radius * 0.25) * 1.5;
          positions[i3 + 2] = Math.sin(theta) * radius + (Math.random() - 0.5) * spread;
        } else {
          // Spherical starfield halo
          const u = Math.random();
          const v = Math.random();
          const theta = u * 2.0 * Math.PI;
          const phi = Math.acos(2.0 * v - 1.0);
          const r = Math.cbrt(Math.random()) * 60 + 30;

          positions[i3] = r * Math.sin(phi) * Math.cos(theta);
          positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
          positions[i3 + 2] = r * Math.cos(phi);
        }
      }
      return { positions, phases };
    }
  },

  heart: {
    id: 'heart',
    name: 'PARAMETRIC HEART',
    generate(count) {
      const positions = new Float32Array(count * 3);
      const phases = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        phases[i] = Math.random() * Math.PI * 2;

        // 3D Cardioid surface parameterization
        const t = Math.random() * Math.PI * 2;
        const scale = 1.6;
        const spread = (Math.random() - 0.5) * 2.5;

        // Cardioid 2D profile
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);

        // Extruded 3D depth modulated by vertical position
        const depthTaper = Math.max(0, 1.0 - Math.abs(y) / 18);
        const z = (Math.random() - 0.5) * 14 * depthTaper + spread;

        // Inward shell layering
        const layer = Math.pow(Math.random(), 0.7) * 0.95 + 0.05;

        positions[i3] = (x * layer + spread) * scale;
        positions[i3 + 1] = (y * layer + spread) * scale + 2;
        positions[i3 + 2] = z * layer * scale;
      }
      return { positions, phases };
    }
  },

  flower: {
    id: 'flower',
    name: 'PHYLLOTAXIS LOTUS',
    generate(count) {
      const positions = new Float32Array(count * 3);
      const phases = new Float32Array(count);
      const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // ~137.5 degrees

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        phases[i] = Math.random() * Math.PI * 2;

        const rNorm = Math.sqrt(i / count);
        const radius = rNorm * 38;
        const theta = i * goldenAngle;

        // Petal elevation curve (fluted lotus chalice)
        const petalShape = Math.pow(rNorm, 1.8) * 14.0 - 4.0;
        const undulation = Math.sin(theta * 5.0) * (rNorm * 3.5);
        const y = petalShape + undulation + (Math.random() - 0.5) * 1.5;

        positions[i3] = Math.cos(theta) * radius + (Math.random() - 0.5) * 1.2;
        positions[i3 + 1] = y;
        positions[i3 + 2] = Math.sin(theta) * radius + (Math.random() - 0.5) * 1.2;
      }
      return { positions, phases };
    }
  },

  saturn: {
    id: 'saturn',
    name: 'RINGED SATURN',
    generate(count) {
      const positions = new Float32Array(count * 3);
      const phases = new Float32Array(count);

      const tiltAngleX = 0.45; // ~26 degrees tilt
      const tiltAngleY = 0.20;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        phases[i] = Math.random() * Math.PI * 2;

        if (i < count * 0.35) {
          // Central Celestial Planet Sphere
          const u = Math.random();
          const v = Math.random();
          const theta = u * 2.0 * Math.PI;
          const phi = Math.acos(2.0 * v - 1.0);
          const r = Math.cbrt(Math.random()) * 8.5;

          positions[i3] = r * Math.sin(phi) * Math.cos(theta);
          positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
          positions[i3 + 2] = r * Math.cos(phi);
        } else {
          // Double Cassini Tilted Rings
          const theta = Math.random() * Math.PI * 2;
          let r;
          const ringPick = Math.random();

          if (ringPick < 0.55) {
            // Main dense Ring A & B
            r = Math.random() * 8 + 12; // 12 to 20
          } else if (ringPick < 0.85) {
            // Outer Ring C
            r = Math.random() * 7 + 22; // 22 to 29
          } else {
            // Thin E-Ring Haze
            r = Math.random() * 9 + 30; // 30 to 39
          }

          let rx = Math.cos(theta) * r;
          let ry = (Math.random() - 0.5) * 0.8;
          let rz = Math.sin(theta) * r;

          // Apply orbital plane tilt rotation
          const cosX = Math.cos(tiltAngleX);
          const sinX = Math.sin(tiltAngleX);
          const ty = ry * cosX - rz * sinX;
          const tz = ry * sinX + rz * cosX;

          positions[i3] = rx;
          positions[i3 + 1] = ty;
          positions[i3 + 2] = tz;
        }
      }
      return { positions, phases };
    }
  },

  meditate: {
    id: 'meditate',
    name: 'CHAKRA MEDITATE',
    generate(count) {
      const positions = new Float32Array(count * 3);
      const phases = new Float32Array(count);

      // 7 Chakra Core Coordinates
      const chakras = [
        { y: -12, r: 0.9 }, // Root
        { y: -8,  r: 1.0 }, // Sacral
        { y: -4,  r: 1.1 }, // Solar Plexus
        { y: 0,   r: 1.3 }, // Heart
        { y: 4,   r: 1.0 }, // Throat
        { y: 8,   r: 1.1 }, // Third Eye
        { y: 12,  r: 1.4 }  // Crown
      ];

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        phases[i] = Math.random() * Math.PI * 2;

        if (i < count * 0.4) {
          // Meditative Human Silhouette (Lotus posture)
          const part = Math.random();
          if (part < 0.35) {
            // Crossed legs base
            const t = Math.random() * Math.PI * 2;
            const r = Math.random() * 4 + 9;
            positions[i3] = Math.cos(t) * r * 1.5;
            positions[i3 + 1] = -12 + (Math.random() - 0.5) * 3;
            positions[i3 + 2] = Math.sin(t) * r * 0.8;
          } else if (part < 0.75) {
            // Torso and spine
            const y = (Math.random() - 0.5) * 16 - 2;
            const taper = 1.0 - (y + 10) / 24;
            const theta = Math.random() * Math.PI * 2;
            const r = Math.random() * (4.5 * taper) + 0.5;
            positions[i3] = Math.cos(theta) * r;
            positions[i3 + 1] = y;
            positions[i3 + 2] = Math.sin(theta) * r;
          } else {
            // Crown / Head aura sphere
            const u = Math.random();
            const v = Math.random();
            const theta = u * 2.0 * Math.PI;
            const phi = Math.acos(2.0 * v - 1.0);
            const r = Math.cbrt(Math.random()) * 4.2;
            positions[i3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta) + 9;
            positions[i3 + 2] = r * Math.cos(phi);
          }
        } else if (i < count * 0.7) {
          // Kundalini Ascending Dual-Helix Energy Stream
          const t = Math.random() * Math.PI * 8;
          const helixIndex = i % 2 === 0 ? 1 : -1;
          const y = (t / (Math.PI * 8)) * 32 - 14;
          const r = Math.sin(t * 0.25) * 3 + 3;

          positions[i3] = Math.cos(t * helixIndex) * r + (Math.random() - 0.5) * 1.5;
          positions[i3 + 1] = y;
          positions[i3 + 2] = Math.sin(t * helixIndex) * r + (Math.random() - 0.5) * 1.5;
        } else {
          // Sacred Merkabah Aura Glow
          const chakra = chakras[i % chakras.length];
          const theta = Math.random() * Math.PI * 2;
          const r = Math.random() * 5 * chakra.r;
          positions[i3] = Math.cos(theta) * r;
          positions[i3 + 1] = chakra.y + (Math.random() - 0.5) * 2;
          positions[i3 + 2] = Math.sin(theta) * r;
        }
      }
      return { positions, phases };
    }
  }
};

/* ============================================================================
   5. AURA CORE ENGINE
   Rendering, Physics, Computer Vision, Real-Time HUD, Dock Interactions
   ============================================================================ */
class AuraEngine {
  constructor() {
    // DOM Elements
    this.canvas = document.getElementById('universe-canvas');
    this.cursorEl = document.getElementById('gesture-cursor');
    this.cursorLabel = document.getElementById('cursor-label');
    this.stasisOverlay = document.getElementById('stasis-overlay');
    this.shockwaveLayer = document.getElementById('shockwave-layer');
    this.landingScreen = document.getElementById('landing-screen');
    this.appHud = document.getElementById('app-hud');
    this.currentRealmName = document.getElementById('current-realm-name');
    this.camDot = document.getElementById('cam-dot');
    this.camStatusText = document.getElementById('cam-status-text');
    this.trackDot = document.getElementById('track-dot');
    this.trackStatusText = document.getElementById('track-status-text');
    this.fpsCounter = document.getElementById('fps-counter');
    this.gestureBanner = document.getElementById('gesture-banner');
    this.gestureBannerText = document.getElementById('gesture-banner-text');

    // Dual-Hand HUD Elements
    this.hudLeftHand = document.getElementById('hud-left-hand');
    this.hudRightHand = document.getElementById('hud-right-hand');
    this.hudCurrentGesture = document.getElementById('hud-current-gesture');
    this.hudCameraState = document.getElementById('hud-camera-state');

    // Camera Preview Elements
    this.cameraContainer = document.getElementById('camera-preview-container');
    this.skeletonCanvas = document.getElementById('camera-skeleton-canvas');
    this.skeletonCtx = this.skeletonCanvas ? this.skeletonCanvas.getContext('2d') : null;
    this.webcamVideo = document.getElementById('webcam-video');
    this.cameraOverlayMsg = document.getElementById('camera-overlay-message');

    // Modals & Toast
    this.cameraModal = document.getElementById('camera-modal');
    this.settingsModal = document.getElementById('settings-modal');
    this.toastEl = document.getElementById('toast');
    this.toastMsg = document.getElementById('toast-message');

    // Audio Engine
    this.audio = new AudioEngine();

    // Three.js State
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.clock = new THREE.Clock();
    this.texture = createParticleTexture();

    // Formation & Color State
    this.currentFormation = 'galaxy';
    this.currentColor = 'gold';
    this.currentInteraction = 'attract'; // 'attract', 'repel', 'orbit', 'freeze'
    this.particleCount = 24000;
    this.reducedMotion = false;

    // Particle Buffers & Simulation Data
    this.particles = null;
    this.homePositions = null;
    this.velocities = null;
    this.phases = null;
    this.targetPositions = null;
    this.isMorphing = false;
    this.morphProgress = 1.0;

    // 3D Scene Objects & Cursor
    this.lightPoint = null;
    this.cursor3D = new THREE.Vector3(0, 0, 0);
    this.sceneRotation = { x: 0, y: 0 };
    this.targetSceneRotation = { x: 0, y: 0 };

    // Gestures & Physics
    this.isPinching = false;
    this.isFrozen = false;
    this.pinchIntensity = 0;
    this.lastExplosionTime = 0;
    this.lastMorphTime = 0;
    this.activeGesture = 'none';

    // Vision Hand Tracking
    this.mediaPipeHands = null;
    this.cameraUtilsInstance = null;
    this.isCameraActive = false;
    this.isFallbackMouse = false;
    this.cameraMirror = true;
    this.trackingSensitivity = 3;

    // Smoothing & Metrics
    this.handPositionSmoothed = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.wristVelocityHistory = [];
    this.fpsFrames = 0;
    this.fpsLastTime = performance.now();

    // Mouse & Touch Fallback State
    this.mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      isDown: false,
      isDragging: false,
      lastX: 0,
      lastY: 0
    };

    this.init();
  }

  init() {
    this.setupThreeScene();
    this.applyFormation('galaxy', false);
    this.applyColorTheme('gold');
    this.setupEventListeners();
    this.setupMouseTouchHandlers();
    this.setupKeyboardShortcuts();
    this.animate();
  }

  /* --------------------------------------------------------------------------
     Three.js Setup
     -------------------------------------------------------------------------- */
  setupThreeScene() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x030305, 0.012);

    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 0, 52);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x030305, 1);

    // Dynamic 3D Point Light for cursor
    this.lightPoint = new THREE.PointLight(0xffd700, 4.0, 55);
    this.lightPoint.position.set(0, 0, 10);
    this.scene.add(this.lightPoint);

    // Warm metallic ambient lighting
    const ambientLight = new THREE.AmbientLight(0x221a0f, 1.4);
    this.scene.add(ambientLight);

    window.addEventListener('resize', () => this.onWindowResize());
  }

  onWindowResize() {
    if (!this.camera || !this.renderer) return;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  /* --------------------------------------------------------------------------
     Parametric Morph & Color Application
     -------------------------------------------------------------------------- */
  applyFormation(formationId, animate = true) {
    if (!FORMATIONS[formationId]) return;
    this.currentFormation = formationId;
    const config = FORMATIONS[formationId];

    // Update Top Bar & Dock
    if (this.currentRealmName) {
      this.currentRealmName.textContent = config.name;
    }
    document.querySelectorAll('[data-morph]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.morph === formationId);
    });

    if (animate) {
      this.audio.playMorphSound();
      this.triggerShockwave(window.innerWidth / 2, window.innerHeight / 2);
      this.showToast(`MORPHED TO FORMATION: ${config.name}`);
    }

    const generated = config.generate(this.particleCount);

    if (!this.particles) {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(generated.positions), 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(this.particleCount * 3), 3));

      this.homePositions = new Float32Array(generated.positions);
      this.velocities = new Float32Array(this.particleCount * 3);
      this.phases = new Float32Array(generated.phases);

      const material = new THREE.PointsMaterial({
        size: 1.8,
        vertexColors: true,
        map: this.texture,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      this.particles = new THREE.Points(geometry, material);
      this.scene.add(this.particles);
    } else {
      this.targetPositions = new Float32Array(generated.positions);
      this.homePositions = new Float32Array(generated.positions);
      this.phases = new Float32Array(generated.phases);
      this.isMorphing = true;
      this.morphProgress = 0.0;

      // Gentle velocity dispersion kick
      const kick = this.reducedMotion ? 3.0 : 8.0;
      for (let i = 0; i < this.particleCount * 3; i += 3) {
        this.velocities[i] += (Math.random() - 0.5) * kick;
        this.velocities[i + 1] += (Math.random() - 0.5) * kick;
        this.velocities[i + 2] += (Math.random() - 0.5) * (kick * 1.5);
      }
    }

    this.recomputeColors();
  }

  applyColorTheme(themeId) {
    if (!COLOR_THEMES[themeId]) return;
    this.currentColor = themeId;
    const theme = COLOR_THEMES[themeId];

    document.querySelectorAll('[data-color]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.color === themeId);
    });

    if (this.lightPoint) {
      this.lightPoint.color.setHex(theme.pointLightColor);
    }

    this.recomputeColors();
    this.showToast(`COLOR THEME: ${theme.name}`);
  }

  recomputeColors() {
    if (!this.particles) return;
    const colors = this.particles.geometry.attributes.color.array;
    const positions = this.homePositions || this.particles.geometry.attributes.position.array;
    const theme = COLOR_THEMES[this.currentColor];

    for (let i = 0; i < this.particleCount; i++) {
      const i3 = i * 3;
      const x = positions[i3];
      const y = positions[i3 + 1];
      const z = positions[i3 + 2];
      const dist = Math.sqrt(x * x + y * y + z * z);
      const factor = Math.min(1.0, dist / 40.0);

      const c = new THREE.Color();
      if (factor < 0.25) {
        c.lerpColors(theme.primary, theme.secondary, factor * 4.0);
      } else {
        c.lerpColors(theme.secondary, theme.tertiary, (factor - 0.25) / 0.75);
      }

      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }
    this.particles.geometry.attributes.color.needsUpdate = true;
  }

  setInteraction(interactionId) {
    this.currentInteraction = interactionId;
    document.querySelectorAll('[data-interaction]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.interaction === interactionId);
    });

    if (interactionId === 'freeze') {
      this.setTimeFrozen(true);
    } else {
      this.setTimeFrozen(false);
      if (interactionId === 'attract') {
        this.isPinching = true;
        this.audio.playPinchHum(0.8);
      } else {
        this.isPinching = false;
      }
    }
    this.showToast(`INTERACTION MODE: ${interactionId.toUpperCase()}`);
  }

  /* --------------------------------------------------------------------------
     Visual Effects & Feedback
     -------------------------------------------------------------------------- */
  triggerSupernova() {
    const now = performance.now();
    if (now - this.lastExplosionTime < 1100) return;
    this.lastExplosionTime = now;

    this.audio.playSupernovaBlast();
    this.triggerShockwave(this.handPositionSmoothed.x, this.handPositionSmoothed.y);
    this.showGestureBanner('SUPERNOVA: EXPLOSIVE WAVE');

    if (!this.particles) return;
    const pos = this.particles.geometry.attributes.position.array;
    const blastOrigin = this.cursor3D;
    const blastStrength = this.reducedMotion ? 18.0 : 34.0;

    for (let i = 0; i < this.particleCount; i++) {
      const i3 = i * 3;
      const dx = pos[i3] - blastOrigin.x;
      const dy = pos[i3 + 1] - blastOrigin.y;
      const dz = pos[i3 + 2] - blastOrigin.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) + 1.0;

      const factor = (1.0 / dist) * blastStrength;
      this.velocities[i3] += (dx / dist) * factor * (12.0 + Math.random() * 8.0);
      this.velocities[i3 + 1] += (dy / dist) * factor * (12.0 + Math.random() * 8.0);
      this.velocities[i3 + 2] += (dz / dist) * factor * (12.0 + Math.random() * 8.0);
    }
  }

  setTimeFrozen(frozen) {
    if (this.isFrozen === frozen) return;
    this.isFrozen = frozen;

    if (this.isFrozen) {
      this.audio.playFreezeSound();
      this.stasisOverlay.classList.add('active');
      this.cursorEl.classList.add('freeze-mode');
      this.showGestureBanner('TEMPORAL STASIS ENGAGED');
    } else {
      this.stasisOverlay.classList.remove('active');
      this.cursorEl.classList.remove('freeze-mode');
    }
  }

  triggerShockwave(screenX, screenY) {
    if (!this.shockwaveLayer || this.reducedMotion) return;
    const ring = document.createElement('div');
    ring.className = 'shockwave-ring';
    ring.style.left = `${screenX}px`;
    ring.style.top = `${screenY}px`;
    ring.style.width = '140px';
    ring.style.height = '140px';

    this.shockwaveLayer.appendChild(ring);
    setTimeout(() => {
      if (ring.parentNode) ring.parentNode.removeChild(ring);
    }, 1300);
  }

  showGestureBanner(text) {
    if (!this.gestureBanner) return;
    this.gestureBannerText.textContent = text;
    this.gestureBanner.classList.remove('hidden');

    clearTimeout(this.bannerTimer);
    this.bannerTimer = setTimeout(() => {
      this.gestureBanner.classList.add('hidden');
    }, 2200);
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

  cycleMorph(direction = 1) {
    const now = performance.now();
    if (now - this.lastMorphTime < 1300) return;
    this.lastMorphTime = now;

    const keys = Object.keys(FORMATIONS);
    const currIdx = keys.indexOf(this.currentFormation);
    let nextIdx = (currIdx + direction) % keys.length;
    if (nextIdx < 0) nextIdx = keys.length - 1;

    this.applyFormation(keys[nextIdx], true);
  }

  /* --------------------------------------------------------------------------
     Cursor Coordinate Mapping
     -------------------------------------------------------------------------- */
  updateCursorPosition(screenX, screenY) {
    const alpha = 0.28 * (this.trackingSensitivity / 3);
    this.handPositionSmoothed.x += (screenX - this.handPositionSmoothed.x) * alpha;
    this.handPositionSmoothed.y += (screenY - this.handPositionSmoothed.y) * alpha;

    const smoothX = this.handPositionSmoothed.x;
    const smoothY = this.handPositionSmoothed.y;

    if (this.cursorEl) {
      this.cursorEl.classList.remove('hidden');
      this.cursorEl.style.transform = `translate3d(${smoothX}px, ${smoothY}px, 0)`;
      this.cursorEl.classList.toggle('pinch-mode', this.isPinching);
    }

    const ndcX = (smoothX / window.innerWidth) * 2 - 1;
    const ndcY = -(smoothY / window.innerHeight) * 2 + 1;

    const vector = new THREE.Vector3(ndcX, ndcY, 0.5);
    vector.unproject(this.camera);
    const dir = vector.sub(this.camera.position).normalize();
    const distance = -this.camera.position.z / dir.z;
    this.cursor3D.copy(this.camera.position).add(dir.multiplyScalar(distance));

    if (this.lightPoint) {
      this.lightPoint.position.copy(this.cursor3D);
      this.lightPoint.position.z += 2;
    }
  }

  /* --------------------------------------------------------------------------
     MediaPipe Computer Vision Hand Tracking & Dual-Hand HUD
     -------------------------------------------------------------------------- */
  async startCameraExperience() {
    this.audio.init();

    const loader = document.getElementById('landing-loader');
    if (loader) loader.classList.remove('hidden');

    this.camStatusText.textContent = 'CAM: INITIALIZING';
    this.camDot.className = 'badge-dot active';

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      this.handleCameraFailure('Browser does not support camera API');
      return;
    }

    try {
      if (typeof Hands === 'undefined') {
        throw new Error('MediaPipe Hands library not loaded');
      }

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
      this.camStatusText.textContent = 'CAM: ACTIVE';
      this.camDot.className = 'badge-dot live-cam';
      this.hudCameraState.textContent = 'ACTIVE STREAM';

      // Transition smoothly into universe
      this.landingScreen.classList.add('fade-out');
      this.appHud.classList.remove('hidden');
      this.showToast('Optical hand sensor linked. Move hands to interact.');
    } catch (err) {
      console.error('Sensor error:', err);
      this.handleCameraFailure(err.message || 'Camera permission denied.');
    }
  }

  handleCameraFailure(reason) {
    this.isCameraActive = false;
    this.isFallbackMouse = true;
    this.camStatusText.textContent = 'CAM: OFF';
    this.camDot.className = 'badge-dot';
    this.hudCameraState.textContent = 'OFFLINE (FALLBACK)';

    const troubleshoot = document.getElementById('permission-troubleshoot');
    if (troubleshoot) troubleshoot.classList.remove('hidden');

    this.cameraModal.classList.remove('hidden');
    this.showToast('Switched to Mouse/Touch mode. All features accessible.');
  }

  startMouseMode() {
    this.audio.init();
    this.isFallbackMouse = true;
    this.isCameraActive = false;
    this.landingScreen.classList.add('fade-out');
    this.appHud.classList.remove('hidden');
    this.cameraContainer.classList.add('minimized');

    this.camStatusText.textContent = 'CAM: OFF';
    this.camDot.className = 'badge-dot';
    this.trackStatusText.textContent = 'TRACKING: MOUSE';
    this.trackDot.className = 'badge-dot active';
    this.hudCameraState.textContent = 'MOUSE FALLBACK';

    this.showToast('AURA initialized in precision Mouse/Touch mode.');
  }

  /* --------------------------------------------------------------------------
     Live Hand Tracking Results & Gesture Recognition
     -------------------------------------------------------------------------- */
  onHandResults(results) {
    if (!this.skeletonCanvas) return;
    const canvas = this.skeletonCanvas;
    const ctx = this.skeletonCtx;
    canvas.width = this.webcamVideo.videoWidth || 320;
    canvas.height = this.webcamVideo.videoHeight || 240;

    // Draw Mirrored Video
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

    // Update Real-Time Dual-Hand Detection HUD
    let leftDetected = false;
    let rightDetected = false;

    if (results.multiHandedness && results.multiHandedness.length > 0) {
      results.multiHandedness.forEach(h => {
        // MediaPipe label: 'Left' or 'Right'
        const label = h.label;
        if (label === 'Left') leftDetected = true;
        if (label === 'Right') rightDetected = true;
      });
    }

    this.hudLeftHand.textContent = leftDetected ? 'DETECTED' : 'NOT DETECTED';
    this.hudLeftHand.classList.toggle('detected', leftDetected);

    this.hudRightHand.textContent = rightDetected ? 'DETECTED' : 'NOT DETECTED';
    this.hudRightHand.classList.toggle('detected', rightDetected);

    const handsCount = (results.multiHandLandmarks || []).length;

    if (handsCount === 0) {
      this.trackStatusText.textContent = 'TRACKING: NONE';
      this.trackDot.className = 'badge-dot';
      this.hudCurrentGesture.textContent = 'NONE';
      if (this.cameraOverlayMsg) this.cameraOverlayMsg.classList.remove('hidden');
      ctx.restore();
      return;
    }

    if (this.cameraOverlayMsg) this.cameraOverlayMsg.classList.add('hidden');
    this.trackStatusText.textContent = `TRACKING: ${handsCount} HAND${handsCount > 1 ? 'S' : ''}`;
    this.trackDot.className = 'badge-dot active';

    // Draw Skeleton on Primary Hand & Classify Gestures
    const primaryHand = results.multiHandLandmarks[0];
    this.drawHandSkeleton(ctx, primaryHand, canvas.width, canvas.height);
    ctx.restore();

    this.classifyHandGestures(primaryHand, results.multiHandLandmarks);
  }

  drawHandSkeleton(ctx, landmarks, width, height) {
    const connections = [
      [0, 1], [1, 2], [2, 3], [3, 4],
      [0, 5], [5, 6], [6, 7], [7, 8],
      [5, 9], [9, 10], [10, 11], [11, 12],
      [9, 13], [13, 14], [14, 15], [15, 16],
      [13, 17], [17, 18], [18, 19], [19, 20],
      [0, 17]
    ];

    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#d4af37';
    ctx.shadowColor = '#ffd700';
    ctx.shadowBlur = 6;

    connections.forEach(([i, j]) => {
      const p1 = landmarks[i];
      const p2 = landmarks[j];
      ctx.beginPath();
      ctx.moveTo(p1.x * width, p1.y * height);
      ctx.lineTo(p2.x * width, p2.y * height);
      ctx.stroke();
    });

    landmarks.forEach((lm, index) => {
      ctx.beginPath();
      ctx.arc(lm.x * width, lm.y * height, index === 8 ? 5 : 3, 0, 2 * Math.PI);
      ctx.fillStyle = index === 8 ? '#ffffff' : '#ffd700';
      ctx.shadowColor = '#d4af37';
      ctx.shadowBlur = 5;
      ctx.fill();
    });
  }

  classifyHandGestures(landmarks) {
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

    // Mirrored screen coordinate mapping
    const normX = this.cameraMirror ? (1 - indexTip.x) : indexTip.x;
    const screenX = normX * window.innerWidth;
    const screenY = indexTip.y * window.innerHeight;
    this.updateCursorPosition(screenX, screenY);

    // Extension state analysis
    const isIndexExtended = Math.hypot(indexTip.x - wrist.x, indexTip.y - wrist.y) > Math.hypot(indexPip.x - wrist.x, indexPip.y - wrist.y) * 1.15;
    const isMiddleExtended = Math.hypot(middleTip.x - wrist.x, middleTip.y - wrist.y) > Math.hypot(middlePip.x - wrist.x, middlePip.y - wrist.y) * 1.15;
    const isRingExtended = Math.hypot(ringTip.x - wrist.x, ringTip.y - wrist.y) > Math.hypot(ringPip.x - wrist.x, ringPip.y - wrist.y) * 1.15;
    const isPinkyExtended = Math.hypot(pinkyTip.x - wrist.x, pinkyTip.y - wrist.y) > Math.hypot(pinkyPip.x - wrist.x, pinkyPip.y - wrist.y) * 1.15;
    const isThumbExtended = Math.hypot(thumbTip.x - wrist.x, thumbTip.y - wrist.y) > handScale * 0.7;

    const pinchDist = Math.hypot(thumbTip.x - indexTip.x, thumbTip.y - indexTip.y) / handScale;
    const isPinching = pinchDist < 0.35;
    const isFist = !isIndexExtended && !isMiddleExtended && !isRingExtended && !isPinkyExtended;
    const isOpenPalm = isIndexExtended && isMiddleExtended && isRingExtended && isPinkyExtended && isThumbExtended;
    const isTwoFingers = isIndexExtended && isMiddleExtended && !isRingExtended && !isPinkyExtended;

    // Velocity swipe recognition on wrist
    this.wristVelocityHistory.push({ x: normX, time: performance.now() });
    if (this.wristVelocityHistory.length > 8) this.wristVelocityHistory.shift();

    let swipeTriggered = false;
    if (this.wristVelocityHistory.length >= 6) {
      const first = this.wristVelocityHistory[0];
      const last = this.wristVelocityHistory[this.wristVelocityHistory.length - 1];
      const dt = (last.time - first.time) / 1000;
      const dx = last.x - first.x;
      const vx = dx / (dt || 0.1);

      if (Math.abs(vx) > 1.8 && isOpenPalm) {
        if (vx > 0) {
          this.cycleMorph(1);
          this.showGestureBanner('SWIPE: NEXT REALM');
          swipeTriggered = true;
        } else {
          this.cycleMorph(-1);
          this.showGestureBanner('SWIPE: PREV REALM');
          swipeTriggered = true;
        }
        this.wristVelocityHistory = [];
      }
    }

    if (swipeTriggered) return;

    // Gesture State Dispatch
    if (isFist) {
      this.setTimeFrozen(true);
      this.activeGesture = 'fist';
      this.cursorLabel.textContent = 'STASIS';
      this.hudCurrentGesture.textContent = 'FIST (STASIS)';
    } else {
      this.setTimeFrozen(false);

      if (isPinching) {
        this.isPinching = true;
        this.pinchIntensity = Math.min(1.0, (0.35 - pinchDist) * 3.5 + 0.3);
        this.audio.playPinchHum(this.pinchIntensity);
        this.activeGesture = 'pinch';
        this.cursorLabel.textContent = 'ATTRACT';
        this.hudCurrentGesture.textContent = 'PINCH (ATTRACT)';
      } else {
        this.isPinching = false;

        if (isOpenPalm) {
          this.triggerSupernova();
          this.activeGesture = 'palm';
          this.cursorLabel.textContent = 'SUPERNOVA';
          this.hudCurrentGesture.textContent = 'OPEN PALM (SUPERNOVA)';
        } else if (isTwoFingers) {
          const deltaX = (indexTip.x - 0.5) * 0.05;
          const deltaY = (indexTip.y - 0.5) * 0.05;
          this.targetSceneRotation.y += deltaX * 0.8;
          this.targetSceneRotation.x += deltaY * 0.8;
          this.activeGesture = 'rotate';
          this.cursorLabel.textContent = 'ORBIT';
          this.hudCurrentGesture.textContent = 'TWO FINGERS (ORBIT)';
        } else {
          this.activeGesture = 'point';
          this.cursorLabel.textContent = 'POINTER';
          this.hudCurrentGesture.textContent = 'INDEX POINTER';
        }
      }
    }
  }

  /* --------------------------------------------------------------------------
     Mouse, Touch & Keyboard Interactions
     -------------------------------------------------------------------------- */
  setupMouseTouchHandlers() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      if (!this.isCameraActive || this.isFallbackMouse) {
        this.updateCursorPosition(e.clientX, e.clientY);
      }

      if (this.mouse.isDragging) {
        const dx = e.clientX - this.mouse.lastX;
        const dy = e.clientY - this.mouse.lastY;
        this.targetSceneRotation.y += dx * 0.005;
        this.targetSceneRotation.x += dy * 0.005;
        this.mouse.lastX = e.clientX;
        this.mouse.lastY = e.clientY;
      }
    });

    window.addEventListener('mousedown', (e) => {
      if (e.target.closest('button, .glass-panel, .modal-card, input, select')) return;
      this.audio.resume();

      if (e.button === 0) {
        // Left Click = Interaction Trigger
        if (this.currentInteraction === 'attract') {
          this.isPinching = true;
          this.audio.playPinchHum(0.8);
          this.cursorLabel.textContent = 'ATTRACT';
          this.hudCurrentGesture.textContent = 'CLICK (ATTRACT)';
        } else if (this.currentInteraction === 'repel') {
          this.cursorLabel.textContent = 'REPEL';
          this.hudCurrentGesture.textContent = 'CLICK (REPEL)';
        } else if (this.currentInteraction === 'freeze') {
          this.setTimeFrozen(!this.isFrozen);
        }
      } else if (e.button === 2) {
        // Right Click = Orbit Drag
        e.preventDefault();
        this.mouse.isDragging = true;
        this.mouse.lastX = e.clientX;
        this.mouse.lastY = e.clientY;
      }
    });

    window.addEventListener('mouseup', (e) => {
      if (e.button === 0 && this.currentInteraction === 'attract') {
        this.isPinching = false;
        this.cursorLabel.textContent = 'POINTER';
      } else if (e.button === 2) {
        this.mouse.isDragging = false;
      }
    });

    window.addEventListener('contextmenu', (e) => {
      if (!e.target.closest('input, select')) e.preventDefault();
    });

    // Touch Support
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        this.updateCursorPosition(touch.clientX, touch.clientY);

        if (e.touches.length === 2) {
          const dx = touch.clientX - this.mouse.lastX;
          const dy = touch.clientY - this.mouse.lastY;
          this.targetSceneRotation.y += dx * 0.006;
          this.targetSceneRotation.x += dy * 0.006;
        }
        this.mouse.lastX = touch.clientX;
        this.mouse.lastY = touch.clientY;
      }
    }, { passive: true });

    window.addEventListener('touchstart', (e) => {
      if (e.target.closest('button, .glass-panel, .modal-card, input, select')) return;
      this.audio.resume();
      if (e.touches.length === 1) {
        this.isPinching = true;
        this.mouse.lastX = e.touches[0].clientX;
        this.mouse.lastY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      this.isPinching = false;
    });
  }

  setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      if (e.target.closest('input, select')) return;

      const key = e.key.toUpperCase();
      // Formations: 1 to 5
      if (key === '1') this.applyFormation('heart');
      else if (key === '2') this.applyFormation('flower');
      else if (key === '3') this.applyFormation('saturn');
      else if (key === '4') this.applyFormation('galaxy');
      else if (key === '5') this.applyFormation('meditate');

      // Interactions
      else if (key === 'A') this.setInteraction('attract');
      else if (key === 'R') this.setInteraction('repel');
      else if (key === 'O') this.setInteraction('orbit');
      else if (key === 'F') this.setInteraction('freeze');

      // Colors
      else if (key === 'G') this.applyColorTheme('gold');
      else if (key === 'C') this.applyColorTheme('crimson');
      else if (key === 'I') this.applyColorTheme('ice');
      else if (key === 'U') this.applyColorTheme('aurora');

      // Supernova
      else if (e.code === 'Space') {
        e.preventDefault();
        this.triggerSupernova();
      }

      // Camera preview toggle
      else if (key === 'H') {
        this.cameraContainer.classList.toggle('minimized');
      }

      // Sound toggle
      else if (key === 'M') {
        const soundBtn = document.getElementById('btn-toggle-sound');
        if (soundBtn) soundBtn.click();
      }
    });
  }

  /* --------------------------------------------------------------------------
     DOM Buttons & Controls Setup
     -------------------------------------------------------------------------- */
  setupEventListeners() {
    // Startup Screen Buttons
    document.getElementById('btn-start-camera').addEventListener('click', () => {
      this.startCameraExperience();
    });
    document.getElementById('btn-start-mouse').addEventListener('click', () => {
      this.startMouseMode();
    });

    // Bottom Dock: MORPH Buttons
    document.querySelectorAll('[data-morph]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.applyFormation(btn.dataset.morph, true);
      });
    });

    // Bottom Dock: INTERACTION Buttons
    document.querySelectorAll('[data-interaction]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.setInteraction(btn.dataset.interaction);
      });
    });

    // Bottom Dock: COLOR Buttons
    document.querySelectorAll('[data-color]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.applyColorTheme(btn.dataset.color);
      });
    });

    // Sound Toggle Button
    const soundBtn = document.getElementById('btn-toggle-sound');
    const soundIcon = document.getElementById('sound-icon');
    soundBtn.addEventListener('click', () => {
      const enabled = this.audio.toggle();
      soundIcon.textContent = enabled ? '🔊' : '🔇';
      this.showToast(enabled ? 'Spatial Audio Active' : 'Spatial Audio Muted');
    });

    // Fullscreen Toggle Button
    const fullscreenBtn = document.getElementById('btn-fullscreen');
    fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });

    // Camera Preview Toggle Button
    document.getElementById('btn-toggle-camera-view').addEventListener('click', () => {
      this.cameraContainer.classList.toggle('minimized');
    });

    // Settings Modal
    const btnOpenSettings = document.getElementById('btn-open-settings');
    const btnCloseSettings = document.getElementById('btn-close-settings');
    const btnSaveSettings = document.getElementById('btn-save-settings');

    btnOpenSettings.addEventListener('click', () => {
      this.settingsModal.classList.remove('hidden');
    });
    btnCloseSettings.addEventListener('click', () => {
      this.settingsModal.classList.add('hidden');
    });
    btnSaveSettings.addEventListener('click', () => {
      this.applySettings();
      this.settingsModal.classList.add('hidden');
      this.showToast('Preferences Applied Successfully');
    });

    // Modal Fallback Buttons
    document.getElementById('btn-modal-fallback').addEventListener('click', () => {
      this.cameraModal.classList.add('hidden');
      this.startMouseMode();
    });
    document.getElementById('btn-modal-retry').addEventListener('click', () => {
      this.cameraModal.classList.add('hidden');
      this.startCameraExperience();
    });
  }

  applySettings() {
    const qualitySelect = document.getElementById('select-particle-quality');
    const sensitivityRange = document.getElementById('range-sensitivity');
    const camVisible = document.getElementById('toggle-camera-visible');
    const audioEnabled = document.getElementById('toggle-audio-enabled');
    const mirrorCam = document.getElementById('toggle-camera-mirror');
    const reducedMotionCheck = document.getElementById('toggle-reduced-motion');

    this.trackingSensitivity = parseInt(sensitivityRange.value, 10) || 3;
    this.cameraMirror = mirrorCam.checked;
    this.reducedMotion = reducedMotionCheck.checked;

    if (camVisible.checked) {
      this.cameraContainer.classList.remove('hidden');
    } else {
      this.cameraContainer.classList.add('hidden');
    }

    this.audio.toggle(audioEnabled.checked);
    document.getElementById('sound-icon').textContent = audioEnabled.checked ? '🔊' : '🔇';

    const counts = { low: 8000, medium: 16000, high: 24000, ultra: 36000 };
    const newCount = counts[qualitySelect.value] || 24000;
    if (newCount !== this.particleCount) {
      this.particleCount = newCount;
      if (this.particles) {
        this.scene.remove(this.particles);
        this.particles = null;
      }
      this.applyFormation(this.currentFormation, false);
    }
  }

  /* --------------------------------------------------------------------------
     Particle Physics & Dynamic Render Loop
     -------------------------------------------------------------------------- */
  updateParticles(dt) {
    if (!this.particles || !this.homePositions) return;

    const positions = this.particles.geometry.attributes.position.array;
    const time = this.clock.getElapsedTime();

    // 1. Smooth Morphing
    if (this.isMorphing && this.targetPositions) {
      this.morphProgress += dt * 1.8;
      const t = Math.min(1.0, this.morphProgress);

      for (let i = 0; i < this.particleCount * 3; i++) {
        positions[i] += (this.targetPositions[i] - positions[i]) * 0.12;
      }

      if (t >= 1.0) {
        this.isMorphing = false;
      }
    }

    // 2. Time Stasis Freeze
    if (this.isFrozen) {
      for (let i = 0; i < this.particleCount; i++) {
        const i3 = i * 3;
        positions[i3] += (Math.random() - 0.5) * 0.012;
        positions[i3 + 1] += (Math.random() - 0.5) * 0.012;
        positions[i3 + 2] += (Math.random() - 0.5) * 0.012;
      }
      this.particles.geometry.attributes.position.needsUpdate = true;
      return;
    }

    // 3. Dynamic Physics Interactions
    const cursor = this.cursor3D;
    const interaction = this.currentInteraction;
    const formation = this.currentFormation;

    const isAttract = this.isPinching || interaction === 'attract';
    const isRepel = interaction === 'repel';
    const isOrbit = interaction === 'orbit';

    const radius = isAttract ? 34.0 : 16.0;
    const returnSpeed = 0.038;

    // Formation-specific heartbeat pulsation for Heart
    const heartPulse = formation === 'heart' ? 1.0 + Math.sin(time * 6.0) * 0.04 : 1.0;

    for (let i = 0; i < this.particleCount; i++) {
      const i3 = i * 3;
      const phase = this.phases[i];

      let px = positions[i3];
      let py = positions[i3 + 1];
      let pz = positions[i3 + 2];

      let hx = this.homePositions[i3] * heartPulse;
      let hy = this.homePositions[i3 + 1] * heartPulse;
      let hz = this.homePositions[i3 + 2] * heartPulse;

      // Galaxy swirl dynamic drift
      if (formation === 'galaxy') {
        const r = Math.hypot(hx, hz) || 1;
        const speed = (0.16 / Math.sqrt(r)) * dt;
        const cos = Math.cos(speed);
        const sin = Math.sin(speed);
        const newHx = hx * cos - hz * sin;
        const newHz = hx * sin + hz * cos;
        this.homePositions[i3] = newHx;
        this.homePositions[i3 + 2] = newHz;
        hx = newHx;
        hz = newHz;
      }

      // Hand Cursor Interaction
      const dx = cursor.x - px;
      const dy = cursor.y - py;
      const dz = cursor.z - pz;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) + 0.1;

      if (dist < radius) {
        const factor = (1.0 - dist / radius);

        if (isAttract) {
          // Singularity gravitational pull
          const pull = factor * 22.0 * dt;
          this.velocities[i3] += (dx / dist) * pull;
          this.velocities[i3 + 1] += (dy / dist) * pull;
          this.velocities[i3 + 2] += (dz / dist) * pull;
        } else if (isRepel) {
          // Repulsion deflection field
          const push = factor * 26.0 * dt;
          this.velocities[i3] -= (dx / dist) * push;
          this.velocities[i3 + 1] -= (dy / dist) * push;
          this.velocities[i3 + 2] -= (dz / dist) * push;
        } else if (isOrbit) {
          // Rotational vortex around cursor
          const spin = factor * 30.0 * dt;
          this.velocities[i3] += (-dz / dist) * spin;
          this.velocities[i3 + 2] += (dx / dist) * spin;
        } else {
          // Subtle guiding light beacon push
          const push = factor * 6.0 * dt;
          this.velocities[i3] -= (dx / dist) * push;
          this.velocities[i3 + 1] -= (dy / dist) * push;
          this.velocities[i3 + 2] -= (dz / dist) * push;
        }
      }

      // Elastic return to formation shape
      this.velocities[i3] += (hx - px) * returnSpeed;
      this.velocities[i3 + 1] += (hy - py) * returnSpeed;
      this.velocities[i3 + 2] += (hz - pz) * returnSpeed;

      // Damping
      this.velocities[i3] *= 0.91;
      this.velocities[i3 + 1] *= 0.91;
      this.velocities[i3 + 2] *= 0.91;

      // Apply Velocity
      positions[i3] += this.velocities[i3] * dt * 30.0;
      positions[i3 + 1] += this.velocities[i3 + 1] * dt * 30.0;
      positions[i3 + 2] += this.velocities[i3 + 2] * dt * 30.0;
    }

    this.particles.geometry.attributes.position.needsUpdate = true;
  }

  /* --------------------------------------------------------------------------
     Main Render Loop
     -------------------------------------------------------------------------- */
  animate() {
    requestAnimationFrame(() => this.animate());

    const dt = Math.min(this.clock.getDelta(), 0.1);

    // FPS Meter
    this.fpsFrames++;
    const now = performance.now();
    if (now - this.fpsLastTime >= 1000) {
      if (this.fpsCounter) {
        this.fpsCounter.textContent = `${this.fpsFrames} FPS`;
      }
      this.fpsFrames = 0;
      this.fpsLastTime = now;
    }

    // Update Particles
    this.updateParticles(dt);

    // Universe Orbit Rotation
    this.sceneRotation.x += (this.targetSceneRotation.x - this.sceneRotation.x) * 0.08;
    this.sceneRotation.y += (this.targetSceneRotation.y - this.sceneRotation.y) * 0.08;

    if (this.particles) {
      this.particles.rotation.x = this.sceneRotation.x;
      this.particles.rotation.y = this.sceneRotation.y;
    }

    // Subtle luxury camera parallax
    if (!this.reducedMotion) {
      const targetCamX = (this.handPositionSmoothed.x / window.innerWidth - 0.5) * 5;
      const targetCamY = -(this.handPositionSmoothed.y / window.innerHeight - 0.5) * 3.5;
      this.camera.position.x += (targetCamX - this.camera.position.x) * 0.04;
      this.camera.position.y += (targetCamY - this.camera.position.y) * 0.04;
      this.camera.lookAt(0, 0, 0);
    }

    this.renderer.render(this.scene, this.camera);
  }
}

/* ============================================================================
   6. BOOTSTRAP
   ============================================================================ */
window.addEventListener('DOMContentLoaded', () => {
  window.auraApp = new AuraEngine();
});
