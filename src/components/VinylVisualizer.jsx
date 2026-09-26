import React from 'react';
import { Play, Pause } from 'lucide-react';

export default function VinylVisualizer({ currentSong, isPlaying, togglePlay }) {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-square select-none flex items-center justify-center">
      
      {/* Turntable Platter Base */}
      <div 
        className="relative w-full h-full rounded-3xl bg-gradient-to-b from-[#131728] via-[#0d101e] to-[#070913] border-2 border-white/10 p-5 shadow-2xl flex items-center justify-center overflow-hidden transition-all duration-700"
        style={{
          boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8), 0 0 30px -10px var(--theme-glow, rgba(16, 185, 129, 0.4))'
        }}
      >
        
        {/* Subtle Strobe Dots around platter edge */}
        <div className="absolute inset-4 rounded-full border border-white/5 pointer-events-none"></div>

        {/* The Rotating Vinyl Record */}
        <div 
          className={`relative w-[84%] h-[84%] rounded-full shadow-[0_0_60px_rgba(0,0,0,0.9)] flex items-center justify-center cursor-pointer transition-transform duration-700 ${
            isPlaying ? 'animate-spin-slow' : 'paused'
          }`}
          onClick={togglePlay}
          style={{
            background: 'radial-gradient(circle, #1a1a24 0%, #0d0d14 45%, #050508 70%, #020204 100%)',
            boxShadow: '0 0 35px var(--theme-glow, rgba(16, 185, 129, 0.25))'
          }}
        >
          {/* Concentric Vinyl Micro-Grooves */}
          <div className="absolute inset-2 rounded-full border border-white/5 opacity-70"></div>
          <div className="absolute inset-6 rounded-full border border-white/5 opacity-60"></div>
          <div className="absolute inset-10 rounded-full border border-white/5 opacity-50"></div>
          <div className="absolute inset-14 rounded-full border border-white/5 opacity-40"></div>
          <div className="absolute inset-18 rounded-full border border-white/5 opacity-30"></div>
          <div className="absolute inset-22 rounded-full border border-white/5 opacity-20"></div>

          {/* Vinyl Light Reflection Sheen Angle 1 */}
          <div 
            className="absolute inset-0 rounded-full pointer-events-none opacity-25"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.45) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.45) 100%)'
            }}
          ></div>
          
          {/* Vinyl Light Reflection Sheen Angle 2 */}
          <div 
            className="absolute inset-0 rounded-full pointer-events-none opacity-20"
            style={{
              background: 'linear-gradient(45deg, rgba(255,255,255,0.3) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.3) 100%)'
            }}
          ></div>

          {/* Center Record Label (Custom Album Art + Typography) */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-slate-700 shadow-2xl flex items-center justify-center">
            <img 
              src={currentSong?.cover || "https://images.unsplash.com/photo-1508344928928-7165b67de128?auto=format&fit=crop&w=800&q=80"} 
              alt={currentSong?.title || "Nightly"} 
              className="absolute inset-0 w-full h-full object-cover filter brightness-85 contrast-125"
            />
            {/* Dark overlay for label text */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/80 flex flex-col items-center justify-between p-2.5 text-center">
              <span 
                className="text-[8px] font-mono uppercase font-bold tracking-widest"
                style={{ color: 'var(--theme-accent, #10b981)' }}
              >
                nightly.
              </span>
              <div className="my-auto">
                <p className="font-syne text-[10px] font-bold text-white leading-tight line-clamp-1">
                  {currentSong?.title || "baseball in america"}
                </p>
                <p className="text-[7px] font-mono text-slate-300">33⅓ RPM</p>
              </div>
              <span className="text-[7px] font-mono text-slate-400">STEREO</span>
            </div>

            {/* Spindle Center Hole */}
            <div className="relative z-10 w-4 h-4 rounded-full bg-slate-900 border-2 border-slate-300 shadow-inner flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-slate-100"></div>
            </div>
          </div>
        </div>

        {/* Tone Arm Mechanism */}
        <div 
          className="absolute top-4 right-4 w-12 h-36 origin-top-right transition-transform duration-1000 pointer-events-none z-20"
          style={{
            transform: isPlaying ? 'rotate(19deg)' : 'rotate(-12deg)'
          }}
        >
          {/* Tone Arm Pivot Base */}
          <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-gradient-to-b from-slate-400 to-slate-700 border border-white/40 shadow-lg flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-slate-900"></div>
          </div>

          {/* Tone Arm Metal Rod */}
          <div className="absolute top-6 right-3.5 w-1.5 h-28 bg-gradient-to-r from-slate-300 via-slate-100 to-slate-400 rounded-full shadow-md"></div>

          {/* Cartridge & Needle Head */}
          <div 
            className="absolute bottom-0 right-2 w-4 h-6 rounded-sm border border-white/40 shadow-md"
            style={{ background: 'var(--theme-accent, #10b981)' }}
          >
            <div className="absolute -bottom-1 left-1.5 w-1 h-2 bg-slate-200"></div>
          </div>
        </div>

        {/* Turntable Control Badges */}
        <div className="absolute bottom-3 left-4 flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-slate-400">
            33 RPM
          </span>
          <span 
            className={`w-2 h-2 rounded-full ${isPlaying ? 'animate-ping' : ''}`}
            style={{ background: isPlaying ? 'var(--theme-accent, #10b981)' : '#64748b' }}
          ></span>
        </div>

        {/* Center Hover Play Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 hover:opacity-100 transition-opacity">
          <div 
            className="p-3 rounded-full text-white backdrop-blur-md shadow-lg"
            style={{ background: 'var(--theme-accent, #10b981)' }}
          >
            {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white ml-0.5" />}
          </div>
        </div>

      </div>
    </div>
  );
}
