// OPTION 2: "Deconstruction" — Bento grid breaks under interview pressure
import { useRef, useState } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import { stats, question, answer, closingLine, getTypingState } from './shared'

const corners = [
  { x: '-45%', y: '-40%', r: -8 },
  { x: '45%', y: '-40%', r: 6 },
  { x: '-45%', y: '40%', r: 5 },
  { x: '45%', y: '40%', r: -7 },
]

export default function Option2() {
  const ref = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [pr, setPr] = useState(0)
  useMotionValueEvent(p, 'change', setPr)

  const breakAmount = Math.max(0, Math.min(1, (pr - 0.25) / 0.15))
  const { text, cursor, phase } = getTypingState(pr, 0.35, 0.68)
  const showCard = pr > 0.75
  const showClosing = pr > 0.88

  return (
    <section ref={ref} style={{ height: '300vh' }}>
      <div className="sticky top-[52px] h-[calc(100vh-52px)] flex items-center justify-center px-5 overflow-hidden">
        <div className="w-full max-w-[600px] relative">
          {/* Bento grid that breaks */}
          <div className="relative" style={{ opacity: showCard ? 0 : 1, transition: 'opacity 0.5s' }}>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {stats.map((s, i) => {
                const c = corners[i]
                return (
                  <div key={i}
                    className="bg-[#111825] border border-[#1a2030] rounded-lg p-4 text-center transition-all duration-700"
                    style={{
                      transform: `translate(${parseFloat(c.x) * breakAmount}%, ${parseFloat(c.y) * breakAmount}%) rotate(${c.r * breakAmount}deg) scale(${1 - breakAmount * 0.35})`,
                      opacity: 1 - breakAmount * 0.6,
                    }}>
                    <p className="font-heading font-bold text-[24px] sm:text-[30px] text-teal">{s.value}</p>
                    <p className="text-[9px] text-text-tertiary/40 uppercase tracking-wider mt-1">{s.label}</p>
                  </div>
                )
              })}
            </div>

            {/* Interview prompt + typing in the broken space */}
            <div className="transition-opacity duration-500" style={{ opacity: pr > 0.30 ? 1 : 0 }}>
              <p className="text-[11px] text-text-tertiary/40 uppercase tracking-wider mb-1">Final Round · VP of Sales</p>
              <p className="text-[13px] text-text-tertiary/35 italic mb-4">&ldquo;{question}&rdquo;</p>
              <div className="min-h-[80px]">
                <p className="font-heading text-[20px] sm:text-[26px] leading-[1.5] text-text-primary/80"
                  style={{ transform: phase === 'typing' ? `translateX(${Math.sin(pr * 80) * 1.5}px)` : 'none' }}>
                  {text}{cursor && <span className="inline-block w-[2px] h-[1.1em] ml-[2px] align-middle" style={{ backgroundColor: phase === 'deleting' ? 'var(--color-red-soft)' : 'var(--color-text-tertiary)' }} />}
                </p>
              </div>
            </div>
          </div>

          {/* SAY THIS card */}
          <div className="transition-all duration-700" style={{ opacity: showCard ? 1 : 0, transform: showCard ? 'scale(1)' : 'scale(0.9)' }}>
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
