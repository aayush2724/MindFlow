export default function CinematicBackground() {
  return (
    <div className="black-hole-container" aria-hidden="true">
      <div className="starfield starfield-layer-1"></div>
      <div className="starfield starfield-layer-2"></div>
      
      <div className="accretion-disk-wrapper">
        <div className="accretion-disk-back"></div>
        <div className="accretion-disk"></div>
        <div className="accretion-disk-inner"></div>
      </div>

      <div className="photon-ring-outer"></div>
      <div className="photon-ring"></div>
      <div className="event-horizon-halo"></div>
      <div className="singularity"></div>
      <div className="gravitational-lensing"></div>
      
      <div className="ambient-glow"></div>
    </div>
  );
}
