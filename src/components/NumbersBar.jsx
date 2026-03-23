import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FadeIn, SectionTitle } from './AnimatedSection'

const numbers = [
  { value: '$1.5M', label: 'Annual Quota', prefix: '$', number: 1.5, suffix: 'M', decimals: 1 },
  { value: '124%', label: 'Avg Attainment', prefix: '', number: 124, suffix: '%', decimals: 0 },
  { value: '$435K', label: 'Largest Deal', prefix: '$', number: 435, suffix: 'K', decimals: 0 },
  { value: '3.5-5x', label: 'Pipeline Coverage', animated: false },
  { value: '60%+', label: 'Self-Sourced Pipeline', prefix: '', number: 60, suffix: '%+', decimals: 0 },
  { value: '$130K+', label: 'Avg Deal Size', prefix: '$', number: 130, suffix: 'K+', decimals: 0 },
]

function AnimatedNumber({ prefix = '', number, suffix = '', decimals = 0, animated = true, value }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(animated ? `${prefix}0${suffix}` : value)

  useEffect(() => {
    if (!isInView || !animated) return

    const duration = 1400
    const startTime = performance.now()
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4)

    function tick(now) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutQuart(progress)
      const current = easedProgress * number

      if (decimals > 0) {
        setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`)
      } else {
        setDisplay(`${prefix}${Math.round(current)}${suffix}`)
      }

      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }

    requestAnimationFrame(tick)
  }, [isInView, animated, number, prefix, suffix, decimals])

  return (
    <span ref={ref}>{display}</span>
  )
}

export default function NumbersBar() {
  return (
    <section id="numbers" className="bg-surface-1 border-b border-border py-16 md:py-20 px-6">
      <div className="max-w-[860px] mx-auto">
        <div className="text-center mb-10">
          <div className="text-[11px] uppercase tracking-[0.2em] font-medium text-accent mb-3">Stats</div>
          <h2 className="font-heading text-[26px] md:text-[32px] font-semibold tracking-[-0.03em] text-text-primary">By the Numbers</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
          {numbers.map((item, i) => (
            <FadeIn key={item.label} delay={i * 0.08}>
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="font-heading text-accent text-[28px] md:text-[34px] font-semibold tracking-[-0.03em] leading-none tabular-nums">
                  <AnimatedNumber
                    prefix={item.prefix}
                    number={item.number}
                    suffix={item.suffix}
                    decimals={item.decimals}
                    animated={item.animated !== false}
                    value={item.value}
                  />
                </div>
                <div className="text-[10px] md:text-[11px] uppercase tracking-[0.15em] text-text-tertiary mt-2 font-medium">
                  {item.label}
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
