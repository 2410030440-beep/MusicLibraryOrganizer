require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const { GetListByKeyword } = require('youtube-search-api');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();

// CORS Configuration - Allow both local and production URLs
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001', 
  'http://localhost:3002',
  process.env.FRONTEND_URL,  // Production frontend URL from environment variable
  /https:\/\/.*\.vercel\.app$/,  // All Vercel deployments
  /https:\/\/.*\.netlify\.app$/,  // All Netlify deployments
].filter(Boolean);

app.use(cors({ 
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list or matches regex patterns
    const isAllowed = allowedOrigins.some(allowed => {
      if (typeof allowed === 'string') return allowed === origin;
      if (allowed instanceof RegExp) return allowed.test(origin);
      return false;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.log('Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true 
}));
app.use(express.json());
app.use(cookieParser());

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

// Connect to MongoDB (use environment variable in production)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/musicDB';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Connected to MongoDB');
  initializeSampleData();
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Favorite' }],
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Favorite Song Schema
const favoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  songId: { type: String, required: true },
  title: String,
  artist: String,
  album: String,
  language: { type: String, default: 'English' }, // Telugu, Hindi, Bengali, English, Japanese, Korean, etc.
  coverArt: String,
  audioUrl: String,
  youtubeUrl: String,
  youtubeId: String,
  addedAt: { type: Date, default: Date.now }
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

// Song Schema (existing)
const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  album: String,
  genre: String,
  language: String,
  duration: String,
  releaseYear: Number,
  coverArt: String,
  audioUrl: String,
});

const Song = mongoose.model('Song', songSchema);

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

// ==================================
// AUTHENTICATION ROUTES
// ==================================

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const user = new User({
      email,
      password: hashedPassword,
      name
    });
    
    await user.save();
    
    // Generate JWT
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    
    res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
    
    res.status(201).json({
      message: 'User created successfully',
      user: { id: user._id, email: user.email, name: user.name },
      token
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT
    const expiresIn = rememberMe ? '30d' : '7d';
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn });
    
    const maxAge = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000;
    res.cookie('token', token, { httpOnly: true, maxAge });
    
    res.json({
      message: 'Login successful',
      user: { id: user._id, email: user.email, name: user.name },
      token
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Logout
app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

// Get current user
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ==================================
// FAVORITES ROUTES
// ==================================

// Add to favorites
app.post('/api/favorites', authenticateToken, async (req, res) => {
  try {
    const { songId, title, artist, album, language, coverArt, audioUrl, youtubeUrl, youtubeId } = req.body;
    
    // Check if already favorited
    const existing = await Favorite.findOne({ userId: req.user.userId, songId });
    if (existing) {
      return res.status(400).json({ message: 'Song already in favorites' });
    }
    
    const favorite = new Favorite({
      userId: req.user.userId,
      songId,
      title,
      artist,
      album,
      language: language || 'English',
      coverArt,
      audioUrl,
      youtubeUrl,
      youtubeId
    });
    
    await favorite.save();
    res.status(201).json({ message: 'Added to favorites', favorite });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all favorites (grouped by language)
app.get('/api/favorites', authenticateToken, async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.user.userId }).sort({ addedAt: -1 });
    
    // Group by language
    const groupedByLanguage = favorites.reduce((acc, fav) => {
      const lang = fav.language || 'English';
      if (!acc[lang]) {
        acc[lang] = [];
      }
      acc[lang].push(fav);
      return acc;
    }, {});
    
    res.json(groupedByLanguage);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Remove from favorites
app.delete('/api/favorites/:songId', authenticateToken, async (req, res) => {
  try {
    await Favorite.deleteOne({ userId: req.user.userId, songId: req.params.songId });
    res.json({ message: 'Removed from favorites' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Check if song is favorited
app.get('/api/favorites/check/:songId', authenticateToken, async (req, res) => {
  try {
    const favorite = await Favorite.findOne({ userId: req.user.userId, songId: req.params.songId });
    res.json({ isFavorite: !!favorite });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Sample data initialization
async function initializeSampleData() {
  const count = await Song.countDocuments();
  if (count === 0) {
    console.log('📀 Adding sample music data...');
    const sampleSongs = [
      // English
      { title: 'Shape of You', artist: 'Ed Sheeran', album: 'Divide', genre: 'Pop', language: 'English', duration: '3:53', releaseYear: 2017, coverArt: 'https://i.scdn.co/image/ab67616d0000b2734e0362c225863f6efed3a645' },
      { title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', genre: 'Pop', language: 'English', duration: '3:20', releaseYear: 2020, coverArt: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36' },
      
      // Telugu
      { title: 'Oo Antava', artist: 'Indravathi Chauhan', album: 'Pushpa', genre: 'Telugu', language: 'Telugu', duration: '4:10', releaseYear: 2021, coverArt: 'https://via.placeholder.com/200?text=Pushpa' },
      { title: 'Saami Saami', artist: 'Mounika Vangala', album: 'Pushpa', genre: 'Telugu', language: 'Telugu', duration: '3:45', releaseYear: 2021, coverArt: 'https://via.placeholder.com/200?text=Pushpa' },
      
      // Hindi
      { title: 'Kesariya', artist: 'Arijit Singh', album: 'Brahmastra', genre: 'Hindi', language: 'Hindi', duration: '4:28', releaseYear: 2022, coverArt: 'https://via.placeholder.com/200?text=Kesariya' },
      { title: 'Apna Bana Le', artist: 'Arijit Singh', album: 'Bhediya', genre: 'Hindi', language: 'Hindi', duration: '4:15', releaseYear: 2022, coverArt: 'https://via.placeholder.com/200?text=Bhediya' },
      
      // Japanese
      { title: 'Gurenge', artist: 'LiSA', album: 'Demon Slayer', genre: 'Anime', language: 'Japanese', duration: '4:00', releaseYear: 2019, coverArt: 'https://via.placeholder.com/200?text=Demon+Slayer' },
      { title: 'Unravel', artist: 'TK', album: 'Tokyo Ghoul', genre: 'Anime', language: 'Japanese', duration: '3:55', releaseYear: 2014, coverArt: 'https://via.placeholder.com/200?text=Tokyo+Ghoul' },
      
      // Korean
      { title: 'Dynamite', artist: 'BTS', album: 'BE', genre: 'K-Pop', language: 'Korean', duration: '3:19', releaseYear: 2020, coverArt: 'https://via.placeholder.com/200?text=BTS' },
      { title: 'Shut Down', artist: 'BLACKPINK', album: 'Born Pink', genre: 'K-Pop', language: 'Korean', duration: '2:55', releaseYear: 2022, coverArt: 'https://via.placeholder.com/200?text=BLACKPINK' },
    ];
    
    await Song.insertMany(sampleSongs);
    console.log('✅ Sample data added successfully!');
  }
}

// ==================================
// YOUTUBE MUSIC INTEGRATION 🎬
// ==================================

async function searchYouTube(query, limit = 20) {
  try {
    console.log(`🔍 Searching YouTube for: "${query}"`);
    const searchQuery = query + ' official audio';
    const results = await GetListByKeyword(searchQuery, false, limit);
    
    if (!results || !results.items || results.items.length === 0) {
      return null;
    }
    
    const tracks = results.items
      .filter(item => item.type === 'video')
      .map(video => {
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
          audioUrl: `https://www.youtube.com/embed/${video.id}`,
          youtubeUrl: `https://www.youtube.com/watch?v=${video.id}`,
          youtubeId: video.id,
          views: video.viewCount || '0'
        };
      });
    
    return tracks;
  } catch (err) {
    console.error('❌ YouTube search error:', err.message);
    return null;
  }
}

// Existing routes (keep these)
app.get('/songs', async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/search', async (req, res) => {
  try {
    const query = req.query.q || '';
    const youtubeResults = await searchYouTube(query);
    
    if (youtubeResults && youtubeResults.length > 0) {
      return res.json(youtubeResults);
    }
    
    if (!query) {
      const songs = await Song.find().limit(20);
      return res.json(songs);
    }
    
    const songs = await Song.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { artist: { $regex: query, $options: 'i' } },
        { album: { $regex: query, $options: 'i' } },
      ]
    });
    
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/genres', async (req, res) => {
  try {
    const genres = await Song.distinct('genre');
    res.json(genres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: '🎵 Music Library Backend is running!',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🎵 Server running on port ${PORT}`);
  console.log('🎬 YouTube Music Integration Active!');
  console.log('🔐 Authentication System Ready!');
  console.log('✅ Login & Dashboard Features Enabled!');
});
