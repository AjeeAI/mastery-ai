import React, { useState } from 'react';
import { 
  ArrowLeft, BookOpen, PlayCircle, ArrowRight, 
  CheckCircle2, Zap, Lock, ChevronDown, ChevronUp, AlertCircle, Star 
} from 'lucide-react';

// --- MOCK DATA ---
const courseData = {
  title: "Basic Science",
  tag: "JSS 1",
  term: "Term 1 Curriculum",
  description: "Master the fundamental principles of living and non-living things, energy, and matter.",
  masteryPercentage: 60,
  completedTopics: 12,
  totalTopics: 20,
  currentAction: { title: "2.2 Energy Conversion Laws" }
};

const sidebarData = {
  currentTerm: "Term 1 - 2024",
  week: "Week 7 of 12",
  termProgress: 65,
  subjects: [
    { id: 1, name: "Basic Science", grade: "A", active: true },
    { id: 2, name: "Mathematics", grade: "B+", active: false },
    { id: 3, name: "English", grade: "A-", active: false }
  ]
};

const syllabusData = [
  {
    id: 1,
    title: "Matter in Nature",
    description: "Understanding states of matter and properties.",
    status: "completed", 
    masteredConcepts: 5,
    totalConcepts: 5,
    subTopics: [
      { id: "1.1", title: "Definition of Matter", duration: "10 mins", status: "completed", rating: 3 },
      { id: "1.2", title: "States of Matter (Solid, Liquid, Gas)", duration: "15 mins", status: "completed", rating: 3.5 }
    ]
  },
  {
    id: 2,
    title: "Energy Transformation",
    description: "How energy changes from one form to another.",
    status: "in-progress",
    masteredConcepts: 3,
    totalConcepts: 5,
    subTopics: [
      { id: "2.1", title: "Forms of Energy", status: "mastered", actionText: "Review" },
      { id: "2.2", title: "Energy Conversion Laws", status: "in-progress", actionText: "Continue" },
      { id: "2.3", title: "Renewable Energy Sources", status: "locked" }
    ]
  },
  {
    id: 3,
    title: "Forces & Power",
    lockedMessage: "Complete Topic 2 to unlock",
    status: "locked",
    masteredConcepts: 0,
    totalConcepts: 5,
    subTopics: []
  },
  {
    id: 4,
    title: "Living Things",
    description: "Characteristics and classification.",
    status: "locked",
    masteredConcepts: 0,
    totalConcepts: 6,
    subTopics: []
  }
];

// --- MAIN PAGE ---
const CoursePage = () => {
  const [expandedTopics, setExpandedTopics] = useState([1, 2]);

  const toggleTopic = (id) => {
    setExpandedTopics((prev) => 
      prev.includes(id) ? prev.filter(topicId => topicId !== id) : [...prev, id]
    );
  };

  const expandAll = () => setExpandedTopics(syllabusData.map(t => t.id));
  const collapseAll = () => setExpandedTopics([]);

  return (
    <div className="flex max-w-full  min-h-screen bg-white font-sans text-gray-900">

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 px-4 py-8 md:px-8 lg:px-12 bg-white">
        <div className="max-w-8xl mx-auto">
          
          {/* COURSE HEADER */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 mb-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="max-w-xl">
              <div className="flex items-center space-x-2 mb-3">
                <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2.5 py-1 rounded">
                  {courseData.tag}
                </span>
                <span className="text-gray-400 text-sm font-medium">{courseData.term}</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{courseData.title}</h1>
              <p className="text-gray-500 text-sm leading-relaxed">
                {courseData.description}
              </p>
            </div>

            <div className="w-full md:w-auto md:min-w-70 flex flex-col gap-4">
              <div className="flex justify-between items-end mb-1">
                <div>
                  <span className="text-3xl font-bold text-indigo-600">{courseData.masteryPercentage}%</span>
                  <p className="text-xs text-gray-400 mt-1">Total Mastery</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-gray-700">{courseData.completedTopics}/{courseData.totalTopics} Topics</span>
                  <p className="text-xs text-emerald-500 font-medium mt-1">On Track</p>
                </div>
              </div>
              
              <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${courseData.masteryPercentage}%` }}></div>
              </div>

              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 px-4 flex items-center justify-between transition-colors shadow-md shadow-indigo-200">
                <div className="flex items-center">
                  <PlayCircle className="w-5 h-5 mr-3 text-indigo-200" />
                  <div className="text-left">
                    <p className="text-[10px] text-indigo-200 uppercase font-semibold tracking-wider">Resume Learning</p>
                    <p className="text-sm font-bold">{courseData.currentAction.title}</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* SYLLABUS SECTION */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Course Syllabus</h2>
              <div className="flex space-x-4">
                <button onClick={expandAll} className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
                  Expand All
                </button>
                <button onClick={collapseAll} className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">
                  Collapse All
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {syllabusData.map((topic) => {
                const isCompleted = topic.status === 'completed';
                const isInProgress = topic.status === 'in-progress';
                const isLocked = topic.status === 'locked';
                const isExpanded = expandedTopics.includes(topic.id);

                return (
                  <div key={topic.id} className={`border rounded-2xl mb-4 overflow-hidden transition-all duration-300 ${
                    isLocked ? 'border-gray-100 bg-gray-50/50' : 
                    isInProgress ? 'border-indigo-100 shadow-sm' : 'border-gray-200'
                  }`}>
                    
                    {/* Topic Header */}
                    <div 
                      className="flex items-center justify-between p-5 cursor-pointer bg-white"
                      onClick={() => toggleTopic(topic.id)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-2.5 rounded-full shrink-0 ${
                          isCompleted ? 'bg-emerald-50 text-emerald-500' :
                          isInProgress ? 'bg-orange-50 text-orange-500' :
                          'bg-gray-100 text-gray-400'
                        }`}>
                          {isCompleted && <CheckCircle2 className="w-6 h-6" />}
                          {isInProgress && <Zap className="w-6 h-6 fill-orange-500 text-orange-500" />}
                          {isLocked && <Lock className="w-6 h-6" />}
                        </div>

                        <div>
                          <h3 className={`text-base font-bold ${isLocked ? 'text-gray-400' : 'text-gray-900'}`}>
                            Topic {topic.id}: {topic.title}
                          </h3>
                          {topic.description && !isLocked && (
                            <p className="text-sm text-gray-500 mt-1">{topic.description}</p>
                          )}
                          {isLocked && topic.lockedMessage && (
                            <p className="text-sm text-orange-500 mt-1 flex items-center">
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {topic.lockedMessage}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 ml-4">
                        <span className={`hidden sm:inline-block text-xs font-bold px-3 py-1.5 rounded-full ${
                          isCompleted ? 'bg-emerald-50 text-emerald-600' :
                          isInProgress ? 'bg-orange-50 text-orange-600' :
                          'bg-gray-100 text-gray-400'
                        }`}>
                          {topic.masteredConcepts}/{topic.totalConcepts} Concepts {isLocked ? 'Mastered' : 'Mastered'}
                        </span>
                        <button className="text-gray-400 hover:text-gray-600">
                          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    {/* Subtopics (Expanded Content) */}
                    {isExpanded && topic.subTopics && topic.subTopics.length > 0 && (
                      <div className="px-5 pb-5 pt-2 bg-white border-t border-gray-50">
                        {topic.subTopics.map((subTopic) => {
                          const subIsMastered = subTopic.status === 'mastered' || subTopic.status === 'completed';
                          const subIsInProgress = subTopic.status === 'in-progress';
                          const subIsLocked = subTopic.status === 'locked';

                          return (
                            <div key={subTopic.id} className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border mb-3 last:mb-0 transition-colors ${
                              subIsLocked ? 'bg-gray-50 border-transparent' : 'bg-white border-gray-100 hover:border-gray-200'
                            }`}>
                              
                              <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                                {subIsMastered && <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />}
                                {subIsInProgress && <PlayCircle className="w-6 h-6 text-indigo-600 shrink-0" />}
                                {subIsLocked && <div className="bg-gray-200 p-1.5 rounded-full"><Lock className="w-4 h-4 text-gray-400" /></div>}

                                <div>
                                  <h4 className={`text-sm font-bold ${subIsLocked ? 'text-gray-400' : 'text-gray-800'}`}>
                                    {subTopic.id} {subTopic.title}
                                  </h4>
                                  
                                  <div className="flex items-center mt-1 space-x-2">
                                    {subTopic.duration && (
                                      <span className="text-xs text-gray-400">• {subTopic.duration}</span>
                                    )}
                                    {subIsInProgress && (
                                      <span className="text-[10px] text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded font-medium">• In Progress</span>
                                    )}
                                    {subIsMastered && subTopic.actionText === 'Review' && (
                                      <span className="text-[10px] text-gray-400">• Mastered</span>
                                    )}
                                    {subIsLocked && (
                                      <span className="text-[10px] text-gray-400">• Locked</span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center w-full sm:w-auto justify-end pl-10 sm:pl-0">
                                {subIsMastered && !subTopic.actionText && (
                                  <div className="flex space-x-1">
                                    {[...Array(3)].map((_, i) => (
                                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(subTopic.rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-yellow-400/30 text-yellow-400/30'}`} />
                                    ))}
                                  </div>
                                )}

                                {subIsMastered && subTopic.actionText && (
                                  <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                                    {subTopic.actionText}
                                  </button>
                                )}

                                {subIsInProgress && (
                                  <button className="text-xs font-bold bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                                    {subTopic.actionText}
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default CoursePage;