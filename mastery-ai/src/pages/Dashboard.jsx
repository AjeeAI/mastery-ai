import { Flame, Star, CheckCircle2, Clock } from 'lucide-react';

import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AIRecommendation from '../components/AIRecommendation';
import StatCard from '../components/StatCard';
import LearningMap from '../components/LearningMap';
import LearningTasks from '../components/LearningTasks';
import Leaderboard from '../components/Leaderboard';
import Footer from '../components/Footer';

export default function Dashboard() {

    // Mock API data for LearningMap nodes
    const apiData = [
        { id: 1, status: "mastered", title: "Number Bases" },
        { id: 2, status: "mastered", title: "Fractions & Decimals" },
        { id: 3, status: "current", title: "Algebraic Expressions", details: "64% MASTERY • NEEDS FOCUS" },
        { id: 4, status: "locked", title: "Linear Equations" },
        { id: 5, status: "locked", title: "Word Problems" }
    ];

    const apiLeaderboardData = [
        { id: "u1", rank: 1, name: "Sarah Jenkins", points: "4,250" },
        { id: "u2", rank: 2, name: "Marcus Thorne", points: "3,900" },
        { id: "u3", rank: 3, name: "Alex Rivera", points: "3,450", isCurrentUser: true }
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans">
            {/* <Header name="Alex Rivera" classLevel="SSS 2" /> */}

            <main className="max-w-9xl mx-auto px-6 py-8">
                <div className="flex flex-col lg:flex-row gap-6 mb-8">
                    <HeroSection userName='Alex' recentModules={3} currentSubject="SSS 2 Mathematics" hasStartedLearning={true}/>
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

                <LearningMap classLevel="SSS 2" subject="Mathematics" nodes={apiData} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <LearningTasks />
                    <Leaderboard items={apiLeaderboardData} leagueName="Gold League" />
                </div>

                <Footer />
            </main>
        </div>
    )
}