import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { TiltCard, CountUp, GlowButton } from './ScrollAnimations'

const features = [
  'Unlimited live coaching',
  'Unlimited practice sessions',
  'Unlimited active positions',
  'Full Prep Card system with AI generation',
  'Three-tier coaching engine',
  'War Room with stakeholder mapping',
  'Calendar integration & auto-join',
]

export default function Pricing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="pricing" className="py-24 md:py-32 px-6 bg-surface-1/30 relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,106,239,0.06) 0%, transparent 60%)' }}
      />

      <div className="relative z-10 max-w-[520px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="block text-[11px] uppercase tracking-[0.25em] font-medium text-accent/60 mb-3">
            Pricing
          </span>
          <h2 className="font-heading font-bold text-[28px] sm:text-[36px] md:text-[42px] leading-[1.1] tracking-[-0.03em] text-text-primary mb-4">
            Less Than One Hour of the OTE You&apos;re Interviewing For.
          </h2>
          <p className="text-text-secondary/60 text-[15px] leading-[1.7]">
            If your next role pays $250K, that&apos;s $120/hour. One sharper interview is the
            difference between an offer and &ldquo;we went with someone else.&rdquo;
          </p>
        </motion.div>

        <TiltCard className="w-full" maxTilt={3}>
          <div
            ref={ref}
            className="rounded-2xl border border-accent/15 bg-surface-1/95 backdrop-blur-xl p-8 shadow-xl shadow-black/20"
          >
              <p className="font-heading font-bold text-[20px] text-text-primary mb-2">
                Interview Coach
              </p>
              <div className="flex items-baseline gap-1 mb-5">
                <span className="font-heading font-bold text-[48px] tracking-[-0.04em] text-accent">
                  {isInView ? (
                    <CountUp end={99} prefix="$" duration={1.5} className="" />
                  ) : '$0'}
                </span>
                <span className="text-text-tertiary/50 text-[14px]">/month</span>
              </div>
              <p className="text-text-secondary/60 text-[14px] mb-6 border-b border-border/15 pb-6">
                Everything. No tiers. No feature gating.
              </p>

              <ul className="space-y-3 mb-8">
                {features.map((f, i) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, x: -8 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.8 + i * 0.06, duration: 0.3 }}
                    className="flex items-start gap-3 text-[14px] text-text-secondary/70"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ delay: 0.8 + i * 0.06 + 0.1, type: 'spring', stiffness: 300 }}
                      className="text-accent mt-0.5 text-[12px]"
                    >
                      &#10003;
                    </motion.span>
                    {f}
                  </motion.li>
                ))}
              </ul>

              <GlowButton href="#start" className="w-full">
                <span className="block text-center">Start Your Free Practice Interview &rarr;</span>
              </GlowButton>
              <p className="text-text-tertiary/40 text-[11px] mt-4 text-center">
                No credit card required. Cancel anytime.
              </p>
          </div>
        </TiltCard>
      </div>
    </section>
  )
}
