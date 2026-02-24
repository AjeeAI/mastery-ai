import React from 'react';
import ContextSidebar from '../components/ContextSidebar';
import AIExplanationArea from '../components/AIExplanationArea';
import PracticeSidebar from '../components/PracticeSidebar';

// Assuming you get this from a Context or API fetch
import { mockData } from '../mocks/mockData';

const ExplainMistakePage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* <Navbar /> - Assuming another teammate is building this */}
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* 3-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: 3/12 width */}
          <div className="lg:col-span-3 space-y-6">
            <ContextSidebar 
              questionData={mockData.originalQuestion} 
              insightData={mockData.topicInsight} 
            />
          </div>

          {/* Middle Column: 6/12 width */}
          <div className="lg:col-span-6">
            <AIExplanationArea explanationData={mockData.explanation} />
          </div>

          {/* Right Column: 3/12 width */}
          <div className="lg:col-span-3 space-y-6">
            <PracticeSidebar practiceData={mockData.practice} />
          </div>

        </div>
      </main>
    </div>
  );
};

export default ExplainMistakePage;