# 🚀 START HERE - Getting UCU Innovators Hub Running

## Step-by-Step Startup

### Step 1: Install Backend Dependencies

```bash
cd server
npm install
```

**Expected output:** Should install all packages without errors

### Step 2: Create Backend Environment File

Create file: `server/.env`

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ucu-innovators-hub
JWT_SECRET=ucu-innovators-hub-secret-key-2024
NODE_ENV=development
```

**💡 Don't have MongoDB?** 
- Use MongoDB Atlas (free): https://www.mongodb.com/cloud/atlas
- Get connection string and replace MONGODB_URI

### Step 3: Start Backend Server

```bash
# Still in server directory
npm run dev
```

**✅ You should see:**
```
✅ MongoDB Connected
🚀 Server running on port 5000
📍 API endpoint: http://localhost:5000/api
```

**❌ If you see MongoDB errors:**
- Make sure MongoDB is running locally, OR
- Update MONGODB_URI in `.env` with your Atlas connection string

### Step 4: Install Frontend Dependencies

**Open a NEW terminal window** (keep backend running)

```bash
# Go to root directory (not server)
cd ..
npm install
```

**Expected:** Should install React and all dependencies

### Step 5: Create Frontend Environment File

Create file: `.env` in the root directory (same level as package.json)

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 6: Start Frontend

```bash
npm start
```

**✅ You should see:**
- Browser opens automatically
- URL: http://localhost:3000
- Login page appears

**❌ If you see errors:**
- Check browser console (F12)
- Make sure backend is still running
- See TROUBLESHOOTING.md

## ✅ Verification Checklist

- [ ] Backend server running (port 5000)
- [ ] Frontend server running (port 3000)
- [ ] Browser shows login page
- [ ] No errors in browser console
- [ ] No errors in terminal

## 🎯 First Test

1. Click "Sign Up"
2. Create a student account
3. Login
4. Try creating a project

## 🆘 Still Not Working?

See **TROUBLESHOOTING.md** for detailed solutions!

## 📝 Important Notes

- **Backend must run first** - Frontend needs the API
- **Two terminals needed** - One for backend, one for frontend
- **MongoDB required** - Either local or Atlas cloud
- **Ports must be free** - 3000 (frontend) and 5000 (backend)

## 🔥 Quick Commands Reference

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend  
npm start
```

That's it! You should be up and running! 🎉

