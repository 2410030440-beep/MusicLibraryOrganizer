# 🎵 Music Library Organizer

A professional, modern music library organizer web application built with React and Node.js. Search, browse, and play your favorite music with a beautiful, responsive interface.

## ✨ Features

### 🔍 Universal Search Bar
- Real-time search across songs, artists, albums, and genres
- Smart autocomplete suggestions as you type
- Debounced search for optimal performance
- Clear search functionality

### 📋 Search Results Page
- Beautiful grid layout with album cover art
- Displays song title, artist, album, genre, duration, and release year
- Hover effects with play button overlay
- Responsive design for all screen sizes

### 🎧 Audio Player
- Modern, full-featured audio player
- Play/pause controls
- Progress bar with seek functionality
- Volume control
- Now playing display with album art
- Visual equalizer animation
- Fixed bottom position for easy access

### 🔗 Backend Integration
- RESTful API with Express.js
- MongoDB database for song storage
- Multiple API endpoints:
  - `/api/search?q=query` - Search songs
  - `/api/suggestions?q=query` - Get autocomplete suggestions
  - `/api/genres` - List all genres
  - `/api/genre/:genre` - Get songs by genre
  - `/songs` - Get all songs

### 💡 Smart Suggestions
- Browse music by genre with colorful cards
- Personalized recommendations based on current song
- Genre-based song discovery
- Beautiful gradient genre cards

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally on port 27017)
- npm or yarn

### Installation

1. **Clone the repository** (if applicable)
   ```bash
   cd MusicLibraryOrganizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start MongoDB**
   - Make sure MongoDB is running on `mongodb://127.0.0.1:27017/musicDB`
   - The application will automatically populate sample data on first run

4. **Start the backend server**
   ```bash
   npm run server
   ```
   Server will start on http://localhost:5000

5. **Start the frontend development server**
   Open a new terminal and run:
   ```bash
   npm start
   ```
   Frontend will start on http://localhost:3000

### Alternative: Run both servers concurrently
```bash
npm run dev
```
(Note: You'll need to install concurrently first: `npm install --save-dev concurrently`)

## 📁 Project Structure

```
MusicLibraryOrganizer/
├── backend/
│   └── server.js              # Express server with MongoDB
├── src/
│   ├── components/
│   │   ├── Audioplayer.jsx    # Audio player component
│   │   ├── searchbar.jsx      # Search bar with autocomplete
│   │   ├── searchresults.jsx  # Search results grid
│   │   └── Suggestions.jsx    # Genre browser & recommendations
│   ├── styles/
│   │   ├── app.css            # Main app styles
│   │   ├── audioplayer.css    # Audio player styles
│   │   ├── searchbar.css      # Search bar styles
│   │   ├── searchresults.css  # Results grid styles
│   │   └── suggestions.css    # Suggestions styles
│   ├── app.jsx                # Main app component
│   ├── index.js               # React entry point
│   └── useSongSearch.js       # Custom hook for fetching songs
├── MusicLibraryOrganizer/
│   └── index.html             # HTML template
├── package.json
├── webpack.config.js
└── babel.config.json
```

## 🎨 Features Breakdown

### Universal Search Bar
- **Component**: `searchbar.jsx`
- **Features**: 
  - Live search with debouncing
  - Autocomplete dropdown
  - Clear button
  - Icon indicators for suggestion types

### Search Results
- **Component**: `searchresults.jsx`
- **Features**:
  - Grid layout with responsive columns
  - Album cover art with fallback images
  - Play button overlay on hover
  - Song metadata display
  - Loading and empty states

### Audio Player
- **Component**: `Audioplayer.jsx`
- **Features**:
  - HTML5 audio element
  - Custom controls (play, pause, skip)
  - Progress bar with time display
  - Volume control
  - Album art display
  - Animated equalizer

### Smart Suggestions
- **Component**: `Suggestions.jsx`
- **Features**:
  - Genre browsing with gradient cards
  - Context-aware recommendations
  - Click to explore genres
  - Related songs based on current playback

## 🎵 Sample Data

The application comes with 20 pre-loaded songs across multiple genres:
- Pop (Ed Sheeran, The Weeknd, Dua Lipa, Taylor Swift, Harry Styles)
- Rock (Queen, Led Zeppelin, Eagles, Guns N' Roses)
- Hip-Hop (Kendrick Lamar, Drake, Travis Scott)
- Electronic (Avicii, David Guetta, Zedd)
- R&B (Ed Sheeran, Sam Smith)
- Jazz (Frank Sinatra, Louis Armstrong)

## 🛠️ Technologies Used

### Frontend
- React 19
- Webpack 5
- Babel
- CSS3 with modern features (Grid, Flexbox, Animations)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS enabled

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

## 🎯 API Endpoints

### GET `/songs`
Returns all songs in the database.

### GET `/api/search?q=query`
Search songs by title, artist, album, or genre.
- **Query Parameter**: `q` - search query string
- **Returns**: Array of matching songs

### GET `/api/suggestions?q=query`
Get autocomplete suggestions for search.
- **Query Parameter**: `q` - partial search string (min 2 characters)
- **Returns**: Array of suggestion objects with type and value

### GET `/api/genres`
Get list of all available genres.
- **Returns**: Array of genre names

### GET `/api/genre/:genre`
Get all songs in a specific genre.
- **URL Parameter**: `genre` - genre name
- **Returns**: Array of songs

### POST `/songs`
Add a new song to the database.
- **Body**: Song object with title, artist, album, genre, duration, etc.
- **Returns**: Created song object

## 🎨 Customization

### Adding Your Own Music
You can add songs through the API or modify the sample data in `backend/server.js`:

```javascript
const sampleSongs = [
  {
    title: 'Your Song Title',
    artist: 'Artist Name',
    album: 'Album Name',
    genre: 'Genre',
    duration: '3:45',
    releaseYear: 2024,
    coverArt: 'https://image-url.com/cover.jpg',
    audioUrl: '/path/to/audio.mp3'
  },
  // ... more songs
];
```

### Styling
All styles are in separate CSS files under `src/styles/`. You can easily customize:
- Color schemes
- Layouts
- Animations
- Font sizes

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check connection string in `backend/server.js`

### Port Already in Use
- Frontend: Change port in `webpack.config.js` (default: 3000)
- Backend: Change port in `backend/server.js` (default: 5000)

### Audio Not Playing
- Check browser console for errors
- Ensure `audioUrl` in database points to valid audio files
- Note: Sample data uses placeholder URLs

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## 📞 Support

For issues or questions, please open an issue on the repository.

---

**Enjoy your music! 🎵**
