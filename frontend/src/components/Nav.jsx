import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {
  Brain, LayoutDashboard, CalendarDays, BarChart3,
  LogOut, Menu, X, Sparkles, ShieldCheck
} from 'lucide-react';
import Magnetic from './Magnetic';

const studentLinks = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/checkin', icon: Sparkles, label: 'Check-In' },
  { to: '/calmcal', icon: CalendarDays, label: 'CalmCal' },
];

const counselorLinks = [
  { to: '/wellpulse', icon: BarChart3, label: 'WellPulse' },
  { to: '/dashboard', icon: ShieldCheck, label: 'Overview' },
];

export default function Nav() {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = role === 'counselor' ? counselorLinks : studentLinks;

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          padding: '0 24px',
          background: scrolled ? 'rgba(3,3,5,0.85)' : 'rgba(3,3,5,0.4)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
          {/* Logo */}
          <NavLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36,
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-lime))',
              borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: 'var(--glow-cyan)',
            }}>
              <Brain size={20} color="white" />
            </div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: 'white' }}>
              MindFlow
            </span>
          </NavLink>

          {/* Desktop Links */}
          {user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="desktop-nav">
              {links.map(({ to, icon: Icon, label }) => (
                <Magnetic key={to}>
                  <NavLink
                    to={to}
                    className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                    style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                  >
                    <Icon size={15} />
                    {label}
                  </NavLink>
                </Magnetic>
              ))}
            </div>
          )}

          {/* Right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {user ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-lime))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 700, color: '#001e20',
                  }}>
                    {user.displayName?.[0] || 'U'}
                  </div>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', display: 'none' }} className="name-label">
                    {user.displayName?.split(' ')[0]}
                  </span>
                </div>
                <Magnetic>
                  <button
                    onClick={handleLogout}
                    className="btn-ghost"
                    style={{ padding: '8px 16px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}
                  >
                    <LogOut size={14} />
                    Sign out
                  </button>
                </Magnetic>
              </>
            ) : (
              <Magnetic>
                <NavLink to="/auth">
                  <button className="btn-primary" style={{ padding: '9px 22px', fontSize: 13 }}>
                    Get Started
                  </button>
                </NavLink>
              </Magnetic>
            )}

            {/* Mobile menu button */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                background: 'none', border: 'none', color: 'white',
                cursor: 'pointer', padding: 4,
              }}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && user && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed', top: 68, left: 0, right: 0, zIndex: 99,
              background: 'rgba(8,11,20,0.98)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              padding: '16px 24px 24px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {links.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px' }}
                >
                  <Icon size={16} />
                  {label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
