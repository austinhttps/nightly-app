import React, { useState } from 'react';
import { 
  CloudRain, 
  Disc, 
  Car, 
  Sliders, 
  Radio, 
  Sparkles, 
  Music, 
  Piano, 
  Volume2, 
  Zap,
  Flame
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function NightStudio() {
  const [ambientLevels, setAmbientLevels] = useState({
    rain: 0,
    vinyl: 0,
    carCabin: 0
  });

  const [activeKey, setActiveKey] = useState(null);
  const [activeDrum, setActiveDrum] = useState(null);

  const handleAmbientChange = (type, val) => {
    setAmbientLevels(prev => ({ ...prev, [type]: val }));
    audioEngine.setAmbientLevel(type, val);
  };

  const synthKeys = [
    { note: 'C4', label: 'C', freq: 261.63, keyBinding: 'A', color: 'from-pink-500 to-rose-600' },
    { note: 'D4', label: 'D', freq: 293.66, keyBinding: 'S', color: 'from-fuchsia-500 to-pink-600' },
    { note: 'E4', label: 'E', freq: 329.63, keyBinding: 'D', color: 'from-purple-500 to-fuchsia-600' },
    { note: 'F#4', label: 'F#', freq: 369.99, keyBinding: 'F', color: 'from-violet-500 to-purple-600' },
    { note: 'G4', label: 'G', freq: 392.00, keyBinding: 'G', color: 'from-indigo-500 to-violet-600' },
    { note: 'A4', label: 'A', freq: 440.00, keyBinding: 'H', color: 'from-blue-500 to-indigo-600' },
    { note: 'B4', label: 'B', freq: 493.88, keyBinding: 'J', color: 'from-cyan-500 to-blue-600' },
    { note: 'C5', label: 'C5', freq: 523.25, keyBinding: 'K', color: 'from-emerald-500 to-teal-600' },
  ];

  const drumPads = [
    { id: 'kick', label: 'Midnight Kick', icon: '🥁', color: 'bg-rose-500/20 border-rose-500/40 text-rose-300' },
    { id: 'snare', label: 'Pop Snare', icon: '💥', color: 'bg-purple-500/20 border-purple-500/40 text-purple-300' },
    { id: 'hihat', label: 'Crisp Hat', icon: '✨', color: 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300' },
  ];

  const triggerKey = (key) => {
    setActiveKey(key.note);
    audioEngine.playFanNote(key.freq);
    setTimeout(() => setActiveKey(null), 200);
  };

  const triggerDrum = (drum) => {
    setActiveDrum(drum.id);
    audioEngine.playFanDrum(drum.id);
    setTimeout(() => setActiveDrum(null), 150);
  };

  return (
    <section id="studio" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          Interactive Soundboard
        </div>
        <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          nightly studio & ambient mixer<span className="text-pink-500">.</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Craft your own midnight atmosphere by blending ambient noise layers and jamming along on dream-pop synth keys.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Ambient Layer Mixer */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <Sliders className="w-5 h-5 text-pink-400" />
              <h3 className="font-syne text-xl font-bold text-white">Atmosphere Mixer</h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              Layer with music
            </span>
          </div>

          {/* Rain Sound Slider */}
          <div className="space-y-2 p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white flex items-center gap-2">
                <CloudRain className="w-4 h-4 text-cyan-400" />
                Midnight Rain on Car Glass
              </span>
              <span className="text-xs font-mono text-cyan-300">
                {Math.round(ambientLevels.rain * 100)}%
              </span>
            </div>
            <input 
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={ambientLevels.rain}
              onChange={(e) => handleAmbientChange('rain', parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          {/* Vinyl Crackle Slider */}
          <div className="space-y-2 p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white flex items-center gap-2">
                <Disc className="w-4 h-4 text-amber-400" />
                Analog Vinyl Needle Dust
              </span>
              <span className="text-xs font-mono text-amber-300">
                {Math.round(ambientLevels.vinyl * 100)}%
              </span>
            </div>
            <input 
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={ambientLevels.vinyl}
              onChange={(e) => handleAmbientChange('vinyl', parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
          </div>

          {/* Highway Rumble Slider */}
          <div className="space-y-2 p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white flex items-center gap-2">
                <Car className="w-4 h-4 text-pink-400" />
                2AM Highway Cabin Rumble
              </span>
              <span className="text-xs font-mono text-pink-300">
                {Math.round(ambientLevels.carCabin * 100)}%
              </span>
            </div>
            <input 
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={ambientLevels.carCabin}
              onChange={(e) => handleAmbientChange('carCabin', parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
            />
          </div>

          <p className="text-xs text-slate-400 italic">
            * Tip: Turn on the Rain + Highway Rumble while playing "hate my favorite band" for an immersive 2AM drive feeling.
          </p>
        </div>

        {/* Right Column: Jam Along Keyboard & Drum Pads */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <Piano className="w-5 h-5 text-purple-400" />
              <h3 className="font-syne text-xl font-bold text-white">Dream-Pop Synth Jam Pad</h3>
            </div>
            <span className="text-[10px] font-mono text-pink-400 font-bold bg-pink-500/10 px-2.5 py-1 rounded-full border border-pink-500/20">
              CLICK OR TAP TO PLAY
            </span>
          </div>

          {/* Interactive Keyboard Keys */}
          <div>
            <span className="text-xs font-mono uppercase text-slate-400 mb-3 block">
              Synth Keyboard (Nashville Tuning)
            </span>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {synthKeys.map((k) => (
                <button
                  key={k.note}
                  onClick={() => triggerKey(k)}
                  className={`relative aspect-[1/2] rounded-xl flex flex-col justify-between p-2.5 text-center transition-all cursor-pointer select-none active:scale-95 ${
                    activeKey === k.note
                      ? `bg-gradient-to-t ${k.color} text-white shadow-[0_0_20px_rgba(236,72,153,0.8)] scale-95`
                      : 'bg-white/10 hover:bg-white/20 border border-white/10 text-slate-200'
                  }`}
                >
                  <span className="text-xs font-mono text-slate-400">{k.keyBinding}</span>
                  <span className="font-syne text-sm font-extrabold">{k.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Drum Trigger Pads */}
          <div className="pt-2">
            <span className="text-xs font-mono uppercase text-slate-400 mb-3 block">
              Percussion Stems
            </span>
            <div className="grid grid-cols-3 gap-3">
              {drumPads.map((drum) => (
                <button
                  key={drum.id}
                  onClick={() => triggerDrum(drum)}
                  className={`p-4 rounded-2xl border text-center transition-all cursor-pointer select-none active:scale-95 flex flex-col items-center gap-1.5 ${
                    activeDrum === drum.id
                      ? 'bg-pink-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.8)] scale-95'
                      : `${drum.color} hover:bg-white/10`
                  }`}
                >
                  <span className="text-2xl">{drum.icon}</span>
                  <span className="font-syne text-xs font-bold">{drum.label}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
