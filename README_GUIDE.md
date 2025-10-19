# 🎵 Music Library Organizer - Complete Setup Guide

## ✨ Features

### Authentication System
- **User Registration & Login** with email and password
- **JWT-based Authentication** with secure cookie storage
- **Remember Me** functionality (30-day session)
- **Password Security** with bcrypt hashing

### Personalized Dashboard
- **Language-based Organization** - Your music organized by language (Telugu, Hindi, Bengali, English, Japanese, Korean, Spanish, and more!)
- **Spotify-style UI** - Beautiful glass-morphism effects and modern design
- **Collapsible Sections** - Each language section can be expanded/collapsed
- **Language Filter** - Filter your library by specific languages
- **Statistics** - See total songs, languages, and artists at a glance

### Music Search & Discovery
- **YouTube Integration** - Search millions of songs from YouTube
- **Add to Favorites** - Save your favorite songs to your personal library
- **Language Selection** - Choose the language when adding songs to organize them properly
- **Play Songs** - Integrated audio player to listen to your music
- **Album Covers** - Beautiful album artwork for each song

## 🚀 Installation & Setup

### Prerequisites
Make sure you have these installed:
- **Node.js** (v16 or higher)
- **MongoDB** (running locally on port 27017)
- **npm** or **yarn**

### Step 1: Install Dependencies

Open your terminal in the project folder and run:

```bash
npm install
```

This will install all required packages including:
- React + Vite (Frontend)
- Express.js (Backend)
- MongoDB/Mongoose (Database)
- JWT & bcryptjs (Authentication)
- YouTube Search API (Music search)

### Step 2: Make Sure MongoDB is Running

**On Windows:**
1. Open Command Prompt as Administrator
2. Run: `net start MongoDB`

**On Mac/Linux:**
```bash
sudo systemctl start mongodb
# or
brew services start mongodb-community
```

**Verify MongoDB is running:**
```bash
mongosh
# You should see MongoDB shell open without errors
```

### Step 3: Configure Environment Variables

The `.env` file has been created with default values. **IMPORTANT:** Change the JWT_SECRET in production!

```
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
MONGODB_URI=mongodb://127.0.0.1:27017/musicDB
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### Step 4: Run the Application

**Option 1: Run Both Frontend and Backend Together (Recommended)**

```bash
npm run dev
```

This command runs:
- Backend server on `http://localhost:5000`
- Frontend on `http://localhost:3000`

**Option 2: Run Separately**

Terminal 1 (Backend):
```bash
npm run server
```

Terminal 2 (Frontend):
```bash
npm start
```

## 🎯 How to Use

### 1. First Time Setup

1. **Open your browser** and go to `http://localhost:3000`
2. You'll see the **Login page**
3. Click on **"Sign Up"** tab
4. Enter your details:
   - Name
   - Email
   - Password
5. Click **"Create Account"**

### 2. Login

1. Enter your **email** and **password**
2. Check **"Remember Me"** if you want to stay logged in for 30 days
3. Click **"Sign In"**

### 3. Search for Music

1. After login, you'll see the **Search page**
2. Type any song name, artist, or album in the search bar
3. Press Enter or click Search
4. Browse through the results

### 4. Add Songs to Your Library

1. **Hover over any song card**
2. Click the **heart icon** in the top-right corner
3. A **Language Selector modal** will appear
4. Choose the language for this song (e.g., Telugu, Hindi, English)
5. Click **"Add to Favorites"**

### 5. View Your Dashboard

1. Click **"My Library"** button in the header
2. See your songs organized by language
3. Each language section shows:
   - Language name with emoji
   - Number of songs
   - Album-style song cards

### 6. Dashboard Features

- **Filter by Language**: Click language pills to see only songs from that language
- **Collapse/Expand**: Click on language headers to show/hide songs
- **Play Songs**: Click on any song card to play it
- **Remove from Favorites**: Click the red heart icon to remove songs
- **View Statistics**: See total songs, languages, and artists at the top

### 7. Navigate Between Views

- **Search → Dashboard**: Click "My Library" button
- **Dashboard → Search**: Click the back arrow button in dashboard header

## 📁 Project Structure

```
MusicLibraryOrganizer/
├── backend/
│   └── auth-server.js          # Backend server with authentication & favorites
├── src/
│   ├── components/
│   │   ├── Login.jsx           # Login/Signup component
│   │   ├── Dashboard.jsx       # User dashboard with favorites
│   │   ├── LanguageSelector.jsx # Language selection modal
│   │   ├── searchbar.jsx       # Search input component
│   │   ├── searchresults.jsx   # Search results with add to favorites
│   │   └── Audioplayer.jsx     # Music player component
│   ├── styles/
│   │   ├── login.css           # Login page styles
│   │   ├── dashboard.css       # Dashboard styles
│   │   ├── languageSelector.css # Language modal styles
│   │   ├── app.css             # Main app styles
│   │   └── ...
│   ├── app.jsx                 # Main app component
│   └── main.jsx               # React entry point
├── .env                        # Environment variables
├── package.json                # Dependencies
└── README_GUIDE.md            # This file
```

## 🎨 Supported Languages

The app supports organizing music in these languages (with more coming!):

- 🇬🇧 English
- 🇮🇳 Telugu
- 🇮🇳 Hindi
- 🇮🇳 Tamil
- 🇮🇳 Kannada
- 🇮🇳 Malayalam
- 🇮🇳 Marathi
- 🇮🇳 Gujarati
- 🇮🇳 Punjabi
- 🇧🇩 Bengali
- 🇯🇵 Japanese
- 🇰🇷 Korean
- 🇪🇸 Spanish
- 🇫🇷 French
- 🇩🇪 German
- 🇵🇹 Portuguese
- 🇨🇳 Chinese
- 🇸🇦 Arabic
- 🇷🇺 Russian
- 🇮🇹 Italian

## 🔧 Troubleshooting

### MongoDB Connection Error

**Error:** `MongoServerError: connect ECONNREFUSED`

**Solution:**
1. Make sure MongoDB is running: `net start MongoDB` (Windows) or `brew services start mongodb-community` (Mac)
2. Check if MongoDB is accessible: `mongosh`

### Port Already in Use

**Error:** `EADDRINUSE: address already in use`

**Solution:**
1. Kill the process using port 5000 or 3000
2. Windows: `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`
3. Mac/Linux: `lsof -ti:5000 | xargs kill -9`

### Authentication Not Working

**Solution:**
1. Clear your browser cookies
2. Delete localStorage: Open DevTools → Application → Local Storage → Clear
3. Restart the server
4. Try registering a new account

### Songs Not Appearing in Dashboard

**Solution:**
1. Make sure you added songs using the heart icon
2. Check if you selected a language when adding
3. Try refreshing the page
4. Check browser console for errors

## 🎵 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Favorites
- `POST /api/favorites` - Add song to favorites
- `GET /api/favorites` - Get all favorites (grouped by language)
- `DELETE /api/favorites/:songId` - Remove from favorites
- `GET /api/favorites/check/:songId` - Check if song is favorited

### Music Search
- `GET /api/search?query=songname` - Search YouTube for songs

## 🔐 Security Notes

1. **Change JWT_SECRET** in `.env` file before deploying to production
2. **Use HTTPS** in production
3. **Never commit** `.env` file to GitHub
4. **Use environment variables** for sensitive data
5. **Enable CORS** only for trusted origins in production

## 🌟 Future Enhancements

- [ ] Forgot Password functionality
- [ ] Social login (Google, GitHub)
- [ ] Playlist creation
- [ ] Song recommendations
- [ ] Share playlists with friends
- [ ] Download songs for offline listening
- [ ] Dark/Light theme toggle
- [ ] Mobile app version

## 💡 Tips

1. **Add songs regularly** to build your personalized library
2. **Organize by language** for better discovery
3. **Use filters** to quickly find songs in specific languages
4. **Check "Remember Me"** if you don't want to login every time
5. **Use descriptive search terms** for better YouTube results

## 📞 Need Help?

If you encounter any issues:
1. Check the browser console (F12) for errors
2. Check the terminal where the server is running
3. Make sure MongoDB is running
4. Clear browser cache and cookies
5. Restart both frontend and backend servers

## 🎉 Enjoy Your Music!

You now have a fully functional, personalized music library organizer! Start adding your favorite songs and enjoy your music organized by language, just like Spotify! 🚀

---

**Made with ❤️ using React, Express, MongoDB, and YouTube API**
