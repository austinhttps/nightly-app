import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#04060d]/80 backdrop-blur-xl py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
        
        {/* Brand Signoff */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span 
              className="w-2 h-2 rounded-full"
              style={{ 
                background: 'var(--theme-accent, #10b981)',
                boxShadow: '0 0 10px var(--theme-accent, #10b981)'
              }}
            ></span>
            <span className="font-syne text-base font-extrabold text-white tracking-tight">
              nightly<span style={{ color: 'var(--theme-accent, #10b981)' }}>.</span>
            </span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">night, love you.</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-500">Nashville, TN</span>
        </div>

        {/* Copyright & Made for late night drives */}
        <div className="flex items-center gap-2 text-slate-400 text-[11px]">
          <span>© {new Date().getFullYear()} Nightly.</span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1">
            <span>songs for late night drives</span>
            <Heart className="w-3 h-3 fill-rose-500 text-rose-500 inline ml-0.5" />
          </span>
        </div>

      </div>
    </footer>
  );
}
