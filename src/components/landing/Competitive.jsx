import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const contrasts = [
  ['Generate answers from scratch', 'Surfaces YOUR answers'],
  ['Take 3–8 seconds', 'Delivers in under 500ms'],
  ['Same format for every question', 'Formats by sales archetype'],
  ['Treat every round the same', 'Adapts by round and company'],
  ['No concept of your pipeline', 'Manages your entire search'],
  ['Built by engineers for engineers', "Built by a President's Club AE for closers"],
]

function ContrastRow({ them, us, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="flex flex-col sm:flex-row gap-3 sm:gap-6 py-5 border-b border-border/15 last:border-0"
    >
      {/* Them — with animated strikethrough */}
      <div className="sm:w-1/2 relative">
        <p className="text-text-tertiary/40 text-[14px] leading-[1.6]">{them}</p>
        {isInView && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: index * 0.08 + 0.2, duration: 0.4, ease: 'easeOut' }}
            className="absolute top-1/2 left-0 right-0 h-[1px] bg-text-tertiary/20 origin-left"
          />
        )}
      </div>

      {/* Us — glows in */}
      <motion.div
        initial={{ opacity: 0, x: 5 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: index * 0.08 + 0.35, duration: 0.4 }}
        className="sm:w-1/2"
      >
        <p className="text-text-primary text-[14px] leading-[1.6] font-medium">
          {us}
        </p>
      </motion.div>
    </motion.div>
  )
}

export default function Competitive() {
  return (
    <section className="py-24 md:py-32 px-6 relative">
      <div className="max-w-[720px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="block text-[11px] uppercase tracking-[0.25em] font-medium text-accent/60 mb-3">
            Why This Is Different
          </span>
          <h2 className="font-heading font-bold text-[28px] sm:text-[36px] md:text-[42px] leading-[1.1] tracking-[-0.03em] text-text-primary mb-6">
            Not Another AI Answer Generator.
          </h2>
          <p className="text-text-secondary/70 text-[16px] leading-[1.7] max-w-[540px] mb-12">
            A VP of Sales can tell when someone is reading a generated response. Interview Coach
            doesn&apos;t write your answers. It organizes them — then puts the right one on screen
            at the right moment.
          </p>
        </motion.div>

        {/* Contrast rows */}
        <div className="mb-10">
          <div className="flex gap-6 mb-3 px-0">
            <span className="text-[10px] uppercase tracking-wider text-text-tertiary/30 sm:w-1/2">Generic Tools</span>
            <span className="text-[10px] uppercase tracking-wider text-accent/50 sm:w-1/2">Interview Coach</span>
          </div>
          {contrasts.map(([them, us], i) => (
            <ContrastRow key={i} them={them} us={us} index={i} />
          ))}
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading font-bold text-[18px] sm:text-[22px] text-text-primary tracking-[-0.02em] text-center"
        >
          Your answers. Your numbers. Your stories.{' '}
          <span className="text-accent">Faster than you could find them yourself.</span>
        </motion.p>
      </div>
    </section>
  )
}
