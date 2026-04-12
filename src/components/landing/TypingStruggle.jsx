// Phase State Machine — discrete scroll phases, AnimatePresence handles transitions
import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion'

const stats = [
  { label: 'Quota Attainment', value: '124%' },
  { label: 'ACV', value: '$225K' },
  { label: "President's Club", value: '2x' },
  { label: 'Pipeline in Q3', value: '$3.2M' },
]

const question = "Walk me through your biggest competitive displacement."

const attempts = [
  "So we were up against the incumbent — they'd been in there for years — and I basically had to find a way to...",
  "It was a solid displacement, like two-and-a-quarter maybe, and the key was getting to the right people, the, uh...",
  "My biggest one was this account where they were locked in with [competitor] and I started by going to the ops team — or actually, I think I went to finance first and then...",
  "Yeah so this was a — it was a long cycle, like seven months? And the incumbent had all the relationships so I had to kind of build from scratch, which meant...",
]

const answer = "Displaced an 8-year incumbent. $225K ACV, 7-month cycle. They had relationships at every level — I had zero. Started with the ops director, who was living with the pain daily. Mapped his priorities back to a business case, got finance aligned on the ROI, then used both of them to get 30 minutes with the CFO. Ran a structured eval, controlled the criteria, three-year commitment on the close. 124% to quota that year."

/*
  Scroll → discrete phases via useTransform:
  0: nothing
  1: source card + thesis
  2: attempt 1 (alone)
  3: attempt 2 (alone)
  4: attempt 3 (alone)
  5: all 4 stacked
  6: SAY THIS card
*/

export default function TypingStruggle() {
  const ref = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const activePhase = useTransform(p,
    [0, 0.05, 0.13, 0.23, 0.33, 0.43, 0.55, 0.67, 0.80, 1],
    [0, 1,    2,    3,    4,    5,    6,    7,    7,    7]
  )

  const [phase, setPhase] = useState(0)
  useMotionValueEvent(activePhase, 'change', (v) => setPhase(Math.round(v)))

  return (
    <section ref={ref} className="relative" style={{ height: '500vh' }}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-5 overflow-hidden">
        <div className="w-full max-w-[480px]">

          {/* Thesis */}
          <motion.p
            animate={{ opacity: phase >= 1 && phase <= 6 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="text-[14px] sm:text-[16px] text-text-primary/60 font-medium text-center mb-8"
          >
            You&apos;re not bad at interviewing. You&apos;re bad at translating.
          </motion.p>

          {/* Source card */}
          <motion.div
            animate={{
              opacity: phase >= 1 ? 1 : 0,
              scale: phase >= 2 ? 0.90 : 1,
              y: phase >= 2 ? -16 : 0,
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="bg-[#111825] border border-[#1a2030] rounded-lg px-4 py-3 mb-6 origin-top"
          >
            <p className="text-[10px] sm:text-[11px] text-text-tertiary/40 uppercase tracking-wider mb-2">Your Track Record</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              {stats.map((s, i) => (
                <span key={i} className="text-[12px] sm:text-[13px]">
                  <span className="font-bold text-teal">{s.value}</span>
                  <span className="text-text-tertiary/40 ml-1.5">{s.label}</span>
                </span>
              ))}
            </div>
          </motion.div>

          {/* Question */}
          <motion.p
            animate={{ opacity: phase >= 2 && phase <= 6 ? 0.45 : 0 }}
            transition={{ duration: 0.4 }}
            className="text-[12px] sm:text-[13px] text-text-tertiary/60 italic mb-5"
          >
            &ldquo;{question}&rdquo;
          </motion.p>

          {/* Central zone — AnimatePresence swaps cleanly */}
          <div className="relative min-h-[240px]">
            <AnimatePresence mode="wait">

              {/* Phases 2-4: one attempt at a time */}
              {phase >= 2 && phase <= 5 && (
                <motion.div
                  key={`attempt-${phase}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-[10px] sm:text-[11px] text-red-soft/70 uppercase tracking-wider mb-2">Without Interview Coach</p>
                  <div className="border-l-2 border-red-soft/40 bg-red-dim/20 rounded-r-lg px-4 sm:px-5 py-3 sm:py-4">
                    <p className="text-text-primary/75 text-[15px] sm:text-[17px] leading-[1.6] italic">{attempts[phase - 2]}</p>
                  </div>
                </motion.div>
              )}

              {/* Phase 5: all 4 stacked */}
              {phase === 6 && (
                <motion.div
                  key="all-failed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-[10px] sm:text-[11px] text-red-soft/70 uppercase tracking-wider mb-2">Without Interview Coach</p>
                  <div className="space-y-2">
                    {attempts.map((a, i) => (
                      <div key={i} className="border-l-2 border-red-soft/25 bg-red-dim/12 rounded-r-lg px-3 sm:px-4 py-2 sm:py-2.5">
                        <p className="text-[12px] sm:text-[13px] text-text-primary/50 line-through decoration-red-soft/30 italic leading-[1.5]">{a}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Phase 6: SAY THIS */}
              {phase === 7 && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  <p className="text-[10px] sm:text-[11px] text-teal/50 uppercase tracking-wider mb-2">With Interview Coach</p>
                  <div className="border-l-[3px] border-teal/60 bg-[#111825] rounded-r-xl p-5 sm:p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2 h-2 rounded-full bg-teal" />
                      <span className="text-[10px] sm:text-[11px] text-text-tertiary/50 uppercase tracking-wider font-medium">Say This</span>
                      <span className="text-[9px] sm:text-[10px] text-teal/40 ml-auto">&lt; 500ms</span>
                    </div>
                    <p className="text-text-secondary text-[15px] sm:text-[17px] leading-[1.7]">{answer}</p>
                  </div>
                  <p className="mt-8 text-center text-[14px] sm:text-[16px] text-text-primary/60 font-medium">
                    Same track record. Now they hear it.
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
