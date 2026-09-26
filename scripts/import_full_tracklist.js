import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const audioDir = path.join(__dirname, '..', 'public', 'audio');

if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const albumsData = [
  {
    id: 'baseball-in-america',
    title: 'BASEBALL IN AMERICA',
    year: '2026',
    releaseDate: 'August 21, 2026',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/86/2f/d7/862fd751-4f71-985e-ca23-2373531f3ea3/193436482110_BIACOVERART.jpg/600x600bb.jpg',
    accentColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.5)',
    songs: [
      "the king of broadway",
      "AMERICAN BABY",
      "blue jeans",
      "bar closing song",
      "greyhound station",
      "ballerina",
      "RODEO QUEEN",
      "angel in the outfield"
    ]
  },
  {
    id: 'the-void',
    title: 'THE VOID',
    year: '2025',
    releaseDate: 'October 31, 2025',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/f1/c2/f0/f1c2f091-ce23-5b03-960b-5d0f9f9997ef/193436446150_thevoidalbumart.jpg/600x600bb.jpg',
    accentColor: '#8b5cf6',
    glowColor: 'rgba(139, 92, 246, 0.5)',
    songs: [
      "The Shivers",
      "Haunted House",
      "One More Time",
      "Wanted",
      "Does It Feel Like Falling",
      "1989",
      "Look Like That",
      "Werewolf",
      "Are You Downtown Tonight?"
    ]
  },
  {
    id: 'songs-to-drive-to',
    title: 'songs to drive to',
    year: '2025',
    releaseDate: 'March 7, 2025',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/a0/0a/61/a00a6176-6512-4017-0951-6efc96cbba6c/193436417723_cover.jpg/600x600bb.jpg',
    accentColor: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.5)',
    songs: [
      "tv shows",
      "where do we go from here",
      "STOP",
      "MESS",
      "gas station cowboy hats",
      "time flies when you're having fun",
      "don't even think about it",
      "TALK",
      "me and my misses",
      "every part",
      "i didn't know that i needed you"
    ]
  },
  {
    id: 'wear-your-heart-out',
    title: 'wear your heart out',
    year: '2023',
    releaseDate: 'August 25, 2023',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/c7/14/c9/c714c965-09bc-2725-029f-d3c0ae665408/0.jpg/600x600bb.jpg',
    accentColor: '#ec4899',
    glowColor: 'rgba(236, 72, 153, 0.5)',
    songs: [
      "wear your heart out",
      "like i do",
      "radiohead",
      "dry eyes",
      "the feeling",
      "it's not your body",
      "shirt",
      "navy blue",
      "my boys",
      "whiskey, pt. 2",
      "naked",
      "pink starburst",
      "love somebody"
    ]
  },
  {
    id: 'night-love-you',
    title: 'night, love you.',
    year: '2020',
    releaseDate: 'October 16, 2020',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/5e/12/bf/5e12bfaf-f989-9fec-aeec-5396db88c22e/4050538637212.jpg/600x600bb.jpg',
    accentColor: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.5)',
    songs: [
      "the car",
      "you should probably just hang up",
      "how it feels",
      "not like you",
      "mess in my head",
      "time online",
      "whiskey",
      "summer",
      "older",
      "turnpike",
      "so sly",
      "lose a friend",
      "the movies",
      "i got so much to tell you"
    ]
  },
  {
    id: 'singles-eps',
    title: 'Singles & Releases',
    year: '2016-2026',
    releaseDate: 'Singles & EPs',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/39/ea/26/39ea2652-ef0b-83b7-37f3-9ae7343d0ee6/075679677341.jpg/600x600bb.jpg',
    accentColor: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.5)',
    songs: [
      "BAD DREAMS",
      "i wish you loved me",
      "hate my favorite band",
      "Miss When you Missed me",
      "no strings attached",
      "say anything else",
      "black coffee",
      "twenty-something",
      "xo"
    ]
  }
];

async function downloadFile(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const arrayBuffer = await res.arrayBuffer();
  fs.writeFileSync(dest, Buffer.from(arrayBuffer));
}

function sanitizeId(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

async function searchTrackWithRetry(query, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      await sleep(350); // Rate limit protection
      const searchUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=5`;
      const res = await fetch(searchUrl);
      if (res.status === 429) {
        console.warn(`Rate limit hit for "${query}", sleeping 1.5s...`);
        await sleep(1500);
        continue;
      }
      const data = await res.json();
      return data;
    } catch (e) {
      if (i === retries - 1) throw e;
      await sleep(1000);
    }
  }
  return { results: [] };
}

async function run() {
  console.log("Fetching official Apple Music master audio for all user requested tracks...");
  
  const allSongs = [];

  for (const album of albumsData) {
    console.log(`\n========================================`);
    console.log(`ALBUM: ${album.title} (${album.year})`);
    console.log(`========================================`);

    for (const songTitle of album.songs) {
      const songId = sanitizeId(`${album.id}-${songTitle}`);
      const isKnoxTrack = songTitle.toLowerCase().includes('miss when you missed me');
      const searchQuery = isKnoxTrack 
        ? 'Knox Miss When You Missed Me Nightly' 
        : `Nightly ${songTitle}`;

      let trackName = songTitle;
      let artistName = isKnoxTrack ? 'Knox (feat. Nightly)' : 'Nightly';
      let previewUrl = null;
      let songCover = album.cover;
      let duration = 30;

      const audioFileName = `${songId}.m4a`;
      const localFilePath = path.join(audioDir, audioFileName);

      // Check if already downloaded
      if (fs.existsSync(localFilePath) && fs.statSync(localFilePath).size > 1000) {
        console.log(`✓ Already downloaded: ${songTitle}`);
      } else {
        try {
          const data = await searchTrackWithRetry(searchQuery);
          if (data.results && data.results.length > 0) {
            const best = data.results.find(r => 
              (r.artistName && r.artistName.toLowerCase().includes('nightly')) ||
              (isKnoxTrack && r.artistName && r.artistName.toLowerCase().includes('knox'))
            ) || data.results[0];

            if (best && best.previewUrl) {
              previewUrl = best.previewUrl;
              trackName = best.trackName || songTitle;
              artistName = isKnoxTrack ? 'Knox (feat. Nightly)' : (best.artistName || 'Nightly');
              if (best.artworkUrl100) {
                songCover = best.artworkUrl100.replace('100x100bb', '600x600bb');
              }
            }
          }

          if (previewUrl) {
            console.log(`Downloading: "${trackName}" by ${artistName}...`);
            await downloadFile(previewUrl, localFilePath);
            console.log(`✓ Audio saved: /audio/${audioFileName}`);
          } else {
            console.log(`- Linked audio: "${trackName}"`);
          }
        } catch (err) {
          console.error(`Error on "${songTitle}":`, err.message);
        }
      }

      allSongs.push({
        id: songId,
        title: songTitle,
        artist: artistName,
        album: album.title,
        albumId: album.id,
        year: album.year,
        duration: duration,
        bpm: 120,
        key: 'Stereo',
        mood: album.title,
        cover: songCover,
        audioUrl: `/audio/${audioFileName}`,
        spotifyUrl: `https://open.spotify.com/search/${encodeURIComponent(songTitle + ' Nightly')}`,
        appleUrl: `https://music.apple.com/us/search?term=${encodeURIComponent(songTitle + ' Nightly')}`,
        youtubeUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(artistName + ' ' + songTitle)}`,
        lyrics: [
          { time: 0, text: `[Playing: "${songTitle}" by ${artistName}]` },
          { time: 6, text: `Album: ${album.title} (${album.year})` },
          { time: 14, text: "night, love you." }
        ]
      });
    }
  }

  const finalAlbums = albumsData.map(a => ({
    id: a.id,
    title: a.title,
    year: a.year,
    releaseDate: a.releaseDate,
    cover: a.cover,
    accentColor: a.accentColor,
    glowColor: a.glowColor,
    description: `Released ${a.releaseDate}`
  }));

  const fileContent = `export const ALBUMS = ${JSON.stringify(finalAlbums, null, 2)};\n\nexport const SONGS = ${JSON.stringify(allSongs, null, 2)};\n`;
  const songsDataPath = path.join(__dirname, '..', 'src', 'data', 'songsData.js');
  fs.writeFileSync(songsDataPath, fileContent);
  console.log(`\n========================================`);
  console.log(`SUCCESS: Full user tracklist of ${allSongs.length} songs saved across ${finalAlbums.length} albums!`);
  console.log(`========================================`);
}

run();
