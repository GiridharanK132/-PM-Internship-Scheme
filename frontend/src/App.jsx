import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import RecommendationPage from './pages/RecommendationPage';
import InternshipDetails from './pages/InternshipDetails';
import InternshipList from './pages/InternshipList';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/recommendations" element={<RecommendationPage />} />
            <Route path="/internships" element={<InternshipList />} />
            <Route path="/internship/:id" element={<InternshipDetails />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
