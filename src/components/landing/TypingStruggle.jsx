// Phase State Machine — discrete scroll phases, AnimatePresence handles transitions
// Back to sticky scroll (no nested scroll container)
import { useRef, useState } from 'react'
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion'

const stats = [
  { label: 'Quota Attainment', value: '124%' },
  { label: 'ACV', value: '$225K' },
  { label: "President's Club", value: '2x' },
  { label: 'Pipeline in Q3', value: '$3.2M' },
]

const question = "Walk me through your biggest competitive displacement."

const attempts = [
  "So we were up against the incumbent — they'd been in there for years — and I basically had to find a way to...",
  "It was a solid displacement, like two-and-a-quarter maybe, and the key was getting to the right people, the, uh...",
]

const answer = "Displaced an 8-year incumbent. $225K ACV, 7-month cycle. They had relationships at every level — I had zero. Started with the ops director, who was living with the pain daily. Mapped his priorities back to a business case, got finance aligned on the ROI, then used both of them to get 30 minutes with the CFO. Ran a structured eval, controlled the criteria, three-year commitment on the close. 124% to quota that year."

/*
  Phases via useTransform with wide dead zones:
  0: nothing (0.00–0.04)
  1: thesis + source card (0.04–0.12)
  2: attempt 1 (0.12–0.22)
  3: attempt 2 (0.22–0.32)
  4: attempt 3 (0.32–0.42)
  5: attempt 4 (0.42–0.52)
  6: all 4 stacked (0.52–0.65)
  7: SAY THIS (0.65–1.00)
*/

export default function TypingStruggle() {
  const ref = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const activePhase = useTransform(p,
    [0, 0.06, 0.22, 0.44, 0.68, 1],
    [0, 1,    2,    3,    4,    4]
  )

  const [phase, setPhase] = useState(0)
  useMotionValueEvent(activePhase, 'change', (v) => setPhase(Math.round(v)))

  return (
    <section ref={ref} className="relative" style={{ height: '800vh' }}>
      <div className="sticky top-0 h-screen flex flex-col items-center pt-20 sm:pt-8 sm:justify-center px-5 overflow-hidden">
        <div className="w-full max-w-[480px] lg:max-w-[720px]">

          {/* Thesis — stays visible always */}
          <p
            className="font-heading font-bold text-[18px] sm:text-[24px] md:text-[28px] tracking-[-0.02em] text-text-primary/80 text-center mb-6 transition-opacity duration-500 px-4"
            style={{ opacity: phase >= 1 ? 1 : 0 }}
          >
            Being a top AE and interviewing like one aren&apos;t the same thing. <span style={{ color: '#00E0CC' }}>Interview Coach bridges the two.</span>
          </p>

          {/* Source card — stays visible always */}
          <div
            className="rounded-xl mb-6 origin-top transition-all duration-500"
            style={{
              opacity: phase >= 1 ? 1 : 0,
              transform: phase >= 2 ? 'scale(0.92) translateY(-8px)' : 'scale(1) translateY(0)',
              background: 'rgba(16,22,34,0.72)',
              border: '1px solid rgba(255,255,255,0.07)',
              padding: '16px 20px',
            }}
          >
            <p className="text-[12px] sm:text-[13px] mb-3" style={{ color: '#8B9BB4' }}>
              This is you. You&apos;re not the problem.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
              {stats.map((s, i) => (
                <div key={i}>
                  <p className="font-heading font-bold text-[20px] sm:text-[24px] lg:text-[28px] tracking-tight" style={{ color: '#00E0CC' }}>{s.value}</p>
                  <p className="text-[10px] sm:text-[11px] mt-1" style={{ color: '#5A6A82' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Subheading — flips between WITHOUT / WITH */}
          <div
            className="mb-4 transition-all duration-500"
            style={{ opacity: phase >= 2 ? 1 : 0 }}
          >
            {phase === 4 ? (
              <p className="text-[14px] sm:text-[16px] font-semibold">
                <span style={{ color: '#00E0CC' }}>With Interview Coach:</span>
                <span style={{ color: '#CBD5E1', marginLeft: '8px' }}>Same numbers. Now they land.</span>
              </p>
            ) : (
              <p className="text-[14px] sm:text-[16px] font-semibold">
                <span style={{ color: '#8B9BB4' }}>Without Interview Coach:</span>
                <span style={{ color: '#5A6A82', marginLeft: '8px', fontStyle: 'italic' }}>Rambling. Vague. Trailing off.</span>
              </p>
            )}
          </div>

          {/* Question — stays visible during attempts, hides on SAY THIS */}
          <div
            className="rounded-lg mb-5 transition-all duration-500"
            style={{
              opacity: phase >= 2 && phase <= 3 ? 1 : 0,
              maxHeight: phase >= 2 && phase <= 3 ? '200px' : '0',
              overflow: 'hidden',
              background: 'rgba(13,17,23,0.75)',
              border: '1px solid rgba(255,255,255,0.07)',
              padding: phase >= 2 && phase <= 3 ? '12px 16px' : '0 16px',
              marginBottom: phase >= 2 && phase <= 3 ? '20px' : '0',
            }}
          >
            <p style={{ fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#00E0CC', marginBottom: '6px' }}>Interviewer</p>
            <p style={{ fontSize: '15px', fontWeight: 400, lineHeight: 1.65, color: '#F1F5F9' }}>{question}</p>
          </div>

          {/* Content zone — attempts and SAY THIS swap in same space */}
          <div className="relative min-h-[240px]">

            {/* Phases 2-3: one attempt at a time */}
            {[0, 1].map((i) => (
              <div
                key={i}
                className="absolute inset-x-0 top-0 transition-all duration-500 ease-out"
                style={{
                  opacity: phase === i + 2 ? 1 : 0,
                  transform: phase === i + 2 ? 'translateY(0)' : phase > i + 2 ? 'translateY(-16px)' : 'translateY(16px)',
                  pointerEvents: phase === i + 2 ? 'auto' : 'none',
                }}
              >
                <div className="border-l-2 border-red-soft/40 bg-red-dim/20 rounded-r-lg px-4 sm:px-5 py-3 sm:py-4">
                  <p className="text-text-primary/75 text-[15px] sm:text-[17px] leading-[1.6] italic">{attempts[i]}</p>
                </div>
              </div>
            ))}

            {/* Phase 6: SAY THIS card — same position as attempts */}
            <div
              className="absolute inset-x-0 top-0 transition-all duration-500 ease-out"
              style={{
                opacity: phase === 4 ? 1 : 0,
                transform: phase === 4 ? 'translateY(0)' : 'translateY(20px)',
                pointerEvents: phase === 4 ? 'auto' : 'none',
              }}
            >
              <div style={{ background: 'rgba(0,224,204,0.04)', border: '1px solid rgba(0,224,204,0.14)', borderLeft: '3px solid #00E0CC', borderRadius: '10px', padding: '12px 16px 12px 20px', boxShadow: '0 0 20px rgba(0,224,204,0.04)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00E0CC' }} />
                  <span style={{ fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#5A6A82' }}>Say This</span>
                  <span style={{ fontSize: '13px', color: '#00E0CC', marginLeft: 'auto', opacity: 0.5 }}>&lt; 500ms</span>
                </div>
                <p style={{ fontSize: '15px', fontWeight: 400, lineHeight: 1.75, color: '#EDF2F7' }}>{answer}</p>
              </div>
              <p className="mt-8 text-center font-heading font-bold text-[18px] sm:text-[22px] md:text-[26px] tracking-[-0.02em]" style={{ color: '#EDF2F7' }}>
                Your track record doesn&apos;t change. <span style={{ color: '#00E0CC' }}>How you deliver it does.</span>
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
