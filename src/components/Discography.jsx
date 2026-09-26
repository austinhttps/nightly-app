import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Disc, 
  Sparkles, 
  Clock, 
  Heart, 
  Share2, 
  Music, 
  Radio, 
  SlidersHorizontal,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { SONGS, ALBUMS } from '../data/songsData';

export default function Discography({ 
  currentSong, 
  isPlaying, 
  onSelectSong, 
  togglePlay 
}) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedAlbumModal, setSelectedAlbumModal] = useState(null);

  const filters = [
    { id: 'all', label: 'All Songs' },
    { id: 'wear-your-heart-out', label: 'wear your heart out' },
    { id: 'night-love-you', label: 'night, love you.' },
    { id: 'singles-eps', label: 'Singles & EPs' },
    { id: 'midnight', label: 'Midnight Drive Moods' },
  ];

  const filteredSongs = SONGS.filter((song) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'midnight') return song.mood.toLowerCase().includes('midnight') || song.mood.toLowerCase().includes('late night');
    return song.albumId === selectedFilter;
  });

  const formatDuration = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins}:${remainder.toString().padStart(2, '0')}`;
  };

  return (
    <section id="discography" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-pink-500"></span>
            <span className="text-xs font-mono uppercase tracking-widest text-pink-300">
              Complete Discography
            </span>
          </div>
          <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            the soundtrack of the night<span className="text-pink-500">.</span>
          </h2>
          <p className="text-slate-400 mt-2 max-w-2xl text-sm sm:text-base">
            Explore the complete studio albums, acoustic cuts, and standalone anthems that define Nightly's nostalgic sound.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedFilter === f.id
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.3)]'
                  : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Album Hero Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {ALBUMS.map((album) => (
          <div
            key={album.id}
            onClick={() => setSelectedFilter(album.id)}
            className="group relative rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-pink-500/40 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-white/10 text-slate-200">
                {album.year}
              </span>
              <span className="text-xs font-mono text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                View Tracks <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 border border-white/10">
              <img 
                src={album.cover} 
                alt={album.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="font-syne text-xl font-extrabold text-white leading-tight">
                  {album.title}
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-400 line-clamp-2 mb-2">
              {album.description}
            </p>
          </div>
        ))}
      </div>

      {/* Songs Table / Card List */}
      <div className="rounded-3xl glass-panel border border-white/10 overflow-hidden shadow-2xl">
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music className="w-4 h-4 text-pink-400" />
            <h3 className="font-syne text-lg font-bold text-white">Tracklist</h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {filteredSongs.length} {filteredSongs.length === 1 ? 'Track' : 'Tracks'} Loaded
          </span>
        </div>

        <div className="divide-y divide-white/5">
          {filteredSongs.map((song, index) => {
            const isThisPlaying = currentSong?.id === song.id && isPlaying;
            const isThisSelected = currentSong?.id === song.id;

            return (
              <div
                key={song.id}
                onClick={() => onSelectSong(song)}
                className={`group flex items-center justify-between p-4 sm:px-6 transition-all duration-200 cursor-pointer ${
                  isThisSelected 
                    ? 'bg-pink-500/10 border-l-4 border-l-pink-500' 
                    : 'hover:bg-white/5'
                }`}
              >
                {/* Left: Track Index / Play icon & Song Info */}
                <div className="flex items-center gap-4 sm:gap-6 min-w-0 flex-1">
                  
                  {/* Track number / Play hover icon */}
                  <div className="w-8 h-8 flex items-center justify-center shrink-0">
                    {isThisPlaying ? (
                      <div className="flex items-end gap-0.5 h-4">
                        <span className="w-1 bg-pink-500 h-full animate-bounce"></span>
                        <span className="w-1 bg-pink-400 h-2/3 animate-bounce delay-75"></span>
                        <span className="w-1 bg-purple-400 h-5/6 animate-bounce delay-150"></span>
                      </div>
                    ) : (
                      <span className="text-xs font-mono text-slate-500 group-hover:hidden">
                        {(index + 1).toString().padStart(2, '0')}
                      </span>
                    )}
                    <button 
                      className={`hidden group-hover:flex items-center justify-center w-8 h-8 rounded-full bg-pink-500 text-white shadow-[0_0_12px_rgba(236,72,153,0.5)]`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isThisSelected) {
                          togglePlay();
                        } else {
                          onSelectSong(song);
                        }
                      }}
                    >
                      {isThisPlaying ? (
                        <Pause className="w-3.5 h-3.5 fill-white" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                      )}
                    </button>
                  </div>

                  {/* Artwork thumbnail */}
                  <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/10 shadow-md">
                    <img 
                      src={song.cover} 
                      alt={song.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Song Title & Details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className={`font-syne text-base font-bold truncate ${
                        isThisSelected ? 'text-pink-400' : 'text-white group-hover:text-pink-300'
                      }`}>
                        {song.title}
                      </h4>
                      {isThisSelected && (
                        <span className="px-1.5 py-0.2 text-[9px] font-mono bg-pink-500/20 text-pink-300 rounded border border-pink-500/30">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 font-medium truncate flex items-center gap-2 mt-0.5">
                      <span>{song.album}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-500">{song.year}</span>
                    </p>
                  </div>
                </div>

                {/* Right: Mood Tag, Key/BPM & Duration */}
                <div className="flex items-center gap-4 sm:gap-8 shrink-0">
                  <span className="hidden md:inline-block px-2.5 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-slate-300">
                    {song.mood}
                  </span>

                  <span className="hidden sm:inline-block text-xs font-mono text-slate-400">
                    {song.bpm} BPM
                  </span>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 w-12 text-right">
                    <Clock className="w-3.5 h-3.5 opacity-60 hidden sm:inline" />
                    <span>{formatDuration(song.duration)}</span>
                  </div>

                  {/* Direct Spotify external button */}
                  <a
                    href={song.spotifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-lg bg-white/5 hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-400 border border-white/10 transition-colors"
                    title="Open in Spotify"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
