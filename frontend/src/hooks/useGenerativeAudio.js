import { useEffect, useRef, useState } from 'react';

export function useGenerativeAudio() {
  const ctxRef = useRef(null);
  const nodesRef = useRef([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const startSession = (type = 'alpha') => {
    try {
      if (!ctxRef.current) {
        ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = ctxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      // Clean up previous
      if (nodesRef.current.length > 0) {
        // hard stop previous nodes without fade if rapidly clicked
        nodesRef.current.forEach(node => {
          if (node.stop) try { node.stop(); } catch(e){}
          if (node.disconnect) node.disconnect();
        });
        nodesRef.current = [];
      }

      // 1. Binaural Oscillator setup
      const baseFreq = 136.1; // OM frequency (calming/grounding)
      let beatFreq = 10; // Default Alpha
      if (type.toLowerCase().includes('focus')) beatFreq = 15; // Beta for focus
      if (type.toLowerCase().includes('calm') || type.toLowerCase().includes('sleep')) beatFreq = 5; // Theta for calm/sleep

      const leftOsc = ctx.createOscillator();
      const rightOsc = ctx.createOscillator();
      const mainGain = ctx.createGain();
      
      let leftPan, rightPan;
      if (ctx.createStereoPanner) {
        leftPan = ctx.createStereoPanner();
        rightPan = ctx.createStereoPanner();
        leftPan.pan.value = -1;
        rightPan.pan.value = 1;
      } else {
        // Fallback for older browsers
        leftPan = ctx.createGain();
        rightPan = ctx.createGain();
      }

      leftOsc.type = 'sine';
      rightOsc.type = 'sine';
      leftOsc.frequency.value = baseFreq;
      rightOsc.frequency.value = baseFreq + beatFreq;

      leftOsc.connect(leftPan);
      rightOsc.connect(rightPan);
      leftPan.connect(mainGain);
      rightPan.connect(mainGain);

      // 2. Breathing Drone (Warm Pad)
      const padOsc1 = ctx.createOscillator();
      const padOsc2 = ctx.createOscillator();
      const padOsc3 = ctx.createOscillator();
      padOsc1.type = 'triangle';
      padOsc2.type = 'triangle';
      padOsc3.type = 'sine';
      
      padOsc1.frequency.value = baseFreq / 2; // Octave down
      padOsc2.frequency.value = baseFreq * 1.5; // Perfect fifth
      padOsc3.frequency.value = baseFreq;

      const padGain = ctx.createGain();
      padGain.gain.value = 0.5;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 400; // Warm, muffled start

      // LFO for filter breathing effect (approx 6 seconds per breath cycle)
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 1 / 6; // 6 seconds
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 300; // Modulate frequency by 300Hz

      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      padOsc1.connect(filter);
      padOsc2.connect(filter);
      padOsc3.connect(filter);
      filter.connect(padGain);
      padGain.connect(mainGain);

      // Master Fade In
      mainGain.gain.setValueAtTime(0, ctx.currentTime);
      mainGain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 3);

      mainGain.connect(ctx.destination);

      // Start everything
      leftOsc.start();
      rightOsc.start();
      padOsc1.start();
      padOsc2.start();
      padOsc3.start();
      lfo.start();

      nodesRef.current = [leftOsc, rightOsc, padOsc1, padOsc2, padOsc3, lfo, mainGain];
      setIsPlaying(true);
    } catch (err) {
      console.error('Audio playback failed:', err);
    }
  };

  const stopSession = () => {
    if (nodesRef.current.length > 0) {
      const mainGain = nodesRef.current[nodesRef.current.length - 1];
      const ctx = ctxRef.current;
      
      try {
        // Fade out smoothly over 2 seconds
        mainGain.gain.cancelScheduledValues(ctx.currentTime);
        mainGain.gain.setValueAtTime(mainGain.gain.value, ctx.currentTime);
        mainGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2);

        setTimeout(() => {
          nodesRef.current.forEach(node => {
            if (node.stop) try { node.stop(); } catch(e){}
            if (node.disconnect) node.disconnect();
          });
          nodesRef.current = [];
          setIsPlaying(false);
        }, 2100);
      } catch(err) {
        setIsPlaying(false);
      }
    }
  };

  const togglePause = () => {
    if (ctxRef.current) {
      if (ctxRef.current.state === 'running') {
        ctxRef.current.suspend();
        setIsPlaying(false);
      } else if (ctxRef.current.state === 'suspended') {
        ctxRef.current.resume();
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    return () => {
      stopSession();
      if (ctxRef.current && ctxRef.current.state !== 'closed') {
        ctxRef.current.close();
      }
    };
  }, []);

  return { startSession, stopSession, togglePause, isPlaying };
}
