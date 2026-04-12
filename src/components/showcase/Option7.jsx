// OPTION 7: "Same Person / Two Outputs" — source card emits good and bad translations
import { useRef, useState } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import { stats, question, answer, closingLine, getTypingState } from './shared'

export default function Option7() {
  const ref = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [pr, setPr] = useState(0)
  useMotionValueEvent(p, 'change', setPr)

  const { text, cursor, phase } = getTypingState(pr, 0.30, 0.55)
  const showBadOutput = pr > 0.28 && pr < 0.62
  const showGoodOutput = pr > 0.65
  const showClosing = pr > 0.88

  return (
    <section ref={ref} style={{ height: '300vh' }}>
      <div className="sticky top-[52px] h-[calc(100vh-52px)] flex flex-col items-center pt-20 px-5 overflow-hidden">
        <div className="w-full max-w-[500px]">

          {/* Source card — pinned small at top */}
          <div className="bg-[#111825] border border-[#1a2030] rounded-lg px-4 py-3 mb-6 transition-all duration-500"
            style={{ opacity: pr > 0.05 ? 1 : 0, transform: pr > 0.25 ? 'scale(0.9)' : 'scale(1)', transformOrigin: 'top center' }}>
            <p className="text-[9px] text-text-tertiary/40 uppercase tracking-wider mb-2">Your Real Track Record</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {stats.map((s, i) => (
                <span key={i} className="text-[12px]">
                  <span className="font-bold text-teal">{s.value}</span>
                  <span className="text-text-tertiary/40 ml-1">{s.label}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Translation stream indicator */}
          <div className="flex justify-center mb-4 transition-opacity duration-300" style={{ opacity: pr > 0.25 && pr < 0.65 ? 0.4 : pr > 0.65 ? 0.4 : 0 }}>
            <div className="w-px h-8 bg-text-tertiary/20" />
          </div>

          {/* Bad translation */}
          <div className="transition-all duration-500" style={{ opacity: showBadOutput ? 1 : 0, maxHeight: showBadOutput ? 200 : 0, overflow: 'hidden' }}>
            <p className="text-[9px] text-red-soft/50 uppercase tracking-wider mb-2">Without Interview Coach</p>
            <div className="border-l-2 border-red-soft/30 bg-red-dim/20 rounded-r-lg px-4 py-3 mb-4">
              <div className="min-h-[50px]">
                <p className="text-text-primary/60 text-[15px] leading-[1.6]">
                  {text}{cursor && <span className="inline-block w-[2px] h-[1em] ml-[1px] align-middle" style={{ backgroundColor: phase === 'deleting' ? 'var(--color-red-soft)' : 'var(--color-text-tertiary)' }} />}
                </p>
              </div>
            </div>
          </div>

          {/* Good translation */}
          <div className="transition-all duration-700" style={{ opacity: showGoodOutput ? 1 : 0, transform: showGoodOutput ? 'translateY(0)' : 'translateY(20px)' }}>
            <p className="text-[9px] text-teal/50 uppercase tracking-wider mb-2">With Interview Coach</p>
            <div className="border-l-[3px] border-teal/60 bg-[#111825] rounded-r-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-teal" />
                <span className="text-[10px] text-text-tertiary/50 uppercase tracking-wider font-medium">Say This</span>
                <span className="text-[9px] text-teal/40 ml-auto">&lt; 500ms</span>
              </div>
              <p className="text-text-secondary text-[15px] leading-[1.7]">{answer}</p>
            </div>
            <div className="mt-6 text-center transition-opacity duration-700" style={{ opacity: showClosing ? 1 : 0 }}>
              <p className="text-[13px] text-text-tertiary/50">Same source. Better translation.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
