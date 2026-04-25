import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Bot, User, Sparkles, AlertCircle, ExternalLink } from 'lucide-react';

const SUGGESTED_CHIPS = [
  "How to register as a voter in India?",
  "What is the Model Code of Conduct?",
  "How does EVM and VVPAT work?",
  "What is Form 6?",
  "Check my polling booth details"
];

// Enhanced Knowledge Base with Keyword Mapping
const KNOWLEDGE_BASE = [
  {
    keywords: ["REGISTER", "REGISTRATION", "NEW VOTER", "HOW TO VOTE"],
    response: "To register as a voter in India, follow these steps:\n1. Visit the NVSP portal (voters.eci.gov.in) or download the Voter Helpline App.\n2. Click on 'New Voter Registration' and fill Form 6.\n3. Upload your age proof and residence proof.\n4. A Booth Level Officer (BLO) will visit you for verification. Once approved, your EPIC card will be issued!"
  },
  {
    keywords: ["FORM 6", "SIX", "NEW REGISTRATION FORM"],
    response: "Form 6 is the application form for 'New Voter Registration'. It is used by Indian citizens who have turned 18 or are registering for the first time in a particular constituency. You can fill it online at voters.eci.gov.in."
  },
  {
    keywords: ["MCC", "MODEL CODE", "CONDUCT", "RULES FOR PARTIES"],
    response: "The Model Code of Conduct (MCC) is a set of guidelines issued by the ECI for political parties and candidates during elections. It starts from the day elections are announced and prohibits the ruling party from using government resources for campaigning or making fresh announcements."
  },
  {
    keywords: ["EVM", "VVPAT", "MACHINE", "HOW TO CAST"],
    response: "EVM (Electronic Voting Machine) is used to record your vote. VVPAT (Voter Verifiable Paper Audit Trail) is a connected device that prints a slip showing your choice for 7 seconds. This ensures you can verify that your vote was cast exactly as intended."
  },
  {
    keywords: ["BOOTH", "POLLING STATION", "WHERE TO VOTE", "LOCATION"],
    response: "You can find your polling booth details by:\n1. Visiting the Voter Search portal at electorsverification.eci.gov.in.\n2. Checking the Voter Helpline App.\n3. Calling the 1950 Helpline number from your registered mobile."
  },
  {
    keywords: ["DOCUMENTS", "ID", "AADHAAR", "VOTER ID", "EPIC"],
    response: "While a Voter ID (EPIC) is preferred, on polling day you can use any of these ECI-approved IDs:\n- Aadhaar Card\n- PAN Card\n- Driving License\n- Indian Passport\n- MNREGA Job Card\n- Pension document with photograph."
  }
];

const AIChat = ({ initialQuery, isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      type: 'bot', 
      text: "Namaste! I am your Indian Civic Assistant. I can help with Form 6, Registration, EVMs, and more. What is your question?", 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (initialQuery) {
      handleSend(`Tell me more about ${initialQuery}`);
    }
  }, [initialQuery]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (text) => {
    const userText = text || input;
    if (!userText.trim()) return;

    setMessages(prev => [...prev, { id: Date.now(), type: 'user', text: userText, timestamp: new Date() }]);
    setInput('');
    setIsTyping(true);

    // Improved Search Logic
    setTimeout(() => {
      const query = userText.toUpperCase();
      let response = "That's a specific question I'm still learning about. In most cases, the Election Commission website (eci.gov.in) has the definitive answer. Would you like me to explain the basic registration process instead?";

      // Keyword matching
      for (const entry of KNOWLEDGE_BASE) {
        if (entry.keywords.some(k => query.includes(k))) {
          response = entry.response;
          break;
        }
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: response, timestamp: new Date() }]);
      setIsTyping(false);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col w-full max-w-[450px] h-[650px] bg-[#0f172a] rounded-[2.5rem] overflow-hidden animate-slide-up shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/5">
      {/* Header */}
      <div className="p-6 bg-white/5 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-orange-500/10 via-transparent to-green-500/10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
            <Bot size={28} />
          </div>
          <div>
            <h3 className="font-black text-white leading-tight italic">Civic Guide</h3>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">Verified Info</span>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <X size={20} className="text-slate-400" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-black/10">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] flex gap-4 ${m.type === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center ${m.type === 'bot' ? 'bg-orange-500/10 text-orange-500' : 'bg-blue-600 text-white'}`}>
                {m.type === 'bot' ? <Sparkles size={16} /> : <User size={16} />}
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
                <div className="flex gap-1.5">
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
        {/* Suggested Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {SUGGESTED_CHIPS.map(chip => (
            <button 
              key={chip}
              onClick={() => handleSend(chip)}
              className="whitespace-nowrap px-4 py-2 bg-white/5 hover:bg-white/10 hover:border-blue-500/50 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 transition-all"
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
            placeholder="Ask about Form 6, Voter ID, EVMs..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all text-white placeholder:text-slate-600"
          />
          <button 
            onClick={() => handleSend()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 text-blue-400 hover:bg-blue-600 hover:text-white rounded-xl transition-all shadow-xl"
          >
            <Send size={20} />
          </button>
        </div>
        
        <div className="flex items-center justify-between text-[10px] text-slate-600 font-black tracking-widest uppercase">
           <div className="flex items-center gap-1.5">
              <AlertCircle size={12} />
              Civic Guard Active
           </div>
           <a href="https://voters.eci.gov.in" target="_blank" className="flex items-center gap-1 hover:text-white transition-colors">
              ECI Official Portal <ExternalLink size={10} />
           </a>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
