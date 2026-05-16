import { useState } from 'react';
import Sidebar from '../components/Sidebar';

const MOCK_ALERTS = [
  { id:'1', pseudonym:'NODE_A7F2', riskLevel:'critical', burnoutScore:87, triggeredAt:'2024-01-15 09:32' },
  { id:'2', pseudonym:'NODE_B3K9', riskLevel:'critical', burnoutScore:82, triggeredAt:'2024-01-15 08:14' },
  { id:'3', pseudonym:'NODE_C1M4', riskLevel:'high',     burnoutScore:71, triggeredAt:'2024-01-15 07:55' },
  { id:'4', pseudonym:'NODE_D9P2', riskLevel:'high',     burnoutScore:68, triggeredAt:'2024-01-14 22:10' },
  { id:'5', pseudonym:'NODE_E5R7', riskLevel:'high',     burnoutScore:63, triggeredAt:'2024-01-14 20:44' },
];

export default function Alerts() {
  const [acknowledged, setAcknowledged] = useState([]);

  const handleAcknowledge = (id) => {
    setAcknowledged(prev => [...prev, id]);
  };

  const handleAcknowledgeAll = () => {
    setAcknowledged(MOCK_ALERTS.map(a => a.id));
  };

  const criticalCount = MOCK_ALERTS.filter(a => a.riskLevel === 'critical').length;
  const highCount = MOCK_ALERTS.filter(a => a.riskLevel === 'high').length;
  const pendingCount = MOCK_ALERTS.length - acknowledged.length;

  const isAllCleared = acknowledged.length === MOCK_ALERTS.length;

  return (
    <div className="crt-overlay" style={{ background:'#000', color:'#e5e2e3', minHeight:'100vh', fontFamily:'Inter, sans-serif' }}>
      {/* Black Hole BG */}
      <div style={{ position:'fixed', inset:0, zIndex:-1, background:'#020202', overflow:'hidden' }}>
        <div className="accretion-disk-layer" />
        <div className="accretion-disk-inner-wp" />
        <div className="event-horizon" />
        <div className="gravitational-lensing-wp" style={{ zIndex:2 }} />
      </div>

      <Sidebar active="alerts" />

      {/* Top Nav */}
      <nav className="fixed top-0 left-0 md:left-64 right-0 z-50 flex justify-between items-center px-6 py-4 border-b"
        style={{ background:'rgba(19,19,20,0.6)', backdropFilter:'blur(24px)', borderColor:'rgba(255,255,255,0.08)' }}>
        <div className="flex items-center gap-2">
          <span className="font-bold tracking-tight" style={{ fontFamily:'Space Grotesk', fontSize:20, color:'#e1fdff' }}>MindFlow</span>
          <span className="hidden md:block text-[10px] terminal-text px-2 py-0.5 rounded border" style={{ color:'#b9cacb', background:'rgba(32,31,32,0.5)', borderColor:'rgba(255,255,255,0.08)' }}>SYS_ID: ALERTS_v4.2</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center rounded-lg px-4 py-1.5 gap-3 border" style={{ background:'rgba(14,14,15,0.8)', borderColor:'rgba(255,255,255,0.08)' }}>
            <span className="material-symbols-outlined text-[20px]" style={{ color:'#e1fdff' }}>search</span>
            <input className="bg-transparent border-none outline-none text-sm terminal-text w-48 placeholder:opacity-40" style={{ color:'#e5e2e3' }} placeholder="SEARCH_ALERTS..." />
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
        <div className="max-w-5xl mx-auto">
          {/* Section 1: Header + KPIs */}
          <div className="sticky rounded-3xl p-6 md:p-8 mb-12 border shadow-[0_-15px_40px_rgba(0,0,0,0.8)]"
            style={{ top:88, zIndex:10, background:'rgba(10,10,11,0.95)', backdropFilter:'blur(32px)', borderColor:'rgba(255,255,255,0.08)' }}>
            <header className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
              <div className="space-y-2">
                <h1 className="font-bold tracking-tight" style={{ fontFamily:'Space Grotesk', fontSize:'clamp(36px,5vw,64px)', color:'#e1fdff' }}>Alert Command</h1>
                <p className="text-lg font-light" style={{ color:'#b9cacb' }}>
                  Unacknowledged critical stress events. Sorted by severity.
                </p>
              </div>
              <div className="flex gap-3">
                <button className="border rounded-lg px-5 py-2.5 font-bold flex items-center gap-2 terminal-text text-sm transition-all hover:opacity-80"
                  style={{ background:'rgba(0,219,231,0.1)', borderColor:'rgba(0,219,231,0.3)', color:'#e1fdff' }}>
                  <span className="material-symbols-outlined text-[20px]">download</span> EXPORT_ALERTS
                </button>
                <button 
                  onClick={handleAcknowledgeAll}
                  className="border rounded-lg px-5 py-2.5 font-bold flex items-center gap-2 terminal-text text-sm transition-all hover:opacity-80"
                  style={{ background:'rgba(32,31,32,0.4)', borderColor:'rgba(255,255,255,0.08)', color:'#e5e2e3' }}>
                  <span className="material-symbols-outlined text-[20px]">done_all</span> MARK_ALL_READ
                </button>
              </div>
            </header>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label:'CRITICAL_EVENTS', val:criticalCount, valColor:'#ffb4ab' },
                { label:'HIGH_RISK_EVENTS', val:highCount, valColor:'#D2FF00' },
                { label:'PENDING_REVIEW',   val:pendingCount, valColor:'#00dbe7' },
              ].map((kpi, i) => (
                <div key={i} className="rounded-2xl p-6 flex flex-col gap-2 border transition-all hover:border-[rgba(0,219,231,0.4)]"
                  style={{ background:'rgba(10,10,11,0.4)', backdropFilter:'blur(40px)', borderColor:'rgba(0,242,255,0.15)' }}>
                  <span className="text-[10px] terminal-text tracking-widest uppercase" style={{ color:'#b9cacb' }}>{kpi.label}</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold terminal-text" style={{ fontSize:32, color:kpi.valColor }}>{kpi.val}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Alerts Feed */}
          <div className="space-y-4 mb-12">
            {MOCK_ALERTS.map((alert) => {
              const isAck = acknowledged.includes(alert.id);
              const riskColor = alert.riskLevel === 'critical' ? '#ffb4ab' : '#D2FF00';
              const riskLabel = alert.riskLevel === 'critical' ? 'CRITICAL' : 'HIGH_RISK';

              return (
                <div key={alert.id} 
                  className={`rounded-2xl p-6 border transition-all duration-500 ${isAck ? 'opacity-40' : ''}`}
                  style={{ 
                    background:'rgba(10,10,11,0.4)', 
                    backdropFilter:'blur(40px)', 
                    borderColor:'rgba(255,255,255,0.08)',
                    borderLeft: `4px solid ${riskColor}`
                  }}>
                  <div className="flex justify-between items-start">
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-lg" style={{ color:'#e1fdff' }}>{alert.pseudonym}</span>
                        <span className="px-2 py-0.5 rounded border font-bold tracking-widest text-[9px] terminal-text" 
                          style={{ background:`${riskColor}1A`, color:riskColor, borderColor:`${riskColor}33` }}>
                          {riskLabel}
                        </span>
                        {isAck && (
                          <span className="px-2 py-0.5 rounded border font-bold tracking-widest text-[9px] terminal-text" 
                            style={{ background:'rgba(0,219,231,0.1)', color:'#00dbe7', borderColor:'rgba(0,219,231,0.3)' }}>
                            RESOLVED
                          </span>
                        )}
                        <span className="text-xs terminal-text opacity-40 ml-auto" style={{ color:'#b9cacb' }}>{alert.triggeredAt}</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="terminal-text text-sm" style={{ color:'#b9cacb' }}>
                          BURNOUT_SCORE: <span style={{ color:riskColor }}>{alert.burnoutScore}</span>
                        </div>
                      </div>
                    </div>
                    {!isAck && (
                      <button 
                        onClick={() => handleAcknowledge(alert.id)}
                        className="terminal-text text-[10px] font-bold uppercase underline underline-offset-4 transition-colors hover:text-[#D2FF00]" 
                        style={{ color:'#e1fdff' }}>
                        ACKNOWLEDGE
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Section 3: Empty State */}
          {isAllCleared && (
            <div className="mt-24 flex flex-col items-center justify-center gap-4">
              <span className="material-symbols-outlined text-6xl animate-pulse" style={{ color:'#00dbe7' }}>verified_user</span>
              <p className="terminal-text animate-pulse" style={{ color:'#00dbe7', letterSpacing:'0.2em' }}>
                ALL_CLEAR — NO PENDING ALERTS
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
