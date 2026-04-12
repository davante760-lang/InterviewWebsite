import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { CountUp } from './ScrollAnimations'

const tiers = [
  {
    name: 'Instant Recall',
    tier: '01',
    speed: '100',
    unit: 'ms',
    color: '#5bbf72',
    barWidth: '15%',
    description: 'Keyword triggers fire the moment a hiring manager says "territory" or "pipeline." Your card hits the screen before the question finishes.',
    detail: 'No cloud. No round-trip. Local.',
    demo: 'keyword',
    keywords: ['territory', 'pipeline', 'competitive', 'quota'],
  },
  {
    name: 'Semantic Match',
    tier: '02',
    speed: '500',
    unit: 'ms',
    color: '#7c6aef',
    barWidth: '40%',
    description: 'Three ways of asking the same thing — the system matches intent and pulls your pre-built answer card with your exact numbers.',
    detail: 'Runs locally. Zero latency.',
    demo: 'semantic',
    variants: ['"territory strategy"', '"market segmentation"', '"how did you approach your patch"'],
  },
  {
    name: 'AI Generation',
    tier: '03',
    speed: '3',
    unit: 's',
    color: '#5b8def',
    barWidth: '75%',
    description: 'For questions your cards don\'t cover, the AI builds a contextual answer from your resume and deal history.',
    detail: 'Formatted by sales archetype.',
    demo: 'generate',
  },
]

function TierContent({ tier, isActive, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.15, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mb-[30vh] last:mb-0"
    >
      {/* Tier number + name */}
      <div className="flex items-center gap-4 mb-6">
        <span
          className="text-[64px] sm:text-[80px] font-heading font-bold leading-none"
          style={{ color: tier.color, opacity: 0.2 }}
        >
          {tier.tier}
        </span>
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] font-medium" style={{ color: tier.color }}>
            Tier {tier.tier}
          </p>
          <h3 className="font-heading font-bold text-[24px] sm:text-[30px] text-text-primary tracking-[-0.02em]">
            {tier.name}
          </h3>
        </div>
      </div>

      {/* Speed — big dramatic number */}
      <div className="mb-6 flex items-baseline gap-1">
        {isActive ? (
          <CountUp
            end={parseFloat(tier.speed)}
            suffix={tier.unit}
            duration={1.2}
            decimals={0}
            className="font-heading font-bold text-[48px] sm:text-[64px] tracking-[-0.04em]"
            style={{ color: tier.color }}
          />
        ) : (
          <span
            className="font-heading font-bold text-[48px] sm:text-[64px] tracking-[-0.04em]"
            style={{ color: tier.color }}
          >
            {tier.speed}{tier.unit}
          </span>
        )}
      </div>

      {/* Speed bar */}
      <div className="h-1 bg-surface-3/30 rounded-full mb-6 overflow-hidden max-w-[300px]">
        <motion.div
          initial={{ width: 0 }}
          animate={isActive ? { width: tier.barWidth } : { width: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${tier.color}, ${tier.color}88)`,
            boxShadow: `0 0 12px ${tier.color}40`,
          }}
        />
      </div>

      {/* Description */}
      <p className="text-text-secondary text-[16px] leading-[1.7] max-w-[420px] mb-2">
        {tier.description}
      </p>
      <p className="text-[13px] font-medium" style={{ color: tier.color }}>
        {tier.detail}
      </p>
    </motion.div>
  )
}

function DemoWindow({ activeTier, scrollProgress }) {
  const borderColor = tiers[activeTier]?.color || '#7c6aef'
  const borderPulseSpeed = activeTier === 0 ? '1.5s' : activeTier === 1 ? '3s' : '5s'

  return (
    <div className="w-full max-w-[400px]">
      <div
        className="rounded-xl overflow-hidden border"
        style={{
          borderColor: `${borderColor}30`,
          boxShadow: `0 0 40px ${borderColor}10, 0 0 80px ${borderColor}05`,
          animation: `glow-pulse ${borderPulseSpeed} ease-in-out infinite`,
        }}
      >
        {/* Chrome */}
        <div className="px-4 py-2.5 border-b border-border/30 bg-surface-2/60 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-text-tertiary/20" />
            <div className="w-2 h-2 rounded-full bg-text-tertiary/20" />
            <div className="w-2 h-2 rounded-full bg-text-tertiary/20" />
          </div>
          <span className="text-[9px] text-text-tertiary/40 ml-2">Coaching Engine</span>
        </div>

        {/* Demo content */}
        <div className="bg-surface-1/80 p-5 min-h-[250px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {activeTier === 0 && <KeywordDemo key="kw" />}
            {activeTier === 1 && <SemanticDemo key="sm" />}
            {activeTier === 2 && <GenerateDemo key="gn" />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function KeywordDemo() {
  const keywords = ['territory', 'pipeline', 'competitive', 'quota']
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-3"
    >
      <p className="text-[9px] uppercase tracking-wider text-text-tertiary/50 mb-3">Keyword Detection</p>
      <div className="flex flex-wrap gap-2">
        {keywords.map((kw, i) => (
          <motion.span
            key={kw}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.15, duration: 0.3 }}
            className="px-3 py-1.5 rounded-md bg-green-dim border border-green-soft/20 text-green-soft text-[12px] font-mono font-medium"
          >
            {kw}
          </motion.span>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-4 bg-surface-2/60 rounded-lg p-3 border border-border/20"
      >
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-soft" />
          <span className="text-[10px] text-green-soft font-medium">Instant match</span>
        </div>
        <p className="text-text-primary text-[12px] font-medium">Territory Build — Southeast</p>
        <p className="text-text-tertiary text-[10px]">$3.2M pipeline · 14 new logos</p>
      </motion.div>
    </motion.div>
  )
}

function SemanticDemo() {
  const phrases = ['"territory strategy"', '"market segmentation"', '"how did you approach your patch"']
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-3"
    >
      <p className="text-[9px] uppercase tracking-wider text-text-tertiary/50 mb-3">Semantic Matching</p>
      {phrases.map((phrase, i) => (
        <motion.div
          key={phrase}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.3, duration: 0.4 }}
          className="flex items-center gap-3"
        >
          <span className="text-text-secondary text-[12px] flex-1">{phrase}</span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.3 + 0.2 }}
            className="text-text-tertiary/40 text-[10px]"
          >→</motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.3 + 0.3 }}
            className="text-[10px] bg-accent-dim text-accent px-2 py-0.5 rounded shrink-0"
          >
            Territory Card
          </motion.span>
        </motion.div>
      ))}
    </motion.div>
  )
}

function GenerateDemo() {
  const text = "Based on your resume and deal history, structuring a STAR response for this leadership question..."
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-3"
    >
      <p className="text-[9px] uppercase tracking-wider text-text-tertiary/50 mb-3">AI Generation</p>
      <div className="flex items-center gap-2 mb-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
            className="w-1.5 h-1.5 rounded-full bg-blue"
          />
        ))}
        <span className="text-[10px] text-blue/70 ml-1">Generating</span>
      </div>
      <div className="bg-surface-2/60 rounded-lg p-3 border border-border/20">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-text-secondary text-[11px] leading-[1.6]"
        >
          {text}
        </motion.p>
      </div>
    </motion.div>
  )
}

export default function HowItWorks() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Map scroll to active tier
  const activeTierRaw = useTransform(scrollYProgress, [0.05, 0.33, 0.33, 0.63, 0.63, 0.95], [0, 0, 1, 1, 2, 2])

  return (
    <section id="how-it-works" ref={containerRef} className="relative" style={{ height: '400vh' }}>
      {/* Spotlight isolation — background dims, content is the light source */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden bg-bg">
        <div className="w-full max-w-[1100px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: scrolling tier content */}
          <div>
            <motion.div
              style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [0, 1]) }}
            >
              <span className="block text-[11px] uppercase tracking-[0.25em] font-medium text-accent/60 mb-3">
                How It Works
              </span>
              <h2 className="font-heading font-bold text-[28px] sm:text-[36px] md:text-[42px] leading-[1.1] tracking-[-0.03em] text-text-primary mb-12">
                Your Best Answer.{' '}
                <span className="text-accent">Before You Finish Hearing the Question.</span>
              </h2>
            </motion.div>

            {tiers.map((tier, i) => {
              const segStart = i * 0.3 + 0.05
              const segEnd = (i + 1) * 0.3 + 0.05
              return (
                <TierContentScrolled
                  key={tier.name}
                  tier={tier}
                  index={i}
                  scrollProgress={scrollYProgress}
                  range={[segStart, segEnd]}
                />
              )
            })}
          </div>

          {/* Right: sticky demo window */}
          <div className="hidden lg:flex justify-center">
            <DemoWindowScrolled scrollProgress={scrollYProgress} />
          </div>
        </div>
      </div>
    </section>
  )
}

function TierContentScrolled({ tier, index, scrollProgress, range }) {
  const opacity = useTransform(
    scrollProgress,
    [range[0] - 0.05, range[0], range[1] - 0.05, range[1]],
    [0, 1, 1, 0]
  )
  const y = useTransform(
    scrollProgress,
    [range[0] - 0.05, range[0], range[1] - 0.05, range[1]],
    [40, 0, 0, -20]
  )

  return (
    <motion.div style={{ opacity, y }} className="mb-4">
      <div className="flex items-center gap-4 mb-4">
        <span
          className="text-[48px] font-heading font-bold leading-none"
          style={{ color: tier.color, opacity: 0.15 }}
        >
          {tier.tier}
        </span>
        <div>
          <p className="text-[10px] uppercase tracking-[0.15em] font-medium" style={{ color: tier.color }}>
            Tier {tier.tier}
          </p>
          <h3 className="font-heading font-bold text-[22px] text-text-primary tracking-[-0.02em]">
            {tier.name}
          </h3>
        </div>
      </div>

      <div className="flex items-baseline gap-1 mb-4">
        <span className="font-heading font-bold text-[40px] tracking-[-0.04em]" style={{ color: tier.color }}>
          {tier.speed}
        </span>
        <span className="text-[18px] font-medium" style={{ color: `${tier.color}99` }}>{tier.unit}</span>
      </div>

      <div className="h-1 bg-surface-3/30 rounded-full mb-5 overflow-hidden max-w-[280px]">
        <motion.div
          style={{
            width: useTransform(
              scrollProgress,
              [range[0], range[0] + 0.1],
              ['0%', tier.barWidth]
            ),
            background: `linear-gradient(90deg, ${tier.color}, ${tier.color}88)`,
            boxShadow: `0 0 12px ${tier.color}40`,
          }}
          className="h-full rounded-full"
        />
      </div>

      <p className="text-text-secondary text-[15px] leading-[1.7] max-w-[400px] mb-1">
        {tier.description}
      </p>
      <p className="text-[13px] font-medium" style={{ color: tier.color }}>
        {tier.detail}
      </p>
    </motion.div>
  )
}

function DemoWindowScrolled({ scrollProgress }) {
  const activeTier = useTransform(
    scrollProgress,
    [0.05, 0.32, 0.36, 0.62, 0.66, 0.95],
    [0, 0, 1, 1, 2, 2]
  )

  // We need a reactive value for the demo content
  return <DemoWindowReactive scrollProgress={scrollProgress} activeTierMV={activeTier} />
}

function DemoWindowReactive({ scrollProgress, activeTierMV }) {
  const [currentTier, setCurrentTier] = useState(0)

  useEffect(() => {
    const unsubscribe = activeTierMV.on('change', (v) => {
      const rounded = Math.round(v)
      setCurrentTier((prev) => (prev !== rounded ? rounded : prev))
    })
    return unsubscribe
  }, [activeTierMV])

  return (
    <motion.div style={{ y: useTransform(scrollProgress, [0, 1], [0, -20]) }}>
      <DemoWindow activeTier={currentTier} scrollProgress={scrollProgress} />
    </motion.div>
  )
}
