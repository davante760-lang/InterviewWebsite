import { useRef, useState } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'

/*
  THE TRANSLATION GAP

  Scroll map (350vh):
  0.00–0.05  Fade in
  0.05–0.25  "The Track Record" — performance stats animate in one by one
  0.25–0.30  Stats hold, then a line appears: "Now say it in an interview."
  0.30–0.35  Stats dissolve. Screen clears to interview context.
  0.35–0.65  Typing/deleting loop — 4 failed attempts
  0.65–0.70  Screen clears. Beat.
  0.70–0.72  "WITH INTERVIEW COACH" label
  0.72–0.88  SAY THIS card fades in
  0.88–1.00  Closing line
*/

const stats = [
  { label: 'Quota Attainment', value: '124%', delay: 0.07 },
  { label: 'Average Deal Size', value: '$823K', delay: 0.10 },
  { label: "President's Club", value: '2x', delay: 0.13 },
  { label: 'Pipeline Generated', value: '$3.2M', delay: 0.16 },
]

const attempts = [
  { text: "I managed a large enterprise territory where I", deleteAt: 0.45 },
  { text: "So there was this deal where we displaced the incumbent and I", deleteAt: 0.52 },
  { text: "My biggest win was probably when we closed — it was like an 800K", deleteAt: 0.59 },
  { text: "The deal was, so basically I had this account where they were with", deleteAt: 0.65 },
]

function getVisibleText(progress) {
  if (progress < 0.36) return { text: '', showCursor: false, phase: 'pre' }
  if (progress >= 0.36 && progress < 0.37) return { text: '', showCursor: true, phase: 'empty' }

  for (let i = 0; i < attempts.length; i++) {
    const attemptStart = 0.37 + i * 0.07
    const typeEnd = attemptStart + 0.045
    const deleteStart = attempts[i].deleteAt
    const deleteEnd = deleteStart + 0.02

    if (progress >= attemptStart && progress < typeEnd) {
      const frac = (progress - attemptStart) / (typeEnd - attemptStart)
      return { text: attempts[i].text.slice(0, Math.floor(frac * attempts[i].text.length)), showCursor: true, phase: 'typing' }
    }
    if (progress >= typeEnd && progress < deleteStart) {
      return { text: attempts[i].text, showCursor: true, phase: 'pause' }
    }
    if (progress >= deleteStart && progress < deleteEnd) {
      const frac = (progress - deleteStart) / (deleteEnd - deleteStart)
      const remaining = Math.floor((1 - frac) * attempts[i].text.length)
      return { text: attempts[i].text.slice(0, Math.max(0, remaining)), showCursor: true, phase: 'deleting' }
    }
  }

  if (progress < 0.70) return { text: '', showCursor: true, phase: 'empty-after' }
  return { text: '', showCursor: false, phase: 'done' }
}

export default function TypingStruggle() {
  const ref = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [progress, setProgress] = useState(0)
  useMotionValueEvent(p, 'change', (v) => setProgress(v))

  const { text, showCursor, phase } = getVisibleText(progress)

  // Phase flags
  const showStats = progress >= 0.05 && progress < 0.32
  const showChallenge = progress >= 0.26 && progress < 0.32
  const showInterview = progress >= 0.34 && progress < 0.70
  const showCard = progress >= 0.72
  const showClosing = progress >= 0.88
  const sectionVisible = progress > 0.02

  return (
    <section ref={ref} className="relative" style={{ height: '350vh' }}>
      <div className="sticky top-0 h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="w-full max-w-[680px] mx-auto">

          {/* ═══ PHASE 1: The Track Record ═══ */}
          <div
            className="transition-all duration-700"
            style={{ opacity: showStats ? 1 : 0, transform: showStats ? 'translateY(0)' : 'translateY(-20px)' }}
          >
            <p className="text-[11px] sm:text-[12px] text-text-tertiary/40 uppercase tracking-[0.2em] font-medium mb-8">
              The Track Record
            </p>

            <div className="grid grid-cols-2 gap-4 sm:gap-5 mb-8">
              {stats.map((stat) => {
                const visible = progress > stat.delay
                return (
                  <div
                    key={stat.label}
                    className="transition-all duration-600 ease-out"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'translateY(0)' : 'translateY(12px)',
                    }}
                  >
                    <p className="font-heading font-bold text-[28px] sm:text-[36px] text-teal tracking-[-0.03em]">
                      {stat.value}
                    </p>
                    <p className="text-[11px] sm:text-[12px] text-text-tertiary/50 mt-1 uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* The challenge line */}
            <p
              className="text-[16px] sm:text-[20px] text-text-primary/70 leading-[1.5] transition-all duration-700"
              style={{ opacity: showChallenge ? 1 : 0, transform: showChallenge ? 'translateY(0)' : 'translateY(10px)' }}
            >
              Now say it in an interview.
            </p>
          </div>

          {/* ═══ PHASE 2: The Struggle ═══ */}
          <div
            className="transition-all duration-600"
            style={{
              opacity: showInterview ? 1 : 0,
              position: showStats && !showInterview ? 'absolute' : 'relative',
            }}
          >
            {/* Interview context */}
            <div className="mb-6">
              <span className="text-[11px] sm:text-[12px] text-text-tertiary/40 uppercase tracking-wider font-medium">
                Final Round &middot; VP of Sales
              </span>
              <p className="text-[13px] sm:text-[14px] text-text-tertiary/35 mt-1 italic">
                &ldquo;Walk me through your biggest competitive win.&rdquo;
              </p>
            </div>

            {/* Typing area */}
            <div className="min-h-[120px] sm:min-h-[160px]">
              <p className="font-heading text-[22px] sm:text-[28px] md:text-[34px] leading-[1.5] tracking-[-0.01em] text-text-primary/80">
                {text}
                {showCursor && (
                  <span
                    className="inline-block w-[2px] sm:w-[3px] h-[1.1em] ml-[2px] align-middle"
                    style={{
                      backgroundColor: phase === 'deleting' ? 'var(--color-red-soft)' : 'var(--color-text-tertiary)',
                      opacity: phase === 'pause' ? 0.4 : 0.8,
                      animation: phase === 'pause' || phase === 'empty' || phase === 'empty-after' ? 'pulse 1s ease-in-out infinite' : 'none',
                    }}
                  />
                )}
              </p>
            </div>

            {/* Attempt indicators */}
            {progress > 0.42 && progress < 0.68 && (
              <div className="mt-6 flex gap-2">
                {attempts.map((a, i) => {
                  const failed = progress > a.deleteAt + 0.02
                  const active = progress > (0.37 + i * 0.07) && !failed
                  return (
                    <div
                      key={i}
                      className="h-1 rounded-full transition-all duration-500"
                      style={{
                        width: active ? 32 : 16,
                        backgroundColor: failed ? 'rgba(239,107,107,0.3)' : active ? 'var(--color-text-tertiary)' : 'rgba(156,165,178,0.15)',
                      }}
                    />
                  )
                })}
              </div>
            )}
          </div>

          {/* ═══ PHASE 3: The Translation ═══ */}
          <div
            className="transition-all duration-700 ease-out"
            style={{
              opacity: showCard ? 1 : 0,
              transform: showCard ? 'translateY(0)' : 'translateY(24px)',
            }}
          >
            <p className="text-[11px] sm:text-[12px] text-text-tertiary/40 uppercase tracking-[0.2em] font-medium mb-4">
              With Interview Coach
            </p>

            <div className="border-l-[3px] border-teal/60 bg-[#111825] rounded-r-xl p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-teal" />
                <span className="text-[10px] sm:text-[11px] text-text-tertiary/50 uppercase tracking-wider font-medium">Say This</span>
                <span className="text-[9px] sm:text-[10px] text-teal/40 ml-auto">&lt; 500ms</span>
              </div>
              <p className="text-text-secondary text-[15px] sm:text-[17px] leading-[1.7]">
                Displaced an 8-year incumbent. $823K deal, 94-day cycle. The challenge was they had relationships everywhere &mdash; I had to build my own coalition from scratch. Anchored with the ops team first, got finance aligned, then used that momentum to get in front of the CFO. Three-year commitment on the close.
              </p>
            </div>

            {/* Closing */}
            <div
              className="mt-8 text-center transition-opacity duration-700"
              style={{ opacity: showClosing ? 1 : 0 }}
            >
              <p className="text-[15px] sm:text-[17px] text-text-tertiary/50 leading-[1.6]">
                Same person. Same track record.
              </p>
              <p className="text-[15px] sm:text-[17px] text-text-primary/70 leading-[1.6] mt-1 font-medium">
                Finally translated.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
