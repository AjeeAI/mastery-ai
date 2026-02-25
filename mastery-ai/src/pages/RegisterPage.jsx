import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({ 
    fullName: '', 
    email: '', 
    password: '' 
  });

  // Safely grab and clean the Client ID just like we did for Login
  const rawClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";
  const GOOGLE_CLIENT_ID = rawClientId.replace(/['"]/g, '').trim();

const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const googleToken = credentialResponse.credential;
      
      // 1. Send the token to your FastAPI backend
      const response = await fetch('http://localhost:8000/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: googleToken })
      });

      if (!response.ok) {
        throw new Error("Backend authentication failed");
      }

      // 2. The backend verified it! It will send back its OWN token and user data
      const data = await response.json();
      
      // 3. Save the BACKEND'S token (not Google's) to keep them logged into your app
      login(data.access_token); 

      // 4. Navigate to the dashboard
      navigate('/mastery-path');

    } catch (err) {
      console.error(err);
      setError("Failed to sync with server. Please try again.");
    }
  };
  
  const handleManualSubmit = (e) => {
    e.preventDefault();
    console.log("Manual signup attempt:", formData);
    // Future: Send formData to FastAPI
    navigate('/mastery-path');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      
      {/* LEFT COLUMN: Visual Branding (Identical to Login) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#6b46c1] relative flex-col items-center justify-center p-12 overflow-hidden">
        
        {/* Abstract Background Elements */}
        <div className="absolute top-10 left-10 text-white/10">
          <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/5 font-black text-9xl tracking-widest pointer-events-none select-none">
          ATOM
        </div>

        {/* Main Illustration Container */}
        <div className="relative w-full max-w-lg z-10">
          <div className="bg-[#e2e8f0] rounded-3xl aspect-[4/3] w-full shadow-2xl overflow-hidden relative">
            <img 
              src="https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1000&auto=format&fit=crop" 
              alt="Student studying" 
              className="object-cover w-full h-full opacity-90 mix-blend-multiply"
            />
          </div>

          <div className="absolute -top-6 -right-6 bg-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-4">
            <div className="bg-[#4f46e5] p-2 rounded-full text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mastery Score</p>
              <p className="text-2xl font-black text-[#4f46e5]">84%</p>
            </div>
          </div>

          <div className="absolute -bottom-8 inset-x-8 bg-white/20 backdrop-blur-md border border-white/30 p-5 rounded-2xl text-white shadow-lg flex items-center gap-4">
            <div className="bg-white/30 p-2.5 rounded-xl">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
            </div>
            <div>
              <p className="font-bold text-lg">Personalized Path Active</p>
              <p className="text-sm text-white/80">JSS2 Mathematics: Geometry Mastery</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Form Area */}
      <div className="w-full lg:w-1/2 flex flex-col items-center p-8 sm:p-12 bg-white relative overflow-y-auto">
        
        {/* Top Right Login Link */}
        <div className="w-full max-w-md flex justify-end mb-8">
          <p className="text-sm text-slate-500 font-medium">
            Already have an account? <Link to="/login" className="text-[#6b46c1] font-bold hover:underline">Log in</Link>
          </p>
        </div>
        
        <div className="w-full max-w-md space-y-6">
          
          {/* Header */}
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Join your AI Tutor</h1>
            <p className="text-slate-500 mt-2 text-sm leading-relaxed">
              Start your JSS1-JSS3 personalized learning journey today.
            </p>
          </div>

          {error && (
            <div className="bg-rose-50 text-rose-600 p-4 rounded-xl text-sm font-medium border border-rose-100">
              {error}
            </div>
          )}

          {/* Google Signup */}
          <div className="flex justify-center w-full [&>div]:w-full">
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError("Google Signup Failed. Please try again.")}
                useOneTap
                theme="outline"
                size="large"
                text="signup_with"
                width="100%"
                shape="rectangular"
              />
            </GoogleOAuthProvider>
          </div>

          {/* Divider */}
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink-0 mx-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest">Or Sign Up With Email</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleManualSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Full Name</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </span>
                <input 
                  type="text" 
                  placeholder="e.g. Jane Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6b46c1] transition-all"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">School or Personal Email</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </span>
                <input 
                  type="email" 
                  placeholder="jane@school.edu.ng"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6b46c1] transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Create Password</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                </span>
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-12 pr-12 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6b46c1] transition-all"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? (
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
                  ) : (
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                  )}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              <div className="flex gap-1.5 mt-2">
                <div className={`h-1 w-full rounded-full ${formData.password.length > 0 ? 'bg-[#6b46c1]' : 'bg-slate-200'}`}></div>
                <div className={`h-1 w-full rounded-full ${formData.password.length >= 8 ? 'bg-[#6b46c1]' : 'bg-slate-200'}`}></div>
                <div className="h-1 w-full rounded-full bg-slate-200"></div>
                <div className="h-1 w-full rounded-full bg-slate-200"></div>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="bg-indigo-50/50 border border-indigo-100 p-3.5 rounded-xl flex gap-3 my-4 items-start">
              <svg className="w-5 h-5 text-[#6b46c1] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your data is safe. We use your information strictly to personalize your mastery learning path using advanced AI algorithms.
              </p>
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#6b46c1] hover:bg-[#5b3da6] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-500/30"
            >
              Create Account
            </button>
          </form>

          {/* Social Proof & Footer */}
          <div className="text-center pt-6 pb-2">
            <p className="text-[10px] text-slate-500 font-medium mb-4">
              By signing up, you agree to our <a href="#" className="font-bold hover:underline">Terms of Service</a> & <a href="#" className="font-bold hover:underline">Privacy Policy</a>
            </p>
            
            <div className="flex justify-center items-center gap-2 mb-2">
              <div className="flex -space-x-2">
                <img className="w-6 h-6 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=1" alt="student" />
                <img className="w-6 h-6 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=2" alt="student" />
                <img className="w-6 h-6 rounded-full border-2 border-white bg-slate-200" src="https://i.pravatar.cc/100?img=3" alt="student" />
              </div>
              <p className="text-xs font-bold text-slate-700">Join 10,000+ JSS students today.</p>
            </div>
            
            <p className="text-[9px] text-slate-400 mt-6 uppercase tracking-widest">
              © 2024 MASTERY AI TUTOR • PERSONALIZED EDUCATION
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RegisterPage;