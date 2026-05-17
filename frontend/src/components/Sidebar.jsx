import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NAV_STUDENT = [
  { icon: 'grid_view',           label: 'Dashboard',  to: '/dashboard' },
  { icon: 'calendar_today',      label: 'CalmCal',    to: '/calmcal' },
  { icon: 'auto_stories',        label: 'Resources',  to: '/resources' },
  { icon: 'group',               label: 'Community',  to: '/community' },
];

const NAV_COUNSELOR = [
  { icon: 'monitor_heart', label: 'WellPulse',   to: '/wellpulse' },
  { icon: 'notifications_active', label: 'Alerts', to: '/alerts' },
  { icon: 'analytics',    label: 'Departments', to: '/departments' },
];

export default function Sidebar({ active }) {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const nav = role === 'counselor' ? NAV_COUNSELOR : NAV_STUDENT;

  const handleLogout = async () => { await logout(); navigate('/'); };

  return (
    <>
      <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 sidebar-integrated z-[60] pt-24 pb-8">
        {/* Brand */}
        <Link to="/" className="px-6 mb-8 flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(210,255,0,0.4)]"
               style={{ background: '#D2FF00' }}>
            <span className="material-symbols-outlined text-black" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight" style={{ color: '#D2FF00', fontFamily: 'Space Grotesk' }}>
              MindFlow
            </h1>
            <p className="text-[10px] terminal-text opacity-70" style={{ color: '#b9cacb' }}>
              {role === 'counselor' ? 'ADMIN CONSOLE' : 'ZEN MODE ACTIVATED'}
            </p>
          </div>
        </Link>

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
              className="text-[#b9cacb] flex items-center gap-4 py-3 hover:text-[#e1fdff] transition-colors text-xs w-full" style={{ background: 'none', border: 'none', textAlign: 'left' }}>
              <span className="material-symbols-outlined text-sm">logout</span>
              <span className="terminal-text font-semibold">Sign Out</span>
            </button>
            <Link to="/support" className={`flex items-center gap-4 py-3 hover:text-[#e1fdff] transition-colors text-xs ${active === 'support' ? 'text-[#D2FF00]' : 'text-[#b9cacb]'}`}>
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: active === 'support' ? "'FILL' 1" : "'FILL' 0" }}>help_outline</span>
              <span className="terminal-text font-semibold">Support</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-[60] bg-black/90 backdrop-blur-xl border-t border-white/10 md:hidden flex justify-around items-center py-2 px-3 safe-bottom shadow-[0_-5px_20px_rgba(0,0,0,0.8)]">
        {nav.map(({ icon, label, to }) => {
          const isActive = active === label.toLowerCase() || active === to;
          return (
            <Link key={'mob_' + label} to={to} className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-xl transition-all ${isActive ? 'text-[#D2FF00]' : 'text-[#b9cacb] hover:text-[#e1fdff]'}`}>
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>{icon}</span>
              <span className="text-[9px] uppercase tracking-wider font-semibold terminal-text">{label}</span>
            </Link>
          );
        })}
        <Link to="/support" className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-xl transition-all ${active === 'support' ? 'text-[#D2FF00]' : 'text-[#b9cacb] hover:text-[#e1fdff]'}`}>
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: active === 'support' ? "'FILL' 1" : "'FILL' 0" }}>help_outline</span>
          <span className="text-[9px] uppercase tracking-wider font-semibold terminal-text">Support</span>
        </Link>
      </div>
    </>
  );
}
