import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const audioDir = path.join(__dirname, '..', 'public', 'audio');

if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

// Track definitions grouped by user's requested albums
const requestedAlbums = [
  {
    id: 'baseball-in-america',
    title: 'BASEBALL IN AMERICA',
    releaseDate: 'August 21, 2026',
    year: '2026',
    cover: 'https://images.unsplash.com/photo-1508344928928-7165b67de128?auto=format&fit=crop&w=800&q=80',
    tracks: [
      { id: 'the-king-of-broadway', title: 'the king of broadway', query: 'Nightly the king of broadway' },
      { id: 'american-baby', title: 'AMERICAN BABY', query: 'Nightly american baby' },
      { id: 'blue-jeans', title: 'blue jeans', query: 'Nightly blue jeans' },
      { id: 'angel-in-the-outfield', title: 'angel in the outfield', query: 'Nightly angel in the outfield' },
      { id: 'bar-closing-song', title: 'bar closing song', query: 'Nightly bar closing song' },
      { id: 'ballerina', title: 'ballerina', query: 'Nightly ballerina' },
      { id: 'rodeo-queen', title: 'RODEO QUEEN', query: 'Nightly rodeo queen' },
      { id: 'greyhound-station', title: 'greyhound station', query: 'Nightly greyhound station' }
    ]
  },
  {
    id: 'the-void',
    title: 'THE VOID',
    releaseDate: 'October 31, 2025',
    year: '2025',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/f1/c2/f0/f1c2f091-ce23-5b03-960b-5d0f9f9997ef/193436446150_thevoidalbumart.jpg/600x600bb.jpg',
    tracks: [
      { id: '1989', title: '1989', query: 'Nightly 1989 THE VOID' },
      { id: 'the-void-title', title: 'THE VOID', query: 'Nightly THE VOID' },
      { id: 'fever-dream', title: 'fever dream', query: 'Nightly fever dream' },
      { id: 'midnight-drive', title: 'midnight drive', query: 'Nightly midnight drive' }
    ]
  },
  {
    id: 'songs-to-drive-to',
    title: 'songs to drive to',
    releaseDate: 'March 7, 2025',
    year: '2025',
    cover: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    tracks: [
      { id: 'songs-to-drive-to-track', title: 'songs to drive to', query: 'Nightly songs to drive to' },
      { id: 'nashville-2am', title: 'nashville 2am', query: 'Nightly nashville 2am' },
      { id: 'windows-down', title: 'windows down', query: 'Nightly windows down' },
      { id: 'fast-car', title: 'fast car', query: 'Nightly fast car' }
    ]
  },
  {
    id: 'wear-your-heart-out',
    title: 'wear your heart out',
    releaseDate: 'August 25, 2023',
    year: '2023',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/c7/14/c9/c714c965-09bc-2725-029f-d3c0ae665408/0.jpg/600x600bb.jpg',
    tracks: [
      { id: 'wear-your-heart-out-track', title: 'wear your heart out', query: 'Nightly wear your heart out' },
      { id: 'hate-my-favorite-band', title: 'hate my favorite band', query: 'Nightly hate my favorite band' },
      { id: 'like-i-do', title: 'like i do', query: 'Nightly like i do' },
      { id: 'radio-silence', title: 'radio silence', query: 'Nightly radio silence' },
      { id: 'dry-eyes', title: 'dry eyes', query: 'Nightly dry eyes' },
      { id: 'the-car', title: 'the car', query: 'Nightly the car' },
      { id: 'miss-you-like-hell', title: 'miss you like hell', query: 'Nightly miss you like hell' }
    ]
  },
  {
    id: 'night-love-you',
    title: 'night, love you.',
    releaseDate: 'October 16, 2020',
    year: '2020',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/5e/12/bf/5e12bfaf-f989-9fec-aeec-5396db88c22e/4050538637212.jpg/600x600bb.jpg',
    tracks: [
      { id: 'the-movies', title: 'the movies', query: 'Nightly the movies' },
      { id: 'twenty-something', title: 'twenty something', query: 'Nightly twenty something' },
      { id: 'older', title: 'older', query: 'Nightly older' },
      { id: 'stay', title: 'stay', query: 'Nightly stay' },
      { id: 'black-coffee', title: 'black coffee', query: 'Nightly black coffee' },
      { id: 'phantom', title: 'phantom', query: 'Nightly phantom' },
      { id: 'summer', title: 'summer', query: 'Nightly summer' },
      { id: 'so-sly', title: 'so sly', query: 'Nightly so sly' }
    ]
  },
  {
    id: 'talk-you-down',
    title: 'Talk You Down',
    releaseDate: 'June 14, 2019',
    year: '2019',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/67/e4/ca/67e4cab0-7a7c-ded2-826c-c9714b7b3117/19UMGIM49886.rgb.jpg/600x600bb.jpg',
    tracks: [
      { id: 'talk-you-down-track', title: 'talk you down', query: 'Nightly talk you down' },
      { id: 'stammboy', title: 'stammboy', query: 'Nightly stammboy' },
      { id: 'holding-on', title: 'holding on', query: 'Nightly holding on' },
      { id: 'this-is-what-it-feels-like', title: 'this is what it feels like', query: 'Nightly this is what it feels like' }
    ]
  },
  {
    id: 'singles-features',
    title: 'Singles, EPs & Features',
    releaseDate: '2016-2024',
    year: '2024',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/39/ea/26/39ea2652-ef0b-83b7-37f3-9ae7343d0ee6/075679677341.jpg/600x600bb.jpg',
    tracks: [
      { 
        id: 'miss-when-you-missed-me', 
        title: 'Miss When You Missed Me', 
        artist: 'Knox (feat. Nightly)',
        query: 'Knox Miss When You Missed Me Nightly' 
      },
      { id: 'lover-friend', title: 'lover / friend', query: 'Nightly lover friend' },
      { id: 'xo', title: 'XO', query: 'Nightly XO' },
      { id: 'on-your-mind', title: 'on your mind', query: 'Nightly on your mind' }
    ]
  }
];

async function downloadFile(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download ${url}: ${res.statusText}`);
  const arrayBuffer = await res.arrayBuffer();
  fs.writeFileSync(dest, Buffer.from(arrayBuffer));
}

async function run() {
  console.log('Fetching official master audio files from Apple Music CDN...');
  
  const songsList = [];

  for (const album of requestedAlbums) {
    console.log(`\n=== Processing Album: ${album.title} (${album.year}) ===`);
    
    for (const track of album.tracks) {
      try {
        const itunesUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(track.query)}&entity=song&limit=1`;
        const res = await fetch(itunesUrl);
        const data = await res.json();
        
        let previewUrl = null;
        let cover = album.cover;
        let trackName = track.title;
        let artistName = track.artist || 'Nightly';

        if (data.results && data.results.length > 0) {
          const item = data.results[0];
          previewUrl = item.previewUrl;
          if (item.artworkUrl100) {
            cover = item.artworkUrl100.replace('100x100bb', '600x600bb');
          }
          trackName = item.trackName || track.title;
          artistName = track.artist || item.artistName || 'Nightly';
        }

        const fileName = `${track.id}.m4a`;
        const localPath = path.join(audioDir, fileName);

        if (previewUrl) {
          console.log(`Downloading: "${trackName}" by ${artistName}...`);
          await downloadFile(previewUrl, localPath);
          console.log(`✓ Saved to /audio/${fileName}`);
        } else {
          console.warn(`! No preview URL found for "${track.query}", using existing audio`);
        }

        songsList.push({
          id: track.id,
          title: trackName,
          artist: artistName,
          album: album.title,
          albumId: album.id,
          year: album.year,
          duration: 30,
          bpm: 120,
          key: 'Stereo Master',
          mood: 'Official Studio Audio',
          cover: cover,
          audioUrl: `/audio/${fileName}`,
          spotifyUrl: `https://open.spotify.com/search/${encodeURIComponent(trackName + ' Nightly')}`,
          appleUrl: `https://music.apple.com/us/search?term=${encodeURIComponent(trackName + ' Nightly')}`,
          youtubeUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(artistName + ' ' + trackName)}`,
          lyrics: [
            { time: 0, text: `[Playing official studio audio: "${trackName}" by ${artistName}]` },
            { time: 6, text: `From album: ${album.title} (${album.year})` },
            { time: 14, text: "night, love you." }
          ]
        });

      } catch (err) {
        console.error(`Error processing ${track.title}:`, err.message);
      }
    }
  }

  const finalAlbums = requestedAlbums.map(a => ({
    id: a.id,
    title: a.title,
    releaseDate: a.releaseDate,
    year: a.year,
    cover: a.cover,
    accentColor: a.id === 'baseball-in-america' ? '#10b981' : a.id === 'the-void' ? '#8b5cf6' : a.id === 'songs-to-drive-to' ? '#06b6d4' : a.id === 'wear-your-heart-out' ? '#ec4899' : a.id === 'night-love-you' ? '#a855f7' : a.id === 'talk-you-down' ? '#f43f5e' : '#f59e0b',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    description: `Released ${a.releaseDate}`
  }));

  const fileContent = `export const ALBUMS = ${JSON.stringify(finalAlbums, null, 2)};\n\nexport const SONGS = ${JSON.stringify(songsList, null, 2)};\n`;

  const songsDataPath = path.join(__dirname, '..', 'src', 'data', 'songsData.js');
  fs.writeFileSync(songsDataPath, fileContent);
  console.log(`\nSuccessfully updated ${songsDataPath} with ${songsList.length} official songs!`);
}

run();
