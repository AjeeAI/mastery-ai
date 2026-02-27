import React, { useState } from 'react';

const AccountSettingsView = ({ user, school, security }) => {
  // Local form state so inputs are controlled
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    email: user.email,
    gradeLevel: user.gradeLevel,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">
      
      {/* Basic Info Form */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800">Account Information</h2>
        <p className="text-sm text-slate-500 mb-6">Update your personal details and account preferences.</p>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Full Name</label>
              <input 
                type="text" 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Email Address</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow bg-slate-50 text-slate-500 cursor-not-allowed"
                disabled // Emails usually require separate verification to change
              />
            </div>
          </div>

          <div className="space-y-2 w-full md:w-1/2 md:pr-3">
            <label className="text-sm font-semibold text-slate-700">Grade Level</label>
            <select 
              name="gradeLevel"
              value={formData.gradeLevel}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white"
            >
              <option value="sss 1">sss 1</option>
              <option value="sss 2">sss 2</option>
              <option value="sss 3">sss 3</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end">
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors">
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* School Information */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-5">School Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-4 p-4 border border-slate-100 bg-slate-50 rounded-xl">
            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-lg">🏫</div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase">Current School</p>
              <p className="font-bold text-slate-800">{school.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 border border-slate-100 bg-slate-50 rounded-xl">
            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-lg">🪪</div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase">Student ID</p>
              <p className="font-bold text-slate-800">{school.studentId}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-5">Security</h3>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-slate-100 bg-slate-50 rounded-xl">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-lg">🔑</div>
            <div>
              <p className="font-bold text-slate-800">Account Password</p>
              <p className="text-xs text-slate-500">Last changed {security.lastPasswordChange}</p>
            </div>
          </div>
          <button className="px-5 py-2 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-lg transition-colors">
            Change Password
          </button>
        </div>
      </div>

    </div>
  );
};

export default AccountSettingsView;