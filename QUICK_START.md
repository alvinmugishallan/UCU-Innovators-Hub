# 🚀 Quick Start Guide - UCU Innovators Hub

## Step-by-Step Setup

### 1. Install Backend Dependencies

```bash
cd server
npm install
```

### 2. Set Up Backend Environment

Create `server/.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ucu-innovators-hub
JWT_SECRET=ucu-innovators-hub-secret-key-2024
NODE_ENV=development
```

**Note:** If you don't have MongoDB installed locally, you can use MongoDB Atlas (free cloud database):
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get your connection string
5. Replace `MONGODB_URI` in `.env` with your Atlas connection string

### 3. Start Backend Server

```bash
# In server directory
npm run dev
# or
npm start
```

You should see:
```
✅ MongoDB Connected
🚀 Server running on port 5000
📍 API endpoint: http://localhost:5000/api
```

### 4. Install Frontend Dependencies

Open a NEW terminal window:
```bash
# Go back to root directory
cd ..
npm install
```

### 5. Set Up Frontend Environment

Create `.env` file in root directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 6. Start Frontend (React App)

```bash
npm start
```

The app will open automatically at `http://localhost:3000`

## 🎯 First Steps

### Create Your First Account

1. Click "Sign Up" on the login page
2. Choose your role:
   - **Student** - To submit projects
   - **Supervisor** - To review projects
   - **Faculty Admin** - To manage everything

### For Testing (Create Multiple Accounts)

You can create multiple accounts with different roles to test the full workflow:

**Student Account:**
- Role: Student
- Student ID: 2024/U/12345

**Supervisor Account:**
- Role: Supervisor

**Admin Account:**
- Role: Faculty Admin

## 📋 Typical Workflow

1. **Student** creates and submits a project
2. **Supervisor** reviews and adds feedback
3. **Faculty Admin** approves the project
4. **Faculty Admin** publishes the project
5. **Public visitors** can now view the published project

## 🛠️ Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running (if using local)
- Check your `MONGODB_URI` in `.env` file
- If using Atlas, make sure your IP is whitelisted

### Port Already in Use
- Backend uses port 5000 - change in `server/.env` if needed
- Frontend uses port 3000 - React will ask to use another port if occupied

### CORS Errors
- Make sure backend is running before starting frontend
- Check that `REACT_APP_API_URL` matches your backend URL

### File Upload Issues
- Make sure `server/uploads` directory exists (created automatically)
- Check file size (max 10MB)
- Only PDF, DOC, DOCX, TXT, ZIP, RAR files allowed

## 📝 Notes

- All passwords must be at least 6 characters
- Students need to provide a Student ID
- Projects start as "Draft" and can be edited until submitted
- Only published projects are visible to public visitors
- File uploads are stored in `server/uploads` directory

## 🎉 You're All Set!

Start creating and showcasing innovative projects! 🚀

