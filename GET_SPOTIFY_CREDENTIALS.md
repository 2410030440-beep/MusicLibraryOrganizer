# 🎵 QUICK START - Get Your Spotify Credentials!

Follow these simple steps:

## Step 1: Go to Spotify Developer Dashboard
Open: https://developer.spotify.com/dashboard

## Step 2: Log In
Use any Spotify account (free account works!)

## Step 3: Create an App
- Click "Create app"
- App name: Music Library Organizer
- App description: Personal music library
- Redirect URIs: http://localhost:3000
- Check "Web API"
- Click Save

## Step 4: Get Credentials
- Click Settings
- Copy "Client ID"
- Click "View client secret" and copy it

## Step 5: Create .env File
Create a file named ".env" (with the dot!) in this folder and add:

```
SPOTIFY_CLIENT_ID=paste_your_client_id_here
SPOTIFY_CLIENT_SECRET=paste_your_client_secret_here
```

## Step 6: Restart Backend
Stop the backend server (Ctrl+C) and run: npm run server

## Done! 🎉
You can now search for ANY song from Spotify's 100M+ catalog!

---

Need help? Check SPOTIFY_SETUP.md for detailed instructions with screenshots.
