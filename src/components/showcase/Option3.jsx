// OPTION 3: "Pulse & Flatline" — heartbeat dies when interview starts
import { useRef, useState } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import { stats, question, answer, closingLine, getTypingState } from './shared'

export default function Option3() {
  const ref = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [pr, setPr] = useState(0)
  useMotionValueEvent(p, 'change', setPr)

  const { text, cursor, phase } = getTypingState(pr, 0.35, 0.68)
  const showCard = pr > 0.75
  const showClosing = pr > 0.88
  const pulseAlive = pr < 0.30
  const flatline = pr >= 0.30 && pr < 0.75
  const pulseColor = flatline && phase === 'deleting' ? '#ef6b6b' : pulseAlive ? '#4ecdc4' : '#9CA5B2'

  // Generate SVG pulse path
  const pulsePath = pulseAlive
    ? 'M0,50 L60,50 L70,20 L80,80 L90,50 L160,50 L170,15 L180,85 L190,50 L260,50 L270,25 L280,75 L290,50 L360,50 L370,10 L380,90 L390,50 L480,50'
    : flatline
      ? `M0,50 L480,50`
      : 'M0,50 L40,50 L50,30 L60,70 L70,50 L120,50 L130,25 L140,75 L150,50 L200,50 L210,30 L220,70 L230,50 L300,50 L310,20 L320,80 L330,50 L480,50'

  return (
    <section ref={ref} style={{ height: '300vh' }}>
      <div className="sticky top-[52px] h-[calc(100vh-52px)] flex flex-col items-center justify-center px-5 overflow-hidden">
        <div className="w-full max-w-[600px]">
          {/* Stats above the line */}
          <div className="transition-all duration-700 mb-4" style={{ opacity: pr > 0.05 && !showCard ? 1 : 0 }}>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {stats.map((s, i) => (
                <div key={i} className="text-center transition-all duration-500" style={{ opacity: pr > 0.06 + i * 0.04 ? (flatline ? 0.3 : 1) : 0 }}>
                  <span className="font-heading font-bold text-[20px] sm:text-[26px] text-teal">{s.value}</span>
                  <span className="text-[8px] text-text-tertiary/40 uppercase tracking-wider ml-1.5">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pulse line */}
          <div className="transition-opacity duration-500" style={{ opacity: !showCard ? 1 : 0 }}>
            <svg viewBox="0 0 480 100" className="w-full h-12 sm:h-16" preserveAspectRatio="none">
              <path d={pulsePath} fill="none" stroke={pulseColor} strokeWidth="2" className="transition-all duration-500"
                style={{ opacity: 0.6 }} />
              {flatline && phase === 'deleting' && (
                <circle cx={240} cy={50} r="4" fill="#ef6b6b" className="animate-ping" style={{ opacity: 0.6 }} />
              )}
            </svg>
          </div>

          {/* Interview / typing below the line */}
          <div className="transition-opacity duration-500 mt-4" style={{ opacity: pr > 0.30 && !showCard ? 1 : 0 }}>
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
