import { useRef, useState, useEffect } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'

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
  Scroll zones (400vh total):

  0.00–0.08  Thesis + source card fade in
  0.08–0.12  Question appears

  0.12–0.18  TRIGGER: Attempt 1 types in
  0.18–0.24  HOLD: Attempt 1 static, readable

  0.24–0.30  TRIGGER: Attempt 2 types in
  0.30–0.36  HOLD: 1+2 static, readable

  0.36–0.42  TRIGGER: Attempt 3 types in
  0.42–0.48  HOLD: 1+2+3 static, readable

  0.48–0.54  TRIGGER: Attempt 4 types in
  0.54–0.62  HOLD: All 4 static, readable

  0.62–0.70  Transition — failed attempts fade
  0.70–0.90  SAY THIS card
  0.90–1.00  Closing line
*/

const triggers = [0.12, 0.24, 0.36, 0.48]

function useFixedTyping(text, shouldStart) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const startedRef = useRef(false)

  useEffect(() => {
    if (shouldStart && !startedRef.current) {
      startedRef.current = true
      setDisplayed('')
      let i = 0
      const interval = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, 22)
      return () => clearInterval(interval)
    }
  }, [shouldStart, text])

  return { displayed, done, typing: startedRef.current && !done }
}

export default function TypingStruggle() {
  const ref = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [pr, setPr] = useState(0)
  useMotionValueEvent(p, 'change', setPr)

  const a0 = useFixedTyping(attempts[0], pr > triggers[0])
  const a1 = useFixedTyping(attempts[1], pr > triggers[1])
  const a2 = useFixedTyping(attempts[2], pr > triggers[2])
  const a3 = useFixedTyping(attempts[3], pr > triggers[3])

  const typingStates = [a0, a1, a2, a3]
  const showGoodOutput = pr > 0.70
  const showClosing = pr > 0.90

  return (
    <section ref={ref} className="relative" style={{ height: '400vh' }}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-5 overflow-hidden">
        <div className="w-full max-w-[500px]">

          {/* Thesis */}
          <p className="text-[14px] sm:text-[16px] text-text-primary/60 font-medium text-center mb-8 transition-opacity duration-700"
            style={{ opacity: pr > 0.03 && pr < 0.65 ? 1 : 0 }}>
            You&apos;re not bad at interviewing. You&apos;re bad at translating.
          </p>

          {/* Source card */}
          <div className="bg-[#111825] border border-[#1a2030] rounded-lg px-4 py-3 mb-6 transition-all duration-500"
            style={{ opacity: pr > 0.04 ? 1 : 0, transform: pr > 0.10 ? 'scale(0.92)' : 'scale(1)', transformOrigin: 'top center' }}>
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

          {/* Question */}
          <div className="transition-opacity duration-500 mb-2"
            style={{ opacity: pr > 0.08 && !showGoodOutput ? 0.5 : 0 }}>
            <p className="text-[12px] sm:text-[13px] text-text-tertiary/35 italic">&ldquo;{question}&rdquo;</p>
          </div>

          {/* Stream line */}
          <div className="flex justify-center mb-3 transition-opacity duration-300"
            style={{ opacity: pr > 0.10 && !showGoodOutput ? 0.3 : 0 }}>
            <div className="w-px h-5 bg-text-tertiary/20" />
          </div>

          {/* Failed attempts — one at a time, then all 4 snap in */}
          <div className="transition-all duration-500"
            style={{ opacity: pr > 0.11 && !showGoodOutput ? 1 : 0, maxHeight: !showGoodOutput ? 700 : 0, overflow: 'hidden' }}>
            <p className="text-[10px] sm:text-[11px] text-red-soft/50 uppercase tracking-wider mb-3">Without Interview Coach</p>

            {allDone ? (
              /* All 4 visible at once after the last one finishes */
              <div className="space-y-2 mb-4">
                {attempts.map((text, i) => (
                  <div key={i} className="border-l-2 border-red-soft/20 bg-red-dim/10 rounded-r-lg px-4 py-2.5">
                    <p className="text-[13px] sm:text-[15px] leading-[1.5] text-text-primary/30 line-through decoration-red-soft/20">{text}</p>
                  </div>
                ))}
              </div>
            ) : (
              /* Show only the current one typing */
              <div className="mb-4">
                {typingStates.map((a, i) => {
                  // Only show the one currently typing or the last one that just finished (before next starts)
                  const isCurrentlyTyping = a.typing
                  const justFinished = a.done && (i === 3 || !typingStates[i + 1].displayed)
                  if (!isCurrentlyTyping && !justFinished) return null
                  return (
                    <div key={i} className="border-l-2 border-red-soft/30 bg-red-dim/20 rounded-r-lg px-4 py-2.5">
                      <p className="text-text-primary/60 text-[14px] sm:text-[16px] leading-[1.6]">
                        {a.displayed}
                        {a.typing && (
                          <span className="inline-block w-[2px] h-[1em] ml-[1px] align-middle bg-text-tertiary/60 animate-pulse" />
                        )}
                      </p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* SAY THIS card */}
          <div className="transition-all duration-700"
            style={{ opacity: showGoodOutput ? 1 : 0, transform: showGoodOutput ? 'translateY(0)' : 'translateY(20px)' }}>
            <p className="text-[10px] sm:text-[11px] text-teal/50 uppercase tracking-wider mb-2">With Interview Coach</p>
            <div className="border-l-[3px] border-teal/60 bg-[#111825] rounded-r-xl p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-teal" />
                <span className="text-[10px] sm:text-[11px] text-text-tertiary/50 uppercase tracking-wider font-medium">Say This</span>
                <span className="text-[9px] sm:text-[10px] text-teal/40 ml-auto">&lt; 500ms</span>
              </div>
              <p className="text-text-secondary text-[15px] sm:text-[17px] leading-[1.7]">{answer}</p>
            </div>
            <div className="mt-8 text-center transition-opacity duration-700" style={{ opacity: showClosing ? 1 : 0 }}>
              <p className="text-[14px] sm:text-[16px] text-text-primary/60 font-medium">Same track record. Now they hear it.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
