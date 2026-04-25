import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, BrainCircuit, Landmark, HelpCircle, ChevronDown, Globe, Search, UserCheck } from 'lucide-react';
import Timeline from './components/Timeline';
import AIChat from './components/AIChat';
import QuizEngine from './components/QuizEngine';

function App() {
  const [activeMode, setActiveMode] = useState('journey'); // journey, quiz
  const [chatOpen, setChatOpen] = useState(false);
  const [initialChatQuery, setInitialChatQuery] = useState('');

  const handleInteractWithAI = (phase) => {
    setInitialChatQuery(phase);
    setChatOpen(true);
  };

  return (
    <div className="min-h-screen text-slate-100 font-outfit relative">
      {/* Background Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-green-500/10 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-blue-500/5 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-tr from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-orange-500/20">
              🇮🇳
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase italic">
              Elect<span className="text-orange-500">IQ</span> <span className="text-sm font-bold text-slate-500 align-top ml-1">INDIA</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-1 p-1 bg-white/5 rounded-2xl border border-white/10">
            <button 
              onClick={() => setActiveMode('journey')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeMode === 'journey' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
            >
              <Landmark size={16} /> Process Timeline
            </button>
            <button 
              onClick={() => setActiveMode('quiz')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeMode === 'quiz' ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/20' : 'text-slate-400 hover:text-white'}`}
            >
              <BrainCircuit size={16} /> Civic Quiz
            </button>
          </div>

          <div className="flex items-center gap-4">
             <a href="https://voters.eci.gov.in" target="_blank" className="hidden lg:flex items-center gap-2 px-4 py-2 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors">
                <Search size={16} /> Electoral Roll
             </a>
             <button 
              onClick={() => setChatOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-sm font-bold transition-all shadow-lg"
            >
              <HelpCircle size={18} className="text-orange-500" />
              <span className="hidden sm:inline">Ask AI assistant</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-24 pb-20 px-6 text-center">
        <motion.div
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-orange-400 tracking-widest uppercase mb-8 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            Official 2026 Voter Guide • India
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight max-w-5xl mx-auto leading-[1.1] text-white">
            Empowering the <span className="text-orange-500 italic">Largest Democracy</span> with AI.
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            Understand the journey from Voter Registration to Result Declaration. ElectIQ helps you navigate the Indian electoral process with clarity and confidence.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
             <button 
              onClick={() => {
                setActiveMode('journey');
                window.scrollTo({ top: 800, behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-orange-600 hover:bg-orange-700 rounded-2xl text-white font-bold transition-all shadow-xl shadow-orange-500/30 group flex items-center gap-2"
             >
                Explore the Process <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform" />
             </button>
             <button 
              onClick={() => setChatOpen(true)}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold transition-all flex items-center gap-3 text-white shadow-sm"
             >
                <UserCheck size={20} className="text-green-500" /> Voter Registration Guide
             </button>
          </div>
        </motion.div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 pb-40">
        <AnimatePresence mode="wait">
          {activeMode === 'journey' ? (
            <motion.section 
              key="journey"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="mb-16 text-center">
                 <h2 className="text-4xl font-bold mb-4 tracking-tight text-white underline decoration-blue-500/30 underline-offset-8 uppercase italic">Electoral Phase Timeline</h2>
                 <p className="text-slate-400 text-lg">Detailed guide for every stage of Indian general and state elections.</p>
              </div>
              <Timeline onInteract={handleInteractWithAI} />
            </motion.section>
          ) : (
            <motion.section 
              key="quiz"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="py-12"
            >
               <QuizEngine />
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* ECI Resources Strip */}
      <div className="bg-[#020617] py-24 text-white text-center border-t border-white/5">
         <div className="max-w-4xl mx-auto px-6">
            <h3 className="text-3xl font-bold mb-8 italic">Official Civic Gateways</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <a href="https://voters.eci.gov.in" target="_blank" className="p-8 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/10 transition-all group">
                  <h4 className="font-bold text-orange-400 mb-2 group-hover:translate-x-1 transition-transform">NVSP Portal →</h4>
                  <p className="text-sm text-slate-500">Register as a new voter or update details online.</p>
               </a>
               <a href="https://eci.gov.in/voter-education/" target="_blank" className="p-8 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/10 transition-all group">
                  <h4 className="font-bold text-blue-400 mb-2 group-hover:translate-x-1 transition-transform">SVEEP Program →</h4>
                  <p className="text-sm text-slate-500">Official ECI voter education and awareness tools.</p>
               </a>
               <a href="https://affidavit.eci.gov.in" target="_blank" className="p-8 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/10 transition-all group">
                  <h4 className="font-bold text-green-400 mb-2 group-hover:translate-x-1 transition-transform">Candidate Search →</h4>
                  <p className="text-sm text-slate-500">View affidavits, assets, and criminal records.</p>
               </a>
            </div>
         </div>
      </div>

      {/* Footer */}
      <footer className="py-24 border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
           <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white font-bold text-xl">🇮🇳</div>
              <span className="text-3xl font-black italic tracking-tighter text-white">Elect<span className="text-orange-500">IQ</span></span>
           </div>
           
           <p className="text-center text-slate-500 max-w-2xl mb-12 leading-relaxed">
             ElectIQ is an independent civic engagement tool. All data is sourced from the Election Commission of India (ECI) official guidelines for 2026. Non-partisan and education-first.
           </p>
           
           <div className="flex flex-wrap justify-center gap-8 mb-12">
              <a href="#" className="font-bold text-slate-400 hover:text-orange-500 transition-colors uppercase text-xs tracking-widest">Voter Rights</a>
              <a href="#" className="font-bold text-slate-400 hover:text-orange-500 transition-colors uppercase text-xs tracking-widest">MCC Guidelines</a>
              <a href="#" className="font-bold text-slate-400 hover:text-orange-500 transition-colors uppercase text-xs tracking-widest">ECI FAQ</a>
              <a href="#" className="font-bold text-slate-400 hover:text-orange-500 transition-colors uppercase text-xs tracking-widest">About Us</a>
           </div>

           <div className="pt-8 border-t border-white/5 w-full flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-xs text-slate-600 font-bold tracking-widest uppercase">© 2026 ElectIQ India. Built for Democratic Literacy.</div>
              <div className="flex items-center gap-4">
                 <button className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 transition-all border border-white/5">
                    <Globe size={20} />
                 </button>
                 <div className="text-[10px] text-slate-600 font-black uppercase tracking-[0.3em]">
                    Nation First • Vote First
                 </div>
              </div>
           </div>
        </div>
      </footer>

      {/* AI Chat Button (Mobile) & Component */}
      <AnimatePresence>
        {chatOpen && (
          <AIChat 
            isOpen={chatOpen} 
            onClose={() => setChatOpen(false)} 
            initialQuery={initialChatQuery}
          />
        )}
      </AnimatePresence>
      
      {!chatOpen && (
        <motion.button 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setChatOpen(true)}
          className="fixed bottom-10 right-10 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/50 z-40 hover:scale-110 transition-transform"
        >
          <MessageCircle size={32} />
        </motion.button>
      )}
    </div>
  );
}

export default App;
