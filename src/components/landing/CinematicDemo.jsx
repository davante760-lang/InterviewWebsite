import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'

/*
  ┌─────────────────────────────────────────────────────────────┐
  │  SCROLL MAP (600vh section)                                 │
  │                                                             │
  │  0.00─0.08  Panel fades in, scales from 0.7→1.0            │
  │  0.08─0.15  Split: panes separate with slight rotation      │
  │  0.15─0.20  RIGHT pane slides to center + scales up 1.6x   │
  │  0.20─0.40  HOLD: transcript centered, question types in    │
  │  0.40─0.48  RIGHT pane slides back, LEFT pane slides center │
  │  0.48─0.52  LEFT pane finishes centering + scales up 1.6x   │
  │  0.52─0.72  HOLD: coaching centered, cards animate in       │
  │  0.72─0.80  LEFT pane slides back, both re-dock             │
  │  0.80─0.92  HOLD: full assembled view with all content      │
  │  0.92─1.00  Scale down + fade                               │
  └─────────────────────────────────────────────────────────────┘
*/

export default function CinematicDemo() {
  const containerRef = useRef(null)
  const { scrollYProgress: p } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const [progress, setProgress] = useState(0)
  useMotionValueEvent(p, 'change', (v) => setProgress(v))

  // ── Container ──
  const panelScale = useTransform(p, [0, 0.08, 0.92, 1.0], [0.7, 1, 1, 0.82])
  const panelOpacity = useTransform(p, [0, 0.05, 0.94, 1.0], [0, 1, 1, 0.3])
  const panelY = useTransform(p, [0, 0.08], [100, 0])

  // ── RIGHT PANE (transcript) ──
  // Splits right → slides to center → holds → slides back → docks
  const rightX = useTransform(p,
    [0.08, 0.14, 0.18, 0.40, 0.46, 0.72, 0.80],
    [0,    40,   -280, -280, 40,   40,   0]
  )
  const rightScale = useTransform(p,
    [0.08, 0.18, 0.40, 0.46, 0.80],
    [1,    1.55, 1.55, 0.9,  1]
  )
  const rightRotateY = useTransform(p,
    [0.08, 0.14, 0.18, 0.40, 0.46],
    [0,    -3,   -4,   -4,   0]
  )
  const rightDim = useTransform(p,
    [0.46, 0.52, 0.72, 0.78],
    [1,    0.25, 0.25, 1]
  )

  // ── LEFT PANE (coaching) ──
  // Splits left → dims → slides to center → holds → slides back → docks
  const leftX = useTransform(p,
    [0.08, 0.14, 0.40, 0.48, 0.72, 0.78, 0.80],
    [0,    -40,  -40,  220,  220,  -40,  0]
  )
  const leftScale = useTransform(p,
    [0.08, 0.40, 0.48, 0.72, 0.78, 0.80],
    [1,    1,    1.55, 1.55, 0.9,  1]
  )
  const leftRotateY = useTransform(p,
    [0.08, 0.14, 0.48, 0.52, 0.72, 0.78],
    [0,    3,    3,    4,    4,    0]
  )
  const leftDim = useTransform(p,
    [0.15, 0.20, 0.40, 0.46],
    [1,    0.25, 0.25, 1]
  )

  // ── Content states ──
  const isLive = progress > 0.18
  const showTrigger = progress > 0.52
  const showAnalyzing = progress > 0.54 && progress < 0.62
  const showSayThis = progress > 0.60
  const showQuestionCard = progress > 0.65
  const hideEmpty = progress > 0.52

  // Question typing — during the "right pane centered" hold (0.20–0.40)
  const fullQuestion = "Walk me through your biggest competitive win. What was the deal size, who were the stakeholders, and how did you close it?"
  const questionFraction = Math.max(0, Math.min(1, (progress - 0.20) / 0.18))
  const visibleChars = Math.floor(questionFraction * fullQuestion.length)
  const questionText = fullQuestion.slice(0, visibleChars)
  const showTranscriptEmpty = visibleChars === 0

  // Labels
  const labelIdx =
    progress > 0.10 && progress < 0.18 ? 0 :
    progress >= 0.20 && progress < 0.40 ? 1 :
    progress >= 0.52 && progress < 0.75 ? 2 : -1

  const labels = [
    'The interviewer asks a question...',
    'Your transcript captures every word',
    'Your answer appears in under 500ms',
  ]

  const showHint = progress > 0.01 && progress < 0.08

  return (
    <section ref={containerRef} className="relative" style={{ height: '600vh' }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden" style={{ perspective: 1400 }}>

        {/* Phase label */}
        <div className="absolute top-[7%] left-1/2 -translate-x-1/2 z-30 h-6">
          {labels.map((label, i) => (
            <span
              key={i}
              className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[12px] tracking-wide transition-opacity duration-500 ${
                i === 2 ? 'text-teal/60 font-medium' : 'text-text-tertiary/40'
              }`}
              style={{ opacity: labelIdx === i ? 1 : 0 }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Panel */}
        <motion.div
          style={{ scale: panelScale, opacity: panelOpacity, y: panelY }}
          className="w-[92vw] max-w-[1100px] h-[72vh] max-h-[640px]"
        >
          <div className="w-full h-full flex rounded-xl overflow-visible" style={{ perspective: 1400 }}>

            {/* ══════ LEFT: Coaching Pane ══════ */}
            <motion.div
              style={{
                x: leftX,
                rotateY: leftRotateY,
                scale: leftScale,
                filter: useTransform(leftDim, (d) => `brightness(${d})`),
              }}
              className="w-[60%] rounded-l-xl overflow-hidden border border-[#1a2030] bg-[#0c1117]"
            >
              <div className="h-full flex flex-col">
                {/* Header */}
                <div className="px-4 py-3 flex items-center gap-3 border-b border-[#1a2030] shrink-0">
                  <span className="text-[11px] text-text-tertiary/60 uppercase tracking-wider font-medium">Coaching</span>
                  <span className={`text-[10px] px-2.5 py-1 rounded font-medium border transition-all duration-500 ${
                    isLive ? 'bg-teal/15 text-teal border-teal/30' : 'bg-[#1a2030] text-teal border-teal/20'
                  }`}>
                    {isLive ? 'LIVE' : 'STANDBY'}
                  </span>
                  <div className="ml-auto flex items-center gap-2">
                    <span
                      className="text-[10px] bg-teal/15 text-teal px-3 py-1 rounded-full font-medium border border-teal/20 flex items-center gap-1.5 transition-all duration-400"
                      style={{ opacity: showAnalyzing ? 1 : 0, transform: showAnalyzing ? 'translateY(0)' : 'translateY(-4px)' }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
                      AI analyzing...
                    </span>
                    <div className="w-5 h-5 rounded bg-[#1a2030] flex items-center justify-center">
                      <span className="text-[8px] text-text-tertiary/40">⬒</span>
                    </div>
                    <div className="w-5 h-5 rounded bg-[#1a2030] flex items-center justify-center">
                      <span className="text-[8px] text-text-tertiary/40">↗</span>
                    </div>
                  </div>
                </div>

                {/* Trigger detected */}
                <div className="px-4 pt-2 shrink-0 transition-all duration-500"
                  style={{ opacity: showTrigger ? 1 : 0, maxHeight: showTrigger ? 40 : 0, overflow: 'hidden' }}>
                  <span className="inline-flex items-center gap-1.5 text-[10px] bg-teal/10 text-teal/80 px-3 py-1.5 rounded-full border border-teal/15 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                    Trigger detected &mdash; listening...
                  </span>
                </div>

                {/* Override phrases */}
                <div className="px-4 py-2 border-b border-[#1a2030] flex items-center gap-2 flex-wrap shrink-0">
                  <span className="text-[9px] text-text-tertiary/40 uppercase tracking-wider shrink-0">Override phrases:</span>
                  {['"Just to be clear, you\'re asking me about ___"', '"Just so I understand, ___"', '"If I\'m hearing you right, ___"'].map((ph) => (
                    <span key={ph} className="text-[10px] text-teal/70 shrink-0">{ph}</span>
                  ))}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-4 py-4 relative">
                  {!hideEmpty && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-text-tertiary/25 text-[13px]">Select a position to load your coaching brief</p>
                    </div>
                  )}
                  <div className="transition-all duration-700 ease-out"
                    style={{ opacity: showSayThis ? 1 : 0, transform: showSayThis ? 'translateY(0)' : 'translateY(20px)' }}>
                    <div className="border-l-[3px] border-teal/60 bg-[#111825] rounded-r-lg p-4 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-teal" />
                        <span className="text-[10px] text-text-tertiary/50 uppercase tracking-wider font-medium">Say This</span>
                        <span className="text-[10px] text-text-tertiary/30 ml-auto">07:05 AM</span>
                      </div>
                      <p className="text-text-secondary text-[12px] leading-[1.7]">
                        I displaced a competitor after an 8-year relationship &mdash; $823K deal, 94-day close cycle, 7 stakeholders. I built a champion coalition across operations and finance, structured the POC around their highest-pain workflow, and closed with a 3-year commitment after an executive alignment session with the CFO.
                      </p>
                    </div>
                  </div>
                  <div className="transition-all duration-700 ease-out"
                    style={{ opacity: showQuestionCard ? 1 : 0, transform: showQuestionCard ? 'translateY(0)' : 'translateY(20px)' }}>
                    <div className="bg-[#111825] border border-[#1a2030] rounded-lg p-4">
                      <span className="text-[10px] text-text-tertiary/50 uppercase tracking-wider font-medium block mb-2">Question</span>
                      <p className="text-teal/60 text-[11px] leading-[1.6] italic">
                        The interviewer just asked: &ldquo;walk me through your biggest competitive win&rdquo;. Give the candidate a direct, confident response with specific metrics...
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom */}
                <div className="px-4 py-2 border-t border-[#1a2030] shrink-0">
                  <span className="text-[10px] bg-teal/15 text-teal px-2 py-1 rounded font-medium">✦ Ask AI</span>
                  <div className="mt-2 flex items-center bg-[#111825] rounded-lg border border-[#1a2030] px-3 py-2">
                    <span className="text-[11px] text-text-tertiary/30 flex-1">💬 Ask AI</span>
                    <div className="w-5 h-5 rounded-full bg-teal/80 flex items-center justify-center">
                      <span className="text-[8px] text-white">▶</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ══════ RIGHT: Transcript Pane ══════ */}
            <motion.div
              style={{
                x: rightX,
                rotateY: rightRotateY,
                scale: rightScale,
                filter: useTransform(rightDim, (d) => `brightness(${d})`),
              }}
              className="w-[40%] rounded-r-xl overflow-hidden border border-[#1a2030] border-l-0 bg-[#0c1117]"
            >
              <div className="h-full flex flex-col">
                <div className="px-4 py-3 flex items-center justify-between border-b border-[#1a2030] shrink-0">
                  <span className="text-[11px] text-text-tertiary/60 uppercase tracking-wider font-medium">Live Transcript</span>
                  <span className="text-[10px] text-teal/50 font-medium">
                    {questionText.split(/\s+/).filter(Boolean).length} words
                  </span>
                </div>
                <div className="flex-1 px-5 py-6 relative">
                  {showTranscriptEmpty && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-text-tertiary/20 text-[13px]">Transcript starts with session</p>
                    </div>
                  )}
                  <p className="text-text-secondary text-[14px] leading-[1.9]">
                    {questionText}
                    {questionFraction > 0 && questionFraction < 1 && (
                      <span className="text-teal animate-pulse">|</span>
                    )}
                  </p>
                </div>
                <div className="px-4 py-3 border-t border-[#1a2030] shrink-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] text-text-tertiary/40 uppercase tracking-wider font-medium">Talk Ratio</span>
                    <span className="text-[9px] text-text-tertiary/25">Target</span>
                  </div>
                  <div className="h-2 bg-[#1a2030] rounded-full overflow-hidden flex">
                    <div className="h-full bg-teal rounded-full" style={{ width: '40%' }} />
                  </div>
                  <div className="flex gap-4 mt-1.5">
                    <span className="text-[9px] text-text-tertiary/50 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal inline-block" /> You: 40%
                    </span>
                    <span className="text-[9px] text-text-tertiary/25 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-text-tertiary/20 inline-block" /> Them: 60%
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>

        {/* Scroll hint */}
        <div className="absolute bottom-[7%] left-1/2 -translate-x-1/2 text-center transition-opacity duration-500"
          style={{ opacity: showHint ? 1 : 0 }}>
          <div className="text-text-tertiary/25 animate-bounce">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
          <p className="text-[10px] text-text-tertiary/20 mt-1 tracking-wider">Scroll to experience</p>
        </div>
      </div>
    </section>
  )
}
