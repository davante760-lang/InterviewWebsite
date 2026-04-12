import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'

function useIsMobile() {
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return mobile
}

export default function CinematicDemo() {
  const isMobile = useIsMobile()
  return isMobile ? <MobileDemo /> : <DesktopDemo />
}

/* ══════════════════════════════════════════════════════════════
   MOBILE: Z-Stack Card Swap + Macro Focus
   Two full-width cards stacked in Z-depth. Scroll peels them
   apart, brings transcript forward (zoomed in for readability),
   swaps to coaching card, then re-stacks.
   ══════════════════════════════════════════════════════════════ */
function MobileDemo() {
  const ref = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [progress, setProgress] = useState(0)
  useMotionValueEvent(p, 'change', (v) => setProgress(v))

  // ALL visibility via React state — motion value opacity doesn't propagate
  const showTranscript = progress < 0.44
  const showCoaching = progress >= 0.44

  const fullQ = "Walk me through your biggest competitive displacement."
  const qFrac = Math.max(0, Math.min(1, (progress - 0.12) / 0.28))
  const qText = fullQ.slice(0, Math.floor(qFrac * fullQ.length))

  const isLive = progress > 0.12
  const showTrigger = progress > 0.48 && progress < 0.56
  const showAnalyzing = progress > 0.56 && progress < 0.64
  const showSayThis = progress > 0.64
  const showQCard = progress > 0.70
  const hideEmpty = progress > 0.48

  const label =
    progress > 0.04 && progress < 0.12 ? 'The interviewer asks a question...' :
    progress >= 0.12 && progress < 0.42 ? 'Your transcript captures every word' : null

  const containerVisible = progress > 0.005 && progress < 0.95

  return (
    <section ref={ref} className="relative" style={{ height: '900vh' }}>
      <div className="sticky top-0 h-screen flex flex-col items-center pt-28 px-4 overflow-hidden">

        {/* Label */}
        <div className="h-4 mb-2">
          <span className="text-[11px] tracking-wide text-text-tertiary/40 transition-opacity duration-500"
            style={{ opacity: label ? 1 : 0 }}>{label || '\u00A0'}</span>
        </div>

        {/* Single card area — crossfade between transcript and coaching */}
        <div
          className="relative w-full max-w-[400px] transition-opacity duration-600"
          style={{ opacity: containerVisible ? 1 : 0 }}
        >
          {/* TRANSCRIPT CARD */}
          <div
            className="rounded-xl border border-[#1a2030] bg-[#0c1117] overflow-hidden shadow-xl shadow-black/40 transition-all duration-500"
            style={{
              opacity: showTranscript ? 1 : 0,
              transform: showTranscript ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(20px)',
              position: showCoaching ? 'absolute' : 'relative',
              inset: showCoaching ? 0 : undefined,
              pointerEvents: showTranscript ? 'auto' : 'none',
            }}
          >
            <div className="flex flex-col" style={{ minHeight: '70vh' }}>
              <div className="px-3 py-2.5 flex items-center justify-between border-b border-[#1a2030]">
                <span className="text-[10px] text-text-tertiary/60 uppercase tracking-wider font-medium">Live Transcript</span>
                <span className="text-[9px] text-teal/50 font-medium">{qText.split(/\s+/).filter(Boolean).length} words</span>
              </div>
              <div className="flex-1 px-4 py-5 relative">
                {qFrac === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-text-tertiary/20 text-[11px]">Transcript starts with session</p>
                  </div>
                )}
                {qFrac > 0 && (
                  <p className="text-[10px] text-teal/50 font-medium uppercase tracking-wider mb-2">Interviewer</p>
                )}
                <p className="text-text-secondary text-[15px] leading-[1.9]">
                  {qText}
                  {qFrac > 0 && qFrac < 1 && <span className="text-teal animate-pulse">|</span>}
                </p>
              </div>
              <div className="px-3 py-2.5 border-t border-[#1a2030]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[8px] text-text-tertiary/40 uppercase tracking-wider font-medium">Talk Ratio</span>
                  <span className="text-[8px] text-text-tertiary/25">Target</span>
                </div>
                <div className="h-1.5 bg-[#1a2030] rounded-full overflow-hidden">
                  <div className="h-full bg-teal rounded-full" style={{ width: '40%' }} />
                </div>
                <div className="flex gap-3 mt-1">
                  <span className="text-[8px] text-text-tertiary/50 flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-teal inline-block" /> You: 40%</span>
                  <span className="text-[8px] text-text-tertiary/25 flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-text-tertiary/20 inline-block" /> Them: 60%</span>
                </div>
              </div>
            </div>
          </div>

          {/* COACHING CARD */}
          <div
            className="rounded-xl border border-[#1a2030] bg-[#0c1117] overflow-hidden shadow-xl shadow-black/40 transition-all duration-500"
            style={{
              opacity: showCoaching ? 1 : 0,
              transform: showCoaching ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(-20px)',
              position: showTranscript ? 'absolute' : 'relative',
              inset: showTranscript ? 0 : undefined,
              pointerEvents: showCoaching ? 'auto' : 'none',
            }}
          >
            <div className="flex flex-col" style={{ minHeight: '70vh' }}>
              <div className="px-4 py-3 flex items-center gap-2 border-b border-[#1a2030]">
                <span className="text-[12px] text-text-tertiary/60 uppercase tracking-wider font-medium">Coaching</span>
                <span className={`text-[11px] px-2.5 py-1 rounded font-medium border transition-all duration-500 ${
                  isLive ? 'bg-teal/15 text-teal border-teal/30' : 'bg-[#1a2030] text-teal border-teal/20'
                }`}>{isLive ? 'LIVE' : 'STANDBY'}</span>
                <span className="text-[10px] bg-teal/15 text-teal px-2.5 py-1 rounded-full font-medium border border-teal/20 flex items-center gap-1.5 ml-auto transition-all duration-300"
                  style={{ opacity: showAnalyzing ? 1 : 0 }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />AI analyzing...
                </span>
              </div>
              <div className="px-4 pt-2.5 pb-2 transition-all duration-500" style={{ opacity: showTrigger ? 1 : 0, maxHeight: showTrigger ? 48 : 0, overflow: 'hidden' }}>
                <span className="inline-flex items-center gap-1.5 text-[10px] bg-teal/10 text-teal/80 px-3 py-1.5 rounded-full border border-teal/15 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal" />Trigger detected &mdash; listening...
                </span>
              </div>
              <div className="px-4 py-2 border-b border-[#1a2030]">
                <span className="text-[9px] text-text-tertiary/40 uppercase tracking-wider block mb-1">Override phrases:</span>
                <div className="flex flex-wrap gap-x-2 gap-y-1">
                  {['"Just to be clear, ___"', '"Just so I understand, ___"'].map((ph) => (
                    <span key={ph} className="text-[10px] text-teal/60">{ph}</span>
                  ))}
                </div>
              </div>
              <div className="flex-1 overflow-y-auto px-4 py-4">
                {!hideEmpty && <p className="text-text-tertiary/20 text-[13px] text-center mt-16">Select a position to load your coaching brief</p>}
                <div className="transition-all duration-600 ease-out" style={{ opacity: showSayThis ? 1 : 0, transform: showSayThis ? 'translateY(0)' : 'translateY(14px)' }}>
                  <div className="border-l-2 border-teal/60 bg-[#111825] rounded-r-lg p-4 mb-4">
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="w-2 h-2 rounded-full bg-teal" />
                      <span className="text-[10px] text-text-tertiary/50 uppercase tracking-wider font-medium">Say This</span>
                      <span className="text-[10px] text-text-tertiary/30 ml-auto">07:05 AM</span>
                    </div>
                    <p className="text-text-secondary text-[14px] leading-[1.7]">Displaced an 8-year incumbent. $225K ACV, 7-month cycle. The challenge was they had relationships everywhere &mdash; I had to build my own coalition from scratch. Anchored with the ops team first, got finance aligned, then used that momentum to get in front of the CFO. Three-year commitment on the close.</p>
                  </div>
                </div>
                <div className="transition-all duration-600 ease-out" style={{ opacity: showQCard ? 1 : 0, transform: showQCard ? 'translateY(0)' : 'translateY(14px)' }}>
                  <div className="bg-[#111825] border border-[#1a2030] rounded-lg p-4">
                    <span className="text-[10px] text-text-tertiary/50 uppercase tracking-wider font-medium block mb-1.5">Question</span>
                    <p className="text-teal/60 text-[12px] leading-[1.6] italic">The interviewer just asked: &ldquo;walk me through your biggest competitive displacement.&rdquo; Give a direct, confident response with specific metrics...</p>
                  </div>
                </div>
              </div>
              <div className="px-3 py-1.5 border-t border-[#1a2030]">
                <div className="flex items-center bg-[#111825] rounded-lg border border-[#1a2030] px-2 py-1.5">
                  <span className="text-[9px] text-teal font-medium mr-2">✦</span>
                  <span className="text-[9px] text-text-tertiary/30 flex-1">Ask AI</span>
                  <div className="w-4 h-4 rounded-full bg-teal/80 flex items-center justify-center"><span className="text-[6px] text-white">▶</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="mt-5 transition-opacity duration-500" style={{ opacity: progress > 0.001 && progress < 0.02 ? 1 : 0 }}>
          <div className="text-text-tertiary/25 animate-bounce flex justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
          </div>
          <p className="text-[9px] text-text-tertiary/20 mt-1 tracking-wider text-center">Scroll to experience</p>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════
   DESKTOP: 3D split panel depth carousel (unchanged)
   ══════════════════════════════════════════════════════════════ */
function DesktopDemo() {
  const containerRef = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const [progress, setProgress] = useState(0)
  useMotionValueEvent(p, 'change', (v) => setProgress(v))

  const panelScale = useTransform(p, [0, 0.10, 0.82, 1.0], [0.7, 1, 1, 0.97])
  const panelOpacity = useTransform(p, [0, 0.06, 0.85, 0.95], [0, 1, 1, 0])
  const panelY = useTransform(p, [0, 0.10], [120, 0])
  const splitGap = useTransform(p, [0.10, 0.20, 0.72, 0.82], [0, 100, 100, 0])
  const leftX = useTransform(splitGap, (g) => -g / 2)
  const rightX = useTransform(splitGap, (g) => g / 2)
  const rightRotateY = useTransform(p, [0.10, 0.20, 0.22, 0.38, 0.42, 0.55], [0, -8, -25, -25, -8, 0])
  const rightScale = useTransform(p, [0.10, 0.22, 0.38, 0.42, 0.55], [1, 1.15, 1.15, 1.05, 1])
  const rightZ = useTransform(p, [0.10, 0.22, 0.38, 0.42, 0.55], [0, 150, 150, 40, 0])
  const rightBrightness = useTransform(p, [0.22, 0.30, 0.38, 0.50], [1, 1.1, 1.1, 1])
  const leftRotateY = useTransform(p, [0.10, 0.20, 0.42, 0.55, 0.68, 0.72, 0.82], [0, 8, 8, 25, 25, 8, 0])
  const leftScale = useTransform(p, [0.10, 0.42, 0.55, 0.68, 0.72, 0.82], [1, 1, 1.15, 1.15, 1.05, 1])
  const leftZ = useTransform(p, [0.10, 0.42, 0.55, 0.68, 0.72, 0.82], [0, 0, 150, 150, 40, 0])
  const leftDim = useTransform(p, [0.22, 0.30, 0.42, 0.50], [1, 0.4, 0.4, 1])
  const leftBrightness = useTransform(p, [0.50, 0.58, 0.68, 0.78], [1, 1.1, 1.1, 1])

  const isLive = progress > 0.25
  const showTrigger = progress > 0.52 && progress < 0.60
  const showAnalyzing = progress > 0.60 && progress < 0.68
  const showSayThis = progress > 0.68
  const showQuestionCard = progress > 0.69
  const hideEmpty = progress > 0.52
  const fullQuestion = "Walk me through your biggest competitive displacement."
  const questionFraction = Math.max(0, Math.min(1, (progress - 0.22) / 0.18))
  const visibleChars = Math.floor(questionFraction * fullQuestion.length)
  const questionText = fullQuestion.slice(0, visibleChars)
  const showTranscriptEmpty = visibleChars === 0
  const labelIdx = progress > 0.12 && progress < 0.22 ? 0 : progress >= 0.22 && progress < 0.42 ? 1 : -1
  const labels = ['The interviewer asks a question...', 'Your transcript captures every word']
  const showHint = progress > 0.02 && progress < 0.12

  return (
    <section ref={containerRef} className="relative" style={{ height: '900vh' }}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden" style={{ perspective: '1200px' }}>
        {/* Headline */}
        <motion.h2
          style={{ opacity: panelOpacity }}
          className="font-heading font-bold text-[20px] sm:text-[26px] md:text-[32px] tracking-[-0.02em] text-text-primary/80 text-center mb-6 px-4"
        >
          Real question. Real answer. <span style={{ color: '#00E0CC' }}>500 milliseconds.</span>
        </motion.h2>

        {/* Phase labels */}
        <div className="relative h-6 mb-4">
          {labels.map((label, i) => (
            <span key={i} className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[12px] tracking-wide transition-opacity duration-500 text-text-tertiary/40"
              style={{ opacity: labelIdx === i ? 1 : 0 }}>{label}</span>
          ))}
        </div>

        <motion.div style={{ scale: panelScale, opacity: panelOpacity, y: panelY }} className="w-[92vw] max-w-[1100px] h-[58vh] max-h-[520px]">
          <div className="w-full h-full flex overflow-visible" style={{ perspective: '1200px', borderRadius: '14px', background: '#0D1117', boxShadow: '0 4px 24px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.07)' }}>

            {/* ══ LEFT: Coaching Panel ══ */}
            <motion.div style={{ x: leftX, rotateY: leftRotateY, scale: leftScale, z: leftZ, filter: useTransform(leftDim, (d) => `brightness(${d})`), flex: '1.55', minWidth: '300px', background: 'rgba(16,22,34,0.72)', backdropFilter: 'blur(20px)', borderRadius: '14px 0 0 14px' }}
              className="origin-left overflow-hidden">
              <div className="h-full flex flex-col relative">

                {/* Header */}
                <div className="flex items-center gap-3 shrink-0" style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.04)', background: 'linear-gradient(180deg, rgba(255,255,255,0.015) 0%, transparent 100%)' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10.5px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8B9BB4' }}>Coaching</span>
                  <span className="transition-all duration-500" style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: '14px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.07em',
                    padding: '2px 8px', borderRadius: '4px',
                    background: isLive ? 'rgba(0,224,204,0.15)' : 'rgba(139,155,180,0.15)',
                    color: isLive ? '#00E0CC' : '#8B9BB4',
                  }}>{isLive ? 'LIVE' : 'STANDBY'}</span>
                  <div className="ml-auto flex items-center gap-2">
                    <span className="flex items-center gap-1.5 transition-all duration-300" style={{
                      opacity: showAnalyzing ? 1 : 0, transform: showAnalyzing ? 'translateY(0)' : 'translateY(-4px)',
                      fontSize: '13.5px', fontWeight: 600, color: '#00E0CC', background: 'rgba(0,224,204,0.10)', border: '1px solid rgba(0,224,204,0.28)',
                      padding: '8px 16px', borderRadius: '8px',
                    }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00E0CC' }} className="animate-pulse" />AI analyzing...
                    </span>
                    <div style={{ padding: '4px 6px', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px' }} className="flex items-center justify-center">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5A6A82" strokeWidth="1.5"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
                    </div>
                    <div style={{ padding: '4px 6px', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px' }} className="flex items-center justify-center">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5A6A82" strokeWidth="1.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                    </div>
                  </div>
                </div>

                {/* Trigger detected */}
                <div className="shrink-0 transition-all duration-500" style={{ opacity: showTrigger ? 1 : 0, maxHeight: showTrigger ? 44 : 0, overflow: 'hidden', padding: '8px 20px' }}>
                  <span className="inline-flex items-center gap-1.5" style={{ fontSize: '14px', fontWeight: 500, color: '#00E0CC', background: 'transparent', border: '1px solid rgba(0,224,204,0.35)', padding: '4px 12px', borderRadius: '20px' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00E0CC' }} />Trigger detected &mdash; listening...
                  </span>
                </div>

                {/* Override phrases */}
                <div className="flex items-start gap-1.5 flex-wrap shrink-0" style={{ padding: '8px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9.5px', fontWeight: 600, color: '#5A6A82', textTransform: 'uppercase', letterSpacing: '0.09em', marginTop: '4px', flexShrink: 0 }}>Override phrases:</span>
                  <div className="flex flex-wrap gap-2">
                    {['"Just to be clear, you\'re asking me about ___"', '"Just so I understand, ___"', '"If I\'m hearing you right, you want to know about ___"'].map((ph) => (
                      <span key={ph} style={{ fontSize: '14px', fontWeight: 500, color: '#00E0CC', background: 'transparent', border: '1px solid rgba(0,224,204,0.35)', padding: '4px 12px', borderRadius: '20px' }}>{ph}</span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-hidden relative" style={{ padding: '14px 18px 16px' }}>
                  {!hideEmpty && <div className="absolute inset-0 flex items-center justify-center"><p style={{ fontSize: '14px', fontWeight: 600, color: '#8B9BB4' }}>Select a position to load your coaching brief</p></div>}
                  <div className="transition-all duration-700 ease-out" style={{ opacity: showSayThis ? 1 : 0, transform: showSayThis ? 'translateY(0)' : 'translateY(16px)' }}>
                    <div style={{ background: 'rgba(0,224,204,0.04)', border: '1px solid rgba(0,224,204,0.14)', borderLeft: '3px solid #00E0CC', borderRadius: '10px', padding: '12px 16px 12px 20px', marginBottom: '16px', boxShadow: '0 0 20px rgba(0,224,204,0.04)' }}>
                      <div className="flex items-center gap-2 mb-2">
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00E0CC' }} />
                        <span style={{ fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#5A6A82' }}>Say This</span>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '14px', color: '#5A6A82', marginLeft: 'auto' }}>07:05 AM</span>
                      </div>
                      <p style={{ fontSize: '15px', fontWeight: 400, lineHeight: 1.75, color: '#EDF2F7' }}>Displaced an 8-year incumbent. $225K ACV, 7-month cycle. The challenge was they had relationships everywhere &mdash; I had to build my own coalition from scratch. Anchored with the ops team first, got finance aligned, then used that momentum to get in front of the CFO. Three-year commitment on the close.</p>
                    </div>
                  </div>
                  <div className="transition-all duration-700 ease-out" style={{ opacity: showQuestionCard ? 1 : 0, transform: showQuestionCard ? 'translateY(0)' : 'translateY(16px)' }}>
                    <div style={{ background: 'rgba(139,122,255,0.03)', border: '1px solid rgba(139,122,255,0.08)', borderRadius: '10px', padding: '8px 12px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#5A6A82', display: 'block', marginBottom: '4px' }}>Question</span>
                      <p style={{ fontSize: '13.5px', fontStyle: 'italic', color: '#CBD5E1', lineHeight: 1.5 }}>The interviewer just asked: &ldquo;walk me through your biggest competitive displacement.&rdquo; Give the candidate a direct, confident response with specific metrics...</p>
                    </div>
                  </div>
                </div>

                {/* Ask AI bar */}
                <div className="shrink-0" style={{ padding: '10px 16px 14px', borderTop: '1px solid rgba(255,255,255,0.04)', background: 'linear-gradient(0deg, rgba(255,255,255,0.01) 0%, transparent 100%)' }}>
                  <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#00E0CC', background: 'rgba(0,224,204,0.10)', border: '1px solid rgba(0,224,204,0.28)', padding: '8px 16px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '11px' }}>✦</span> Ask AI
                  </span>
                  <div className="mt-2 flex items-center" style={{ background: 'rgba(8,11,18,0.65)', border: '1px solid rgba(0,224,204,0.28)', borderRadius: '24px', padding: '0 14px', height: '44px', gap: '10px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(0,224,204,0.5)" strokeWidth="1.5" className="shrink-0"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
                    <span style={{ fontSize: '14px', color: '#5A6A82', flex: 1 }}>Ask AI</span>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#00E0CC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#080B12" strokeWidth="2"><path d="M22 2L11 13" /><path d="M22 2L15 22L11 13L2 9L22 2Z" /></svg>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ══ DIVIDER ══ */}
            <div style={{ width: '2px', margin: '20px 0', borderRadius: '1px', background: 'linear-gradient(to bottom, transparent 5%, rgba(0,224,204,0.35) 30%, rgba(139,122,255,0.25) 70%, transparent 95%)' }} />

            {/* ══ RIGHT: Transcript Panel ══ */}
            <motion.div style={{ x: rightX, rotateY: rightRotateY, scale: rightScale, z: rightZ, filter: useTransform(rightBrightness, (b) => `brightness(${b})`), flex: 1, minWidth: '240px', background: 'rgba(13,17,23,0.75)', borderRadius: '0 14px 14px 0' }}
              className="origin-right overflow-hidden">
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between shrink-0" style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.04)', background: 'linear-gradient(180deg, rgba(255,255,255,0.015) 0%, transparent 100%)' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10.5px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8B9BB4' }}>Live Transcript</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '9999px', background: 'rgba(28,38,58,0.65)', color: '#5A6A82' }}>{questionText.split(/\s+/).filter(Boolean).length} words</span>
                </div>
                <div className="flex-1 relative" style={{ padding: '14px 18px 16px' }}>
                  {showTranscriptEmpty && <div className="absolute inset-0 flex items-center justify-center"><p style={{ fontSize: '14px', fontWeight: 600, color: '#CBD5E1' }}>Transcript starts with session</p></div>}
                  {questionFraction > 0 && <p style={{ fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#00E0CC', marginBottom: '8px' }}>Interviewer</p>}
                  <p style={{ fontSize: '14px', fontWeight: 400, lineHeight: 1.65, letterSpacing: '0.01em', color: '#F1F5F9' }}>{questionText}{questionFraction > 0 && questionFraction < 1 && <span className="animate-pulse" style={{ color: '#00E0CC' }}>|</span>}</p>
                </div>
                {/* Talk Ratio */}
                <div className="shrink-0" style={{ padding: '12px 16px 14px', borderTop: '1px solid rgba(139,155,180,0.1)' }}>
                  <div className="flex items-center justify-between" style={{ marginBottom: '6px' }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#5A6A82' }}>Talk Ratio</span>
                    <span style={{ fontSize: '11px', color: '#5A6A82' }}>Target</span>
                  </div>
                  <div style={{ height: '6px', borderRadius: '999px', background: 'rgba(139,155,180,0.1)', overflow: 'hidden' }}><div style={{ height: '100%', width: '40%', borderRadius: '999px', background: '#00E0CC' }} /></div>
                  <div className="flex" style={{ gap: '16px', marginTop: '6px' }}>
                    <span className="flex items-center" style={{ gap: '4px', fontSize: '12px', color: '#8B9BB4' }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00E0CC', display: 'inline-block' }} /> You: 40%</span>
                    <span className="flex items-center" style={{ gap: '4px', fontSize: '12px', color: '#8B9BB4' }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(139,155,180,0.4)', display: 'inline-block' }} /> Them: 60%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
        <div className="absolute bottom-[7%] left-1/2 -translate-x-1/2 text-center transition-opacity duration-500" style={{ opacity: showHint ? 1 : 0 }}>
          <div className="text-text-tertiary/25 animate-bounce"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5v14M5 12l7 7 7-7" /></svg></div>
          <p className="text-[10px] text-text-tertiary/20 mt-1 tracking-wider">Scroll to experience</p>
        </div>
      </div>
    </section>
  )
}
