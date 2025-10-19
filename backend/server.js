console.log("Starting backend server...");
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const { GetListByKeyword } = require('youtube-search-api');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/musicDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Connected to MongoDB');
  initializeSampleData();
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

// Song Schema with Genre
const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  album: String,
  genre: String,
  duration: String,
  releaseYear: Number,
  coverArt: String,
  audioUrl: String,
});

const Song = mongoose.model('Song', songSchema);

// Sample data initialization
async function initializeSampleData() {
  const count = await Song.countDocuments();
  if (count === 0) {
    console.log('📀 Adding sample music data...');
    const sampleSongs = [
      // Pop Genre
      { title: 'Shape of You', artist: 'Ed Sheeran', album: 'Divide', genre: 'Pop', duration: '3:53', releaseYear: 2017, coverArt: 'https://i.scdn.co/image/ab67616d0000b2734e0362c225863f6efed3a645', audioUrl: '/audio/sample.mp3' },
      { title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', genre: 'Pop', duration: '3:20', releaseYear: 2020, coverArt: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36', audioUrl: '/audio/sample.mp3' },
      { title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', genre: 'Pop', duration: '3:23', releaseYear: 2020, coverArt: 'https://i.scdn.co/image/ab67616d0000b273c8e1e45fb3d574f0caf247a3', audioUrl: '/audio/sample.mp3' },
      { title: 'Anti-Hero', artist: 'Taylor Swift', album: 'Midnights', genre: 'Pop', duration: '3:20', releaseYear: 2022, coverArt: 'https://i.scdn.co/image/ab67616d0000b273bb54dde68cd23e2a268ae0f5', audioUrl: '/audio/sample.mp3' },
      { title: 'As It Was', artist: 'Harry Styles', album: 'Harry\'s House', genre: 'Pop', duration: '2:47', releaseYear: 2022, coverArt: 'https://i.scdn.co/image/ab67616d0000b2732e8ed79e177ff6011076f5f0', audioUrl: '/audio/sample.mp3' },
      
      // Rock Genre
      { title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', genre: 'Rock', duration: '5:55', releaseYear: 1975, coverArt: 'https://i.scdn.co/image/ab67616d0000b273ce4f1737bc8a646c8c4bd25a', audioUrl: '/audio/sample.mp3' },
      { title: 'Stairway to Heaven', artist: 'Led Zeppelin', album: 'Led Zeppelin IV', genre: 'Rock', duration: '8:02', releaseYear: 1971, coverArt: 'https://i.scdn.co/image/ab67616d0000b2735bac6e2c3e22c42f20a9b1ad', audioUrl: '/audio/sample.mp3' },
      { title: 'Hotel California', artist: 'Eagles', album: 'Hotel California', genre: 'Rock', duration: '6:30', releaseYear: 1976, coverArt: 'https://i.scdn.co/image/ab67616d0000b273750b5d387e8ac8bb33a2dd87', audioUrl: '/audio/sample.mp3' },
      { title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses', album: 'Appetite for Destruction', genre: 'Rock', duration: '5:56', releaseYear: 1987, coverArt: 'https://i.scdn.co/image/ab67616d0000b27321ebf49b3292c3f0f575f0f5', audioUrl: '/audio/sample.mp3' },
      
      // Hip-Hop/Rap Genre
      { title: 'HUMBLE.', artist: 'Kendrick Lamar', album: 'DAMN.', genre: 'Hip-Hop', duration: '2:57', releaseYear: 2017, coverArt: 'https://i.scdn.co/image/ab67616d0000b2738b52c6b9bc4e43d873869699', audioUrl: '/audio/sample.mp3' },
      { title: 'God\'s Plan', artist: 'Drake', album: 'Scorpion', genre: 'Hip-Hop', duration: '3:18', releaseYear: 2018, coverArt: 'https://i.scdn.co/image/ab67616d0000b273f907de96b9a4fbc04accc0d5', audioUrl: '/audio/sample.mp3' },
      { title: 'Sicko Mode', artist: 'Travis Scott', album: 'Astroworld', genre: 'Hip-Hop', duration: '5:12', releaseYear: 2018, coverArt: 'https://i.scdn.co/image/ab67616d0000b273072e9faef2ef7b6db63834a3', audioUrl: '/audio/sample.mp3' },
      
      // Electronic/EDM Genre
      { title: 'Wake Me Up', artist: 'Avicii', album: 'True', genre: 'Electronic', duration: '4:09', releaseYear: 2013, coverArt: 'https://i.scdn.co/image/ab67616d0000b273e5a95573f1b91611e0557e4c', audioUrl: '/audio/sample.mp3' },
      { title: 'Titanium', artist: 'David Guetta ft. Sia', album: 'Nothing but the Beat', genre: 'Electronic', duration: '4:05', releaseYear: 2011, coverArt: 'https://i.scdn.co/image/ab67616d0000b2730f9f214b52eaac2ef3bbb0c7', audioUrl: '/audio/sample.mp3' },
      { title: 'Clarity', artist: 'Zedd ft. Foxes', album: 'Clarity', genre: 'Electronic', duration: '4:32', releaseYear: 2012, coverArt: 'https://i.scdn.co/image/ab67616d0000b27392d36b41c1c6c1024e4d50b0', audioUrl: '/audio/sample.mp3' },
      
      // R&B/Soul Genre
      { title: 'Thinking Out Loud', artist: 'Ed Sheeran', album: 'X', genre: 'R&B', duration: '4:41', releaseYear: 2014, coverArt: 'https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96', audioUrl: '/audio/sample.mp3' },
      { title: 'Stay With Me', artist: 'Sam Smith', album: 'In the Lonely Hour', genre: 'R&B', duration: '2:52', releaseYear: 2014, coverArt: 'https://i.scdn.co/image/ab67616d0000b273fbc97bb3c22e5ee7b2d0cb48', audioUrl: '/audio/sample.mp3' },
      
      // Jazz Genre
      { title: 'Fly Me to the Moon', artist: 'Frank Sinatra', album: 'It Might as Well Be Swing', genre: 'Jazz', duration: '2:28', releaseYear: 1964, coverArt: 'https://i.scdn.co/image/ab67616d0000b27326d9d68a0a9e5acee670e8c0', audioUrl: '/audio/sample.mp3' },
      { title: 'What a Wonderful World', artist: 'Louis Armstrong', album: 'What a Wonderful World', genre: 'Jazz', duration: '2:21', releaseYear: 1967, coverArt: 'https://i.scdn.co/image/ab67616d0000b2734c8f092adf8b0b0c46bb1f5e', audioUrl: '/audio/sample.mp3' },
    ];
    
    await Song.insertMany(sampleSongs);
    console.log('✅ Sample data added successfully!');
  }
}

// ==================================
// YOUTUBE MUSIC INTEGRATION 🎬
// ==================================

// Search YouTube for Music Videos
async function searchYouTube(query, limit = 20) {
  try {
    console.log(`🔍 Searching YouTube for: "${query}"`);
    
    // Add "official audio" or "official video" to get better music results
    const searchQuery = query + ' official audio';
    const results = await GetListByKeyword(searchQuery, false, limit);
    
    if (!results || !results.items || results.items.length === 0) {
      console.log('❌ No YouTube results found');
      return null;
    }
    
    // Transform YouTube data to our format
    const tracks = results.items
      .filter(item => item.type === 'video') // Only get videos, not playlists
      .map(video => {
        // Extract artist and title from video title
        const titleParts = video.title.split('-');
        const artist = titleParts.length > 1 ? titleParts[0].trim() : 'Unknown Artist';
        const title = titleParts.length > 1 ? titleParts.slice(1).join('-').trim() : video.title;
        
        return {
          _id: video.id,
          title: title.replace(/\(Official.*?\)/gi, '').replace(/\[.*?\]/g, '').trim(),
          artist: artist,
          album: 'YouTube Music',
          genre: 'Various',
          duration: video.length?.simpleText || 'N/A',
          releaseYear: new Date().getFullYear(),
          coverArt: video.thumbnail?.thumbnails?.[0]?.url || 'https://via.placeholder.com/200',
          audioUrl: `https://www.youtube.com/embed/${video.id}`, // YouTube embed URL
          youtubeUrl: `https://www.youtube.com/watch?v=${video.id}`,
          youtubeId: video.id,
          views: video.viewCount || '0'
        };
      });
    
    console.log(`✅ Found ${tracks.length} songs from YouTube`);
    return tracks;
  } catch (err) {
    console.error('❌ YouTube search error:', err.message);
    return null;
  }
}

// Format duration from ms to mm:ss
function formatDuration(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds.padStart(2, '0')}`;
}

// Routes
// Get all songs
app.get('/songs', async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search songs by query (title, artist, album, genre)
// NOW WITH YOUTUBE INTEGRATION! 🎬
app.get('/api/search', async (req, res) => {
  try {
    const query = req.query.q || '';
    
    // Try YouTube first
    const youtubeResults = await searchYouTube(query);
    
    if (youtubeResults && youtubeResults.length > 0) {
      return res.json(youtubeResults);
    }
    
    // Fallback to MongoDB
    console.log('⚠️  Using MongoDB fallback');
    if (!query) {
      const songs = await Song.find().limit(20);
      return res.json(songs);
    }
    
    const songs = await Song.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { artist: { $regex: query, $options: 'i' } },
        { album: { $regex: query, $options: 'i' } },
        { genre: { $regex: query, $options: 'i' } },
      ]
    });
    
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get autocomplete suggestions
// WITH YOUTUBE INTEGRATION! 🎬
app.get('/api/suggestions', async (req, res) => {
  try {
    const query = req.query.q || '';
    
    if (!query || query.length < 2) {
      return res.json([]);
    }
    
    // Try YouTube for suggestions
    const youtubeResults = await searchYouTube(query, 5);
    
    if (youtubeResults && youtubeResults.length > 0) {
      const suggestions = [];
      const seen = new Set();
      
      youtubeResults.forEach(song => {
        if (!seen.has(song.title)) {
          suggestions.push({ type: 'title', value: song.title });
          seen.add(song.title);
        }
        if (!seen.has(song.artist)) {
          suggestions.push({ type: 'artist', value: song.artist });
          seen.add(song.artist);
        }
      });
      
      return res.json(suggestions.slice(0, 5));
    }
    
    // Fallback to MongoDB
    const songs = await Song.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { artist: { $regex: query, $options: 'i' } },
        { album: { $regex: query, $options: 'i' } },
      ]
    }).limit(5);
    
    // Create unique suggestions
    const suggestions = [];
    const seen = new Set();
    
    songs.forEach(song => {
      if (!seen.has(song.title) && song.title.toLowerCase().includes(query.toLowerCase())) {
        suggestions.push({ type: 'title', value: song.title });
        seen.add(song.title);
      }
      if (!seen.has(song.artist) && song.artist.toLowerCase().includes(query.toLowerCase())) {
        suggestions.push({ type: 'artist', value: song.artist });
        seen.add(song.artist);
      }
    });
    
    res.json(suggestions.slice(0, 5));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get songs by genre
app.get('/api/genre/:genre', async (req, res) => {
  try {
    const songs = await Song.find({ genre: req.params.genre });
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all genres
app.get('/api/genres', async (req, res) => {
  try {
    const genres = await Song.distinct('genre');
    res.json(genres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new song
app.post('/songs', async (req, res) => {
  try {
    const newSong = new Song(req.body);
    await newSong.save();
    res.json(newSong);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => {
  console.log('🎵 Server running on http://localhost:5000');
  console.log('🎬 YouTube Music Integration Active!');
  console.log('✅ Search for ANY song - No login required!');
  console.log('🎶 Full-length songs available!');
});
