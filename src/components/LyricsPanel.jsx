import React, { useEffect, useRef, useState } from 'react';
import { AlignLeft, Copy, Check, Sparkles, Music } from 'lucide-react';

export default function LyricsPanel({ 
  currentSong, 
  currentTime, 
  onSeekTo,
  isPlaying 
}) {
  const [copied, setCopied] = useState(false);
  const activeLyricRef = useRef(null);
  const containerRef = useRef(null);

  const lyrics = currentSong?.lyrics || [];

  // Find active lyric index based on currentTime
  let activeIndex = 0;
  for (let i = 0; i < lyrics.length; i++) {
    if (currentTime >= lyrics[i].time) {
      activeIndex = i;
    } else {
      break;
    }
  }

  // Smooth scroll active line into view
  useEffect(() => {
    if (activeLyricRef.current && containerRef.current) {
      activeLyricRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [activeIndex]);

  const handleCopyLyrics = () => {
    if (!lyrics.length) return;
    const allText = lyrics.map(l => l.text).join('\n');
    navigator.clipboard.writeText(`${currentSong.title} - Nightly\n\n${allText}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col rounded-2xl p-4 sm:p-5 overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
        <div className="flex items-center gap-2">
          <AlignLeft className="w-4 h-4" style={{ color: 'var(--theme-accent, #10b981)' }} />
          <h3 className="font-syne text-sm font-bold text-white tracking-wide">
            Live Synchronized Lyrics
          </h3>
        </div>

        <button
          onClick={handleCopyLyrics}
          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 flex items-center gap-1 transition-all cursor-pointer"
          title="Copy lyrics"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Lyrics Scrollable Container */}
      <div 
        ref={containerRef} 
        className="flex-1 overflow-y-auto space-y-3.5 pr-2 scrollbar-thin select-none"
      >
        {lyrics.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 py-12">
            <Music className="w-8 h-8 opacity-40 mb-2" style={{ color: 'var(--theme-accent, #10b981)' }} />
            <p className="text-xs font-mono">Select a track to load lyrics</p>
          </div>
        ) : (
          lyrics.map((line, idx) => {
            const isActive = idx === activeIndex;
            const isPast = idx < activeIndex;

            return (
              <div
                key={idx}
                ref={isActive ? activeLyricRef : null}
                onClick={() => onSeekTo(line.time)}
                className={`group cursor-pointer p-2.5 rounded-xl transition-all duration-300 flex items-start gap-3 ${
                  isActive 
                    ? 'text-white font-bold text-base sm:text-lg scale-[1.02] border' 
                    : isPast 
                      ? 'text-slate-400 hover:text-slate-200 text-xs sm:text-sm font-medium opacity-60 hover:opacity-100' 
                      : 'text-slate-400 hover:text-slate-200 text-xs sm:text-sm font-medium opacity-75 hover:opacity-100'
                }`}
                style={{
                  background: isActive ? 'rgba(255, 255, 255, 0.08)' : undefined,
                  borderColor: isActive ? 'var(--theme-accent, #10b981)' : 'transparent',
                  boxShadow: isActive ? '0 0 20px var(--theme-glow, rgba(16, 185, 129, 0.25))' : undefined,
                }}
              >
                {/* Timestamp tag */}
                <span 
                  className={`text-[9px] font-mono px-1.5 py-0.5 rounded transition-colors ${
                    isActive ? 'text-white font-bold' : 'bg-white/5 text-slate-500'
                  }`}
                  style={{
                    background: isActive ? 'var(--theme-accent, #10b981)' : undefined
                  }}
                >
                  {Math.floor(line.time / 60)}:{(line.time % 60).toString().padStart(2, '0')}
                </span>

                {/* Line text */}
                <span className="leading-snug">
                  {line.text}
                </span>

                {isActive && isPlaying && (
                  <Sparkles 
                    className="w-3.5 h-3.5 ml-auto animate-spin-slow shrink-0" 
                    style={{ color: 'var(--theme-accent, #10b981)' }}
                  />
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer info */}
      <div className="pt-2.5 mt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--theme-accent, #10b981)' }}></span>
          Click line to jump
        </span>
        <span style={{ color: 'var(--theme-accent, #10b981)' }}>night, love you.</span>
      </div>

    </div>
  );
}
