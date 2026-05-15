import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, TrendingDown, ArrowRight, Moon, BookOpen, Zap, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import StressOrb from '../components/StressOrb';
import BurnoutGauge from '../components/BurnoutGauge';
import GlassCard from '../components/GlassCard';
import { generateMockHistory, calculateBurnoutScore } from '../lib/burnoutEngine';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }),
};

export default function Dashboard() {
  const { user } = useAuth();
  const [burnout, setBurnout] = useState(null);
  const [history, setHistory] = useState([]);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening');

    const lastCheckin = JSON.parse(localStorage.getItem('mf_last_checkin') || 'null');
    const result = lastCheckin
      ? calculateBurnoutScore(lastCheckin)
      : calculateBurnoutScore({ mood: 6, sleep: 6.5, workload: 6, stress: 6 });
    setBurnout(result);
    setHistory(generateMockHistory(result.score));
  }, []);

  if (!burnout) return null;

  const trend = history.length >= 2
    ? history[history.length - 1].score - history[history.length - 2].score
    : 0;

  const quickStats = [
    { icon: Moon, label: 'Sleep last night', value: '6.5h', color: '#38bdf8', note: '1.5h below goal' },
    { icon: BookOpen, label: 'Active subjects', value: '5', color: '#a78bfa', note: '2 deadlines this week' },
    { icon: Zap, label: 'Burnout streak', value: '3d', color: '#fbbf24', note: 'Above 60 for 3 days' },
  ];

  return (
    <div className="page-wrapper noise bg-grid" style={{ paddingTop: 88, paddingBottom: 60 }}>
      <div className="ambient-orb" style={{ width: 500, height: 500, background: `radial-gradient(circle, ${burnout.color}55, transparent)`, top: 0, right: -100, opacity: 0.15 }} />

      <div className="container">
        {/* Header */}
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" style={{ marginBottom: 40 }}>
          <div className="label" style={{ marginBottom: 8 }}>{greeting}</div>
          <h1 className="heading-lg" style={{ marginBottom: 4 }}>
            {user?.displayName?.split(' ')[0] || 'Student'} 👋
          </h1>
          <p className="body-md">Here's your wellbeing snapshot for today.</p>
        </motion.div>

        {/* Hero row: Orb + Gauge + Advice */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
          {/* Orb card */}
          <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
            <GlassCard hover={false} glow style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              padding: '40px 28px', minHeight: 340,
              background: 'linear-gradient(135deg, rgba(108,99,255,0.06), rgba(56,189,248,0.04))',
            }}>
              <div style={{ position: 'relative', marginBottom: 24 }}>
                <div className="pulse-ring" style={{ position: 'absolute', inset: -20, borderRadius: '50%', border: `2px solid ${burnout.color}40` }} />
                <StressOrb score={burnout.score} size={200} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 4, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Emotional State
                </div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 700, color: burnout.color }}>
                  {burnout.level}
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Gauge + advice */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
              <GlassCard hover={false} style={{ padding: '28px 28px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <BurnoutGauge score={burnout.score} size={220} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
                  {trend > 0
                    ? <TrendingUp size={16} color="#f87171" />
                    : <TrendingDown size={16} color="#34d399" />}
                  <span style={{ fontSize: 13, color: trend > 0 ? '#f87171' : '#34d399' }}>
                    {Math.abs(trend)} pts {trend > 0 ? 'higher' : 'lower'} than yesterday
                  </span>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible">
              <GlassCard hover={false} style={{ padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <AlertTriangle size={15} color={burnout.color} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: burnout.color }}>Today's Advice</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {burnout.advice.map((a, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: burnout.color, marginTop: 6, flexShrink: 0 }} />
                      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{a}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>

        {/* Quick stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
          {quickStats.map(({ icon: Icon, label, value, color, note }, i) => (
            <motion.div key={label} custom={4 + i} variants={fadeUp} initial="hidden" animate="visible">
              <GlassCard style={{ padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}18`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={17} color={color} />
                  </div>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{label}</span>
                </div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 700, marginBottom: 4 }}>{value}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{note}</div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Burnout trend chart */}
        <motion.div custom={7} variants={fadeUp} initial="hidden" animate="visible" style={{ marginBottom: 24 }}>
          <GlassCard hover={false} style={{ padding: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div>
                <div className="label" style={{ marginBottom: 4 }}>14-day trend</div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 600 }}>Burnout Risk History</h3>
              </div>
              <div className="chip">
                <div className="dot-live" />
                Live
              </div>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={history}>
                <defs>
                  <linearGradient id="burnoutGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={burnout.color} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={burnout.color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 11 }} tickLine={false} axisLine={false}
                  tickFormatter={d => d.slice(5)} />
                <YAxis domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 11 }} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ background: '#0d1020', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, fontSize: 13 }}
                  labelStyle={{ color: 'rgba(255,255,255,0.6)' }}
                  itemStyle={{ color: burnout.color }}
                />
                <Area type="monotone" dataKey="score" stroke={burnout.color} strokeWidth={2} fill="url(#burnoutGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>

        {/* CTA */}
        <motion.div custom={8} variants={fadeUp} initial="hidden" animate="visible">
          <Link to="/checkin" style={{ textDecoration: 'none' }}>
            <div className="glass" style={{
              padding: '24px 32px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: 'linear-gradient(135deg, rgba(108,99,255,0.12), rgba(167,139,250,0.08))',
              border: '1px solid rgba(108,99,255,0.25)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 40px rgba(108,99,255,0.25)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(108,99,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sparkles size={20} color="#a78bfa" />
                </div>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 2 }}>Ready for today's check-in?</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>30 seconds • Updates your burnout score instantly</div>
                </div>
              </div>
              <ArrowRight size={20} color="rgba(255,255,255,0.4)" />
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
