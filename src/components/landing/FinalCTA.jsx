import { motion } from 'framer-motion'
import ElectricText from '../ElectricText'
import { GlowButton } from './ScrollAnimations'

export default function FinalCTA() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle ambient glow — calmer than hero, focused on conversion */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-[0.06] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7c6aef 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-[700px] mx-auto text-center px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading font-bold text-[32px] sm:text-[42px] md:text-[52px] leading-[1.1] tracking-[-0.035em] text-text-primary mb-3">
            Your Next Role Is a Six-Figure Deal.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="mb-8"
        >
          <ElectricText text="Close It Like One." className="flex justify-center" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="text-text-secondary/60 text-[17px] leading-[1.7] max-w-[500px] mx-auto mb-12"
        >
          Your stories. Your metrics. Your frameworks. On screen before you need them.
          Built by someone who&apos;s been in the chair.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <GlowButton href="#start">
            Start Your Free Practice Interview &rarr;
          </GlowButton>
          <a
            href="#how-it-works"
            className="text-text-tertiary/50 hover:text-text-secondary text-[14px] transition-colors duration-300"
          >
            See How the Engine Works &rarr;
          </a>
        </motion.div>
      </div>
    </section>
  )
}
