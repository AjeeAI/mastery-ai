import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- 1. Added import
import CourseSidebar from '../components/CourseSidebar';

const ModuleQuizPage = () => {
  const navigate = useNavigate(); // <-- 2. Initialized navigate
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { id: 'A', label: 'Chemical to Heat' },
    { id: 'B', label: 'Electrical to Light & Heat' },
    { id: 'C', label: 'Kinetic to Potential' },
    { id: 'D', label: 'Solar to Electrical' },
  ];

  return (
    <div className="flex bg-slate-50 h-[calc(100vh-64px)] overflow-hidden">
      
      {/* Left Navigation */}
      <CourseSidebar activeStep="quiz" />

      {/* Center Main Content */}
      <div className="flex-1 overflow-y-auto px-12 py-10 relative">
        <div className="max-w-3xl mx-auto">
          
          {/* Header & Progress */}
          <div className="mb-10">
            <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-1">Mastery Challenge</p>
            <div className="flex justify-between items-end mb-4">
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Energy Transformation</h1>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Question 3 of 10</span>
            </div>
            
            {/* Segmented Progress Bar */}
            <div className="flex gap-1.5 w-full">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((step) => (
                <div key={step} className={`h-2 flex-1 rounded-full ${
                  step < 3 ? 'bg-emerald-400' : 
                  step === 3 ? 'bg-indigo-600' : 
                  'bg-slate-200'
                }`}></div>
              ))}
            </div>
          </div>

          {/* Quiz Card */}
          <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 mb-8">
            <div className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
              Multiple Choice
            </div>
            
            <h2 className="text-2xl font-bold text-slate-900 mb-8 leading-snug">
              Which energy change occurs when a light bulb is turned on?
            </h2>

            <div className="space-y-4 mb-10">
              {options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedOption(option.id)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                    selectedOption === option.id 
                      ? 'border-indigo-600 bg-indigo-50/30 shadow-md' 
                      : 'border-slate-100 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-colors ${
                    selectedOption === option.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {option.id}
                  </div>
                  <span className={`font-bold text-lg ${
                    selectedOption === option.id ? 'text-indigo-900' : 'text-slate-700'
                  }`}>
                    {option.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <button className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">
                Skip Question
              </button>
              <button 
                onClick={() => navigate('/quiz-result')} // <-- 3. Wired up navigation here
                disabled={!selectedOption}
                className={`px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg ${
                  selectedOption 
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 transform hover:-translate-y-0.5' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                }`}
              >
                Confirm Answer {selectedOption && <span>✓</span>}
              </button>
            </div>
          </div>

          {/* Bottom Metadata */}
          <div className="flex items-center justify-center gap-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <div className="flex items-center gap-2"><span>📍</span> Difficulty: JSS2 Level</div>
            <div className="flex items-center gap-2"><span>🏆</span> Mastery Points: +50 XP</div>
          </div>

        </div>
      </div>

      {/* Right Hint Sidebar */}
      <div className="w-80 bg-white border-l border-slate-200 flex flex-col p-8 h-[calc(100vh-64px)] justify-between">
        
        <div className="flex flex-col items-center text-center mt-8">
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center text-4xl shadow-inner border border-indigo-100">
              🤖
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 border-2 border-white rounded-full"></div>
          </div>
          
          <h3 className="text-lg font-black text-slate-900 mb-3">Need a Hint?</h3>
          <p className="text-sm text-slate-500 leading-relaxed mb-8">
            I can help you think through this, but try to answer independently first to earn max mastery!
          </p>
          
          <button className="w-full py-3 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:border-indigo-600 hover:text-indigo-600 transition-colors flex items-center justify-center gap-2 shadow-sm">
            <span>💡</span> Ask AI Tutor for a Hint
          </button>
        </div>

        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3 text-amber-800 text-xs font-bold leading-relaxed">
          <span className="text-amber-500 text-base">⚠️</span>
          Asking for a hint reduces the mastery points gained on this question.
        </div>

      </div>

    </div>
  );
};

export default ModuleQuizPage;