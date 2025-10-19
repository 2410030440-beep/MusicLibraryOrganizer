# 🎵 Music Library Organizer - NOW WITH SPOTIFY! 🚀

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![Spotify](https://img.shields.io/badge/Spotify-Integrated-1DB954)
![License](https://img.shields.io/badge/license-MIT-green)

## 🎉 MAJOR UPDATE: Search 100+ Million Songs!

Your Music Library Organizer now has **Spotify API Integration**! This means you can search for and discover **virtually ANY song in the world** from Spotify's massive catalog.

---

## ✨ Features

### 🎧 Core Features
- ✅ **Universal Search Bar** - Search by song title, artist, or album
- ✅ **Smart Autocomplete** - Get instant suggestions as you type
- ✅ **Genre Browsing** - Explore music by genre with beautiful cards
- ✅ **Audio Player** - Play 30-second previews with full controls
- ✅ **Beautiful UI** - Modern, professional design with animations

### 🆕 NEW: Spotify Integration
- 🌍 **100+ Million Songs** - Access Spotify's entire catalog
- 🎨 **High-Quality Album Art** - Official cover images
- 📊 **Rich Metadata** - Artist info, release dates, popularity scores
- 🎵 **30-Second Previews** - Instant playback for any song
- 🔗 **Direct Spotify Links** - Open full songs in Spotify app
- 🔍 **Real-Time Search** - Live results from Spotify's database

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Application

**Option A: Run Both Servers at Once**
```bash
npm run dev
```

**Option B: Run Separately**
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm start
```

### 3. Open Your Browser
Navigate to: **http://localhost:3000**

---

## 🎯 Enable Spotify Integration (5 Minutes)

### Quick Steps:

1. **Get Credentials** (FREE!)
   - Go to: https://developer.spotify.com/dashboard
   - Log in with Spotify account
   - Create a new app
   - Copy Client ID and Client Secret

2. **Create .env File**
   ```bash
   # Create .env in project root
   SPOTIFY_CLIENT_ID=your_client_id_here
   SPOTIFY_CLIENT_SECRET=your_client_secret_here
   ```

3. **Restart Backend**
   ```bash
   # Stop backend (Ctrl+C) then:
   npm run server
   ```

4. **Done!** 🎉
   You now have access to 100M+ songs!

**📖 Detailed Guide:** See [GET_SPOTIFY_CREDENTIALS.md](GET_SPOTIFY_CREDENTIALS.md)

---

## 🎨 What You Can Do

### Without Spotify (Default)
- ✅ Browse 20 sample songs
- ✅ Search by title/artist/album
- ✅ Browse 6 genres
- ✅ Smart autocomplete
- ✅ Beautiful UI

### With Spotify (Recommended!)
- 🌟 Search **ANY song** from Spotify's 100M+ catalog
- 🌟 Play 30-second previews instantly
- 🌟 High-quality album artwork
- 🌟 Full artist and album information
- 🌟 Direct links to play full songs on Spotify
- 🌟 Popularity and release date info

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Lightning-fast build tool
- **CSS3** - Custom styling with animations

### Backend
- **Express.js** - Web server
- **MongoDB** - Database for fallback songs
- **Mongoose** - Database ODM
- **Axios** - HTTP client for Spotify API
- **dotenv** - Environment variables

### APIs
- **Spotify Web API** - Music catalog access

---

## 📁 Project Structure

```
MusicLibraryOrganizer/
├── backend/
│   └── server.js           # Express server with Spotify integration
├── src/
│   ├── components/
│   │   ├── searchbar.jsx   # Search with autocomplete
│   │   ├── searchresults.jsx # Results grid with Spotify links
│   │   ├── Audioplayer.jsx # Audio player with Spotify button
│   │   └── Suggestions.jsx # Genre browsing & recommendations
│   ├── styles/
│   │   ├── app.css
│   │   ├── searchbar.css
│   │   ├── searchresults.css
│   │   ├── audioplayer.css
│   │   └── suggestions.css
│   ├── useSongSearch.js    # Custom React hook
│   ├── app.jsx             # Main app component
│   └── index.jsx           # Entry point
├── index.html              # Enhanced HTML with SEO
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies
├── .env.example            # Environment variables template
├── GET_SPOTIFY_CREDENTIALS.md  # Quick setup guide
├── SPOTIFY_SETUP.md        # Detailed setup guide
└── README.md               # This file
```

---

## 🎮 How to Use

### Search for Songs
1. Type any song, artist, or album name in the search bar
2. See instant suggestions as you type
3. Click on any song card to play it

### Browse by Genre
1. Scroll to the "Browse by Genre" section
2. Click on any colorful genre card
3. Discover songs in that genre

### Play Music
1. Click on any song card
2. Audio player opens at the bottom
3. Use play/pause, progress bar, and volume controls
4. Click "Play Full Song on Spotify" to open in Spotify app

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
# Spotify API Credentials (Optional but Recommended)
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
```

### Port Configuration
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000

---

## 🐛 Troubleshooting

### "No Spotify credentials found"
- Create a `.env` file with your Spotify credentials
- Make sure the file is in the project root
- Restart the backend server

### Songs won't play
- Spotify only provides 30-second previews for free
- Some songs might not have preview URLs
- Click the Spotify button to play full songs in Spotify app

### Frontend won't start
- Make sure port 3000 is free
- Run: `taskkill /PID <pid> /F` to kill process using port 3000
- Clear cache: `Remove-Item -Recurse -Force node_modules; npm install`

### Backend won't start
- Make sure MongoDB is running
- Make sure port 5000 is free
- Check for syntax errors in backend/server.js

---

## 📝 API Endpoints

### Backend API

```
GET  /api/search?q=query      # Search songs (Spotify or MongoDB)
GET  /api/suggestions?q=query # Get autocomplete suggestions
GET  /api/genres              # Get all available genres
GET  /api/genre/:genre        # Get songs by genre
GET  /songs                   # Get all songs from MongoDB
POST /songs                   # Add new song to MongoDB
```

### Spotify Integration

The backend automatically:
- Fetches access token from Spotify
- Searches Spotify catalog when credentials are provided
- Falls back to MongoDB when Spotify is unavailable
- Transforms Spotify data to match our format

---

## 🎨 Features Showcase

### Enhanced index.html
- ✅ SEO meta tags
- ✅ Open Graph / Twitter cards
- ✅ Google Fonts integration
- ✅ Loading screen animation
- ✅ PWA-ready structure
- ✅ Responsive design

### Search Results
- ✅ Grid layout with hover effects
- ✅ Album art with play overlay
- ✅ Song metadata display
- ✅ Spotify direct links
- ✅ Loading states
- ✅ Empty state messaging

### Audio Player
- ✅ Progress bar with seek
- ✅ Volume control
- ✅ Play/pause/next/previous
- ✅ Now playing info
- ✅ Spotify integration button
- ✅ Animated equalizer

---

## 🚀 Future Enhancements

Possible future features:
- [ ] User playlists
- [ ] Favorites/likes system
- [ ] Recently played history
- [ ] Dark/light theme toggle
- [ ] Advanced filters (year, popularity, etc.)
- [ ] Lyrics integration
- [ ] Share songs feature
- [ ] Download as PWA

---

## 📄 License

MIT License - Feel free to use this project however you want!

---

## 👨‍💻 Author

Built with ❤️ for music lovers everywhere

---

## 🙏 Credits

- **Spotify** - For their amazing Web API
- **React** - For the awesome UI library
- **Vite** - For lightning-fast development
- **MongoDB** - For reliable data storage

---

## 🎵 Enjoy Your Music!

**Search for any song in the world and enjoy! 🎧**

For questions or issues, check the documentation files:
- `GET_SPOTIFY_CREDENTIALS.md` - Quick Spotify setup
- `SPOTIFY_SETUP.md` - Detailed setup guide with explanations
