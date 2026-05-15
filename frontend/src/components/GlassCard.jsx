import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', style = {}, hover = true, glow = false, onClick }) {
  return (
    <motion.div
      className={`glass ${className}`}
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      style={{
        padding: 28,
        boxShadow: glow ? '0 0 60px rgba(108,99,255,0.2), 0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,0,0,0.3)',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
