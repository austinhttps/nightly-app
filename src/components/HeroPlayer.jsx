import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  Repeat, 
  Volume2, 
  VolumeX, 
  Radio, 
  Disc, 
  Sparkles, 
  ExternalLink,
  Car,
  Tv,
  Music4,
  Sliders,
  Heart,
  Share2
} from 'lucide-react';
import CassetteVisualizer from './CassetteVisualizer';
import VinylVisualizer from './VinylVisualizer';
import LyricsPanel from './LyricsPanel';
import AudioVisualizerCanvas from './AudioVisualizerCanvas';

export default function HeroPlayer({
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
  toggleMute,
  fxMode,
  setFxMode,
  isShuffle,
  toggleShuffle,
  isLoop,
  toggleLoop,
  activeTheme
}) {
  const [activeTab, setActiveTab] = useState('cassette'); // 'cassette', 'vinyl', 'lyrics'
  const [isLiked, setIsLiked] = useState(false);

  const formatTime = (secs) => {
    if (isNaN(secs)) return "00:00";
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const fxModes = [
    { id: 'studio', label: 'Studio Hi-Fi', icon: Sliders, desc: 'Crisp studio master' },
    { id: 'car-drive', label: 'Midnight Car Drive', icon: Car, desc: 'Muffled highway warmth' },
    { id: 'cassette', label: 'Vintage Tape', icon: Tv, desc: 'Lo-fi saturation & wow' },
    { id: 'stadium', label: 'Stadium Live', icon: Music4, desc: 'Spacious arena echo' },
  ];

  return (
    <section id="player" className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-fuchsia-600/20 blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-indigo-600/20 blur-[130px] pointer-events-none -z-10"></div>

      {/* Main Grid: Left Visualizer & Info / Right Interactive Controls & Lyrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Visualizer Deck */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Visualizer Mode Selector Header */}
          <div className="flex items-center justify-between p-2 rounded-2xl glass-panel border border-white/10">
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setActiveTab('cassette')}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'cassette' 
                    ? 'bg-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.4)]' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Tv className="w-4 h-4" />
                <span>Cassette Deck</span>
              </button>

              <button
                onClick={() => setActiveTab('vinyl')}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'vinyl' 
                    ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Disc className="w-4 h-4" />
                <span>Vinyl Turntable</span>
              </button>

              <button
                onClick={() => setActiveTab('lyrics')}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'lyrics' 
                    ? 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Music4 className="w-4 h-4" />
                <span>Live Lyrics</span>
              </button>
            </div>

            {/* REC Timecode Indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-black/60 border border-white/10 text-[11px] font-mono">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              <span className="text-slate-300 font-bold tracking-wider">REC [●]</span>
              <span className="text-pink-300">{formatTime(currentTime)}</span>
            </div>
          </div>

          {/* Active Visualizer Card Container */}
          <div className="relative rounded-3xl glass-panel border border-white/15 p-6 sm:p-8 overflow-hidden min-h-[380px] flex items-center justify-center">
            
            {/* Top Bar inside Deck */}
            <div className="absolute top-4 left-6 right-6 flex items-center justify-between pointer-events-none z-20">
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                DOLBY SURROUND • INDIE-POP STEREO
              </span>
              <span className="text-[10px] font-mono tracking-widest text-pink-400">
                {currentSong?.bpm || 120} BPM • {currentSong?.key || '4/4'}
              </span>
            </div>

            {/* Display active view */}
            <div className="w-full pt-4">
              {activeTab === 'cassette' && (
                <CassetteVisualizer 
                  currentSong={currentSong} 
                  isPlaying={isPlaying} 
                  currentTime={currentTime} 
                  duration={duration} 
                />
              )}

              {activeTab === 'vinyl' && (
                <VinylVisualizer 
                  currentSong={currentSong} 
                  isPlaying={isPlaying} 
                  togglePlay={togglePlay} 
                />
              )}

              {activeTab === 'lyrics' && (
                <div className="h-[360px]">
                  <LyricsPanel 
                    currentSong={currentSong} 
                    currentTime={currentTime} 
                    onSeekTo={onSeek}
                    isPlaying={isPlaying}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Real-time Frequency Spectrum Analyzer Canvas */}
          <AudioVisualizerCanvas isPlaying={isPlaying} activeTheme={activeTheme} />

        </div>

        {/* Right Column: Track Info, Controls, Audio FX & Stems */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Main Song Header Card */}
          <div className="p-6 sm:p-7 rounded-3xl glass-panel border border-white/15 space-y-6">
            
            {/* Album Cover & Track Title Info */}
            <div className="flex items-start gap-4">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-white/15 shadow-xl shrink-0 group">
                <img 
                  src={currentSong?.cover || "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"} 
                  alt={currentSong?.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30">
                    {currentSong?.mood || 'Indie Pop'}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {currentSong?.year}
                  </span>
                </div>

                <h1 className="font-syne text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight truncate">
                  {currentSong?.title || 'hate my favorite band'}
                </h1>

                <p className="text-sm font-medium text-pink-400/90 truncate flex items-center gap-1.5 mt-0.5">
                  <span>Nightly</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-300 truncate">{currentSong?.album}</span>
                </p>
              </div>

              {/* Like Button */}
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                  isLiked 
                    ? 'bg-pink-500/20 border-pink-500 text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.3)]' 
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
                title="Save to favorites"
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-pink-500 text-pink-500' : ''}`} />
              </button>
            </div>

            {/* Scrub Bar & Time Progress */}
            <div className="space-y-2">
              <div className="relative w-full flex items-center group cursor-pointer">
                <input 
                  type="range"
                  min="0"
                  max={duration || 100}
                  step="0.5"
                  value={currentTime}
                  onChange={(e) => onSeek(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500 group-hover:h-2.5 transition-all"
                />
              </div>

              <div className="flex justify-between text-xs font-mono text-slate-400">
                <span>{formatTime(currentTime)}</span>
                <span className="text-pink-300/80 tracking-wider">night, love you.</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Primary Control Buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={toggleShuffle}
                className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                  isShuffle ? 'text-pink-400 bg-pink-500/10' : 'text-slate-400 hover:text-white'
                }`}
                title="Shuffle queue"
              >
                <Shuffle className="w-5 h-5" />
              </button>

              <button
                onClick={playPrev}
                className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white transition-all cursor-pointer hover:scale-105 active:scale-95"
                title="Previous track"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              {/* Big Play / Pause Button with Neon Glow */}
              <button
                onClick={togglePlay}
                className="p-5 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 text-white shadow-[0_0_30px_rgba(236,72,153,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7 fill-white" />
                ) : (
                  <Play className="w-7 h-7 fill-white ml-1" />
                )}
              </button>

              <button
                onClick={playNext}
                className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white transition-all cursor-pointer hover:scale-105 active:scale-95"
                title="Next track"
              >
                <SkipForward className="w-5 h-5" />
              </button>

              <button
                onClick={toggleLoop}
                className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                  isLoop ? 'text-pink-400 bg-pink-500/10' : 'text-slate-400 hover:text-white'
                }`}
                title="Repeat track"
              >
                <Repeat className="w-5 h-5" />
              </button>
            </div>

            {/* Volume Control Bar */}
            <div className="flex items-center gap-3 pt-2 border-t border-white/10">
              <button 
                onClick={toggleMute}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-rose-400" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>

              <input 
                type="range"
                min="0"
                max="1"
                step="0.02"
                value={isMuted ? 0 : volume}
                onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
              <span className="text-[11px] font-mono text-slate-400 w-8 text-right">
                {Math.round((isMuted ? 0 : volume) * 100)}%
              </span>
            </div>

          </div>

          {/* Sound FX Audio Processing Modes */}
          <div className="p-5 rounded-3xl glass-panel border border-white/15 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider font-bold text-slate-300 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-pink-400" />
                Acoustic Sound Modes
              </span>
              <span className="text-[10px] font-mono text-pink-300/70">Real-time DSP Filter</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {fxModes.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setFxMode(m.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    fxMode === m.id
                      ? 'bg-gradient-to-br from-pink-500/20 to-purple-600/20 border-pink-500/50 text-white shadow-[0_0_15px_rgba(236,72,153,0.2)]'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <m.icon className={`w-4 h-4 ${fxMode === m.id ? 'text-pink-400' : 'opacity-70'}`} />
                    <span className="text-xs font-bold leading-none">{m.label}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{m.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* External Official Streaming Links */}
          <div className="flex items-center justify-between p-4 rounded-2xl glass-panel border border-white/10 text-xs font-mono text-slate-300">
            <span>Stream on Official Platforms:</span>
            <div className="flex items-center gap-3">
              <a
                href={currentSong?.spotifyUrl || "https://open.spotify.com/artist/4XquL78n22oUv4AawRkS0e"}
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-400 transition-colors flex items-center gap-1 font-semibold"
              >
                Spotify <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={currentSong?.appleUrl || "https://music.apple.com/us/artist/nightly/1141364506"}
                target="_blank"
                rel="noreferrer"
                className="hover:text-pink-400 transition-colors flex items-center gap-1 font-semibold"
              >
                Apple Music <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={currentSong?.youtubeUrl || "https://youtube.com"}
                target="_blank"
                rel="noreferrer"
                className="hover:text-rose-400 transition-colors flex items-center gap-1 font-semibold"
              >
                YouTube <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
