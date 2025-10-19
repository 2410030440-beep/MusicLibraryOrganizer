# 🚂 Railway Deployment Guide - EASIEST METHOD!

## Why Railway?

- ✅ **All-in-one** - Frontend, Backend, Database in ONE place
- ✅ **Free tier** - $5 credit/month (enough for small apps)
- ✅ **Super easy** - Just connect GitHub and click deploy
- ✅ **Auto-deploys** - Every git push updates your app
- ✅ **Custom domain** - Free subdomain included

---

## 📋 Step-by-Step (10 Minutes!)

### **Step 1: Sign Up for Railway**

1. Go to: **https://railway.app/**
2. Click **"Start a New Project"**
3. Click **"Login with GitHub"**
4. Authorize Railway to access your GitHub

---

### **Step 2: Push Your Code to GitHub**

Open terminal in your project folder:

```bash
cd c:\Users\cherishma\OneDrive\MusicLibraryOrganizer

# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Ready for Railway deployment"

# Create GitHub repo (if not done)
# Go to github.com/new and create: music-library-organizer

# Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/music-library-organizer.git
git branch -M main
git push -u origin main
```

---

### **Step 3: Create MongoDB on Railway**

1. In Railway dashboard, click **"New Project"**
2. Click **"Deploy MongoDB"**
3. Wait 30 seconds for MongoDB to spin up
4. Click on the MongoDB service
5. Go to **"Variables"** tab
6. Copy the **`MONGO_URL`** value (looks like: `mongodb://mongo:...`)

**Save this URL!** You'll need it next.

---

### **Step 4: Deploy Your App**

1. Click **"New"** → **"GitHub Repo"**
2. Select your **`music-library-organizer`** repository
3. Railway will auto-detect it's a Node.js app
4. Click **"Deploy"**

---

### **Step 5: Add Environment Variables**

1. Click on your deployed service
2. Go to **"Variables"** tab
3. Click **"Add Variable"** and add these:

```bash
MONGODB_URI = (paste the MONGO_URL from Step 3)
JWT_SECRET = your-super-secret-key-12345
NODE_ENV = production
PORT = 5000
```

**Click "Add"** after each variable.

---

### **Step 6: Configure Build & Start**

Railway usually auto-detects, but if needed:

1. Go to **"Settings"** tab
2. **Build Command**: `npm install && npm run build`
3. **Start Command**: `node backend/auth-server.js`
4. **Root Directory**: Leave blank

---

### **Step 7: Generate Domain**

1. Go to **"Settings"** tab
2. Scroll to **"Domains"**
3. Click **"Generate Domain"**
4. You'll get: `https://your-app.up.railway.app`

**This is your public URL!** 🎉

---

### **Step 8: Update CORS**

Your backend needs to know about the new domain:

1. In Railway, go to **"Variables"**
2. Add:
   ```
   FRONTEND_URL = https://your-app.up.railway.app
   ```
3. The app will auto-redeploy

---

### **Step 9: Test Your App!**

1. Open: `https://your-app.up.railway.app`
2. Create an account
3. Search for songs
4. Add to favorites
5. **IT WORKS!** 🎉

---

## 🎯 **Alternative: Separate Frontend & Backend**

If you want to deploy frontend separately (e.g., on Vercel):

### **Railway Setup (Backend Only)**

1. **Create Railway Project** for backend
2. **Add MongoDB** as above
3. **Set Variables**:
   ```
   MONGODB_URI = (from Railway MongoDB)
   JWT_SECRET = your-secret-key
   FRONTEND_URL = https://your-app.vercel.app
   NODE_ENV = production
   PORT = 5000
   ```
4. **Deploy** - Railway will run the backend

### **Vercel Setup (Frontend)**

1. Go to **vercel.com**
2. **Import** your GitHub repo
3. **Framework**: Vite
4. **Environment Variable**:
   ```
   VITE_API_URL = https://your-backend.up.railway.app
   ```
5. **Deploy**

---

## 📊 **Railway Free Tier:**

- ✅ **$5 credit/month** (enough for ~500 hours)
- ✅ **1 GB RAM** per service
- ✅ **MongoDB included** (1 GB storage)
- ✅ **Auto-sleep** after inactivity (wakes on request)

**Pro Tip**: Railway gives you $5/month forever for hobby projects!

---

## 🔧 **Troubleshooting:**

### Build Failed
**Fix**: Check logs in Railway dashboard, ensure all dependencies in package.json

### MongoDB Connection Error
**Fix**: Make sure `MONGODB_URI` variable is set correctly

### CORS Error
**Fix**: Add your Railway domain to `FRONTEND_URL` variable

### Port Error
**Fix**: Railway needs `PORT` variable or use `process.env.PORT`

---

## 🎉 **You're Live!**

Once deployed, you can:

✅ **Share the link** with anyone  
✅ **Access from any device** (phone, tablet, computer)  
✅ **Auto-updates** when you push to GitHub  
✅ **Free SSL** (HTTPS automatically)  

---

## 💡 **Pro Tips:**

1. **Monitor usage** in Railway dashboard
2. **Use environment variables** for all secrets
3. **Check logs** if something breaks
4. **Custom domain**: Buy domain and connect in Railway settings
5. **Auto-deploy**: Every `git push` updates your app!

---

## 🚀 **Quick Deploy Commands:**

```bash
# Make changes to your code
git add .
git commit -m "Updated feature"
git push

# Railway auto-deploys in 2-3 minutes!
```

---

## 🌐 **What's Next?**

1. ✅ Share your URL with friends
2. ✅ Add songs to your library
3. ✅ Enjoy your public music organizer!
4. ✅ Add custom domain (optional)
5. ✅ Monitor usage in Railway dashboard

---

**Your Music Library is now PUBLIC! 🎵🌍**

**URL**: `https://your-app.up.railway.app`

Share it with the world! 🚀
