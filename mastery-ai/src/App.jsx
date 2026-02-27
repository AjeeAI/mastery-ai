import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

// --- Providers & Guards ---
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// --- Import Layout Components ---
import Navbar from './components/NavBar';
import TeacherSidebar from './components/TeacherSidebar';

// --- Import Core Pages ---
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ExplainMistakePage from './pages/ExplainMistakePage';
import ProfilePage from './pages/ProfilePage';
import ConceptAnalyticsPage from './pages/ConceptAnalyticsPage';

// --- Import Prince's Onboarding Components ---
import ClassSelection from './components/ClassSelection';
import SubjectSelection from './components/SubjectSelection';
import LearningPreferences from './components/LearningPreferences';
import AssessmentSplash from './components/AssessmentSplash';

// --- Import Favour's Diagnostic Components ---
import Completed from './components/Completed';
import InProgress from './components/In-progress';
import Quizzes from './components/Quizzes';

// --- Import Sola's New Pages & Lesson Flow ---
import Dashboard from './pages/Dashboard';
import LessonPage from './pages/LessonPage';
import ModuleQuizPage from './pages/ModuleQuizPage';
import QuizResult from './pages/QuizResult';

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
      <Routes>
        
        {/* 🔓 PUBLIC ROUTES */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* 🔒 PROTECTED ROUTES (Requires Login) */}
        <Route element={<ProtectedRoute />}>
          
          {/* Prince's Onboarding Flow (Standalone, no Navbar) */}
          <Route path="/ClassSelection" element={<ClassSelection />} />
          <Route path="/SubjectSelection" element={<SubjectSelection />} />
          <Route path="/LearningPreferences" element={<LearningPreferences />} />
          <Route path="/AssessmentSplash" element={<AssessmentSplash />} />

          {/* Student Layout (Has Top Navbar) */}
          <Route element={<StudentLayout />}>
            
            {/* Core Features */}
            <Route path="/mastery-path" element={<ExplainMistakePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            
            {/* Favour's Diagnostic Flow (Dynamic quizId) */}
            <Route path="/quiz/:quizId" element={<Quizzes />} />
            <Route path="/quiz/:quizId/in-progress" element={<InProgress />} />
            <Route path="/quiz/:quizId/completed" element={<Completed />} />

            {/* Sola's Dashboard & Lesson Flow */}
            <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/learning-path" element={<LessonPage />} />
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
    </AuthProvider>
  );
}

export default App;