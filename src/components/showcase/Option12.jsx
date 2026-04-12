// OPTION 12: "Defragmentation" — 4 messy cards converge, fuse into teal spark, SAY THIS expands
import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { attempts, answer, stats, closingLine } from './shared'

const offsets = [
  { x: -30, y: -40, r: -6 },
  { x: 25, y: -20, r: 4 },
  { x: -20, y: 30, r: 5 },
  { x: 30, y: 50, r: -3 },
]

export default function Option12() {
  const ref = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const sp = useSpring(p, { stiffness: 120, damping: 30 })

  const converge = useTransform(sp, [0.15, 0.50], [0, 1])
  const cardsOpacity = useTransform(sp, [0.05, 0.15, 0.50, 0.55], [0, 1, 1, 0])
  const sparkOpacity = useTransform(sp, [0.52, 0.56, 0.62, 0.66], [0, 1, 1, 0])
  const sparkScale = useTransform(sp, [0.52, 0.56, 0.62, 0.66], [0, 1.5, 1.5, 0])
  const cardOpacity = useTransform(sp, [0.64, 0.75], [0, 1])
  const cardScale = useTransform(sp, [0.64, 0.75], [0.8, 1])
  const closingOp = useTransform(sp, [0.85, 0.92], [0, 1])

  // Stats
  const statsOp = useTransform(sp, [0, 0.06, 0.12, 0.18], [0, 1, 1, 0.3])

  return (
    <section ref={ref} style={{ height: '400vh' }}>
      <div className="sticky top-[52px] h-[calc(100vh-52px)] flex items-center justify-center px-5 overflow-hidden">
        <div className="w-full max-w-[500px] relative" style={{ minHeight: 400 }}>

          {/* Stats at top */}
          <motion.div style={{ opacity: statsOp }} className="absolute top-0 left-0 right-0 flex flex-wrap justify-center gap-4 mb-6">
            {stats.map((s, i) => (
              <span key={i} className="text-[12px]">
                <span className="font-bold text-teal">{s.value}</span>
                <span className="text-text-tertiary/40 ml-1">{s.label}</span>
              </span>
            ))}
          </motion.div>

          {/* 4 messy cards converging */}
          <motion.div style={{ opacity: cardsOpacity }} className="absolute inset-0 flex items-center justify-center">
            {attempts.map((a, i) => {
              const o = offsets[i]
              return (
                <motion.div key={i}
                  style={{
                    x: useTransform(converge, [0, 1], [o.x, 0]),
                    y: useTransform(converge, [0, 1], [o.y, 0]),
                    rotate: useTransform(converge, [0, 1], [o.r, 0]),
                    scale: useTransform(converge, [0, 1], [1, 0.3]),
                    opacity: useTransform(converge, [0.8, 1], [1, 0.4]),
                  }}
                  className="absolute bg-red-dim/15 border border-red-soft/15 rounded-lg px-4 py-3 max-w-[320px]">
                  <p className="text-[11px] text-text-primary/40 italic leading-[1.5]">{a}</p>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Teal spark */}
          <motion.div style={{ opacity: sparkOpacity, scale: sparkScale }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-4 h-4 rounded-full bg-teal shadow-[0_0_30px_rgba(78,205,196,0.6)]" />
          </motion.div>

          {/* SAY THIS card */}
          <motion.div style={{ opacity: cardOpacity, scale: cardScale }} className="relative z-10 pt-12">
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
