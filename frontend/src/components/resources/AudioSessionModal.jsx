import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGenerativeAudio } from '../../hooks/useGenerativeAudio';

export default function AudioSessionModal({ session, onClose, onComplete }) {
  const { startSession, stopSession, togglePause, isPlaying } = useGenerativeAudio();
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 mins default
  
  useEffect(() => {
    startSession(session.category || session.title);
    
    // Parse duration string if available (e.g. "45 min audio")
    let mins = 15;
    if (session.duration) {
      const match = session.duration.match(/(\d+)/);
      if (match) mins = parseInt(match[1]);
    }
    setTimeLeft(mins * 60);

    return () => {
      stopSession();
    };
  }, []);

  useEffect(() => {
    let timer;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            
            // Calculate total mins
            let mins = 15;
            if (session.duration) {
              const match = session.duration.match(/(\d+)/);
              if (match) mins = parseInt(match[1]);
            }
            onComplete(mins);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, onComplete, session.duration]);

  const handleEnd = () => {
    // Calculate how many minutes they actually spent
    let mins = 15;
    if (session.duration) {
      const match = session.duration.match(/(\d+)/);
      if (match) mins = parseInt(match[1]);
    }
    const spentMinutes = Math.floor((mins * 60 - timeLeft) / 60);
    if (spentMinutes > 0) {
      onComplete(spentMinutes);
    }
    stopSession();
    onClose();
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="glass-panel p-10 max-w-lg w-full text-center relative border-[#00DBE7]/20"
      >
        <button 
          onClick={handleEnd}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        
        <div className="w-20 h-20 mx-auto rounded-full bg-[#00DBE7]/10 flex items-center justify-center border border-[#00DBE7]/30 mb-6 relative">
            <div className={`absolute inset-0 rounded-full border border-[#00DBE7]/20 ${isPlaying ? 'animate-ping' : ''}`} style={{ animationDuration: '3s' }} />
            <span className="material-symbols-outlined text-4xl text-[#00DBE7]">
              {session.type === 'video' ? 'smart_display' : 'headphones'}
            </span>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily:'Space Grotesk' }}>{session.title}</h2>
        <p className="text-[#00DBE7] text-sm mb-4 terminal-text tracking-widest font-bold">SESSION INITIALIZED • {isPlaying ? 'ACTIVE' : 'PAUSED'}</p>
        
        <div className="text-4xl font-light text-white mb-8 font-mono tracking-wider">
          {formatTime(timeLeft)}
        </div>
        
        <div className="flex gap-4 justify-center">
          <button 
            onClick={togglePause}
            className="px-8 py-3 rounded-full text-xs font-bold tracking-widest bg-[#00DBE7] text-black hover:bg-white transition-colors">
            {isPlaying ? 'PAUSE' : 'RESUME'}
          </button>
          <button 
            onClick={handleEnd}
            className="px-8 py-3 rounded-full text-xs font-bold tracking-widest border border-white/20 text-white hover:bg-white/10 transition-colors">
            END SESSION
          </button>
        </div>
      </motion.div>
    </div>
  );
}
