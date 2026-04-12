import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const demoSequence = [
  {
    question: "Walk me through your biggest competitive win.",
    keyword: "competitive",
    card: {
      title: "Competitive Displacement — Acme Corp",
      tags: ["Biggest Win", "Competitive"],
      metrics: [
        { label: "Deal Size", value: "$823K" },
        { label: "Close Cycle", value: "94 Days" },
        { label: "Stakeholders", value: "7" },
      ],
      narrative: "Displaced incumbent after 8-year relationship. Built champion coalition across operations and finance. Closed with 3-year commitment after exec alignment...",
    },
  },
  {
    question: "How do you approach a new territory?",
    keyword: "territory",
    card: {
      title: "Territory Build — Southeast Region",
      tags: ["Territory", "Growth"],
      metrics: [
        { label: "Pipeline Built", value: "$3.2M" },
        { label: "Timeline", value: "6 Months" },
        { label: "New Logos", value: "14" },
      ],
      narrative: "Inherited greenfield territory with zero pipeline. Mapped 200+ accounts by ICP fit, converted 14 new logos in two quarters...",
    },
  },
  {
    question: "Tell me about a deal you almost lost.",
    keyword: "lost",
    card: {
      title: "Save Deal — GlobalTech Renewal",
      tags: ["Objection Handling", "Save"],
      metrics: [
        { label: "At Risk", value: "$640K" },
        { label: "Recovery", value: "22 Days" },
        { label: "Result", value: "Expanded" },
      ],
      narrative: "Champion left mid-cycle. Re-engaged through CFO with ROI analysis, ran competitive bake-off, expanded deal by 30%...",
    },
  },
]

function TypingText({ text, keyword, onComplete }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(interval)
        setDone(true)
        onComplete?.()
      }
    }, 30)
    return () => clearInterval(interval)
  }, [text])

  if (!done) {
    return (
      <span className="text-text-secondary text-[13px] leading-[1.6]">
        {displayed}
        <span className="animate-pulse text-accent">|</span>
      </span>
    )
  }

  const idx = text.toLowerCase().indexOf(keyword.toLowerCase())
  if (idx === -1) return <span className="text-text-secondary text-[13px]">{text}</span>

  return (
    <span className="text-text-secondary text-[13px] leading-[1.6]">
      {text.slice(0, idx)}
      <motion.span
        initial={{ backgroundColor: 'rgba(124,106,239,0)' }}
        animate={{ backgroundColor: 'rgba(124,106,239,0.25)' }}
        transition={{ duration: 0.3 }}
        className="text-accent font-medium px-0.5 rounded"
      >
        {text.slice(idx, idx + keyword.length)}
      </motion.span>
      {text.slice(idx + keyword.length)}
    </span>
  )
}

function MiniCard({ card }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -10, scale: 0.98 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {/* Flash effect on card appear */}
      <motion.div
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-accent/10 rounded-lg pointer-events-none"
      />

      <div className="bg-surface-2/80 backdrop-blur-sm border border-border/60 rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-border/40">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] uppercase tracking-[0.12em] text-accent font-medium">
              Match Found
            </span>
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: 'auto' }}
              className="text-[9px] bg-green-dim text-green-soft px-2 py-0.5 rounded font-medium"
            >
              &lt; 500ms
            </motion.span>
          </div>
          <p className="text-text-primary font-semibold text-[12px] mt-1.5 leading-tight">
            {card.title}
          </p>
          <div className="flex gap-1.5 mt-2">
            {card.tags.map((tag) => (
              <span key={tag} className="text-[9px] bg-accent-dim text-accent px-2 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="px-4 py-3">
          <div className="grid grid-cols-3 gap-3 mb-3">
            {card.metrics.map((m) => (
              <div key={m.label}>
                <span className="text-[8px] text-text-tertiary uppercase tracking-wider block">{m.label}</span>
                <span className="text-text-primary font-bold text-[14px]">{m.value}</span>
              </div>
            ))}
          </div>
          <p className="text-text-tertiary text-[10px] leading-[1.6]">{card.narrative}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function HeroDemo() {
  const [step, setStep] = useState(0)
  const [showCard, setShowCard] = useState(false)
  const [phase, setPhase] = useState('typing')

  const current = demoSequence[step]

  useEffect(() => {
    if (phase === 'card') {
      const timer = setTimeout(() => setPhase('pause'), 3000)
      return () => clearTimeout(timer)
    }
    if (phase === 'pause') {
      const timer = setTimeout(() => {
        setShowCard(false)
        setStep((s) => (s + 1) % demoSequence.length)
        setPhase('typing')
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [phase])

  function handleTypingComplete() {
    setTimeout(() => {
      setShowCard(true)
      setPhase('card')
    }, 400)
  }

  return (
    <div className="w-full">
      <div className="rounded-2xl border border-border/40 overflow-hidden bg-surface-1/95 backdrop-blur-xl shadow-2xl shadow-black/40">
          {/* Window chrome — frosted */}
          <div className="px-5 py-3 border-b border-border/40 flex items-center gap-2 bg-surface-2/50">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-soft/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#e8b84a]/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-soft/50" />
            </div>
            <span className="text-[10px] text-text-tertiary/60 ml-2 font-medium">Interview Coach — Live Session</span>
            <div className="ml-auto flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-red-soft animate-pulse" />
              <span className="text-[9px] text-red-soft/80 font-medium">REC</span>
            </div>
          </div>

          {/* Split content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 min-h-[300px]">
            {/* Left: Interview */}
            <div className="p-5 sm:p-6 border-r border-border/30 flex flex-col">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-full bg-surface-3/80 flex items-center justify-center ring-1 ring-border/40">
                  <span className="text-[10px] text-text-tertiary font-semibold">VP</span>
                </div>
                <div>
                  <p className="text-[12px] text-text-primary font-medium">Hiring Manager</p>
                  <p className="text-[9px] text-text-tertiary">VP of Sales · Round 3</p>
                </div>
              </div>

              <div className="bg-surface-2/60 backdrop-blur rounded-lg p-4 flex-1 border border-border/20">
                <span className="text-[9px] text-text-tertiary uppercase tracking-wider block mb-2">
                  Current Question
                </span>
                <TypingText
                  key={step}
                  text={current.question}
                  keyword={current.keyword}
                  onComplete={handleTypingComplete}
                />
              </div>

              {/* Timer */}
              <div className="mt-3 flex items-center gap-2">
                <div className="flex-1 h-[3px] bg-surface-3/50 rounded-full overflow-hidden">
                  <motion.div
                    key={step}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 5, ease: 'linear' }}
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, var(--color-accent), var(--color-blue))' }}
                  />
                </div>
              </div>
            </div>

            {/* Right: Coaching sidebar */}
            <div className="p-5 sm:p-6 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase tracking-[0.12em] text-text-tertiary/70 font-medium">
                  Coaching Sidebar
                </span>
                <span className="text-[9px] text-accent/60 font-medium">Auto</span>
              </div>

              <div className="flex-1 relative">
                <AnimatePresence mode="wait">
                  {showCard ? (
                    <MiniCard key={`card-${step}`} card={current.card} />
                  ) : (
                    <motion.div
                      key="waiting"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex items-center justify-center h-full"
                    >
                      <div className="text-center">
                        <div className="flex justify-center gap-1.5 mb-3">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] }}
                              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                              className="w-1.5 h-1.5 rounded-full bg-accent"
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-text-tertiary/50">Listening...</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
      </div>

      <p className="text-center text-[11px] text-text-tertiary/40 mt-5 tracking-wide">
        Live demo &mdash; your prep card fires before the question finishes
      </p>
    </div>
  )
}
