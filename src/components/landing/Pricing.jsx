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

const features = [
  'Unlimited live coaching',
  'Unlimited active positions',
  'Full Prep Card system with AI generation',
  'Three-tier coaching engine',
  'War Room with stakeholder mapping',
  'Calendar integration & auto-join',
]

export default function Pricing() {
  const [sectionRef, visible] = useReveal()

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -100% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      <section id="pricing" ref={sectionRef} className="py-24 sm:py-32 px-5" style={{ background: '#0B0D12' }}>
        <div className="max-w-[520px] mx-auto text-center">

          {/* Header */}
          <div className="transition-all duration-700 mb-10" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#00E0CC', marginBottom: '16px' }}>
              Pricing
            </p>
            <h2 className="font-heading font-bold mb-4" style={{ fontSize: 'clamp(24px, 5vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.025em', color: '#EDF2F7' }}>
              Less Than One Hour of the OTE You&apos;re Interviewing For.
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#8B9BB4' }}>
              If your next role pays $250K, that&apos;s $120/hour. One sharper interview is the difference between an offer and &ldquo;we went with someone else.&rdquo;
            </p>
          </div>

          {/* Card */}
          <div className="transition-all duration-700" style={{
            opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transitionDelay: '0.2s',
          }}>
            <div style={{
              background: 'rgba(16,22,34,0.72)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '14px',
              padding: '32px 28px',
              textAlign: 'center',
            }}>
              <p style={{ fontSize: '18px', fontWeight: 700, color: '#EDF2F7', marginBottom: '8px' }}>
                Interview Coach
              </p>

              {/* Price with shimmer */}
              <div className="flex items-baseline justify-center gap-2 mb-4">
                <span style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 'clamp(48px, 10vw, 64px)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  background: 'linear-gradient(90deg, #00E0CC 0%, #00E0CC 35%, #5EFFE5 48%, #00E0CC 52%, #00E0CC 65%, #00E0CC 100%)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'shimmer 4s ease-in-out infinite',
                  filter: 'drop-shadow(0 0 8px rgba(0,224,204,0.15))',
                }}>
                  $99
                </span>
                <span style={{ fontSize: '16px', color: '#5A6A82' }}>/month</span>
              </div>

              <p style={{ fontSize: '14px', color: '#8B9BB4', marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                Everything. No tiers. No feature gating.
              </p>

              {/* Features */}
              <ul className="text-left mb-8" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {features.map((f, i) => (
                  <li key={f} className="flex items-start gap-3 transition-all duration-500"
                    style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(-8px)', transitionDelay: `${0.5 + i * 0.06}s` }}>
                    <span style={{ color: '#00E0CC', marginTop: '2px', fontSize: '14px', flexShrink: 0 }}>&#10003;</span>
                    <span style={{ fontSize: '14px', color: '#CBD5E1' }}>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a href="#start" className="block w-full text-center font-semibold transition-all duration-200" style={{
                padding: '16px 32px', borderRadius: '10px',
                background: '#00E0CC', color: '#080B12',
                fontSize: '15px', textDecoration: 'none',
              }}>
                Start Your Free Practice Interview &rarr;
              </a>
              <p style={{ fontSize: '11px', color: '#5A6A82', marginTop: '12px' }}>
                No credit card required. Cancel anytime.
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
