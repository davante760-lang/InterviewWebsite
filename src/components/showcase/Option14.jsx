// OPTION 14: "Redaction Reveal" — failed text shown as one block, teal highlight extracts the gold, rest redacts
import { useRef, useState } from 'react'
import { useScroll, useSpring, useMotionValueEvent } from 'framer-motion'
import { answer, closingLine } from './shared'

// One combined rambling paragraph (all 4 attempts merged)
const ramble = "So we were up against the incumbent, they'd been in there for years, and it was a solid displacement, like two-and-a-quarter maybe, and the key was getting to the right people. My biggest one was this account where they were locked in with the competitor and I started by going to the ops team, or actually I think I went to finance first and then, yeah so this was a long cycle, like seven months, and the incumbent had all the relationships so I had to kind of build from scratch, which meant finding someone who actually felt the pain..."

// Words that are "gold" — they'll survive the redaction
const goldWords = ['incumbent', '$225K', 'ops', 'finance', 'CFO', 'seven months', 'relationships', 'build from scratch', 'displacement', 'pain']

function isGold(word) {
  return goldWords.some(g => word.toLowerCase().includes(g.toLowerCase()))
}

export default function Option14() {
  const ref = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const sp = useSpring(p, { stiffness: 120, damping: 30 })
  const [pr, setPr] = useState(0)
  useMotionValueEvent(sp, 'change', setPr)

  const textVisible = pr > 0.08 && pr < 0.65
  const redactProgress = Math.max(0, Math.min(1, (pr - 0.25) / 0.25))
  const showCard = pr > 0.68
  const showClosing = pr > 0.88

  const words = ramble.split(' ')

  return (
    <section ref={ref} style={{ height: '400vh' }}>
      <div className="sticky top-[52px] h-[calc(100vh-52px)] flex items-center justify-center px-5 overflow-hidden">
        <div className="w-full max-w-[500px]">

          {/* Rambling text with progressive redaction */}
          <div className="transition-opacity duration-500" style={{ opacity: textVisible ? 1 : 0 }}>
            <p className="text-[9px] text-text-tertiary/40 uppercase tracking-wider mb-3">Without Interview Coach</p>
            <div className="leading-[2] text-[14px] sm:text-[16px]">
              {words.map((word, i) => {
                const wordProgress = i / words.length
                const isRedacted = redactProgress > wordProgress && !isGold(word)
                const isHighlighted = redactProgress > wordProgress && isGold(word)
                return (
                  <span key={i} className="inline transition-all duration-300" style={{
                    color: isHighlighted ? 'var(--color-teal)' : isRedacted ? 'transparent' : 'var(--color-text-tertiary)',
                    backgroundColor: isRedacted ? 'rgba(156,165,178,0.15)' : isHighlighted ? 'rgba(78,205,196,0.1)' : 'transparent',
                    borderRadius: isRedacted ? '2px' : '0',
                    fontWeight: isHighlighted ? 600 : 400,
                    opacity: isRedacted ? 0.5 : 1,
                  }}>
                    {word}{' '}
                  </span>
                )
              })}
            </div>
          </div>

          {/* SAY THIS card */}
          <div className="transition-all duration-700"
            style={{ opacity: showCard ? 1 : 0, transform: showCard ? 'translateY(0)' : 'translateY(24px)' }}>
            <p className="text-[10px] text-teal/50 uppercase tracking-wider mb-2">With Interview Coach</p>
            <div className="border-l-[3px] border-teal/60 bg-[#111825] rounded-r-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-teal" />
                <span className="text-[10px] text-text-tertiary/50 uppercase tracking-wider font-medium">Say This</span>
                <span className="text-[9px] text-teal/40 ml-auto">&lt; 500ms</span>
              </div>
              <p className="text-text-secondary text-[15px] leading-[1.7]">{answer}</p>
            </div>
            <div className="mt-6 text-center transition-opacity duration-700" style={{ opacity: showClosing ? 1 : 0 }}>
              <p className="text-[14px] text-text-primary/60 font-medium">{closingLine[0]} {closingLine[1]}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
