import { motion } from 'framer-motion'
import ConstellationCanvas from '../ConstellationCanvas'
import ElectricText from '../ElectricText'
import { GlowButton } from './ScrollAnimations'

export default function LandingHero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* One signature background — constellation particles */}
      <div className="absolute inset-0 opacity-50">
        <ConstellationCanvas />
      </div>

      {/* Subtle ambient glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full opacity-[0.07] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7c6aef 0%, transparent 70%)' }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-6">
        <div className="text-center max-w-[900px] mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block text-[11px] uppercase tracking-[0.25em] font-medium text-accent/60 mb-8"
          >
            Real-Time Sales Interview Coaching
          </motion.span>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <h1 className="font-heading font-bold text-[38px] sm:text-[52px] md:text-[64px] lg:text-[72px] leading-[1.05] tracking-[-0.035em] text-text-primary mb-3">
              You Prepped for 6 Hours.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="mb-3"
          >
            <ElectricText text="You Still Blanked" className="flex justify-center" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.6 }}
            className="font-heading font-bold text-[38px] sm:text-[52px] md:text-[64px] lg:text-[72px] leading-[1.05] tracking-[-0.035em] text-text-primary mb-8"
          >
            on Your Biggest Deal.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.0 }}
            className="text-text-secondary text-[17px] sm:text-[19px] leading-[1.7] max-w-[600px] mx-auto mb-10"
          >
            Interview Coach surfaces your stories, your metrics, and your proof points the moment a
            question lands &mdash; so your best answers show up before you start stalling.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.3 }}
          >
            <GlowButton href="#start">
              Start Your Free Practice Interview &rarr;
            </GlowButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.6 }}
            className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-2 text-[12px] text-text-tertiary/60"
          >
            <span>Built by a 2x President&rsquo;s Club AE</span>
            <span>Used on Real Interviews</span>
            <span>Runs Locally &mdash; No Lag</span>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient into cinematic demo */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-20"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--color-bg))' }}
      />
    </section>
  )
}
