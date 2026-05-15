import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Mail, Lock, ArrowRight, Sparkles, Loader2, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import ParticleField from '../components/ParticleField';

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
      if (tab === 'signin') {
        await login(email, password);
      } else {
        await signup(email, password, name || 'Student');
      }
      navigate('/dashboard');
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
      await loginWithGoogle();
      navigate('/dashboard');
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
    <div className="page-wrapper noise" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <ParticleField count={120} color="#6c63ff" />
      <div className="ambient-orb" style={{ width: 500, height: 500, background: 'radial-gradient(circle, #6c63ff, transparent)', top: -100, left: -150, opacity: 0.12 }} />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: '100%', maxWidth: 440, padding: '0 24px', position: 'relative', zIndex: 1 }}
      >
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ width: 56, height: 56, background: 'linear-gradient(135deg, #6c63ff, #a78bfa)', borderRadius: 16, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 40px rgba(108,99,255,0.5)' }}>
            <Brain size={28} color="white" />
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Welcome to MindFlow</h1>
          <p className="body-md">Proactive mental health starts here</p>
        </div>

        <GlassCard hover={false} style={{ padding: 32 }}>
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 4, marginBottom: 28 }}>
            {['signin', 'signup'].map(t => (
              <button key={t} onClick={() => { setTab(t); setError(''); }} style={{ flex: 1, padding: '10px 0', borderRadius: 9, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, background: tab === t ? 'linear-gradient(135deg, #6c63ff, #a78bfa)' : 'transparent', color: tab === t ? 'white' : 'rgba(255,255,255,0.4)', transition: 'all 0.2s ease' }}>
                {t === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          {error && <div style={{ background: 'rgba(248, 113, 113, 0.1)', color: '#f87171', padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 20, border: '1px solid rgba(248, 113, 113, 0.2)' }}>{error}</div>}

          <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
            {tab === 'signup' && (
              <div style={{ position: 'relative' }}>
                <User size={16} color="rgba(255,255,255,0.3)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
                <input className="input-glass" type="text" placeholder="Full Name" style={{ paddingLeft: 42, width: '100%' }} value={name} onChange={e => setName(e.target.value)} required={tab === 'signup'} />
              </div>
            )}
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="rgba(255,255,255,0.3)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
              <input className="input-glass" type="email" placeholder="you@university.edu" style={{ paddingLeft: 42, width: '100%' }} value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="rgba(255,255,255,0.3)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
              <input className="input-glass" type="password" placeholder="••••••••" style={{ paddingLeft: 42, width: '100%' }} value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            
            <button className="btn-primary" type="submit" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }} disabled={loading}>
              {loading ? <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> : <ArrowRight size={18} />}
              <span>{tab === 'signin' ? 'Sign In' : 'Create Account'}</span>
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>or</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
          </div>

          <button className="btn-ghost" style={{ width: '100%', justifyContent: 'center', marginBottom: 16 }} onClick={handleGoogle} disabled={loading}>
            <svg style={{ width: 16, height: 16, marginRight: 8 }} viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>demo access</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
            <button className="btn-ghost" style={{ flex: 1, justifyContent: 'center' }} onClick={() => handleDemoLogin(false)}>
              <Sparkles size={16} /> Student
            </button>
            <button className="btn-ghost" style={{ flex: 1, justifyContent: 'center', color: '#34d399', borderColor: 'rgba(52,211,153,0.25)' }} onClick={() => handleDemoLogin(true)}>
              <Brain size={16} /> Counselor
            </button>
          </div>
        </GlassCard>
        <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.2)', marginTop: 24 }}>All data anonymised. Your mental health data is yours.</p>
      </motion.div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
