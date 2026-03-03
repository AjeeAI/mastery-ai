import React, { useState, useEffect } from 'react';
import { Flame, Star, CheckCircle2, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext'; 

import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AIRecommendation from '../components/AIRecommendation';
import StatCard from '../components/StatCard';
import LearningMap from '../components/LearningMap';
import LearningTasks from '../components/LearningTasks';
import Leaderboard from '../components/Leaderboard';
import Footer from '../components/Footer';

export default function Dashboard() {
    const { token } = useAuth();
    const { userData, studentData } = useUser(); 

    // Dynamic User Data
    const fullName = userData 
      ? `${userData.first_name || ''} ${userData.last_name || ''}`.trim() 
      : 'Student';
    const activeId = studentData?.user_id || userData?.id;

    // Grab the student's actual level, term, and their first enrolled subject
    const currentLevel = studentData?.sss_level || 'SSS1';
    const currentTerm = studentData?.current_term || 1; // <-- Now capturing the Term!
    const currentSubject = studentData?.subjects?.[0] || 'math'; // Defaults to math if missing

    // State for the Learning Map
    const [mapNodes, setMapNodes] = useState([]);
    const [isLoadingMap, setIsLoadingMap] = useState(true);

    const apiUrl = import.meta.env.VITE_API_URL;

    // --- Fetch Learning Map Data ---
    // --- Fetch Learning Map Data ---
    useEffect(() => {
        // 1. If we don't have the ID or Token yet, don't fetch, just wait!
        // The component will automatically re-run this effect once they load.
        if (!activeId || !token) {
            return; 
        }

        const fetchLearningMap = async () => {
            setIsLoadingMap(true); // 2. Start the spinner only when we are actually fetching
            
            try {
                const queryParams = new URLSearchParams({
                    student_id: activeId,
                    subject: currentSubject,
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

                if (!response.ok) {
                    throw new Error("Failed to fetch learning map");
                }

                const data = await response.json();
                setMapNodes(data.nodes || data);

            } catch (err) {
                console.error("Map fetch error:", err);
                
                // Fallback to demo data so the UI doesn't break
                setMapNodes([
                    { id: 1, status: "mastered", title: "Number Bases" },
                    { id: 2, status: "mastered", title: "Fractions & Decimals" },
                    { id: 3, status: "current", title: "Algebraic Expressions", details: "64% MASTERY • NEEDS FOCUS" },
                    { id: 4, status: "locked", title: "Linear Equations" },
                    { id: 5, status: "locked", title: "Word Problems" }
                ]);
            } finally {
                setIsLoadingMap(false); // 3. Guarantee the spinner turns off!
            }
        };

        fetchLearningMap();
    }, [activeId, currentSubject, currentLevel, currentTerm, token, apiUrl]);
    
    // Mock API data for Leaderboard
    const apiLeaderboardData = [
        { id: "u1", rank: 1, name: "Sarah Jenkins", points: "4,250" },
        { id: "u2", rank: 2, name: "Marcus Thorne", points: "3,900" },
        { id: "u3", rank: 3, name: fullName, points: "3,450", isCurrentUser: true } 
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans">
            <main className="max-w-9xl mx-auto px-6 py-8">
                <div className="flex flex-col lg:flex-row gap-6 mb-8">
                    <HeroSection 
                        recentModules={3} 
                        currentSubject={`${currentLevel} ${currentSubject.charAt(0).toUpperCase() + currentSubject.slice(1)}`} 
                        hasStartedLearning={true}
                    />
                    <AIRecommendation/>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard 
                        icon={Flame} iconBg="bg-orange-50" iconColor="text-orange-500"
                        title="Study Streak" value="12 Days" subtext="Personal Best!" subtextColor="text-orange-500"
                    />
                    <StatCard 
                        icon={Star} iconBg="bg-yellow-50" iconColor="text-yellow-500"
                        title="Mastery Points" value="3,450" subtext={`+${150} today`} subtextColor="text-gray-400"
                    />
                    <StatCard 
                        icon={CheckCircle2} iconBg="bg-green-50" iconColor="text-green-500"
                        title="Concepts Mastered" value="28 / 45" 
                    />
                    <StatCard 
                        icon={Clock} iconBg="bg-blue-50" iconColor="text-blue-500"
                        title="Study Time" value="14h 20m" subtext="This week" subtextColor="text-gray-400"
                    />
                </div>

                {/* Dynamically pass the fetched nodes to the LearningMap */}
                {isLoadingMap ? (
                    <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center text-slate-500 mb-8 animate-pulse">
                        <div className="w-8 h-8 mx-auto border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                        Generating your personalized learning path...
                    </div>
                ) : (
                    <LearningMap classLevel={currentLevel} subject={currentSubject} nodes={mapNodes} />
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