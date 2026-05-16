import { useEffect, useState } from 'react';
import api from '../lib/api';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

export default function CalmCal() {
  const { user } = useAuth();
  const [heatmap, setHeatmap] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('weekly'); // 'weekly' | 'monthly'
  const [selectedDate, setSelectedDate] = useState(16);

  useEffect(() => {
    async function load() {
      try {
        const { data } = await api.get('/calendar/me');
        setHeatmap(data);
      } catch (err) {
        console.error('Failed to fetch calendar heatmap:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user]);

  // Build view display
  const generateHeatmapData = (isMonthly) => {
    const daysToShow = isMonthly ? 31 : 7;
    const data = [];
    for (let i = 0; i < daysToShow; i++) {
      const entry = heatmap[i] || { count: Math.floor(Math.random() * 5) };
      let lvl = 'low';
      let color = '#00f2ff';
      
      if (entry.count >= 4) {
        lvl = 'critical';
        color = '#ff8aae';
      } else if (entry.count >= 3) {
        lvl = 'high';
        color = '#ffb4ab';
      } else if (entry.count >= 2) {
        lvl = 'med';
        color = '#D2FF00';
      } else if (entry.count >= 1) {
        lvl = 'low';
        color = '#00f2ff';
      } else {
        lvl = 'empty';
        color = 'rgba(255,255,255,0.05)';
      }
      
      data.push({ 
        day: DAYS[i % 7], 
        date: i + 1, 
        lvl, 
        color,
        val: entry.count 
      });
    }
    return data;
  };

  const displayData = generateHeatmapData(view === 'monthly');

  // Scroll parallax
  useEffect(() => {
    const onScroll = () => {
      const s = window.pageYOffset;
      const s1 = document.getElementById('stars-p1');
      const s2 = document.getElementById('stars-p2');
      if (s1) s1.style.transform = `translateY(${s * 0.05}px)`;
      if (s2) s2.style.transform = `translateY(${s * 0.1}px)`;
    };
    document.addEventListener('scroll', onScroll, { passive: true });
    return () => document.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="obsidian-grid" style={{ background:'transparent', color:'#e5e2e3', minHeight:'100vh', fontFamily:'Inter, sans-serif' }}>
      <Sidebar active="calmcal" />
      <Header title="MindFlow" subtext="SYNC_PROTOCOL: ACTIVE" />

      {/* Main Canvas */}
      <main className="md:pl-64 pt-24 min-h-screen">
        <div className="px-6 py-8 max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-end gap-6 pb-12">
            <div className="space-y-2">
              <h1 className="font-bold" style={{ fontFamily:'Space Grotesk', fontSize:'clamp(40px,5vw,64px)', color:'#e1fdff' }}>CalmCal</h1>
              <p className="text-lg font-light max-w-xl" style={{ color:'#b9cacb' }}>Your schedule, harmonized with your mental state. Predictive burnout mapping powered by the Neural Engine.</p>
            </div>
            <div className="flex items-center gap-1 p-1 rounded-full border" style={{ background:'rgba(255,255,255,0.02)', borderColor:'rgba(255,255,255,0.08)' }}>
              <button 
                onClick={() => setView('weekly')}
                className={`px-6 py-2 rounded-full font-bold text-xs terminal-text transition-all ${view === 'weekly' ? 'bg-[#00f2ff]/20 text-[#00f2ff]' : 'text-[#b9cacb] hover:text-[#e5e2e3]'}`}
                style={{ background: view === 'weekly' ? 'rgba(0,242,255,0.15)' : 'transparent' }}
              >
                Weekly
              </button>
              <button 
                onClick={() => setView('monthly')}
                className={`px-6 py-2 rounded-full font-bold text-xs terminal-text transition-all ${view === 'monthly' ? 'bg-[#00f2ff]/20 text-[#00f2ff]' : 'text-[#b9cacb] hover:text-[#e5e2e3]'}`}
                style={{ background: view === 'monthly' ? 'rgba(0,242,255,0.15)' : 'transparent' }}
              >
                Monthly
              </button>
            </div>
          </header>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left — Heatmap + Timeline */}
            <div className="lg:col-span-8 space-y-8">
              {/* Thermal Heatmap */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="rounded-3xl p-8 overflow-hidden relative shadow-2xl"
                style={{ background:'rgba(14,14,15,0.65)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.1)' }}>
                <div className="absolute inset-0 opacity-30 pointer-events-none"
                  style={{ background:'linear-gradient(135deg,rgba(0,219,231,0.05) 0%,rgba(210,255,0,0.05) 50%,rgba(255,180,171,0.1) 100%)' }} />
                <div className={`grid ${view === 'monthly' ? 'grid-cols-7 gap-3' : 'grid-cols-7 gap-4'} mb-6 relative z-10`}>
                  {DAYS.map(d => <div key={d} className="text-center text-[10px] terminal-text font-bold pb-2 uppercase tracking-widest" style={{ color:'#b9cacb', opacity:0.5 }}>{d}</div>)}
                  {displayData.map((item, i) => (
                    <motion.div 
                      layout
                      key={i} 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.01 }}
                      onClick={() => setSelectedDate(item.date)}
                      className={`aspect-square rounded-xl flex flex-col items-center justify-center relative transition-all duration-300 hover:scale-110 cursor-pointer group ${selectedDate === item.date ? 'ring-2 ring-white/20' : ''}`}
                      style={{ 
                        background: selectedDate === item.date ? `${item.color}30` : (item.lvl === 'empty' ? 'rgba(255,255,255,0.03)' : `${item.color}15`),
                        border: `1px solid ${selectedDate === item.date ? item.color : (item.lvl === 'empty' ? 'rgba(255,255,255,0.05)' : `${item.color}30`)}`,
                        boxShadow: item.lvl === 'critical' ? `0 0 15px ${item.color}20` : 'none',
                        zIndex: selectedDate === item.date ? 20 : 1
                      }}
                    >
                      <span className="font-bold text-sm" style={{ color: item.lvl === 'empty' ? '#4a4a4b' : item.color }}>{item.date}</span>
                      {view === 'weekly' && item.lvl === 'critical' && <span className="text-[8px] font-bold mt-1 tracking-tighter" style={{ color:item.color }}>PEAK</span>}
                      {view === 'weekly' && item.lvl === 'low' && <span className="material-symbols-outlined text-[10px] mt-0.5" style={{ color:item.color }}>spa</span>}
                      
                      {/* Tooltip */}
                      <div className="absolute bottom-full mb-2 hidden group-hover:block z-50 pointer-events-none">
                        <div className="bg-[#0e0e0f] border border-white/10 rounded-lg px-3 py-2 text-[10px] terminal-text whitespace-nowrap shadow-2xl">
                          <span className="font-bold uppercase tracking-widest" style={{ color: item.color }}>{item.lvl}_STATE</span>
                          <div className="text-[#b9cacb] mt-0.5">Stress Level: {item.val}/5</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                {/* Recovery Injection */}
                <div className="recovery-alert-glow rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 mt-4 relative overflow-hidden">
                  <div className="flex items-center gap-6 relative z-10">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center border" style={{ background:'rgba(0,219,231,0.2)', borderColor:'rgba(0,219,231,0.3)' }}>
                      <span className="material-symbols-outlined text-4xl" style={{ color:'#e1fdff' }}>energy_savings_leaf</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded font-bold text-[10px] uppercase tracking-widest" style={{ background:'#e1fdff', color:'#003548' }}>Priority</span>
                        <h4 className="font-semibold text-xl" style={{ fontFamily:'Space Grotesk', color:'#e1fdff' }}>Recovery Injection</h4>
                      </div>
                      <p className="text-sm" style={{ color:'#b9cacb' }}>AI suggests a 45-min deep focus break after the Exam period.</p>
                    </div>
                  </div>
                  <button className="relative z-10 px-8 py-3 rounded-full font-bold text-xs terminal-text transition-all hover:shadow-[0_0_20px_rgba(0,219,231,0.4)]"
                    style={{ background:'#e1fdff', color:'#003548' }}>Schedule Now</button>
                </div>
              </motion.div>

              {/* Daily Timeline */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="rounded-3xl p-8 shadow-2xl" style={{ background:'rgba(14,14,15,0.65)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.1)' }}>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <h3 className="font-semibold text-2xl" style={{ fontFamily:'Space Grotesk', color:'#e1fdff' }}>Daily Flow: Oct {selectedDate}</h3>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border" style={{ background:'rgba(0,219,231,0.1)', borderColor:'rgba(0,219,231,0.2)' }}>
                      <span className="w-1.5 h-1.5 rounded-full sync-protocol" style={{ background:'#e1fdff' }} />
                      <span className="text-[10px] font-bold terminal-text tracking-widest" style={{ color:'#e1fdff' }}>Sync Protocol</span>
                    </div>
                  </div>
                  <span className="px-4 py-1 rounded-full text-xs terminal-text border" style={{ background:'rgba(255,180,171,0.1)', color:'#ffb4ab', borderColor:'rgba(255,180,171,0.3)' }}>Critical Load</span>
                </div>
                <div className="space-y-6 relative ml-4 pl-8" style={{ borderLeft:'2px solid rgba(255,255,255,0.08)' }}>
                  {[
                    { time:'09:00 AM', title:'Advanced Neuro-Algorithms Lecture', desc:'High cognitive load. Prepare for complex conceptual mapping.', dur:'60 MIN', color:'#e1fdff', alert:false },
                    { time:'11:30 AM', title:'Project Deadline: AI Ethics Beta', desc:'Critical stress trigger. Heart rate variability likely to decrease.', dur:'Due Now', color:'#ffb4ab', alert:true },
                    { time:'02:00 PM', title:'MindFlow Meditation', desc:'Guided somatic release session to mitigate deadline fatigue.', dur:'30 MIN', color:'#00f2ff', alert:false, recommended:true },
                  ].map((item, i) => (
                    <div key={i} className="timeline-item relative group py-2">
                      <div className="absolute w-5 h-5 rounded-full border-2 sync-protocol transition-colors"
                        style={{ left:-42, top:16, background:'#0e0e0f', borderColor: item.alert ? '#ffb4ab' : item.color, boxShadow: item.alert ? '0 0 10px #ffb4ab' : 'none' }} />
                      <div className="timeline-drawer rounded-2xl p-5 border transition-all"
                        style={{ background: item.alert ? 'rgba(255,180,171,0.05)' : 'rgba(14,14,15,0.65)', backdropFilter:'blur(8px)', borderColor: item.alert ? 'rgba(255,180,171,0.2)' : 'rgba(255,255,255,0.08)' }}>
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-xs terminal-text mb-1" style={{ color:item.color }}>{item.time}</p>
                            <h5 className="font-bold text-lg" style={{ fontFamily:'Space Grotesk', color: item.alert ? '#ffb4ab' : '#e1fdff' }}>{item.title}</h5>
                            <p className="text-sm" style={{ color:'#b9cacb' }}>{item.desc}</p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span className="px-3 py-1 rounded-lg text-[10px] font-bold terminal-text" style={{ background:'rgba(42,42,43,0.8)', color:'#b9cacb' }}>{item.dur}</span>
                            {item.recommended && <span className="text-[10px] font-bold italic" style={{ color:'#D2FF00' }}>Recommended</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right sidebar panel */}
            <aside className="lg:col-span-4 space-y-8">
              {/* Burnout Ring */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="rounded-3xl p-8 border-t-2 shadow-2xl" style={{ background:'rgba(14,14,15,0.65)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.1)', borderTop:'2px solid rgba(255,180,171,0.5)' }}>
                <div className="flex items-center gap-4 mb-6">
                  <span className="material-symbols-outlined" style={{ color:'#ffb4ab' }}>warning</span>
                  <h3 className="font-semibold text-2xl" style={{ fontFamily:'Space Grotesk', color:'#e1fdff' }}>Weekly Burnout</h3>
                </div>
                <div className="relative h-48 flex items-center justify-center mb-6">
                  <svg className="w-40 h-40 -rotate-90">
                    <circle cx="80" cy="80" r="70" fill="transparent" stroke="rgba(42,42,43,1)" strokeWidth="8" />
                    <circle cx="80" cy="80" r="70" fill="transparent" stroke="#ffb4ab" strokeDasharray="440" strokeDashoffset="110" strokeLinecap="round" strokeWidth="12" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold" style={{ color:'#ffb4ab' }}>75%</span>
                    <span className="text-xs terminal-text" style={{ color:'#b9cacb' }}>HIGH RISK</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {[['Academic Load','Heavy','#e1fdff',85],['Sleep Reserve','Low','#ffb4ab',30]].map(([k,v,c,w]) => (
                    <div key={k}>
                      <div className="flex justify-between items-center text-xs terminal-text mb-1">
                        <span style={{ color:'#e5e2e3' }}>{k}</span>
                        <span className="font-bold" style={{ color:c }}>{v}</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background:'rgba(42,42,43,1)' }}>
                        <div className="h-full rounded-full" style={{ width:`${w}%`, background:c }} />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Smart Breaks */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="rounded-3xl p-8 shadow-2xl" style={{ background:'rgba(14,14,15,0.65)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.1)' }}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-2xl" style={{ fontFamily:'Space Grotesk', color:'#e1fdff' }}>Smart Breaks</h3>
                  <span className="material-symbols-outlined cursor-pointer hover:text-[#e1fdff] transition-colors" style={{ color:'#b9cacb' }}>info</span>
                </div>
                <div className="space-y-4">
                  {[
                    { icon:'visibility', color:'#e1fdff', borderColor:'rgba(0,219,231,0.2)', bg:'rgba(0,219,231,0.1)', title:'20-20-20 Rule', desc:'Counteract digital eye strain. Look 20ft away for 20s every 20m.' },
                    { icon:'directions_walk', color:'#D2FF00', borderColor:'rgba(210,255,0,0.2)', bg:'rgba(210,255,0,0.1)', title:'Sunlight Reset', desc:'10-minute exposure at 1:00 PM to recalibrate circadian rhythm.' },
                    { icon:'audio_file', color:'#ebb2ff', borderColor:'rgba(235,178,255,0.2)', bg:'rgba(235,178,255,0.1)', title:'Pink Noise', desc:'Ambient textures to stabilize focus during upcoming peak load.' },
                  ].map(item => (
                    <div key={item.title} className="smart-break-card p-5 rounded-2xl cursor-pointer group border"
                      style={{ background:'rgba(255,255,255,0.02)', borderColor:'rgba(255,255,255,0.05)' }}>
                      <div className="flex items-center gap-4 mb-2">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300"
                          style={{ background:item.bg, borderColor:item.borderColor }}>
                          <span className="material-symbols-outlined text-2xl" style={{ color:item.color, fontVariationSettings:"'FILL' 1" }}>{item.icon}</span>
                        </div>
                        <span className="font-bold text-lg" style={{ fontFamily:'Space Grotesk', color:item.color }}>{item.title}</span>
                      </div>
                      <p className="text-sm" style={{ color:'#b9cacb' }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </aside>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-6 flex flex-col md:flex-row justify-between items-center gap-2 border-t"
        style={{ background:'rgba(14,14,15,0.9)', borderColor:'rgba(255,255,255,0.08)' }}>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined" style={{ color:'#e1fdff', fontVariationSettings:"'FILL' 1" }}>psychology</span>
          <span className="font-bold" style={{ fontFamily:'Space Grotesk', fontSize:18, color:'#e1fdff' }}>MindFlow</span>
        </div>
        <p className="text-xs terminal-text opacity-50" style={{ color:'#b9cacb' }}>© 2024 MindFlow Ecosystem. Elevate your consciousness.</p>
      </footer>
    </div>
  );
}
