# SOLAR COMMAND — Gesture-Controlled 3D Solar System

> **"CONTROL THE SOLAR SYSTEM WITH YOUR HANDS — NOW WITH PHOTOREALISTIC PLANETS & ADVANCED MOBILE HUD"**

A spatial-computing interactive 3D Solar System web application controlled via device camera and natural hand/finger gestures with Google MediaPipe Hands, Three.js WebGL, authentic NASA visible-light planetary textures, and a professional mobile command HUD.

---

## ✦ System Architecture & Visual Style

- **Deep Space Environment**: Pitch black space (`#000003`) populated by 4,500 distant twinkling stars and cosmic dust up to 3,000 units deep.
- **Futuristic Command Interface**: Razor-thin HUD lines, crimson accents (`#ff1744`), glassmorphism telemetry cards, and dynamic targeting reticles.
- **Holographic Hand Skeleton Overlay**: Transparent canvas layer projecting real-time vector bones and laser joints directly on top of the 3D celestial bodies.
- **Photorealistic Offline Procedural Textures**: High-resolution (1024×512) canvas procedural generation for the Sun, 8 planets, and Earth's Moon with authentic visible-light colors, impact craters, and atmospheric bands.
- **High-Performance 3D Engine**: Three.js WebGL rendering at a locked 60 FPS with 600 instanced asteroids.

---

## 🪐 Celestial Bodies & True Astronomical Data

| Celestial Body | Classification | Radius | Moons | True Colors & Notable Features |
| :--- | :--- | :--- | :--- | :--- |
| **SOL (Sun)** ☀️ | Type G2V Yellow Dwarf | 7.0 | — | Granulation photosphere, bipolar sunspots with umbra/penumbra, pulsating corona sprite |
| **Mercury** ☿ | Terrestrial | 0.9 | 0 | Basaltic grey-brown crust (`#726d67`), Caloris Basin multi-ring, ray craters (Kuiper, Hokusai) |
| **Venus** ♀ | Terrestrial (Inferno) | 1.4 | 0 | Pale sulfuric acid cream (`#f8f1e4`), horizontal chevron absorption bands, polar hoods |
| **Earth** 🌍 | Terrestrial (Habitable) | 1.5 | 1 | Sapphire blue oceans, realistic continents, biomes (deserts, rainforests), mountain snow, night city lights |
| **The Moon** 🌙 | Natural Satellite | 0.44 | — | Basaltic maria (Sea of Tranquility), Tycho impact crater rays, 3D orbit around Earth |
| **Mars** ♂ | Terrestrial (Red Planet) | 1.1 | 2 | Butterscotch rust (`#be5332`), Syrtis Major plateau, Olympus Mons caldera, Valles Marineris rift, polar ice |
| **Jupiter** ♃ | Gas Giant (Jovian) | 3.8 | 95 | Banded zonal circulation, shear wave turbulence, Great Red Spot with internal eye, white ovals |
| **Saturn** ♄ | Gas Giant (Ringed) | 3.2 | 146 | Golden butterscotch bands, polar hexagon, photometric rings with transparent Cassini Division gap |
| **Uranus** ♅ | Ice Giant | 2.2 | 28 | Authentic methane cyan-aquamarine (`#a5ebe5`), 97.8° retro-tilt, subtle summer polar collar |
| **Neptune** ♆ | Ice Giant | 2.1 | 16 | Deep cobalt azure blue (`#2b58b4`), supersonic Great Dark Spot, high-altitude white cirrus clouds |

---

## 📱 Professional Mobile UI & Command Controls

1. **Quick Controls Subbar**:
   - **View Modes**: `🌐 OVERVIEW` (3D system view), `🔭 ORRERY` (top-down planar map), `☀️ SOL` (star close-up).
   - **Orbital Warp Speed**: Real-time simulation multiplier (`0.5×`, `1.0×`, `2.0×`, `5.0×`, or `⏸ PAUSE`).
2. **Mobile Bottom Sheet**:
   - Ergonomic slide-up bottom drawer with drag handle for touch minimize/expand.
   - Prev (`◀`) and Next (`▶`) celestial navigation buttons for instant body switching.
   - Dedicated mobile Dossier button (`📋`) in the bottom dock.
3. **Real-Color Planet Swatches**:
   - Every planet pill displays an authentic NASA-calibrated color indicator dot.
4. **Haptic Vibration Feedback**:
   - Tactile clicks via `navigator.vibrate` on zoom, planet selection, and mode changes.
5. **4-Tab Telemetry Console**:
   - `[SPECS]`: Diameter, distance, mass, surface gravity, escape velocity, orbital/rotational periods.
   - `[ATMOSPHERE]`: Pressure, temperature range, and animated gas breakdown meters.
   - `[AI INTEL]`: Deep neural reconnaissance on planetary geology, magnetosphere, and biosphere status.
   - `[MISSIONS]`: Landmark historical probes and rovers (Apollo 11, Artemis, Curiosity, Perseverance, Cassini, Voyager, Parker Solar Probe).

---

## 🖐️ Gesture Command Reference

| Gesture | Pose | Action |
| :--- | :--- | :--- |
| **Point** ☝️ | Index extended, other fingers folded | Moves virtual targeting crosshair. Hovering over a planet highlights it with targeting brackets and name tag. |
| **Pinch** 🤏 | Thumb tip + index fingertip close | Locks onto & grabs targeted planet; or pans the Solar System scene in 3D. |
| **Pinch + Distance** ↔️ | Spreading / closing pinched fingers | Smoothly zooms camera in or out within bounded limits (`18` to `260` units). |
| **Open Palm** ✋ | All 5 fingers extended | **PAUSES** the orbital simulation. Resume smoothly on release. |
| **Swipe** 👋 | Rapid horizontal hand wave | Rotates the Solar System view horizontally with momentum and damping. |
| **Two Fingers** ✌️ | Index + middle extended, ring + pinky folded | Enters **ORBIT INSPECT** mode, locking the camera onto the selected planet with manual orbital rotation. |
| **Fist** ✊ | All fingers folded | **SYSTEM RESET**: Smoothly animates camera, zoom, rotation, and selection back to default overview. |

---

## 🚀 Quickstart

Run with any static local HTTP server:
```bash
python -m http.server 8080
```
Open **[http://localhost:8080](http://localhost:8080)** in Chrome, Edge, or Safari on desktop or mobile.

