// import React from 'react';
// import { Search, Bell, BookOpen } from 'lucide-react';

// export default function Header({ name, classLevel }) {
//   return (
//     <header className="flex items-center justify-between px-8 py-4 bg-white sticky top-0 z-50 border-b border-gray-100">
//       <div className="flex items-center gap-8">
//         <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
//           <BookOpen className="w-6 h-6" />
//           <span>MasteryAI</span>
//         </div>
//         <nav className="hidden md:flex gap-6 text-sm font-medium">
//           <a href="#" className="text-indigo-600">Dashboard</a>
//           <a href="#" className="text-gray-500 hover:text-gray-900">Learning Path</a>
//           <a href="#" className="text-gray-500 hover:text-gray-900">Mastery Path</a>
//           <a href="#" className="text-gray-500 hover:text-gray-900">Practice</a>
//         </nav>
//       </div>

//       <div className="flex items-center gap-6">
//         <div className="relative hidden md:block">
//           <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
//           <input 
//             type="text" 
//             placeholder="Search topics..." 
//             className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 w-64"
//           />
//         </div>
//         <button className="text-gray-400 hover:text-gray-600 relative">
//           <Bell className="w-5 h-5" />
//           <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
//         </button>
//         <div className="flex items-center gap-3 border-l border-gray-200 pl-6">
//           <div className="text-right hidden sm:block">
//             <div className="text-sm font-semibold text-gray-900">{name}</div>
//             <div className="text-xs text-indigo-600 font-medium bg-indigo-50 px-2 py-0.5 rounded-full inline-block mt-0.5">
//               {classLevel} • Student
//             </div>
//           </div>
//           <div className="w-10 h-10 rounded-full bg-indigo-100 overflow-hidden">
//             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Profile" className="w-full h-full object-cover" />
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

import React, { useState } from 'react';
import { Search, Bell, BookOpen, Menu, X } from 'lucide-react';

export default function Header({ name, classLevel }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm relative">
        {/* Main Header Container */}
        <div className="flex items-center justify-between px-4 py-4 md:px-8">
          
          {/* Logo and Desktop Nav */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
              <BookOpen className="w-6 h-6" />
              <span>MasteryAI</span>
            </div>
            
            {/* Desktop Navigation - Hidden on Mobile */}
            <nav className="hidden md:flex gap-6 text-sm font-medium">
              <a href="#" className="text-indigo-600">Dashboard</a>
              <a href="#" className="text-gray-500 hover:text-gray-900">Learning Path</a>
              <a href="#" className="text-gray-500 hover:text-gray-900">Mastery Path</a>
              <a href="#" className="text-gray-500 hover:text-gray-900">Practice</a>
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Search Bar - Hidden on Mobile */}
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search topics..." 
                className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 w-64"
              />
            </div>

            <button className="text-gray-400 hover:text-gray-600 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center gap-3 md:border-l md:border-gray-200 md:pl-6">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-semibold text-gray-900">{name}</div>
                <div className="text-xs text-indigo-600 font-medium bg-indigo-50 px-2 py-0.5 rounded-full inline-block mt-0.5">
                  {classLevel} • Student
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-indigo-100 overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Hamburger Menu Button - Visible ONLY on Mobile */}
            <button 
              className="md:hidden p-1 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              onClick={toggleMenu}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* --- MOBILE DRAWER OVERLAY --- */}
      {/* Clicking this dark background will close the menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 md:hidden transition-opacity"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}

      {/* --- MOBILE SLIDE-IN DRAWER --- */}
      <div 
        className={`fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <span className="font-bold text-gray-900 text-lg">Menu</span>
          <button 
            onClick={toggleMenu} 
            className="p-1 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-4 overflow-y-auto">
          <nav className="flex flex-col gap-2 text-sm font-medium">
            <a href="#" className="text-indigo-600 block px-3 py-2 rounded-lg bg-indigo-50 transition-colors">Dashboard</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 block px-3 py-2 rounded-lg transition-colors">Learning Path</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 block px-3 py-2 rounded-lg transition-colors">Mastery Path</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 block px-3 py-2 rounded-lg transition-colors">Practice</a>
            
            <div className="h-px bg-gray-100 my-4"></div>

            {/* Mobile Search Bar inside the drawer */}
            <div className="relative mt-2">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search topics..." 
                className="pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-100 w-full shadow-sm"
              />
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}