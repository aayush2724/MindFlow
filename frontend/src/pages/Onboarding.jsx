import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BookOpen, Moon, Target, Check } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const STEPS = [
  {
    id: 'semester',
    icon: BookOpen,
    title: 'Your semester',
    subtitle: 'Help us understand your academic context',
    fields: [
      { id: 'semester', label: 'Current semester', type: 'select', options: ['1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester', '7th Semester', '8th Semester'] },
      { id: 'major', label: 'Field of study', type: 'text', placeholder: 'e.g. Computer Science' },
      { id: 'credits', label: 'Credits this semester', type: 'select', options: ['12-15', '16-18', '19-21', '22+'] },
    ],
  },
  {
    id: 'schedule',
    icon: Target,
    title: 'Your workload',
    subtitle: 'Tell us about your upcoming commitments',
    fields: [
      { id: 'subjects', label: 'Number of subjects', type: 'select', options: ['3-4', '5-6', '7-8', '9+'] },
      { id: 'exams', label: 'Exams in next 30 days', type: 'select', options: ['None', '1-2', '3-4', '5+'] },
      { id: 'assignments', label: 'Pending assignments', type: 'select', options: ['0-2', '3-5', '6-9', '10+'] },
    ],
  },
  {
    id: 'sleep',
    icon: Moon,
    title: 'Sleep & recovery',
    subtitle: 'Set your wellness baseline',
    fields: [
      { id: 'sleepGoal', label: 'Sleep goal (hours/night)', type: 'select', options: ['6', '7', '8', '9'] },
      { id: 'wakeTime', label: 'Typical wake time', type: 'select', options: ['Before 6am', '6-7am', '7-8am', '8-9am', 'After 9am'] },
      { id: 'breakStyle', label: 'Preferred break style', type: 'select', options: ['Short 5-min breaks', '25-min Pomodoro', '1-hour deep rest', 'Flexible'] },
    ],
  },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  const handleChange = (id, value) => setData(prev => ({ ...prev, [id]: value }));

  const handleNext = () => {
    if (isLast) {
      localStorage.setItem('mf_onboarding', JSON.stringify(data));
      navigate('/dashboard');
    } else {
      setStep(s => s + 1);
    }
  };

  return (
    <div className="page-wrapper noise" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '80px 24px' }}>
      <div className="ambient-orb" style={{ width: 500, height: 500, background: 'radial-gradient(circle, #6c63ff, transparent)', top: -100, right: -100, opacity: 0.1 }} />

      <div style={{ width: '100%', maxWidth: 520, position: 'relative', zIndex: 1 }}>
        {/* Progress */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 40 }}>
          {STEPS.map((s, i) => (
            <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? 'linear-gradient(90deg, #6c63ff, #a78bfa)' : 'rgba(255,255,255,0.08)', transition: 'background 0.4s ease' }} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ marginBottom: 32 }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(108,99,255,0.15)', border: '1px solid rgba(108,99,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <current.icon size={24} color="#a78bfa" />
              </div>
              <div className="label" style={{ marginBottom: 8 }}>Step {step + 1} of {STEPS.length}</div>
              <h2 className="heading-md" style={{ marginBottom: 8 }}>{current.title}</h2>
              <p className="body-md">{current.subtitle}</p>
            </div>

            <GlassCard hover={false} style={{ padding: 28, marginBottom: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {current.fields.map(field => (
                  <div key={field.id}>
                    <label className="label" style={{ marginBottom: 8, display: 'block' }}>{field.label}</label>
                    {field.type === 'select' ? (
                      <select className="input-glass select" value={data[field.id] || ''} onChange={e => handleChange(field.id, e.target.value)}>
                        <option value="">Select...</option>
                        {field.options.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    ) : (
                      <input className="input-glass" type={field.type} placeholder={field.placeholder} value={data[field.id] || ''} onChange={e => handleChange(field.id, e.target.value)} />
                    )}
                  </div>
                ))}
              </div>
            </GlassCard>

            <div style={{ display: 'flex', gap: 12 }}>
              {step > 0 && (
                <button className="btn-ghost" onClick={() => setStep(s => s - 1)} style={{ flex: 1, justifyContent: 'center' }}>
                  Back
                </button>
              )}
              <button className="btn-primary" onClick={handleNext} style={{ flex: 2, justifyContent: 'center' }}>
                {isLast ? <><Check size={18} /><span>Complete Setup</span></> : <><span>Continue</span><ArrowRight size={18} /></>}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
