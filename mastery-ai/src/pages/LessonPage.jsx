import React from 'react';
import { useNavigate } from 'react-router-dom'; // <-- 1. Import useNavigate
import CourseSidebar from '../components/CourseSidebar';

const LessonPage = () => {
  const navigate = useNavigate(); // <-- 2. Initialize it

  return (
    <div className="flex bg-slate-50 h-[calc(100vh-64px)] overflow-hidden">
      
      {/* Left Navigation */}
      <CourseSidebar activeStep="energy" />

      {/* Center Main Content */}
      <div className="flex-1 overflow-y-auto px-12 py-8">
        <div className="max-w-3xl mx-auto">
          
          {/* Breadcrumbs */}
          <div className="text-xs font-bold text-slate-400 mb-6 flex gap-2">
            <span>Courses</span> <span>›</span> <span>Basic Science</span> <span>›</span> <span className="text-slate-800">Energy Transformation</span>
          </div>

          <h1 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">Understanding Energy Transformation</h1>

          {/* Video Placeholder */}
          <div className="aspect-video bg-slate-800 rounded-3xl mb-10 relative overflow-hidden group shadow-xl">
            <img src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1200&auto=format&fit=crop" alt="Solar panels" className="w-full h-full object-cover opacity-70 mix-blend-overlay" />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-16 h-16 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-indigo-600 hover:scale-110 transition-transform shadow-2xl pl-1">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </button>
            </div>
            <div className="absolute bottom-4 left-6 text-white font-bold text-sm">Introduction to Energy Conversion</div>
            <div className="absolute bottom-4 right-6 text-white font-bold text-sm bg-black/50 px-2 py-1 rounded">04:20</div>
          </div>

          {/* Lesson Text */}
          <div className="prose prose-slate max-w-none">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">The Law of Conservation of Energy</h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              In basic science, we learn that energy cannot be created or destroyed. Instead, it changes from one form to another. This process is called <strong>Energy Transformation</strong>. Think of a light bulb: it takes electrical energy and transforms it into light energy and heat energy.
            </p>

            <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded-r-2xl mb-8">
              <p className="text-indigo-900 font-medium italic m-0">
                "Energy transformation is the process of changing energy from one form to another. All around us, energy is constantly shifting between kinetic, potential, thermal, and chemical states."
              </p>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-4">Common Examples for JSS Students:</h3>
            <ul className="space-y-4 mb-12">
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">1</div>
                <p className="text-slate-600"><strong>Photosynthesis:</strong> Plants convert radiant energy from the sun into chemical energy stored in food.</p>
              </li>
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">2</div>
                <p className="text-slate-600"><strong>Electric Fan:</strong> Converts electrical energy into kinetic energy (motion) to move the blades.</p>
              </li>
            </ul>
          </div>

          {/* Content Footer Nav */}
          <div className="flex justify-between items-center pt-8 border-t border-slate-200 pb-12">
            <button className="text-slate-500 font-bold hover:text-slate-800 transition-colors flex items-center gap-2">
              <span>←</span> Previous: Living Things
            </button>
            {/* <-- 3. Wired up the button to skip to the quiz --> */}
            <button 
              onClick={() => navigate('/module-quiz')}
              className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 flex items-center gap-2"
            >
              Take Mastery Quiz <span>→</span>
            </button>
          </div>

        </div>
      </div>

      {/* Right AI Sidebar */}
      <div className="w-80 bg-white border-l border-slate-200 flex flex-col h-[calc(100vh-64px)]">
        <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-indigo-50/50">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-sm shadow-md">🤖</div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">AI Tutor</h3>
            <p className="text-[10px] text-emerald-500 font-bold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> ALWAYS LISTENING</p>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-sm">
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl rounded-tl-sm text-slate-600">
            Hi Alex! I'm your AI tutor. I see you're learning about <strong className="text-indigo-600">Energy Transformation</strong>.<br/><br/>
            I have access to the current JSS2 curriculum. Would you like me to explain how a hydroelectric dam works or give more examples of kinetic energy?
          </div>
          
          <div className="bg-indigo-600 p-4 rounded-2xl rounded-tr-sm text-white shadow-md shadow-indigo-100 ml-4">
            Yes, please! How does energy change when I kick a ball?
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 bg-white">
          <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide">
            <button className="whitespace-nowrap px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-100">Explain Hydroelectric</button>
            <button className="whitespace-nowrap px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-100">Examples of Kinetic</button>
          </div>
          <div className="relative">
            <input type="text" placeholder="Ask a question about this topic..." className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent" />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center hover:bg-indigo-700 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LessonPage;