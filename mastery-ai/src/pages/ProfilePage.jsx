import React, { useState } from 'react';
import ProfileBanner from '../components/ProfileBanner';
import SettingsSidebar from '../components/SettingsSidebar';
import AccountSettingsView from '../components/AccountSettingsView';
import LearningPreferencesView from '../components/LearningPreferencesView';
import { profileData } from '../mocks/profileData';

const ProfilePage = () => {
  // State to manage which sidebar tab is active
  const [activeTab, setActiveTab] = useState('account');

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* <Navbar /> - Assuming shared team component */}
      
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Top Banner Area */}
        <ProfileBanner user={profileData.user} />

        {/* Bottom Split Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation Sidebar (3 columns) */}
          <div className="md:col-span-3">
            <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* Right Content Area (9 columns) */}
          <div className="md:col-span-9">
            {/* Conditional rendering based on active tab */}
            {activeTab === 'account' && (
              <AccountSettingsView 
                user={profileData.user} 
                school={profileData.school} 
                security={profileData.security} 
              />
            )}
            {activeTab === 'preferences' && <LearningPreferencesView />}
            {activeTab === 'mastery' && <div className="p-8 bg-white rounded-xl shadow-sm border border-slate-200">Mastery coming soon...</div>}
          </div>

        </div>
      </main>
    </div>
  );
};

export default ProfilePage;