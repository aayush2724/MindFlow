import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PHASES = [
  { text: 'Inhale', duration: 4000, scale: 1.5 },
  { text: 'Hold', duration: 4000, scale: 1.5 },
  { text: 'Exhale', duration: 4000, scale: 1 },
  { text: 'Hold', duration: 4000, scale: 1 },
];

export default function BreathingModal({ session, onClose, onComplete }) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3 * 60); // 3 minutes total

  // Manage Total Timer
  useEffect(() => {
    let timer;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            onComplete(3);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft, onComplete]);

  // Manage Breathing Phases
  useEffect(() => {
    let phaseTimer;
    if (isActive) {
      phaseTimer = setTimeout(() => {
        setPhaseIndex((prev) => (prev + 1) % PHASES.length);
      }, PHASES[phaseIndex].duration);
    }
    return () => clearTimeout(phaseTimer);
  }, [isActive, phaseIndex]);

  const handleEnd = () => {
    const spentMinutes = Math.floor((180 - timeLeft) / 60);
    if (spentMinutes > 0) {
      onComplete(spentMinutes);
    } else {
      onComplete(0);
    }
    onClose();
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const currentPhase = PHASES[phaseIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="glass-panel p-10 max-w-2xl w-full text-center relative border-[#D2FF00]/20"
      >
        <button 
          onClick={handleEnd}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        
        <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily:'Space Grotesk' }}>{session.title}</h2>
        <p className="text-[#D2FF00] text-sm mb-12 terminal-text tracking-widest font-bold">
          {isActive ? 'EXERCISE IN PROGRESS' : 'READY WHEN YOU ARE'}
        </p>

        {/* Visualizer */}
        <div className="h-64 flex items-center justify-center mb-12 relative">
          <motion.div
            className="w-32 h-32 rounded-full border-2 border-[#D2FF00] bg-[#D2FF00]/10 flex items-center justify-center relative z-10"
            animate={{ scale: isActive ? currentPhase.scale : 1 }}
            transition={{ duration: isActive && (phaseIndex === 0 || phaseIndex === 2) ? 4 : 0, ease: 'linear' }}
          >
            <AnimatePresence mode="wait">
              {isActive && (
                <motion.span 
                  key={currentPhase.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-white font-bold tracking-widest uppercase text-sm"
                >
                  {currentPhase.text}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
          
          {/* Ripples */}
          {isActive && (
            <>
              <motion.div 
                className="absolute w-32 h-32 rounded-full border border-[#D2FF00]/30"
                animate={{ scale: currentPhase.scale * 1.2, opacity: [0.5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeOut' }}
              />
              <motion.div 
                className="absolute w-32 h-32 rounded-full border border-[#D2FF00]/10"
                animate={{ scale: currentPhase.scale * 1.5, opacity: [0.3, 0] }}
                transition={{ duration: 4, delay: 1, repeat: Infinity, ease: 'easeOut' }}
              />
            </>
          )}
        </div>
        
        <div className="text-4xl font-light text-white mb-8 font-mono tracking-wider">
          {formatTime(timeLeft)}
        </div>
        
        <div className="flex gap-4 justify-center">
          <button 
            onClick={() => setIsActive(!isActive)}
            className="px-8 py-3 rounded-full text-xs font-bold tracking-widest bg-[#D2FF00] text-black hover:bg-white transition-colors">
            {isActive ? 'PAUSE' : 'START'}
          </button>
          <button 
            onClick={handleEnd}
            className="px-8 py-3 rounded-full text-xs font-bold tracking-widest border border-white/20 text-white hover:bg-white/10 transition-colors">
            END EXERCISE
          </button>
        </div>
      </motion.div>
    </div>
  );
}
