import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClassSelection from './components/ClassSelection';
import SubjectSelection from './components/SubjectSelection';
import LearningPreferences from './components/LearningPreferences';
import AssessmentSplash from './components/AssessmentSplash';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ClassSelection />} />
        <Route path="/SubjectSelection" element={<SubjectSelection />} />
        <Route path="/LearningPreferences" element={<LearningPreferences />} />
        <Route path="/AssessmentSplash" element={<AssessmentSplash />} />
      </Routes>
    </Router>
  );
}

export default App;