import { motion } from 'framer-motion'
import ConstellationCanvas from '../ConstellationCanvas'

export default function LandingHero() {
  return (
    <section className="relative overflow-hidden" style={{ background: '#0B0D12' }}>
      {/* Constellation background */}
      <div className="absolute inset-0 opacity-50">
        <ConstellationCanvas />
      </div>

      {/* Subtle ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width: 700, height: 500, borderRadius: '50%', opacity: 0.05, background: 'radial-gradient(circle, #00E0CC 0%, transparent 70%)' }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6" style={{ minHeight: '85vh', paddingTop: '100px', paddingBottom: '40px' }}>
        <div className="text-center max-w-[900px] mx-auto">

          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ display: 'inline-block', fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#00E0CC', marginBottom: '32px' }}
          >
            Real-Time Sales Interview Coaching
          </motion.span>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-heading font-bold mb-3"
            style={{ fontSize: 'clamp(32px, 7vw, 64px)', lineHeight: 1.05, letterSpacing: '-0.035em', color: '#EDF2F7' }}
          >
            The World&apos;s Most Advanced Interview Copilot.
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-heading font-bold mb-8"
            style={{ fontSize: 'clamp(32px, 7vw, 64px)', lineHeight: 1.05, letterSpacing: '-0.035em', color: '#00E0CC' }}
          >
            Built for Closers. By a Closer.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            style={{ fontSize: 'clamp(16px, 3.5vw, 19px)', lineHeight: 1.7, color: '#8B9BB4', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '40px' }}
          >
            The engineers built every other AI copilot. A President&apos;s Club AE built this one.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <a href="#start" className="inline-block font-semibold transition-all duration-200"
              style={{ padding: '16px 36px', borderRadius: '10px', background: 'rgba(0,224,204,0.15)', border: '1px solid rgba(0,224,204,0.35)', color: '#00E0CC', fontSize: '15px', textDecoration: 'none' }}>
              Start Your Free Practice Interview &rarr;
            </a>
          </motion.div>

          {/* Micro-proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2"
            style={{ fontSize: '12px', color: '#5A6A82' }}
          >
            <span>Built by a 2x President&rsquo;s Club AE</span>
            <span>Used on Real Interviews</span>
            <span>Runs Locally &mdash; No Lag</span>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none z-20"
        style={{ background: 'linear-gradient(to bottom, transparent, #0B0D12)' }} />
    </section>
  )
}
