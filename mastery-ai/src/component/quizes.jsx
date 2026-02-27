import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

// All questions in this file
const QUESTIONS = [
  { id: 1, text: 'Solve for x in the following equation:', equation: '3x + 12 = 27', category: 'MATHEMATICS - ALGEBRA', options: [ { id: 'a', label: 'OPTION A', value: 'x = 5' }, { id: 'b', label: 'OPTION B', value: 'x = 13' }, { id: 'c', label: 'OPTION C', value: 'x = 9' }, { id: 'd', label: 'OPTION D', value: 'x = 15' } ], correct: 'a' },
  { id: 2, text: 'What is the value of y?', equation: '2y - 5 = 11', category: 'MATHEMATICS - ALGEBRA', options: [ { id: 'a', label: 'OPTION A', value: 'y = 8' }, { id: 'b', label: 'OPTION B', value: 'y = 6' }, { id: 'c', label: 'OPTION C', value: 'y = 3' }, { id: 'd', label: 'OPTION D', value: 'y = 12' } ], correct: 'a' },
  { id: 3, text: 'Solve for z:', equation: '4z + 20 = 60', category: 'MATHEMATICS - ALGEBRA', options: [ { id: 'a', label: 'OPTION A', value: 'z = 10' }, { id: 'b', label: 'OPTION B', value: 'z = 20' }, { id: 'c', label: 'OPTION C', value: 'z = 5' }, { id: 'd', label: 'OPTION D', value: 'z = 15' } ], correct: 'a' },
  { id: 4, text: 'What is the solution?', equation: '5x - 10 = 35', category: 'MATHEMATICS - ALGEBRA', options: [ { id: 'a', label: 'OPTION A', value: 'x = 9' }, { id: 'b', label: 'OPTION B', value: 'x = 7' }, { id: 'c', label: 'OPTION C', value: 'x = 5' }, { id: 'd', label: 'OPTION D', value: 'x = 3' } ], correct: 'a' },
  { id: 5, text: 'Solve for a:', equation: '2a + 8 = 18', category: 'MATHEMATICS - ALGEBRA', options: [ { id: 'a', label: 'OPTION A', value: 'a = 5' }, { id: 'b', label: 'OPTION B', value: 'a = 10' }, { id: 'c', label: 'OPTION C', value: 'a = 3' }, { id: 'd', label: 'OPTION D', value: 'a = 7' } ], correct: 'a' },
  { id: 6, text: 'Find x:', equation: 'x/2 + 5 = 15', category: 'MATHEMATICS - ALGEBRA', options: [ { id: 'a', label: 'OPTION A', value: 'x = 20' }, { id: 'b', label: 'OPTION B', value: 'x = 10' }, { id: 'c', label: 'OPTION C', value: 'x = 40' }, { id: 'd', label: 'OPTION D', value: 'x = 30' } ], correct: 'c' },
  { id: 7, text: 'Solve for b:', equation: '3b - 6 = 21', category: 'MATHEMATICS - ALGEBRA', options: [ { id: 'a', label: 'OPTION A', value: 'b = 9' }, { id: 'b', label: 'OPTION B', value: 'b = 6' }, { id: 'c', label: 'OPTION C', value: 'b = 3' }, { id: 'd', label: 'OPTION D', value: 'b = 12' } ], correct: 'a' },
  { id: 8, text: 'What is c?', equation: '4c + 2 = 18', category: 'MATHEMATICS - ALGEBRA', options: [ { id: 'a', label: 'OPTION A', value: 'c = 4' }, { id: 'b', label: 'OPTION B', value: 'c = 5' }, { id: 'c', label: 'OPTION C', value: 'c = 3' }, { id: 'd', label: 'OPTION D', value: 'c = 6' } ], correct: 'a' },
  { id: 9, text: 'Solve for d:', equation: 'd/3 + 4 = 8', category: 'MATHEMATICS - ALGEBRA', options: [ { id: 'a', label: 'OPTION A', value: 'd = 12' }, { id: 'b', label: 'OPTION B', value: 'd = 24' }, { id: 'c', label: 'OPTION C', value: 'd = 6' }, { id: 'd', label: 'OPTION D', value: 'd = 18' } ], correct: 'a' },
  { id: 10, text: 'Find e:', equation: '2e + 3 = 13', category: 'MATHEMATICS - ALGEBRA', options: [ { id: 'a', label: 'OPTION A', value: 'e = 5' }, { id: 'b', label: 'OPTION B', value: 'e = 4' }, { id: 'c', label: 'OPTION C', value: 'e = 6' }, { id: 'd', label: 'OPTION D', value: 'e = 8' } ], correct: 'a' },
  { id: 11, text: 'Solve for f:', equation: '5f - 15 = 35', category: 'MATHEMATICS - ALGEBRA', options: [ { id: 'a', label: 'OPTION A', value: 'f = 10' }, { id: 'b', label: 'OPTION B', value: 'f = 8' }, { id: 'c', label: 'OPTION C', value: 'f = 5' }, { id: 'd', label: 'OPTION D', value: 'f = 12' } ], correct: 'a' },
  { id: 12, text: 'What is g?', equation: '3g + 6 = 24', category: 'MATHEMATICS - ALGEBRA', options: [ { id: 'a', label: 'OPTION A', value: 'g = 6' }, { id: 'b', label: 'OPTION B', value: 'g = 5' }, { id: 'c', label: 'OPTION C', value: 'g = 4' }, { id: 'd', label: 'OPTION D', value: 'g = 8' } ], correct: 'a' }
];

export default function Quizes() {
  const navigate = useNavigate();
  const { quizId } = useParams();

  if (!quizId) return <p className="text-red-500 p-6">Invalid quiz ID</p>;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [skipped, setSkipped] = useState(new Set());

  const question = QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;
  const isLastQuestion = currentQuestion === QUESTIONS.length - 1;
  const isAnswered = selectedAnswers[currentQuestion] !== undefined;

  const handleSelectOption = (optionId) => {
    setSelectedAnswers(prev => ({ ...prev, [currentQuestion]: optionId }));
  };

  const handleSkip = () => {
    setSkipped(prev => new Set(prev).add(currentQuestion));
    if (!isLastQuestion) setCurrentQuestion(currentQuestion + 1);
  };

  const handleNext = () => {
    if (!isLastQuestion) setCurrentQuestion(currentQuestion + 1);
  };

  const handleSubmit = () => {
  const totalQuestions = QUESTIONS.length;

  let correct = 0;
  let skippedCount = skipped.size;

  QUESTIONS.forEach((q, index) => {
    if (selectedAnswers[index] === q.correct) {
      correct++;
    }
  });

  const scorePercentage = Math.round((correct / totalQuestions) * 100);

  navigate(`/quiz/${quizId}/in-progress`, {
    state: {
      totalQuestions,
      correct,
      skipped: skippedCount,
      percentage: scorePercentage
    }
  });
};

  return (
    <main className="min-h-screen bg-[#F3F0FF]">
      {/* Header */}
      <header className="bg-white border-b-2 shadow-sm" style={{ borderColor: '#7F13EC' }}>
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: '#7F13EC' }}>
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="font-bold text-gray-900">MasteryAI</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-sm text-gray-600">
              Question <span className="font-semibold">{currentQuestion + 1} of {QUESTIONS.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full transition-all duration-300" style={{ backgroundColor: '#7F13EC', width: `${progress}%` }} />
              </div>
              <div className="text-sm font-semibold text-gray-900 w-12 text-right">{Math.round(progress)}%</div>
            </div>
          </div>
        </div>
      </header>

      {/* Question */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-10 md:p-16" style={{ border: '2px solid #7F13EC' }}>
          <div className="text-center mb-8">
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#7F13EC' }}>
              {question.category}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-10">{question.text}</h2>
          <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-8 md:p-12 text-center mb-12">
            <div className="text-4xl md:text-5xl font-bold text-gray-900">{question.equation}</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {question.options.map(option => (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option.id)}
                className="p-6 rounded-2xl border-2 text-left transition-all duration-200"
                style={{
                  borderColor: selectedAnswers[currentQuestion] === option.id ? '#7F13EC' : '#E5E7EB',
                  backgroundColor: selectedAnswers[currentQuestion] === option.id ? '#F3F0FF' : '#FFFFFF'
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full border-2 mt-1 flex items-center justify-center flex-shrink-0" style={{
                    borderColor: selectedAnswers[currentQuestion] === option.id ? '#7F13EC' : '#D1D5DB',
                    backgroundColor: selectedAnswers[currentQuestion] === option.id ? '#7F13EC' : '#FFFFFF'
                  }}>
                    {selectedAnswers[currentQuestion] === option.id && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-500 mb-1">{option.label}</div>
                    <div className="text-lg font-semibold text-gray-900">{option.value}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <button onClick={handleSkip} className="text-gray-500 hover:text-gray-700 text-sm font-medium flex items-center gap-1 transition-colors">
              <span className="text-base">»</span> <span>I haven't learned this yet (Skip)</span>
            </button>
            <button
              onClick={isLastQuestion ? handleSubmit : handleNext}
              disabled={!isAnswered}
              className="px-8 py-3 rounded-full font-semibold transition-all"
              style={{
                backgroundColor: isAnswered ? '#7F13EC' : '#D1D5DB',
                color: isAnswered ? '#FFFFFF' : '#9CA3AF',
                cursor: isAnswered ? 'pointer' : 'not-allowed'
              }}
            >
              {isLastQuestion ? 'Submit Answer →' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}