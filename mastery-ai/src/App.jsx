import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import our components/pages
import Navbar from './components/NavBar';
import ExplainMistakePage from './pages/ExplainMistakePage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* This Navbar is outside the Routes! 
        That means it will NEVER unmount and will show on every page. 
      */}
      <Navbar />

      {/* The rest of the screen is where our page content will render */}
      <div className="flex-1">
        <Routes>
          {/* Default route redirects to mastery path for now */}
          <Route path="/" element={<Navigate to="/mastery-path" />} />
          
          {/* Our Mistake Explanation Page */}
          <Route path="/mastery-path" element={<ExplainMistakePage />} />
          
          {/* Our Profile Settings Page */}
          <Route path="/profile" element={<ProfilePage />} />
          
          {/* Add your other routes as your team builds them */}
          {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;