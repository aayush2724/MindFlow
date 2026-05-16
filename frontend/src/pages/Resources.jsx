import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';

const MOCK_RESOURCES = [
  { id: 1, type: 'article', title: 'Cognitive Reframing Techniques', duration: '5 min read', category: 'Therapy', icon: 'psychology' },
  { id: 2, type: 'audio', title: 'Deep Focus Flow', duration: '45 min audio', category: 'Focus', icon: 'headphones' },
  { id: 3, type: 'exercise', title: 'Box Breathing Routine', duration: '3 min exercise', category: 'Calm', icon: 'air' },
  { id: 4, type: 'video', title: 'Understanding Burnout', duration: '12 min video', category: 'Education', icon: 'smart_display' },
  { id: 5, type: 'article', title: 'Navigating Academic Stress', duration: '8 min read', category: 'Academics', icon: 'menu_book' },
  { id: 6, type: 'audio', title: 'Sleep Synchronization', duration: '30 min audio', category: 'Rest', icon: 'bedtime' },
];

export default function Resources() {
  const [search, setSearch] = useState('');
  
  return (
    <div className="crt-overlay" style={{ background:'transparent', color:'#e5e2e3', minHeight:'100vh', fontFamily:'Inter, sans-serif' }}>
      
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full" style={{ background:'radial-gradient(circle, rgba(0,219,231,0.03) 0%, transparent 70%)', filter:'blur(60px)' }} />
        <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] rounded-full" style={{ background:'radial-gradient(circle, rgba(210,255,0,0.02) 0%, transparent 70%)', filter:'blur(80px)' }} />
      </div>

      <Sidebar active="resources" />

      {/* Top Nav */}
      <nav className="fixed top-0 left-0 md:left-64 right-0 z-50 flex justify-between items-center px-6 py-4 border-b"
        style={{ background:'rgba(10,10,12,0.8)', backdropFilter:'blur(24px)', borderColor:'rgba(255,255,255,0.05)' }}>
        <div className="flex items-center gap-4 flex-1">
          <div className="relative max-w-md w-full">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-[18px]">search</span>
            <input 
              type="text" placeholder="Search resources, exercises, media..." 
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-11 pr-4 text-sm text-[#e1fdff] placeholder-white/20 focus:outline-none focus:border-[#00DBE7]/50 transition-all"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-full border border-white/10 text-white/50 hover:text-white hover:bg-white/5 transition-colors">
            <span className="material-symbols-outlined text-[20px]">bookmarks</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#D2FF00] rounded-full animate-pulse" />
          </button>
        </div>
      </nav>

      <main className="pt-28 pb-12 px-6 md:ml-64 relative z-20">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="flex items-end justify-between">
            <div>
              <h1 className="font-bold tracking-tight text-4xl mb-2" style={{ fontFamily:'Space Grotesk', color:'#e1fdff' }}>Resource Nexus</h1>
              <p className="text-sm terminal-text opacity-50 uppercase tracking-widest">Curated knowledge & interventions</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Featured Resource */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="lg:col-span-8 glass-panel p-8 relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#00DBE7] opacity-10 blur-[80px] group-hover:opacity-20 transition-opacity" />
              <div className="relative z-10 flex flex-col h-full justify-between min-h-[240px]">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full border border-[#00DBE7]/30 text-[#00DBE7] text-[10px] font-bold tracking-widest mb-4">FEATURED PROTOCOL</span>
                  <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily:'Space Grotesk' }}>Neural Synchronization: Alpha State</h2>
                  <p className="text-white/60 text-sm max-w-xl">A 15-minute guided binaural sequence designed to down-regulate your nervous system and prepare the mind for deep, focused academic work.</p>
                </div>
                <div className="flex items-center gap-4 mt-8">
                  <button className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold tracking-widest bg-[#e1fdff] text-[#020202] hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                    START SESSION
                  </button>
                  <span className="text-xs text-white/40 terminal-text">15 MIN • AUDIO</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Stats / Daily Goal */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-4 glass-panel p-8 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-sm font-bold text-white/50 tracking-widest uppercase mb-6">Daily Knowledge Goal</h3>
                <div className="flex items-center gap-6 mb-6">
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#D2FF00" strokeWidth="6" strokeDasharray="283" strokeDashoffset="100" style={{ filter: 'drop-shadow(0 0 6px rgba(210,255,0,0.5))' }} />
                    </svg>
                    <span className="absolute text-xl font-bold text-[#D2FF00]">65%</span>
                  </div>
                  <div>
                    <div className="text-white font-bold mb-1">15 / 20 Mins</div>
                    <div className="text-xs text-white/40">Engaged with resources today</div>
                  </div>
                </div>
              </div>
              <button className="w-full py-3 rounded-lg border border-white/10 text-xs font-bold tracking-widest text-white/60 hover:bg-white/5 transition-colors">
                VIEW HISTORY
              </button>
            </motion.div>
          </div>

          {/* Categories */}
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {['All', 'Therapy', 'Focus', 'Calm', 'Education', 'Sleep'].map((cat, i) => (
              <button key={cat} className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest whitespace-nowrap transition-all ${i === 0 ? 'bg-white/10 text-white border border-white/20' : 'text-white/40 border border-white/5 hover:border-white/20'}`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Library Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_RESOURCES.map((res, i) => (
              <motion.div 
                key={res.id}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }}
                className="glass-panel p-6 group cursor-pointer hover:border-white/20 transition-all hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-12">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#00DBE7]/10 transition-colors border border-white/5 group-hover:border-[#00DBE7]/30">
                    <span className="material-symbols-outlined text-white/60 group-hover:text-[#00DBE7] transition-colors">{res.icon}</span>
                  </div>
                  <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase border border-white/10 px-2 py-1 rounded">
                    {res.category}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2 group-hover:text-[#e1fdff] transition-colors">{res.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-white/40 terminal-text">
                    <span>{res.duration}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="uppercase">{res.type}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
