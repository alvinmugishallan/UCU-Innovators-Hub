import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Login from './pages/Login';
import Register from './pages/Register';
import PublicDashboard from './pages/PublicDashboard';

import DashboardLayout from './components/Layout/DashboardLayout';
import Dashboard from './pages/Dashboard';

import { AuthProvider } from './context/AuthContext';

import ProjectDetail from './pages/ProjectDetail';
import ProjectSubmissionForm from './components/Projects/ProjectSubmissionForm';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="explore" element={<Explore />} />
            <Route path="public-dashboard" element={<PublicDashboard />} />
            <Route path="projects/:id" element={<ProjectDetail />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="submit" element={<ProjectSubmissionForm />} />
            <Route path="profile" element={<div className="container"><h2>Profile</h2></div>} />
            <Route path="settings" element={<div className="container"><h2>Settings</h2></div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
