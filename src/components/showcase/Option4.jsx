// OPTION 4: "Trophy Stack Turns Into a Choke" — stats compress and crush
import { useRef, useState } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import { stats, question, answer, closingLine, getTypingState } from './shared'

export default function Option4() {
  const ref = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [pr, setPr] = useState(0)
  useMotionValueEvent(p, 'change', setPr)

  // Compression: 0 at pr<0.25, full at pr=0.55
  const compress = Math.max(0, Math.min(1, (pr - 0.25) / 0.30))
  const { text, cursor, phase } = getTypingState(pr, 0.35, 0.65)
  const showCollapse = pr > 0.62 && pr < 0.72
  const showCard = pr > 0.72
  const showClosing = pr > 0.88

  return (
    <section ref={ref} style={{ height: '300vh' }}>
      <div className="sticky top-[52px] h-[calc(100vh-52px)] flex flex-col items-center justify-center px-5 overflow-hidden">
        <div className="w-full max-w-[600px]">

          {/* Stats stack — compresses downward */}
          <div className="transition-all duration-300 overflow-hidden" style={{
            maxHeight: showCard ? 0 : compress > 0.9 ? 48 : 300,
            opacity: showCard ? 0 : 1,
            marginBottom: showCard ? 0 : compress > 0 ? 16 : 32,
          }}>
            <div className="flex flex-col items-center gap-1" style={{
              transform: `scaleY(${1 - compress * 0.6})`,
              transformOrigin: 'top',
            }}>
              {stats.map((s, i) => (
                <div key={i} className="flex items-center gap-3 transition-all duration-500"
                  style={{
                    opacity: pr > 0.06 + i * 0.04 ? 1 : 0,
                    padding: `${Math.max(2, 12 - compress * 10)}px 0`,
                  }}>
                  <span className="font-heading font-bold text-teal transition-all duration-300"
                    style={{ fontSize: `${Math.max(16, 32 - compress * 16)}px` }}>{s.value}</span>
                  <span className="text-text-tertiary/40 uppercase tracking-wider transition-all duration-300"
                    style={{ fontSize: `${Math.max(8, 11 - compress * 3)}px` }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Collapsed line */}
          <div className="text-center transition-all duration-500 mb-6" style={{ opacity: showCollapse ? 1 : 0 }}>
            <p className="text-[14px] sm:text-[17px] text-text-primary/60 italic">Elite at the job. Blank in the interview.</p>
          </div>

          {/* Question + typing */}
          <div className="transition-opacity duration-500" style={{ opacity: pr > 0.30 && !showCard ? 1 : 0 }}>
            <p className="text-[11px] text-text-tertiary/40 uppercase tracking-wider mb-1">Final Round · VP of Sales</p>
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
