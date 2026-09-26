# ⚾ nightly. — The Vinyl Experience & Discography Hub

A single-page, atmospheric music player celebrating the discography of alt-pop band **Nightly**. Featuring an interactive 33⅓ RPM vinyl turntable, stadium floodlight aesthetics inspired by their album *BASEBALL IN AMERICA*, dynamic ambient glow themes, and full track playback across their catalog.

![nightly vinyl player](https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1200&q=80)

---

## ✨ Features

- **🎛️ Realistic 33⅓ RPM Vinyl Turntable**:
  - Rotating vinyl with reflective grooves, custom center labels showing active album artwork, and real-time playback state animation.
  - Interactive tonearm needle drop & lift mechanism on play/pause.
  - Scrubbable timeline seeker with elapsed/total timecode display.
  - Full playback controls: Play/Pause, Next/Previous, Shuffle, Repeat (Loop), and Volume/Mute controls.

- **🏟️ Faint Night Baseball Diamond Aesthetic**:
  - Ambient stadium floodlights with glowing light beams illuminating home plate, base paths, and pitching mound inspired by *BASEBALL IN AMERICA*.
  - Starfield particle canopy.

- **🎨 Multi-Glow Theme Engine**:
  - Switchable ambient glow palettes:
    - **Stadium Turf Green** (`#10b981`)
    - **Floodlight Gold** (`#f59e0b`)
    - **Midnight Violet** (`#a855f7`)
    - **Electric Pink** (`#ec4899`)
    - **Cyber Blue** (`#06b6d4`)

- **🎵 Complete Discography & Tracklist Browser**:
  - Grouped by album with collapsible accordions:
    - *BASEBALL IN AMERICA (2026)*
    - *THE VOID (2025)*
    - *songs to drive to (2025)*
    - *wear your heart out (2023)*
    - *night, love you. (2020)*
    - *Singles & Features* (including *"Miss When You Missed Me"*, *"i wish you loved me"*, *"hate my favorite band"*, etc.)
  - Real-time animated audio equalizer bars on currently playing tracks.
  - Direct Spotify deep links for each track.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Audio Engine**: HTML5 Audio API with custom event dispatcher
- **Typography**: [Syne](https://fonts.google.com/specimen/Syne) & [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/austinhttps/nightly-app.git
   cd nightly-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```
   The production-ready assets will be generated in the `dist/` directory.

---

## 📂 Project Structure

```
nightly-app/
├── public/
│   ├── audio/              # Master audio files for discography playback
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── BaseballFieldBackground.jsx  # Night baseball field & stadium lights
│   │   ├── Footer.jsx                   # Minimal footer signoff
│   │   ├── Navbar.jsx                   # Logo & theme selector palette
│   │   ├── VinylPlayerHub.jsx           # Main turntable stage & tracklist browser
│   │   └── VinylVisualizer.jsx          # 33⅓ RPM vinyl turntable & tonearm
│   ├── data/
│   │   └── songsData.js                 # Complete album & song catalog metadata
│   ├── utils/
│   │   └── audioEngine.js               # Audio playback controller & listeners
│   ├── App.jsx                          # App state & layout orchestration
│   ├── index.css                        # Tailwind v4 directives & custom glow styles
│   └── main.jsx                         # Application entrypoint
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🖤 Credits & Dedication

Music and artwork inspired by the band **Nightly**.  
*night, love you.*
