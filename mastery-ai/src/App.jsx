import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

// --- Providers & Guards ---
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// --- Import Layout Components ---
import Navbar from './components/Navbar';
import TeacherSidebar from './components/TeacherSidebar';
import LandingLayout from './layouts/LandingLayout'; 

// --- Import Public Pages ---
import HomePage from './pages/HomePage'; 
import AboutPage from './pages/AboutPage'; 
import Contactpage from './pages/ContactPage';

// --- Import Core Pages ---
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ExplainMistakePage from './pages/ExplainMistakePage';
import ProfilePage from './pages/ProfilePage';
import ConceptAnalyticsPage from './pages/ConceptAnalyticsPage';

// --- Import Onboarding Pages ---
import ClassSelection from './pages/ClassSelection';
import SubjectSelection from './pages/SubjectSelection';
import LearningPreferences from './pages/LearningPreferences';
import AssessmentSplash from './pages/AssessmentSplash';

// --- Import Diagnostic Pages ---
import Completed from './pages/Completed';
import InProgress from './pages/InProgress'; 
import Quizzes from './pages/Quizzes';

// --- Import Dashboard & Lesson Flow ---
import Dashboard from './pages/Dashboard';
import CoursePage from './pages/CoursePage'; 
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
          
          {/* 🌐 PUBLIC LANDING PAGES (Has Top Navigation & Footer) */}
          <Route element={<LandingLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<Contactpage />} />
          </Route>

          {/* 🔓 PUBLIC AUTH ROUTES (No Navbar, No Footer) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* 🔒 PROTECTED ROUTES (Requires Login) */}
          <Route element={<ProtectedRoute />}>
            
            {/* Onboarding Flow (Standalone, no Navbar) */}
            <Route path="/class-selection" element={<ClassSelection />} />
            <Route path="/subject-selection" element={<SubjectSelection />} />
            <Route path="/learning-preferences" element={<LearningPreferences />} />
            <Route path="/assessment-splash" element={<AssessmentSplash />} />

            {/* Student Layout (Has Top Navbar) */}
            <Route element={<StudentLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* 👇 THE FIX IS HERE: Added /:subject and /:topicId 👇 */}
              <Route path="/course/:subject" element={<CoursePage />} /> 
              <Route path="/lesson/:topicId" element={<LessonPage />} />
              
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