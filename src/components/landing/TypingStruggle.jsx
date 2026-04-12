// Phase State Machine with scroll snap — each phase requires its own scroll gesture
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
  8 snap sections stacked vertically inside a scroll-snap container.
  Each section is 100vh. The browser forces a stop at each one.

  Section 0: Thesis + source card
  Section 1: Attempt 1
  Section 2: Attempt 2
  Section 3: Attempt 3
  Section 4: Attempt 4
  Section 5: All 4 stacked
  Section 6: SAY THIS card
  Section 7: Empty spacer (exit)
*/

function useVisibleSection(containerRef) {
  const [visible, setVisible] = useState(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onScroll = () => {
      const scrollTop = el.scrollTop
      const sectionHeight = el.clientHeight
      const idx = Math.round(scrollTop / sectionHeight)
      setVisible(idx)
    }

    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [containerRef])

  return visible
}

export default function TypingStruggle() {
  const containerRef = useRef(null)
  const phase = useVisibleSection(containerRef)

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-auto"
      style={{ scrollSnapType: 'y mandatory' }}
    >
      {/* Section 0: Thesis + Source card */}
      <div className="h-screen flex flex-col items-center justify-center px-5" style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
        <div className="w-full max-w-[480px]">
          <p className="text-[14px] sm:text-[16px] text-text-primary/60 font-medium text-center mb-8">
            You&apos;re not bad at interviewing. You&apos;re bad at translating.
          </p>
          <div className="bg-[#111825] border border-[#1a2030] rounded-lg px-4 py-3">
            <p className="text-[10px] sm:text-[11px] text-text-tertiary/40 uppercase tracking-wider mb-2">Your Track Record</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              {stats.map((s, i) => (
                <span key={i} className="text-[12px] sm:text-[13px]">
                  <span className="font-bold text-teal">{s.value}</span>
                  <span className="text-text-tertiary/40 ml-1.5">{s.label}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sections 1-4: Individual attempts */}
      {attempts.map((attempt, i) => (
        <div key={i} className="h-screen flex flex-col items-center justify-center px-5" style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
          <div className="w-full max-w-[480px]">
            {/* Shrunk source card */}
            <div className="bg-[#111825] border border-[#1a2030] rounded-lg px-3 py-2 mb-4 scale-[0.88] origin-top-left">
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {stats.map((s, j) => (
                  <span key={j} className="text-[10px]">
                    <span className="font-bold text-teal">{s.value}</span>
                    <span className="text-text-tertiary/40 ml-1">{s.label}</span>
                  </span>
                ))}
              </div>
            </div>

            <p className="text-[12px] sm:text-[13px] text-text-tertiary/60 italic mb-5">
              &ldquo;{question}&rdquo;
            </p>

            <p className="text-[10px] sm:text-[11px] text-red-soft/70 uppercase tracking-wider mb-2">Without Interview Coach</p>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="border-l-2 border-red-soft/40 bg-red-dim/20 rounded-r-lg px-4 sm:px-5 py-3 sm:py-4"
            >
              <p className="text-text-primary/75 text-[15px] sm:text-[17px] leading-[1.6] italic">{attempt}</p>
            </motion.div>
          </div>
        </div>
      ))}

      {/* Section 5: All 4 stacked */}
      <div className="h-screen flex flex-col items-center justify-center px-5" style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
        <div className="w-full max-w-[480px]">
          <div className="bg-[#111825] border border-[#1a2030] rounded-lg px-3 py-2 mb-4 scale-[0.88] origin-top-left">
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {stats.map((s, j) => (
                <span key={j} className="text-[10px]">
                  <span className="font-bold text-teal">{s.value}</span>
                  <span className="text-text-tertiary/40 ml-1">{s.label}</span>
                </span>
              ))}
            </div>
          </div>

          <p className="text-[12px] sm:text-[13px] text-text-tertiary/60 italic mb-5">
            &ldquo;{question}&rdquo;
          </p>

          <p className="text-[10px] sm:text-[11px] text-red-soft/70 uppercase tracking-wider mb-2">Without Interview Coach</p>
          <div className="space-y-2">
            {attempts.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="border-l-2 border-red-soft/25 bg-red-dim/12 rounded-r-lg px-3 sm:px-4 py-2 sm:py-2.5"
              >
                <p className="text-[12px] sm:text-[13px] text-text-primary/50 line-through decoration-red-soft/30 italic leading-[1.5]">{a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 6: SAY THIS */}
      <div className="h-screen flex flex-col items-center justify-center px-5" style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
        <div className="w-full max-w-[480px]">
          <motion.div
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
        </div>
      </div>

      {/* Section 7: Spacer for exit */}
      <div className="h-screen" style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }} />
    </div>
  )
}
