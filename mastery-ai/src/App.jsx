import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Import our components
import Navbar from './components/NavBar';
import TeacherSidebar from './components/TeacherSidebar';

// Import our pages
import ExplainMistakePage from './pages/ExplainMistakePage';
import ProfilePage from './pages/ProfilePage';
import ConceptAnalyticsPage from './pages/ConceptAnalyticsPage';

/* --- 1. Define Layout Wrappers --- */

// Student Layout: Has the Top Navbar
const StudentLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Outlet /> {/* Child student pages render here */}
      </div>
    </div>
  );
};

// Teacher Layout: Has the Side Navigation Bar
const TeacherLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <TeacherSidebar />
      <div className="flex-1 h-screen overflow-y-auto">
        <Outlet /> {/* Child teacher pages render here */}
      </div>
    </div>
  );
};


/* --- 2. The Main Router --- */

function App() {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Navigate to="/mastery-path" />} />
      
      {/* STUDENT ROUTES
        Wrapped in StudentLayout so they all get the Top Navbar
      */}
      <Route element={<StudentLayout />}>
        <Route path="/mastery-path" element={<ExplainMistakePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        {/* Future student routes go here */}
      </Route>

      {/* TEACHER ROUTES 
        Wrapped in TeacherLayout so they all get the Side Navigation
      */}
      <Route path="/teacher" element={<TeacherLayout />}>
        {/* Redirect /teacher to /teacher/analytics */}
        <Route index element={<Navigate to="analytics" />} />
        <Route path="analytics" element={<ConceptAnalyticsPage />} />
        {/* Future teacher routes go here */}
      </Route>

      {/* Optional: Add a 404 Not Found Page later */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
}

export default App;