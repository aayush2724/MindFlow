import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState('default');
  
  const mouseX = useSpring(0, { stiffness: 500, damping: 28 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 28 });

  const dotX = useSpring(0, { stiffness: 1000, damping: 40 });
  const dotY = useSpring(0, { stiffness: 1000, damping: 40 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 16); // Center of 32px circle
      mouseY.set(e.clientY - 16);
      dotX.set(e.clientX - 4); // Center of 8px dot
      dotY.set(e.clientY - 4);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('magnetic')
      ) {
        setCursorState('hover');
      } else {
        setCursorState('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, dotX, dotY]);

  // Hide on mobile/touch devices via CSS
  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block rounded-full bg-primary mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          width: 8,
          height: 8,
        }}
        animate={{
          scale: cursorState === 'hover' ? 0 : 1,
          opacity: cursorState === 'hover' ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden md:block rounded-full border border-primary mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          width: 32,
          height: 32,
        }}
        animate={{
          scale: cursorState === 'hover' ? 2 : 1,
          backgroundColor: cursorState === 'hover' ? 'rgba(0, 219, 231, 0.1)' : 'transparent',
          borderColor: cursorState === 'hover' ? 'rgba(0, 219, 231, 0.5)' : 'rgba(0, 219, 231, 1)',
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
