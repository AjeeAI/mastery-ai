import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import CourseSidebar from '../components/CourseSidebar';
import { Menu, X, MessageSquare, Send, ChevronRight, BookOpen } from 'lucide-react';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
// 👇 1. IMPORT REHYPE-RAW TO HANDLE HTML
import rehypeRaw from 'rehype-raw';

const LessonPage = () => {
  const navigate = useNavigate();
  const { topicId } = useParams(); 
  const { token } = useAuth();
  const { studentData, userData } = useUser();
  const activeId = studentData?.user_id || userData?.id;

  const currentSubject = localStorage.getItem('active_subject') || studentData?.subjects?.[0] || 'math';
  const currentLevel = studentData?.sss_level || 'SSS1';
  const currentTerm = studentData?.current_term || 1;

  // --- UI STATE ---
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
  const [isChatOpen, setIsChatOpen] = useState(window.innerWidth > 1280); 

  // --- CORE DATA STATES ---
  const [lessonData, setLessonData] = useState(null);
  const [sidebarTopics, setSidebarTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // --- AI CHAT STATES ---
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  // 👇 THE AUTO-ENTER FIX FOR TABLES
  const formatAIMessage = (text) => {
    if (!text) return "";
    return text.replace(/\|\s*\|/g, '|\n|');
  };

  const apiUrl = import.meta.env.VITE_API_URL || 'https://mastery-backend-7xe8.onrender.com/api/v1';

  // Handle auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isChatOpen]);

  // Handle window resize for UI state
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
        setIsChatOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!activeId || !token || !topicId) return;

    const initializeLessonAndChat = async () => {
      setIsLoading(true);
      try {
        const lessonResponse = await fetch(`${apiUrl}/learning/topics/${topicId}/lesson?student_id=${activeId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (lessonResponse.ok) setLessonData(await lessonResponse.json());

        const topicsParams = new URLSearchParams({ student_id: activeId, subject: currentSubject, term: currentTerm });
        const topicsResponse = await fetch(`${apiUrl}/learning/topics?${topicsParams}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (topicsResponse.ok) setSidebarTopics(await topicsResponse.json());

        const sessionResponse = await fetch(`${apiUrl}/tutor/sessions/start`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ student_id: activeId, subject: currentSubject, term: currentTerm })
        });

        if (sessionResponse.ok) {
          const sessionData = await sessionResponse.json();
          setSessionId(sessionData.session_id);
        }
      } catch (err) {
        console.error("Initialization error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeLessonAndChat();

    return () => {
      if (sessionId) {
        fetch(`${apiUrl}/tutor/sessions/${sessionId}/end`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        }).catch(e => console.error("Error ending session", e));
      }
    };
  }, [topicId, activeId, token]);

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || !sessionId || isTyping) return;

    const studentMsg = chatInput;
    setMessages(prev => [...prev, { role: 'student', content: studentMsg }]);
    setChatInput("");
    setIsTyping(true);

    try {
      const response = await fetch(`${apiUrl}/tutor/chat`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          student_id: activeId,
          session_id: sessionId,
          subject: currentSubject,
          sss_level: currentLevel,
          term: currentTerm,
          topic_id: topicId,
          message: studentMsg
        })
      });

      if (!response.ok) throw new Error();
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.assistant_message, citation: data.citations }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting. Could you try that again?" }]);
    } finally {
      setIsTyping(false);
    }
  };

  const renderContentBlock = (block, index) => {
    switch (block.type) {
      case 'video':
        return (
          <div key={index} className="aspect-video bg-slate-900 rounded-2xl md:rounded-3xl mb-10 relative overflow-hidden shadow-xl">
            {block.url ? <iframe src={block.url} className="w-full h-full" allowFullScreen title="Video"></iframe> : <div className="flex flex-col items-center justify-center h-full text-slate-500">Video Missing</div>}
          </div>
        );
      case 'example':
        const example = typeof block.value === 'object' ? block.value : { note: block.value };
        return (
          <div key={index} className="bg-indigo-50 border-l-4 border-indigo-600 p-4 md:p-6 rounded-r-2xl mb-8 text-sm">
            <h4 className="text-xs font-bold text-indigo-800 uppercase tracking-wider mb-2">Worked Example</h4>
            {example.prompt && <p className="font-bold text-indigo-900 mb-2">{example.prompt}</p>}
            <p className="text-indigo-800 mb-4">{example.note || example.solution}</p>
            {example.solution && <div className="mt-4 p-4 bg-white/50 rounded-xl border border-indigo-100"><span className="text-[10px] font-bold text-indigo-400 uppercase">Solution</span><p className="text-indigo-900 text-sm mt-1">{example.solution}</p></div>}
          </div>
        );
      case 'exercise':
        const exercise = typeof block.value === 'object' ? block.value : { question: block.value };
        return (
          <div key={index} className="bg-emerald-50 border-l-4 border-emerald-600 p-4 md:p-6 rounded-r-2xl mb-8 text-sm">
            <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">Practice Task</h4>
            <p className="text-emerald-900 font-medium mb-2">{exercise.question}</p>
            <details className="mt-4"><summary className="text-xs font-bold text-emerald-600 cursor-pointer hover:text-emerald-700">Show Expected Answer</summary><p className="mt-2 text-sm text-emerald-800 bg-white/50 p-3 rounded-lg border border-emerald-100 italic">{exercise.expected_answer}</p></details>
          </div>
        );
      case 'text':
      default:
        return <div key={index} className="text-slate-700 text-base md:text-lg leading-relaxed mb-8 whitespace-pre-wrap">{typeof block.value === 'object' ? (block.value.note || JSON.stringify(block.value)) : block.value}</div>;
    }
  };

  return (
    <div className="flex bg-slate-50 h-[calc(100vh-64px)] overflow-hidden relative">
      
      {/* --- SIDEBAR --- */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 z-50 lg:hidden" 
          onClick={() => setIsSidebarOpen(false)} 
        />
      )}
      <div 
        className={`bg-white border-r border-slate-200 transition-all duration-300 ease-in-out flex-shrink-0 z-50 fixed inset-y-0 left-0 lg:relative ${
          isSidebarOpen ? 'w-72 translate-x-0' : 'w-0 -translate-x-full lg:translate-x-0 overflow-hidden'
        }`}
      >
        <CourseSidebar activeStep={topicId} subject={currentSubject} level={currentLevel} topics={sidebarTopics} />
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <div className="h-14 border-b border-slate-200 bg-white flex items-center justify-between px-4 flex-shrink-0">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors flex items-center gap-2"
          >
            <Menu size={20} />
            <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">Syllabus</span>
          </button>

          <div className="flex items-center gap-2 overflow-hidden px-2">
             <BookOpen size={16} className="text-indigo-600 flex-shrink-0" />
             <span className="text-xs font-black text-slate-700 truncate capitalize">{currentSubject}</span>
          </div>

          {!isChatOpen && (
            <button 
              onClick={() => setIsChatOpen(true)}
              className="p-2 hover:bg-indigo-50 rounded-lg text-indigo-600 transition-colors flex items-center gap-2"
            >
              <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">AI Tutor</span>
              <MessageSquare size={20} />
            </button>
          )}
        </div>

        {/* READING AREA */}
        <div className="flex-1 overflow-y-auto px-4 py-6 md:px-12 md:py-8 scrollbar-hide">
          <div className="max-w-3xl mx-auto">
            {isLoading ? (
               <div className="animate-pulse space-y-6 mt-4">
                 <div className="h-6 bg-slate-200 rounded w-1/3 mb-10"></div>
                 <div className="h-12 bg-slate-200 rounded-xl w-3/4 mb-8"></div>
                 <div className="aspect-video bg-slate-200 rounded-3xl w-full mb-8"></div>
               </div>
            ) : error ? (
              <div className="bg-rose-50 text-rose-600 p-6 rounded-2xl border border-rose-100 text-center mt-10">
                <p className="font-bold">{error}</p>
                <button onClick={() => navigate('/dashboard')} className="mt-4 text-sm font-semibold underline">Return to Dashboard</button>
              </div>
            ) : lessonData ? (
              <>
                <div className="text-[10px] font-bold text-slate-400 mb-6 flex gap-2 items-center uppercase tracking-widest overflow-hidden">
                  <span className="cursor-pointer hover:text-indigo-600 flex-shrink-0" onClick={() => navigate('/dashboard')}>Courses</span> 
                  <span>›</span> 
                  <span className="cursor-pointer hover:text-indigo-600 truncate" onClick={() => navigate(`/course/${currentSubject}`)}>{currentSubject}</span> 
                  <span>›</span> 
                  <span className="text-slate-800 truncate">{lessonData.title || 'Topic'}</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 tracking-tight leading-tight">{lessonData.title}</h1>
                {lessonData.summary && <p className="text-slate-500 text-sm md:text-base mb-10 leading-relaxed">{lessonData.summary}</p>}
                <div className="mt-8">
                  {lessonData.content_blocks?.map((block, index) => renderContentBlock(block, index))}
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-slate-200 pb-24 mt-12">
                  <button onClick={() => navigate(`/course/${currentSubject}`)} className="w-full sm:w-auto text-sm text-slate-500 font-bold hover:text-slate-800 transition-colors flex items-center justify-center gap-2"><span>←</span> Back to Syllabus</button>
                  <button onClick={() => navigate(`/quiz/${topicId}`)} className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 flex items-center justify-center gap-2">Take Mastery Quiz <span>→</span></button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>

      {/* --- CHATBOT PANEL --- */}
      <div 
        className={`bg-white border-l border-slate-200 transition-all duration-300 ease-in-out flex-shrink-0 flex flex-col fixed inset-y-0 right-0 z-50 lg:relative ${
          isChatOpen ? 'w-full sm:w-96 translate-x-0' : 'w-0 -translate-x-full lg:translate-x-0 overflow-hidden border-none'
        }`}
      >
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-indigo-50/50 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-sm shadow-md">🤖</div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">AI Tutor</h3>
              <p className="text-[10px] text-emerald-500 font-bold flex items-center gap-1 uppercase">
                  <span className={`w-1.5 h-1.5 rounded-full bg-emerald-500 ${isTyping ? 'animate-ping' : 'animate-pulse'}`}></span> 
                  {isTyping ? 'Thinking' : 'Online'}
              </p>
            </div>
          </div>
          <button onClick={() => setIsChatOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors p-2">
            <X size={20} className="lg:hidden" />
            <ChevronRight size={20} className="hidden lg:block" />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 text-xs scroll-smooth bg-white">
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl rounded-tl-sm text-slate-600 leading-relaxed">
            Hi {userData?.first_name || 'there'}! I'm your AI tutor. I see you're learning about <strong className="text-indigo-600">{lessonData?.title || 'this topic'}</strong>.
          </div>

          {messages.map((msg, i) => (
            <div key={i}>
              <div 
                className={`p-4 rounded-2xl max-w-[95%] leading-relaxed ${
                  msg.role === 'student' 
                    ? 'bg-indigo-600 text-white ml-auto rounded-tr-sm shadow-md' 
                    : 'bg-slate-50 border border-slate-100 text-slate-600 mr-auto rounded-tl-sm prose prose-sm prose-slate max-w-none prose-td:align-top prose-th:p-3 prose-td:p-3'
                }`}
              >
                {/* 👇 2. ADDED REHYPE-RAW TO THE COMPONENT HERE 👇 */}
                {msg.role === 'assistant' ? (
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]} 
                    rehypePlugins={[rehypeRaw]}
                  >
                    {formatAIMessage(msg.content)}
                  </ReactMarkdown>
                ) : (
                  msg.content
                )}
              </div>
              
              {/* THE CITATION CRASH FIX */}
              {msg.citation && (
                <div className="text-[10px] text-slate-500 mt-2">
                  <p className="font-bold">Sources:</p>
                  <ul className="list-disc list-inside mt-1">
                    {msg.citation.map((cite, idx) => (
                      <li key={idx} className="truncate">
                        {typeof cite === 'string' ? cite : cite.snippet || `Source: ${cite.source_id}`}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl rounded-tl-sm w-16 flex justify-center gap-1">
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-100 bg-white flex-shrink-0 pb-10 lg:pb-4">
          <form onSubmit={handleSendMessage} className="relative">
            <input 
              type="text" 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              disabled={isTyping || !sessionId}
              placeholder="Ask a question..." 
              className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600" 
            />
            <button type="submit" disabled={!chatInput.trim() || isTyping} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center hover:bg-indigo-700 disabled:bg-slate-300 transition-colors">
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>

      {/* CHAT FAB (Only shows when Chat is closed) */}
      {!isChatOpen && (
        <button 
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-indigo-700 transition-all hover:scale-110 z-40"
        >
          <MessageSquare size={24} />
        </button>
      )}

    </div>
  );
};

export default LessonPage;