// OPTION 10: "The Split Self" — top half compresses as bottom half grows
import { useRef, useState } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import { stats, question, answer, closingLine, getTypingState } from './shared'

export default function Option10() {
  const ref = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [pr, setPr] = useState(0)
  useMotionValueEvent(p, 'change', setPr)

  // Split: top starts at 100%, bottom at 0%. At pr=0.55, top is 15%, bottom is 85%.
  const splitProgress = Math.max(0, Math.min(1, (pr - 0.15) / 0.40))
  const topPct = 100 - splitProgress * 85
  const bottomPct = splitProgress * 85

  const { text, cursor, phase } = getTypingState(pr, 0.30, 0.60)
  const showCard = pr > 0.72
  const showClosing = pr > 0.88

  return (
    <section ref={ref} style={{ height: '300vh' }}>
      <div className="sticky top-[52px] h-[calc(100vh-52px)] flex flex-col overflow-hidden">

        {showCard ? (
          /* SAY THIS card — full viewport */
          <div className="flex-1 flex items-center justify-center px-5">
            <div className="w-full max-w-[500px] transition-all duration-700" style={{ opacity: showCard ? 1 : 0, transform: showCard ? 'translateY(0)' : 'translateY(24px)' }}>
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
        ) : (
          <>
            {/* TOP: Track Record — compresses */}
            <div className="overflow-hidden flex items-center justify-center px-5 border-b border-teal/10 transition-all duration-200"
              style={{ height: `${topPct}%`, minHeight: topPct > 20 ? 'auto' : 40 }}>
              <div className="w-full max-w-[500px]">
                {topPct > 50 && <p className="text-[10px] text-text-tertiary/40 uppercase tracking-[0.2em] mb-3 transition-opacity duration-300">The Track Record</p>}
                <div className={topPct > 50 ? 'grid grid-cols-2 gap-3' : 'flex flex-wrap gap-x-4 gap-y-0 justify-center'}>
                  {stats.map((s, i) => (
                    <div key={i} className="transition-all duration-300" style={{ opacity: pr > 0.05 + i * 0.03 ? 1 : 0 }}>
                      <span className="font-heading font-bold text-teal transition-all duration-300"
                        style={{ fontSize: topPct > 50 ? '28px' : '14px' }}>{s.value}</span>
                      <span className="text-text-tertiary/40 uppercase tracking-wider ml-1 transition-all duration-300"
                        style={{ fontSize: topPct > 50 ? '10px' : '8px' }}>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* BOTTOM: Interview — grows */}
            <div className="overflow-hidden flex items-start justify-center px-5 pt-4 transition-all duration-200"
              style={{ height: `${bottomPct}%`, opacity: bottomPct > 5 ? 1 : 0, background: 'rgba(11,13,18,0.5)' }}>
              <div className="w-full max-w-[500px]">
                <p className="text-[11px] text-text-tertiary/40 uppercase tracking-wider mb-1">Final Round · VP of Sales</p>
                <p className="text-[12px] text-text-tertiary/30 italic mb-3">&ldquo;{question}&rdquo;</p>
                <div className="min-h-[60px]">
                  <p className="font-heading text-[18px] sm:text-[24px] leading-[1.5] text-text-primary/70">
                    {text}{cursor && <span className="inline-block w-[2px] h-[1em] ml-[1px] align-middle" style={{ backgroundColor: phase === 'deleting' ? 'var(--color-red-soft)' : 'var(--color-text-tertiary)' }} />}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
