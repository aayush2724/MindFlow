import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';

const MOCK_POSTS = [
  { id: 1, author: 'Anonymous Node', time: '2m ago', content: 'Feeling completely overwhelmed by finals week. Anyone else having trouble sleeping because of anxiety?', tags: ['Anxiety', 'Academics'], likes: 12, replies: 4 },
  { id: 2, author: 'Anonymous Node', time: '15m ago', content: 'Just finished the 15 min binaural beat session from the resources tab. Actually helped me focus for the first time today.', tags: ['Win', 'Focus'], likes: 34, replies: 2 },
  { id: 3, author: 'Anonymous Node', time: '1h ago', content: 'Imposter syndrome is hitting really hard in my advanced algorithms class. I feel like everyone else understands it instantly.', tags: ['Imposter Syndrome'], likes: 56, replies: 18 },
];

const MOCK_GROUPS = [
  { id: 1, name: 'First-Gen Students', active: 124, status: 'Active' },
  { id: 2, name: 'Anxiety Support', active: 89, status: 'Active' },
  { id: 3, name: 'CS Majors Venting', active: 210, status: 'Very Active' },
];

export default function Community() {
  const [newPost, setNewPost] = useState('');

  return (
    <div className="crt-overlay" style={{ background:'#000', color:'#e5e2e3', minHeight:'100vh', fontFamily:'Inter, sans-serif' }}>
      
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] rounded-full" style={{ background:'radial-gradient(circle, rgba(168,85,247,0.02) 0%, transparent 60%)', filter:'blur(80px)' }} />
      </div>

      <Sidebar active="community" />

      {/* Top Nav */}
      <nav className="fixed top-0 left-0 md:left-64 right-0 z-50 flex justify-between items-center px-6 py-4 border-b"
        style={{ background:'rgba(10,10,12,0.8)', backdropFilter:'blur(24px)', borderColor:'rgba(255,255,255,0.05)' }}>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10">
            <div className="w-2 h-2 rounded-full bg-[#c084fc] animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest text-[#c084fc] uppercase">342 Nodes Active</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-full border border-white/10 text-white/50 hover:text-white hover:bg-white/5 transition-colors">
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#D2FF00] rounded-full" />
          </button>
        </div>
      </nav>

      <main className="pt-28 pb-12 px-6 md:ml-64 relative z-20">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="flex items-end justify-between">
            <div>
              <h1 className="font-bold tracking-tight text-4xl mb-2" style={{ fontFamily:'Space Grotesk', color:'#e1fdff' }}>Neural Network</h1>
              <p className="text-sm terminal-text opacity-50 uppercase tracking-widest">Anonymous peer telemetry & support</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Main Feed */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Compose Post */}
              <div className="glass-panel p-6 relative overflow-hidden border border-[#c084fc]/20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#c084fc] opacity-5 blur-[50px] pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                      <span className="material-symbols-outlined text-[16px] text-white/50">incognito</span>
                    </div>
                    <span className="text-xs font-bold tracking-widest text-white/40 uppercase">Broadcast Anonymously</span>
                  </div>
                  <textarea 
                    value={newPost} onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Share your current mental state or ask for support..."
                    className="w-full bg-black/20 border border-white/5 rounded-xl p-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#c084fc]/50 resize-none min-h-[100px] transition-colors"
                  />
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex gap-2">
                      <button className="p-2 rounded-lg text-white/30 hover:text-white/80 hover:bg-white/5 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">mood</span>
                      </button>
                      <button className="p-2 rounded-lg text-white/30 hover:text-white/80 hover:bg-white/5 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">sell</span>
                      </button>
                    </div>
                    <button className="px-6 py-2 rounded-lg text-xs font-bold tracking-widest bg-[#c084fc] text-black hover:scale-105 transition-transform" style={{ boxShadow:'0 0 20px rgba(192,132,252,0.2)' }}>
                      TRANSMIT
                    </button>
                  </div>
                </div>
              </div>

              {/* Feed */}
              <div className="space-y-4">
                {MOCK_POSTS.map((post, i) => (
                  <motion.div 
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="glass-panel p-6 group transition-colors hover:border-white/10"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                          <span className="material-symbols-outlined text-[14px] text-white/30">radar</span>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white/80">{post.author}</div>
                          <div className="text-[10px] terminal-text text-white/30">{post.time}</div>
                        </div>
                      </div>
                      <button className="text-white/20 hover:text-white/60 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">more_horiz</span>
                      </button>
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed mb-4">{post.content}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 rounded text-[10px] font-bold tracking-widest bg-white/5 text-white/40 uppercase border border-white/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                      <button className="flex items-center gap-2 text-white/30 hover:text-[#c084fc] transition-colors group/btn">
                        <span className="material-symbols-outlined text-[18px] group-hover/btn:scale-110 transition-transform">favorite</span>
                        <span className="text-xs font-bold">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-white/30 hover:text-white transition-colors group/btn">
                        <span className="material-symbols-outlined text-[18px] group-hover/btn:scale-110 transition-transform">chat_bubble</span>
                        <span className="text-xs font-bold">{post.replies}</span>
                      </button>
                      <button className="flex items-center gap-2 text-white/30 hover:text-white transition-colors ml-auto">
                        <span className="material-symbols-outlined text-[18px]">share</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Active Groups */}
              <div className="glass-panel p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xs font-bold tracking-widest text-white/50 uppercase">Active Clusters</h3>
                  <span className="material-symbols-outlined text-[16px] text-white/30">hub</span>
                </div>
                <div className="space-y-4">
                  {MOCK_GROUPS.map(group => (
                    <div key={group.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/20 transition-colors cursor-pointer">
                      <div>
                        <div className="text-sm font-bold text-white/80 mb-1">{group.name}</div>
                        <div className="text-[10px] terminal-text text-white/40 flex items-center gap-1">
                          <div className={`w-1.5 h-1.5 rounded-full ${group.status === 'Very Active' ? 'bg-[#c084fc]' : 'bg-[#D2FF00]'}`} />
                          {group.active} ONLINE
                        </div>
                      </div>
                      <button className="text-[#00DBE7] hover:bg-[#00DBE7]/10 p-1.5 rounded-md transition-colors">
                        <span className="material-symbols-outlined text-[16px]">login</span>
                      </button>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-3 rounded-lg border border-dashed border-white/20 text-xs font-bold tracking-widest text-white/40 hover:text-white hover:border-white/40 transition-colors">
                  EXPLORE ALL CLUSTERS
                </button>
              </div>

              {/* Guidelines Reminder */}
              <div className="p-6 rounded-xl border border-[#D2FF00]/10 bg-[#D2FF00]/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#D2FF00] opacity-10 blur-[40px]" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-[#D2FF00] text-[18px]">verified_user</span>
                    <h3 className="text-xs font-bold tracking-widest text-[#D2FF00] uppercase">Safe Space Protocol</h3>
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed">
                    This network is end-to-end encrypted and completely anonymous. Harassment, bullying, or identifying information will result in immediate node suspension.
                  </p>
                </div>
              </div>

            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}
