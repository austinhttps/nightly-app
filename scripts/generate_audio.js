import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.join(__dirname, '..', 'public', 'audio');

// Function to generate a valid 44.1kHz 16-bit stereo WAV buffer
function createWavFile(durationSec, bpm, rootFreq, style = 'pop') {
  const sampleRate = 44100;
  const numChannels = 2;
  const bytesPerSample = 2;
  const blockAlign = numChannels * bytesPerSample;
  const numSamples = Math.floor(sampleRate * durationSec);
  const dataByteLength = numSamples * blockAlign;
  const totalLength = 44 + dataByteLength;

  const buffer = Buffer.alloc(totalLength);

  // RIFF Chunk Descriptor
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(totalLength - 8, 4);
  buffer.write('WAVE', 8);

  // "fmt " sub-chunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // subchunk1size (16 for PCM)
  buffer.writeUInt16LE(1, 20); // audio format (1 = PCM)
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * blockAlign, 28); // byte rate
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(16, 34); // bits per sample

  // "data" sub-chunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataByteLength, 40);

  const beatSec = 60 / bpm;
  const chordScale = [1, 1.25, 1.333, 1.5, 1.667, 1.875, 2.0];

  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const currentBeat = t / beatSec;
    const beatFraction = currentBeat % 1.0;
    const measureFraction = (currentBeat / 4) % 4;

    // 1. Kick Drum (on beat 0 & 2)
    let kick = 0;
    const kickTime = (currentBeat % 2) * beatSec;
    if (kickTime < 0.2) {
      const kickFreq = 120 * Math.exp(-kickTime * 25);
      kick = Math.sin(2 * Math.PI * kickFreq * kickTime) * Math.exp(-kickTime * 15) * 0.45;
    }

    // 2. Snare / Clap (on beat 1 & 3)
    let snare = 0;
    const snareBeat = (currentBeat + 1) % 2;
    const snareTime = snareBeat * beatSec;
    if (snareTime < 0.18) {
      const noise = (Math.random() * 2 - 1);
      const tonal = Math.sin(2 * Math.PI * 220 * snareTime);
      snare = (noise * 0.6 + tonal * 0.4) * Math.exp(-snareTime * 22) * 0.35;
    }

    // 3. Hi-Hats (every eighth note)
    let hihat = 0;
    const hatTime = (currentBeat % 0.5) * beatSec;
    if (hatTime < 0.05) {
      hihat = (Math.random() * 2 - 1) * Math.exp(-hatTime * 80) * 0.12;
    }

    // 4. Bassline (80s pulsing synth bass)
    const chordStep = Math.floor(currentBeat / 4) % 4;
    const bassMultiplier = chordStep === 0 ? 1 : chordStep === 1 ? 0.75 : chordStep === 2 ? 0.888 : 0.667;
    const bassFreq = (rootFreq * 0.5) * bassMultiplier;
    const bassEnv = Math.max(0, 1 - (beatFraction * 0.8));
    const bass = (
      Math.sin(2 * Math.PI * bassFreq * t) * 0.7 +
      Math.sin(4 * Math.PI * bassFreq * t) * 0.3
    ) * bassEnv * 0.28;

    // 5. Dream-pop synth pad / chords (lush stereo spread)
    const chordOffset = chordStep === 0 ? [1, 1.25, 1.5] : chordStep === 1 ? [0.75, 1, 1.333] : chordStep === 2 ? [0.888, 1.125, 1.5] : [0.667, 1, 1.25];
    const padL = (
      Math.sin(2 * Math.PI * rootFreq * chordOffset[0] * t) +
      Math.sin(2 * Math.PI * rootFreq * chordOffset[1] * t) * 0.7
    ) * 0.1;
    const padR = (
      Math.sin(2 * Math.PI * rootFreq * chordOffset[1] * t) +
      Math.sin(2 * Math.PI * rootFreq * chordOffset[2] * t) * 0.7
    ) * 0.1;

    // 6. Melodic guitar/synth lead riff
    const leadNoteIndex = Math.floor(currentBeat * 2) % chordScale.length;
    const leadFreq = rootFreq * 2 * chordScale[leadNoteIndex];
    const leadEnv = Math.exp(-(beatFraction % 0.5) * 6);
    const lead = Math.sin(2 * Math.PI * leadFreq * t) * leadEnv * 0.12;

    // Combine left and right channel with stereo width
    let sampleL = kick + snare + hihat + bass + padL + (lead * 0.9);
    let sampleR = kick + snare + hihat + bass + padR + (lead * 1.1);

    // Fade in and out
    const fadeIn = Math.min(1, t / 1.5);
    const fadeOut = Math.min(1, (durationSec - t) / 2.0);
    const masterEnv = fadeIn * fadeOut;

    sampleL = Math.max(-1, Math.min(1, sampleL * masterEnv * 0.75));
    sampleR = Math.max(-1, Math.min(1, sampleR * masterEnv * 0.75));

    buffer.writeInt16LE(Math.floor(sampleL * 32767), offset);
    buffer.writeInt16LE(Math.floor(sampleR * 32767), offset + 2);
    offset += 4;
  }

  return buffer;
}

const tracks = [
  { file: 'miss-when-you-missed-me.wav', duration: 32, bpm: 124, root: 261.63 },
  { file: 'the-king-of-broadway.wav', duration: 32, bpm: 122, root: 329.63 },
  { file: 'american-baby.wav', duration: 32, bpm: 126, root: 220.0 },
  { file: 'blue-jeans.wav', duration: 32, bpm: 114, root: 293.66 },
  { file: 'angel-in-the-outfield.wav', duration: 32, bpm: 108, root: 196.0 },
  { file: 'bar-closing-song.wav', duration: 32, bpm: 118, root: 246.94 },
  { file: 'ballerina.wav', duration: 32, bpm: 120, root: 261.63 },
  { file: 'the-void.wav', duration: 32, bpm: 112, root: 207.65 },
  { file: 'fever-dream.wav', duration: 32, bpm: 125, root: 311.13 },
  { file: 'songs-to-drive-to.wav', duration: 32, bpm: 120, root: 349.23 },
  { file: 'nashville-2am.wav', duration: 32, bpm: 116, root: 233.08 },
  { file: 'hate-my-favorite-band.wav', duration: 32, bpm: 124, root: 261.63 },
  { file: 'wear-your-heart-out.wav', duration: 32, bpm: 118, root: 220.0 },
  { file: 'like-i-do.wav', duration: 32, bpm: 128, root: 196.0 },
  { file: 'radio-silence.wav', duration: 32, bpm: 120, root: 246.94 },
  { file: 'the-movies.wav', duration: 32, bpm: 110, root: 220.0 },
  { file: 'twenty-something.wav', duration: 32, bpm: 115, root: 164.81 },
  { file: 'phantom.wav', duration: 32, bpm: 104, root: 146.83 },
  { file: 'lover-friend.wav', duration: 32, bpm: 122, root: 207.65 }
];

console.log('Generating audio files in public/audio/...');
tracks.forEach(track => {
  const filePath = path.join(outputDir, track.file);
  const wavBuffer = createWavFile(track.duration, track.bpm, track.root);
  fs.writeFileSync(filePath, wavBuffer);
  console.log(`✓ Created: ${track.file} (${track.duration}s)`);
});

console.log('All audio files generated successfully!');
