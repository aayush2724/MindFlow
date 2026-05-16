import { motion } from 'framer-motion';

export default function CinematicBackground() {
  return (
    <div className="black-hole-container" aria-hidden="true">
      <div className="starfield starfield-layer-1"></div>
      <div className="starfield starfield-layer-2"></div>
      
      <motion.div 
        className="accretion-disk-wrapper"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 0.6,
          rotate: [0, 5, 0, -5, 0],
          scale: [1, 1.02, 0.98, 1]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        <div className="accretion-disk-back"></div>
        <div className="accretion-disk"></div>
        <div className="accretion-disk-inner"></div>
      </motion.div>

      <motion.div 
        className="photon-ring-outer"
        animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div 
        className="photon-ring"
        animate={{ scale: [1, 1.02, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="event-horizon-halo"></div>
      
      <motion.div 
        className="singularity"
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="gravitational-lensing"></div>
      
      <div className="ambient-glow"></div>
    </div>
  );
}
