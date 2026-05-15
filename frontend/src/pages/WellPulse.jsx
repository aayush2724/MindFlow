import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const DEPTS = [
  { name:'School of Engineering', nodes:'2,450_NODES', mood:'3.2 / 5.0', risk:'CRITICAL', riskColor:'#ffb4ab', dotColor:'#ffb4ab' },
  { name:'Faculty of Fine Arts',  nodes:'1,120_NODES', mood:'4.6 / 5.0', risk:'LOW_RISK', riskColor:'#D2FF00',  dotColor:'#D2FF00' },
  { name:'Medical Sciences',      nodes:'1,890_NODES', mood:'3.9 / 5.0', risk:'STABLE',   riskColor:'#00dbe7',  dotColor:'#00dbe7' },
];

const BARS = [
  { h:30, color:'lime' },{ h:35, color:'lime' },{ h:42, color:'lime' },
  { h:68, color:'error'},{ h:75, color:'error'},{ h:50, color:'lime' },
  { h:45, color:'lime' },{ h:38, color:'lime' },{ h:32, color:'lime' },
];
const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP'];

export default function WellPulse() {
  return (
    <div className="crt-overlay" style={{ background:'#000', color:'#e5e2e3', minHeight:'100vh', fontFamily:'Inter, sans-serif' }}>
      {/* Black Hole BG */}
      <div style={{ position:'fixed', inset:0, zIndex:-1, background:'#020202', overflow:'hidden' }}>
        <div className="accretion-disk-layer" />
        <div className="accretion-disk-inner-wp" />
        <div className="event-horizon" />
        <div className="gravitational-lensing-wp" style={{ zIndex:2 }} />
      </div>

      {/* Decorative accents */}
      <div style={{ position:'fixed', top:'25%', left:40, zIndex:10, opacity:0.4, pointerEvents:'none' }}>
        <span className="terminal-text text-[8px]" style={{ color:'rgba(0,219,231,0.5)' }}>[ SINGULARITY_PROXIMITY_ALERT ]</span>
        <div className="h-px w-12 mt-1" style={{ background:'rgba(0,219,231,0.2)' }} />
      </div>
      <div style={{ position:'fixed', bottom:'33%', right:48, zIndex:10, opacity:0.4, textAlign:'right', pointerEvents:'none' }}>
        <div className="h-px w-16 ml-auto mb-1" style={{ background:'rgba(210,255,0,0.2)' }} />
        <span className="terminal-text text-[8px]" style={{ color:'rgba(210,255,0,0.5)' }}>WARP_FIELD_STABLE</span>
      </div>

      <Sidebar active="wellpulse" />

      {/* Top Nav */}
      <nav className="fixed top-0 left-0 md:left-64 right-0 z-50 flex justify-between items-center px-6 py-4 border-b"
        style={{ background:'rgba(19,19,20,0.6)', backdropFilter:'blur(24px)', borderColor:'rgba(255,255,255,0.08)' }}>
        <div className="flex items-center gap-2">
          <span className="font-bold tracking-tight" style={{ fontFamily:'Space Grotesk', fontSize:20, color:'#e1fdff' }}>MindFlow</span>
          <span className="hidden md:block text-[10px] terminal-text px-2 py-0.5 rounded border" style={{ color:'#b9cacb', background:'rgba(32,31,32,0.5)', borderColor:'rgba(255,255,255,0.08)' }}>SYS_ID: WELLPULSE_v4.2</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center rounded-lg px-4 py-1.5 gap-3 border" style={{ background:'rgba(14,14,15,0.8)', borderColor:'rgba(255,255,255,0.08)' }}>
            <span className="material-symbols-outlined text-[20px]" style={{ color:'#e1fdff' }}>search</span>
            <input className="bg-transparent border-none outline-none text-sm terminal-text w-48 placeholder:opacity-40" style={{ color:'#e5e2e3' }} placeholder="QUERY_COHORT..." />
          </div>
          <div className="flex items-center gap-4">
            <button><span className="material-symbols-outlined transition-colors hover:text-[#e1fdff]" style={{ color:'#b9cacb' }}>notifications</span></button>
            <button><span className="material-symbols-outlined transition-colors hover:text-[#e1fdff]" style={{ color:'#b9cacb' }}>terminal</span></button>
            <div className="w-10 h-10 rounded-full border p-0.5" style={{ borderColor:'rgba(0,219,231,0.3)' }}>
              <div className="w-full h-full rounded-full flex items-center justify-center font-bold text-sm" style={{ background:'rgba(0,219,231,0.2)', color:'#e1fdff' }}>C</div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="pt-24 pb-12 px-6 md:ml-64 relative z-20">
        <div className="max-w-7xl mx-auto">

          {/* Section 1: Header + KPIs */}
          <div className="sticky rounded-3xl p-6 md:p-8 mb-24 border shadow-[0_-15px_40px_rgba(0,0,0,0.8)]"
            style={{ top:88, zIndex:10, background:'rgba(10,10,11,0.95)', backdropFilter:'blur(32px)', borderColor:'rgba(255,255,255,0.08)' }}>
            <header className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
              <div className="space-y-2">
                <h1 className="font-bold tracking-tight" style={{ fontFamily:'Space Grotesk', fontSize:'clamp(36px,5vw,64px)', color:'#e1fdff' }}>Institutional Pulse</h1>
                <p className="text-lg font-light" style={{ color:'#b9cacb' }}>
                  Aggregate mental equilibrium telemetry. Monitoring <span className="terminal-text" style={{ color:'#e1fdff' }}>14,200</span> active student nodes.
                </p>
              </div>
              <div className="flex gap-3">
                <button className="border rounded-lg px-5 py-2.5 font-bold flex items-center gap-2 terminal-text text-sm transition-all hover:opacity-80"
                  style={{ background:'rgba(0,219,231,0.1)', borderColor:'rgba(0,219,231,0.3)', color:'#e1fdff' }}>
                  <span className="material-symbols-outlined text-[20px]">download</span> EXPORT_DATA
                </button>
                <button className="border rounded-lg px-5 py-2.5 font-bold flex items-center gap-2 terminal-text text-sm transition-all hover:opacity-80"
                  style={{ background:'rgba(32,31,32,0.4)', borderColor:'rgba(255,255,255,0.08)', color:'#e5e2e3' }}>
                  <span className="material-symbols-outlined text-[20px]">filter_alt</span> FILTERS
                </button>
              </div>
            </header>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label:'AVG_BURNOUT_METRIC', val:'42.8%', sub:'+4.2 ▲', valColor:'#D2FF00', bar:42, barColor:'#D2FF00' },
                { label:'HIGH_RISK_ALERTS',   val:'128',   sub:'CRITICAL_OVERFLOW', valColor:'#ffb4ab', sub_anim:true },
                { label:'CALM_FLOW_SESSIONS', val:'3,492', sub:'⚡ ACTIVE', valColor:'#00dbe7', bar:null },
                { label:'ENGAGEMENT_INDEX',   val:'88.5',  sub:'Optimal_State', valColor:'#e1fdff' },
              ].map((kpi, i) => (
                <div key={i} className="rounded-2xl p-6 flex flex-col gap-2 border transition-all hover:border-[rgba(0,219,231,0.4)]"
                  style={{ background:'rgba(10,10,11,0.4)', backdropFilter:'blur(40px)', borderColor:'rgba(0,242,255,0.15)' }}>
                  <span className="text-[10px] terminal-text tracking-widest uppercase" style={{ color:'#b9cacb' }}>{kpi.label}</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold terminal-text" style={{ fontSize:32, color:kpi.valColor }}>{kpi.val}</span>
                    {kpi.sub && <span className={`text-xs terminal-text ${kpi.sub_anim ? 'animate-pulse' : ''}`} style={{ color:kpi.valColor, opacity:0.8 }}>{kpi.sub}</span>}
                  </div>
                  {kpi.bar && (
                    <div className="h-1 w-full rounded-full mt-4 overflow-hidden" style={{ background:'rgba(53,52,54,1)' }}>
                      <div className="h-full chart-bar rounded-full" style={{ width:`${kpi.bar}%`, background:kpi.barColor }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Visualization */}
          <div className="sticky rounded-3xl p-6 md:p-8 mb-24 border shadow-[0_-15px_40px_rgba(0,0,0,0.8)]"
            style={{ top:112, zIndex:20, background:'rgba(10,10,11,0.95)', backdropFilter:'blur(32px)', borderColor:'rgba(255,255,255,0.08)' }}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Mesh Map */}
              <section className="lg:col-span-2 rounded-3xl overflow-hidden flex flex-col h-[500px] border transition-all hover:border-[rgba(0,219,231,0.4)]"
                style={{ background:'rgba(10,10,11,0.4)', backdropFilter:'blur(40px)', borderColor:'rgba(0,242,255,0.15)' }}>
                <div className="p-8 flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded border font-bold tracking-widest text-[9px] terminal-text" style={{ background:'rgba(182,0,248,0.2)', borderColor:'rgba(182,0,248,0.4)', color:'#f8d8ff' }}>Predictive_Mesh_Active</span>
                      <span className="px-2 py-0.5 rounded border font-bold tracking-widest text-[9px] terminal-text" style={{ background:'rgba(0,219,231,0.1)', borderColor:'rgba(0,219,231,0.3)', color:'#e1fdff' }}>Sync_Protocol_Link</span>
                    </div>
                    <h3 className="font-semibold text-2xl mb-1" style={{ fontFamily:'Space Grotesk', color:'#e1fdff' }}>Topological Wellbeing Mesh</h3>
                    <p className="text-sm terminal-text" style={{ color:'#b9cacb' }}>Real-time geospatial stress distribution via Predictive Mesh engine.</p>
                  </div>
                  <div className="flex rounded-lg p-1 border" style={{ background:'rgba(14,14,15,0.8)', borderColor:'rgba(255,255,255,0.08)' }}>
                    <button className="px-4 py-1.5 rounded text-[10px] terminal-text font-bold" style={{ background:'rgba(0,219,231,0.1)', color:'#e1fdff' }}>MESH_3D</button>
                    <button className="px-4 py-1.5 rounded text-[10px] terminal-text" style={{ color:'#b9cacb' }}>FLAT_GRID</button>
                  </div>
                </div>
                <div className="flex-1 relative mesh-viz mx-8 mb-8 rounded-2xl overflow-hidden border" style={{ borderColor:'rgba(255,255,255,0.08)' }}>
                  <div className="mesh-grid" />
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute rounded-full" style={{ top:'20%', left:'30%', width:256, height:256, background:'rgba(255,180,171,0.1)', filter:'blur(100px)', animation:'pulse 3s ease-in-out infinite' }} />
                    <div className="absolute rounded-full" style={{ bottom:'30%', right:'20%', width:320, height:320, background:'rgba(0,219,231,0.1)', filter:'blur(100px)' }} />
                  </div>
                  {/* Data pins */}
                  {[
                    { top:'40%', left:'45%', color:'#ffb4ab', label:'NODE: ENG_LOBBY', stress:'0.88μ', alerts:'12_ACTV' },
                    { bottom:'35%', right:'35%', color:'#D2FF00', label:'NODE: LIB_ZONE_C', stress:'0.12μ', alerts:'OPTIMAL' },
                  ].map((pin, i) => (
                    <div key={i} className="absolute flex flex-col items-center pointer-events-auto group cursor-crosshair"
                      style={{ top:pin.top, left:pin.left, bottom:pin.bottom, right:pin.right }}>
                      <div className="w-2 h-2 rounded-full" style={{ background:pin.color, boxShadow:`0 0 10px ${pin.color}` }} />
                      <div className="h-16 w-px" style={{ background:`linear-gradient(to top, ${pin.color}, transparent)` }} />
                      <div className="rounded p-2 opacity-0 group-hover:opacity-100 transition-all border terminal-text text-[10px]"
                        style={{ background:'rgba(19,19,20,0.9)', backdropFilter:'blur(12px)', borderColor:`${pin.color}80` }}>
                        <div className="font-bold mb-1" style={{ color:pin.color }}>{pin.label}</div>
                        <div style={{ color:'white' }}>STRESS: {pin.stress}</div>
                        <div style={{ color:'rgba(255,255,255,0.6)' }}>STATUS: {pin.alerts}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Alerts Feed */}
              <section className="rounded-3xl p-8 flex flex-col h-[500px] border transition-all hover:border-[rgba(0,219,231,0.4)]"
                style={{ background:'rgba(10,10,11,0.4)', backdropFilter:'blur(40px)', borderColor:'rgba(0,242,255,0.15)' }}>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-[10px] terminal-text tracking-widest uppercase" style={{ color:'#b9cacb' }}>SYSLOG_ALERTS</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] terminal-text" style={{ color:'#ffb4ab' }}>LIVE_STREAM</span>
                    <span className="flex h-2 w-2 rounded-full bg-[#ffb4ab] animate-ping" />
                  </div>
                </div>
                <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                  {[
                    { type:'CRITICAL_DETECTION', time:'02:14:05', msg:'COHORT_CS_Y3: Burnout threshold exceeded [0.75] for 45/200 nodes.', color:'#ffb4ab', action:'DECODE_AND_INTERVENE', bg:'rgba(255,180,171,0.05)', border:'rgba(255,180,171,0.3)' },
                    { type:'PATTERN_SYNC',       time:'01:55:20', msg:'LATENIGHT_ANOMALY: High intensity activity detected in LAW_LIB cluster.', color:'#00dbe7', bg:'rgba(32,31,32,0.5)' },
                    { type:'HEALTH_CHECK',        time:'00:10:45', msg:'MED_SCHOOL: Positive trend. Calm_Sessions up 22% vs 24H_AVG.', color:'#D2FF00', bg:'rgba(32,31,32,0.5)' },
                  ].map((alert, i) => (
                    <div key={i} className={`p-4 rounded-xl border ${alert.action ? 'critical-alert-glow' : ''}`}
                      style={{ background:alert.bg, borderColor:alert.border || 'rgba(255,255,255,0.08)' }}>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] terminal-text font-bold" style={{ color:alert.color }}>{alert.type}</span>
                        <span className="text-[10px] terminal-text" style={{ color:'#b9cacb' }}>{alert.time}</span>
                      </div>
                      <p className="text-xs terminal-text leading-relaxed" style={{ color:'rgba(229,226,227,0.9)' }}>{alert.msg}</p>
                      {alert.action && (
                        <button className="mt-4 w-full py-2 rounded text-[10px] terminal-text font-bold uppercase transition-all hover:brightness-110"
                          style={{ background:'#ffb4ab', color:'#690005' }}>{alert.action}</button>
                      )}
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 py-3 border rounded-xl text-[10px] terminal-text uppercase tracking-widest transition-colors hover:text-[#e1fdff] hover:bg-[rgba(255,255,255,0.03)]"
                  style={{ borderColor:'rgba(255,255,255,0.08)', color:'#b9cacb' }}>QUERY_FULL_LOGS</button>
              </section>
            </div>
          </div>

          {/* Section 3: Burnout Trend Chart */}
          <div className="sticky rounded-3xl p-6 md:p-8 mb-24 border shadow-[0_-15px_40px_rgba(0,0,0,0.8)]"
            style={{ top:136, zIndex:30, background:'rgba(10,10,11,0.95)', backdropFilter:'blur(32px)', borderColor:'rgba(255,255,255,0.08)' }}>
            <section className="rounded-3xl p-8 relative overflow-hidden border transition-all hover:border-[rgba(0,219,231,0.4)]"
              style={{ background:'rgba(10,10,11,0.4)', backdropFilter:'blur(40px)', borderColor:'rgba(0,242,255,0.15)' }}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                  <h3 className="font-semibold text-2xl" style={{ fontFamily:'Space Grotesk', color:'#e1fdff' }}>Burnout Risk Trajectory</h3>
                  <p className="text-sm terminal-text tracking-tighter" style={{ color:'#b9cacb' }}>PREDICTIVE_DATA_STREAM v1.0.2</p>
                </div>
                <div className="flex rounded-full p-1 border" style={{ background:'rgba(14,14,15,0.8)', borderColor:'rgba(255,255,255,0.08)' }}>
                  {['WEEKLY','MONTHLY','SEMESTER'].map((p, i) => (
                    <button key={p} className="px-5 py-1.5 rounded-full text-[10px] terminal-text font-bold transition-all"
                      style={{ background: i===1 ? 'rgba(0,219,231,0.1)' : 'transparent', color: i===1 ? '#e1fdff' : '#b9cacb' }}>{p}</button>
                  ))}
                </div>
              </div>
              <div className="w-full h-72 relative flex items-end justify-between border-b px-6 pb-4" style={{ borderColor:'rgba(255,255,255,0.08)' }}>
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  {[0,1,2,3,4].map(i => <div key={i} className="border-t w-full" style={{ borderColor:'rgba(255,255,255,0.05)' }} />)}
                </div>
                {BARS.map((bar, i) => (
                  <div key={i} className="w-[8%] rounded-t border-x border-t chart-bar relative"
                    style={{
                      height:`${bar.h}%`,
                      animationDelay:`${(i+1)*0.1}s`,
                      background: bar.color==='error' ? 'linear-gradient(to top,rgba(255,180,171,0.1),rgba(255,180,171,0.7))' : 'linear-gradient(to top,rgba(210,255,0,0.1),rgba(210,255,0,0.6))',
                      borderColor: bar.color==='error' ? 'rgba(255,180,171,0.2)' : 'rgba(210,255,0,0.2)',
                    }} />
                ))}
              </div>
              <div className="flex justify-between px-6 mt-4 terminal-text text-[10px] font-bold" style={{ color:'#b9cacb' }}>
                {MONTHS.map(m => <span key={m}>{m}</span>)}
              </div>
            </section>
          </div>

          {/* Section 4: Departmental Table */}
          <div className="sticky rounded-3xl p-6 md:p-8 border shadow-[0_-15px_40px_rgba(0,0,0,0.8)]"
            style={{ top:160, zIndex:40, background:'rgba(10,10,11,0.95)', backdropFilter:'blur(32px)', borderColor:'rgba(255,255,255,0.08)' }}>
            <section className="rounded-3xl overflow-hidden border transition-all hover:border-[rgba(0,219,231,0.4)]"
              style={{ background:'rgba(10,10,11,0.4)', backdropFilter:'blur(40px)', borderColor:'rgba(0,242,255,0.15)' }}>
              <div className="p-8 border-b flex justify-between items-center" style={{ borderColor:'rgba(255,255,255,0.08)', background:'rgba(28,27,28,0.3)' }}>
                <h3 className="font-semibold text-2xl" style={{ fontFamily:'Space Grotesk', color:'#e1fdff' }}>Departmental deep_dive</h3>
                <span className="text-[10px] terminal-text" style={{ color:'#b9cacb' }}>3_CLUSTERS_ACTIVE</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead style={{ background:'rgba(42,42,43,0.2)' }}>
                    <tr>
                      {['NODE_ID','CAPACITY','MOOD_IDX','RISK_LVL','OP'].map(h => (
                        <th key={h} className="px-8 py-5 text-[10px] terminal-text font-bold tracking-widest uppercase" style={{ color:'#b9cacb' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {DEPTS.map((d, i) => (
                      <tr key={i} className="transition-colors hover:bg-[rgba(0,219,231,0.03)]" style={{ borderTop:'1px solid rgba(255,255,255,0.05)' }}>
                        <td className="px-8 py-6 font-bold text-sm terminal-text" style={{ color:'#e5e2e3' }}>{d.name}</td>
                        <td className="px-8 py-6 text-sm terminal-text" style={{ color:'#b9cacb' }}>{d.nodes}</td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full" style={{ background:d.dotColor, boxShadow:`0 0 8px ${d.dotColor}` }} />
                            <span className="terminal-text text-sm" style={{ color:'#e5e2e3' }}>{d.mood}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="px-3 py-1 rounded border text-[10px] terminal-text font-bold"
                            style={{ background:`${d.riskColor}1A`, color:d.riskColor, borderColor:`${d.riskColor}33` }}>{d.risk}</span>
                        </td>
                        <td className="px-8 py-6">
                          <button className="text-[10px] terminal-text font-bold uppercase underline underline-offset-4 transition-colors hover:text-[#D2FF00]" style={{ color:'#e1fdff' }}>FETCH_DETAILS</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="md:ml-64 py-12 px-6 flex flex-col md:flex-row justify-between items-center gap-8 border-t mt-24"
        style={{ background:'rgba(10,10,11,0.6)', backdropFilter:'blur(20px)', borderColor:'rgba(255,255,255,0.05)', position:'relative', zIndex:20 }}>
        <div className="flex flex-col gap-2">
          <span className="font-bold" style={{ fontFamily:'Space Grotesk', fontSize:24, color:'#e1fdff' }}>MindFlow</span>
          <span className="text-[10px] terminal-text tracking-widest uppercase" style={{ color:'#b9cacb' }}>© 2024 MINDFLOW_ECOSYSTEM. LEVEL_4_ACCESS.</span>
        </div>
        <div className="flex gap-8">
          {['PRIVACY_POLICY','ETHICS_CORE','SECURE_CONTACT'].map(l => (
            <a key={l} href="#" className="text-[10px] terminal-text font-bold uppercase transition-colors hover:text-[#e1fdff]" style={{ color:'#b9cacb' }}>{l}</a>
          ))}
        </div>
      </footer>

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full px-6 py-3 flex justify-around items-center z-50 border-t"
        style={{ background:'rgba(19,19,20,0.8)', backdropFilter:'blur(24px)', borderColor:'rgba(255,255,255,0.08)' }}>
        {[['grid_view','DASH','/wellpulse'],['analytics','MAP','#'],['notifications','LOGS','#']].map(([icon,label,to]) => (
          <Link key={label} to={to} className="flex flex-col items-center gap-1" style={{ color: label==='DASH' ? '#e1fdff' : '#b9cacb' }}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: label==='DASH' ? "'FILL' 1" : "'FILL' 0" }}>{icon}</span>
            <span className="text-[9px] terminal-text font-bold">{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
