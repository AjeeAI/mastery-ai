import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Providers & Guards
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Import our components
import Navbar from './components/NavBar';
import TeacherSidebar from './components/TeacherSidebar';

// Import our pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ExplainMistakePage from './pages/ExplainMistakePage';
import ProfilePage from './pages/ProfilePage';
import ConceptAnalyticsPage from './pages/ConceptAnalyticsPage';

/* --- Layout Wrappers --- */
const StudentLayout = () => (
  <div className="min-h-screen bg-slate-50 flex flex-col">
    <Navbar />
    <div className="flex-1"><Outlet /></div>
  </div>
);

const TeacherLayout = () => (
  <div className="flex min-h-screen bg-slate-50">
    <TeacherSidebar />
    <div className="flex-1 h-screen overflow-y-auto"><Outlet /></div>
  </div>
);

function App() {
  return (
    // 1. Wrap everything in the AuthProvider
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* PUBLIC ROUTES (No token required) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* 🔒 PROTECTED ROUTES 
            Wrapping our layouts inside the ProtectedRoute Guard 
        */}
        <Route element={<ProtectedRoute />}>
          
          {/* Student Layout */}
          <Route element={<StudentLayout />}>
            <Route path="/mastery-path" element={<ExplainMistakePage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          {/* Teacher Layout */}
          <Route path="/teacher" element={<TeacherLayout />}>
            <Route index element={<Navigate to="analytics" />} />
            <Route path="analytics" element={<ConceptAnalyticsPage />} />
          </Route>

        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;