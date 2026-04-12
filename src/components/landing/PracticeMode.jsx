import { useRef, useState, useEffect } from 'react'

function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

const practiceQuestions = [
  { round: 'VP Round', question: "Walk me through your largest competitive displacement.", category: 'Deal Story' },
  { round: 'HM Round', question: "How do you approach territory planning in a new patch?", category: 'Strategy' },
  { round: 'Panel', question: "Tell me about a deal you lost and what you learned.", category: 'Self-Awareness' },
  { round: 'Phone Screen', question: "Why are you looking to leave your current role?", category: 'Motivation' },
]

export default function PracticeMode() {
  const [sectionRef, visible] = useReveal()
  const [activeQ, setActiveQ] = useState(0)

  useEffect(() => {
    if (!visible) return
    const interval = setInterval(() => setActiveQ((q) => (q + 1) % practiceQuestions.length), 3500)
    return () => clearInterval(interval)
  }, [visible])

  const q = practiceQuestions[activeQ]

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 px-5" style={{ background: '#0B0D12' }}>
      <div className="max-w-[900px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: text */}
          <div className="transition-all duration-700" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#00E0CC', marginBottom: '16px' }}>
              Build the Muscle
            </p>
            <h2 className="font-heading font-bold mb-6" style={{ fontSize: 'clamp(22px, 5vw, 34px)', lineHeight: 1.15, letterSpacing: '-0.025em', color: '#EDF2F7' }}>
              Practice Against the Questions{' '}
              <span style={{ color: '#00E0CC' }}>Enterprise HMs Actually Ask.</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#8B9BB4' }}>
                The AI interviewer calibrates to your resume, your target role, and the specific round. The full coaching sidebar fires during practice.
              </p>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#EDF2F7', fontWeight: 500 }}>
                You&apos;re not practicing answers. You&apos;re building the reflexes to access them under pressure.
              </p>
            </div>
          </div>

          {/* Right: product-matched question panel */}
          <div className="transition-all duration-700" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transitionDelay: '0.2s' }}>
            <div style={{
              background: 'rgba(16,22,34,0.72)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '14px',
              overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
            }}>
              {/* Header — matches product */}
              <div className="flex items-center justify-between" style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.04)', background: 'linear-gradient(180deg, rgba(255,255,255,0.015) 0%, transparent 100%)' }}>
                <div className="flex items-center gap-2">
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10.5px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8B9BB4' }}>Practice Session</span>
                  <span style={{ fontSize: '11px', fontWeight: 500, color: '#00E0CC', background: 'rgba(0,224,204,0.15)', padding: '2px 8px', borderRadius: '4px' }}>ACTIVE</span>
                </div>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#00E0CC', background: 'rgba(0,224,204,0.10)', border: '1px solid rgba(0,224,204,0.2)', padding: '4px 10px', borderRadius: '8px' }}>
                  {q.round}
                </span>
              </div>

              {/* Question area */}
              <div style={{ padding: '20px 18px' }}>
                {/* Category tag */}
                <div className="mb-3">
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#5A6A82' }}>
                    {q.category}
                  </span>
                </div>

                {/* Question — styled like product transcript */}
                <div style={{ background: 'rgba(13,17,23,0.75)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', padding: '14px 16px', marginBottom: '16px' }}>
                  <p style={{ fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#00E0CC', marginBottom: '6px' }}>Interviewer</p>
                  <p style={{ fontSize: '15px', fontWeight: 400, lineHeight: 1.65, color: '#F1F5F9', transition: 'opacity 0.3s' }} key={activeQ}>
                    {q.question}
                  </p>
                </div>

                {/* Coaching feedback preview */}
                <div style={{ background: 'rgba(0,224,204,0.04)', border: '1px solid rgba(0,224,204,0.12)', borderLeft: '3px solid #00E0CC', borderRadius: '10px', padding: '12px 16px' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00E0CC' }} />
                    <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#5A6A82' }}>Coach Feedback</span>
                  </div>
                  <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#8B9BB4' }}>
                    Lead with the metric, then the narrative. Open with the outcome — &ldquo;$225K displacement in 7 months&rdquo; — before the story.
                  </p>
                </div>
              </div>

              {/* Bottom — round dots */}
              <div className="flex justify-center gap-2" style={{ padding: '0 18px 16px' }}>
                {practiceQuestions.map((_, i) => (
                  <div key={i} style={{
                    width: i === activeQ ? 20 : 6, height: 6, borderRadius: '3px',
                    background: i === activeQ ? '#00E0CC' : 'rgba(139,155,180,0.2)',
                    transition: 'all 0.3s',
                  }} />
                ))}
              </div>
            </div>
          </div>

        </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <a href="/start" className="inline-block font-semibold transition-all duration-200"
              style={{ padding: '14px 32px', borderRadius: '10px', background: 'rgba(0,224,204,0.12)', border: '1px solid rgba(0,224,204,0.3)', color: '#00E0CC', fontSize: '14px', textDecoration: 'none' }}>
              Start Your Free Practice Interview &rarr;
            </a>
          </div>

      </div>
    </section>
  )
}
