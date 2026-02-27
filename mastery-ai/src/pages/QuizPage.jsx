import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Dummy Data ---
// In the future, you will fetch this from your FastAPI backend
const mockQuestions = [
  {
    id: 1,
    category: "MATHEMATICS • ALGEBRA",
    prompt: "Solve for x in the following equation:",
    // We use a small render function here to color the 'x' purple like your design
    equation: (
      <>
        3<span className="text-[#6b46c1]">x</span> + 12 = 27
      </>
    ),
    options: [
      { id: 'A', label: 'x = 5' },
      { id: 'B', label: 'x = 13' },
      { id: 'C', label: 'x = 9' },
      { id: 'D', label: 'x = 15' }
    ]
  },
  {
    id: 2,
    category: "MATHEMATICS • GEOMETRY",
    prompt: "Find the area of a circle with radius r:",
    equation: (
      <>
        r = 5<span className="text-[#6b46c1]">cm</span>
      </>
    ),
    options: [
      { id: 'A', label: '25π cm²' },
      { id: 'B', label: '10π cm²' },
      { id: 'C', label: '5π cm²' },
      { id: 'D', label: '100π cm²' }
    ]
  },
  {
    id: 3,
    category: "MATHEMATICS • FRACTIONS",
    prompt: "Simplify the following expression:",
    equation: (
      <>
        1/2 + 3/4 = <span className="text-[#6b46c1]">?</span>
      </>
    ),
    options: [
      { id: 'A', label: '4/6' },
      { id: 'B', label: '5/4' },
      { id: 'C', label: '1' },
      { id: 'D', label: '3/8' }
    ]
  }
];

const QuizPage = () => {
  const navigate = useNavigate();
  
  // State to track quiz progress
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState({}); // Stores all user answers

  const currentQuestion = mockQuestions[currentIndex];
  const isLastQuestion = currentIndex === mockQuestions.length - 1;
  const progressPercentage = ((currentIndex + 1) / mockQuestions.length) * 100;

  // Handlers
  const handleSelectOption = (optionId) => {
    setSelectedOption(optionId);
  };

  const handleNextOrSubmit = () => {
    // 1. Save the current answer
    const updatedAnswers = { ...answers, [currentQuestion.id]: selectedOption };
    setAnswers(updatedAnswers);

    // 2. Either go to next question OR submit
    if (isLastQuestion) {
      console.log("Final Submission Payload:", updatedAnswers);
      // Future: await fetch('http://localhost:8000/api/quiz/submit', ...)
      navigate('/mastery-path'); // Redirect back to dashboard after finish
    } else {
      setCurrentIndex(currentIndex + 1);
      // Pre-fill if they already answered this question (e.g., if they went back)
      setSelectedOption(updatedAnswers[mockQuestions[currentIndex + 1].id] || null);
    }
  };

  const handleSkip = () => {
    const updatedAnswers = { ...answers, [currentQuestion.id]: "SKIPPED" };
    setAnswers(updatedAnswers);

    if (isLastQuestion) {
      console.log("Final Submission Payload (with skips):", updatedAnswers);
      navigate('/mastery-path');
    } else {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(updatedAnswers[mockQuestions[currentIndex + 1].id] || null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans relative pb-12">
      
      {/* HEADER: Logo & Progress Bar */}
      <header className="flex justify-between items-center px-8 py-6 w-full max-w-7xl mx-auto">
        {/* Brand Logo */}
        <div className="flex items-center gap-2 text-[#6b46c1] font-bold text-xl tracking-tight">
          <div className="bg-[#6b46c1] p-1.5 rounded-lg text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
          </div>
          MasteryAI
        </div>

        {/* Progress Indicator */}
        <div className="w-64">
          <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
            <span>Question {currentIndex + 1} of {mockQuestions.length}</span>
            <span>{Math.round(progressPercentage)}% Complete</span>
          </div>
          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#6b46c1] transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 mt-8">
        
        {/* Pre-Header: Category Pill */}
        <div className="bg-indigo-50 text-[#6b46c1] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-indigo-100/50">
          {currentQuestion.category}
        </div>

        {/* Question Prompt */}
        <h1 className="text-2xl md:text-3xl font-black text-slate-800 mb-8 text-center max-w-2xl">
          {currentQuestion.prompt}
        </h1>

        {/* The White Quiz Card */}
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 w-full max-w-3xl">
          
          {/* Equation / Focus Area */}
          <div className="bg-slate-50/50 border border-slate-200 border-dashed rounded-2xl py-8 px-12 text-4xl font-mono text-slate-700 font-medium flex justify-center items-center mb-10 mx-auto w-max shadow-inner shadow-slate-100/50">
            {currentQuestion.equation}
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedOption === option.id;
              
              return (
                <div 
                  key={option.id}
                  onClick={() => handleSelectOption(option.id)}
                  className={`
                    border-2 rounded-2xl p-5 flex items-center gap-4 cursor-pointer transition-all duration-200
                    ${isSelected 
                      ? 'border-[#6b46c1] bg-indigo-50/30' 
                      : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                    }
                  `}
                >
                  {/* Custom Radio Circle */}
                  <div className={`
                    w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center transition-colors
                    ${isSelected ? 'border-[6px] border-[#6b46c1] bg-white' : 'border-2 border-slate-300 bg-white'}
                  `}></div>
                  
                  {/* Option Text */}
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Option {option.id}</span>
                    <span className={`text-sm font-bold ${isSelected ? 'text-[#6b46c1]' : 'text-slate-700'}`}>
                      {option.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Card Footer Actions */}
          <div className="flex justify-between items-center pt-2">
            
            {/* Skip Button */}
            <button 
              onClick={handleSkip}
              className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-2 group"
            >
              <svg className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>
              I haven't learned this yet (Skip)
            </button>

            {/* Next / Submit Button */}
            <button
              onClick={handleNextOrSubmit}
              disabled={!selectedOption} // Prevent clicking if nothing is selected
              className={`
                py-3.5 px-8 rounded-xl font-bold text-sm transition-all flex items-center gap-2
                ${selectedOption 
                  ? 'bg-[#6b46c1] hover:bg-[#5b3da6] text-white shadow-lg shadow-indigo-500/25 transform hover:-translate-y-0.5' 
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }
              `}
            >
              {isLastQuestion ? 'Submit Answer' : 'Next'}
              
              {/* Arrow Icon only shows if an option is selected or if it's the submit button */}
              {(selectedOption || isLastQuestion) && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              )}
            </button>

          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizPage;