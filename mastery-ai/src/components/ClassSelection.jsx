import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ClassSelection = () => {
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const grades = [
    { id: 'SSS1', label: 'Grade 10', icon: '📖' },
    { id: 'SSS2', label: 'Grade 11', icon: '📘' },
    { id: 'SSS3', label: 'Grade 12', icon: '🎓' },
  ];

  const handleContinue = async () => {
    if (!selectedGrade || !selectedTerm || selectedTerm === 'Select Current Term') {
      alert("Please select both your grade and your current term.");
      return;
    }

    setIsLoading(true);

    try {
      // API call logic
      const response = await fetch('https://your-api-endpoint.com/user/onboarding/class', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grade: selectedGrade,
          term: selectedTerm
        }),
      });

      if (response.ok) {
        navigate('/SubjectSelection');
      } else {
        console.error("Failed to save data");
      }
    } catch (error) {
      console.error("Error connecting to backend:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-sans p-8" style={{ backgroundColor: '#F7FAFC' }}>
      {/* Logo - Top Left */}
      <div className="flex items-center gap-2 mb-16">
        <div 
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold shadow-md"
          style={{ backgroundColor: '#635BFF' }}
        >
          M
        </div>
        <span className="text-xl font-bold tracking-tight" style={{ color: '#1A1F36' }}>MasteryAI</span>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold mb-4" style={{ color: '#1A1F36' }}>
          Tell us about your class
        </h1>
        <p className="mb-12 max-w-md mx-auto leading-relaxed" style={{ color: '#4F5668' }}>
          Select your current grade level to help us personalize your learning path and recommend the right topics.
        </p>

        {/* Grade Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {grades.map((grade) => {
            const isSelected = selectedGrade === grade.id;
            return (
              <div
                key={grade.id}
                onClick={() => setSelectedGrade(grade.id)}
                className={`relative p-8 rounded-[2.5rem] border-2 transition-all duration-300 cursor-pointer bg-white flex flex-col items-center
                  ${isSelected ? 'shadow-2xl scale-[1.02]' : 'border-transparent shadow-sm hover:shadow-md'}`}
                style={{ 
                  borderColor: isSelected ? '#635BFF' : 'transparent',
                  boxShadow: isSelected ? '0 20px 25px -5px rgba(99, 91, 255, 0.1), 0 10px 10px -5px rgba(99, 91, 255, 0.04)' : ''
                }}
              >
                {/* Checkmark Badge */}
                {isSelected && (
                  <div 
                    className="absolute top-4 right-6 text-white rounded-full w-6 h-6 flex items-center justify-center text-[10px] shadow-lg border-2 border-white"
                    style={{ backgroundColor: '#635BFF' }}
                  >
                    ✓
                  </div>
                )}
                
                {/* Icon Circle */}
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-6 transition-colors"
                  style={{ 
                    backgroundColor: isSelected ? '#635BFF' : '#F7FAFC',
                    color: isSelected ? '#FFFFFF' : '#635BFF' 
                  }}
                >
                  {grade.icon}
                </div>
                
                <h3 className="text-2xl font-bold" style={{ color: '#1A1F36' }}>{grade.id}</h3>
                <p className="font-medium mb-2" style={{ color: '#A3ACBF' }}>{grade.label}</p>

                {/* Tag indicator */}
                {isSelected && (
                  <span 
                    className="mt-2 px-4 py-1.5 text-white text-[10px] font-bold rounded-full uppercase tracking-wider shadow-sm"
                    style={{ backgroundColor: '#635BFF' }}
                  >
                    Current Choice
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Term Selector Card */}
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border max-w-xl mx-auto mb-10" style={{ borderColor: '#E3E8EE' }}>
          <div className="flex items-center gap-3 font-semibold mb-5 justify-center" style={{ color: '#4F566B' }}>
            <span className="text-xl">📅</span> Which term are you currently in?
          </div>
          <div className="relative">
            <select 
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="w-full p-4 rounded-2xl border outline-none transition-all appearance-none cursor-pointer"
              style={{ 
                backgroundColor: '#F7FAFC', 
                borderColor: '#E3E8EE', 
                color: '#4F566B' 
              }}
            >
              <option value="">Select Current Term</option>
              <option value="First Term">First Term</option>
              <option value="Second Term">Second Term</option>
              <option value="Third Term">Third Term</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#A3ACBF' }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
          <p className="text-[11px] mt-5 flex items-center justify-center gap-1.5" style={{ color: '#A3ACBF' }}>
             <span className="w-4 h-4 rounded-full border flex items-center justify-center text-[10px] italic" style={{ borderColor: '#E3E8EE' }}>i</span> 
             This helps us align topics with your school calendar.
          </p>
        </div>

        {/* Continue Button */}
        <button 
          onClick={handleContinue}
          disabled={isLoading || !selectedGrade || !selectedTerm} 
          className={`w-full max-w-xl py-5 text-white text-lg font-bold rounded-2xl shadow-xl transition-all transform ${!isLoading && 'active:scale-[0.97]'}`}
          style={{ 
            backgroundColor: (isLoading || !selectedGrade || !selectedTerm) ? '#A3ACBF' : '#635BFF',
            boxShadow: (isLoading || !selectedGrade || !selectedTerm) ? 'none' : '0 10px 15px -3px rgba(99, 91, 255, 0.3)',
            cursor: isLoading ? 'wait' : 'pointer'
          }}
        >
          {isLoading ? 'Saving...' : 'Continue'}
        </button>
      </div>
    </div>
  );
};

export default ClassSelection;