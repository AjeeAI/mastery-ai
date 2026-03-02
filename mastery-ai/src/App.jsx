import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

// --- Providers & Guards ---
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// --- Import Layout Components ---
import Navbar from './components/Navbar'; // Fixed case sensitivity
import TeacherSidebar from './components/TeacherSidebar';

// --- Import Core Pages ---
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ExplainMistakePage from './pages/ExplainMistakePage';
import ProfilePage from './pages/ProfilePage';
import ConceptAnalyticsPage from './pages/ConceptAnalyticsPage';

// --- Import Onboarding Pages (Moved from components to pages) ---
import ClassSelection from './pages/ClassSelection';
import SubjectSelection from './pages/SubjectSelection';
import LearningPreferences from './pages/LearningPreferences';
import AssessmentSplash from './pages/AssessmentSplash';

// --- Import Diagnostic Pages (Moved from components to pages) ---
import Completed from './pages/Completed';
import InProgress from './pages/InProgress'; // Ensure file is renamed to InProgress.jsx
import Quizzes from './pages/Quizzes';

// --- Import Dashboard & Lesson Flow ---
import Dashboard from './pages/Dashboard';
import CoursePage from './pages/CoursePage'; // Rescued from the root directory!
import LessonPage from './pages/LessonPage';
import ModuleQuizPage from './pages/ModuleQuizPage';
import QuizResult from './pages/QuizResult';
import { UserProvider } from './context/UserContext';

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
    <AuthProvider>
      <UserProvider>
          <Routes>
          
          {/* 🔓 PUBLIC ROUTES */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* 🔒 PROTECTED ROUTES (Requires Login) */}
          <Route element={<ProtectedRoute />}>
            
            {/* Onboarding Flow (Standalone, no Navbar) */}
            {/* Note: Standardized to lowercase URL paths */}
            <Route path="/class-selection" element={<ClassSelection />} />
            <Route path="/subject-selection" element={<SubjectSelection />} />
            <Route path="/learning-preferences" element={<LearningPreferences />} />
            <Route path="/assessment-splash" element={<AssessmentSplash />} />

            {/* Student Layout (Has Top Navbar) */}
            <Route element={<StudentLayout />}>
              
              {/* Core Features */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/course" element={<CoursePage />} /> {/* Now Accessible! */}
              <Route path="/learning-path" element={<LessonPage />} />
              <Route path="/mastery-path" element={<ExplainMistakePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              
              {/* Diagnostic Flow */}
              <Route path="/quiz/:quizId" element={<Quizzes />} />
              <Route path="/quiz/:quizId/in-progress" element={<InProgress />} />
              <Route path="/quiz/:quizId/completed" element={<Completed />} />

              {/* Module Flow */}
              <Route path="/module-quiz" element={<ModuleQuizPage />} />
              <Route path="/quiz-result" element={<QuizResult />} />
              
            </Route>

            {/* Teacher Layout (Has Side Navigation) */}
            <Route path="/teacher" element={<TeacherLayout />}>
              <Route index element={<Navigate to="analytics" />} />
              <Route path="analytics" element={<ConceptAnalyticsPage />} />
            </Route>

          </Route>
        </Routes>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;