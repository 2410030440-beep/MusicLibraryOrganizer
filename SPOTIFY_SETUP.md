# 🎵 SPOTIFY INTEGRATION SETUP GUIDE

## Get Access to 100+ Million Songs! 🚀

Your Music Library Organizer now supports **Spotify API Integration**! This means you can search for and play **ANY song in the world** from Spotify's massive catalog.

---

## 📋 Quick Setup (5 Minutes)

### Step 1: Create Spotify Developer Account (FREE)

1. Go to: **https://developer.spotify.com/dashboard**
2. Click **"Log in"** (or Sign up if you don't have Spotify account)
3. Log in with your Spotify account (free account is fine!)

### Step 2: Create an App

1. Click **"Create app"** button
2. Fill in the form:
   - **App name**: `Music Library Organizer`
   - **App description**: `Personal music library website`
   - **Redirect URIs**: `http://localhost:3000` (just type this)
   - **API/SDKs**: Check "Web API"
3. Agree to terms and click **"Save"**

### Step 3: Get Your Credentials

1. Click on your newly created app
2. Click **"Settings"** button (top right)
3. You'll see:
   - **Client ID** - Copy this!
   - **Client Secret** - Click "View client secret" and copy it!

### Step 4: Add Credentials to Your Project

1. Open your project folder: `c:\Users\cherishma\OneDrive\MusicLibraryOrganizer`
2. Create a file named `.env` (note the dot at the start!)
3. Add these lines (replace with your actual credentials):

```
SPOTIFY_CLIENT_ID=your_actual_client_id_here
SPOTIFY_CLIENT_SECRET=your_actual_client_secret_here
```

**Example:**
```
SPOTIFY_CLIENT_ID=abc123def456ghi789jkl012mno345pq
SPOTIFY_CLIENT_SECRET=xyz987wvu654tsr321qpo210nml109ih
```

### Step 5: Restart Your Backend Server

1. Stop the backend (Ctrl+C in the terminal running `npm run server`)
2. Start it again: `npm run server`
3. You should see: **"✅ Spotify token obtained successfully!"**

---

## 🎉 You're Done!

Now you can search for **ANY song** from Spotify:
- Search for "Billie Eilish"
- Search for "The Beatles"
- Search for "BTS"
- Search for "Taylor Swift"
- **Literally any artist or song!**

---

## 🎧 What You Get

✅ **100+ Million Songs** - Spotify's entire catalog  
✅ **High-Quality Album Art** - Official cover images  
✅ **30-Second Previews** - Listen to any song instantly  
✅ **Full Song Info** - Artist, album, release year, popularity  
✅ **Smart Suggestions** - Autocomplete with real songs  
✅ **Direct Spotify Links** - Open full songs in Spotify app  

---

## 🆓 Is This Free?

**YES!** Spotify's Web API is completely free for:
- Searching songs
- Getting song info
- 30-second previews
- Album art
- Artist info

**Note:** Full song playback (beyond 30 seconds) requires Spotify Premium API, but 30-second previews are perfect for discovering and identifying songs!

---

## 🐛 Troubleshooting

### "No Spotify credentials found. Using MongoDB fallback."
- Make sure your `.env` file exists in the project root
- Make sure the credentials are correct (no extra spaces!)
- Restart the backend server

### "Spotify token error"
- Double-check your Client ID and Client Secret
- Make sure you copied them completely (they're long strings!)
- Try regenerating the Client Secret in Spotify Dashboard

### Still seeing sample songs only?
- Make sure you restarted the backend server AFTER creating .env
- Check the console - it should say "✅ Spotify token obtained successfully!"

---

## 💡 Tips

1. **Save your credentials safely** - Don't share them publicly!
2. **Create a `.gitignore`** file and add `.env` to it if you're using Git
3. **The `.env.example` file** shows the format - never put real credentials there!

---

## 🎵 Enjoy Your Music Library!

You now have access to virtually every song ever made! 🎉

**Happy Listening! 🎧**
