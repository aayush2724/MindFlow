import { useEffect } from 'react';

export default function WellPulse() {
  return (
    <div className="bg-black text-on-surface font-body-md overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container relative">
      <style dangerouslySetInnerHTML={{ __html: `
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .glass-card {
            background: rgba(10, 10, 11, 0.4);
            backdrop-filter: blur(40px);
            border: 1px solid rgba(0, 242, 255, 0.15);
            box-shadow: 0 0 30px rgba(0, 242, 255, 0.05) inset, 0 8px 32px rgba(0, 0, 0, 0.5);
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .glass-card:hover {
            background: rgba(10, 10, 11, 0.6);
            border-color: rgba(0, 242, 255, 0.4);
            box-shadow: 0 0 40px rgba(0, 242, 255, 0.1) inset, 0 12px 40px rgba(0, 0, 0, 0.7);
            transform: translateY(-2px);
        }
        .neon-border-glow {
            box-shadow: 0 0 15px rgba(0, 219, 231, 0.3);
        }
        .terminal-text {
            font-family: 'JetBrains Mono', monospace;
            letter-spacing: -0.02em;
        }
        .critical-alert-glow {
            box-shadow: 0 0 20px rgba(255, 180, 171, 0.15), inset 0 0 10px rgba(255, 180, 171, 0.05);
            animation: pulse-border 2s infinite alternate;
        }
        @keyframes pulse-border {
            from { border-color: rgba(255, 180, 171, 0.2); }
            to { border-color: rgba(255, 180, 171, 0.6); }
        }
        .chart-bar {
            transform-origin: bottom;
            animation: bar-rise 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes bar-rise {
            from { transform: scaleY(0); opacity: 0; }
            to { transform: scaleY(1); opacity: 1; }
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
        }
        .mesh-viz {
            background-image: 
                radial-gradient(circle at 50% 50%, rgba(0, 219, 231, 0.05) 0%, transparent 70%),
                linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
            background-size: 100% 100%, 40px 40px, 40px 40px;
            perspective: 1000px;
        }
        .mesh-grid {
            transform: rotateX(60deg) translateY(-100px);
            background-image: 
                linear-gradient(rgba(0, 219, 231, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 219, 231, 0.1) 1px, transparent 1px);
            background-size: 40px 40px;
            mask-image: linear-gradient(to bottom, transparent, black);
            -webkit-mask-image: linear-gradient(to bottom, transparent, black);
        }
        
        .black-hole-container {
            position: fixed;
            inset: 0;
            z-index: -1;
            background: #020202;
            overflow: hidden;
            pointer-events: none;
        }
        .accretion-disk-layer {
            position: absolute;
            top: 50%; left: 50%;
            width: 250vw; height: 250vw;
            transform: translate(-50%, -50%) rotateX(75deg);
            background: radial-gradient(circle, transparent 10%, rgba(0, 242, 255, 0.8) 15%, rgba(0, 219, 231, 0.4) 25%, transparent 60%);
            filter: blur(40px);
            animation: spin-disk 40s linear infinite;
            opacity: 0.5;
        }
        .accretion-disk-inner {
            position: absolute;
            top: 50%; left: 50%;
            width: 150vw; height: 150vw;
            transform: translate(-50%, -50%) rotateX(75deg);
            background: radial-gradient(circle, transparent 12%, rgba(210, 255, 0, 0.6) 18%, rgba(0, 242, 255, 0.3) 30%, transparent 70%);
            filter: blur(20px);
            animation: spin-disk-reverse 30s linear infinite;
            opacity: 0.6;
        }
        .event-horizon {
            position: absolute;
            top: 50%; left: 50%;
            width: 60vh; height: 60vh;
            transform: translate(-50%, -50%);
            background: #000;
            border-radius: 50%;
            box-shadow: 0 0 120px 60px rgba(0, 242, 255, 0.2), inset 0 0 80px #000;
            z-index: 1;
            animation: pulse-horizon 8s ease-in-out infinite alternate;
        }
        .gravitational-lensing {
            position: absolute;
            top: 50%; left: 50%;
            width: 120vw; height: 120vh;
            transform: translate(-50%, -50%);
            background: radial-gradient(circle, transparent 20%, rgba(255, 255, 255, 0.03) 40%, transparent 80%);
            filter: blur(15px);
            z-index: 2;
        }
        @keyframes spin-disk {
            0% { transform: translate(-50%, -50%) rotateX(75deg) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotateX(75deg) rotate(360deg); }
        }
        @keyframes spin-disk-reverse {
            0% { transform: translate(-50%, -50%) rotateX(75deg) rotate(360deg); }
            100% { transform: translate(-50%, -50%) rotateX(75deg) rotate(0deg); }
        }
        @keyframes pulse-horizon {
            0% { box-shadow: 0 0 100px 50px rgba(0, 242, 255, 0.15), inset 0 0 80px #000; }
            100% { box-shadow: 0 0 140px 70px rgba(0, 242, 255, 0.25), inset 0 0 80px #000; }
        }
      `}} />

      <div className="black-hole-container" id="space-bg">
        <div className="accretion-disk-layer" id="accretion-disk-1"></div>
        <div className="accretion-disk-inner" id="accretion-disk-2"></div>
        <div className="event-horizon" id="event-horizon"></div>
        <div className="gravitational-lensing"></div>
      </div>

      <div className="fixed top-1/4 left-10 text-primary/20 terminal-text text-[8px] flex flex-col gap-1 z-10 opacity-40 pointer-events-none">
        <span>[ SINGULARITY_PROXIMITY_ALERT ]</span>
        <div className="h-px w-12 bg-primary/20"></div>
      </div>
      <div className="fixed bottom-1/3 right-12 text-electric-lime/20 terminal-text text-[8px] flex flex-col items-end gap-1 z-10 opacity-40 pointer-events-none">
        <div className="h-px w-16 bg-electric-lime/20"></div>
        <span>WARP_FIELD_STABLE</span>
      </div>

      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-gutter py-4 bg-background/60 backdrop-blur-2xl border-b border-glass-border">
        <div className="flex items-center gap-base">
          <span className="text-headline-md font-headline-md font-bold tracking-tight text-primary">MindFlow</span>
          <span className="hidden md:block text-[10px] terminal-text text-on-surface-variant bg-surface-container/50 px-2 py-0.5 rounded border border-glass-border">SYS_ID: WELLPULSE_v4.2</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center bg-surface-container-lowest/80 border border-glass-border rounded-lg px-4 py-1.5 gap-3">
            <span className="material-symbols-outlined text-primary text-[20px]">search</span>
            <input className="bg-transparent border-none focus:ring-0 text-body-md terminal-text text-on-surface placeholder:text-outline w-48 text-sm" placeholder="QUERY_COHORT..." type="text" />
          </div>
          <div className="flex items-center gap-4">
            <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">notifications</button>
            <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">terminal</button>
            <div className="w-10 h-10 rounded-full border border-primary/30 p-0.5">
              <img alt="User profile" className="w-full h-full object-cover rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXf1XwPjCpI9_y1XwAIu2rnr-0Zg1omM2AypRD3uJgDjCNu3kMRVsJP3ipDDj5jsuWSRZXvEsohJYqL_Aamb23gBgK0K7aVX6B7kBhWqhxEypKuD9KpoSvHvTNClx7RuoONVySWfoBYBhtKVqeZaYuXUTPjzohbEuLDZ9IUpc-EqW__PG5lJD-bzxVHWLboVzV0bGuNKK4TllDcJcQyANDeWniuzfO2U_OXyeIsOpbRkRYuNM3LJP62oD0jxV9Jt3wqFjGS4MHAKYH" />
            </div>
          </div>
        </div>
      </nav>

      {/* Side Navigation Bar */}
      <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 pt-24 pb-8 bg-[#0a0a0b]/40 backdrop-blur-3xl border-r border-glass-border z-40">
        <div className="px-6 mb-8">
          <h2 className="text-headline-md font-headline-md text-electric-lime">WellPulse</h2>
          <p className="text-[10px] terminal-text text-on-surface-variant mt-1 tracking-widest uppercase">ANALYTICS ENGINE</p>
        </div>
        <nav className="flex-1 space-y-1">
          <a className="bg-primary/10 text-primary border-r-2 border-primary flex items-center gap-4 px-6 py-3.5 transition-all" href="#">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>grid_view</span>
            <span className="text-label-caps font-label-caps">DASHBOARD</span>
          </a>
          <a className="text-on-surface-variant flex items-center gap-4 px-6 py-3.5 hover:bg-glass-fill hover:text-primary transition-all" href="#">
            <span className="material-symbols-outlined">analytics</span>
            <span className="text-label-caps font-label-caps">MOODMAP</span>
          </a>
          <a className="text-on-surface-variant flex items-center gap-4 px-6 py-3.5 hover:bg-glass-fill hover:text-primary transition-all" href="#">
            <span className="material-symbols-outlined">insights</span>
            <span className="text-label-caps font-label-caps">CALMCAL</span>
          </a>
          <a className="text-on-surface-variant flex items-center gap-4 px-6 py-3.5 hover:bg-glass-fill hover:text-primary transition-all" href="#">
            <span className="material-symbols-outlined">database</span>
            <span className="text-label-caps font-label-caps">RESOURCES</span>
          </a>
        </nav>
        <div className="px-6 space-y-4 pt-8 border-t border-glass-border/30">
          <a className="text-on-surface-variant flex items-center gap-4 hover:text-primary transition-colors text-sm" href="#">
            <span className="material-symbols-outlined text-[20px]">settings_input_component</span>
            <span className="text-label-caps">CONFIG</span>
          </a>
          <a className="text-on-surface-variant flex items-center gap-4 hover:text-primary transition-colors text-sm" href="#">
            <span className="material-symbols-outlined text-[20px]">help_center</span>
            <span className="text-label-caps">SUPPORT</span>
          </a>
        </div>
      </aside>

      <main className="pt-24 pb-12 px-gutter md:ml-64 relative z-20">
        <div className="max-w-container-max mx-auto space-y-12">
          
          {/* Header + KPIs */}
          <div className="bg-[#0a0a0b]/95 backdrop-blur-3xl rounded-3xl p-6 md:p-8 shadow-[0_-15px_40px_rgba(0,0,0,0.8)] border border-glass-border">
            <header className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
              <div className="space-y-2">
                <h1 className="text-display-lg font-display-lg text-primary tracking-tight">Institutional Pulse</h1>
                <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">Aggregate mental equilibrium telemetry. Monitoring <span className="terminal-text text-primary">14,200</span> active student nodes.</p>
              </div>
              <div className="flex gap-3">
                <button className="bg-primary/10 border border-primary/30 text-primary px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 hover:bg-primary/20 transition-all terminal-text text-sm">
                  <span className="material-symbols-outlined text-[20px]">download</span> EXPORT_DATA
                </button>
                <button className="bg-surface-container/40 backdrop-blur-md border border-glass-border text-on-surface px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 hover:bg-surface-container-high transition-all terminal-text text-sm">
                  <span className="material-symbols-outlined text-[20px]">filter_alt</span> FILTERS
                </button>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="glass-card p-6 rounded-2xl flex flex-col gap-2">
                <span className="text-[10px] terminal-text text-on-surface-variant uppercase tracking-widest">AVG_BURNOUT_METRIC</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-headline-md font-headline-md text-electric-lime terminal-text">42.8%</span>
                  <span className="text-xs terminal-text text-error flex items-center">
                    <span className="material-symbols-outlined text-[14px]">trending_up</span> +4.2
                  </span>
                </div>
                <div className="h-1 w-full bg-surface-container-highest rounded-full mt-4 overflow-hidden">
                  <div className="h-full bg-electric-lime chart-bar" style={{ width: '42%', animationDelay: '0.1s' }}></div>
                </div>
              </div>
              <div className="glass-card p-6 rounded-2xl flex flex-col gap-2">
                <span className="text-[10px] terminal-text text-on-surface-variant uppercase tracking-widest">HIGH_RISK_ALERTS</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-headline-md font-headline-md text-error terminal-text">128</span>
                </div>
                <span className="text-[10px] terminal-text text-error/80 mt-4 animate-pulse">CRITICAL_OVERFLOW</span>
              </div>
              <div className="glass-card p-6 rounded-2xl flex flex-col gap-2">
                <span className="text-[10px] terminal-text text-on-surface-variant uppercase tracking-widest">CALM_FLOW_SESSIONS</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-headline-md font-headline-md text-surface-tint terminal-text">3,492</span>
                  <span className="text-xs terminal-text text-surface-tint/60 flex items-center ml-1">
                    <span className="material-symbols-outlined text-[14px]">bolt</span> ACTIVE
                  </span>
                </div>
                <div className="flex -space-x-2 mt-4">
                  <div className="w-6 h-6 rounded-full border border-background bg-surface-container-high"></div>
                  <div className="w-6 h-6 rounded-full border border-background bg-surface-container-low"></div>
                  <div className="w-6 h-6 rounded-full border border-background bg-surface-variant"></div>
                  <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-[8px] terminal-text text-primary">+2k</div>
                </div>
              </div>
              <div className="glass-card p-6 rounded-2xl flex flex-col gap-2">
                <span className="text-[10px] terminal-text text-on-surface-variant uppercase tracking-widest">ENGAGEMENT_INDEX</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-headline-md font-headline-md text-primary terminal-text">88.5</span>
                </div>
                <span className="text-[10px] terminal-text text-primary/60 mt-4 uppercase">Optimal_State</span>
              </div>
            </div>
          </div>

          {/* Visualization Layer */}
          <div className="bg-[#0a0a0b]/95 backdrop-blur-3xl rounded-3xl p-6 md:p-8 shadow-[0_-15px_40px_rgba(0,0,0,0.8)] border border-glass-border">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <section className="lg:col-span-2 glass-card rounded-3xl overflow-hidden flex flex-col h-[500px]">
                <div className="p-8 flex justify-between items-center bg-gradient-to-b from-background/40 to-transparent">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded bg-secondary-container/20 border border-secondary-container/40 text-[9px] terminal-text text-secondary-fixed font-bold tracking-widest uppercase">Predictive_Mesh_Active</span>
                      <span className="px-2 py-0.5 rounded bg-primary/10 border border-primary/30 text-[9px] terminal-text text-primary font-bold tracking-widest uppercase">Sync_Protocol_Link</span>
                    </div>
                    <h3 className="text-headline-md font-headline-md text-primary tracking-tight">Topological Wellbeing Mesh</h3>
                    <p className="text-sm terminal-text text-on-surface-variant">Real-time geospatial stress distribution rendered via Predictive Mesh engine.</p>
                  </div>
                  <div className="flex bg-surface-container-lowest/80 backdrop-blur-md border border-glass-border rounded-lg p-1">
                    <button className="px-4 py-1.5 bg-primary/10 text-primary rounded text-[10px] terminal-text font-bold">MESH_3D</button>
                    <button className="px-4 py-1.5 text-on-surface-variant rounded text-[10px] terminal-text">FLAT_GRID</button>
                  </div>
                </div>
                <div className="flex-1 relative mesh-viz mx-8 mb-8 rounded-2xl overflow-hidden border border-glass-border">
                  <div className="absolute inset-0 mesh-grid"></div>
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[20%] left-[30%] w-64 h-64 bg-error/10 blur-[100px] rounded-full animate-pulse"></div>
                    <div className="absolute bottom-[30%] right-[20%] w-80 h-80 bg-primary/10 blur-[100px] rounded-full"></div>
                    
                    <div className="absolute top-[40%] left-[45%] flex flex-col items-center pointer-events-auto group cursor-crosshair">
                      <div className="w-2 h-2 bg-error rounded-full neon-border-glow shadow-[0_0_10px_#ffb4ab]"></div>
                      <div className="h-16 w-px bg-gradient-to-t from-error to-transparent"></div>
                      <div className="bg-background/90 backdrop-blur-md border border-error/50 p-2 rounded terminal-text text-[10px] opacity-0 group-hover:opacity-100 transition-all transform scale-95 group-hover:scale-100">
                        <div className="text-error font-bold mb-1">NODE: ENG_LOBBY</div>
                        <div className="text-white">STRESS: 0.88μ</div>
                        <div className="text-white/60">ALERTS: 12_ACTV</div>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-[35%] right-[35%] flex flex-col items-center pointer-events-auto group cursor-crosshair">
                      <div className="w-2 h-2 bg-electric-lime rounded-full neon-border-glow shadow-[0_0_10px_#D2FF00]"></div>
                      <div className="h-10 w-px bg-gradient-to-t from-electric-lime to-transparent"></div>
                      <div className="bg-background/90 backdrop-blur-md border border-electric-lime/50 p-2 rounded terminal-text text-[10px] opacity-0 group-hover:opacity-100 transition-all transform scale-95 group-hover:scale-100">
                        <div className="text-electric-lime font-bold mb-1">NODE: LIB_ZONE_C</div>
                        <div className="text-white">STRESS: 0.12μ</div>
                        <div className="text-white/60">STATUS: OPTIMAL</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Alerts */}
              <section className="glass-card rounded-3xl p-8 flex flex-col h-[500px]">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-[10px] terminal-text text-on-surface-variant tracking-widest uppercase">SYSLOG_ALERTS</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] terminal-text text-error">LIVE_STREAM</span>
                    <span className="flex h-2 w-2 rounded-full bg-error animate-ping"></span>
                  </div>
                </div>
                <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                  <div className="p-4 critical-alert-glow border border-error/30 rounded-xl bg-error/5">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] terminal-text font-bold text-error">CRITICAL_DETECTION</span>
                      <span className="text-[10px] terminal-text text-on-surface-variant">02:14:05</span>
                    </div>
                    <p className="text-xs terminal-text text-on-surface leading-relaxed">COHORT_CS_Y3: Burnout threshold exceeded [0.75] for 45/200 nodes.</p>
                    <button className="mt-4 w-full py-2 bg-error text-on-error rounded text-[10px] terminal-text font-bold uppercase hover:brightness-110 transition-all">DECODE_AND_INTERVENE</button>
                  </div>
                  <div className="p-4 bg-surface-container/50 border border-glass-border rounded-xl">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] terminal-text font-bold text-surface-tint">PATTERN_SYNC</span>
                      <span className="text-[10px] terminal-text text-on-surface-variant">01:55:20</span>
                    </div>
                    <p className="text-xs terminal-text text-on-surface/80">LATENIGHT_ANOMALY: High intensity activity detected in LAW_LIB cluster.</p>
                  </div>
                  <div className="p-4 bg-surface-container/50 border border-glass-border rounded-xl">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] terminal-text font-bold text-electric-lime">HEALTH_CHECK</span>
                      <span className="text-[10px] terminal-text text-on-surface-variant">00:10:45</span>
                    </div>
                    <p className="text-xs terminal-text text-on-surface/80">MED_SCHOOL: Positive trend. Calm_Sessions up 22% vs 24H_AVG.</p>
                  </div>
                </div>
                <button className="w-full mt-6 py-3 border border-glass-border rounded-xl text-[10px] terminal-text text-on-surface-variant hover:text-primary transition-colors hover:bg-glass-fill uppercase tracking-widest">QUERY_FULL_LOGS</button>
              </section>
            </div>
          </div>

          {/* Burnout Trends */}
          <div className="bg-[#0a0a0b]/95 backdrop-blur-3xl rounded-3xl p-6 md:p-8 shadow-[0_-15px_40px_rgba(0,0,0,0.8)] border border-glass-border">
            <section className="glass-card rounded-3xl p-8 relative group/chart overflow-hidden">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                  <h3 className="text-headline-md font-headline-md text-primary">Burnout Risk Trajectory</h3>
                  <p className="text-sm terminal-text text-on-surface-variant uppercase tracking-tighter">PREDICTIVE_DATA_STREAM v1.0.2</p>
                </div>
                <div className="flex bg-surface-container-lowest/80 backdrop-blur-md border border-glass-border rounded-full p-1">
                  <button className="px-5 py-1.5 rounded-full text-[10px] terminal-text font-bold text-on-surface-variant hover:text-primary transition-all">WEEKLY</button>
                  <button className="px-5 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] terminal-text font-bold">MONTHLY</button>
                </div>
              </div>
              
              {/* Manual Chart Implementation since HTML was truncated */}
              <div className="h-64 flex items-end gap-2 justify-between w-full mt-8 border-b border-glass-border pb-4 relative">
                {/* Y-axis lines */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                  <div className="h-[1px] w-full bg-white absolute top-0"></div>
                  <div className="h-[1px] w-full bg-white absolute top-1/4"></div>
                  <div className="h-[1px] w-full bg-white absolute top-2/4"></div>
                  <div className="h-[1px] w-full bg-white absolute top-3/4"></div>
                </div>
                
                {/* Bars */}
                <div className="w-full h-full flex items-end gap-4 justify-between pt-8 z-10">
                  {[20, 30, 45, 60, 85, 95, 70, 50, 40, 35].map((val, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-crosshair">
                      <div className="w-full relative chart-bar" style={{ height: `${val}%`, animationDelay: `${i * 0.05}s` }}>
                        <div className={`w-full h-full rounded-t-sm ${val > 80 ? 'bg-error shadow-[0_0_15px_#ffb4ab]' : val > 50 ? 'bg-electric-lime shadow-[0_0_15px_#D2FF00]' : 'bg-primary shadow-[0_0_15px_#00dbe7]'}`}></div>
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-black/80 px-2 py-1 rounded text-white text-[10px] terminal-text whitespace-nowrap transition-opacity pointer-events-none z-20">
                          {val}% RISK
                        </div>
                      </div>
                      <span className="text-[10px] terminal-text text-on-surface-variant opacity-50">{i + 1}W</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

        </div>
      </main>
    </div>
  );
}
