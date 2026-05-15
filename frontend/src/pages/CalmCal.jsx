import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import { fetchHeatmapData } from '../lib/firestore';

const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

export default function CalmCal() {
  const { user } = useAuth();
  const [heatmap, setHeatmap] = useState([]);

  useEffect(() => {
    fetchHeatmapData(user?.uid || 'demo', 7).then(setHeatmap).catch(() => {});
  }, [user]);

  // Build week display
  const week = DAYS.map((d, i) => {
    const entry = heatmap[i] || { count: Math.floor(Math.random() * 4) };
    const lvl = entry.count >= 3 ? 'high' : entry.count >= 2 ? 'med' : 'low';
    return { day: d, date: 14 + i, lvl };
  });

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
    <div className="obsidian-grid" style={{ background:'#0e0e0f', color:'#e5e2e3', minHeight:'100vh', fontFamily:'Inter, sans-serif' }}>
      {/* Space background */}
      <div aria-hidden="true" style={{ position:'fixed', inset:0, zIndex:-2, background:'radial-gradient(circle at 50% 50%, #0c141d 0%, #080808 100%)', overflow:'hidden' }}>
        <div className="nebula nebula-cyan" />
        <div className="nebula nebula-lime" />
        <div className="star-layer stars-small" id="stars-p1"
          style={{ position:'absolute', top:'-10%', left:'-10%', width:'120%', height:'120%', backgroundImage:'radial-gradient(1px 1px at 20px 30px, #fff, rgba(0,0,0,0)), radial-gradient(1px 1px at 80px 120px, #fff, rgba(0,0,0,0))', backgroundSize:'200px 200px', opacity:0.5 }} />
        <div className="star-layer" id="stars-p2"
          style={{ position:'absolute', top:'-10%', left:'-10%', width:'120%', height:'120%', backgroundImage:'radial-gradient(2px 2px at 100px 100px, #e1fdff, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 400px 400px, #D2FF00, rgba(0,0,0,0))', backgroundSize:'600px 600px', opacity:0.3 }} />
      </div>

      <Sidebar active="calmcal" />

      {/* Top Nav */}
      <nav className="fixed top-0 left-0 md:left-64 right-0 z-50 flex justify-between items-center px-6 py-4 border-b"
        style={{ background:'rgba(14,14,15,0.6)', backdropFilter:'blur(20px)', borderColor:'rgba(255,255,255,0.08)', boxShadow:'0 0 15px rgba(0,219,231,0.1)' }}>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined" style={{ color:'#D2FF00', fontVariationSettings:"'FILL' 1" }}>psychology</span>
          <span className="font-bold tracking-tight" style={{ fontFamily:'Space Grotesk', fontSize:20, color:'#e1fdff' }}>MindFlow</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {[['Dashboard','/dashboard'],['MoodMap','/checkin'],['CalmCal','/calmcal'],['Resources','#']].map(([l,to]) => (
            <Link key={l} to={to} className="text-xs terminal-text font-semibold transition-colors duration-300"
              style={{ color: l==='CalmCal' ? '#e1fdff' : '#b9cacb', borderBottom: l==='CalmCal' ? '2px solid #D2FF00' : 'none', paddingBottom:4 }}>{l}</Link>
          ))}
        </div>
        <div className="flex items-center gap-6">
          <span className="material-symbols-outlined cursor-pointer hover:text-[#e1fdff] transition-all" style={{ color:'#b9cacb' }}>notifications</span>
          <div className="w-10 h-10 rounded-full overflow-hidden border" style={{ borderColor:'rgba(255,255,255,0.08)' }}>
            <div className="w-full h-full flex items-center justify-center font-bold text-sm" style={{ background:'rgba(0,219,231,0.2)', color:'#e1fdff' }}>
              {(user?.displayName || 'A')[0]}
            </div>
          </div>
        </div>
      </nav>

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
              <button className="px-6 py-2 rounded-full font-bold text-xs terminal-text" style={{ background:'rgba(0,242,255,0.15)', color:'#00f2ff' }}>Weekly</button>
              <button className="px-6 py-2 rounded-full font-bold text-xs terminal-text" style={{ color:'#b9cacb' }}>Monthly</button>
            </div>
          </header>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left — Heatmap + Timeline */}
            <div className="lg:col-span-8 space-y-8">
              {/* Thermal Heatmap */}
              <div className="rounded-3xl p-8 overflow-hidden relative shadow-2xl"
                style={{ background:'rgba(14,14,15,0.65)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.1)' }}>
                <div className="absolute inset-0 opacity-30 pointer-events-none"
                  style={{ background:'linear-gradient(135deg,rgba(0,219,231,0.05) 0%,rgba(210,255,0,0.05) 50%,rgba(255,180,171,0.1) 100%)' }} />
                <div className="grid grid-cols-7 gap-4 mb-6 relative z-10">
                  {DAYS.map(d => <div key={d} className="text-center text-xs terminal-text font-semibold pb-2" style={{ color:'#b9cacb' }}>{d}</div>)}
                  {week.map(({ day, date, lvl }, i) => (
                    <div key={i} className={`aspect-square rounded-2xl flex flex-col items-center justify-center relative heatmap-${lvl} transition-all duration-500 hover:scale-105 cursor-pointer`}
                      style={{ backdropFilter:'blur(8px)' }}>
                      <span className="font-bold text-base" style={{ color: lvl==='high' ? '#ffb4ab' : '#e5e2e3' }}>{date}</span>
                      {lvl==='high' && <span className="text-[10px] font-bold mt-1 tracking-widest" style={{ color:'#ffb4ab' }}>PEAK</span>}
                      {lvl==='low' && <span className="material-symbols-outlined text-sm mt-1" style={{ color:'#e1fdff', transform:'scale(0.75)' }}>spa</span>}
                    </div>
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
              </div>

              {/* Daily Timeline */}
              <div className="rounded-3xl p-8 shadow-2xl" style={{ background:'rgba(14,14,15,0.65)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.1)' }}>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <h3 className="font-semibold text-2xl" style={{ fontFamily:'Space Grotesk', color:'#e1fdff' }}>Daily Flow: Oct 16</h3>
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
              </div>
            </div>

            {/* Right sidebar panel */}
            <aside className="lg:col-span-4 space-y-8">
              {/* Burnout Ring */}
              <div className="rounded-3xl p-8 border-t-2 shadow-2xl" style={{ background:'rgba(14,14,15,0.65)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.1)', borderTop:'2px solid rgba(255,180,171,0.5)' }}>
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
              </div>

              {/* Smart Breaks */}
              <div className="rounded-3xl p-8 shadow-2xl" style={{ background:'rgba(14,14,15,0.65)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.1)' }}>
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
              </div>
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
