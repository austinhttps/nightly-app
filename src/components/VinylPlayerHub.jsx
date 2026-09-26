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
  Disc3, 
  Music, 
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import VinylVisualizer from './VinylVisualizer';
import { SONGS, ALBUMS } from '../data/songsData';

export default function VinylPlayerHub({
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
  isShuffle,
  toggleShuffle,
  isLoop,
  toggleLoop,
  onSelectSong
}) {
  const [expandedAlbums, setExpandedAlbums] = useState({
    'singles-features': true,
    'baseball-in-america': true,
    'wear-your-heart-out': false,
    'the-void': false,
    'songs-to-drive-to': false,
    'night-love-you': false,
  });

  const toggleAlbumExpand = (albumId) => {
    setExpandedAlbums(prev => ({
      ...prev,
      [albumId]: !prev[albumId]
    }));
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) return "00:00";
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      
      {/* Main Grid: Left Vinyl Stage & Controls / Right Tracks by Album */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left / Center: Vinyl Record Player Stage */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Turntable Enclosure Card */}
          <div 
            className="rounded-3xl glass-panel border p-6 sm:p-8 flex flex-col items-center justify-center transition-all duration-700 relative overflow-hidden"
            style={{
              borderColor: 'rgba(255, 255, 255, 0.12)',
              boxShadow: '0 0 50px -10px var(--theme-glow, rgba(16, 185, 129, 0.35))'
            }}
          >
            {/* Top Deck Tag */}
            <div className="w-full flex items-center justify-between pb-3 border-b border-white/10 text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5 font-bold tracking-wider" style={{ color: 'var(--theme-accent, #10b981)' }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--theme-accent, #10b981)' }}></span>
                33⅓ RPM STEREO TURNTABLE
              </span>
              <span>{currentSong?.bpm || 120} BPM • {currentSong?.key || '4/4'}</span>
            </div>

            {/* Vinyl Record Visualizer */}
            <div className="w-full max-w-md my-4">
              <VinylVisualizer 
                currentSong={currentSong} 
                isPlaying={isPlaying} 
                togglePlay={togglePlay} 
              />
            </div>

            {/* Song Meta Information */}
            <div className="w-full mt-2 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span 
                    className="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold text-white border"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderColor: 'var(--theme-accent, #10b981)'
                    }}
                  >
                    {currentSong?.album}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {currentSong?.year}
                  </span>
                </div>
                <h1 className="font-syne text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight truncate">
                  {currentSong?.title}
                </h1>
                <p className="text-sm font-medium text-slate-400 mt-0.5">
                  {currentSong?.artist || 'Nightly'} • <span style={{ color: 'var(--theme-accent, #10b981)' }}>{currentSong?.mood}</span>
                </p>
              </div>

              {/* Streaming links */}
              {currentSong?.spotifyUrl && (
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={currentSong.spotifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-emerald-400 border border-white/10 transition-colors"
                    title="Open in Spotify"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>

            {/* Timeline Scrub Bar */}
            <div className="w-full mt-4 space-y-2">
              <input 
                type="range"
                min="0"
                max={duration || 100}
                step="0.5"
                value={currentTime}
                onChange={(e) => onSeek(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer transition-all"
                style={{
                  accentColor: 'var(--theme-accent, #10b981)'
                }}
              />
              <div className="flex justify-between text-xs font-mono text-slate-400">
                <span>{formatTime(currentTime)}</span>
                <span className="font-semibold" style={{ color: 'var(--theme-accent, #10b981)' }}>
                  night, love you.
                </span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Turntable Playback Controls */}
            <div className="w-full mt-4 flex items-center justify-between pt-2 border-t border-white/10">
              <button
                onClick={toggleShuffle}
                className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                  isShuffle ? 'text-white bg-white/10' : 'text-slate-400 hover:text-white'
                }`}
                style={{ color: isShuffle ? 'var(--theme-accent, #10b981)' : undefined }}
                title="Shuffle"
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

              {/* Main Play / Pause Button with Reactive Glow */}
              <button
                onClick={togglePlay}
                className="p-5 rounded-full text-white hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, var(--theme-accent, #10b981), #059669)',
                  boxShadow: '0 0 35px var(--theme-glow, rgba(16, 185, 129, 0.7))'
                }}
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
                  isLoop ? 'text-white bg-white/10' : 'text-slate-400 hover:text-white'
                }`}
                style={{ color: isLoop ? 'var(--theme-accent, #10b981)' : undefined }}
                title="Repeat"
              >
                <Repeat className="w-5 h-5" />
              </button>
            </div>

            {/* Volume Slider Bar */}
            <div className="w-full mt-4 flex items-center gap-3 pt-2">
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
                step="0.02"
                value={isMuted ? 0 : volume}
                onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                style={{ accentColor: 'var(--theme-accent, #10b981)' }}
              />
              <span className="text-[11px] font-mono text-slate-400 w-8 text-right">
                {Math.round((isMuted ? 0 : volume) * 100)}%
              </span>
            </div>

          </div>
        </div>

        {/* Right Side: Discography Tracklist by Album */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          
          {/* Header Card */}
          <div className="p-4 rounded-2xl glass-panel border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div 
                className="p-2 rounded-xl text-white flex items-center justify-center"
                style={{ background: 'var(--theme-accent, #10b981)' }}
              >
                <Disc3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-syne text-base font-bold text-white leading-tight">Discography & Tracklist</h3>
                <p className="text-[11px] font-mono text-slate-400">{ALBUMS.length} Albums • {SONGS.length} Songs</p>
              </div>
            </div>
            <span 
              className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-white border"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'var(--theme-accent, #10b981)',
                color: 'var(--theme-accent, #10b981)'
              }}
            >
              All Tracks
            </span>
          </div>

          {/* Tracklist Container */}
          <div className="rounded-3xl glass-panel border border-white/10 p-5 sm:p-6 max-h-[640px] overflow-y-auto scrollbar-thin">
            <div className="space-y-4">
              {/* Grouped by Album */}
              {ALBUMS.map((album) => {
                const albumSongs = SONGS.filter(s => s.albumId === album.id);
                const isExpanded = expandedAlbums[album.id];

                return (
                  <div 
                    key={album.id}
                    className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden transition-all"
                  >
                    {/* Album Accordion Header */}
                    <button
                      onClick={() => toggleAlbumExpand(album.id)}
                      className="w-full p-3.5 flex items-center justify-between gap-3 hover:bg-white/5 transition-colors cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img 
                          src={album.cover} 
                          alt={album.title} 
                          className="w-10 h-10 rounded-lg object-cover shrink-0 border border-white/10"
                        />
                        <div className="min-w-0">
                          <h4 className="font-syne text-sm font-bold text-white truncate">
                            {album.title}
                          </h4>
                          <p className="text-[10px] font-mono text-slate-400">
                            {album.year} • {albumSongs.length} Tracks
                          </p>
                        </div>
                      </div>

                      <div className="p-1 rounded-lg bg-white/5 text-slate-400">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>

                    {/* Song List for this Album */}
                    {isExpanded && (
                      <div className="border-t border-white/5 divide-y divide-white/5">
                        {albumSongs.map((song, idx) => {
                          const isSelected = currentSong?.id === song.id;
                          const isSongPlaying = isSelected && isPlaying;

                          return (
                            <div
                              key={song.id}
                              onClick={() => onSelectSong(song)}
                              className={`flex items-center justify-between p-3 transition-all cursor-pointer ${
                                isSelected 
                                  ? 'bg-white/10 border-l-4' 
                                  : 'hover:bg-white/5'
                              }`}
                              style={{
                                borderLeftColor: isSelected ? 'var(--theme-accent, #10b981)' : undefined
                              }}
                            >
                              <div className="flex items-center gap-3 min-w-0 flex-1">
                                {/* Play/Pause state icon */}
                                <div className="w-6 h-6 flex items-center justify-center shrink-0">
                                  {isSongPlaying ? (
                                    <div className="flex items-end gap-0.5 h-3">
                                      <span className="w-0.5 h-full animate-bounce" style={{ background: 'var(--theme-accent, #10b981)' }}></span>
                                      <span className="w-0.5 h-2/3 animate-bounce delay-75" style={{ background: 'var(--theme-accent, #10b981)' }}></span>
                                      <span className="w-0.5 h-5/6 animate-bounce delay-150" style={{ background: 'var(--theme-accent, #10b981)' }}></span>
                                    </div>
                                  ) : (
                                    <span className="text-[11px] font-mono text-slate-500">
                                      {(idx + 1).toString().padStart(2, '0')}
                                    </span>
                                  )}
                                </div>

                                <div className="min-w-0 flex-1">
                                  <h5 
                                    className={`font-syne text-xs sm:text-sm font-bold truncate ${
                                      isSelected ? 'text-white font-extrabold' : 'text-slate-300'
                                    }`}
                                    style={{
                                      color: isSelected ? 'var(--theme-accent, #10b981)' : undefined
                                    }}
                                  >
                                    {song.title}
                                  </h5>
                                  <span className="text-[10px] font-mono text-slate-500">
                                    {song.artist ? `${song.artist} • ` : ''}{song.mood}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 shrink-0">
                                <span className="text-[11px] font-mono text-slate-400">
                                  {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
