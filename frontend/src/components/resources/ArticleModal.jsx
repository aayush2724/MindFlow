import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ArticleModal({ session, onClose, onComplete }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
    setScrollProgress(Math.min(progress, 100));
  };

  const handleEnd = () => {
    // If they read more than 1 min or scrolled past 80%, give them the minutes
    let mins = 5;
    if (session.duration) {
      const match = session.duration.match(/(\d+)/);
      if (match) mins = parseInt(match[1]);
    }
    
    const spentMinutes = Math.floor(timeSpent / 60);
    // If they scrolled completely, just give them the full time. Otherwise give actual time spent.
    if (scrollProgress > 80) {
      onComplete(mins);
    } else if (spentMinutes > 0) {
      onComplete(spentMinutes);
    } else {
      onComplete(0);
    }
    onClose();
  };

  // Mock content based on title
  let content = [];
  if (session.title.includes('Cognitive Reframing')) {
    content = [
      { type: 'h3', text: 'Understanding Cognitive Distortions' },
      { type: 'p', text: 'Cognitive distortions are irrational or exaggerated thought patterns that can fuel anxiety, depression, and burnout. They convince us of things that aren\'t actually true. The first step in reframing is recognizing when you are falling into these traps.' },
      { type: 'p', text: 'Common distortions include All-or-Nothing thinking, Catastrophizing, and Overgeneralization. When you catch yourself thinking "I failed this midterm, I will fail college entirely," you are catastrophizing.' },
      { type: 'h3', text: 'The Re-framing Process' },
      { type: 'p', text: '1. Identify the negative thought.\n2. Look for the evidence supporting it, and the evidence against it.\n3. Draft a realistic alternative thought.' },
      { type: 'p', text: 'By practicing this consistently, you can reshape your neural pathways to default to more balanced, pragmatic thinking rather than immediate doom.' },
      { type: 'p', text: 'Take a moment right now. What is a negative thought you had today? How can you reframe it?' },
    ];
  } else {
    content = [
      { type: 'h3', text: 'Introduction' },
      { type: 'p', text: 'Academic stress is an unavoidable part of the collegiate experience. However, how we manage that stress dictates whether it acts as a catalyst for growth or a trigger for burnout.' },
      { type: 'h3', text: 'Key Strategies' },
      { type: 'p', text: '1. Time Blocking: Dedicate specific hours solely for deep work, and equally specific hours for rest.' },
      { type: 'p', text: '2. Micro-breaks: Use the Pomodoro technique. 25 minutes of work, 5 minutes of rest.' },
      { type: 'p', text: '3. Community Support: You are not alone. Engaging with peers who understand your struggle is crucial.' },
    ];
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="glass-panel max-w-3xl w-full h-[85vh] relative flex flex-col overflow-hidden border-[#00DBE7]/20"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5 relative z-10">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-[#00DBE7] uppercase border border-[#00DBE7]/30 px-2 py-1 rounded mb-2 inline-block">
              {session.category}
            </span>
            <h2 className="text-xl font-bold text-white" style={{ fontFamily:'Space Grotesk' }}>{session.title}</h2>
          </div>
          <button 
            onClick={handleEnd}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-white/50 hover:text-white"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-white/5">
          <div className="h-full bg-[#00DBE7]" style={{ width: `${scrollProgress}%` }} />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar" onScroll={handleScroll}>
          <div className="max-w-2xl mx-auto space-y-6">
            {content.map((block, i) => (
              block.type === 'h3' ? (
                <h3 key={i} className="text-xl font-bold text-white mt-8 mb-4">{block.text}</h3>
              ) : (
                <p key={i} className="text-white/70 text-base leading-relaxed font-light">{block.text}</p>
              )
            ))}
            
            <div className="mt-16 pt-8 border-t border-white/10 text-center">
              <button 
                onClick={handleEnd}
                className="px-8 py-3 rounded-full text-xs font-bold tracking-widest bg-[#00DBE7] text-black hover:bg-white transition-colors">
                MARK AS COMPLETED
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
