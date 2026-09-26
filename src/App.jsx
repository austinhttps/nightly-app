import React, { useState, useEffect } from 'react';
import { SONGS, ALBUMS } from './data/songsData';
import { audioEngine } from './utils/audioEngine';
import BaseballFieldBackground from './components/BaseballFieldBackground';
import Navbar from './components/Navbar';
import VinylPlayerHub from './components/VinylPlayerHub';
import Footer from './components/Footer';

export default function App() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(SONGS[0].duration || 32);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const [activeTheme, setActiveTheme] = useState('emerald');

  const themes = [
    { id: 'emerald', name: 'Stadium Turf Green', accent: '#10b981', glow: 'rgba(16, 185, 129, 0.65)' },
    { id: 'amber', name: 'Floodlight Gold', accent: '#f59e0b', glow: 'rgba(245, 158, 11, 0.65)' },
    { id: 'indigo', name: 'Midnight Violet', accent: '#a855f7', glow: 'rgba(168, 85, 247, 0.65)' },
    { id: 'magenta', name: 'Electric Pink', accent: '#ec4899', glow: 'rgba(236, 72, 153, 0.65)' },
    { id: 'cyan', name: 'Cyber Blue', accent: '#06b6d4', glow: 'rgba(6, 182, 212, 0.65)' },
  ];

  const currentThemeObj = themes.find(t => t.id === activeTheme) || themes[0];
  const currentSong = SONGS[currentSongIndex] || SONGS[0];

  // Load song into audio engine on selection
  useEffect(() => {
    audioEngine.loadSong(currentSong);
    setDuration(currentSong.duration || 32);
    setCurrentTime(0);
  }, [currentSongIndex]);

  // Audio Engine Callbacks
  useEffect(() => {
    audioEngine.onTimeUpdate((curr, dur) => {
      setCurrentTime(curr);
      if (dur > 0) setDuration(dur);
    });

    audioEngine.onEnded(() => {
      if (isLoop) {
        audioEngine.seek(0);
        audioEngine.play();
      } else {
        handlePlayNext();
      }
    });
  }, [isLoop, isShuffle, currentSongIndex]);

  // Playback Control Handlers
  const togglePlay = () => {
    if (isPlaying) {
      audioEngine.pause();
      setIsPlaying(false);
    } else {
      audioEngine.play();
      setIsPlaying(true);
    }
  };

  const handleSelectSong = (song) => {
    const index = SONGS.findIndex(s => s.id === song.id);
    if (index !== -1) {
      setCurrentSongIndex(index);
      audioEngine.loadSong(song);
      audioEngine.play();
      setIsPlaying(true);
    }
  };

  const handlePlayNext = () => {
    let nextIndex;
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * SONGS.length);
    } else {
      nextIndex = (currentSongIndex + 1) % SONGS.length;
    }
    setCurrentSongIndex(nextIndex);
    const nextSong = SONGS[nextIndex];
    audioEngine.loadSong(nextSong);
    if (isPlaying) {
      audioEngine.play();
    }
  };

  const handlePlayPrev = () => {
    if (currentTime > 4) {
      audioEngine.seek(0);
      setCurrentTime(0);
      return;
    }
    const prevIndex = (currentSongIndex - 1 + SONGS.length) % SONGS.length;
    setCurrentSongIndex(prevIndex);
    const prevSong = SONGS[prevIndex];
    audioEngine.loadSong(prevSong);
    if (isPlaying) {
      audioEngine.play();
    }
  };

  const handleSeek = (newTime) => {
    audioEngine.seek(newTime);
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (newVal) => {
    setVolume(newVal);
    if (isMuted) setIsMuted(false);
    audioEngine.setVolume(newVal);
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      audioEngine.setVolume(volume);
    } else {
      setIsMuted(true);
      audioEngine.setVolume(0);
    }
  };

  return (
    <div 
      className="min-h-screen text-slate-100 flex flex-col justify-between relative overflow-x-hidden"
      style={{
        '--theme-accent': currentThemeObj.accent,
        '--theme-glow': currentThemeObj.glow,
      }}
    >
      {/* Faint Night Baseball Stadium Background */}
      <BaseballFieldBackground activeTheme={activeTheme} />

      {/* Clean Navbar */}
      <Navbar
        activeTheme={activeTheme}
        setActiveTheme={setActiveTheme}
        themes={themes}
      />

      {/* Central Single-Page Vinyl Player Hub with Tracklist & Lyrics */}
      <main className="flex-1">
        <VinylPlayerHub
          currentSong={currentSong}
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          playNext={handlePlayNext}
          playPrev={handlePlayPrev}
          currentTime={currentTime}
          duration={duration}
          onSeek={handleSeek}
          volume={volume}
          onVolumeChange={handleVolumeChange}
          isMuted={isMuted}
          toggleMute={toggleMute}
          isShuffle={isShuffle}
          toggleShuffle={() => setIsShuffle(!isShuffle)}
          isLoop={isLoop}
          toggleLoop={() => setIsLoop(!isLoop)}
          onSelectSong={handleSelectSong}
        />
      </main>

      {/* Minimal Footer */}
      <Footer />
    </div>
  );
}
