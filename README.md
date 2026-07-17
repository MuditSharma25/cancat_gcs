# CANSAT-7 // Ground Control System

A professional, mission-control-style Ground Control Software (GCS) dashboard built for a CanSat mission simulation. Styled after NASA/ISRO mission control interfaces — dark aerospace theme, glassmorphism panels, glowing telemetry, live charts, GPS map tracking, a 3D orientation cube, and a simulated webcam video feed.

Everything runs client-side with **simulated telemetry** — no backend or hardware link required.

## Tech Stack

- React 19 + Vite
- Tailwind CSS 3
- Chart.js + react-chartjs-2 (live scrolling telemetry graphs)
- React-Leaflet + OpenStreetMap (GPS tracking map)
- Three.js (rotating 3D orientation cube)
- Framer Motion (micro-interactions)
- Lucide Icons

## Getting Started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

To build a production bundle:

```bash
npm run build
npm run preview
```

## Folder Structure

```
cansat-gcs/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── public/
│   ├── favicon.svg
│   └── icons.svg
└── src/
    ├── main.jsx
    ├── App.jsx                   # Assembles the full dashboard layout
    ├── index.css                 # Aerospace theme, glassmorphism, animations
    ├── hooks/
    │   └── useTelemetry.js       # Simulated telemetry engine + mission actions
    ├── utils/
    │   └── exportGraph.js        # Combines chart canvases into one PNG export
    └── components/
        ├── TopBar.jsx             # Controls, mission clock, packet count, link status
        ├── Sidebar.jsx            # Flight phase timeline + system health bars
        ├── TelemetryCard.jsx      # Reusable animated telemetry value card
        ├── MissionControl.jsx     # Manual Separation / Emergency Parachute / Redundant
        ├── ErrorCode.jsx          # 4-digit mission error/status code
        ├── Graphs.jsx             # Live scrolling Chart.js graphs (last 30s)
        ├── TrackingMap.jsx        # React-Leaflet live GPS position + travelled path
        ├── Orientation.jsx        # Three.js rotating cube driven by roll/pitch/yaw
        ├── VideoFeed.jsx          # Browser webcam feed (Start/Stop Camera)
        └── ExportPanel.jsx        # CSV/PNG export, reset, log download, event log
```

## Features

**Top Control Bar** — Start/Stop Telemetry, Export CSV, Export Graph (PNG), Sync PC Time, Reset Packets, plus live Mission Time, Packet Count, and Connection Status.

**Mission Control Panel** — Manual Separation, Emergency Parachute, and Redundant Activation commands with live execution status (`Mission Status`, `Parachute`, `Separation`, `Redundant Sys`).

**Live Telemetry** — Altitude, Pressure, Temperature, Humidity, Battery Voltage, GPS Latitude/Longitude, Speed, Heading, Mission Time, Packet Number, and RSSI, each animating on update.

**4-Digit Error Code** — `[Descent Rate][GPS][Payload Separation][Emergency Parachute]`, color-coded green/orange/red and automatically derived from live telemetry.

**Real-Time Charts** — Altitude, Pressure, Temperature, Battery Voltage, and Descent Rate, continuously scrolling with a rolling 30-second window.

**GPS Tracking Map** — React-Leaflet map with a glowing satellite marker, live position, and a polyline of the travelled path.

**Orientation Panel** — A Three.js cube rotated in real time by simulated Roll, Pitch, and Yaw values.

**Live Video Feed** — Start/Stop the browser webcam with a live status indicator.

**Data Export** — Export CSV (full telemetry log), Export Graph PNG (combined chart snapshot), Reset Telemetry, and Download Logs (mission event log as `.txt`).

## Simulated Telemetry Engine

`src/hooks/useTelemetry.js` runs a lightweight flight-phase state machine (`PRELAUNCH → ASCENT → DESCENT → LANDED`) that derives every value from the current simulated altitude and mission time each second:

- Altitude follows an ascent/apogee/descent profile toward a ~950 m apogee.
- Pressure is derived from altitude using the barometric formula.
- Temperature and humidity fall with altitude (with realistic noise).
- Battery voltage drains slowly over the mission.
- GPS coordinates drift with a simulated wind random-walk, with occasional simulated fix dropouts.
- RSSI weakens with altitude/distance.
- Roll/Pitch/Yaw "tumble" more aggressively during freefall than under parachute.
- The parachute auto-deploys near 600 m if not triggered manually, and the error code reacts live to descent rate, GPS lock, separation, and parachute state.

All parameters are runtime-derived (no fixed/static test data), so every run produces a slightly different, physically plausible mission.

## Notes

- No backend, database, or hardware radio link is required — this is a fully self-contained simulation for demonstration and academic (viva) presentation purposes.
- The Live Video Feed requires camera permission from the browser; it is not part of the telemetry simulation.
- Map tiles are loaded from the public OpenStreetMap tile server, which requires an internet connection.
