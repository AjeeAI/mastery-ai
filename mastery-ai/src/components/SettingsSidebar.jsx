import React from 'react';

const SettingsSidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'account', icon: '👤', label: 'Account Settings' },
    { id: 'preferences', icon: '⚙️', label: 'Learning Preferences' },
    { id: 'mastery', icon: '🏆', label: 'Mastery & Achievements' },
    { id: 'notifications', icon: '🔔', label: 'Notification Rules' },
  ];

  return (
    <div className="flex flex-col gap-1">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left ${
            activeTab === item.id 
              ? 'bg-white text-indigo-700 shadow-sm border border-slate-200' 
              : 'text-slate-600 hover:bg-slate-200/50'
          }`}
        >
          <span>{item.icon}</span>
          {item.label}
        </button>
      ))}

      <hr className="my-2 border-slate-200" />
      
      <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors text-left">
        <span>↪️</span> Sign Out
      </button>
    </div>
  );
};

export default SettingsSidebar;