// OPTION 8: "The Redaction" — stats get blacked out by interview pressure
import { useRef, useState } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import { stats, question, answer, closingLine, getTypingState } from './shared'

export default function Option8() {
  const ref = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [pr, setPr] = useState(0)
  useMotionValueEvent(p, 'change', setPr)

  const scanLine = pr > 0.18 && pr < 0.40 ? ((pr - 0.18) / 0.22) * 100 : pr >= 0.40 ? 100 : 0
  const { text, cursor, phase } = getTypingState(pr, 0.45, 0.68)
  const glitch = pr > 0.62 && pr < 0.72
  const showCard = pr > 0.75
  const showClosing = pr > 0.88

  return (
    <section ref={ref} style={{ height: '300vh' }}>
      <div className="sticky top-[52px] h-[calc(100vh-52px)] flex items-center justify-center px-5 overflow-hidden">
        <div className="w-full max-w-[600px]">
          {/* Stats with redaction */}
          <div className="transition-opacity duration-500 mb-8" style={{ opacity: showCard ? 0 : 1 }}>
            <p className="text-[11px] text-text-tertiary/40 uppercase tracking-[0.2em] mb-6">The Track Record</p>
            <div className="space-y-4">
              {stats.map((s, i) => {
                const redactThreshold = 0.22 + i * 0.06
                const isRedacted = pr > redactThreshold
                const isGlitching = glitch && Math.sin(pr * 200 + i * 50) > 0.3
                return (
                  <div key={i} className="flex items-center gap-3 transition-all duration-500" style={{ opacity: pr > 0.06 + i * 0.04 ? 1 : 0 }}>
                    <div className="relative">
                      <span className="font-heading font-bold text-[28px] sm:text-[36px] text-teal transition-opacity duration-300"
                        style={{ opacity: isRedacted && !isGlitching ? 0 : 1 }}>{s.value}</span>
                      {isRedacted && (
                        <span className="absolute inset-0 flex items-center transition-opacity duration-200"
                          style={{ opacity: isGlitching ? 0 : 1 }}>
                          <span className="bg-text-primary/80 rounded-sm inline-block" style={{ width: `${s.value.length * 18}px`, height: '28px' }} />
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-text-tertiary/40 uppercase tracking-wider">{s.label}</span>
                  </div>
                )
              })}
            </div>

            {/* Scan line */}
            {pr > 0.18 && pr < 0.42 && (
              <div className="absolute left-0 right-0 h-px transition-all" style={{ top: `${scanLine}%`, background: 'linear-gradient(90deg, transparent, rgba(156,165,178,0.3), transparent)' }}>
                <span className="absolute right-4 -top-3 text-[8px] text-text-tertiary/30 uppercase tracking-wider">Final Round Interview — VP of Sales</span>
              </div>
            )}
          </div>

          {/* Typing under redacted stats */}
          <div className="transition-opacity duration-500" style={{ opacity: pr > 0.42 && !showCard ? 1 : 0 }}>
            <p className="text-[12px] text-text-tertiary/35 italic mb-4">&ldquo;{question}&rdquo;</p>
            <div className="min-h-[80px]">
              <p className="font-heading text-[20px] sm:text-[26px] leading-[1.5] text-text-primary/80">
                {text}{cursor && <span className="inline-block w-[2px] h-[1.1em] ml-[2px] align-middle" style={{ backgroundColor: phase === 'deleting' ? 'var(--color-red-soft)' : 'var(--color-text-tertiary)' }} />}
              </p>
            </div>
          </div>

          {/* SAY THIS card */}
          <div className="transition-all duration-700" style={{ opacity: showCard ? 1 : 0, transform: showCard ? 'translateY(0)' : 'translateY(24px)' }}>
            <p className="text-[11px] text-text-tertiary/40 uppercase tracking-[0.2em] mb-4">With Interview Coach</p>
            <div className="border-l-[3px] border-teal/60 bg-[#111825] rounded-r-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-teal" />
                <span className="text-[10px] text-text-tertiary/50 uppercase tracking-wider font-medium">Say This</span>
              </div>
              <p className="text-text-secondary text-[15px] leading-[1.7]">{answer}</p>
            </div>
            <div className="mt-6 text-center transition-opacity duration-700" style={{ opacity: showClosing ? 1 : 0 }}>
              <p className="text-[14px] text-text-tertiary/50">{closingLine[0]}</p>
              <p className="text-[14px] text-text-primary/70 font-medium mt-1">{closingLine[1]}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
