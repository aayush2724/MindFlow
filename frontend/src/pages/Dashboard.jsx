import { useEffect, useState } from 'react';
import api from '../lib/api';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import { calculateBurnoutScore } from '../lib/burnoutEngine';

export default function Dashboard() {
  const { user } = useAuth();
  const [burnout, setBurnout] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const [scoreRes, historyRes] = await Promise.all([
          api.get('/burnout/me'),
          api.get('/burnout/me/history'),
        ]);
        
        if (scoreRes.data.hasData) {
          setBurnout({
            score: scoreRes.data.score,
            level: scoreRes.data.riskLevel,
            advice: [] // Optional advice if backend provides it
          });
        } else {
          // Fallback for first-time users
          setBurnout(calculateBurnoutScore({ mood:7, sleep:7, workload:4, stress:3 }));
        }

        setHistory(historyRes.data.map(h => ({
          score: h.score,
          date: h.calculatedAt
        })));
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setBurnout(calculateBurnoutScore({ mood:7, sleep:7, workload:4, stress:3 }));
      }
    }
    load();
  }, [user]);

  const score = burnout?.score ?? 12;
  const label = score < 30 ? 'Zen' : score < 60 ? 'Aware' : 'Strained';
  const sublabel = score < 30 ? 'OPTIMAL FLOW STATE' : score < 60 ? 'MONITOR CLOSELY' : 'TAKE A BREAK';

  // Build 7-day chart data from history
  const days = ['MON','TUE','WED','THU','FRI','SAT','SUN'];
  const chartHeights = history.length >= 7
    ? history.slice(-7).map(h => Math.max(10, Math.min(90, h.score || 30)))
    : [22,35,12,88,80,55,40];

  return (
    <div style={{ background:'transparent', color:'#e5e2e3', minHeight:'100vh', fontFamily:'Inter, sans-serif' }}>
      <Sidebar active="dashboard" />

      {/* Top Header */}
      <header className="fixed top-0 left-0 md:left-64 right-0 z-50 flex justify-between items-center px-6 py-4 header-integrated">
        <div className="flex items-center gap-4">
          <span className="font-bold tracking-tighter text-[#e1fdff]/80" style={{ fontFamily:'Space Grotesk', fontSize:20 }}>SYSTEM_OS_v4.2</span>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full border ml-4" style={{ background:'rgba(210,255,0,0.1)', borderColor:'rgba(210,255,0,0.3)' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-[#D2FF00] animate-pulse" />
            <span className="text-[9px] terminal-text font-bold tracking-widest" style={{ color:'#D2FF00' }}>SYNC_PROTOCOL: ACTIVE</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center px-4 py-2 rounded-lg border" style={{ background:'rgba(255,255,255,0.05)', borderColor:'rgba(255,255,255,0.1)' }}>
            <span className="material-symbols-outlined text-sm mr-2" style={{ color:'#b9cacb' }}>search</span>
            <input className="bg-transparent border-none outline-none text-xs w-48 placeholder:opacity-40" style={{ color:'#e5e2e3' }} placeholder="SEARCH NEURAL NET..." />
          </div>
          <motion.button 
            whileHover={{ scale: 1.2, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => alert("No new notifications")}
          >
            <span className="material-symbols-outlined transition-colors hover:text-[#e1fdff]" style={{ color:'#b9cacb' }}>notifications</span>
          </motion.button>
          <motion.div 
            whileHover={{ scale: 1.1, borderColor: '#D2FF00' }}
            className="w-10 h-10 rounded-lg border overflow-hidden cursor-pointer" 
            style={{ borderColor:'rgba(210,255,0,0.3)' }}
            onClick={() => alert(`Profile: ${user?.displayName || 'User'}`)}
          >
            <div className="w-full h-full rounded-lg flex items-center justify-center font-bold text-sm" style={{ background:'rgba(0,219,231,0.2)', color:'#e1fdff' }}>
              {(user?.displayName || 'A')[0].toUpperCase()}
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main */}
      <main className="pt-24 pb-0 px-6 md:ml-64 min-h-screen relative">
        <div className="max-w-7xl mx-auto">
          {/* Hero Bento */}
          <div className="pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
              {/* MoodMap Orb */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="lg:col-span-8 glass-panel rounded-[2rem] p-10 flex flex-col items-center justify-center relative overflow-hidden min-h-[550px] hud-border">
                <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center">
                  <div className="w-4/5 h-4/5 rounded-full border border-[#e1fdff]/20 animate-spin" style={{ animationDuration:'20s' }} />
                  <div className="absolute w-3/5 h-3/5 rounded-full border border-[#D2FF00]/10 animate-spin" style={{ animationDuration:'15s', animationDirection:'reverse' }} />
                </div>
                <div className="text-center z-10 mb-8">
                  <h2 className="font-bold tracking-widest uppercase mb-1" style={{ fontFamily:'Space Grotesk', fontSize:24, color:'#e1fdff' }}>MoodMap Core</h2>
                  <p className="text-[9px] terminal-text tracking-[0.3em] animate-pulse mb-4" style={{ color:'#D2FF00' }}>NEURAL ENGINE PROCESSING</p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="h-px w-12" style={{ background:'rgba(210,255,0,0.4)' }} />
                    <p className="terminal-text text-sm">BURNOUT_PROBABILITY: <span className="font-bold" style={{ color:'#D2FF00' }}>{score}%</span></p>
                    <div className="h-px w-12" style={{ background:'rgba(210,255,0,0.4)' }} />
                  </div>
                </div>
                {/* SVG Orb */}
                <div className="relative w-72 h-72 md:w-96 md:h-96 z-10 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full orb-pulse" style={{ background:'rgba(0,219,231,0.1)', filter:'blur(80px)' }} />
                  <svg className="w-full h-full mood-orb-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <radialGradient id="orbGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#74f5ff" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#006a71" stopOpacity="0.2" />
                      </radialGradient>
                    </defs>
                    <circle cx="100" cy="100" r="85" fill="none" stroke="#D2FF00" strokeDasharray="10 5" strokeWidth="0.5" className="animate-spin" style={{ animationDuration:'8s' }} />
                    <circle cx="100" cy="100" r="95" fill="none" stroke="#00dbe7" strokeDasharray="2 10" strokeWidth="0.2" className="animate-spin" style={{ animationDuration:'12s', animationDirection:'reverse' }} />
                    <circle cx="100" cy="100" r="70" fill="url(#orbGrad)" className="orb-pulse" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                    <span className="font-bold drop-shadow-lg" style={{ fontFamily:'Space Grotesk', fontSize:48, color:'white' }}>{label}</span>
                    <p className="terminal-text tracking-[0.4em] text-[10px] mt-2" style={{ color:'#D2FF00' }}>{sublabel}</p>
                    <p className="terminal-text tracking-[0.2em] text-[8px] opacity-60 mt-1" style={{ color:'#b9cacb' }}>REAL-TIME SYNC</p>
                  </div>
                </div>
                {/* Stats row */}
                <div className="mt-12 flex gap-12 z-10 w-full justify-center">
                  {[['STRESS_LEVEL', score < 30 ? 'LOW' : score < 60 ? 'MED' : 'HIGH'],
                    ['FLOW_STATE', score < 40 ? 'ACTIVE' : 'REDUCED'],
                    ['SLEEP_QLTY', `${Math.round(100 - score * 0.4)}%`]].map(([k,v]) => (
                    <div key={k} className="text-center group cursor-default">
                      <p className="text-[10px] terminal-text opacity-60 mb-1" style={{ color:'#b9cacb' }}>{k}</p>
                      <p className="font-semibold text-2xl transition-colors" style={{ fontFamily:'Space Grotesk', color:'#e1fdff' }}>{v}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right column */}
              <div className="lg:col-span-4 flex flex-col gap-8">
                {/* Daily Check-in */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="glass-panel rounded-[2rem] p-8 hud-border">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="font-semibold text-xl tracking-wide" style={{ fontFamily:'Space Grotesk', color:'#e1fdff' }}>Daily Status</h3>
                    <span className="material-symbols-outlined animate-pulse" style={{ color:'#D2FF00' }}>bolt</span>
                  </div>
                  <p className="text-xs terminal-text opacity-70 tracking-widest mb-8" style={{ color:'#b9cacb' }}>HOW ARE YOU VIBRATING TODAY?</p>
                  <div className="grid grid-cols-2 gap-4">
                    {[['mood','Focused'],['cloud','Drained'],['auto_awesome','Creative'],['self_improvement','Restless']].map(([icon,label]) => (
                      <Link key={icon} to="/checkin">
                        <button className="magnetic-btn w-full flex flex-col items-center gap-3 p-6 rounded-2xl border group transition-all"
                          style={{ background:'rgba(255,255,255,0.05)', borderColor:'rgba(255,255,255,0.05)' }}>
                          <span className="material-symbols-outlined text-3xl group-hover:text-[#D2FF00] transition-colors" style={{ color:'#e1fdff' }}>{icon}</span>
                          <span className="text-[10px] terminal-text opacity-80" style={{ color:'#b9cacb' }}>{label}</span>
                        </button>
                      </Link>
                    ))}
                  </div>
                </motion.div>

                {/* AI Insights */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="glass-panel rounded-[2rem] p-8 flex-1 border-l-[3px]" style={{ borderLeftColor:'rgba(210,255,0,0.6)' }}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background:'rgba(0,219,231,0.1)' }}>
                      <span className="material-symbols-outlined text-sm" style={{ color:'#e1fdff', fontVariationSettings:"'FILL' 1" }}>smart_toy</span>
                    </div>
                    <h3 className="font-semibold text-xl tracking-tight" style={{ fontFamily:'Space Grotesk', color:'#e1fdff' }}>Predictive Mesh Insights</h3>
                  </div>
                  <div className="space-y-6">
                    <div className="relative pl-6" style={{ borderLeft:'2px solid rgba(210,255,0,0.3)', paddingLeft:24 }}>
                      <p className="text-[9px] terminal-text mb-1 tracking-[0.2em]" style={{ color:'#D2FF00' }}>PROACTIVE ALERT</p>
                      <p className="text-sm leading-relaxed opacity-90" style={{ color:'#e5e2e3' }}>
                        {score > 60 ? 'Critical burnout risk detected. Consider scheduling a recovery session.' : 'Stress peaks predicted for Thursday due to combined deadlines.'}
                      </p>
                    </div>
                    <div className="relative pl-6" style={{ borderLeft:'2px solid rgba(0,219,231,0.3)', paddingLeft:24 }}>
                      <p className="text-[9px] terminal-text mb-1 tracking-[0.2em]" style={{ color:'#e1fdff' }}>SUGGESTION</p>
                      <p className="text-sm leading-relaxed opacity-90" style={{ color:'#e5e2e3' }}>Focus score was highest during 9:00 AM. Replicate lighting environment?</p>
                    </div>
                  </div>
                  <Link to="/calmcal">
                    <button className="mt-8 text-[10px] terminal-text font-bold flex items-center gap-2 transition-all hover:opacity-100 opacity-80 group" style={{ color:'#e1fdff' }}>
                      FULL_ANALYSIS_DATA <span className="material-symbols-outlined text-[10px] group-hover:translate-x-1 transition-transform">arrow_forward_ios</span>
                    </button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Lower Section — CalmCal preview */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="relative z-20 mt-20 rounded-3xl p-6 lg:p-8 mb-12 border"
            style={{ background:'rgba(14,14,15,0.9)', backdropFilter:'blur(32px)', borderColor:'rgba(255,255,255,0.1)', boxShadow:'0 -30px 60px rgba(0,0,0,0.6)' }}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* CalmCal Bar Chart */}
              <div className="lg:col-span-7 glass-panel rounded-[2rem] p-10 overflow-hidden hud-border">
                <div className="flex justify-between items-center mb-10">
                  <div>
                    <h3 className="font-semibold text-2xl" style={{ fontFamily:'Space Grotesk', color:'#e1fdff' }}>CalmCal Visualizer</h3>
                    <p className="text-xs opacity-60 tracking-wider terminal-text" style={{ color:'#b9cacb' }}>ACADEMIC_CYCLE // STRESS TRAJECTORY</p>
                  </div>
                  <div className="flex gap-3">
                    {['#D2FF00','rgba(0,219,231,0.5)','rgba(255,180,171,0.5)'].map((c,i) => (
                      <div key={i} className="w-2 h-2 rounded-full" style={{ background:c, boxShadow:`0 0 8px ${c}` }} />
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-6 h-48 items-end relative">
                  <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none">
                    {[0,1,2,3].map(i => <div key={i} className="h-px w-full bg-white" />)}
                  </div>
                  {chartHeights.map((h, i) => (
                    <div key={i} className="rounded-t-lg border-x border-t hover:opacity-80 transition-all relative group"
                      style={{ height:`${h}%`, background: h > 70 ? 'rgba(210,255,0,0.3)' : h > 50 ? 'rgba(255,180,171,0.2)' : 'rgba(0,219,231,0.15)', borderColor: h > 70 ? 'rgba(210,255,0,0.2)' : 'rgba(255,255,255,0.05)' }}>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[8px] terminal-text px-2 py-1 rounded"
                        style={{ background:'rgba(0,0,0,0.8)', color:'#D2FF00' }}>{days[i]}: {h}%</div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-6 mt-4 text-center">
                  {days.map((d, i) => (
                    <span key={d} className="text-[10px] terminal-text font-bold" style={{ color: chartHeights[i] > 70 ? '#e1fdff' : 'rgba(185,202,203,0.4)' }}>{d}</span>
                  ))}
                </div>
              </div>

              {/* Featured resource */}
              <div className="lg:col-span-5 rounded-[2rem] overflow-hidden relative group glass-panel">
                <div className="absolute inset-0 flex items-center justify-center" style={{ background:'linear-gradient(135deg, rgba(0,219,231,0.05) 0%, rgba(210,255,0,0.05) 50%, rgba(0,0,0,0.8) 100%)' }}>
                  <span className="material-symbols-outlined text-[120px] opacity-10" style={{ color:'#e1fdff' }}>self_improvement</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-[9px] terminal-text mb-3 tracking-[0.3em]" style={{ color:'#D2FF00' }}>MINDSET_DISCOVERY_04</p>
                  <h4 className="font-semibold text-2xl text-white mb-6 leading-tight" style={{ fontFamily:'Space Grotesk' }}>Mastering Deep Work in Academic Cycles</h4>
                  <button className="border px-8 py-3 rounded-full text-[10px] terminal-text transition-all duration-300 hover:bg-[#D2FF00] hover:text-black"
                    style={{ background:'rgba(255,255,255,0.1)', backdropFilter:'blur(20px)', borderColor:'rgba(255,255,255,0.2)', color:'white' }}>
                    COMMENCE_SESSION
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-6 flex flex-col md:flex-row justify-between items-center gap-2 border-t md:ml-64"
        style={{ background:'rgba(14,14,15,0.9)', borderColor:'rgba(255,255,255,0.05)', width:'calc(100% - 0px)' }}>
        <div>
          <span className="font-bold tracking-tighter opacity-60" style={{ fontFamily:'Space Grotesk', fontSize:20, color:'#e1fdff' }}>MindFlow_EcoSys</span>
          <p className="text-[9px] terminal-text opacity-50 mt-1" style={{ color:'#b9cacb' }}>© 2024 NEURAL INTERFACE. ELEVATE CONSCIOUSNESS.</p>
        </div>
        <div className="flex gap-8">
          {['PRIVACY','ETHICS_AI','RESEARCH','CONTACT'].map(l => (
            <a key={l} href="#" className="text-[9px] terminal-text opacity-60 hover:opacity-100 hover:text-[#D2FF00] transition-all tracking-widest" style={{ color:'#b9cacb' }}>{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
