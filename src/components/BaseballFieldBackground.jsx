import React from 'react';

export default function BaseballFieldBackground({ activeTheme }) {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      
      {/* Deep Midnight Stadium Sky Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050711] via-[#090d1a] to-[#040810]"></div>

      {/* Dynamic Ambient Theme Glow Halo behind center stage */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] rounded-full blur-[140px] opacity-40 transition-all duration-700 pointer-events-none"
        style={{
          background: 'var(--theme-glow, rgba(16, 185, 129, 0.45))'
        }}
      ></div>

      {/* Stadium Floodlight Towers & Beams */}
      {/* Left Floodlight Tower Light Beam */}
      <div 
        className="absolute -top-12 -left-20 w-[480px] h-[950px] opacity-20 transform rotate-[-24deg] origin-top-left blur-[50px] transition-all duration-700"
        style={{
          background: 'linear-gradient(180deg, #ffffff 0%, var(--theme-accent, #10b981) 25%, transparent 80%)'
        }}
      ></div>

      {/* Right Floodlight Tower Light Beam */}
      <div 
        className="absolute -top-12 -right-20 w-[480px] h-[950px] opacity-20 transform rotate-[24deg] origin-top-right blur-[50px] transition-all duration-700"
        style={{
          background: 'linear-gradient(180deg, #ffffff 0%, var(--theme-accent, #10b981) 25%, transparent 80%)'
        }}
      ></div>

      {/* Top Floodlight Flare Points */}
      <div className="absolute top-4 left-16 flex gap-1 opacity-60">
        <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_20px_#ffffff]"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_20px_#ffffff]"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_20px_#ffffff]"></div>
      </div>
      <div className="absolute top-4 right-16 flex gap-1 opacity-60">
        <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_20px_#ffffff]"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_20px_#ffffff]"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_20px_#ffffff]"></div>
      </div>

      {/* SVG Faint Baseball Field / Diamond & Warning Track Overlay */}
      <svg 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[65vh] opacity-25"
        viewBox="0 0 1000 600" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          {/* Outfield Grass Turf Gradient */}
          <radialGradient id="turfGrad" cx="50%" cy="100%" r="90%">
            <stop offset="0%" stopColor="#0d2e1f" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#081b14" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#03080d" stopOpacity="0" />
          </radialGradient>

          {/* Dirt Infield Gradient */}
          <radialGradient id="dirtGrad" cx="50%" cy="95%" r="60%">
            <stop offset="0%" stopColor="#2c1a11" stopOpacity="0.7" />
            <stop offset="70%" stopColor="#190e09" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#081016" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer Grass Field Arc */}
        <path d="M -200 600 C 100 120, 900 120, 1200 600 Z" fill="url(#turfGrad)" />

        {/* Warning Track Outer Perimeter Arc */}
        <path d="M 50 600 C 250 200, 750 200, 950 600" stroke="#4a3528" strokeWidth="18" strokeOpacity="0.3" strokeDasharray="6 4" />

        {/* Outfield Wall Fence Arc */}
        <path d="M 60 600 C 260 210, 740 210, 940 600" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="2.5" />

        {/* Dirt Infield Area Arc */}
        <path d="M 220 600 C 350 360, 650 360, 780 600 Z" fill="url(#dirtGrad)" />

        {/* Faint Chalk Diamond Baselines */}
        {/* Home Plate to First Base */}
        <line x1="500" y1="580" x2="680" y2="440" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2" />
        {/* First Base to Second Base */}
        <line x1="680" y1="440" x2="500" y2="330" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2" />
        {/* Second Base to Third Base */}
        <line x1="500" y1="330" x2="320" y2="440" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2" />
        {/* Third Base to Home Plate */}
        <line x1="320" y1="440" x2="500" y2="580" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2" />

        {/* Foul Lines extending to outfield */}
        <line x1="500" y1="580" x2="940" y2="230" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.5" strokeDasharray="10 6" />
        <line x1="500" y1="580" x2="60" y2="230" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.5" strokeDasharray="10 6" />

        {/* Pitcher's Mound Circle */}
        <circle cx="500" cy="460" r="26" fill="#3a2318" fillOpacity="0.4" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.5" />
        <rect x="495" y="457" width="10" height="4" fill="white" fillOpacity="0.8" rx="1" />

        {/* Base Bags */}
        {/* First Base */}
        <rect x="674" y="434" width="12" height="12" fill="white" fillOpacity="0.7" transform="rotate(45 680 440)" />
        {/* Second Base */}
        <rect x="494" y="324" width="12" height="12" fill="white" fillOpacity="0.7" transform="rotate(45 500 330)" />
        {/* Third Base */}
        <rect x="314" y="434" width="12" height="12" fill="white" fillOpacity="0.7" transform="rotate(45 320 440)" />

        {/* Home Plate */}
        <polygon points="500,588 508,580 508,574 492,574 492,580" fill="white" fillOpacity="0.8" />
      </svg>

      {/* Stadium Night Mist & Fog Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#040810]/95 via-transparent to-transparent"></div>
    </div>
  );
}
