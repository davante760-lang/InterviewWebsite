import { useRef, useState } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'

/*
  Scroll-driven typing/deleting loop.

  The user watches someone TRY to answer an interview question —
  typing, pausing, deleting, restarting. Then a clean SAY THIS
  card appears. The contrast does the selling.

  Scroll map (300vh):
  0.00–0.06  Cursor appears, blinks alone
  0.06–0.70  Typing/deleting sequence — 4 failed attempts
  0.70–0.76  Screen clears. Beat of emptiness.
  0.76–0.90  SAY THIS card fades in with clean answer
  0.90–1.00  Closing line fades in
*/

const attempts = [
  { text: "I managed a large enterprise territory where I", deleteAt: 0.18 },
  { text: "So there was this deal where we displaced the incumbent and I", deleteAt: 0.32 },
  { text: "My biggest win was probably when we closed — it was like an 800K", deleteAt: 0.48 },
  { text: "The deal was, so basically I had this account where they had been with the competitor for", deleteAt: 0.64 },
]

function getVisibleText(progress) {
  // Before typing starts
  if (progress < 0.06) return { text: '', showCursor: true, phase: 'empty' }

  // During attempts (0.06–0.70)
  for (let i = 0; i < attempts.length; i++) {
    const attemptStart = 0.06 + i * 0.16
    const typeEnd = attemptStart + 0.10
    const deleteStart = attempts[i].deleteAt
    const deleteEnd = deleteStart + 0.04

    // Typing phase
    if (progress >= attemptStart && progress < typeEnd) {
      const typeFrac = (progress - attemptStart) / (typeEnd - attemptStart)
      const chars = Math.floor(typeFrac * attempts[i].text.length)
      return { text: attempts[i].text.slice(0, chars), showCursor: true, phase: 'typing' }
    }

    // Hold phase (typed, waiting to delete)
    if (progress >= typeEnd && progress < deleteStart) {
      return { text: attempts[i].text, showCursor: true, phase: 'pause' }
    }

    // Deleting phase
    if (progress >= deleteStart && progress < deleteEnd) {
      const delFrac = (progress - deleteStart) / (deleteEnd - deleteStart)
      const remaining = Math.floor((1 - delFrac) * attempts[i].text.length)
      return { text: attempts[i].text.slice(0, Math.max(0, remaining)), showCursor: true, phase: 'deleting' }
    }
  }

  // After all attempts (0.70+)
  if (progress < 0.76) return { text: '', showCursor: true, phase: 'empty-after' }

  return { text: '', showCursor: false, phase: 'done' }
}

export default function TypingStruggle() {
  const ref = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [progress, setProgress] = useState(0)
  useMotionValueEvent(p, 'change', (v) => setProgress(v))

  const { text, showCursor, phase } = getVisibleText(progress)
  const showCard = progress >= 0.76
  const showClosing = progress >= 0.90

  return (
    <section ref={ref} className="relative" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="w-full max-w-[680px] mx-auto">

          {/* Typing area — visible during struggle phase */}
          <div
            className="transition-opacity duration-700"
            style={{ opacity: progress < 0.74 ? 1 : 0 }}
          >
            {/* Context label */}
            <div
              className="mb-6 transition-opacity duration-500"
              style={{ opacity: progress > 0.04 && progress < 0.70 ? 0.4 : 0 }}
            >
              <span className="text-[11px] sm:text-[12px] text-text-tertiary/50 uppercase tracking-wider font-medium">
                Final Round &middot; VP of Sales
              </span>
              <p className="text-[13px] sm:text-[14px] text-text-tertiary/40 mt-1 italic">
                &ldquo;Walk me through your biggest competitive win.&rdquo;
              </p>
            </div>

            {/* The struggle text */}
            <div className="min-h-[120px] sm:min-h-[160px]">
              <p className="font-heading text-[22px] sm:text-[28px] md:text-[34px] leading-[1.5] tracking-[-0.01em] text-text-primary/80">
                {text}
                {showCursor && (
                  <span
                    className="inline-block w-[2px] sm:w-[3px] h-[1.1em] ml-[2px] align-middle"
                    style={{
                      backgroundColor: phase === 'deleting' ? 'var(--color-red-soft)' : 'var(--color-text-tertiary)',
                      opacity: phase === 'pause' ? 0.4 : 0.8,
                      animation: phase === 'pause' ? 'pulse 1s ease-in-out infinite' : 'none',
                    }}
                  />
                )}
              </p>
            </div>

            {/* Failed attempt counter */}
            {progress > 0.20 && progress < 0.70 && (
              <div className="mt-8 flex gap-2">
                {attempts.map((_, i) => {
                  const deleteEnd = attempts[i].deleteAt + 0.04
                  const failed = progress > deleteEnd
                  const active = progress > (0.06 + i * 0.16) && !failed
                  return (
                    <div
                      key={i}
                      className="h-1 rounded-full transition-all duration-500"
                      style={{
                        width: active ? 32 : 16,
                        backgroundColor: failed
                          ? 'rgba(239,107,107,0.3)'
                          : active
                            ? 'var(--color-text-tertiary)'
                            : 'rgba(156,165,178,0.15)',
                      }}
                    />
                  )
                })}
              </div>
            )}
          </div>

          {/* SAY THIS card — appears after the struggle */}
          <div
            className="transition-all duration-700 ease-out"
            style={{
              opacity: showCard ? 1 : 0,
              transform: showCard ? 'translateY(0)' : 'translateY(24px)',
            }}
          >
            {/* Label */}
            <p className="text-[11px] sm:text-[12px] text-text-tertiary/40 uppercase tracking-wider font-medium mb-4">
              With Interview Coach
            </p>

            {/* Card */}
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

            {/* Closing line */}
            <p
              className="mt-8 text-center text-[15px] sm:text-[17px] text-text-tertiary/50 leading-[1.6] transition-opacity duration-700"
              style={{ opacity: showClosing ? 1 : 0 }}
            >
              You knew the answer. You always did.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
