import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SubjectSelection = () => {
  const navigate = useNavigate();
  // Standardized state to start empty or with a default
  const [selectedSubjects, setSelectedSubjects] = useState(['']);
  const [isLoading, setIsLoading] = useState(false);

  const subjects = [
    {
      id: 'Mathematics',
      icon: '➕',
      description: 'Algebra, Geometry, and Data Analysis tailored to you.',
    },
    {
      id: 'English Studies',
      icon: '📖',
      description: 'Grammar, Literature, and Creative Writing mastery.',
    },
    {
      id: 'Civic Education',
      icon: '🌍',
      description: 'Civic rights, and History of modern society.',
    },
  ];

  const toggleSubject = (id) => {
    if (selectedSubjects.includes(id)) {
      setSelectedSubjects(selectedSubjects.filter((item) => item !== id));
    } else {
      setSelectedSubjects([...selectedSubjects, id]);
    }
  };

  // Async function to sync selected subjects with backend
  const handleContinue = async () => {
    if (selectedSubjects.length === 0) {
      alert("Please select at least one subject to continue.");
      return;
    }

    setIsLoading(true);

    try {
      // Replace with your actual subjects API endpoint
      const response = await fetch('', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjects: selectedSubjects,
        }),
      });

      if (response.ok) {
        navigate('/LearningPreferences');
      } else {
        console.error("Failed to save subjects");
      }
    } catch (error) {
      console.error("Error connecting to backend:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-sans p-8" style={{ backgroundColor: '#F9FAFB' }}>
      {/* Logo Section */}
      <div className="flex items-center gap-2 mb-16">
        <div 
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold shadow-md"
          style={{ backgroundColor: '#635BFF' }}
        >
          M
        </div>
        <span className="text-xl font-bold tracking-tight" style={{ color: '#1A1F36' }}>MasteryAI</span>
      </div>

      {/* Header Section */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4" style={{ color: '#111827' }}>
          Which subjects do you want help with?
        </h1>
        <p className="max-w-2xl mx-auto text-lg" style={{ color: '#6B7280' }}>
          Pick the subjects you'd like to focus on for SSS1-SSS3. You can personalize your learning path for each choice later.
        </p>
      </div>

      {/* Subject Cards Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {subjects.map((subject) => {
          const isSelected = selectedSubjects.includes(subject.id);
          return (
            <div
              key={subject.id}
              onClick={() => toggleSubject(subject.id)}
              className={`relative p-8 rounded-[2rem] border-2 transition-all duration-300 cursor-pointer bg-white flex flex-col items-start min-h-[280px]
                ${isSelected ? 'shadow-2xl scale-[1.02]' : 'border-transparent shadow-sm hover:shadow-md'}`}
              style={{ 
                borderColor: isSelected ? '#5850EC' : 'transparent',
              }}
            >
              {/* Checkmark Circle */}
              {isSelected && (
                <div 
                  className="absolute top-6 right-6 rounded-full w-6 h-6 flex items-center justify-center text-[10px] border-2 border-white shadow-sm text-white"
                  style={{ backgroundColor: '#5850EC' }}
                >
                  ✓
                </div>
              )}

              {/* Icon Square */}
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-inner"
                style={{ backgroundColor: isSelected ? '#EEF2FF' : '#F3F4F6' }}
              >
                {subject.icon}
              </div>

              <h3 className="text-xl font-bold mb-3" style={{ color: '#111827' }}>{subject.id}</h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: '#6B7280' }}>
                {subject.description}
              </p>

              {/* Badge */}
              <div 
                className="mt-auto px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5"
                style={{ backgroundColor: '#EEF2FF', color: '#5850EC' }}
              >
                <span>⚡</span> Adaptive Enabled
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Navigation */}
      <div className="max-w-6xl mx-auto border-t pt-8 flex items-center justify-between" style={{ borderColor: '#E5E7EB' }}>
        <button 
          onClick={() => navigate(-1)}
          disabled={isLoading}
          className="flex items-center gap-2 font-bold transition-colors hover:opacity-70 disabled:opacity-50"
          style={{ color: '#6B7280' }}
        >
          <span>←</span> Back
        </button>

        <button 
          onClick={handleContinue}
          disabled={isLoading || selectedSubjects.length === 0}
          className="px-10 py-4 text-white font-bold rounded-2xl shadow-xl transition-all transform active:scale-95 flex items-center gap-2"
          style={{ 
            backgroundColor: (isLoading || selectedSubjects.length === 0) ? '#A3ACBF' : '#5850EC',
            boxShadow: (isLoading || selectedSubjects.length === 0) ? 'none' : '0 10px 15px -3px rgba(88, 80, 236, 0.3)',
            cursor: isLoading ? 'wait' : (selectedSubjects.length === 0 ? 'not-allowed' : 'pointer')
          }}
        >
          {isLoading ? 'Saving...' : 'Continue'} <span>→</span>
        </button>
      </div>
    </div>
  );
};

export default SubjectSelection;