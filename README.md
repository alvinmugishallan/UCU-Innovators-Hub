# 🎓 UCU Innovators Hub

A comprehensive platform for UCU students to showcase their innovative projects, with review and approval workflows for supervisors and faculty administrators.

## Features

### For Students
- ✅ Create and manage innovation projects
- ✅ Upload project documents (PDF, DOC, ZIP, etc.)
- ✅ Link GitHub repositories and live demos
- ✅ Submit projects for review
- ✅ Track project status
- ✅ Add team members

### For Supervisors
- ✅ Review submitted projects
- ✅ Add reviews with ratings and comments
- ✅ Approve or reject projects
- ✅ View assigned projects

### For Faculty Administrators
- ✅ Oversee all projects
- ✅ Approve projects for publication
- ✅ Publish projects to public view
- ✅ Assign supervisors to projects
- ✅ View platform statistics

### For Public Visitors
- ✅ Browse published projects
- ✅ Search and filter projects
- ✅ View project details, demos, and GitHub links

## Tech Stack

### Frontend
- React 18.2
- React Router DOM
- Axios for API calls
- CSS3 with CSS Variables

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer for file uploads
- Bcrypt for password hashing

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ucu-innovators-hub
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

4. Start MongoDB (if running locally)

5. Start the server:
```bash
npm run dev
# or
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to root directory:
```bash
cd ..
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in root:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the React app:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Project Structure

```
├── server/                 # Backend server
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Auth middleware
│   ├── uploads/           # Uploaded files
│   └── server.js          # Server entry point
├── src/                   # React frontend
│   ├── components/        # Reusable components
│   ├── pages/             # Page components
│   ├── context/           # React Context (Auth)
│   ├── services/          # API services
│   └── styles/            # CSS styles
└── public/                # Public assets
```

## User Roles

1. **Student** - Can create, edit, and submit projects
2. **Supervisor** - Can review and provide feedback on projects
3. **Faculty Admin** - Can approve, publish, and manage all projects
4. **Public** - Can view published projects only

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Projects
- `GET /api/projects` - Get all projects (filtered by role)
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (Students only)
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/projects/:id/submit` - Submit project for review

### Reviews
- `POST /api/reviews/:projectId` - Add review (Supervisors/Admins)
- `POST /api/reviews/:projectId/approve` - Approve project (Admins)
- `POST /api/reviews/:projectId/publish` - Publish project (Admins)
- `POST /api/reviews/:projectId/reject` - Reject project

### Upload
- `POST /api/upload` - Upload single file
- `POST /api/upload/multiple` - Upload multiple files
- `DELETE /api/upload/:filename` - Delete file

## Development

### Running Both Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm start
```

## License

This project is developed for UCU (Uganda Christian University).

## Support

For issues or questions, please contact the development team.
