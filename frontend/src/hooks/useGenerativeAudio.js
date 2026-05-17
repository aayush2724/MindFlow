import { useEffect, useRef, useState } from 'react';

export function useGenerativeAudio() {
  const ctxRef = useRef(null);
  const nodesRef = useRef([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const startSession = (type = 'alpha') => {
    try {
      if (!ctxRef.current || ctxRef.current.state === 'closed') {
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

      // 1. Identify Profile
      const t = type.toLowerCase();
      let baseFreq = 136.1; // OM
      let beatFreq = 10;
      let padWave = 'triangle';
      let filterFreq = 400;
      let interval1 = 0.5; // Octave down
      let interval2 = 1.5; // Perfect fifth

      if (t.includes('focus') || t.includes('alpha')) {
        baseFreq = 256; // Brighter C4
        beatFreq = 15; // Beta
        padWave = 'sine';
        filterFreq = 800; // Brighter
        interval1 = 1.25; // Major third
        interval2 = 1.5; // Perfect fifth
      } else if (t.includes('sleep') || t.includes('rest')) {
        baseFreq = 85; // Deep bass
        beatFreq = 4; // Delta
        padWave = 'sine';
        filterFreq = 150; // Very dark
        interval1 = 0.5; // Octave down
        interval2 = 2.0; // Octave up
      } else if (t.includes('calm') || t.includes('therapy')) {
        baseFreq = 174; // Healing frequency
        beatFreq = 6; // Theta
        padWave = 'triangle';
        filterFreq = 300; // Warm
        interval1 = 1.2; // Minor third (calming)
        interval2 = 1.5; // Perfect fifth
      } else {
        // Education/Video default (ambient white noise with slight tone)
        baseFreq = 200;
        beatFreq = 0; // No binaural
        padWave = 'triangle';
        filterFreq = 600;
      }

      // 2. Binaural Oscillator setup
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

      // 3. Breathing Drone (Warm Pad)
      const padOsc1 = ctx.createOscillator();
      const padOsc2 = ctx.createOscillator();
      const padOsc3 = ctx.createOscillator();
      padOsc1.type = padWave;
      padOsc2.type = padWave;
      padOsc3.type = 'sine';
      
      padOsc1.frequency.value = baseFreq * interval1;
      padOsc2.frequency.value = baseFreq * interval2;
      padOsc3.frequency.value = baseFreq;

      const padGain = ctx.createGain();
      padGain.gain.value = 0.5;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = filterFreq;

      // LFO for filter breathing effect (approx 6 seconds per breath cycle)
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 1 / 6; // 6 seconds
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = filterFreq * 0.8; // Sweep depth depends on base filter

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
      const nodesToStop = nodesRef.current;
      nodesRef.current = []; // Clear immediately so remounts aren't affected
      
      try {
        // Fade out smoothly over 2 seconds
        mainGain.gain.cancelScheduledValues(ctx.currentTime);
        mainGain.gain.setValueAtTime(mainGain.gain.value, ctx.currentTime);
        mainGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2);

        setTimeout(() => {
          nodesToStop.forEach(node => {
            if (node.stop) try { node.stop(); } catch(e){}
            if (node.disconnect) node.disconnect();
          });
          // Only update state if a new session hasn't started
          if (nodesRef.current.length === 0) {
            setIsPlaying(false);
          }
        }, 2100);
      } catch(err) {
        if (nodesRef.current.length === 0) {
          setIsPlaying(false);
        }
      }
    }
  };

  const togglePause = () => {
    if (ctxRef.current) {
      if (isPlaying) {
        ctxRef.current.suspend();
        setIsPlaying(false);
      } else {
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
