import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function ClusterChatModal({ group, onClose }) {
  const [messages, setMessages] = useState([
    { id: 1, author: 'Node_442', text: `Welcome to the ${group.name} cluster channel.`, time: '10m ago', system: true },
    { id: 2, author: 'Node_129', text: 'Hey everyone, just venting about the homework assignment...', time: '5m ago' },
    { id: 3, author: 'Node_882', text: 'I am so down to study together if anyone wants to join a Discord call later.', time: '2m ago' }
  ]);
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate an automated bot message after 4 seconds to make it feel "live"
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { id: Date.now(), author: 'Node_901', text: 'Same, that homework is brutal. Let us coordinate a study session.', time: 'Just now' }
      ]);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMsg = {
      id: Date.now(),
      author: 'You (Node_99)',
      text: inputText,
      time: 'Just now'
    };
    setMessages(prev => [...prev, newMsg]);
    setInputText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="glass-panel p-8 max-w-lg w-full relative border-[#00DBE7]/20 flex flex-col h-[70vh]"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
          <div className="w-10 h-10 rounded-full bg-[#00DBE7]/10 flex items-center justify-center border border-[#00DBE7]/30">
            <span className="material-symbols-outlined text-[#00DBE7]">forum</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white" style={{ fontFamily:'Space Grotesk' }}>{group.name}</h2>
            <p className="text-[#00DBE7] text-xs terminal-text tracking-widest uppercase font-bold">TELEMETRY LINK • {group.active} ACTIVE</p>
          </div>
        </div>

        {/* Chat Feed */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-6 no-scrollbar">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.system ? 'items-center my-2' : ''}`}>
              {msg.system ? (
                <div className="text-[10px] bg-white/5 border border-white/5 px-3 py-1 rounded text-white/40 font-mono tracking-wider">
                  {msg.text}
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 max-w-[85%] self-start">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-[#00DBE7]">{msg.author}</span>
                    <span className="text-[9px] font-mono text-white/30">{msg.time}</span>
                  </div>
                  <p className="text-xs text-white/80 leading-relaxed">{msg.text}</p>
                </div>
              )}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Form */}
        <div className="flex gap-2 items-center border-t border-white/5 pt-4">
          <input 
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Transmit secure signal to cluster..."
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#00DBE7]/50 transition-colors"
          />
          <button 
            onClick={handleSend}
            className="p-3 rounded-xl bg-[#00DBE7] text-black hover:scale-105 transition-all flex items-center justify-center"
            style={{ boxShadow: '0 0 15px rgba(0,219,231,0.2)' }}
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
