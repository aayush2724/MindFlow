import { useState } from 'react';
import Sidebar from '../components/Sidebar';

const MOCK_DEPARTMENTS = [
  { name:'School of Engineering', students:2450, avgBurnout:72, checkInRate:68, riskLevel:'critical', stressors:['DEADLINES','WORKLOAD','SLEEP_DEFICIT'] },
  { name:'Faculty of Fine Arts',  students:1120, avgBurnout:28, checkInRate:91, riskLevel:'low',      stressors:['CREATIVE_BLOCKS'] },
  { name:'Medical Sciences',      students:1890, avgBurnout:58, checkInRate:74, riskLevel:'moderate', stressors:['EXAM_PRESSURE','CLINICAL_HOURS'] },
  { name:'Business School',       students:2100, avgBurnout:45, checkInRate:80, riskLevel:'moderate', stressors:['PRESENTATIONS','GROUP_PROJECTS'] },
  { name:'Faculty of Law',        students:980,  avgBurnout:79, checkInRate:61, riskLevel:'high',     stressors:['CASE_LOADS','MOOT_PREP','DEADLINES'] },
  { name:'School of Sciences',    students:1560, avgBurnout:41, checkInRate:83, riskLevel:'low',      stressors:['LAB_REPORTS','RESEARCH'] },
];

const TRENDS = {
  'School of Engineering': [55,60,65,72,78,74,72],
  'Faculty of Fine Arts':  [30,28,25,22,28,30,28],
  'Medical Sciences':      [50,52,58,60,55,57,58],
  'Business School':       [40,42,45,43,44,46,45],
  'Faculty of Law':        [65,70,75,78,80,79,79],
  'School of Sciences':    [38,40,42,38,41,40,41],
};

const RISK_MAP = {
  critical: { label: 'CRITICAL', color: '#ffb4ab' },
  high:     { label: 'HIGH_RISK', color: '#ffb4ab' },
  moderate: { label: 'STABLE',    color: '#00dbe7' },
  low:      { label: 'OPTIMAL',   color: '#D2FF00' },
};

export default function Departments() {
  const [selectedDept, setSelectedDept] = useState('School of Engineering');

  const getBarColor = (val) => val > 70 ? '#ffb4ab' : val > 45 ? '#D2FF00' : '#00dbe7';

  return (
    <div className="crt-overlay" style={{ background:'#000', color:'#e5e2e3', minHeight:'100vh', fontFamily:'Inter, sans-serif' }}>
      {/* Black Hole BG */}
      <div style={{ position:'fixed', inset:0, zIndex:-1, background:'#020202', overflow:'hidden' }}>
        <div className="accretion-disk-layer" />
        <div className="accretion-disk-inner-wp" />
        <div className="event-horizon" />
        <div className="gravitational-lensing-wp" style={{ zIndex:2 }} />
      </div>

      <Sidebar active="departments" />

      {/* Top Nav */}
      <nav className="fixed top-0 left-0 md:left-64 right-0 z-50 flex justify-between items-center px-6 py-4 border-b"
        style={{ background:'rgba(19,19,20,0.6)', backdropFilter:'blur(24px)', borderColor:'rgba(255,255,255,0.08)' }}>
        <div className="flex items-center gap-2">
          <span className="font-bold tracking-tight" style={{ fontFamily:'Space Grotesk', fontSize:20, color:'#e1fdff' }}>MindFlow</span>
          <span className="hidden md:block text-[10px] terminal-text px-2 py-0.5 rounded border" style={{ color:'#b9cacb', background:'rgba(32,31,32,0.5)', borderColor:'rgba(255,255,255,0.08)' }}>SYS_ID: DEPT_INTEL_v1.0</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center rounded-lg px-4 py-1.5 gap-3 border" style={{ background:'rgba(14,14,15,0.8)', borderColor:'rgba(255,255,255,0.08)' }}>
            <span className="material-symbols-outlined text-[20px]" style={{ color:'#e1fdff' }}>search</span>
            <input className="bg-transparent border-none outline-none text-sm terminal-text w-48 placeholder:opacity-40" style={{ color:'#e5e2e3' }} placeholder="SEARCH_DEPARTMENTS..." />
          </div>
          <div className="flex items-center gap-4">
            <button><span className="material-symbols-outlined transition-colors hover:text-[#e1fdff]" style={{ color:'#b9cacb' }}>notifications</span></button>
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
          <div className="sticky rounded-3xl p-6 md:p-8 mb-12 border shadow-[0_-15px_40px_rgba(0,0,0,0.8)]"
            style={{ top:88, zIndex:10, background:'rgba(10,10,11,0.95)', backdropFilter:'blur(32px)', borderColor:'rgba(255,255,255,0.08)' }}>
            <header className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
              <div className="space-y-2">
                <h1 className="font-bold tracking-tight" style={{ fontFamily:'Space Grotesk', fontSize:'clamp(36px,5vw,64px)', color:'#e1fdff' }}>Department Intel</h1>
                <p className="text-lg font-light" style={{ color:'#b9cacb' }}>
                  Per-department burnout analytics. Anonymised aggregate data.
                </p>
              </div>
              <div className="flex gap-3">
                <button className="border rounded-lg px-5 py-2.5 font-bold flex items-center gap-2 terminal-text text-sm transition-all hover:opacity-80"
                  style={{ background:'rgba(0,219,231,0.1)', borderColor:'rgba(0,219,231,0.3)', color:'#e1fdff' }}>
                  <span className="material-symbols-outlined text-[20px]">download</span> EXPORT_DATA
                </button>
                <button className="border rounded-lg px-5 py-2.5 font-bold flex items-center gap-2 terminal-text text-sm transition-all hover:opacity-80"
                  style={{ background:'rgba(32,31,32,0.4)', borderColor:'rgba(255,255,255,0.08)', color:'#e5e2e3' }}>
                  <span className="material-symbols-outlined text-[20px]">refresh</span> REFRESH
                </button>
              </div>
            </header>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label:'AVG_BURNOUT_SCORE', val:'54.2%', valColor:'#D2FF00' },
                { label:'HIGH_RISK_DEPARTMENTS', val:'2', valColor:'#ffb4ab', anim:'animate-pulse' },
                { label:'CHECK_IN_RATE', val:'76.4%', valColor:'#00dbe7' },
                { label:'TOTAL_DEPARTMENTS', val:'6', valColor:'#e1fdff' },
              ].map((kpi, i) => (
                <div key={i} className="rounded-2xl p-6 flex flex-col gap-2 border transition-all hover:border-[rgba(0,219,231,0.4)]"
                  style={{ background:'rgba(10,10,11,0.4)', backdropFilter:'blur(40px)', borderColor:'rgba(0,242,255,0.15)' }}>
                  <span className="text-[10px] terminal-text tracking-widest uppercase" style={{ color:'#b9cacb' }}>{kpi.label}</span>
                  <div className="flex items-baseline gap-2">
                    <span className={`font-semibold terminal-text ${kpi.anim || ''}`} style={{ fontSize:32, color:kpi.valColor }}>{kpi.val}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Department Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {MOCK_DEPARTMENTS.map((dept, i) => {
              const risk = RISK_MAP[dept.riskLevel];
              return (
                <div key={i} className="rounded-3xl p-8 flex flex-col gap-6 border transition-all hover:border-[rgba(0,219,231,0.4)]"
                  style={{ background:'rgba(10,10,11,0.4)', backdropFilter:'blur(40px)', borderColor:'rgba(0,242,255,0.15)' }}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-xl mb-1" style={{ fontFamily:'Space Grotesk', color:'#e1fdff' }}>{dept.name}</h3>
                      <span className="text-[10px] terminal-text" style={{ color:'#b9cacb' }}>{dept.students.toLocaleString()}_NODES</span>
                    </div>
                    <span className="px-2 py-0.5 rounded border font-bold tracking-widest text-[9px] terminal-text"
                      style={{ background:`${risk.color}1A`, color:risk.color, borderColor:`${risk.color}33` }}>{risk.label}</span>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] terminal-text uppercase" style={{ color:'#b9cacb' }}>
                        <span>AVG_BURNOUT</span>
                        <span style={{ color: getBarColor(dept.avgBurnout) }}>{dept.avgBurnout}%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-[rgba(53,52,54,1)] overflow-hidden">
                        <div className="h-full chart-bar rounded-full" style={{ width:`${dept.avgBurnout}%`, background: getBarColor(dept.avgBurnout) }} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] terminal-text uppercase" style={{ color:'#b9cacb' }}>
                        <span>CHECK_IN_RATE</span>
                        <span style={{ color:'#00dbe7' }}>{dept.checkInRate}%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-[rgba(53,52,54,1)] overflow-hidden">
                        <div className="h-full chart-bar rounded-full" style={{ width:`${dept.checkInRate}%`, background:'#00dbe7' }} />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {dept.stressors.map(s => (
                      <span key={s} className="px-2 py-0.5 rounded border text-[8px] terminal-text font-bold"
                        style={{ color:'#b9cacb', borderColor:'rgba(255,255,255,0.1)' }}>[ {s} ]</span>
                    ))}
                  </div>

                  <button className="mt-auto w-full py-3 border rounded-xl text-[10px] terminal-text font-bold uppercase underline underline-offset-4 transition-all hover:text-[#D2FF00]"
                    style={{ borderColor:'rgba(255,255,255,0.08)', color:'#e1fdff' }}>DEEP_DIVE</button>
                </div>
              );
            })}
          </div>

          {/* Section 3: Trend Analysis */}
          <div className="sticky rounded-3xl p-6 md:p-8 mb-24 border shadow-[0_-15px_40px_rgba(0,0,0,0.8)]"
            style={{ top:112, zIndex:20, background:'rgba(10,10,11,0.95)', backdropFilter:'blur(32px)', borderColor:'rgba(255,255,255,0.08)' }}>
            <section className="rounded-3xl p-8 relative overflow-hidden border transition-all hover:border-[rgba(0,219,231,0.4)]"
              style={{ background:'rgba(10,10,11,0.4)', backdropFilter:'blur(40px)', borderColor:'rgba(0,242,255,0.15)' }}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                  <h3 className="font-semibold text-2xl" style={{ fontFamily:'Space Grotesk', color:'#e1fdff' }}>Trend Analysis</h3>
                  <p className="text-sm terminal-text tracking-tighter" style={{ color:'#b9cacb' }}>HISTORICAL_STRESS_FLOW v4.2</p>
                </div>
                <div className="flex flex-wrap gap-2 rounded-xl p-2 border" style={{ background:'rgba(14,14,15,0.8)', borderColor:'rgba(255,255,255,0.08)' }}>
                  {Object.keys(TRENDS).map((dept) => (
                    <button key={dept} onClick={() => setSelectedDept(dept)}
                      className="px-3 py-1.5 rounded-lg text-[9px] terminal-text font-bold transition-all"
                      style={{ background: selectedDept === dept ? 'rgba(0,219,231,0.1)' : 'transparent', color: selectedDept === dept ? '#e1fdff' : '#b9cacb' }}>
                      {dept.split(' ').map(w => w[0]).join('')} {/* Abbreviated name for pill buttons */}
                    </button>
                  ))}
                  <select 
                    value={selectedDept} 
                    onChange={(e) => setSelectedDept(e.target.value)}
                    className="bg-transparent border-none outline-none terminal-text text-[10px] ml-2 px-2 cursor-pointer"
                    style={{ color:'#e1fdff' }}>
                    {Object.keys(TRENDS).map(d => <option key={d} value={d} className="bg-[#131314]">{d}</option>)}
                  </select>
                </div>
              </div>
              <div className="w-full h-72 relative flex items-end justify-between border-b px-6 pb-4" style={{ borderColor:'rgba(255,255,255,0.08)' }}>
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  {[0,1,2,3,4].map(i => <div key={i} className="border-t w-full" style={{ borderColor:'rgba(255,255,255,0.05)' }} />)}
                </div>
                {TRENDS[selectedDept].map((val, i) => (
                  <div key={i} className="w-[10%] rounded-t border-x border-t chart-bar relative"
                    style={{
                      height:`${val}%`,
                      animationDelay:`${(i+1)*0.1}s`,
                      background: val > 55 ? 'linear-gradient(to top,rgba(255,180,171,0.1),rgba(255,180,171,0.7))' : 'linear-gradient(to top,rgba(210,255,0,0.1),rgba(210,255,0,0.6))',
                      borderColor: val > 55 ? 'rgba(255,180,171,0.2)' : 'rgba(210,255,0,0.2)',
                    }} />
                ))}
              </div>
              <div className="flex justify-between px-6 mt-4 terminal-text text-[10px] font-bold" style={{ color:'#b9cacb' }}>
                {['MON','TUE','WED','THU','FRI','SAT','SUN'].map(d => <span key={d}>{d}</span>)}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
