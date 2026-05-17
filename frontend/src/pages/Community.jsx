import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import RepliesModal from '../components/community/RepliesModal';
import ClusterChatModal from '../components/community/ClusterChatModal';

const MOCK_POSTS = [
  { 
    id: 1, 
    author: 'Anonymous Node', 
    time: '2m ago', 
    content: 'Feeling completely overwhelmed by finals week. Anyone else having trouble sleeping because of anxiety?', 
    tags: ['Anxiety', 'Academics'], 
    likes: 12, 
    replies: 2,
    repliesList: [
      { id: 1, author: 'Anonymous Node', content: 'Same here, sleeping has been impossible lately.', time: '1m ago' },
      { id: 2, author: 'Anonymous Node', content: 'Try the box breathing routine in the resources tab! It actually helps slow your heart rate down.', time: 'Just now' }
    ]
  },
  { 
    id: 2, 
    author: 'Anonymous Node', 
    time: '15m ago', 
    content: 'Just finished the 15 min binaural beat session from the resources tab. Actually helped me focus for the first time today.', 
    tags: ['Win', 'Focus'], 
    likes: 34, 
    replies: 1,
    repliesList: [
      { id: 1, author: 'Anonymous Node', content: 'Awesome! Did you try Alpha state or Sleep sync?', time: '10m ago' }
    ]
  },
  { 
    id: 3, 
    author: 'Anonymous Node', 
    time: '1h ago', 
    content: 'Imposter syndrome is hitting really hard in my advanced algorithms class. I feel like everyone else understands it instantly.', 
    tags: ['Imposter Syndrome'], 
    likes: 56, 
    replies: 0,
    repliesList: []
  },
];

const MOCK_GROUPS = [
  { id: 1, name: 'First-Gen Students', active: 124, status: 'Active' },
  { id: 2, name: 'Anxiety Support', active: 89, status: 'Active' },
  { id: 3, name: 'CS Majors Venting', active: 210, status: 'Very Active' },
];

export default function Community() {
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [activePostForReplies, setActivePostForReplies] = useState(null);
  const [openChatGroup, setOpenChatGroup] = useState(null);

  const handleTransmit = () => {
    if (!newPost.trim()) return;
    const post = {
      id: Date.now(),
      author: 'Anonymous Node',
      time: 'Just now',
      content: newPost,
      tags: selectedCluster ? [selectedCluster.split(' ')[0]] : ['General'],
      likes: 0,
      replies: 0,
      repliesList: []
    };
    setPosts([post, ...posts]);
    setNewPost('');
  };

  const handleReply = (postId, content) => {
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        const list = post.repliesList || [];
        const newReply = {
          id: Date.now(),
          author: 'Anonymous Node',
          content,
          time: 'Just now'
        };
        const updatedList = [...list, newReply];
        return {
          ...post,
          replies: updatedList.length,
          repliesList: updatedList
        };
      }
      return post;
    }));
  };

  const toggleLike = (id) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === id) {
        return { ...post, likes: likedPosts.has(id) ? post.likes - 1 : post.likes + 1 };
      }
      return post;
    }));
  };

  const displayedPosts = selectedCluster 
    ? posts.filter(post => {
        if (selectedCluster === 'First-Gen Students') return post.tags.includes('Imposter Syndrome') || post.tags.includes('First-Gen');
        if (selectedCluster === 'Anxiety Support') return post.tags.includes('Anxiety') || post.tags.includes('General');
        if (selectedCluster === 'CS Majors Venting') return post.tags.includes('Academics') || post.tags.includes('Imposter Syndrome') || post.tags.includes('CS');
        return post.tags.some(tag => selectedCluster.toLowerCase().includes(tag.toLowerCase()));
      })
    : posts;

  return (
    <div className="crt-overlay" style={{ background:'transparent', color:'#e5e2e3', minHeight:'100vh', fontFamily:'Inter, sans-serif' }}>
      <Sidebar active="community" />
      <Header title="Neural Network Feed" subtext="Share thoughts anonymously and connect in cluster chats" />

      <main className="pt-28 pb-12 px-6 md:ml-64 relative z-20">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="flex items-end justify-between">
            <div>
              <h1 className="font-bold tracking-tight text-4xl mb-2" style={{ fontFamily:'Space Grotesk', color:'#e1fdff' }}>Neural Network</h1>
              <p className="text-sm terminal-text opacity-50 uppercase tracking-widest">{selectedCluster ? `CLUSTER: ${selectedCluster}` : 'Anonymous peer telemetry & support'}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Main Feed */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Compose Post */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="glass-panel p-6 relative overflow-hidden border border-[#c084fc]/20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#c084fc] opacity-5 blur-[50px] pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                      <span className="material-symbols-outlined text-[16px] text-white/50">visibility_off</span>
                    </div>
                    <span className="text-xs font-bold tracking-widest text-white/40 uppercase">Broadcast Anonymously</span>
                  </div>
                  <textarea 
                    value={newPost} onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Share your current mental state or ask for support..."
                    className="w-full bg-black/20 border border-white/5 rounded-xl p-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-purple-400/50 resize-none min-h-[100px] transition-colors"
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
                    <button onClick={handleTransmit} className="px-6 py-2 rounded-lg text-xs font-bold tracking-widest text-black hover:scale-105 transition-transform" style={{ background: '#c084fc', boxShadow:'0 0 20px rgba(192,132,252,0.2)' }}>
                      TRANSMIT
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Feed */}
              <div className="space-y-4">
                {displayedPosts.map((post, i) => (
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
                      <button onClick={() => toggleLike(post.id)} className={`flex items-center gap-2 transition-colors group/btn ${likedPosts.has(post.id) ? 'text-[#c084fc]' : 'text-white/30 hover:text-[#c084fc]'}`}>
                        <span className="material-symbols-outlined text-[18px] group-hover/btn:scale-110 transition-transform" style={{ fontVariationSettings: likedPosts.has(post.id) ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
                        <span className="text-xs font-bold">{post.likes}</span>
                      </button>
                      <button onClick={() => setActivePostForReplies(post)} className="flex items-center gap-2 text-white/30 hover:text-white transition-colors group/btn">
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
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="lg:col-span-4 space-y-6">
              
              {/* Active Groups */}
              <div className="glass-panel p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xs font-bold tracking-widest text-white/50 uppercase">Active Clusters</h3>
                  <span className="material-symbols-outlined text-[16px] text-white/30">hub</span>
                </div>
                <div className="space-y-4">
                  {MOCK_GROUPS.map(group => (
                    <div 
                      key={group.id} 
                      onClick={() => setSelectedCluster(group.name)} 
                      className={`flex items-center justify-between p-3 rounded-lg border transition-colors cursor-pointer ${
                        selectedCluster === group.name 
                          ? 'bg-[#c084fc]/10 border-[#c084fc]/50 shadow-[0_0_15px_rgba(192,132,252,0.15)]' 
                          : 'bg-white/5 border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <div className={`text-sm font-bold mb-1 transition-colors ${selectedCluster === group.name ? 'text-[#c084fc]' : 'text-white/80'}`}>{group.name}</div>
                        <div className="text-[10px] terminal-text text-white/40 flex items-center gap-1">
                          <div className={`w-1.5 h-1.5 rounded-full ${group.status === 'Very Active' ? 'bg-[#c084fc]' : 'bg-[#D2FF00]'}`} />
                          {group.active} ONLINE
                        </div>
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setOpenChatGroup(group); }}
                        className="text-[#00DBE7] hover:bg-[#00DBE7]/10 p-1.5 rounded-md transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">login</span>
                      </button>
                    </div>
                  ))}
                </div>
                <button onClick={() => setSelectedCluster(null)} className="w-full mt-4 py-3 rounded-lg border border-dashed border-white/20 text-xs font-bold tracking-widest text-white/40 hover:text-white hover:border-white/40 transition-colors">
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

            </motion.div>
            
          </div>
        </div>
      </main>

      <AnimatePresence>
        {activePostForReplies && (
          <RepliesModal
            key="replies"
            post={posts.find(p => p.id === activePostForReplies.id)}
            onClose={() => setActivePostForReplies(null)}
            onAddReply={handleReply}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {openChatGroup && (
          <ClusterChatModal
            key="chat"
            group={openChatGroup}
            onClose={() => setOpenChatGroup(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
