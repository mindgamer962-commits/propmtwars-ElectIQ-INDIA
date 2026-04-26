import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Bot, User, Sparkles, AlertCircle, ExternalLink } from 'lucide-react';
import electionData from '../data/electionData.json';

const SUGGESTED_CHIPS = [
  "How to register as a voter in India?",
  "What is the Model Code of Conduct?",
  "How does EVM and VVPAT work?",
  "What is Form 6?",
  "Tell me about the Silent Period"
];

const AIChat = ({ initialQuery, isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      type: 'bot', 
      text: "Namaste! I am your ElectIQ Knowledge Assistant. I've been trained on the official Election Commission of India (ECI) process documents. How can I help you today?", 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (initialQuery && messages.length === 1) {
      handleSend(`Tell me more about ${initialQuery}`);
    }
  }, [initialQuery]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const findLocalAnswer = (query) => {
    const q = query.toLowerCase();
    
    // Check in election phases
    const matchingPhase = electionData.find(phase => 
      q.includes(phase.phase.toLowerCase()) || 
      phase.keyConcepts.some(c => q.includes(c.toLowerCase()))
    );

    if (matchingPhase) {
      return `Based on official process details for "${matchingPhase.phase}":\n\n${matchingPhase.description}\n\nKey details include: ${matchingPhase.keyConcepts.join(', ')}.\n\nNote: ${matchingPhase.misconception}`;
    }

    if (q.includes("form 6") || q.includes("register")) {
      return "To register as a new voter, you need to submit 'Form 6'. This can be done online via the NVSP Portal (voters.eci.gov.in) or by visiting your Electoral Registration Officer (ERO). You'll need proof of age and residence.";
    }

    if (q.includes("evm") || q.includes("vvpat")) {
      return "EVM (Electronic Voting Machine) and VVPAT (Voter Verifiable Paper Audit Trail) are used for voting. VVPAT allows you to see a printed slip for 7 seconds to confirm your vote was cast correctly. It is a highly secure transparent system.";
    }

    return "That's a great question about the Indian electoral process! While I'm looking for the specific details, I recommend checking the official ECI portal at voters.eci.gov.in for the most up-to-date legal guidelines.";
  };

  const handleSend = async (text) => {
    const userText = text || input;
    if (!userText.trim()) return;

    const userMessage = { id: Date.now(), type: 'user', text: userText, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Artificial delay for realism
    setTimeout(() => {
      const response = findLocalAnswer(userText);
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: response, timestamp: new Date() }]);
      setIsTyping(false);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 flex flex-col w-full max-w-[450px] h-[650px] bg-[#0f172a] rounded-[2.5rem] overflow-hidden animate-slide-up shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/5"
      role="dialog"
      aria-labelledby="chat-title"
    >
      {/* Header */}
      <div className="p-6 bg-white/5 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-orange-500/10 via-transparent to-green-500/10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-600/20">
            <Bot size={28} aria-hidden="true" />
          </div>
          <div>
            <h3 id="chat-title" className="font-black text-white leading-tight italic">ElectIQ Assistant</h3>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">Offline Local Guide</span>
            </div>
          </div>
        </div>
        <button 
          onClick={onClose} 
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
          aria-label="Close Chat"
        >
          <X size={20} className="text-slate-400" />
        </button>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto p-6 space-y-6 bg-black/10"
        aria-live="polite"
      >
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] flex gap-4 ${m.type === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center ${m.type === 'bot' ? 'bg-orange-500/10 text-orange-500' : 'bg-blue-600 text-white'}`}>
                {m.type === 'bot' ? <Sparkles size={16} aria-hidden="true" /> : <User size={16} aria-hidden="true" />}
              </div>
              <div className={`p-4 rounded-3xl text-sm leading-relaxed shadow-sm ${
                m.type === 'bot' 
                  ? 'bg-white/5 text-slate-300 rounded-tl-none border border-white/5' 
                  : 'bg-blue-600 text-white rounded-tr-none'
              }`}>
                {m.text.split('\n').map((line, i) => <p key={i} className={i > 0 ? "mt-3" : ""}>{line}</p>)}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-500">
                <Sparkles size={16} />
              </div>
              <div className="bg-white/5 px-5 py-4 rounded-3xl rounded-tl-none border border-white/5">
                <div className="flex gap-1.5" aria-label="Bot is typing">
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-black/20 border-t border-white/5 space-y-4 backdrop-blur-3xl">
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar" role="list">
          {SUGGESTED_CHIPS.map(chip => (
            <button 
              key={chip}
              onClick={() => handleSend(chip)}
              className="whitespace-nowrap px-4 py-2 bg-white/5 hover:bg-white/10 hover:border-blue-500/50 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 transition-all focus:ring-1 focus:ring-blue-500"
              role="listitem"
            >
              {chip}
            </button>
          ))}
        </div>

        <div className="relative">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything about the Indian election..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all text-white placeholder:text-slate-600"
            aria-label="Message Assistant"
          />
          <button 
            onClick={() => handleSend()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 text-blue-400 hover:bg-blue-600 hover:text-white rounded-xl transition-all shadow-xl"
            aria-label="Send message"
          >
            <Send size={20} />
          </button>
        </div>
        
        <div className="flex items-center justify-between text-[10px] text-slate-600 font-black tracking-widest uppercase">
           <div className="flex items-center gap-1.5">
              <AlertCircle size={12} />
              Local Knowledge Base v.2.0
           </div>
           <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
              ECI Official Portal <ExternalLink size={10} />
           </a>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
