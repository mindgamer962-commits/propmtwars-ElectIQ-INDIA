import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, CheckCircle2, XCircle, ArrowRight, RotateCcw, ShieldCheck, Star, Zap, Landmark } from 'lucide-react';

const QUIZ_DATA = [
  {
    id: 1,
    question: "What is the minimum age to register as a voter in India?",
    options: ["16 Years", "18 Years", "21 Years", "25 Years"],
    answer: 1,
    explanation: "According to the Constitution of India, every citizen who is 18 years of age or older is entitled to be registered as a voter."
  },
  {
    id: 2,
    question: "What does VVPAT stand for in the voting process?",
    options: [
      "Voter Verified Paper Audit Trail",
      "Voter Value Print Action Tool",
      "Visual Voter Paper Account Task",
      "Voter Validated Power Audit Tech"
    ],
    answer: 0,
    explanation: "VVPAT stands for Voter Verifiable Paper Audit Trail. It allows voters to verify that their vote was cast correctly."
  },
  {
    id: 3,
    question: "Which body conducts elections to the Parliament and State Legislatures in India?",
    options: [
      "Supreme Court of India",
      "Ministry of Home Affairs",
      "Election Commission of India",
      "Planning Commission"
    ],
    answer: 2,
    explanation: "The Election Commission of India (ECI) is an autonomous constitutional authority responsible for administering election processes in India."
  },
  {
    id: 4,
    question: "How many Lok Sabha constituencies are there in India?",
    options: ["543", "250", "400", "552"],
    answer: 0,
    explanation: "There are currently 543 constituencies in the Lok Sabha. The members are elected from these constituencies via direct elections."
  },
  {
    id: 5,
    question: "What is the 'Silent Period' before polling starts?",
    options: [
      "12 hours before poll ends",
      "24 hours before poll starts",
      "48 hours before conclusion of poll",
      "Immediately after results are declared"
    ],
    answer: 2,
    explanation: "Election campaigning must stop 48 hours before the conclusion of the poll. This is known as the 'Silent Period'."
  }
];

const QuizEngine = () => {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleStart = () => {
    setStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowResult(false);
  };

  const handleOptionSelect = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === QUIZ_DATA[currentQuestion].answer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < QUIZ_DATA.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const getBadge = () => {
    const percentage = (score / QUIZ_DATA.length) * 100;
    if (percentage === 100) return { name: "Democracy Champion", icon: <Trophy />, color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20" };
    if (percentage >= 70) return { name: "Informed Citizen", icon: <ShieldCheck />, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" };
    return { name: "Young Voter", icon: <Star />, color: "text-slate-500", bg: "bg-white/5", border: "border-white/10" };
  };

  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center p-12 glass-panel rounded-[3rem] text-center max-w-2xl mx-auto border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-white/20 to-green-500" />
        <div className="w-24 h-24 bg-blue-500/10 rounded-[2rem] flex items-center justify-center text-blue-400 mb-8 border border-blue-500/20 shadow-inner">
          <Landmark size={48} />
        </div>
        <h2 className="text-4xl font-black mb-4 text-white tracking-tight italic">Civic Knowledge Hub</h2>
        <p className="text-slate-400 mb-10 max-w-md text-lg font-light leading-relaxed">How well do you know the rules of the world's largest democracy? Put your knowledge to the test.</p>
        <button 
          onClick={handleStart}
          className="px-12 py-5 bg-orange-600 hover:bg-orange-700 rounded-2xl text-white font-black uppercase tracking-[0.2em] text-xs transition-all shadow-xl shadow-orange-600/30"
        >
          Begin Challenge
        </button>
      </div>
    );
  }

  if (showResult) {
    const badge = getBadge();
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-16 rounded-[3rem] text-center max-w-2xl mx-auto border border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.5)]"
      >
        <div className={`w-32 h-32 ${badge.bg} ${badge.color} rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 ${badge.border} border-2 shadow-inner`}>
          {React.cloneElement(badge.icon, { size: 64 })}
        </div>
        <h2 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.4em] mb-4">Assessment Complete</h2>
        <h3 className="text-5xl font-black mb-8 text-white tracking-tighter italic">{badge.name}</h3>
        <div className="flex justify-center gap-12 mb-12">
          <div>
            <p className="text-5xl font-black text-white">{score}/{QUIZ_DATA.length}</p>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-2">Correct Answers</p>
          </div>
          <div className="w-px h-16 bg-white/10" />
          <div>
            <p className="text-5xl font-black text-white">{Math.round((score / QUIZ_DATA.length) * 100)}%</p>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-2">Proficiency Rate</p>
          </div>
        </div>
        <div className="flex gap-6">
          <button 
            onClick={handleStart}
            className="flex-1 py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] text-slate-300 flex items-center justify-center gap-3 transition-all"
          >
            <RotateCcw size={18} /> Restart Session
          </button>
          <button className="flex-1 py-5 bg-blue-600 hover:bg-blue-700 rounded-[1.5rem] text-white font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-600/30">
            Share Milestone
          </button>
        </div>
      </motion.div>
    );
  }

  const question = QUIZ_DATA[currentQuestion];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">
          <span>Module progress: {currentQuestion + 1} / {QUIZ_DATA.length}</span>
          <span>{Math.round(((currentQuestion + 1) / QUIZ_DATA.length) * 100)}%</span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
          <motion.div 
            className="h-full bg-gradient-to-r from-orange-500 to-orange-600"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / QUIZ_DATA.length) * 100}%` }}
          />
        </div>
      </div>

      <motion.div 
        key={currentQuestion}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-panel p-12 rounded-[3.5rem] mb-8 border border-white/5 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-12 opacity-5">
           <Landmark size={150} />
        </div>
        <h3 className="text-3xl font-bold mb-10 text-white leading-tight max-w-2xl italic">"{question.question}"</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options.map((option, idx) => {
            const isCorrect = idx === question.answer;
            const isSelected = selectedOption === idx;
            
            let statusClass = "border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/10 text-slate-300";
            if (isAnswered) {
              if (isCorrect) statusClass = "border-green-500/50 bg-green-500/10 text-green-400";
              else if (isSelected) statusClass = "border-red-500/50 bg-red-500/10 text-red-400";
              else statusClass = "border-white/5 bg-white/5 opacity-30 text-slate-500";
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleOptionSelect(idx)}
                className={`p-6 rounded-[2rem] border text-left transition-all flex justify-between items-center group relative overflow-hidden ${statusClass}`}
              >
                <span className="font-bold text-sm leading-relaxed tracking-wide z-10">{option}</span>
                {isAnswered && isCorrect && <CheckCircle2 className="text-green-500 shrink-0" size={24} />}
                {isAnswered && isSelected && !isCorrect && <XCircle className="text-red-500 shrink-0" size={24} />}
              </button>
            );
          })}
        </div>
      </motion.div>

      <AnimatePresence>
        {isAnswered && (
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="space-y-8"
          >
            <div className="p-8 bg-blue-500/5 border border-blue-500/10 rounded-[2.5rem] shadow-inner relative overflow-hidden">
               <div className="absolute -top-4 -right-4 opacity-10">
                  <ShieldCheck size={100} />
               </div>
              <div className="flex items-center gap-3 mb-4 text-blue-400">
                <ShieldCheck size={20} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Civic Context</span>
              </div>
              <p className="text-base text-slate-300 leading-relaxed font-light italic">
                 {question.explanation}
              </p>
            </div>
            <button 
              onClick={handleNext}
              className="w-full py-6 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 rounded-[2rem] text-white font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-4 group transition-all shadow-[0_20px_50px_rgba(234,88,12,0.3)]"
            >
              {currentQuestion === QUIZ_DATA.length - 1 ? "Complete Summary" : "Advance to next question"}
              <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizEngine;
