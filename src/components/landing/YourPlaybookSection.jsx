import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const INPUT_ITEMS = [
  { icon: 'doc', label: 'Resume', detail: 'Roles, titles, tenure, promotions', color: '#5b8def' },
  { icon: 'trophy', label: 'Closed Won', detail: '$225K ACV displacement, 7-month cycle', color: '#5bbf72' },
  { icon: 'x', label: 'Closed Lost', detail: 'What happened, what you learned', color: '#ef6b6b' },
  { icon: 'mic', label: 'Your Why', detail: 'Motivation, what you want next', color: '#7c6aef' },
  { icon: 'transcript', label: 'Call Transcripts', detail: 'How you actually talk about deals', color: '#fbbf24' },
  { icon: 'metrics', label: 'Your Metrics', detail: 'Attainment, pipeline, cycle times', color: '#4ecdc4' },
]

function IconSVG({ type, color }) {
  const s = { width: 20, height: 20 }
  switch (type) {
    case 'doc':
      return (
        <svg {...s} viewBox="0 0 20 20" fill="none">
          <rect x="3" y="1" width="14" height="18" rx="2" stroke={color} strokeWidth="1.5" />
          <line x1="6" y1="6" x2="14" y2="6" stroke={color} strokeWidth="1.2" opacity="0.6" />
          <line x1="6" y1="9" x2="14" y2="9" stroke={color} strokeWidth="1.2" opacity="0.6" />
          <line x1="6" y1="12" x2="11" y2="12" stroke={color} strokeWidth="1.2" opacity="0.6" />
        </svg>
      )
    case 'trophy':
      return (
        <svg {...s} viewBox="0 0 20 20" fill="none">
          <path d="M6 3h8v6a4 4 0 01-8 0V3z" stroke={color} strokeWidth="1.5" />
          <path d="M6 5H4a2 2 0 000 4h2" stroke={color} strokeWidth="1.2" opacity="0.5" />
          <path d="M14 5h2a2 2 0 010 4h-2" stroke={color} strokeWidth="1.2" opacity="0.5" />
          <line x1="10" y1="13" x2="10" y2="16" stroke={color} strokeWidth="1.5" />
          <line x1="7" y1="16" x2="13" y2="16" stroke={color} strokeWidth="1.5" />
        </svg>
      )
    case 'x':
      return (
        <svg {...s} viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="7" stroke={color} strokeWidth="1.5" />
          <line x1="7" y1="7" x2="13" y2="13" stroke={color} strokeWidth="1.5" />
          <line x1="13" y1="7" x2="7" y2="13" stroke={color} strokeWidth="1.5" />
        </svg>
      )
    case 'mic':
      return (
        <svg {...s} viewBox="0 0 20 20" fill="none">
          <rect x="7" y="2" width="6" height="10" rx="3" stroke={color} strokeWidth="1.5" />
          <path d="M4 10a6 6 0 0012 0" stroke={color} strokeWidth="1.2" opacity="0.5" />
          <line x1="10" y1="16" x2="10" y2="18" stroke={color} strokeWidth="1.5" />
        </svg>
      )
    case 'transcript':
      return (
        <svg {...s} viewBox="0 0 20 20" fill="none">
          <rect x="2" y="3" width="16" height="14" rx="2" stroke={color} strokeWidth="1.5" />
          <line x1="5" y1="7" x2="10" y2="7" stroke={color} strokeWidth="1.2" opacity="0.6" />
          <line x1="5" y1="10" x2="15" y2="10" stroke={color} strokeWidth="1.2" opacity="0.6" />
          <line x1="5" y1="13" x2="12" y2="13" stroke={color} strokeWidth="1.2" opacity="0.6" />
        </svg>
      )
    case 'metrics':
      return (
        <svg {...s} viewBox="0 0 20 20" fill="none">
          <polyline points="2,15 6,9 10,12 14,5 18,8" stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round" />
          <circle cx="6" cy="9" r="1.5" fill={color} opacity="0.4" />
          <circle cx="14" cy="5" r="1.5" fill={color} opacity="0.4" />
        </svg>
      )
    default:
      return null
  }
}

/* Particle dots flowing from inputs toward center engine */
function FlowParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * 360
        const delay = i * 0.4
        const duration = 2.5 + (i % 3) * 0.5
        const startRadius = 180 + (i % 3) * 30
        return (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full opacity-0"
            style={{
              background: i % 2 === 0 ? 'rgba(124,106,239,0.6)' : 'rgba(78,205,196,0.6)',
              animation: `flowToCenter ${duration}s ${delay}s ease-in infinite`,
              '--angle': `${angle}deg`,
              '--startR': `${startRadius}px`,
            }}
          />
        )
      })}
    </div>
  )
}

export default function YourPlaybookSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <>
      <style>{`
        @keyframes flowToCenter {
          0% {
            opacity: 0;
            transform: translate(
              calc(cos(var(--angle)) * var(--startR)),
              calc(sin(var(--angle)) * var(--startR))
            );
          }
          20% { opacity: 0.7; }
          90% { opacity: 0.3; }
          100% {
            opacity: 0;
            transform: translate(0, 0);
          }
        }
        @keyframes enginePulse {
          0%, 100% {
            box-shadow: 0 0 30px rgba(124,106,239,0.12),
                        0 0 60px rgba(124,106,239,0.04);
          }
          50% {
            box-shadow: 0 0 40px rgba(124,106,239,0.22),
                        0 0 80px rgba(124,106,239,0.08);
          }
        }
      `}</style>

      <section ref={sectionRef} className="py-24 md:py-32 px-6 relative overflow-hidden">
        {/* Spotlight glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(124,106,239,0.06) 0%, transparent 60%)' }}
        />

        <div className="relative z-10 max-w-[540px] mx-auto">
          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="block text-[11px] uppercase tracking-[0.25em] font-medium text-accent/60 mb-3">
              Your Playbook
            </span>
            <h2 className="font-heading font-bold text-[28px] sm:text-[36px] md:text-[42px] leading-[1.1] tracking-[-0.03em] text-text-primary mb-4">
              We don&apos;t generate your answers.{' '}
              <span className="text-accent">We learn them.</span>
            </h2>
            <p className="text-text-secondary text-[16px] leading-[1.7] max-w-[480px] mx-auto">
              Feed the engine everything — your resume, your deal stories, your
              transcripts, the way you actually talk. Every answer it surfaces
              sounds like you on your sharpest day.
            </p>
          </motion.div>

          {/* ── Visual: Inputs → Engine → Output ── */}
          <div className="flex flex-col items-center relative">

            {/* ── INPUT GRID ── */}
            <div className="grid grid-cols-2 gap-2 w-full">
              {INPUT_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease: 'easeOut' }}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-[10px] bg-surface-1/80 border border-border/30 hover:bg-surface-2/60 hover:border-border/50 transition-all duration-300"
                >
                  <div className="shrink-0">
                    <IconSVG type={item.icon} color={item.color} />
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-text-primary leading-tight">
                      {item.label}
                    </div>
                    <div className="text-[11px] text-text-tertiary/50 leading-snug mt-0.5">
                      {item.detail}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ── FLOW ARROWS (SVG) ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="w-full h-12 flex justify-center"
            >
              <svg width="120" height="48" viewBox="0 0 120 48" fill="none">
                <path
                  d="M20 4 L60 40 L100 4"
                  stroke="rgba(124,106,239,0.15)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  fill="none"
                />
                <path
                  d="M40 4 L60 28 L80 4"
                  stroke="rgba(124,106,239,0.3)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  fill="none"
                />
                <circle cx="60" cy="42" r="3" fill="#7c6aef" opacity="0.5" />
              </svg>
            </motion.div>

            {/* ── ENGINE CORE ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1, duration: 0.6, ease: 'easeOut' }}
              className="relative w-full flex justify-center"
            >
              <FlowParticles />
              <div
                className="relative z-[2] w-full max-w-[380px] text-center rounded-2xl border border-accent/20 px-8 py-6"
                style={{
                  background: 'linear-gradient(135deg, rgba(124,106,239,0.08) 0%, rgba(124,106,239,0.02) 100%)',
                  animation: isInView ? 'enginePulse 3s ease-in-out infinite' : 'none',
                }}
              >
                <div className="text-[10px] font-semibold tracking-[0.12em] uppercase text-accent/50 mb-2 font-mono">
                  Interview Coach Engine
                </div>
                <div className="text-[18px] font-semibold text-text-primary leading-snug mb-2 font-heading">
                  Your voice. Your stories.
                  <br />Indexed and retrievable.
                </div>
                <div className="text-[12px] text-text-tertiary/50 leading-relaxed">
                  Every answer the AI surfaces passes through
                  <br />your material first — not the other way around.
                </div>
              </div>
            </motion.div>

            {/* ── FLOW ARROW DOWN ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.3, duration: 0.6 }}
              className="w-full h-12 flex justify-center"
            >
              <svg width="40" height="48" viewBox="0 0 40 48" fill="none">
                <line x1="20" y1="0" x2="20" y2="38" stroke="rgba(124,106,239,0.2)" strokeWidth="1.5" strokeDasharray="4 4" />
                <polygon points="14,34 20,44 26,34" fill="#7c6aef" opacity="0.45" />
              </svg>
            </motion.div>

            {/* ── OUTPUT CARD ── */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 1.5, duration: 0.7, ease: 'easeOut' }}
              className="w-full"
            >
              <div className="bg-accent-subtle border border-accent/15 rounded-xl p-5 relative">
                {/* Badge row */}
                <div className="flex items-center gap-2 mb-3.5">
                  <span className="text-[10px] font-bold tracking-[0.08em] uppercase text-accent bg-accent-dim px-2.5 py-1 rounded font-mono">
                    What They Hear
                  </span>
                  <span className="text-[10px] font-medium text-accent/40 font-mono">
                    &lt; 500ms
                  </span>
                </div>
                {/* Output text */}
                <p className="text-[14.5px] leading-[1.75] text-text-primary/85">
                  &ldquo;Displaced an 8-year incumbent. $225K ACV, 7-month cycle. They had
                  relationships at every level — I had zero. Started with the ops
                  director, who was living with the pain daily. Mapped his priorities
                  back to a business case, got finance aligned on the ROI, then used
                  both of them to get 30 minutes with the CFO. Ran a structured eval,
                  controlled the criteria, three-year commitment on the close.&rdquo;
                </p>
                {/* Voice tag */}
                <div className="mt-3.5 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent/50" />
                  <span className="text-[11px] text-accent/40 italic">
                    Sourced from your closed-won narrative + your transcript cadence
                  </span>
                </div>
              </div>
            </motion.div>

            {/* ── Closing line ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 2, duration: 0.6 }}
              className="text-center mt-10"
            >
              <p className="text-text-secondary/50 text-[16px] italic mb-6">
                AI writes the structure. You&apos;re the source material.
              </p>
              <a
                href="#pricing"
                className="inline-block px-8 py-3.5 rounded-lg bg-accent text-bg text-[14px] font-semibold tracking-[0.01em] no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(124,106,239,0.3)]"
              >
                Build Your Playbook — Free
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
