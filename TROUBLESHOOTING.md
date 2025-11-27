# 🔧 Troubleshooting Guide - UCU Innovators Hub

## Common Issues and Solutions

### 1. ❌ "Cannot find module 'axios' or 'react-router-dom'"

**Solution:**
```bash
npm install axios react-router-dom
```

### 2. ❌ "Failed to compile" or Module not found errors

**Check:**
- Make sure you're in the root directory (not server folder)
- Run: `npm install` to install all dependencies
- Check if `node_modules` folder exists

**Solution:**
```bash
# Delete node_modules and package-lock.json (if exists)
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### 3. ❌ "Cannot connect to backend API"

**Check:**
- Is the backend server running? (Should be on port 5000)
- Check if `.env` file exists in root with: `REACT_APP_API_URL=http://localhost:5000/api`
- Make sure MongoDB is running (if using local)

**Solution:**
```bash
# Terminal 1 - Start backend
cd server
npm install
npm run dev

# Terminal 2 - Start frontend  
npm start
```

### 4. ❌ "ModuleNotFoundError: Can't resolve './components/X'"

**Check:**
- Make sure all files exist in `src/components/` and `src/pages/`
- Check file names match exactly (case-sensitive)

**Solution:**
- Verify file structure matches what's in the code
- Re-check imports in files

### 5. ❌ "MongoDB connection error"

**For Local MongoDB:**
```bash
# Windows
net start MongoDB

# Mac/Linux  
sudo systemctl start mongod
```

**For MongoDB Atlas:**
- Update `server/.env` with your Atlas connection string
- Make sure your IP is whitelisted in Atlas

### 6. ❌ Port 3000 or 5000 already in use

**Solution:**
```bash
# Windows - Find process using port
netstat -ano | findstr :3000
netstat -ano | findstr :5000

# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Or change port in .env files
```

### 7. ❌ "Access to XMLHttpRequest blocked by CORS"

**Solution:**
- Make sure backend server is running
- Check `server/server.js` has CORS enabled (should already be configured)
- Ensure frontend is calling the correct API URL

### 8. ❌ Blank page or white screen

**Check:**
1. Open browser console (F12)
2. Look for JavaScript errors
3. Check Network tab for failed requests

**Common causes:**
- Backend not running
- Wrong API URL in `.env`
- Missing dependencies

### 9. ❌ Build errors or warnings

**If you see warnings:**
- Most warnings are safe to ignore during development
- Focus on ERRORS (red text)

**If you see errors:**
- Copy the error message
- Check the file mentioned in the error
- Verify all imports are correct

### 10. ❌ Authentication not working

**Check:**
- Backend server must be running
- Check browser console for API errors
- Verify JWT_SECRET is set in `server/.env`
- Clear browser localStorage and try again

## Quick Fixes Checklist

1. ✅ **Dependencies installed?**
   ```bash
   npm install
   cd server && npm install
   ```

2. ✅ **Environment files created?**
   - Root `.env`: `REACT_APP_API_URL=http://localhost:5000/api`
   - `server/.env`: MongoDB URI and JWT_SECRET

3. ✅ **MongoDB running?**
   - Local: Start MongoDB service
   - Atlas: Connection string in `.env`

4. ✅ **Backend server running?**
   ```bash
   cd server
   npm run dev
   ```
   Should see: "✅ MongoDB Connected" and "🚀 Server running on port 5000"

5. ✅ **Frontend starting?**
   ```bash
   npm start
   ```
   Should open browser at http://localhost:3000

## Still Having Issues?

### Clear Everything and Start Fresh

```bash
# 1. Stop all running processes (Ctrl+C)

# 2. Clear frontend
rm -rf node_modules package-lock.json

# 3. Clear backend
cd server
rm -rf node_modules package-lock.json
cd ..

# 4. Reinstall frontend
npm install

# 5. Reinstall backend
cd server
npm install
cd ..

# 6. Start backend first
cd server
npm run dev

# 7. In new terminal, start frontend
npm start
```

### Check Browser Console

1. Press F12 in your browser
2. Go to "Console" tab
3. Look for red error messages
4. Copy and check what the error says

### Check Terminal Output

- Backend terminal should show server started
- Frontend terminal should show "Compiled successfully!"

## Getting Help

When asking for help, provide:
1. ✅ Error message (full text)
2. ✅ Which terminal shows the error (backend/frontend)
3. ✅ Browser console errors (if any)
4. ✅ Steps you've already tried

