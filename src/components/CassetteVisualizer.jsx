import React from 'react';
import { Disc, Radio, Sparkles } from 'lucide-react';

export default function CassetteVisualizer({ currentSong, isPlaying, currentTime, duration }) {
  const percent = duration > 0 ? (currentTime / duration) * 100 : 0;
  // Left spool gets smaller, right spool gets bigger as tape plays
  const leftSpoolRadius = 38 - (percent * 0.18);
  const rightSpoolRadius = 20 + (percent * 0.18);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative w-full max-w-md mx-auto aspect-[16/10] select-none">
      
      {/* Outer Cassette Body (Smoky Transparent Dark Acrylic) */}
      <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-[#1c1c2b]/90 to-[#0e0e1a]/95 border-2 border-white/15 p-4 shadow-2xl flex flex-col justify-between overflow-hidden">
        
        {/* Subtle screw studs at 4 corners */}
        <div className="absolute top-2 left-2 w-2.5 h-2.5 rounded-full bg-slate-600/80 border border-slate-400/40 flex items-center justify-center">
          <div className="w-1.5 h-0.5 bg-slate-300"></div>
        </div>
        <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-slate-600/80 border border-slate-400/40 flex items-center justify-center">
          <div className="w-1.5 h-0.5 bg-slate-300"></div>
        </div>
        <div className="absolute bottom-2 left-2 w-2.5 h-2.5 rounded-full bg-slate-600/80 border border-slate-400/40 flex items-center justify-center">
          <div className="w-1.5 h-0.5 bg-slate-300"></div>
        </div>
        <div className="absolute bottom-2 right-2 w-2.5 h-2.5 rounded-full bg-slate-600/80 border border-slate-400/40 flex items-center justify-center">
          <div className="w-1.5 h-0.5 bg-slate-300"></div>
        </div>

        {/* Top Section - Brand Sticker Label */}
        <div className="relative z-10 bg-gradient-to-r from-fuchsia-950/80 via-purple-900/80 to-slate-900/90 rounded-lg p-2.5 border border-white/10 shadow-inner flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase bg-pink-500 text-white rounded">
              SIDE A
            </span>
            <span className="font-mono text-xs font-semibold text-pink-200 tracking-wider">
              NIGHTLY AUDIO CORP.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-slate-400">EQ: 70µs</span>
            <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-slate-600'}`}></div>
          </div>
        </div>

        {/* Handwritten Track Name */}
        <div className="relative z-10 px-2 text-center my-0.5">
          <p className="font-syne text-sm sm:text-base font-bold text-white tracking-wide truncate">
            {currentSong ? `"${currentSong.title}"` : 'night, love you.'}
          </p>
          <p className="text-[10px] font-mono text-pink-300/80 uppercase tracking-widest truncate">
            {currentSong ? `${currentSong.album} (${currentSong.year})` : 'Nashville, TN'}
          </p>
        </div>

        {/* Center Transparent Cassette Window with Tape Spools */}
        <div className="relative w-full h-24 sm:h-28 bg-[#090912]/90 rounded-xl border border-white/10 p-2 flex items-center justify-between overflow-hidden shadow-inner">
          
          {/* Tape Measure Scale in center */}
          <div className="absolute inset-x-12 top-1/2 -translate-y-1/2 flex justify-between items-center px-4 pointer-events-none opacity-40">
            <div className="w-full h-0.5 bg-slate-600 relative">
              <div className="absolute left-1/4 -top-1 w-0.5 h-2.5 bg-slate-400"></div>
              <div className="absolute left-1/2 -top-1 w-0.5 h-2.5 bg-slate-400"></div>
              <div className="absolute left-3/4 -top-1 w-0.5 h-2.5 bg-slate-400"></div>
            </div>
          </div>

          {/* Left Tape Spool */}
          <div className="relative z-10 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20">
            {/* Magnetic Tape Roll on Spool */}
            <div 
              className="absolute rounded-full bg-gradient-to-tr from-[#38201a] to-[#593026] border border-amber-950/60 shadow-lg transition-all duration-300"
              style={{ width: `${leftSpoolRadius * 2}px`, height: `${leftSpoolRadius * 2}px` }}
            ></div>

            {/* Rotating Plastic Cog Gear */}
            <div 
              className={`relative z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 border-2 border-slate-300 shadow-md flex items-center justify-center ${
                isPlaying ? 'animate-spin-slow' : 'paused'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-slate-900 flex items-center justify-center">
                <div className="w-2 h-2 rounded bg-white"></div>
              </div>
              {/* Spoke Teeth */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-1 bg-slate-400/80"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center rotate-60">
                <div className="w-full h-1 bg-slate-400/80"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center -rotate-60">
                <div className="w-full h-1 bg-slate-400/80"></div>
              </div>
            </div>
          </div>

          {/* Center Tape Counter & VU Indicator */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="px-2 py-0.5 rounded bg-black/80 border border-white/20 text-[10px] font-mono font-bold text-pink-400 shadow-inner">
              {formatTime(currentTime)}
            </div>
            <div className="flex gap-1 mt-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-emerald-400 animate-ping' : 'bg-slate-700'}`}></span>
              <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-pink-500 animate-pulse' : 'bg-slate-700'}`}></span>
            </div>
          </div>

          {/* Right Tape Spool */}
          <div className="relative z-10 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20">
            {/* Magnetic Tape Roll on Spool */}
            <div 
              className="absolute rounded-full bg-gradient-to-tr from-[#38201a] to-[#593026] border border-amber-950/60 shadow-lg transition-all duration-300"
              style={{ width: `${rightSpoolRadius * 2}px`, height: `${rightSpoolRadius * 2}px` }}
            ></div>

            {/* Rotating Plastic Cog Gear */}
            <div 
              className={`relative z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 border-2 border-slate-300 shadow-md flex items-center justify-center ${
                isPlaying ? 'animate-spin-slow' : 'paused'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-slate-900 flex items-center justify-center">
                <div className="w-2 h-2 rounded bg-white"></div>
              </div>
              {/* Spoke Teeth */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-1 bg-slate-400/80"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center rotate-60">
                <div className="w-full h-1 bg-slate-400/80"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center -rotate-60">
                <div className="w-full h-1 bg-slate-400/80"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trapezoid Cassette Base */}
        <div className="relative z-10 mt-1 flex items-center justify-between px-6 py-1 bg-slate-900/90 rounded-md border-t border-white/10 text-[9px] font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
            <span>TYPE II CHROME</span>
          </div>
          <span className="text-pink-300 font-semibold tracking-wider">NR ON [●]</span>
          <span>HIGH BIAS</span>
        </div>

      </div>
    </div>
  );
}
