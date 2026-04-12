// OPTION 15: "Phase-Based State Machine" — scroll maps to discrete phases, AnimatePresence handles transitions
import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { stats, attempts, answer, closingLine, question } from './shared'

export default function Option15() {
  const ref = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const activePhase = useTransform(p,
    [0, 0.08, 0.18, 0.30, 0.42, 0.54, 0.66, 0.78, 1],
    [0, 1,    2,    3,    4,    5,    6,    6,   6]
  )

  const [phase, setPhase] = useState(0)
  useMotionValueEvent(activePhase, 'change', (v) => setPhase(Math.round(v)))

  return (
    <section ref={ref} style={{ height: '500vh' }}>
      <div className="sticky top-[52px] h-[calc(100vh-52px)] flex flex-col items-center justify-center px-5 overflow-hidden">
        <div className="w-full max-w-[440px]">

          {/* Source card — always visible, shrinks after phase 0 */}
          <motion.div
            animate={{
              opacity: phase >= 1 ? 1 : phase > 0 ? 1 : 0,
              scale: phase >= 2 ? 0.88 : 1,
              y: phase >= 2 ? -20 : 0,
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="bg-[#111825] border border-[#1a2030] rounded-lg px-4 py-3 mb-6 origin-top"
          >
            <p className="text-[10px] text-text-tertiary/40 uppercase tracking-wider mb-2">Your Track Record</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              {stats.map((s, i) => (
                <span key={i} className="text-[12px]">
                  <span className="font-bold text-teal">{s.value}</span>
                  <span className="text-text-tertiary/40 ml-1.5">{s.label}</span>
                </span>
              ))}
            </div>
          </motion.div>

          {/* Question */}
          <motion.p
            animate={{ opacity: phase >= 2 && phase <= 5 ? 0.4 : 0 }}
            transition={{ duration: 0.4 }}
            className="text-[12px] text-text-tertiary/35 italic mb-4"
          >
            &ldquo;{question}&rdquo;
          </motion.p>

          {/* Central zone — AnimatePresence swaps content cleanly */}
          <div className="relative min-h-[220px]">
            <AnimatePresence mode="wait">

              {/* Phases 2-4: Individual failed attempts — one at a time */}
              {phase >= 2 && phase <= 4 && (
                <motion.div
                  key={`attempt-${phase}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-[9px] text-red-soft/40 uppercase tracking-wider mb-2">Without Interview Coach</p>
                  <div className="border-l-2 border-red-soft/30 bg-red-dim/15 rounded-r-lg px-4 py-3">
                    <p className="text-text-primary/50 text-[14px] sm:text-[16px] leading-[1.6] italic">{attempts[phase - 2]}</p>
                  </div>
                </motion.div>
              )}

              {/* Phase 5: All 4 stacked */}
              {phase === 5 && (
                <motion.div
                  key="all-failed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-[9px] text-red-soft/40 uppercase tracking-wider mb-2">Without Interview Coach</p>
                  <div className="space-y-2">
                    {attempts.map((a, i) => (
                      <div key={i} className="border-l-2 border-red-soft/15 bg-red-dim/8 rounded-r-lg px-3 py-2">
                        <p className="text-[12px] text-text-primary/25 line-through decoration-red-soft/15 italic leading-[1.4]">{a}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Phase 6: SAY THIS */}
              {phase === 6 && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  <p className="text-[10px] text-teal/50 uppercase tracking-wider mb-2">With Interview Coach</p>
                  <div className="border-l-[3px] border-teal/60 bg-[#111825] rounded-r-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2 h-2 rounded-full bg-teal" />
                      <span className="text-[10px] text-text-tertiary/50 uppercase tracking-wider font-medium">Say This</span>
                      <span className="text-[9px] text-teal/40 ml-auto">&lt; 500ms</span>
                    </div>
                    <p className="text-text-secondary text-[15px] leading-[1.7]">{answer}</p>
                  </div>
                  <p className="mt-6 text-center text-[14px] text-text-primary/60 font-medium">
                    {closingLine[0]} {closingLine[1]}
                  </p>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  )
}
