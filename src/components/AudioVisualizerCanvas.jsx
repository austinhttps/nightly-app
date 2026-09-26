import React, { useEffect, useRef } from 'react';
import { audioEngine } from '../utils/audioEngine';

export default function AudioVisualizerCanvas({ isPlaying, activeTheme = 'emerald' }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const getThemeColors = (theme) => {
    switch (theme) {
      case 'emerald':
        return { start: '#10b981', mid: '#34d399', end: '#6ee7b7' };
      case 'amber':
        return { start: '#f59e0b', mid: '#fbbf24', end: '#fcd34d' };
      case 'magenta':
        return { start: '#ec4899', mid: '#f43f5e', end: '#fb7185' };
      case 'cyan':
        return { start: '#06b6d4', mid: '#38bdf8', end: '#93c5fd' };
      case 'indigo':
      default:
        return { start: '#a855f7', mid: '#c084fc', end: '#e879f9' };
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const bufferLength = 64;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      animationRef.current = requestAnimationFrame(render);

      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      if (isPlaying) {
        audioEngine.getFrequencyData(dataArray);
      } else {
        for (let i = 0; i < bufferLength; i++) {
          dataArray[i] = Math.sin(Date.now() * 0.003 + i * 0.2) * 10 + 14;
        }
      }

      const colors = getThemeColors(activeTheme);
      const gradient = ctx.createLinearGradient(0, height, 0, 0);
      gradient.addColorStop(0, colors.start);
      gradient.addColorStop(0.5, colors.mid);
      gradient.addColorStop(1, colors.end);

      const barWidth = (width / bufferLength) * 1.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = ((dataArray[i] / 255) * height * 0.85) + 2;

        // Draw glowing frequency bar
        ctx.fillStyle = gradient;
        ctx.shadowBlur = isPlaying ? 16 : 6;
        ctx.shadowColor = colors.start;

        const rx = 3;
        const y = height - barHeight;
        
        ctx.beginPath();
        ctx.roundRect(x, y, Math.max(2, barWidth - 2), barHeight, [rx, rx, 0, 0]);
        ctx.fill();

        // Mirrored bottom line
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(x, height - 2, Math.max(2, barWidth - 2), 2);

        x += barWidth;
      }
    };

    render();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, activeTheme]);

  return (
    <div className="w-full h-16 sm:h-20 relative overflow-hidden rounded-xl bg-black/50 border border-white/10 p-1 flex items-end">
      <canvas 
        ref={canvasRef} 
        width={400} 
        height={80} 
        className="w-full h-full block"
      />
      <div className="absolute top-1.5 left-2 flex items-center gap-1.5 text-[9px] font-mono text-slate-400">
        <span 
          className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'animate-pulse' : ''}`}
          style={{ background: isPlaying ? 'var(--theme-accent, #10b981)' : '#64748b' }}
        ></span>
        <span>SPECTRUM ANALYZER</span>
      </div>
    </div>
  );
}
