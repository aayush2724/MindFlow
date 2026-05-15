import { motion } from 'framer-motion';

/** Arc gauge showing burnout score 0-100 */
export default function BurnoutGauge({ score = 50, size = 220 }) {
  const radius = (size / 2) - 20;
  const stroke = 12;
  const circumference = Math.PI * radius; // half circle
  const offset = circumference - (score / 100) * circumference;

  const getColor = (s) => {
    if (s <= 30) return '#34d399';
    if (s <= 55) return '#38bdf8';
    if (s <= 75) return '#fbbf24';
    return '#f87171';
  };

  const color = getColor(score);
  const cx = size / 2;
  const cy = size / 2;

  return (
    <div style={{ position: 'relative', width: size, height: size / 2 + 30 }}>
      <svg width={size} height={size / 2 + stroke} style={{ overflow: 'visible' }}>
        {/* Track */}
        <path
          d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
        {/* Fill */}
        <motion.path
          d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: [0.34, 1.2, 0.64, 1] }}
          style={{ filter: `drop-shadow(0 0 8px ${color})` }}
        />
        {/* Center score */}
        <text x={cx} y={cy - 8} textAnchor="middle" fontSize={32} fontWeight={700}
          fontFamily="'Space Grotesk', sans-serif" fill="white">
          {score}
        </text>
        <text x={cx} y={cy + 14} textAnchor="middle" fontSize={11} fontWeight={500}
          fontFamily="Inter, sans-serif" fill="rgba(255,255,255,0.45)" letterSpacing="0.08em">
          BURNOUT RISK
        </text>
      </svg>
    </div>
  );
}
