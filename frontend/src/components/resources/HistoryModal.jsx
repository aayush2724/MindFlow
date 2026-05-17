import React from 'react';
import { motion } from 'framer-motion';

export default function HistoryModal({ onClose, engagedMinutes }) {
  // Mock history data based on the engaged minutes
  const historyLog = [
    { time: '09:15 AM', action: 'Neural Synchronization: Alpha State', duration: '15 mins', category: 'Focus' },
    { time: '11:30 AM', action: 'Box Breathing Routine', duration: '3 mins', category: 'Calm' },
  ];

  if (engagedMinutes > 15) {
    historyLog.unshift({ time: 'Just Now', action: 'Recent Engagement', duration: `${engagedMinutes - 15} mins`, category: 'Active' });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="glass-panel p-8 max-w-lg w-full relative border-[#D2FF00]/20"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-[#D2FF00]/10 flex items-center justify-center border border-[#D2FF00]/30">
            <span className="material-symbols-outlined text-[#D2FF00]">history</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white" style={{ fontFamily:'Space Grotesk' }}>Knowledge History</h2>
            <p className="text-[#D2FF00] text-xs terminal-text tracking-widest uppercase font-bold">SYNC LOG • {engagedMinutes} MINS TODAY</p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {historyLog.map((log, i) => (
            <div key={i} className="p-4 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-colors">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold tracking-widest text-[#D2FF00] uppercase border border-[#D2FF00]/30 px-1.5 rounded">
                    {log.category}
                  </span>
                  <span className="text-white/40 text-xs font-mono">{log.time}</span>
                </div>
                <div className="text-sm font-bold text-white group-hover:text-[#D2FF00] transition-colors">{log.action}</div>
              </div>
              <div className="text-xs text-white/60 terminal-text text-right">
                {log.duration}
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={onClose}
          className="w-full py-3 rounded-lg bg-white/10 text-xs font-bold tracking-widest text-white hover:bg-white/20 transition-colors">
          CLOSE LOG
        </button>
      </motion.div>
    </div>
  );
}
