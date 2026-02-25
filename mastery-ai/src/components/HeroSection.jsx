import { ChevronRight, BookOpen } from 'lucide-react';

export default function HeroSection({ 
  userName = "Alex", 
  recentModules = 3, 
  currentSubject = "JSS 2 Mathematics",
  hasStartedLearning = false // New prop to track user's progress
}) {
  return (
    <div className="bg-linear-to-r from-indigo-600 to-indigo-500 rounded-3xl p-8 text-white flex flex-col justify-center relative overflow-hidden flex-1 shadow-sm">
      <div className="relative z-10 max-w-lg">
        
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          {/* Change greeting based on status */}
          Welcome {hasStartedLearning ? "back," : ","} {userName}! <span className="text-2xl">👋</span>
        </h1>
        
        <p className="text-indigo-100 mb-8 leading-relaxed">
          {/* Change the motivational text based on status */}
          {hasStartedLearning 
            ? `You're on a roll! You finished ${recentModules} modules yesterday. Keep that momentum going today in ${currentSubject}.`
            : `Ready to dive in? Start your learning journey today with ${currentSubject}.`
          }
        </p>
        
        <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-indigo-50 transition-colors cursor-pointer">
          
          {/* Change the button text based on status */}
          {hasStartedLearning ? "Resume Current Topic" : "Start Learning"} 
          
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <BookOpen className="absolute right-12 top-8 w-32 h-32 text-white opacity-10 rotate-12" />
    </div>
  );
}