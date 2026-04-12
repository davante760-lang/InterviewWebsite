// OPTION 1: "Ghost in the Machine" — Stats blur behind the struggle
import { useRef, useState } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import { stats, question, answer, closingLine, getTypingState } from './shared'

export default function Option1() {
  const ref = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [pr, setPr] = useState(0)
  useMotionValueEvent(p, 'change', setPr)

  const statsVisible = pr > 0.05
  const blurAmount = pr < 0.30 ? 0 : pr < 0.70 ? Math.min(12, ((pr - 0.30) / 0.20) * 12) : pr < 0.80 ? 12 - ((pr - 0.70) / 0.10) * 12 : 0
  const { text, cursor, phase } = getTypingState(pr, 0.32, 0.68)
  const showCard = pr > 0.75
  const showClosing = pr > 0.88

  return (
    <section ref={ref} style={{ height: '300vh' }}>
      <div className="sticky top-[52px] h-[calc(100vh-52px)] flex items-center justify-center px-5 overflow-hidden">
        <div className="w-full max-w-[600px] relative">
          {/* Stats layer — blurs under pressure */}
          <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
            style={{ filter: `blur(${blurAmount}px)`, opacity: statsVisible && !showCard ? 1 : 0 }}>
            <div className="grid grid-cols-2 gap-6 w-full">
              {stats.map((s, i) => (
                <div key={i} className="text-center transition-all duration-700" style={{ opacity: pr > 0.05 + i * 0.04 ? 1 : 0, transform: pr > 0.05 + i * 0.04 ? 'translateY(0)' : 'translateY(16px)' }}>
                  <p className="font-heading font-bold text-[32px] sm:text-[40px] text-teal tracking-tight">{s.value}</p>
                  <p className="text-[10px] text-text-tertiary/40 uppercase tracking-wider mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Interview overlay — sharp, in front */}
          <div className="relative z-10 transition-opacity duration-500" style={{ opacity: pr > 0.28 && !showCard ? 1 : 0 }}>
            <p className="text-[11px] text-text-tertiary/40 uppercase tracking-wider mb-1">Final Round · VP of Sales</p>
            <p className="text-[13px] text-text-tertiary/35 italic mb-6">&ldquo;{question}&rdquo;</p>
            <div className="min-h-[100px]">
              <p className="font-heading text-[22px] sm:text-[28px] leading-[1.5] text-text-primary/80">
                {text}{cursor && <span className="inline-block w-[2px] h-[1.1em] ml-[2px] align-middle" style={{ backgroundColor: phase === 'deleting' ? 'var(--color-red-soft)' : 'var(--color-text-tertiary)', opacity: phase === 'pause' ? 0.4 : 0.8 }} />}
              </p>
            </div>
          </div>

          {/* SAY THIS card */}
          <div className="relative z-10 transition-all duration-700" style={{ opacity: showCard ? 1 : 0, transform: showCard ? 'translateY(0)' : 'translateY(24px)' }}>
            <p className="text-[11px] text-text-tertiary/40 uppercase tracking-[0.2em] mb-4">With Interview Coach</p>
            <div className="border-l-[3px] border-teal/60 bg-[#111825] rounded-r-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-teal" />
                <span className="text-[10px] text-text-tertiary/50 uppercase tracking-wider font-medium">Say This</span>
                <span className="text-[9px] text-teal/40 ml-auto">&lt; 500ms</span>
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
