import { useEffect } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

const today = new Date();
const shiftDate = (date, numDays) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
};

const heatmapData = Array.from({ length: 100 }).map((_, i) => {
  const date = shiftDate(today, -i);
  const isRecovery = Math.random() > 0.85;
  const count = isRecovery ? 0 : Math.floor(Math.random() * 4);
  return { date, count, isRecovery };
});
export default function CalmCal() {
  useEffect(() => {
    // Momentum Parallax Effect
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      
      // Background Stars Parallax
      const stars1 = document.getElementById('stars-p1');
      const stars2 = document.getElementById('stars-p2');
      if (stars1) stars1.style.transform = `translateY(${scrolled * 0.15}px)`;
      if (stars2) stars2.style.transform = `translateY(${scrolled * 0.08}px)`;

      // UI Elements Parallax
      const parallaxElements = document.querySelectorAll('[data-parallax]');
      parallaxElements.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-parallax')) || 0.02;
        const yPos = -(scrolled * speed);
        el.style.transform = `translateY(${yPos}px)`;
      });
    };

    document.addEventListener('scroll', handleScroll, { passive: true });
    window.dispatchEvent(new Event('scroll'));

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-surface-container-lowest text-on-surface font-body-md overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container relative">
      <style dangerouslySetInnerHTML={{ __html: `
        .glass-card {
            background: rgba(14, 14, 15, 0.65);
            backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .neon-border-cyan {
            border: 1px solid #00dbe7;
            box-shadow: 0 0 10px rgba(0, 219, 231, 0.3);
        }
        .thermal-bg {
            background: linear-gradient(135deg, rgba(0, 219, 231, 0.05) 0%, rgba(210, 255, 0, 0.05) 50%, rgba(255, 180, 171, 0.1) 100%);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .heatmap-high { background: rgba(255, 180, 171, 0.2); box-shadow: 0 0 25px rgba(255, 180, 171, 0.15); border: 1px solid rgba(255, 180, 171, 0.4) !important; }
        .heatmap-med { background: rgba(210, 255, 0, 0.1); border: 1px solid rgba(210, 255, 0, 0.2) !important; }
        .heatmap-low { background: rgba(0, 219, 231, 0.08); border: 1px solid rgba(0, 219, 231, 0.2) !important; }
        
        .recovery-alert-glow {
            animation: recovery-pulse 3s infinite ease-in-out;
            background: rgba(0, 219, 231, 0.05);
            border: 2px solid rgba(0, 219, 231, 0.5);
        }
        @keyframes recovery-pulse {
            0% { box-shadow: 0 0 0 0 rgba(0, 219, 231, 0.4); border-color: rgba(0, 219, 231, 0.4); }
            50% { box-shadow: 0 0 30px 10px rgba(0, 219, 231, 0.1); border-color: rgba(0, 219, 231, 0.8); }
            100% { box-shadow: 0 0 0 0 rgba(0, 219, 231, 0.4); border-color: rgba(0, 219, 231, 0.4); }
        }

        @keyframes sync-pulse {
            0% { box-shadow: 0 0 0 0 rgba(0, 242, 255, 0.4); }
            70% { box-shadow: 0 0 0 10px rgba(0, 242, 255, 0); }
            100% { box-shadow: 0 0 0 0 rgba(0, 242, 255, 0); }
        }
        .sync-protocol {
            animation: sync-pulse 2s infinite;
        }

        .obsidian-grid {
            background-image: 
                radial-gradient(circle at 50% 50%, rgba(0, 219, 231, 0.03) 0%, transparent 50%),
                linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
            background-size: 100% 100%, 40px 40px, 40px 40px;
            background-attachment: fixed;
        }

        .timeline-drawer {
            transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s ease;
        }
        .timeline-item:hover .timeline-drawer {
            transform: translateX(10px);
        }

        .smart-break-card {
            transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.3s ease;
        }
        .smart-break-card:hover {
            transform: scale(1.03) translateY(-4px);
            background: rgba(255, 255, 255, 0.07);
        }

        /* Cinematic Space Background Styles */
        #space-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -2;
            background: radial-gradient(circle at 50% 50%, #0c141d 0%, #080808 100%);
            overflow: hidden;
        }

        .star-layer {
            position: absolute;
            top: -10%;
            left: -10%;
            width: 120%;
            height: 120%;
            will-change: transform;
        }

        .stars-small {
            background-image: radial-gradient(1px 1px at 20px 30px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1px 1px at 40px 70px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1px 1px at 50px 160px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1px 1px at 80px 120px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1px 1px at 110px 20px, #ffffff, rgba(0,0,0,0));
            background-size: 200px 200px;
            opacity: 0.5;
        }

        .stars-large {
            background-image: radial-gradient(2px 2px at 100px 100px, #e1fdff, rgba(0,0,0,0)),
                              radial-gradient(2px 2px at 300px 200px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1.5px 1.5px at 400px 400px, #D2FF00, rgba(0,0,0,0));
            background-size: 600px 600px;
            opacity: 0.3;
        }

        .nebula {
            position: absolute;
            width: 100%;
            height: 100%;
            filter: blur(100px);
            opacity: 0.08;
            will-change: transform;
        }

        .nebula-cyan {
            background: radial-gradient(circle at 20% 30%, #00f2ff 0%, transparent 50%);
            animation: nebula-drift 40s infinite ease-in-out alternate;
        }

        .nebula-lime {
            background: radial-gradient(circle at 80% 70%, #ccff00 0%, transparent 50%);
            animation: nebula-drift 50s infinite ease-in-out alternate-reverse;
        }

        @keyframes nebula-drift {
            0% { transform: scale(1) translate(0, 0); }
            100% { transform: scale(1.1) translate(2%, 2%); }
        }

        /* Parallax utility */
        .parallax-target {
            will-change: transform;
        }
        @keyframes scan {
            from { top: -100%; }
            to { top: 100%; }
        }

        .react-calendar-heatmap .color-empty { fill: rgba(255, 255, 255, 0.05); }
        .react-calendar-heatmap .color-scale-1 { fill: rgba(0, 219, 231, 0.4); }
        .react-calendar-heatmap .color-scale-2 { fill: rgba(210, 255, 0, 0.6); }
        .react-calendar-heatmap .color-scale-3 { fill: rgba(255, 180, 171, 0.9); }
        .react-calendar-heatmap .color-recovery { fill: rgba(0, 242, 255, 0.9); stroke: #000; stroke-width: 1px; }
        .react-calendar-heatmap text { fill: rgba(255, 255, 255, 0.4); font-size: 8px; }
      `}} />

      <div aria-hidden="true" id="space-container">
        <div className="nebula nebula-cyan"></div>
        <div className="nebula nebula-lime"></div>
        <div className="star-layer stars-small" id="stars-p1"></div>
        <div className="star-layer stars-large" id="stars-p2"></div>
      </div>

      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-gutter py-4 bg-glass-fill backdrop-blur-xl border-b border-glass-border shadow-[0_0_15px_rgba(0,219,231,0.1)]">
        <div className="flex items-center gap-base">
          <span className="material-symbols-outlined text-electric-lime" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
          <span className="text-headline-md font-headline-md font-bold tracking-tight text-primary">MindFlow</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-label-caps text-label-caps" href="#">Dashboard</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-label-caps text-label-caps" href="#">MoodMap</a>
          <a className="text-primary border-b-2 border-electric-lime transition-colors duration-300 font-label-caps text-label-caps py-1" href="#">CalmCal</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-label-caps text-label-caps" href="#">Resources</a>
        </div>
        <div className="flex items-center gap-6">
          <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-all">notifications</span>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-glass-border">
            <img alt="Student profile avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVCN7EV21fiXTChDhL9kqEcg7llH98zrThu5bmN3avZwrWmKhh6ijWANRaMHXj1xxWonvC0Wyz8C-SqGh-3HNxrrvWfQH53wu89bS-AmBvxIQqENEiiVVqMfyXqjg5vYICY9dSKDhVScVZwgHAU0C0F2Pf3Na3nQCi-AeqWWtml7XJePtmV3FHKeRbRepj2HnoNDD8mpQAdIcl6JzBsU68WVbJQ5EhAmJQ64liIVJMD8cs7GHlSVQ1Fw51U9hdpiMI9CDdFoCIZTPF" />
          </div>
        </div>
      </nav>

      {/* SideNavBar */}
      <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 pt-24 pb-8 bg-surface-container-low/80 backdrop-blur-2xl border-r border-glass-border shadow-2xl z-40">
        <div className="px-6 mb-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-electric-lime animate-pulse"></span>
            <span className="text-label-caps font-label-caps text-on-surface-variant">Zen Mode Active</span>
          </div>
          <h3 className="text-headline-md font-headline-md text-electric-lime">MindFlow</h3>
        </div>
        <nav className="flex-1 space-y-2">
          <a className="text-on-surface-variant flex items-center gap-4 px-6 py-4 hover:bg-glass-fill hover:text-primary transition-all" href="#">
            <span className="material-symbols-outlined">grid_view</span>
            <span className="text-label-caps font-label-caps">Dashboard</span>
          </a>
          <a className="text-on-surface-variant flex items-center gap-4 px-6 py-4 hover:bg-glass-fill hover:text-primary transition-all" href="#">
            <span className="material-symbols-outlined">radio_button_checked</span>
            <span className="text-label-caps font-label-caps">MoodMap</span>
          </a>
          <a className="bg-primary-container/20 text-primary border-r-4 border-electric-lime flex items-center gap-4 px-6 py-4 transition-all" href="#">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_today</span>
            <span className="text-label-caps font-label-caps">CalmCal</span>
          </a>
          <a className="text-on-surface-variant flex items-center gap-4 px-6 py-4 hover:bg-glass-fill hover:text-primary transition-all" href="#">
            <span className="material-symbols-outlined">auto_stories</span>
            <span className="text-label-caps font-label-caps">Resources</span>
          </a>
          <a className="text-on-surface-variant flex items-center gap-4 px-6 py-4 hover:bg-glass-fill hover:text-primary transition-all" href="#">
            <span className="material-symbols-outlined">group</span>
            <span className="text-label-caps font-label-caps">Community</span>
          </a>
        </nav>
        <div className="px-6 mb-8">
          <button className="w-full py-4 rounded-xl bg-electric-lime text-surface-container-lowest font-bold text-label-caps tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(210,255,0,0.3)]">
            Quick Check-in
          </button>
        </div>
        <div className="border-t border-glass-border pt-4">
          <a className="text-on-surface-variant flex items-center gap-4 px-6 py-3 hover:text-primary transition-all" href="#">
            <span className="material-symbols-outlined">settings</span>
            <span className="text-label-caps font-label-caps">Settings</span>
          </a>
          <a className="text-on-surface-variant flex items-center gap-4 px-6 py-3 hover:text-primary transition-all" href="#">
            <span className="material-symbols-outlined">help_outline</span>
            <span className="text-label-caps font-label-caps">Support</span>
          </a>
        </div>
      </aside>

      {/* Main Canvas */}
      <main className="md:pl-64 pt-24 min-h-screen obsidian-grid">
        <div className="px-gutter py-8 max-w-container-max mx-auto relative z-10">
          {/* Header Section */}
          <header className="flex flex-col md:flex-row justify-between items-end gap-6 pb-12 sticky top-24 z-0 parallax-target bg-surface-container-lowest/40 backdrop-blur-sm -mx-8 px-8 pt-4 -mt-4" id="header-parallax">
            <div className="space-y-2">
              <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg text-primary">CalmCal</h1>
              <p className="text-body-lg text-on-surface-variant max-w-xl">Your schedule, harmonized with your mental state. Predictive burnout mapping powered by the Neural Engine for the week of October 14th.</p>
            </div>
            <div className="flex items-center gap-4 bg-glass-fill p-2 rounded-full border border-glass-border">
              <button className="px-6 py-2 rounded-full bg-primary-container text-on-primary-container font-bold text-label-caps">Weekly</button>
              <button className="px-6 py-2 rounded-full text-on-surface-variant font-bold text-label-caps hover:text-primary">Monthly</button>
            </div>
          </header>

          {/* Bento Grid Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
            {/* Calendar Heatmap Grid (8 columns) */}
            <div className="lg:col-span-8 space-y-8">
              {/* Thermal Map Grid */}
              <div className="glass-card rounded-3xl p-8 overflow-hidden relative sticky top-32 z-10 parallax-target shadow-2xl" id="heatmap-parallax">
                <div className="absolute inset-0 thermal-bg opacity-30 pointer-events-none"></div>
                  <div className="w-full relative z-10" style={{ overflowX: 'auto', paddingBottom: 16 }}>
                    <CalendarHeatmap
                      startDate={shiftDate(today, -100)}
                      endDate={today}
                      values={heatmapData}
                      classForValue={(value) => {
                        if (!value) return 'color-empty';
                        if (value.isRecovery) return 'color-recovery';
                        return `color-scale-${value.count}`;
                      }}
                      showWeekdayLabels={true}
                    />
                  </div>

                {/* Recovery Injection Section */}
                <div className="recovery-alert-glow rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 mt-4 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-20">
                    <span className="material-symbols-outlined text-6xl text-primary animate-pulse">emergency_share</span>
                  </div>
                  <div className="flex items-center gap-6 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30">
                      <span className="material-symbols-outlined text-primary text-4xl">energy_savings_leaf</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded bg-primary text-on-primary text-[10px] font-bold uppercase tracking-widest">Priority</span>
                        <h4 className="text-headline-md font-headline-md text-primary">Recovery Injection</h4>
                      </div>
                      <p className="text-body-md text-on-surface-variant">AI suggests a 45-min deep focus break after the Exam period.</p>
                    </div>
                  </div>
                  <button className="relative z-10 px-8 py-3 rounded-full bg-primary text-on-primary font-bold text-label-caps hover:shadow-[0_0_20px_rgba(0,219,231,0.4)] transition-all">Schedule Now</button>
                </div>
              </div>

              {/* Daily View */}
              <div className="glass-card rounded-3xl p-8 sticky top-40 z-20 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <h3 className="text-headline-md font-headline-md">Daily Flow: Oct 16</h3>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary sync-protocol"></span>
                      <span className="text-[10px] font-bold text-primary tracking-widest uppercase">Sync Protocol</span>
                    </div>
                  </div>
                  <span className="px-4 py-1 rounded-full bg-error/10 text-error text-label-caps border border-error/30">Critical Load</span>
                </div>
                <div className="space-y-6 relative border-l-2 border-glass-border ml-4 pl-8">
                  {/* Timeline Item 1 */}
                  <div className="timeline-item relative group py-2">
                    <div className="absolute -left-[42px] top-4 w-5 h-5 rounded-full bg-surface-container-lowest border-2 border-primary group-hover:bg-primary transition-colors sync-protocol"></div>
                    <div className="timeline-drawer glass-card p-5 rounded-2xl border border-glass-border/40 hover:border-primary/50 transition-all">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-label-caps text-on-surface-variant mb-1">09:00 AM</p>
                          <h5 className="font-bold text-body-lg group-hover:text-primary transition-colors">Advanced Neuro-Algorithms Lecture</h5>
                          <p className="text-on-surface-variant text-body-md">High cognitive load detected. Prepare for complex conceptual mapping.</p>
                        </div>
                        <span className="px-3 py-1 rounded-lg bg-surface-container-high text-on-surface-variant text-[10px] font-bold">60 MIN</span>
                      </div>
                    </div>
                  </div>
                  {/* Timeline Item 2 */}
                  <div className="timeline-item relative group py-2">
                    <div className="absolute -left-[42px] top-4 w-5 h-5 rounded-full bg-error animate-pulse shadow-[0_0_10px_#ffb4ab]"></div>
                    <div className="timeline-drawer glass-card p-5 rounded-2xl border-2 border-error/20 bg-error/5 hover:bg-error/10 transition-all">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-label-caps text-error mb-1">11:30 AM</p>
                          <h5 className="font-bold text-body-lg text-error">Project Deadline: AI Ethics Beta</h5>
                          <p className="text-on-surface-variant text-body-md">Critical stress trigger. Heart rate variability likely to decrease.</p>
                        </div>
                        <span className="px-3 py-1 rounded-lg bg-error-container text-on-error-container text-[10px] font-bold uppercase">Due Now</span>
                      </div>
                    </div>
                  </div>
                  {/* Timeline Item 3 */}
                  <div className="timeline-item relative group py-2">
                    <div className="absolute -left-[42px] top-4 w-5 h-5 rounded-full bg-surface-container-lowest border-2 border-primary-container group-hover:bg-primary-container transition-colors sync-protocol" style={{ animationDelay: '1s' }}></div>
                    <div className="timeline-drawer glass-card p-5 rounded-2xl border border-primary-container/20 hover:border-primary-container transition-all">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-label-caps text-primary-container mb-1">02:00 PM</p>
                          <h5 className="font-bold text-body-lg text-primary-container">MindFlow Meditation</h5>
                          <p className="text-on-surface-variant text-body-md">Guided somatic release session to mitigate deadline fatigue.</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className="px-3 py-1 rounded-lg bg-primary-container/20 text-primary-container text-[10px] font-bold">30 MIN</span>
                          <span className="text-[10px] text-electric-lime font-bold uppercase italic">Recommended</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Panel (4 columns) */}
            <aside className="lg:col-span-4 space-y-8 relative">
              {/* Burnout Prediction */}
              <div className="glass-card rounded-3xl p-8 border-t-2 border-error/50 sticky top-32 z-10 parallax-target shadow-2xl" id="burnout-parallax">
                <div className="flex items-center gap-4 mb-6">
                  <span className="material-symbols-outlined text-error">warning</span>
                  <h3 className="text-headline-md font-headline-md">Weekly Burnout</h3>
                </div>
                <div className="relative h-48 flex items-center justify-center mb-6">
                  <svg className="w-40 h-40 transform -rotate-90">
                    <circle className="text-surface-container-high" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeWidth="8"></circle>
                    <circle className="text-error" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeDasharray="440" strokeDashoffset="110" strokeLinecap="round" strokeWidth="12"></circle>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-error">75%</span>
                    <span className="text-label-caps text-on-surface-variant">HIGH RISK</span>
                  </div>
                </div>
                <p className="text-body-md text-on-surface-variant text-center mb-6">Your workload spikes 42% on Wednesday. AI predicts a significant dip in cognitive performance by Friday evening.</p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-label-caps">
                    <span>Academic Load</span>
                    <span className="text-primary font-bold">Heavy</span>
                  </div>
                  <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary-container w-[85%] h-full"></div>
                  </div>
                  <div className="flex justify-between items-center text-label-caps">
                    <span>Sleep Reserve</span>
                    <span className="text-error font-bold">Low</span>
                  </div>
                  <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                    <div className="bg-error w-[30%] h-full"></div>
                  </div>
                </div>
              </div>

              {/* Smart Break Recommendations */}
              <div className="glass-card rounded-3xl p-8 border border-glass-border sticky top-40 z-20 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-headline-md font-headline-md">Smart Breaks</h3>
                  <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary">info</span>
                </div>
                <div className="space-y-4">
                  <div className="smart-break-card p-5 rounded-2xl bg-glass-fill border border-glass-border/30 cursor-pointer group">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
                        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>visibility</span>
                      </div>
                      <span className="font-bold text-body-lg text-primary group-hover:text-on-surface transition-colors">20-20-20 Rule</span>
                    </div>
                    <p className="text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Counteract digital eye strain. Look 20ft away for 20s every 20m.</p>
                  </div>
                  <div className="smart-break-card p-5 rounded-2xl bg-glass-fill border border-glass-border/30 cursor-pointer group">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-electric-lime/10 flex items-center justify-center border border-electric-lime/20 group-hover:bg-electric-lime group-hover:text-surface-container-lowest transition-all duration-300">
                        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>directions_walk</span>
                      </div>
                      <span className="font-bold text-body-lg text-electric-lime group-hover:text-on-surface transition-colors">Sunlight Reset</span>
                    </div>
                    <p className="text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">10-minute exposure at 1:00 PM to recalibrate circadian rhythm.</p>
                  </div>
                  <div className="smart-break-card p-5 rounded-2xl bg-glass-fill border border-glass-border/30 cursor-pointer group">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center border border-secondary/20 group-hover:bg-secondary group-hover:text-surface-container-lowest transition-all duration-300">
                        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>audio_file</span>
                      </div>
                      <span className="font-bold text-body-lg text-secondary group-hover:text-on-surface transition-colors">Pink Noise</span>
                    </div>
                    <p className="text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Ambient textures to stabilize focus during upcoming peak load.</p>
                  </div>
                </div>
              </div>

              {/* Insight Block */}
              <div className="glass-card rounded-3xl overflow-hidden relative group sticky top-48 z-30 parallax-target shadow-2xl" id="insight-parallax">
                <img alt="Meditation environment" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-1000" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-lTThcIHN2sAWMPexaJs8HfXkuvp8GCSbYTTpvyezMB53mgVVaFCR7VSSyVJS0jkUVV2BRRkORMnVnWk83oRcix2ow608nmiC4JBh8iXoTHfkYd3JQCkJ-JBifzRj_cr4skraa5QehR01gziZDsmAKumAlc8_IDeSYspjkndp2lic5S0fWQpjRhj81SmNPpwAWOg9sLQ_CFXfNUFUCJEeNtavKJnppc-i1fe74ob4i_rsbJJhbxISC2nCvQyywrkQXyma3nbrKVUW" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/40 to-transparent flex flex-col justify-end p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    <h4 className="font-bold text-primary text-label-caps">Weekly Insight</h4>
                  </div>
                  <p className="text-sm text-on-surface leading-relaxed">Users who take AI-recommended breaks report 28% higher evening energy levels and 15% better sleep quality.</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-gutter flex flex-col md:flex-row justify-between items-center gap-base border-t border-glass-border bg-surface-container-lowest relative z-10">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
          <span className="text-body-lg font-display-lg text-primary">MindFlow</span>
        </div>
        <div className="flex gap-8 mb-4 md:mb-0">
          <a className="text-label-caps font-label-caps text-on-surface-variant hover:text-electric-lime transition-opacity duration-200" href="#">Privacy</a>
          <a className="text-label-caps font-label-caps text-on-surface-variant hover:text-electric-lime transition-opacity duration-200" href="#">Ethics AI</a>
          <a className="text-label-caps font-label-caps text-on-surface-variant hover:text-electric-lime transition-opacity duration-200" href="#">Research</a>
          <a className="text-label-caps font-label-caps text-on-surface-variant hover:text-electric-lime transition-opacity duration-200" href="#">Contact</a>
        </div>
        <p className="text-label-caps font-label-caps text-on-surface-variant">© 2024 MindFlow Ecosystem. Elevate your consciousness.</p>
      </footer>

      {/* FAB */}
      <button className="md:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full bg-electric-lime text-surface-container-lowest shadow-[0_0_20px_rgba(210,255,0,0.4)] z-[100] flex items-center justify-center active:scale-95 transition-transform">
        <span className="material-symbols-outlined">add</span>
      </button>
    </div>
  );
}
