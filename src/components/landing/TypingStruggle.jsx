// "Same Person / Two Outputs" — source card stays pinned, emits bad then good translation
import { useRef, useState } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'

const stats = [
  { label: 'Quota Attainment', value: '124%' },
  { label: 'Avg Deal Size', value: '$823K' },
  { label: "President's Club", value: '2x' },
  { label: 'Pipeline Built', value: '$3.2M' },
]

const question = "Walk me through your biggest competitive win."

const attempts = [
  "I managed a large enterprise territory where I",
  "So there was this deal where we displaced the incumbent and I",
  "My biggest win was probably when we closed — it was like an 800K",
  "The deal was, so basically I had this account where they were with",
]

const answer = "Displaced an 8-year incumbent. $823K deal, 94-day cycle. The challenge was they had relationships everywhere — I had to build my own coalition from scratch. Anchored with the ops team first, got finance aligned, then used that momentum to get in front of the CFO. Three-year commitment on the close."

function getTypingState(progress, startAt, endAt) {
  if (progress < startAt || progress > endAt) return { text: '', cursor: false, phase: 'none' }
  const span = endAt - startAt
  const local = (progress - startAt) / span

  for (let i = 0; i < attempts.length; i++) {
    const aStart = i / attempts.length
    const typeEnd = aStart + 0.6 / attempts.length
    const delStart = aStart + 0.75 / attempts.length
    const delEnd = (i + 1) / attempts.length

    if (local >= aStart && local < typeEnd) {
      const frac = (local - aStart) / (typeEnd - aStart)
      return { text: attempts[i].slice(0, Math.floor(frac * attempts[i].length)), cursor: true, phase: 'typing' }
    }
    if (local >= typeEnd && local < delStart) {
      return { text: attempts[i], cursor: true, phase: 'pause' }
    }
    if (local >= delStart && local < delEnd) {
      const frac = (local - delStart) / (delEnd - delStart)
      const remaining = Math.floor((1 - frac) * attempts[i].length)
      return { text: attempts[i].slice(0, Math.max(0, remaining)), cursor: true, phase: 'deleting' }
    }
  }
  return { text: '', cursor: true, phase: 'empty' }
}

export default function TypingStruggle() {
  const ref = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [pr, setPr] = useState(0)
  useMotionValueEvent(p, 'change', setPr)

  const { text, cursor, phase } = getTypingState(pr, 0.30, 0.55)
  const showBadOutput = pr > 0.28 && pr < 0.62
  const showGoodOutput = pr > 0.65
  const showClosing = pr > 0.88

  return (
    <section ref={ref} className="relative" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-5 overflow-hidden">
        <div className="w-full max-w-[500px]">

          {/* Source card — your real track record, pinned at top */}
          <div className="bg-[#111825] border border-[#1a2030] rounded-lg px-4 py-3 mb-6 transition-all duration-500"
            style={{ opacity: pr > 0.05 ? 1 : 0, transform: pr > 0.25 ? 'scale(0.92)' : 'scale(1)', transformOrigin: 'top center' }}>
            <p className="text-[10px] sm:text-[11px] text-text-tertiary/40 uppercase tracking-wider mb-2">Your Real Track Record</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              {stats.map((s, i) => (
                <span key={i} className="text-[12px] sm:text-[13px]">
                  <span className="font-bold text-teal">{s.value}</span>
                  <span className="text-text-tertiary/40 ml-1.5">{s.label}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Translation stream line */}
          <div className="flex justify-center mb-4 transition-opacity duration-300"
            style={{ opacity: pr > 0.25 ? 0.3 : 0 }}>
            <div className="w-px h-8 bg-text-tertiary/20" />
          </div>

          {/* Bad translation — without Interview Coach */}
          <div className="transition-all duration-500"
            style={{ opacity: showBadOutput ? 1 : 0, maxHeight: showBadOutput ? 250 : 0, overflow: 'hidden' }}>
            <p className="text-[10px] sm:text-[11px] text-red-soft/50 uppercase tracking-wider mb-2">Without Interview Coach</p>
            <div className="border-l-2 border-red-soft/30 bg-red-dim/20 rounded-r-lg px-4 sm:px-5 py-3 sm:py-4 mb-4">
              <div className="min-h-[60px]">
                <p className="text-text-primary/60 text-[15px] sm:text-[17px] leading-[1.6]">
                  {text}
                  {cursor && (
                    <span className="inline-block w-[2px] h-[1em] ml-[1px] align-middle"
                      style={{ backgroundColor: phase === 'deleting' ? 'var(--color-red-soft)' : 'var(--color-text-tertiary)',
                        opacity: phase === 'pause' ? 0.4 : 0.8,
                        animation: phase === 'pause' ? 'pulse 1s ease-in-out infinite' : 'none' }} />
                  )}
                </p>
              </div>
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
              <p className="text-[14px] sm:text-[16px] text-text-tertiary/50">Same source. Better translation.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
