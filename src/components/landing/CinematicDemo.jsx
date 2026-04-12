import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'

/*
  Scroll phases across 500vh:
  0.00–0.12  Panel rises into view
  0.14–0.28  Panel splits with 3D rotation
  0.28–0.48  Question types into transcript, trigger pill appears, badge flips to LIVE
  0.48–0.60  Halves re-dock
  0.60–0.68  "AI analyzing..." pill appears
  0.68–0.82  SAY THIS card + QUESTION card animate in
  0.82–1.00  Panel scales back down
*/

export default function CinematicDemo() {
  const containerRef = useRef(null)
  const { scrollYProgress: p } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Track scroll progress as React state so children re-render
  const [progress, setProgress] = useState(0)
  useMotionValueEvent(p, 'change', (v) => setProgress(v))

  // Motion values for GPU-accelerated transforms (scale, position, rotation)
  const panelScale = useTransform(p, [0, 0.12, 0.82, 1.0], [0.7, 1, 1, 0.85])
  const panelOpacity = useTransform(p, [0, 0.08, 0.88, 1.0], [0, 1, 1, 0.5])
  const panelY = useTransform(p, [0, 0.12], [120, 0])
  const splitGap = useTransform(p, [0.14, 0.26, 0.48, 0.60], [0, 80, 80, 0])
  const leftRotateY = useTransform(p, [0.14, 0.26, 0.48, 0.60], [0, 6, 6, 0])
  const rightRotateY = useTransform(p, [0.14, 0.26, 0.48, 0.60], [0, -6, -6, 0])
  const leftX = useTransform(splitGap, (g) => -g / 2)
  const rightX = useTransform(splitGap, (g) => g / 2)

  // Derived state from progress (for content visibility)
  const isLive = progress > 0.30
  const showTrigger = progress > 0.32
  const showAnalyzing = progress > 0.62 && progress < 0.72
  const showSayThis = progress > 0.70
  const showQuestionCard = progress > 0.76
  const hideEmpty = progress > 0.62

  // Question typing
  const fullQuestion = "Walk me through your biggest competitive win. What was the deal size, who were the stakeholders, and how did you close it?"
  const questionFraction = Math.max(0, Math.min(1, (progress - 0.28) / 0.20))
  const visibleChars = Math.floor(questionFraction * fullQuestion.length)
  const questionText = fullQuestion.slice(0, visibleChars)
  const showTranscriptEmpty = visibleChars === 0

  // Labels
  const labelIdx = progress < 0.28 ? (progress > 0.16 ? 0 : -1) : progress < 0.50 ? 1 : progress > 0.62 && progress < 0.82 ? 2 : -1

  const labels = [
    'The interviewer asks a question...',
    'Your transcript captures every word',
    'Your answer appears in under 500ms',
  ]

  // Scroll hint
  const showHint = progress > 0.02 && progress < 0.14

  return (
    <section ref={containerRef} className="relative" style={{ height: '500vh' }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">

        {/* Phase label */}
        <div className="absolute top-[7%] left-1/2 -translate-x-1/2 z-20 h-6">
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
          style={{ scale: panelScale, opacity: panelOpacity, y: panelY, transformPerspective: 1200 }}
          className="w-[92vw] max-w-[1100px] h-[72vh] max-h-[640px]"
        >
          <div className="w-full h-full flex rounded-xl overflow-visible">

            {/* ══════ LEFT: Coaching Pane ══════ */}
            <motion.div
              style={{ x: leftX, rotateY: leftRotateY, transformPerspective: 1200 }}
              className="w-[60%] rounded-l-xl overflow-hidden border border-[#1a2030] bg-[#0c1117]"
            >
              <div className="h-full flex flex-col">
                {/* Header */}
                <div className="px-4 py-3 flex items-center gap-3 border-b border-[#1a2030] shrink-0">
                  <span className="text-[11px] text-text-tertiary/60 uppercase tracking-wider font-medium">Coaching</span>
                  <span
                    className={`text-[10px] px-2.5 py-1 rounded font-medium border transition-all duration-500 ${
                      isLive
                        ? 'bg-teal/15 text-teal border-teal/30'
                        : 'bg-[#1a2030] text-teal border-teal/20'
                    }`}
                  >
                    {isLive ? 'LIVE' : 'STANDBY'}
                  </span>

                  <div className="ml-auto flex items-center gap-2">
                    {/* AI analyzing pill */}
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

                {/* Trigger detected pill */}
                <div
                  className="px-4 pt-2 shrink-0 transition-all duration-500"
                  style={{ opacity: showTrigger ? 1 : 0, maxHeight: showTrigger ? 40 : 0, overflow: 'hidden' }}
                >
                  <span className="inline-flex items-center gap-1.5 text-[10px] bg-teal/10 text-teal/80 px-3 py-1.5 rounded-full border border-teal/15 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                    Trigger detected &mdash; listening...
                  </span>
                </div>

                {/* Override phrases */}
                <div className="px-4 py-2 border-b border-[#1a2030] flex items-center gap-2 flex-wrap shrink-0">
                  <span className="text-[9px] text-text-tertiary/40 uppercase tracking-wider shrink-0">Override phrases:</span>
                  {[
                    '"Just to be clear, you\'re asking me about ___"',
                    '"Just so I understand, ___"',
                    '"If I\'m hearing you right, ___"',
                  ].map((ph) => (
                    <span key={ph} className="text-[10px] text-teal/70 shrink-0">{ph}</span>
                  ))}
                </div>

                {/* Content area */}
                <div className="flex-1 overflow-y-auto px-4 py-4 relative">
                  {/* Empty state */}
                  {!hideEmpty && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-text-tertiary/25 text-[13px]">Select a position to load your coaching brief</p>
                    </div>
                  )}

                  {/* SAY THIS card */}
                  <div
                    className="transition-all duration-700 ease-out"
                    style={{
                      opacity: showSayThis ? 1 : 0,
                      transform: showSayThis ? 'translateY(0)' : 'translateY(16px)',
                    }}
                  >
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

                  {/* QUESTION card */}
                  <div
                    className="transition-all duration-700 ease-out"
                    style={{
                      opacity: showQuestionCard ? 1 : 0,
                      transform: showQuestionCard ? 'translateY(0)' : 'translateY(16px)',
                    }}
                  >
                    <div className="bg-[#111825] border border-[#1a2030] rounded-lg p-4">
                      <span className="text-[10px] text-text-tertiary/50 uppercase tracking-wider font-medium block mb-2">Question</span>
                      <p className="text-teal/60 text-[11px] leading-[1.6] italic">
                        The interviewer just asked: &ldquo;walk me through your biggest competitive win&rdquo;. Give the candidate a direct, confident response with specific metrics...
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom bar */}
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
              style={{ x: rightX, rotateY: rightRotateY, transformPerspective: 1200 }}
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
                  <p className="text-text-secondary text-[13px] leading-[1.8]">
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
        <div
          className="absolute bottom-[7%] left-1/2 -translate-x-1/2 text-center transition-opacity duration-500"
          style={{ opacity: showHint ? 1 : 0 }}
        >
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
