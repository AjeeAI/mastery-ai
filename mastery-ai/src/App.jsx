import Dashboard from './Dashboard';
import Header from './components/Header';
import QuizResult from './QuizResult';
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      <Header name="Alex Rivera" classLevel="SSS 2" />
      <Dashboard />
      <QuizResult />
    </div>
  )
}

export default App
