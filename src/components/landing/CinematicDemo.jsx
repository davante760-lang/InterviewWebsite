import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'

/*
  Scroll choreography across 600vh — same 3D split on ALL screens.
  On mobile, the panel starts smaller (0.5 scale) so it fits,
  and the 3D rotation makes each pane feel full-size when forward.
*/

export default function CinematicDemo() {
  const containerRef = useRef(null)
  const { scrollYProgress: p } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const [progress, setProgress] = useState(0)
  useMotionValueEvent(p, 'change', (v) => setProgress(v))

  // Panel starts smaller on mobile so the full thing is visible
  const panelScale = useTransform(p, [0, 0.10, 0.82, 1.0], [0.5, 0.85, 0.85, 0.65])
  const panelOpacity = useTransform(p, [0, 0.06, 0.90, 1.0], [0, 1, 1, 0.4])
  const panelY = useTransform(p, [0, 0.10], [120, 0])

  const splitGap = useTransform(p, [0.10, 0.20, 0.72, 0.82], [0, 100, 100, 0])
  const leftX = useTransform(splitGap, (g) => -g / 2)
  const rightX = useTransform(splitGap, (g) => g / 2)

  // RIGHT PANE: transcript forward then recedes — larger scale so it's readable on mobile
  const rightRotateY = useTransform(p, [0.10, 0.20, 0.22, 0.38, 0.42, 0.55], [0, -8, -25, -25, -8, 0])
  const rightScale = useTransform(p, [0.10, 0.22, 0.38, 0.42, 0.55], [1, 1.6, 1.6, 1.1, 1])
  const rightZ = useTransform(p, [0.10, 0.22, 0.38, 0.42, 0.55], [0, 200, 200, 40, 0])
  const rightBrightness = useTransform(p, [0.22, 0.30, 0.38, 0.50], [1, 1.1, 1.1, 1])

  // LEFT PANE: recedes then forward — larger scale for readability
  const leftRotateY = useTransform(p, [0.10, 0.20, 0.42, 0.55, 0.68, 0.72, 0.82], [0, 8, 8, 25, 25, 8, 0])
  const leftScale = useTransform(p, [0.10, 0.42, 0.55, 0.68, 0.72, 0.82], [1, 1, 1.6, 1.6, 1.1, 1])
  const leftZ = useTransform(p, [0.10, 0.42, 0.55, 0.68, 0.72, 0.82], [0, 0, 200, 200, 40, 0])
  const leftDim = useTransform(p, [0.22, 0.30, 0.42, 0.50], [1, 0.4, 0.4, 1])
  const leftBrightness = useTransform(p, [0.50, 0.58, 0.68, 0.78], [1, 1.1, 1.1, 1])

  // Content
  const isLive = progress > 0.25
  const showTrigger = progress > 0.52 && progress < 0.60
  const showAnalyzing = progress > 0.60 && progress < 0.68
  const showSayThis = progress > 0.68
  const showQuestionCard = progress > 0.72
  const hideEmpty = progress > 0.52

  const fullQuestion = "Walk me through your biggest competitive win. What was the deal size, who were the stakeholders, and how did you close it?"
  const questionFraction = Math.max(0, Math.min(1, (progress - 0.22) / 0.18))
  const visibleChars = Math.floor(questionFraction * fullQuestion.length)
  const questionText = fullQuestion.slice(0, visibleChars)
  const showTranscriptEmpty = visibleChars === 0

  const labelIdx =
    progress > 0.12 && progress < 0.22 ? 0 :
    progress >= 0.22 && progress < 0.42 ? 1 : -1
  const labels = ['The interviewer asks a question...', 'Your transcript captures every word']
  const showHint = progress > 0.02 && progress < 0.12

  return (
    <section ref={containerRef} className="relative" style={{ height: '600vh' }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden" style={{ perspective: '1200px' }}>

        {/* Label */}
        <div className="absolute top-[7%] left-1/2 -translate-x-1/2 z-30 h-6">
          {labels.map((label, i) => (
            <span key={i} className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] sm:text-[12px] tracking-wide transition-opacity duration-500 text-text-tertiary/40"
              style={{ opacity: labelIdx === i ? 1 : 0 }}>{label}</span>
          ))}
        </div>

        {/* Panel — uses vw-based width so it adapts to screen */}
        <motion.div
          style={{ scale: panelScale, opacity: panelOpacity, y: panelY }}
          className="w-[95vw] max-w-[1100px] h-[75vh] max-h-[640px]"
        >
          <div className="w-full h-full flex rounded-xl overflow-visible" style={{ perspective: '1200px' }}>

            {/* LEFT: Coaching */}
            <motion.div
              style={{ x: leftX, rotateY: leftRotateY, scale: leftScale, z: leftZ, filter: useTransform(leftDim, (d) => `brightness(${d})`) }}
              className="w-[60%] rounded-l-xl overflow-hidden border border-[#1a2030] bg-[#0c1117] origin-left"
            >
              <div className="h-full flex flex-col">
                <div className="px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2 sm:gap-3 border-b border-[#1a2030] shrink-0">
                  <span className="text-[9px] sm:text-[11px] text-text-tertiary/60 uppercase tracking-wider font-medium">Coaching</span>
                  <span className={`text-[8px] sm:text-[10px] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded font-medium border transition-all duration-500 ${isLive ? 'bg-teal/15 text-teal border-teal/30' : 'bg-[#1a2030] text-teal border-teal/20'}`}>
                    {isLive ? 'LIVE' : 'STANDBY'}
                  </span>
                  <div className="ml-auto flex items-center gap-1 sm:gap-2">
                    <span className="text-[8px] sm:text-[10px] bg-teal/15 text-teal px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-medium border border-teal/20 flex items-center gap-1 transition-all duration-400"
                      style={{ opacity: showAnalyzing ? 1 : 0, transform: showAnalyzing ? 'translateY(0)' : 'translateY(-4px)' }}>
                      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-teal animate-pulse" />AI analyzing...
                    </span>
                  </div>
                </div>

                <div className="px-3 sm:px-4 pt-1.5 sm:pt-2 shrink-0 transition-all duration-500" style={{ opacity: showTrigger ? 1 : 0, maxHeight: showTrigger ? 36 : 0, overflow: 'hidden' }}>
                  <span className="inline-flex items-center gap-1 text-[8px] sm:text-[10px] bg-teal/10 text-teal/80 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-teal/15 font-medium">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-teal" />Trigger detected &mdash; listening...
                  </span>
                </div>

                <div className="px-3 sm:px-4 py-1.5 sm:py-2 border-b border-[#1a2030] flex items-center gap-1.5 sm:gap-2 flex-wrap shrink-0">
                  <span className="text-[7px] sm:text-[9px] text-text-tertiary/40 uppercase tracking-wider shrink-0">Override phrases:</span>
                  {['"Just to be clear, ___"', '"Just so I understand, ___"', '"If I\'m hearing you right, ___"'].map((ph) => (
                    <span key={ph} className="text-[7px] sm:text-[10px] text-teal/70 shrink-0">{ph}</span>
                  ))}
                </div>

                <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 sm:py-4 relative">
                  {!hideEmpty && <div className="absolute inset-0 flex items-center justify-center"><p className="text-text-tertiary/25 text-[10px] sm:text-[13px]">Select a position to load your coaching brief</p></div>}
                  <div className="transition-all duration-700 ease-out" style={{ opacity: showSayThis ? 1 : 0, transform: showSayThis ? 'translateY(0)' : 'translateY(16px)' }}>
                    <div className="border-l-[2px] sm:border-l-[3px] border-teal/60 bg-[#111825] rounded-r-lg p-2.5 sm:p-4 mb-3 sm:mb-4">
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-teal" />
                        <span className="text-[8px] sm:text-[10px] text-text-tertiary/50 uppercase tracking-wider font-medium">Say This</span>
                        <span className="text-[8px] sm:text-[10px] text-text-tertiary/30 ml-auto">07:05 AM</span>
                      </div>
                      <p className="text-text-secondary text-[9px] sm:text-[12px] leading-[1.6] sm:leading-[1.7]">I displaced a competitor after an 8-year relationship &mdash; $823K deal, 94-day close cycle, 7 stakeholders. I built a champion coalition across operations and finance, structured the POC around their highest-pain workflow, and closed with a 3-year commitment after an executive alignment session with the CFO.</p>
                    </div>
                  </div>
                  <div className="transition-all duration-700 ease-out" style={{ opacity: showQuestionCard ? 1 : 0, transform: showQuestionCard ? 'translateY(0)' : 'translateY(16px)' }}>
                    <div className="bg-[#111825] border border-[#1a2030] rounded-lg p-2.5 sm:p-4">
                      <span className="text-[8px] sm:text-[10px] text-text-tertiary/50 uppercase tracking-wider font-medium block mb-1.5 sm:mb-2">Question</span>
                      <p className="text-teal/60 text-[8px] sm:text-[11px] leading-[1.5] sm:leading-[1.6] italic">The interviewer just asked: &ldquo;walk me through your biggest competitive win&rdquo;. Give the candidate a direct, confident response with specific metrics...</p>
                    </div>
                  </div>
                </div>

                <div className="px-3 sm:px-4 py-1.5 sm:py-2 border-t border-[#1a2030] shrink-0">
                  <span className="text-[8px] sm:text-[10px] bg-teal/15 text-teal px-1.5 sm:px-2 py-0.5 sm:py-1 rounded font-medium">✦ Ask AI</span>
                  <div className="mt-1.5 sm:mt-2 flex items-center bg-[#111825] rounded-lg border border-[#1a2030] px-2 sm:px-3 py-1.5 sm:py-2">
                    <span className="text-[9px] sm:text-[11px] text-text-tertiary/30 flex-1">💬 Ask AI</span>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-teal/80 flex items-center justify-center"><span className="text-[6px] sm:text-[8px] text-white">▶</span></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: Transcript */}
            <motion.div
              style={{ x: rightX, rotateY: rightRotateY, scale: rightScale, z: rightZ, filter: useTransform(rightBrightness, (b) => `brightness(${b})`) }}
              className="w-[40%] rounded-r-xl overflow-hidden border border-[#1a2030] border-l-0 bg-[#0c1117] origin-right"
            >
              <div className="h-full flex flex-col">
                <div className="px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between border-b border-[#1a2030] shrink-0">
                  <span className="text-[9px] sm:text-[11px] text-text-tertiary/60 uppercase tracking-wider font-medium">Live Transcript</span>
                  <span className="text-[8px] sm:text-[10px] text-teal/50 font-medium">{questionText.split(/\s+/).filter(Boolean).length} words</span>
                </div>
                <div className="flex-1 px-3 sm:px-5 py-4 sm:py-6 relative">
                  {showTranscriptEmpty && <div className="absolute inset-0 flex items-center justify-center"><p className="text-text-tertiary/20 text-[10px] sm:text-[13px]">Transcript starts with session</p></div>}
                  <p className="text-text-secondary text-[11px] sm:text-[14px] leading-[1.7] sm:leading-[1.9]">
                    {questionText}{questionFraction > 0 && questionFraction < 1 && <span className="text-teal animate-pulse">|</span>}
                  </p>
                </div>
                <div className="px-3 sm:px-4 py-2 sm:py-3 border-t border-[#1a2030] shrink-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[7px] sm:text-[9px] text-text-tertiary/40 uppercase tracking-wider font-medium">Talk Ratio</span>
                    <span className="text-[7px] sm:text-[9px] text-text-tertiary/25">Target</span>
                  </div>
                  <div className="h-1.5 sm:h-2 bg-[#1a2030] rounded-full overflow-hidden flex"><div className="h-full bg-teal rounded-full" style={{ width: '40%' }} /></div>
                  <div className="flex gap-3 sm:gap-4 mt-1">
                    <span className="text-[7px] sm:text-[9px] text-text-tertiary/50 flex items-center gap-1"><span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-teal inline-block" /> You: 40%</span>
                    <span className="text-[7px] sm:text-[9px] text-text-tertiary/25 flex items-center gap-1"><span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-text-tertiary/20 inline-block" /> Them: 60%</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>

        <div className="absolute bottom-[7%] left-1/2 -translate-x-1/2 text-center transition-opacity duration-500" style={{ opacity: showHint ? 1 : 0 }}>
          <div className="text-text-tertiary/25 animate-bounce">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
          </div>
          <p className="text-[9px] text-text-tertiary/20 mt-1 tracking-wider">Scroll to experience</p>
        </div>
      </div>
    </section>
  )
}
