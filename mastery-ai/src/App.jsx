// import Dashboard from './Dashboard';
// import Header from './components/Header';
// import QuizResult from './QuizResult';
// import CoursePage from './CoursePage';
// import './App.css'

// function App() {
//   return (
//     <div className="min-h-screen bg-[#F8FAFC] font-sans">
//       <Header name="Alex Rivera" classLevel="SSS 2" />
//       {/* <Dashboard /> */}
//       {/* <QuizResult /> */}
//       <CoursePage />
//     </div>
//   )
// }

// export default App



import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPageHeader from './components/LandingPageHeader';
import LandingPageFooter from './components/LandingPageFooter';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-800">
        <LandingPageHeader />
        <main className="grow pt-20"> {/* pt-20 to account for fixed header */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <LandingPageFooter />
      </div>
    </Router>
  );
}

export default App;