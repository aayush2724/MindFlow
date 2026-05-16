import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header({ title, subtext, searchPlaceholder = "SEARCH_NEURAL_NET..." }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  const menuItems = [
    { label: 'Account Settings', to: '/account-settings', icon: 'settings', state: { tab: 'profile' } },
  ];

  return (
    <header className="fixed top-0 left-0 md:left-64 right-0 z-50 flex justify-between items-center px-6 py-4 header-integrated border-b"
      style={{ background: 'rgba(14,14,15,0.8)', backdropFilter: 'blur(24px)', borderColor: 'rgba(255,255,255,0.08)' }}>
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <span className="font-bold tracking-tighter text-[#e1fdff]/80" style={{ fontFamily: 'Space Grotesk', fontSize: 20 }}>
            {title || 'SYSTEM_OS'}
          </span>
          {subtext && (
            <div className="flex items-center gap-2 mt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D2FF00] animate-pulse" />
              <span className="text-[9px] terminal-text font-bold tracking-widest" style={{ color: '#D2FF00' }}>
                {subtext}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center px-4 py-2 rounded-lg border" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
          <span className="material-symbols-outlined text-sm mr-2" style={{ color: '#b9cacb' }}>search</span>
          <input className="bg-transparent border-none outline-none text-xs w-48 placeholder:opacity-40" 
            style={{ color: '#e5e2e3' }} 
            placeholder={searchPlaceholder} 
          />
        </div>
        
        {/* Notifications */}
        <div className="relative">
          <motion.button 
            whileHover={{ scale: 1.2, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowNotifMenu(!showNotifMenu)}
            className="relative p-2"
          >
            <span className="material-symbols-outlined transition-colors hover:text-[#e1fdff]" style={{ color: '#b9cacb' }}>notifications</span>
            <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border border-black" />
          </motion.button>
          
          <AnimatePresence>
            {showNotifMenu && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-12 right-0 w-80 glass-panel rounded-2xl p-6 border shadow-2xl z-50"
                style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(14,14,15,0.95)', backdropFilter: 'blur(24px)' }}
              >
                <h4 className="text-xs font-bold tracking-[0.2em] mb-4 text-[#e1fdff]">ACTIVE_NOTIFICATIONS</h4>
                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                    <p className="text-[10px] terminal-text text-[#D2FF00] mb-1">SYSTEM_ALERT</p>
                    <p className="text-xs opacity-70">Neural trajectory synchronized successfully.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile Menu */}
        <div className="relative">
          <motion.div 
            whileHover={{ scale: 1.1, borderColor: '#D2FF00' }}
            className="w-10 h-10 rounded-lg border overflow-hidden cursor-pointer" 
            style={{ borderColor: 'rgba(210,255,0,0.3)' }}
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="w-full h-full rounded-lg flex items-center justify-center font-bold text-sm overflow-hidden" 
              style={{ background: 'rgba(0,219,231,0.2)', color: '#e1fdff' }}>
              {user?.photoURL && !imgError ? (
                <img 
                  src={user.photoURL} 
                  alt="Avatar" 
                  className="w-full h-full object-cover" 
                  onError={() => setImgError(true)}
                />
              ) : (
                (user?.displayName || user?.email || 'A')[0].toUpperCase()
              )}
            </div>
          </motion.div>

          <AnimatePresence>
            {showProfileMenu && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-12 right-0 w-64 glass-panel rounded-2xl p-6 border shadow-2xl z-50"
                style={{ borderColor: 'rgba(210,255,0,0.2)', background: 'rgba(14,14,15,0.95)', backdropFilter: 'blur(24px)' }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg overflow-hidden" 
                    style={{ background: 'rgba(0,219,231,0.1)', color: '#e1fdff', border: '1px solid rgba(0,219,231,0.2)' }}>
                    {user?.photoURL && !imgError ? (
                      <img 
                        src={user.photoURL} 
                        alt="Avatar" 
                        className="w-full h-full object-cover" 
                        onError={() => setImgError(true)}
                      />
                    ) : (
                      (user?.displayName || user?.email || 'A')[0].toUpperCase()
                    )}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-sm font-bold text-[#e1fdff] truncate">{user?.displayName || 'User'}</h4>
                    <p className="text-[9px] terminal-text opacity-50 truncate">{user?.email}</p>
                  </div>
                </div>
                <div className="h-px w-full bg-white/10 mb-4" />
                <div className="space-y-1">
                  {menuItems.map(item => (
                    <button 
                      key={item.label} 
                      onClick={() => {
                        setShowProfileMenu(false);
                        navigate(item.to, { state: item.state });
                      }}
                      className="flex items-center gap-3 w-full text-left p-2 rounded-lg text-xs hover:bg-white/5 transition-colors opacity-70 hover:opacity-100 text-[#e1fdff]"
                    >
                      <span className="material-symbols-outlined text-sm opacity-60">{item.icon}</span>
                      {item.label}
                    </button>
                  ))}
                  <div className="h-px w-full bg-white/10 my-2" />
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full text-left p-2 rounded-lg text-xs hover:bg-red-500/10 transition-colors text-red-400 font-bold"
                  >
                    <span className="material-symbols-outlined text-sm">logout</span>
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
