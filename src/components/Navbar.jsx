import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Navbar({ 
  activeTheme, 
  setActiveTheme, 
  themes
}) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/10 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Clean Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span 
                className="w-2.5 h-2.5 rounded-full animate-pulse transition-all duration-500"
                style={{
                  background: 'var(--theme-accent, #10b981)',
                  boxShadow: '0 0 14px var(--theme-accent, #10b981)'
                }}
              ></span>
              <span className="font-syne text-2xl sm:text-3xl font-extrabold tracking-tighter text-white">
                nightly<span style={{ color: 'var(--theme-accent, #10b981)' }}>.</span>
              </span>
            </div>
          </div>

          {/* Glow Palette Selector */}
          <div className="flex items-center gap-3">
            <div className="relative group">
              <button 
                className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 flex items-center gap-2 text-xs font-mono transition-all cursor-pointer group-hover:border-white/25"
                title="Change Ambient Glow Palette"
              >
                <span 
                  className="w-2.5 h-2.5 rounded-full shadow-sm"
                  style={{ background: 'var(--theme-accent, #10b981)' }}
                ></span>
                <span className="font-semibold">Glow Palette</span>
              </button>
              
              <div className="absolute right-0 mt-2 w-52 py-2 rounded-2xl glass-panel border border-white/15 shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all z-50">
                <div className="px-3.5 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  Select Theme
                </div>
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setActiveTheme(theme.id)}
                    className={`w-full px-3.5 py-2 text-left text-xs flex items-center gap-2.5 transition-colors cursor-pointer hover:bg-white/10 ${
                      activeTheme === theme.id ? 'text-white font-bold bg-white/5' : 'text-slate-300'
                    }`}
                  >
                    <span 
                      className="w-3 h-3 rounded-full border border-white/30 shadow-sm shrink-0"
                      style={{ background: theme.accent }}
                    ></span>
                    <span className="truncate">{theme.name}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </nav>
  );
}
