import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function Auth() {
  const { signInDemo, login, signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('signin');
  const [loading, setLoading] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      let isNew = false;
      if (tab === 'signin') {
        await login(email, password);
      } else {
        const res = await signup(email, password, name || 'Student');
        isNew = res?.isNewUser;
      }
      navigate(isNew ? '/onboarding' : '/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await loginWithGoogle();
      navigate(res?.isNewUser ? '/onboarding' : '/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (counselor = false) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    signInDemo(counselor);
    setLoading(false);
    navigate(counselor ? '/wellpulse' : '/onboarding');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 pt-24 z-10">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full"
               style={{ background: '#D2FF00', boxShadow: '0 0 30px rgba(210,255,0,0.3)' }}>
            <span className="material-symbols-outlined text-[#020202]" style={{ fontSize: 32, fontVariationSettings: "'FILL' 1" }}>psychology</span>
          </div>
          <h1 className="font-bold tracking-tight mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, color: '#e1fdff' }}>
            Welcome to MindFlow
          </h1>
          <p className="text-sm font-semibold tracking-widest opacity-60 uppercase" style={{ color: '#b9cacb' }}>
            Proactive Mental Health Interface
          </p>
        </div>

        <div className="glass-panel p-8 md:p-10 relative overflow-hidden" style={{ borderRadius: 24, border: '1px solid rgba(255,255,255,0.08)' }}>
          {/* subtle background glow inside card */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00DBE7] opacity-5 blur-[100px] pointer-events-none" />
          
          <div className="flex bg-[#000]/40 rounded-xl p-1 mb-8 border border-white/5 relative z-10">
            {['signin', 'signup'].map(t => (
              <button key={t} onClick={() => { setTab(t); setError(''); }} 
                className="flex-1 py-3 text-xs font-bold tracking-widest uppercase rounded-lg transition-all"
                style={{ 
                  background: tab === t ? 'rgba(0,219,231,0.1)' : 'transparent', 
                  color: tab === t ? '#e1fdff' : 'rgba(255,255,255,0.3)',
                  border: tab === t ? '1px solid rgba(0,219,231,0.3)' : '1px solid transparent',
                  boxShadow: tab === t ? '0 0 20px rgba(0,219,231,0.1)' : 'none'
                }}>
                {t === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 text-xs font-mono">
              {error}
            </div>
          )}

          <form onSubmit={handleAuth} className="flex flex-col gap-5 mb-8 relative z-10">
            {tab === 'signup' && (
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-[20px]">person</span>
                <input 
                  type="text" placeholder="Full Name" 
                  className="w-full bg-[#0e0e0f]/80 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm text-[#e1fdff] placeholder-white/20 focus:outline-none focus:border-[#D2FF00]/50 transition-all"
                  value={name} onChange={e => setName(e.target.value)} required={tab === 'signup'} 
                />
              </div>
            )}
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-[20px]">mail</span>
              <input 
                type="email" placeholder="you@university.edu" 
                className="w-full bg-[#0e0e0f]/80 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm text-[#e1fdff] placeholder-white/20 focus:outline-none focus:border-[#D2FF00]/50 transition-all"
                value={email} onChange={e => setEmail(e.target.value)} required 
              />
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-[20px]">lock</span>
              <input 
                type="password" placeholder="••••••••" 
                className="w-full bg-[#0e0e0f]/80 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm text-[#e1fdff] placeholder-white/20 focus:outline-none focus:border-[#D2FF00]/50 transition-all"
                value={password} onChange={e => setPassword(e.target.value)} required 
              />
            </div>
            
            <button type="submit" disabled={loading}
              className="w-full py-4 mt-2 rounded-xl font-bold text-xs tracking-widest flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              style={{ background: '#D2FF00', color: '#0e0e0f', boxShadow: '0 0 20px rgba(210,255,0,0.2)' }}>
              {loading ? (
                <span className="material-symbols-outlined animate-spin">refresh</span>
              ) : (
                <>
                  <span>{tab === 'signin' ? 'AUTHORIZE ACCESS' : 'INITIALIZE ACCOUNT'}</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          <div className="flex items-center gap-4 mb-8 relative z-10">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/30">External Auth</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <button onClick={handleGoogle} disabled={loading}
            className="w-full py-3 mb-8 rounded-xl font-bold text-xs tracking-widest flex items-center justify-center gap-3 transition-all border hover:bg-white/5 relative z-10"
            style={{ background: 'transparent', borderColor: 'rgba(255,255,255,0.1)', color: '#e1fdff' }}>
            <svg style={{ width: 16, height: 16 }} viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            GOOGLE AUTH
          </button>

          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/30">System Demo</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="flex flex-row gap-4 relative z-10">
            <button onClick={() => handleDemoLogin(false)} disabled={loading}
              className="flex-1 py-3 rounded-xl font-bold text-[10px] tracking-widest flex items-center justify-center gap-2 border transition-all"
              style={{ background: 'transparent', borderColor: 'rgba(0,219,231,0.2)', color: '#00DBE7', boxShadow: 'inset 0 0 10px rgba(0,219,231,0.05)' }}>
              <span className="material-symbols-outlined text-[14px]">science</span>
              STUDENT
            </button>
            <button onClick={() => handleDemoLogin(true)} disabled={loading}
              className="flex-1 py-3 rounded-xl font-bold text-[10px] tracking-widest flex items-center justify-center gap-2 border transition-all"
              style={{ background: 'transparent', borderColor: 'rgba(210,255,0,0.2)', color: '#D2FF00', boxShadow: 'inset 0 0 10px rgba(210,255,0,0.05)' }}>
              <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
              COUNSELOR
            </button>
          </div>
        </div>
        
        <p className="text-center text-[10px] tracking-widest text-white/20 mt-8 font-mono">
          ALL DATA ANONYMIZED. END-TO-END ENCRYPTED.
        </p>
      </motion.div>
    </div>
  );
}
