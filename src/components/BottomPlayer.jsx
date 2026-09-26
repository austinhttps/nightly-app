import React from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  AlignLeft,
  Tv,
  Disc
} from 'lucide-react';

export default function BottomPlayer({
  currentSong,
  isPlaying,
  togglePlay,
  playNext,
  playPrev,
  currentTime,
  duration,
  onSeek,
  volume,
  onVolumeChange,
  isMuted,
  toggleMute
}) {
  const formatTime = (secs) => {
    if (isNaN(secs)) return "00:00";
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-6 max-w-5xl mx-auto z-40">
      <div className="p-3 sm:px-6 sm:py-3.5 rounded-2xl glass-panel border border-white/15 shadow-2xl backdrop-blur-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Track info & mini cover */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-white/10 shadow-md">
            <img 
              src={currentSong.cover} 
              alt={currentSong.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1 sm:flex-initial sm:max-w-[200px]">
            <h4 className="font-syne text-sm font-bold text-white truncate leading-tight">
              {currentSong.title}
            </h4>
            <p className="text-[11px] text-pink-400 font-mono truncate">
              {currentSong.album}
            </p>
          </div>

          {/* Mobile Play Button */}
          <div className="sm:hidden flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="p-2 rounded-full bg-pink-500 text-white"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
            </button>
          </div>
        </div>

        {/* Center Controls & Timeline */}
        <div className="flex-1 max-w-lg w-full flex flex-col items-center gap-1.5">
          <div className="hidden sm:flex items-center gap-4">
            <button 
              onClick={playPrev}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={togglePlay}
              className="p-2 rounded-full bg-pink-500 hover:bg-pink-600 text-white shadow-md transition-transform active:scale-95 cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
            </button>
            <button 
              onClick={playNext}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Timeline Bar */}
          <div className="w-full flex items-center gap-2">
            <span className="text-[10px] font-mono text-slate-400 w-8 text-right">
              {formatTime(currentTime)}
            </span>
            <input 
              type="range"
              min="0"
              max={duration || 100}
              step="0.5"
              value={currentTime}
              onChange={(e) => onSeek(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
            />
            <span className="text-[10px] font-mono text-slate-400 w-8">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume & Details */}
        <div className="hidden sm:flex items-center gap-3">
          <button 
            onClick={toggleMute}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input 
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="w-20 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
          />
        </div>

      </div>
    </div>
  );
}
