import { useState } from 'react';
import { motion } from 'framer-motion';

const MOOD_LABELS = ['😩', '😔', '😐', '🙂', '😊', '😄', '🌟'];
const getValue = (v) => Math.round(((v - 1) / 9) * 6);

export default function MoodSlider({ label, value, onChange, min = 1, max = 10, step = 1, unit = '', showEmoji = false }) {
  const pct = ((value - min) / (max - min)) * 100;

  const getTrackColor = () => {
    if (pct < 35) return 'linear-gradient(90deg, #34d399, #38bdf8)';
    if (pct < 65) return 'linear-gradient(90deg, #38bdf8, #fbbf24)';
    return 'linear-gradient(90deg, #fbbf24, #f87171)';
  };

  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>{label}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {showEmoji && (
            <motion.span
              key={getValue(value)}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ fontSize: 22 }}
            >
              {MOOD_LABELS[Math.min(getValue(value), 6)]}
            </motion.span>
          )}
          <div style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8,
            padding: '4px 12px',
            fontSize: 15,
            fontWeight: 700,
            color: 'white',
            minWidth: 52,
            textAlign: 'center',
          }}>
            {value}{unit}
          </div>
        </div>
      </div>
      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute', top: '50%', left: 0,
          width: `${pct}%`, height: 6,
          background: getTrackColor(),
          borderRadius: 3,
          transform: 'translateY(-50%)',
          transition: 'width 0.15s ease',
          pointerEvents: 'none',
        }} />
        <input
          type="range"
          min={min} max={max} step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{ position: 'relative', zIndex: 1 }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>{min}{unit}</span>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>{max}{unit}</span>
      </div>
    </div>
  );
}
