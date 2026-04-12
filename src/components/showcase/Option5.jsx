// OPTION 5: "Resume Numbers Morph Into Broken Speech" — stats degrade into vague language
import { useRef, useState } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import { stats, answer, closingLine } from './shared'

const degraded = [
  { from: '124%', to: "I've done well in enterprise…" },
  { from: '$823K', to: "There was one deal where…" },
  { from: '2x', to: "I was recognized a couple times…" },
  { from: '$3.2M', to: "I built a lot of pipeline…" },
]

export default function Option5() {
  const ref = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [pr, setPr] = useState(0)
  useMotionValueEvent(p, 'change', setPr)

  const morphAmount = Math.max(0, Math.min(1, (pr - 0.25) / 0.25))
  const showCard = pr > 0.70
  const showClosing = pr > 0.88
  const showLabel = pr > 0.55 && pr < 0.70

  return (
    <section ref={ref} style={{ height: '300vh' }}>
      <div className="sticky top-[52px] h-[calc(100vh-52px)] flex items-center justify-center px-5 overflow-hidden">
        <div className="w-full max-w-[600px]">
          {/* Morphing stats */}
          <div className="transition-opacity duration-500" style={{ opacity: showCard ? 0 : 1 }}>
            <p className="text-[11px] text-text-tertiary/40 uppercase tracking-[0.2em] mb-6">
              {morphAmount < 0.5 ? 'The Track Record' : 'In the Interview'}
            </p>

            <div className="space-y-5">
              {stats.map((s, i) => {
                const itemMorph = Math.max(0, Math.min(1, (morphAmount - i * 0.15) / 0.3))
                return (
                  <div key={i} className="transition-all duration-500" style={{ opacity: pr > 0.06 + i * 0.05 ? 1 : 0 }}>
                    {/* Number → vague text crossfade */}
                    <div className="relative">
                      <p className="font-heading font-bold text-teal tracking-tight transition-all duration-500"
                        style={{ fontSize: `${36 - itemMorph * 16}px`, opacity: 1 - itemMorph }}>
                        {s.value}
                        <span className="text-[10px] text-text-tertiary/40 ml-2 uppercase tracking-wider">{s.label}</span>
                      </p>
                      <p className="text-text-tertiary/50 italic transition-all duration-500 absolute top-0"
                        style={{ fontSize: `${14 + itemMorph * 4}px`, opacity: itemMorph, lineHeight: 1.6 }}>
                        {degraded[i].to}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Label at full degradation */}
            <p className="mt-8 text-center text-[14px] text-text-tertiary/40 italic transition-opacity duration-500"
              style={{ opacity: showLabel ? 1 : 0 }}>
              Your experience was always there. The language wasn&apos;t.
            </p>
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
