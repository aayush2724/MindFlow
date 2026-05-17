import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function TiltCard({ children, className = '', style = {}, maxTilt = 9 }) {
  const ref = useRef(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const sx   = useSpring(rawX, { stiffness: 160, damping: 22 });
  const sy   = useSpring(rawY, { stiffness: 160, damping: 22 });

  const rotateX = useTransform(sy, [-0.5, 0.5], [ maxTilt, -maxTilt]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-maxTilt,  maxTilt]);
  const shine   = useTransform(sx, [-0.5, 0.5], [0.05, 0.14]);

  const onMove = (e) => {
    const el   = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width  - 0.5);
    rawY.set((e.clientY - rect.top)  / rect.height - 0.5);
  };
  const onLeave = () => { rawX.set(0); rawY.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 900, ...style }}
      className={className}
    >
      {/* Specular highlight that tracks mouse */}
      <motion.div
        style={{
          position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none', zIndex: 1,
          background: 'radial-gradient(circle at 60% 30%, rgba(255,255,255,0.12), transparent 60%)',
          opacity: shine,
        }}
      />
      {children}
    </motion.div>
  );
}
