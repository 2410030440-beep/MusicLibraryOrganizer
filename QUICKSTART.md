# 🚀 Quick Start Guide - Music Library Organizer

## Step-by-Step Instructions

### 1️⃣ Install MongoDB (if not already installed)

**For Windows:**
1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Install with default settings
3. MongoDB will run automatically as a service

**Or use MongoDB Compass (GUI tool):**
- Download from: https://www.mongodb.com/try/download/compass
- It includes MongoDB server

### 2️⃣ Start MongoDB

**Check if MongoDB is running:**
```powershell
mongod --version
```

**If not running, start it:**
```powershell
mongod
```

Or simply ensure the MongoDB service is running in Windows Services.

### 3️⃣ Install Project Dependencies

Open PowerShell in the project directory and run:

```powershell
npm install
```

This will install all required packages:
- React and React DOM
- Express, Mongoose, CORS
- Webpack and Babel
- All development dependencies

### 4️⃣ Start the Backend Server

**Option 1: In a new PowerShell terminal:**
```powershell
npm run server
```

You should see:
```
Starting backend server...
✅ Connected to MongoDB
📊 Adding sample music data...
✅ Sample data added successfully!
🎵 Server running on http://localhost:5000
```

### 5️⃣ Start the Frontend Development Server

**Option 2: In another PowerShell terminal:**
```powershell
npm start
```

The browser will automatically open to: http://localhost:3000

### 6️⃣ Using the Application

#### Search for Music:
1. Type in the search bar (e.g., "Shape of You", "Ed Sheeran", "Pop")
2. See autocomplete suggestions appear
3. Click a suggestion or press Enter

#### Browse by Genre:
1. Scroll down to see colorful genre cards
2. Click any genre to see all songs in that category

#### Play Music:
1. Click any song card in the search results
2. The audio player will appear at the bottom
3. Use play/pause, seek, and volume controls
4. Close the player with the × button

#### Get Recommendations:
1. After playing a song, scroll down
2. See "More like [song name]" recommendations
3. Click to play similar songs

## 🎯 Testing the Features

### Test Search:
```
Search: "Ed Sheeran" → See all Ed Sheeran songs
Search: "Rock" → See all Rock genre songs
Search: "Hotel" → See "Hotel California"
```

### Test Autocomplete:
```
Type: "Bli" → Should suggest "Blinding Lights"
Type: "Queen" → Should suggest "Queen" (artist)
```

### Test Genres:
```
Click: "Pop" → See 5 pop songs
Click: "Rock" → See 4 rock songs
Click: "Hip-Hop" → See 3 hip-hop songs
```

## 🔧 Troubleshooting

### Problem: "Cannot connect to MongoDB"
**Solution:**
```powershell
# Start MongoDB service
net start MongoDB
```

### Problem: "Port 3000 is already in use"
**Solution:**
1. Kill the process using port 3000:
```powershell
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```
2. Or change the port in `webpack.config.js`

### Problem: "Port 5000 is already in use"
**Solution:**
1. Kill the process or change port in `backend/server.js`:
```javascript
app.listen(5001, () => { // Changed from 5000 to 5001
  console.log('🎵 Server running on http://localhost:5001');
});
```
2. Also update API URLs in components to use the new port

### Problem: "Module not found" errors
**Solution:**
```powershell
# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
npm install
```

### Problem: Audio doesn't play
**Note:** The sample data uses placeholder audio URLs. To hear actual music, you need to:
1. Add real audio files to a `/public/audio/` directory
2. Update the `audioUrl` in the database
3. Or use external music file URLs

## 📝 Development Tips

### View MongoDB Data:
```powershell
# Connect to MongoDB shell
mongosh

# Switch to musicDB
use musicDB

# View all songs
db.songs.find().pretty()

# Count songs
db.songs.count()

# Clear all songs
db.songs.deleteMany({})
```

### Hot Reload:
- Frontend: Changes auto-reload in the browser
- Backend: You need to restart the server manually

### Add More Songs:
You can add songs via the API:

```javascript
// Using fetch in browser console or Postman
fetch('http://localhost:5000/songs', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'New Song',
    artist: 'Artist Name',
    album: 'Album Name',
    genre: 'Genre',
    duration: '3:30',
    releaseYear: 2024,
    coverArt: 'https://image-url.com',
    audioUrl: '/audio/file.mp3'
  })
});
```

## 🎨 Customization Ideas

1. **Change Color Scheme:**
   - Edit gradient colors in `src/styles/app.css`
   - Current: Purple/Blue gradient (#667eea to #764ba2)

2. **Add More Genres:**
   - Add more genre colors in `Suggestions.jsx` → `getGenreColor()`

3. **Modify Layout:**
   - Adjust grid columns in CSS files
   - Change card sizes and spacing

4. **Add Features:**
   - Playlist creation
   - Favorites/Like system
   - User authentication
   - Song upload functionality

## 📊 Project Stats

- **Components:** 5 React components
- **Styles:** 5 CSS modules
- **API Endpoints:** 6 REST endpoints
- **Sample Songs:** 20 songs across 6 genres
- **Lines of Code:** ~2000+ lines

## ✅ Success Checklist

- [ ] MongoDB installed and running
- [ ] Dependencies installed (`npm install`)
- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 3000
- [ ] Can search for songs
- [ ] Autocomplete suggestions work
- [ ] Can click and view song details
- [ ] Audio player appears at bottom
- [ ] Genre cards display and are clickable
- [ ] Recommendations show up

## 🎉 Next Steps

Once everything is working:

1. **Add Real Music Files:**
   - Create a `/public/audio/` folder
   - Add MP3 files
   - Update database with correct paths

2. **Deploy Online:**
   - Frontend: Vercel, Netlify, or GitHub Pages
   - Backend: Heroku, Railway, or Render
   - Database: MongoDB Atlas (free tier)

3. **Enhance Features:**
   - Add user accounts
   - Create playlists
   - Add favorites
   - Include song lyrics
   - Add music visualization

## 📞 Need Help?

If you encounter any issues:
1. Check the browser console (F12) for frontend errors
2. Check the terminal for backend errors
3. Verify MongoDB is running
4. Ensure all ports are available
5. Try clearing cache and restarting

---

**Happy coding! 🎵 Enjoy your music library organizer!**
