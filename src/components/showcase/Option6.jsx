// OPTION 6: "Confidence Meter Flip" — same card, context changes, meter drains
import { useRef, useState } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import { stats, answer, closingLine, getTypingState } from './shared'

export default function Option6() {
  const ref = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [pr, setPr] = useState(0)
  useMotionValueEvent(p, 'change', setPr)

  const flipped = pr > 0.30
  const meterValue = pr < 0.30 ? 100 : pr < 0.65 ? Math.max(15, 100 - ((pr - 0.30) / 0.35) * 85) : pr < 0.75 ? 15 : Math.min(95, 15 + ((pr - 0.75) / 0.15) * 80)
  const meterColor = meterValue > 60 ? '#4ecdc4' : meterValue > 30 ? '#e8b84a' : '#ef6b6b'
  const { text, cursor, phase } = getTypingState(pr, 0.35, 0.62)
  const showCard = pr > 0.75
  const showClosing = pr > 0.88

  return (
    <section ref={ref} style={{ height: '300vh' }}>
      <div className="sticky top-[52px] h-[calc(100vh-52px)] flex items-center justify-center px-5 overflow-hidden">
        <div className="w-full max-w-[500px]">
          {/* The single card */}
          <div className="bg-[#111825] border border-[#1a2030] rounded-xl overflow-hidden transition-opacity duration-500"
            style={{ opacity: showCard ? 0 : 1 }}>
            {/* Header flips */}
            <div className="px-4 py-3 border-b border-[#1a2030] flex items-center justify-between">
              <span className="text-[12px] text-text-primary font-medium transition-all duration-500">
                {flipped ? 'In the Interview' : 'On the Job'}
              </span>
              <span className="text-[10px] uppercase tracking-wider transition-all duration-500"
                style={{ color: meterColor }}>{Math.round(meterValue)}%</span>
            </div>

            {/* Confidence meter */}
            <div className="px-4 pt-3">
              <div className="h-2 bg-[#1a2030] rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${meterValue}%`, backgroundColor: meterColor }} />
              </div>
              <p className="text-[9px] text-text-tertiary/30 mt-1.5 uppercase tracking-wider">Confidence</p>
            </div>

            {/* Stats — always visible */}
            <div className="px-4 py-3 grid grid-cols-2 gap-3">
              {stats.map((s, i) => (
                <div key={i} className="transition-opacity duration-300" style={{ opacity: pr > 0.06 + i * 0.04 ? (flipped ? 0.3 : 1) : 0 }}>
                  <span className="font-heading font-bold text-[20px] text-teal">{s.value}</span>
                  <span className="text-[8px] text-text-tertiary/40 ml-1.5 uppercase tracking-wider">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Response area */}
            {flipped && (
              <div className="px-4 pb-4 border-t border-[#1a2030] pt-3">
                <div className="min-h-[60px]">
                  <p className="text-[16px] sm:text-[20px] leading-[1.5] text-text-primary/70">
                    {text}{cursor && <span className="inline-block w-[2px] h-[1em] ml-[1px] align-middle" style={{ backgroundColor: phase === 'deleting' ? 'var(--color-red-soft)' : 'var(--color-text-tertiary)' }} />}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* "Nothing changed" line */}
          <div className="text-center mt-4 transition-opacity duration-500" style={{ opacity: pr > 0.60 && pr < 0.72 ? 1 : 0 }}>
            <p className="text-[13px] text-text-tertiary/40">Nothing about your ability changed. Only the format did.</p>
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
