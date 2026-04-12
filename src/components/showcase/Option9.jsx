// OPTION 9: "The Interrogation Transcript" — formal document, evidence vs testimony
import { useRef, useState } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import { stats, answer, closingLine } from './shared'

const evidence = [
  { label: 'Quota attainment', value: '124%' },
  { label: 'Average deal size', value: '$823,000' },
  { label: "President's Club", value: '2x recipient' },
  { label: 'Pipeline generated', value: '$3,200,000' },
]

const responses = [
  "I managed a large enterprise territory where I—",
  "So there was this deal where we displaced—",
  "My biggest win was probably when we—",
]

export default function Option9() {
  const ref = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [pr, setPr] = useState(0)
  useMotionValueEvent(p, 'change', setPr)

  const showCard = pr > 0.75
  const showClosing = pr > 0.88

  return (
    <section ref={ref} style={{ height: '300vh' }}>
      <div className="sticky top-[52px] h-[calc(100vh-52px)] flex items-center justify-center px-5 overflow-hidden">
        <div className="w-full max-w-[560px]">
          {/* Transcript document */}
          <div className="transition-opacity duration-500" style={{ opacity: showCard ? 0 : 1 }}>
            <div className="font-mono text-[11px] sm:text-[13px] leading-[1.8] space-y-0">
              {/* Header */}
              <div className="border-b border-text-tertiary/10 pb-2 mb-3 transition-opacity duration-500" style={{ opacity: pr > 0.04 ? 0.5 : 0 }}>
                <p className="text-text-tertiary/30 uppercase tracking-wider text-[9px]">Transcript — Final Round Evaluation</p>
              </div>

              {/* Evidence lines */}
              {evidence.map((e, i) => (
                <p key={i} className="transition-all duration-500" style={{ opacity: pr > 0.06 + i * 0.04 ? 1 : 0 }}>
                  <span className="text-text-tertiary/30">RECORD: </span>
                  <span className="text-teal/70">{e.label} — {e.value}</span>
                </p>
              ))}

              {/* Evaluator question */}
              <div className="mt-4 transition-opacity duration-500" style={{ opacity: pr > 0.28 ? 1 : 0 }}>
                <p><span className="text-text-tertiary/30">EVALUATOR: </span><span className="text-text-primary/70">Walk me through your biggest competitive win.</span></p>
              </div>

              {/* Failed responses */}
              <div className="mt-3 space-y-2">
                {responses.map((r, i) => {
                  const threshold = 0.35 + i * 0.10
                  return (
                    <div key={i} className="transition-opacity duration-500" style={{ opacity: pr > threshold ? 1 : 0 }}>
                      <p>
                        <span className="text-text-tertiary/30">CANDIDATE: </span>
                        <span className="text-text-primary/50 line-through decoration-red-soft/40">{r}</span>
                      </p>
                      <p className="text-red-soft/40 text-[10px] ml-[88px] sm:ml-[104px]">[RESPONSE WITHDRAWN]</p>
                    </div>
                  )
                })}
              </div>

              {/* Empty line */}
              <div className="mt-3 transition-opacity duration-500" style={{ opacity: pr > 0.62 ? 1 : 0 }}>
                <p>
                  <span className="text-text-tertiary/30">CANDIDATE: </span>
                  <span className="inline-block w-[2px] h-[1em] bg-text-tertiary/40 align-middle animate-pulse" />
                </p>
              </div>
            </div>
          </div>

          {/* SAY THIS card as coached response */}
          <div className="transition-all duration-700" style={{ opacity: showCard ? 1 : 0, transform: showCard ? 'translateY(0)' : 'translateY(24px)' }}>
            <div className="font-mono text-[11px] text-text-tertiary/30 mb-3">COACHED RESPONSE:</div>
            <div className="border-l-[3px] border-teal/60 bg-[#111825] rounded-r-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-teal" />
                <span className="text-[10px] text-text-tertiary/50 uppercase tracking-wider font-medium">Say This</span>
              </div>
              <p className="text-text-secondary text-[15px] leading-[1.7] font-sans">{answer}</p>
            </div>
            <div className="mt-6 text-center transition-opacity duration-700" style={{ opacity: showClosing ? 1 : 0 }}>
              <p className="text-[14px] text-text-tertiary/50 font-sans">{closingLine[0]}</p>
              <p className="text-[14px] text-text-primary/70 font-medium mt-1 font-sans">{closingLine[1]}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
