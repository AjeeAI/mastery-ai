import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext'; 
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AIRecommendation from '../components/AIRecommendation';
import DashboardStats from '../components/DashboardStats'; // <-- NEW IMPORT
import LearningMap from '../components/LearningMap';
import LearningTasks from '../components/LearningTasks';
import Leaderboard from '../components/Leaderboard';
import Footer from '../components/Footer';

export default function Dashboard() {
    const { token } = useAuth();
    const { userData, studentData } = useUser(); 
    const navigate = useNavigate();
    const fullName = userData ? `${userData.first_name || ''} ${userData.last_name || ''}`.trim() : 'Student';
    const activeId = studentData?.user_id || userData?.id;
    const currentLevel = studentData?.sss_level || 'SSS1';
    const currentTerm = studentData?.current_term || 1; 

    // --- NEW SUBJECT SELECTION LOGIC ---
    const enrolledSubjects = studentData?.subjects || []; 
    // Start as null so the user is forced to pick a subject from the HeroSection
    const [activeSubject, setActiveSubject] = useState(null);

    // State for the Learning Map
    const [mapNodes, setMapNodes] = useState([]);
    const [isLoadingMap, setIsLoadingMap] = useState(false);

    const apiUrl = import.meta.env.VITE_API_URL;

    // 👇 ADD THIS EFFECT: The Onboarding Bouncer 👇
    useEffect(() => {
        // If studentData has loaded, BUT they have 0 subjects enrolled
        if (studentData && (!studentData.subjects || studentData.subjects.length === 0)) {
            console.log("Incomplete profile detected. Redirecting to onboarding...");
            navigate('/class-selection');
        }
    }, [studentData, navigate]);

    // --- Fetch Learning Map Data ---
    useEffect(() => {
        // ONLY fetch if we have an ID, Token, AND the user has selected a subject!
        if (!activeId || !token || !activeSubject) {
            return; 
        }

        const fetchLearningMap = async () => {
            setIsLoadingMap(true); 
            
            try {
                const queryParams = new URLSearchParams({
                    student_id: activeId,
                    subject: activeSubject, // Uses the selected subject!
                    sss_level: currentLevel,
                    term: currentTerm,
                    view: 'topic' 
                });

                const response = await fetch(`${apiUrl}/learning/path/map/visual?${queryParams}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) throw new Error("Failed to fetch learning map");

                const data = await response.json();
                setMapNodes(data.nodes || data);

            } catch (err) {
                console.error("Map fetch error:", err);
                // Fallback demo data
                setMapNodes([
                    { id: 1, status: "mastered", title: "Number Bases" },
                    { id: 2, status: "mastered", title: "Fractions & Decimals" },
                    { id: 3, status: "current", title: "Algebraic Expressions", details: "64% MASTERY • NEEDS FOCUS" },
                    { id: 4, status: "locked", title: "Linear Equations" }
                ]);
            } finally {
                setIsLoadingMap(false); 
            }
        };

        fetchLearningMap();
    }, [activeId, activeSubject, currentLevel, currentTerm, token, apiUrl]); // Added activeSubject to dependencies
    
    const apiLeaderboardData = [
        { id: "u1", rank: 1, name: "Sarah Jenkins", points: "4,250" },
        { id: "u2", rank: 2, name: "Marcus Thorne", points: "3,900" },
        { id: "u3", rank: 3, name: fullName, points: "3,450", isCurrentUser: true } 
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans">
            <main className="max-w-9xl mx-auto px-6 py-8">
                <div className="flex flex-col lg:flex-row gap-6 mb-8">
                    
                    {/* NEW: Pass the required props to HeroSection */}
                    <HeroSection 
                        enrolledSubjects={enrolledSubjects}
                        activeSubject={activeSubject}
                        onSelectSubject={setActiveSubject}
                        hasStartedLearning={false} // Will make this dynamic when we fetch activity history!
                    />
                    
                    <AIRecommendation/>
                </div>

                {/* 👇 Your dynamic component handles the rest now! 👇 */}
                <DashboardStats />

                {/* DYNAMIC MAP RENDERING */}
                {!activeSubject ? (
                    <div className="w-full bg-white rounded-3xl shadow-sm border border-slate-200 p-16 text-center mb-8 flex flex-col items-center justify-center">
                        <div className="w-20 h-20 bg-indigo-50 text-indigo-400 rounded-full flex items-center justify-center mb-6 shadow-inner">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-3">Your Learning Map is Waiting</h3>
                        <p className="text-slate-500 max-w-md mx-auto text-lg">Select a subject from the top section to generate your personalized AI curriculum map.</p>
                    </div>
                ) : isLoadingMap ? (
                    <div className="w-full bg-white rounded-3xl shadow-sm border border-slate-200 p-16 text-center text-indigo-500 font-medium mb-8 animate-pulse flex flex-col items-center">
                        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                        Generating your personalized {activeSubject} path...
                    </div>
                ) : (
                    <LearningMap classLevel={currentLevel} subject={activeSubject} nodes={mapNodes} />
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <LearningTasks />
                    <Leaderboard items={apiLeaderboardData} leagueName="Gold League" />
                </div>

                <Footer />
            </main>
        </div>
    )
}