// OPTION 11: "Signal-to-Noise" — stats crisp, failed attempts crowd in as noise, scan bar clears to SAY THIS
import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { stats, attempts, answer, closingLine } from './shared'

export default function Option11() {
  const ref = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const sp = useSpring(p, { stiffness: 120, damping: 30 })

  const statsOpacity = useTransform(sp, [0, 0.08, 0.15, 0.25], [0, 1, 1, 0.15])
  const statsScale = useTransform(sp, [0.15, 0.25], [1, 0.85])

  // Noise cards drift in
  const noiseOpacity = useTransform(sp, [0.18, 0.28, 0.50, 0.58], [0, 0.8, 0.8, 0.1])
  const noiseBlur = useTransform(sp, [0.50, 0.60], [0, 10])

  // Scan bar
  const scanY = useTransform(sp, [0.50, 0.65], ['-100%', '100%'])
  const scanOpacity = useTransform(sp, [0.50, 0.55, 0.62, 0.65], [0, 1, 1, 0])

  // SAY THIS
  const cardOpacity = useTransform(sp, [0.65, 0.75], [0, 1])
  const cardY = useTransform(sp, [0.65, 0.75], [40, 0])
  const closingOp = useTransform(sp, [0.85, 0.92], [0, 1])

  return (
    <section ref={ref} style={{ height: '400vh' }}>
      <div className="sticky top-[52px] h-[calc(100vh-52px)] flex items-center justify-center px-5 overflow-hidden">
        <div className="w-full max-w-[500px] relative">

          {/* Stats — crisp center */}
          <motion.div style={{ opacity: statsOpacity, scale: statsScale }} className="absolute inset-0 flex flex-wrap justify-center items-center gap-6">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <p className="font-heading font-bold text-[32px] text-teal">{s.value}</p>
                <p className="text-[9px] text-text-tertiary/40 uppercase tracking-wider mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Noise — failed attempts crowd in */}
          <motion.div style={{ opacity: noiseOpacity, filter: useTransform(noiseBlur, b => `blur(${b}px)`) }}
            className="absolute inset-0 flex flex-col justify-center gap-3 px-2">
            <p className="text-[9px] text-red-soft/40 uppercase tracking-wider text-center mb-2">Without Interview Coach</p>
            {attempts.map((a, i) => (
              <div key={i} className="bg-red-dim/15 border border-red-soft/10 rounded-lg px-3 py-2.5"
                style={{ transform: `rotate(${(i - 1.5) * 1.5}deg) translateX(${(i % 2 === 0 ? -1 : 1) * 8}px)` }}>
                <p className="text-[12px] text-text-primary/40 italic leading-[1.5]">{a}</p>
              </div>
            ))}
          </motion.div>

          {/* Scan bar */}
          <motion.div style={{ y: scanY, opacity: scanOpacity }}
            className="absolute left-0 right-0 h-[2px]" >
            <div style={{ background: 'linear-gradient(90deg, transparent, rgba(78,205,196,0.6), transparent)' }} className="h-full" />
          </motion.div>

          {/* SAY THIS */}
          <motion.div style={{ opacity: cardOpacity, y: cardY }} className="relative z-10">
            <p className="text-[10px] text-teal/50 uppercase tracking-wider mb-2">With Interview Coach</p>
            <div className="border-l-[3px] border-teal/60 bg-[#111825] rounded-r-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-teal" />
                <span className="text-[10px] text-text-tertiary/50 uppercase tracking-wider font-medium">Say This</span>
                <span className="text-[9px] text-teal/40 ml-auto">&lt; 500ms</span>
              </div>
              <p className="text-text-secondary text-[15px] leading-[1.7]">{answer}</p>
            </div>
            <motion.p style={{ opacity: closingOp }} className="mt-6 text-center text-[14px] text-text-primary/60 font-medium">
              {closingLine[0]} {closingLine[1]}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
