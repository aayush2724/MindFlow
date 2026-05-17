import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function RepliesModal({ post, onClose, onAddReply }) {
  const [replyText, setReplyText] = useState('');

  const handleTransmit = () => {
    if (!replyText.trim()) return;
    onAddReply(post.id, replyText);
    setReplyText('');
  };

  // Safe fallback for replies list
  const replies = post.repliesList || [
    { id: 1, author: 'Anonymous Node', content: 'Same here, sleeping has been impossible lately.', time: '1m ago' },
    { id: 2, author: 'Anonymous Node', content: 'Try the box breathing routine in the resources tab! It actually helps slow your heart rate down.', time: 'Just now' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="glass-panel p-8 max-w-lg w-full relative border-[#c084fc]/20 flex flex-col max-h-[80vh]"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        
        {/* Post Summary */}
        <div className="border-b border-white/5 pb-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold tracking-widest text-[#c084fc] uppercase border border-[#c084fc]/30 px-1.5 rounded">
              Original Broadcast
            </span>
            <span className="text-white/40 text-xs font-mono">{post.time}</span>
          </div>
          <p className="text-sm text-white/80 leading-relaxed font-medium">{post.content}</p>
        </div>

        {/* Replies Feed */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 no-scrollbar mb-6">
          <h3 className="text-xs font-bold tracking-widest text-white/40 uppercase mb-2">REPLY THREAD</h3>
          {replies.map((reply) => (
            <div key={reply.id} className="p-3 rounded-lg bg-white/5 border border-white/5 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white/60">{reply.author}</span>
                <span className="text-[10px] font-mono text-white/30">{reply.time}</span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">{reply.content}</p>
            </div>
          ))}
        </div>

        {/* Input box */}
        <div className="border-t border-white/5 pt-4">
          <textarea 
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Transmit an anonymous response..."
            className="w-full bg-black/20 border border-white/5 rounded-xl p-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-purple-400/50 resize-none min-h-[60px] transition-colors mb-3"
          />
          <div className="flex justify-end">
            <button 
              onClick={handleTransmit}
              className="px-5 py-2 rounded-lg text-xs font-bold tracking-widest text-black hover:scale-105 transition-transform" 
              style={{ background: '#c084fc', boxShadow:'0 0 20px rgba(192,132,252,0.2)' }}
            >
              REPLY
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
