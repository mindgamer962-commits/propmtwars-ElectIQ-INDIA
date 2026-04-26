import React, { useState, useEffect } from 'react';
import { db, trackEvent } from '../services/firebase';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { MessageSquare, Star, Send, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FeedbackSystem = ({ user }) => {
  const [feedback, setFeedback] = useState([]);
  const [newFeedback, setNewFeedback] = useState('');
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'feedback'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const feedData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFeedback(feedData);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newFeedback.trim()) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'feedback'), {
        text: newFeedback,
        rating,
        userName: user?.displayName || 'Anonymous Citizen',
        userPhoto: user?.photoURL || null,
        timestamp: serverTimestamp()
      });
      
      trackEvent('feedback_submitted', { 
        rating, 
        is_authenticated: !!user 
      });

      setNewFeedback('');
      setRating(5);
    } catch (error) {
      console.error("Feedback Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 border-t border-white/5 bg-black/10">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black italic mb-4 text-white uppercase tracking-tight">Public Feedback</h2>
          <p className="text-slate-400">Help us improve the democratic experience. Your voice matters.</p>
        </div>

        {/* Submit Feedback */}
        <div className="glass-panel p-8 rounded-[2.5rem] border border-white/5 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <MessageSquare size={120} />
          </div>
          <form onSubmit={handleSubmit} className="relative z-10">
            <div className="flex gap-4 mb-6">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setRating(num)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${rating >= num ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'bg-white/5 text-slate-500'}`}
                  aria-label={`Rate ${num} stars`}
                >
                  <Star size={18} fill={rating >= num ? "currentColor" : "none"} />
                </button>
              ))}
            </div>
            <textarea
              value={newFeedback}
              onChange={(e) => setNewFeedback(e.target.value)}
              placeholder="What do you think about ElectIQ? Any suggestions for information we should add?"
              className="w-full bg-black/20 border border-white/10 rounded-2xl p-6 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-600/50 mb-6 min-h-[120px]"
              aria-label="Your feedback message"
            />
            <button
              disabled={isSubmitting}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-3 transition-all shadow-xl shadow-blue-600/20"
            >
              <Send size={16} /> {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>

        {/* Feedback Feed */}
        <div className="space-y-6">
          <AnimatePresence>
            {feedback.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 bg-white/5 rounded-3xl border border-white/5 flex gap-6"
              >
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden">
                  {item.userPhoto ? (
                    <img src={item.userPhoto} alt={item.userName} className="w-full h-full object-cover" />
                  ) : (
                    <User className="text-slate-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-white italic">{item.userName}</h4>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={12} className={i < item.rating ? 'text-orange-500' : 'text-slate-800'} fill={i < item.rating ? 'currentColor' : 'none'} />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSystem;
