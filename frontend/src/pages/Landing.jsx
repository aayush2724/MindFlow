import { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import ParticleField from '../components/ParticleField';
import StressOrb from '../components/StressOrb';

export default function Landing() {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scaleHero = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <div className="font-body-md text-on-background relative overflow-hidden">
      {/* 3D Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#020202]">
        <ParticleField count={250} color="#00dbe7" />
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <motion.section 
          style={{ opacity: opacityHero, scale: scaleHero }}
          className="relative min-h-screen flex flex-col items-center justify-center text-center px-gutter overflow-hidden"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 blur-[100px] pointer-events-none z-0">
            <StressOrb score={40} size={800} />
          </div>
          
          <div className="relative z-10 ultra-wide space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-display-lg-mobile md:text-display-lg font-bold leading-[1] tracking-tighter">
                PREDICT <span className="text-primary italic font-light">BURNOUT.</span><br />
                PREVENT <span className="text-electric-lime">CRISIS.</span>
              </h1>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="flex items-center justify-center gap-4 py-4"
            >
              <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-primary"></div>
              <p className="text-label-caps font-semibold tracking-[0.5em] text-primary">PROTECT STUDENTS</p>
              <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-primary"></div>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="text-body-lg font-light text-on-surface-variant max-w-2xl mx-auto leading-relaxed"
            >
              Shift mental health support from reactive response to proactive prevention with next-generation AI emotional intelligence.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="flex flex-col md:flex-row items-center justify-center gap-8 pt-12"
            >
              <Link to="/auth">
                <button className="px-12 py-5 bg-primary text-on-primary font-bold rounded-full text-sm tracking-[0.2em] shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:scale-105 transition-all">
                  FOR STUDENTS
                </button>
              </Link>
              <Link to="/auth">
                <button className="px-12 py-5 glass-card text-primary font-bold rounded-full text-sm tracking-[0.2em] hover:bg-white/10 transition-all border-primary/20">
                  FOR INSTITUTIONS
                </button>
              </Link>
            </motion.div>
          </div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-12 flex flex-col items-center gap-4 opacity-40"
          >
            <span className="text-label-caps tracking-[0.4em] text-[10px]">SCROLL TO EXPLORE</span>
            <div className="w-[1px] h-20 bg-gradient-to-b from-primary via-primary/50 to-transparent"></div>
          </motion.div>
        </motion.section>

        {/* Bento Grid Storytelling */}
        <section className="min-h-screen py-20 px-gutter bg-[#020202]/90 backdrop-blur-2xl border-t border-glass-border relative overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
          <div className="ultra-wide">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              
              {/* MoodMap Module */}
              <motion.div 
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="md:col-span-7 glass-card rounded-[3rem] p-16 overflow-hidden relative group"
              >
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] pointer-events-none transition-all duration-700 group-hover:bg-primary/10"></div>
                <div className="flex flex-col h-full justify-between gap-16">
                  <div className="max-w-md relative z-10">
                    <span className="text-electric-lime font-label-caps tracking-[0.3em] mb-8 block">MODULE 01</span>
                    <h3 className="text-headline-md font-bold text-primary mb-6">MOODMAP</h3>
                    <p className="text-body-lg font-light text-on-surface-variant">
                      Our AI parses micro-patterns in sentiment to predict mental fatigue before it peaks. Real-time emotional scoring at your fingertips.
                    </p>
                  </div>
                  <div className="relative h-80 bg-surface-container-highest/20 rounded-3xl border border-glass-border p-10 overflow-hidden group-hover:border-primary/30 transition-all z-10">
                    <div className="flex items-end gap-5 h-full">
                      <div className="flex-1 bg-primary/10 h-[40%] rounded-t-2xl transition-all duration-1000 group-hover:h-[50%]"></div>
                      <div className="flex-1 bg-primary/20 h-[65%] rounded-t-2xl transition-all duration-1000 delay-100 group-hover:h-[75%]"></div>
                      <div className="flex-1 bg-electric-lime/40 h-[90%] rounded-t-2xl relative transition-all duration-1000 delay-200 group-hover:h-[85%]">
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-electric-lime text-background px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest">CRITICAL</div>
                      </div>
                      <div className="flex-1 bg-primary/15 h-[50%] rounded-t-2xl transition-all duration-1000 delay-300 group-hover:h-[60%]"></div>
                      <div className="flex-1 bg-primary/10 h-[30%] rounded-t-2xl transition-all duration-1000 delay-400 group-hover:h-[45%]"></div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Small Info Cards */}
              <div className="md:col-span-5 flex flex-col gap-12">
                <motion.div 
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="glass-card rounded-[3rem] p-12 flex flex-col items-center justify-center text-center gap-8 border-secondary/10 hover:border-secondary/40 flex-grow group"
                >
                  <div className="w-24 h-24 rounded-full bg-secondary-container/10 flex items-center justify-center text-secondary border border-secondary/20 group-hover:scale-110 transition-transform duration-500">
                    <span className="material-symbols-outlined text-5xl">query_stats</span>
                  </div>
                  <div>
                    <h4 className="text-headline-md font-bold mb-4">INSIGHTS</h4>
                    <p className="text-on-surface-variant font-light px-6">Instant feedback on cognitive load and emotional trajectory trajectories.</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="glass-card rounded-[3rem] p-12 flex flex-col gap-8 relative overflow-hidden group border-primary/10 hover:border-primary/40"
                >
                  <span className="text-electric-lime font-label-caps tracking-[0.3em]">MODULE 02</span>
                  <h3 className="text-headline-md font-bold text-primary">CALMCAL</h3>
                  <p className="text-on-surface-variant font-light text-body-md">
                    Stress-aware calendar assistant visualizing your week as a thermal stress map.
                  </p>
                </motion.div>
              </div>

              {/* WellPulse Module */}
              <motion.div 
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="md:col-span-12 glass-card rounded-[3rem] p-16 overflow-hidden relative group border-primary/5"
              >
                <div className="flex flex-col md:flex-row gap-20 items-center">
                  <div className="flex-1 space-y-10 relative z-10">
                    <span className="text-electric-lime font-label-caps tracking-[0.3em]">MODULE 03</span>
                    <h3 className="text-display-lg-mobile font-bold text-primary tracking-tight">WELLPULSE</h3>
                    <p className="text-body-lg font-light text-on-surface-variant leading-relaxed">
                      For Institutions: High-fidelity wellbeing analytics that help counselors monitor campus-wide mental health patterns with radical privacy-first architecture.
                    </p>
                    <Link to="/auth">
                      <button className="flex items-center gap-4 text-electric-lime font-bold uppercase tracking-[0.4em] text-xs">
                        EXPLORE DASHBOARD
                        <span className="material-symbols-outlined transition-transform duration-500 group-hover:translate-x-4">east</span>
                      </button>
                    </Link>
                  </div>
                  <div className="flex-1 w-full relative z-10">
                    <div className="aspect-video glass-card rounded-2xl overflow-hidden border-primary/20 shadow-2xl group-hover:scale-105 transition-transform duration-700">
                      <img alt="Analytics Dashboard" className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfO783Lzv2Jbg1DCZMELryPbJE-11bkXDRW4181kiy_feiDIMweTfu_MLEr6tpSMfsPrW4kL_FCGJsGn5qW5AZQx1F2dxgzmgfyMTFnasNfr9cwj1eVdS4TomCjdSB08zfj_nLdzzHgerm24ckiMN6FVH43npiAu96XSCN4OZC2KFVX9nKmFdK6UvzSFuG7UN8h5kzimUC0SXKsNe2GgBHBEDoBF4ELXm1e2S7AHGNYR5uomuytEcoCyjNfe9VATvTnFkBGhUZuUf5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Intelligence Core Section */}
        <section className="py-20 px-gutter bg-[#020202]/95 backdrop-blur-2xl border-t border-glass-border relative overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
          <div className="ultra-wide space-y-16">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-headline-md font-bold text-primary tracking-tight">INTELLIGENCE CORE</h2>
              <p className="text-on-surface-variant font-light mt-4 text-sm tracking-widest font-label-caps">PROPRIETARY TECHNOLOGY STACK</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Neural Engine', desc: 'ADVANCED PATTERN RECOGNITION, COGNITIVE MODELING, REAL-TIME PROCESSING, DEEP LEARNING ARCHITECTURE', icon: 'memory', color: 'primary' },
                { title: 'Predictive Mesh', desc: 'DISTRIBUTED SENSOR NETWORK, TOPOLOGICAL DATA ANALYSIS, PREDICTIVE ROUTING, SCALABLE ARCHITECTURE', icon: 'hub', color: 'electric-lime' },
                { title: 'Sync Protocol', desc: 'BI-DIRECTIONAL TELEMETRY, END-TO-END ENCRYPTION, LOW LATENCY WEBSOCKETS, SEAMLESS INTEGRATION', icon: 'sync_alt', color: 'secondary' }
              ].map((item, i) => (
                <motion.div 
                  key={item.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="glass-card rounded-2xl overflow-hidden group"
                >
                  <div className="relative h-64 bg-surface-container-highest/10 flex items-center justify-center border-b border-glass-border overflow-hidden">
                    <span className={`material-symbols-outlined text-[80px] text-${item.color}/60 group-hover:text-${item.color} group-hover:scale-110 transition-all duration-700 relative z-10`}>{item.icon}</span>
                  </div>
                  <div className="p-8 bg-surface-container-low/30 backdrop-blur-sm">
                    <h3 className={`text-2xl font-bold text-${item.color} mb-4`}>{item.title}</h3>
                    <p className="text-xs text-on-surface-variant tracking-[0.15em] font-label-caps leading-relaxed opacity-60">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-40 px-gutter text-center bg-[#020202] border-t border-glass-border relative overflow-hidden flex items-center justify-center shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="ultra-wide relative z-10 space-y-16"
          >
            <h2 className="text-display-lg font-bold text-primary tracking-tighter">READY FOR <br /> FLOW STATE?</h2>
            <div className="flex flex-col md:flex-row justify-center gap-4 max-w-2xl mx-auto">
              <input className="bg-surface-container-low/50 border border-glass-border rounded-full px-10 py-6 w-full focus:ring-1 focus:ring-primary focus:border-primary outline-none text-on-surface font-label-caps tracking-widest text-xs" placeholder="ENTER INSTITUTION EMAIL" type="email" />
              <Link to="/auth">
                <button className="px-12 py-6 bg-electric-lime text-background font-bold rounded-full hover:shadow-[0_0_40px_rgba(210,255,0,0.4)] transition-all tracking-[0.2em] text-xs whitespace-nowrap">
                  GET EARLY ACCESS
                </button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="w-full py-20 px-gutter border-t border-glass-border bg-[#020202] shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
          <div className="ultra-wide grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
            <div className="flex flex-col gap-6">
              <span className="text-headline-md font-bold text-primary tracking-tighter">MINDFLOW</span>
              <p className="text-label-caps text-on-surface-variant opacity-40 leading-relaxed">
                © 2024 MINDFLOW ECOSYSTEM.<br />ELEVATE YOUR CONSCIOUSNESS.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-12 gap-y-6">
              <a className="text-label-caps text-on-surface-variant hover:text-electric-lime transition-all tracking-[0.3em]" href="#">PRIVACY</a>
              <a className="text-label-caps text-on-surface-variant hover:text-electric-lime transition-all tracking-[0.3em]" href="#">ETHICS AI</a>
              <a className="text-label-caps text-on-surface-variant hover:text-electric-lime transition-all tracking-[0.3em]" href="#">RESEARCH</a>
              <a className="text-label-caps text-on-surface-variant hover:text-electric-lime transition-all tracking-[0.3em]" href="#">CONTACT</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
