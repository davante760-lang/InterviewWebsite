import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { CountUp } from './ScrollAnimations'

const cards = [
  {
    tab: 'Competitive Win',
    title: 'Competitive Displacement — Acme Corp',
    tags: ['Biggest Win', 'Competitive'],
    tagColors: ['accent', 'blue'],
    metrics: [
      { label: 'Deal Size', value: 823, prefix: '$', suffix: 'K' },
      { label: 'Close Cycle', value: 94, suffix: ' Days' },
      { label: 'Stakeholders', value: 7 },
    ],
    narrative:
      'Displaced incumbent after 8-year relationship. Built champion coalition across operations and finance. Closed with 3-year commitment after executive alignment session with CFO.',
    keywords: ['biggest win', 'competitive deal', 'multi-stakeholder', 'champion strategy'],
  },
  {
    tab: 'Territory Growth',
    title: 'Territory Build — Southeast Region',
    tags: ['Territory', 'Growth'],
    tagColors: ['accent', 'teal'],
    metrics: [
      { label: 'Pipeline Built', value: 3.2, prefix: '$', suffix: 'M', decimals: 1 },
      { label: 'Timeline', value: 6, suffix: ' Months' },
      { label: 'New Logos', value: 14 },
    ],
    narrative:
      'Inherited greenfield territory with zero pipeline. Mapped 200+ accounts by ICP fit, built outbound cadence targeting 3 personas, converted 14 new logos in two quarters.',
    keywords: ['territory planning', 'market strategy', 'greenfield', 'pipeline generation'],
  },
  {
    tab: 'Leadership Story',
    title: 'Cross-Functional Initiative — CRM Migration',
    tags: ['Leadership', 'Initiative'],
    tagColors: ['accent', 'blue'],
    metrics: [
      { label: 'Teams Led', value: 4 },
      { label: 'Reps Trained', value: 32 },
      { label: 'Adoption', value: 94, suffix: '%' },
    ],
    narrative:
      'Led CRM migration from legacy system to Salesforce across 4 teams. Designed training program, ran weekly office hours. Hit 94% adoption in 60 days vs. 6-month target.',
    keywords: ['leadership', 'cross-functional', 'initiative', 'change management'],
  },
]

function PrepCardVisual({ card, isActive }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, rotateX: 8, scale: 0.92 }}
      animate={{ opacity: 1, rotateX: 0, scale: 1 }}
      exit={{ opacity: 0, rotateX: -5, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ transformPerspective: 1200 }}
    >
      <div className="rounded-xl border border-border/30 bg-surface-1/95 backdrop-blur overflow-hidden shadow-xl shadow-black/20">
          {/* Header */}
          <div className="px-6 py-4 border-b border-border/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] uppercase tracking-[0.15em] text-accent/70 font-medium">
                Prep Card
              </span>
              <h4 className="font-heading font-semibold text-[16px] text-text-primary mt-1">
                {card.title}
              </h4>
            </div>
            <div className="flex gap-2">
              {card.tags.map((tag, i) => (
                <span
                  key={tag}
                  className={`text-[10px] px-2.5 py-1 rounded-md font-medium ${
                    card.tagColors[i] === 'blue'
                      ? 'bg-blue-dim text-blue'
                      : card.tagColors[i] === 'teal'
                        ? 'bg-teal-dim text-teal'
                        : 'bg-accent-dim text-accent'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-3 gap-4">
              {card.metrics.map((m) => (
                <div key={m.label}>
                  <span className="text-[10px] text-text-tertiary/60 uppercase tracking-wider">
                    {m.label}
                  </span>
                  <div className="mt-1">
                    {isActive && isInView ? (
                      <CountUp
                        end={m.value}
                        prefix={m.prefix || ''}
                        suffix={m.suffix || ''}
                        decimals={m.decimals || 0}
                        duration={1.5}
                        className="text-text-primary font-bold text-[22px]"
                      />
                    ) : (
                      <span className="text-text-primary font-bold text-[22px]">
                        {m.prefix || ''}{m.value}{m.suffix || ''}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Narrative */}
            <div>
              <span className="text-[10px] text-text-tertiary/60 uppercase tracking-wider">
                Narrative
              </span>
              <p className="text-text-secondary text-[13px] leading-[1.7] mt-2">{card.narrative}</p>
            </div>

            {/* Keywords float up */}
            <div className="flex flex-wrap gap-2 pt-1">
              {card.keywords.map((kw, i) => (
                <motion.span
                  key={kw}
                  initial={{ opacity: 0, y: 8 }}
                  animate={isActive ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 + i * 0.1, duration: 0.3 }}
                  className="text-[10px] bg-surface-3/50 text-text-tertiary/70 px-2.5 py-1 rounded-md border border-border/20"
                >
                  {kw}
                </motion.span>
              ))}
            </div>
          </div>
      </div>
    </motion.div>
  )
}

export default function PrepCards() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' })

  useEffect(() => {
    if (paused || !isInView) return
    const interval = setInterval(() => setActive((a) => (a + 1) % cards.length), 4500)
    return () => clearInterval(interval)
  }, [paused, isInView])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 relative overflow-hidden">
      {/* Spotlight on active card */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(124,106,239,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-[720px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="block text-[11px] uppercase tracking-[0.25em] font-medium text-accent/60 mb-3">
            Your Playbook
          </span>
          <h2 className="font-heading font-bold text-[28px] sm:text-[36px] md:text-[42px] leading-[1.1] tracking-[-0.03em] text-text-primary mb-4">
            Your Best Deal Stories.{' '}
            <span className="text-accent">Indexed and Ready.</span>
          </h2>
          <p className="text-text-secondary text-[16px] leading-[1.7] max-w-[560px] mb-12">
            Upload your deal docs. The system generates answer cards with your exact numbers and
            multiple wording variants. The right card surfaces no matter how the question is phrased.
          </p>
        </motion.div>

        {/* Card stack area */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Tab selector */}
          <div className="flex gap-1 mb-6 bg-surface-2/50 backdrop-blur border border-border/20 rounded-lg p-1">
            {cards.map((card, i) => (
              <button
                key={card.tab}
                onClick={() => setActive(i)}
                className={`flex-1 text-[13px] font-medium py-2.5 px-3 rounded-md transition-all duration-300 cursor-pointer ${
                  active === i
                    ? 'bg-accent/15 text-accent shadow-sm'
                    : 'text-text-tertiary/60 hover:text-text-secondary'
                }`}
              >
                {card.tab}
              </button>
            ))}
          </div>

          {/* Progress bar */}
          {!paused && (
            <div className="h-[2px] bg-surface-3/20 rounded-full mb-6 overflow-hidden">
              <motion.div
                key={active}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 4.5, ease: 'linear' }}
                className="h-full bg-accent/30 rounded-full"
              />
            </div>
          )}

          {/* Card */}
          <AnimatePresence mode="wait">
            <PrepCardVisual key={active} card={cards[active]} isActive={true} />
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
