import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { TextRevealByWord } from './ScrollAnimations'

const lines = [
  {
    text: "You've run MEDDPICC on eight-figure pipelines. You've multi-threaded above your Champion into the C-suite. You can run a $500K discovery call with three competitive talk tracks loaded.",
    highlight: [],
  },
  {
    text: "But when a VP of Sales says 'walk me through your biggest deal' — you reach for a number and it's gone. Was it $3.2M or $2.8M? Did the close cycle run 90 days or 120?",
    highlight: ['gone', '$3.2M', '$2.8M'],
  },
  {
    text: "You know the answer. You knew it this morning. But under pressure, with someone evaluating you instead of buying from you, the recall breaks.",
    highlight: ['recall', 'breaks'],
  },
  {
    text: "That's the gap. Not knowledge. Not preparation. Retrieval under pressure.",
    highlight: ['Retrieval', 'pressure'],
  },
  {
    text: "Nobody built a tool for this. So one of us did.",
    highlight: ['one', 'us', 'did'],
  },
]

export default function ProblemStatement() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section ref={containerRef} className="relative" style={{ height: '350vh' }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="relative z-10 max-w-[800px] mx-auto px-6">
          {/* Section label */}
          <motion.span
            style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [0, 1]) }}
            className="block text-[11px] uppercase tracking-[0.25em] font-medium text-accent/60 mb-8 text-center"
          >
            The Real Problem
          </motion.span>

          {/* Reveal text blocks */}
          <div className="space-y-8">
            {lines.map((line, i) => {
              const segmentStart = (i / lines.length) * 0.85
              const segmentEnd = ((i + 1) / lines.length) * 0.85
              const isLast = i === lines.length - 1

              return (
                <div key={i}>
                  {isLast ? (
                    <LastLine
                      text={line.text}
                      scrollProgress={scrollYProgress}
                      range={[segmentStart, segmentEnd]}
                    />
                  ) : (
                    <TextRevealByWord
                      text={line.text}
                      highlight={line.highlight}
                      scrollProgress={useTransform(
                        scrollYProgress,
                        [segmentStart, segmentEnd],
                        [0, 1]
                      )}
                      className="font-heading text-[22px] sm:text-[28px] md:text-[32px] leading-[1.4] tracking-[-0.02em] text-center"
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function LastLine({ text, scrollProgress, range }) {
  const opacity = useTransform(scrollProgress, [range[0], range[0] + 0.05], [0, 1])
  const scale = useTransform(scrollProgress, [range[0], range[1]], [0.9, 1])
  const glowOpacity = useTransform(scrollProgress, [range[0] + 0.05, range[1]], [0, 0.4])

  return (
    <motion.p
      style={{ opacity, scale }}
      className="font-heading font-bold text-[26px] sm:text-[34px] md:text-[40px] leading-[1.3] tracking-[-0.03em] text-accent text-center relative"
    >
      {text}
      <motion.span
        style={{ opacity: glowOpacity }}
        className="absolute inset-0 blur-2xl bg-accent/20 pointer-events-none rounded-full"
      />
    </motion.p>
  )
}
