import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const practiceQuestions = [
  { round: 'VP Round', question: "Tell me about your largest competitive displacement.", category: 'Deal Story' },
  { round: 'HM Round', question: "How do you approach territory planning?", category: 'Strategy' },
  { round: 'Panel', question: "Walk me through your pipeline generation strategy.", category: 'Process' },
  { round: 'Phone Screen', question: "Why are you looking to leave your current role?", category: 'Motivation' },
]

function PracticeMock({ isInView }) {
  const [idx, setIdx] = useState(0)
  const [phase, setPhase] = useState('question') // question | coaching | feedback

  useEffect(() => {
    if (!isInView) return
    const timers = []

    // Question phase
    timers.push(setTimeout(() => setPhase('coaching'), 2000))
    // Coaching card appears
    timers.push(setTimeout(() => setPhase('feedback'), 4000))
    // Feedback, then cycle
    timers.push(setTimeout(() => {
      setIdx((i) => (i + 1) % practiceQuestions.length)
      setPhase('question')
    }, 6000))

    return () => timers.forEach(clearTimeout)
  }, [isInView, idx])

  const q = practiceQuestions[idx]

  return (
    <div className="bg-surface-1 border border-border/30 rounded-xl overflow-hidden shadow-xl shadow-black/20">
      {/* Chrome */}
      <div className="px-4 py-2.5 border-b border-border/20 flex items-center justify-between bg-surface-2/40">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-text-tertiary/15" />
            <div className="w-2 h-2 rounded-full bg-text-tertiary/15" />
            <div className="w-2 h-2 rounded-full bg-text-tertiary/15" />
          </div>
          <span className="text-[9px] text-text-tertiary/40 ml-1">Practice Session</span>
        </div>
        <span className="text-[9px] bg-accent/10 text-accent/60 px-2 py-0.5 rounded font-medium">
          {q.round}
        </span>
      </div>

      <div className="p-5 space-y-4">
        {/* AI question */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center">
              <span className="text-[8px] text-accent font-bold">AI</span>
            </div>
            <span className="text-[9px] text-text-tertiary/50">Interviewer</span>
            <span className="text-[8px] text-text-tertiary/30 ml-auto">{q.category}</span>
          </div>
          <p className="text-text-primary text-[13px] leading-[1.5] font-medium">{q.question}</p>
        </div>

        {/* Coaching card — appears in phase 2 */}
        <AnimatePresence>
          {(phase === 'coaching' || phase === 'feedback') && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-surface-2/50 border border-border/15 rounded-lg p-3"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-soft" />
                <span className="text-[9px] text-green-soft/80 font-medium">Card matched</span>
                <span className="text-[8px] text-text-tertiary/30 ml-auto">&lt; 500ms</span>
              </div>
              <p className="text-text-secondary text-[11px] leading-[1.5]">
                Competitive Displacement — $823K · 94 days · 7 stakeholders
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feedback — appears in phase 3 */}
        <AnimatePresence>
          {phase === 'feedback' && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="bg-accent/5 border border-accent/10 rounded-lg p-3"
            >
              <span className="text-[9px] text-accent/60 font-medium block mb-1">Coach feedback</span>
              <p className="text-text-secondary text-[11px] leading-[1.5]">
                Lead with the metric, then the narrative. &ldquo;$823K displacement in 94 days&rdquo; hooks before the story.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function PracticeMode() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 relative">
      <div className="max-w-[1000px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="block text-[11px] uppercase tracking-[0.25em] font-medium text-accent/60 mb-3">
              Build the Muscle
            </span>
            <h2 className="font-heading font-bold text-[28px] sm:text-[36px] leading-[1.1] tracking-[-0.03em] text-text-primary mb-6">
              Practice Against the Questions{' '}
              <span className="text-accent">Enterprise HMs Actually Ask.</span>
            </h2>
            <div className="space-y-4 text-text-secondary text-[15px] leading-[1.7]">
              <p>
                The AI interviewer calibrates to your resume, your target role, and the specific
                round. The full coaching sidebar fires during practice.
              </p>
              <p className="text-text-primary font-medium">
                You&apos;re not practicing answers. You&apos;re building the reflexes to access
                them under pressure.
              </p>
            </div>
          </motion.div>

          {/* Right: product mock — shows the actual practice flow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <PracticeMock isInView={isInView} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
