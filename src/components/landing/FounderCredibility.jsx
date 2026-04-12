import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { CountUp } from './ScrollAnimations'

const stats = [
  { label: "President's Club", value: 2, suffix: 'x', color: '#7c6aef' },
  { label: 'Quota Attainment', value: 124, suffix: '%', color: '#5b8def' },
  { label: 'Annual Targets', value: 1.5, prefix: '$', suffix: 'M', decimals: 1, color: '#4ecdc4' },
  { label: 'Build Time', value: 125, suffix: ' hrs', color: '#5bbf72' },
]

export default function FounderCredibility() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-24 md:py-32 px-6 bg-surface-1/30 relative overflow-hidden">
      <div className="max-w-[720px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="block text-[11px] uppercase tracking-[0.25em] font-medium text-accent/60 mb-3">
            Built in the Arena
          </span>
          <h2 className="font-heading font-bold text-[28px] sm:text-[36px] md:text-[42px] leading-[1.1] tracking-[-0.03em] text-text-primary mb-10">
            Built During a Real Job Search.{' '}
            <span className="text-accent">Used on Real Interviews.</span>
          </h2>
        </motion.div>

        {/* Quote — frosted glass */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-10"
        >
          <div className="bg-surface-1/80 border border-border/20 rounded-xl p-8">
            <div className="border-l-2 border-accent/30 pl-6">
              <p className="text-text-secondary/80 text-[16px] leading-[1.8] italic">
                &ldquo;I built Interview Coach because I needed it. I was in an active job search
                and I kept losing 10% of my sharpness to recall failures. I built the first version
                in a week. I used it on every interview after that. I got the offer I wanted. This
                isn&apos;t a product I imagined would be useful. It&apos;s the product I used.&rdquo;
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats with CountUp */}
        <div ref={ref} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-surface-2/40 backdrop-blur border border-border/15 rounded-xl p-5 text-center"
            >
              {isInView ? (
                <CountUp
                  end={stat.value}
                  prefix={stat.prefix || ''}
                  suffix={stat.suffix}
                  decimals={stat.decimals || 0}
                  duration={2}
                  className="font-heading font-bold text-[26px] block"
                  style={{ color: stat.color }}
                />
              ) : (
                <span className="font-heading font-bold text-[26px] block" style={{ color: stat.color }}>
                  0
                </span>
              )}
              <p className="text-[10px] text-text-tertiary/50 mt-1.5 uppercase tracking-wider">
                {stat.label}
              </p>

              {/* Glow pulse on complete */}
              {isInView && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.15, 0] }}
                  transition={{ delay: 2 + i * 0.1, duration: 0.8 }}
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${stat.color}30, transparent)` }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
