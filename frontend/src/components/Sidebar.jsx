import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NAV_STUDENT = [
  { icon: 'grid_view',           label: 'Dashboard',  to: '/dashboard' },
  { icon: 'radio_button_checked',label: 'MoodMap',    to: '/checkin' },
  { icon: 'calendar_today',      label: 'CalmCal',    to: '/calmcal' },
  { icon: 'auto_stories',        label: 'Resources',  to: '#' },
  { icon: 'group',               label: 'Community',  to: '#' },
];

const NAV_COUNSELOR = [
  { icon: 'grid_view',  label: 'DASHBOARD', to: '/wellpulse' },
  { icon: 'analytics',  label: 'MOODMAP',   to: '#' },
  { icon: 'insights',   label: 'CALMCAL',   to: '/calmcal' },
  { icon: 'database',   label: 'RESOURCES', to: '#' },
];

export default function Sidebar({ active }) {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const nav = role === 'counselor' ? NAV_COUNSELOR : NAV_STUDENT;

  const handleLogout = async () => { await logout(); navigate('/'); };

  return (
    <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 sidebar-integrated z-[60] pt-24 pb-8">
      {/* Brand */}
      <div className="px-6 mb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(210,255,0,0.4)]"
             style={{ background: '#D2FF00' }}>
          <span className="material-symbols-outlined text-black" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
        </div>
        <div>
          <h1 className="font-bold text-xl tracking-tight" style={{ color: '#D2FF00', fontFamily: 'Space Grotesk' }}>
            {role === 'counselor' ? 'WellPulse' : 'MindFlow'}
          </h1>
          <p className="text-[10px] terminal-text opacity-70" style={{ color: '#b9cacb' }}>
            {role === 'counselor' ? 'ANALYTICS ENGINE' : 'ZEN MODE ACTIVATED'}
          </p>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 space-y-1">
        {nav.map(({ icon, label, to }) => {
          const isActive = active === label.toLowerCase() || active === to;
          return (
            <Link key={to + label} to={to}
              className={`flex items-center gap-4 px-6 py-4 transition-all ${
                isActive
                  ? 'border-r-2 border-[#D2FF00] text-[#e1fdff]'
                  : 'text-[#b9cacb] hover:text-[#e1fdff]'
              }`}
              style={{ background: isActive ? 'rgba(225,253,255,0.08)' : 'transparent' }}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>{icon}</span>
              <span className="terminal-text text-xs font-semibold tracking-wider">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="mt-auto px-6 space-y-4">
        {role !== 'counselor' && (
          <Link to="/checkin"
            className="w-full py-3 px-4 rounded-xl font-bold text-xs tracking-widest flex items-center justify-center transition-all"
            style={{ background: '#D2FF00', color: '#0e0e0f', boxShadow: '0 0 20px rgba(210,255,0,0.3)' }}>
            CHECK-IN
          </Link>
        )}
        <div className="space-y-1">
          <button onClick={handleLogout}
            className="text-[#b9cacb] flex items-center gap-4 py-3 hover:text-[#e1fdff] transition-colors text-xs w-full">
            <span className="material-symbols-outlined text-sm">logout</span>
            <span className="terminal-text font-semibold">Sign Out</span>
          </button>
          <Link to="#" className="text-[#b9cacb] flex items-center gap-4 py-3 hover:text-[#e1fdff] transition-colors text-xs">
            <span className="material-symbols-outlined text-sm">help_outline</span>
            <span className="terminal-text font-semibold">Support</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
