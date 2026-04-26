import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserPlus, Target, Flag, Megaphone, 
  CheckSquare, BarChart2, Award, Landmark,
  ChevronRight, Info, MessageSquare, ExternalLink, X
} from 'lucide-react';
import electionData from '../data/electionData.json';

const iconMap = {
  UserPlus, Target, Flag, Megaphone, 
  CheckSquare, BarChart2, Award, Landmark
};

const Timeline = ({ onInteract }) => {
  const [activeStep, setActiveStep] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="flex flex-col relative">
        {/* Timeline Path */}
        <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-1 bg-white/5 transform md:-translate-x-1/2 overflow-hidden rounded-full">
          <motion.div 
            className="w-full bg-gradient-to-bottom from-orange-500 via-blue-500 to-green-600 h-full"
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12 md:space-y-32 w-full py-8"
        >
          {electionData.map((item, index) => {
            const Icon = iconMap[item.icon];
            const isEven = index % 2 === 0;

            return (
              <motion.div 
                key={item.id}
                variants={itemVariants}
                className={`flex flex-col md:flex-row items-center w-full relative ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Step Marker */}
                <div className="absolute left-[31px] md:left-1/2 w-5 h-5 rounded-full bg-slate-900 border-4 border-blue-500 z-10 transform md:-translate-x-1/2 flex items-center justify-center">
                   <div className="w-1 h-1 bg-blue-500 rounded-full" />
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-[42%] pl-20 md:pl-0 ${isEven ? 'md:pl-16' : 'md:pr-16'}`}>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="glass-panel p-8 rounded-3xl cursor-pointer group transition-all relative overflow-hidden focus:ring-2 focus:ring-blue-500 outline-none"
                    onClick={() => setActiveStep(activeStep === item.id ? null : item.id)}
                    tabIndex={0}
                    role="button"
                    aria-label={`View details for Phase ${item.id}: ${item.phase}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setActiveStep(activeStep === item.id ? null : item.id);
                      }
                    }}
                  >
                    <div className={`absolute top-0 left-0 w-1 h-full ${index < 3 ? 'bg-orange-500' : index < 6 ? 'bg-blue-500' : 'bg-green-500'}`} />
                    
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-white/5 rounded-2xl mr-4 text-slate-400 border border-white/5 group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors">
                        <Icon size={24} />
                      </div>
                      <span className="text-[10px] font-black tracking-[0.2em] uppercase text-slate-500 group-hover:text-blue-400 transition-colors">Phase 0{item.id}</span>
                    </div>

                    <h3 className="text-2xl font-bold mb-3 text-white">{item.phase}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 italic">"{item.summary}"</p>

                    <div className="flex items-center text-xs font-black uppercase tracking-widest text-blue-400 group-hover:translate-x-2 transition-all">
                      View Details <ChevronRight size={14} className="ml-1" />
                    </div>
                  </motion.div>
                </div>

                {/* Mobile Expanded Details */}
                <AnimatePresence>
                  {activeStep === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="w-full md:hidden mt-4 pl-20 overflow-hidden"
                    >
                      <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                        <p className="text-slate-300 text-sm mb-6 leading-relaxed">{item.description}</p>
                        <div className="grid grid-cols-1 gap-3 mb-6">
                          {item.keyConcepts.map(c => (
                            <div key={c} className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400 bg-white/5 p-3 rounded-xl border border-white/5">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3" />
                              {c}
                            </div>
                          ))}
                        </div>
                        <div className="p-5 bg-orange-500/5 border border-orange-500/20 rounded-2xl mb-6">
                           <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-1">Myth Buster</p>
                           <p className="text-xs text-orange-100 italic leading-relaxed">"{item.misconception.replace('(False: ', '').replace(')', '')}"</p>
                        </div>
                        <button 
                          onClick={(e) => {
                             e.stopPropagation();
                             onInteract(item.phase);
                          }}
                          className="w-full py-4 bg-blue-600 text-white rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 hover:bg-blue-700 shadow-xl shadow-blue-600/20"
                          aria-label={`Ask AI Assistant about ${item.phase}`}
                        >
                          <MessageSquare size={18} /> Ask AI Assistant
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Desktop Modal */}
      <AnimatePresence>
        {activeStep && (
          <div className="hidden md:block">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-xl z-[100] flex items-center justify-center p-6"
              onClick={() => setActiveStep(null)}
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-[#0f172a] w-full max-w-4xl rounded-[40px] shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col md:flex-row border border-white/5"
                onClick={(e) => e.stopPropagation()}
              >
                {(() => {
                  const item = electionData.find(d => d.id === activeStep);
                  const Icon = iconMap[item.icon];
                  return (
                    <div className="flex flex-col md:flex-row w-full">
                       {/* Left Panel */}
                       <div className="w-full md:w-1/3 bg-black/30 p-12 flex flex-col justify-between border-r border-white/5">
                          <div>
                             <div className="w-16 h-16 bg-white/5 rounded-[2rem] flex items-center justify-center text-blue-400 mb-8 border border-white/10 shadow-inner">
                                <Icon size={32} />
                             </div>
                             <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Phase 0{item.id}</h4>
                             <h2 className="text-4xl font-black leading-tight text-white mb-6">{item.phase}</h2>
                             <div className="w-12 h-1 bg-blue-600 rounded-full" />
                          </div>
                          
                          <div>
                             <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-6">Quick Actions</p>
                             <div className="space-y-3">
                                <a href="https://voters.eci.gov.in" target="_blank" className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 text-xs text-slate-300 hover:bg-white/10 transition-all group">
                                   NVSP Portal <ExternalLink size={14} className="group-hover:rotate-45 transition-transform" />
                                </a>
                                <a href="https://eci.gov.in" target="_blank" className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 text-xs text-slate-300 hover:bg-white/10 transition-all group">
                                   Official ECI <ExternalLink size={14} className="group-hover:rotate-45 transition-transform" />
                                </a>
                             </div>
                          </div>
                       </div>

                       {/* Right Panel */}
                       <div className="flex-1 p-12 overflow-y-auto max-h-[700px] bg-gradient-to-br from-transparent to-blue-500/5">
                          <button 
                            onClick={() => setActiveStep(null)}
                            className="absolute top-8 right-8 p-3 hover:bg-white/5 rounded-full text-slate-500 hover:text-white transition-all z-10"
                          >
                            <X size={24} />
                          </button>

                          <div className="mb-12">
                             <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-6">Process Breakdown</h4>
                             <p className="text-xl text-slate-300 leading-relaxed font-light mb-10">
                                {item.description}
                             </p>

                             <div className="grid grid-cols-2 gap-4">
                                {item.keyConcepts.map(c => (
                                  <div key={c} className="p-5 bg-white/5 rounded-3xl border border-white/5 flex items-center gap-4 group hover:bg-white/10 transition-colors">
                                     <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:scale-150 transition-transform" />
                                     <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 group-hover:text-white">{c}</span>
                                  </div>
                                ))}
                             </div>
                          </div>

                          <div className="p-8 bg-orange-500/5 border border-orange-500/10 rounded-[2.5rem] mb-12 shadow-sm relative overflow-hidden">
                             <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Info size={120} />
                             </div>
                             <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500">
                                   <Info size={16} />
                                </div>
                                <h4 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em]">Myth Buster</h4>
                             </div>
                             <p className="text-base text-orange-100/90 leading-relaxed italic mb-4 font-light">"{item.misconception.split('(False: ')[0].trim()}"</p>
                             <div className="pt-4 border-t border-orange-500/10">
                                <p className="text-[10px] text-orange-400 font-black uppercase tracking-widest mb-1">Official ECI Stance</p>
                                <p className="text-xs text-orange-200/80 leading-relaxed font-medium">{item.misconception.includes('(False: ') ? item.misconception.split('(False: ')[1].replace(')', '') : 'Please consult the ECI handbook.'}</p>
                             </div>
                          </div>

                          <button 
                            onClick={() => {
                               onInteract(item.phase);
                               setActiveStep(null);
                            }}
                            className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-[2rem] text-xs font-black uppercase tracking-[0.3em] transition-all shadow-[0_20px_50px_rgba(37,99,235,0.3)] flex items-center justify-center gap-4 group"
                          >
                             <MessageSquare size={20} className="group-hover:rotate-12 transition-transform" /> 
                             Ask AI Assistant about this phase
                          </button>
                       </div>
                    </div>
                  )
                })()}
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Timeline;
