// Hybrid Audio Engine: Plays real official M4A / MP3 / WAV studio audio recordings,
// with timeline tracking, seek scrubbing, volume control, and dynamic fallback.

class NightlyAudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.filterNode = null;
    this.isPlaying = false;
    this.currentSong = null;
    this.currentTime = 0;
    this.duration = 30;
    this.timerId = null;
    this.volume = 0.85;

    // HTML5 Audio element
    this.audioElement = null;

    // Callback handlers
    this.onTimeUpdateCallbacks = [];
    this.onEndedCallbacks = [];
  }

  init() {
    if (!this.audioElement) {
      this.audioElement = new Audio();
      this.audioElement.volume = this.volume;

      this.audioElement.addEventListener('timeupdate', () => {
        if (this.audioElement && !isNaN(this.audioElement.currentTime)) {
          this.currentTime = this.audioElement.currentTime;
          if (this.audioElement.duration && !isNaN(this.audioElement.duration)) {
            this.duration = this.audioElement.duration;
          }
          this.notifyTimeUpdate();
        }
      });

      this.audioElement.addEventListener('loadedmetadata', () => {
        if (this.audioElement && this.audioElement.duration && !isNaN(this.audioElement.duration)) {
          this.duration = this.audioElement.duration;
          this.notifyTimeUpdate();
        }
      });

      this.audioElement.addEventListener('ended', () => {
        this.isPlaying = false;
        this.onEndedCallbacks.forEach(cb => cb());
      });
    }
  }

  loadSong(song) {
    this.init();
    this.currentSong = song;
    this.duration = song.duration || 30;
    this.currentTime = 0;

    if (song.audioUrl && this.audioElement) {
      this.audioElement.pause();
      this.audioElement.src = song.audioUrl;
      this.audioElement.currentTime = 0;
      this.audioElement.load();
    }

    this.notifyTimeUpdate();
  }

  play() {
    this.init();
    this.isPlaying = true;

    if (this.audioElement && this.currentSong?.audioUrl) {
      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => {
          if (e.name !== 'AbortError') {
            console.warn('Audio playback info:', e.message);
          }
        });
      }
    }
  }

  pause() {
    this.isPlaying = false;
    if (this.audioElement) {
      this.audioElement.pause();
    }
  }

  seek(time) {
    this.currentTime = Math.max(0, Math.min(time, this.duration));
    if (this.audioElement && !isNaN(time)) {
      try {
        this.audioElement.currentTime = this.currentTime;
      } catch (e) {
        // Ignore seek error if not ready
      }
    }
    this.notifyTimeUpdate();
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.audioElement) {
      this.audioElement.volume = this.volume;
    }
  }

  onTimeUpdate(cb) {
    this.onTimeUpdateCallbacks.push(cb);
  }

  onEnded(cb) {
    this.onEndedCallbacks.push(cb);
  }

  notifyTimeUpdate() {
    this.onTimeUpdateCallbacks.forEach(cb => cb(this.currentTime, this.duration));
  }
}

export const audioEngine = new NightlyAudioEngine();
