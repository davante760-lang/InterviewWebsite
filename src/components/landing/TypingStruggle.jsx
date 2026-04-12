// "Same Person / Two Outputs" — source card stays pinned, emits bad then good translation
import { useRef, useState } from 'react'
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

// Returns which attempts are visible and how much of the current one is typed
function getStackState(progress, startAt, endAt) {
  if (progress < startAt) return { lines: [], typingIndex: -1, typingText: '', cursor: false }
  if (progress > endAt) return { lines: attempts.map((a) => a), typingIndex: -1, typingText: '', cursor: false }

  const span = endAt - startAt
  const local = (progress - startAt) / span

  const lines = []
  let typingIndex = -1
  let typingText = ''
  let cursor = false

  for (let i = 0; i < attempts.length; i++) {
    const aStart = i / attempts.length
    const typeEnd = aStart + 0.8 / attempts.length

    if (local >= typeEnd) {
      // Fully typed — stays in the stack
      lines.push(attempts[i])
    } else if (local >= aStart) {
      // Currently typing
      const frac = (local - aStart) / (typeEnd - aStart)
      typingIndex = i
      typingText = attempts[i].slice(0, Math.floor(frac * attempts[i].length))
      cursor = true
      break
    } else {
      break
    }
  }

  return { lines, typingIndex, typingText, cursor }
}

export default function TypingStruggle() {
  const ref = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [pr, setPr] = useState(0)
  useMotionValueEvent(p, 'change', setPr)

  const { lines, typingIndex, typingText, cursor } = getStackState(pr, 0.28, 0.55)
  const showBadOutput = pr > 0.26 && pr < 0.62
  const showGoodOutput = pr > 0.65
  const showClosing = pr > 0.88

  return (
    <section ref={ref} className="relative" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-5 overflow-hidden">
        <div className="w-full max-w-[500px]">

          {/* Thesis statement */}
          <p className="text-[14px] sm:text-[16px] text-text-primary/60 font-medium text-center mb-8 transition-opacity duration-700"
            style={{ opacity: pr > 0.03 && pr < 0.62 ? 1 : 0 }}>
            You&apos;re not bad at interviewing. You&apos;re bad at translating.
          </p>

          {/* Source card — your real track record */}
          <div className="bg-[#111825] border border-[#1a2030] rounded-lg px-4 py-3 mb-6 transition-all duration-500"
            style={{ opacity: pr > 0.05 ? 1 : 0, transform: pr > 0.25 ? 'scale(0.92)' : 'scale(1)', transformOrigin: 'top center' }}>
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

          {/* Interview question */}
          <div className="transition-opacity duration-500 mb-2" style={{ opacity: pr > 0.20 && !showGoodOutput ? 0.5 : 0 }}>
            <p className="text-[12px] sm:text-[13px] text-text-tertiary/35 italic">&ldquo;{question}&rdquo;</p>
          </div>

          {/* Translation stream line */}
          <div className="flex justify-center mb-4 transition-opacity duration-300"
            style={{ opacity: pr > 0.23 ? 0.3 : 0 }}>
            <div className="w-px h-6 bg-text-tertiary/20" />
          </div>

          {/* Bad translation — stacked failed attempts */}
          <div className="transition-all duration-500"
            style={{ opacity: showBadOutput ? 1 : 0, maxHeight: showBadOutput ? 500 : 0, overflow: 'hidden' }}>
            <p className="text-[10px] sm:text-[11px] text-red-soft/50 uppercase tracking-wider mb-2">Without Interview Coach</p>
            <div className="space-y-2 mb-4">
              {/* Completed attempts — stay stacked */}
              {lines.map((line, i) => (
                <div key={i} className="border-l-2 border-red-soft/20 bg-red-dim/10 rounded-r-lg px-4 py-2.5">
                  <p className="text-text-primary/40 text-[13px] sm:text-[15px] leading-[1.5] line-through decoration-red-soft/20">{line}</p>
                </div>
              ))}
              {/* Currently typing attempt */}
              {typingIndex >= 0 && (
                <div className="border-l-2 border-red-soft/30 bg-red-dim/20 rounded-r-lg px-4 py-2.5">
                  <p className="text-text-primary/60 text-[14px] sm:text-[16px] leading-[1.5]">
                    {typingText}
                    {cursor && (
                      <span className="inline-block w-[2px] h-[1em] ml-[1px] align-middle bg-text-tertiary/60" />
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Good translation — with Interview Coach */}
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
