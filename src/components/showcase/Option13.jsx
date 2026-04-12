// OPTION 13: "Structural Blueprint" — all failures appear at once as noise wall, dim+blur, SAY THIS extracts signal
import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { stats, attempts, answer, closingLine } from './shared'

export default function Option13() {
  const ref = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const sp = useSpring(p, { stiffness: 100, damping: 30 })

  const statsOpacity = useTransform(sp, [0, 0.08, 0.15], [0, 1, 0])
  const statsScale = useTransform(sp, [0.08, 0.15], [1, 0.9])

  // All 4 failures appear at once as a wall
  const wallOpacity = useTransform(sp, [0.15, 0.25, 0.45, 0.55], [0, 1, 1, 0.08])
  const wallBlur = useTransform(sp, [0.45, 0.55], [0, 10])

  // Label
  const labelOp = useTransform(sp, [0.18, 0.25, 0.42, 0.48], [0, 0.6, 0.6, 0])

  // SAY THIS rises
  const cardY = useTransform(sp, [0.58, 0.72], [60, 0])
  const cardOpacity = useTransform(sp, [0.58, 0.72], [0, 1])
  const closingOp = useTransform(sp, [0.85, 0.92], [0, 1])

  return (
    <section ref={ref} style={{ height: '400vh' }}>
      <div className="sticky top-[52px] h-[calc(100vh-52px)] flex items-center justify-center px-5 overflow-hidden">
        <div className="w-full max-w-[520px] relative">

          {/* Stats flash */}
          <motion.div style={{ opacity: statsOpacity, scale: statsScale }}
            className="absolute inset-0 flex flex-wrap justify-center items-center gap-8">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <p className="font-heading font-bold text-[36px] sm:text-[44px] text-teal tracking-tight">{s.value}</p>
                <p className="text-[9px] text-text-tertiary/40 uppercase tracking-wider mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Noise wall — all 4 at once */}
          <motion.div style={{ opacity: wallOpacity, filter: useTransform(wallBlur, b => `blur(${b}px)`) }}
            className="absolute inset-0 flex flex-col justify-center gap-3">
            <motion.p style={{ opacity: labelOp }} className="text-[9px] text-red-soft/40 uppercase tracking-wider text-center mb-1">
              The Interview Disconnect
            </motion.p>
            {attempts.map((a, i) => (
              <div key={i} className="bg-[#111825]/50 border border-border/10 rounded-lg px-4 py-3">
                <p className="text-[12px] text-text-tertiary/50 italic leading-[1.6]">&ldquo;{a}&rdquo;</p>
              </div>
            ))}
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
