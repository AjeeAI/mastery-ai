import React from 'react';

const ProfileBanner = ({ user }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
      
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Avatar with Camera Icon */}
        <div className="relative">
          <div className="w-24 h-24 bg-indigo-100 rounded-2xl overflow-hidden border-4 border-white shadow-md">
            <img src={user.avatarUrl} alt="User Avatar" className="w-full h-full object-cover" />
          </div>
          <button className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-2 rounded-full shadow-lg hover:bg-indigo-700 transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          </button>
        </div>

        {/* User Info */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold text-slate-800">{user.fullName}</h1>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-2">
            <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full">
              {user.gradeLevel} • {user.league}
            </span>
            <span className="flex items-center gap-1 text-amber-600 text-sm font-semibold bg-amber-50 px-3 py-1 rounded-full">
              🪙 {user.masteryPoints} Mastery Points
            </span>
          </div>

          <p className="text-slate-500 text-sm mt-3 flex items-center justify-center md:justify-start gap-2">
            ✉️ {user.email}
          </p>
        </div>
      </div>

      {/* Action Button */}
      <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors flex items-center gap-2">
        <span>🔗</span> Share Profile
      </button>

    </div>
  );
};

export default ProfileBanner;