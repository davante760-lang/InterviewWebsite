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

const stats = [
  { value: '2x', label: "President's Club" },
  { value: '124%', label: 'Avg Quota Attainment' },
  { value: '$1.5M', label: 'Annual Targets' },
  { value: '125 hrs', label: 'Build Time' },
]

export default function FounderCredibility() {
  const [sectionRef, visible] = useReveal()

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 px-5" style={{ background: '#0B0D12' }}>
      <div className="max-w-[720px] mx-auto">

        {/* Section label */}
        <div className="transition-all duration-700" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#00E0CC', marginBottom: '16px' }}>
            Built in the Arena
          </p>
          <h2 className="font-heading font-bold mb-10" style={{ fontSize: 'clamp(24px, 5vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.025em', color: '#EDF2F7' }}>
            Built During a Real Job Search.{' '}
            <span style={{ color: '#00E0CC' }}>Tested on Real Interviews.</span>
          </h2>
        </div>

        {/* Quote */}
        <div className="transition-all duration-700" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transitionDelay: '0.15s' }}>
          <div style={{
            background: 'rgba(16,22,34,0.72)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '14px',
            padding: '28px 24px',
            marginBottom: '32px',
          }}>
            <div style={{ borderLeft: '3px solid rgba(0,224,204,0.3)', paddingLeft: '20px' }}>
              <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#CBD5E1', fontStyle: 'italic' }}>
                &ldquo;I built Interview Coach because I was blanking on metrics I knew cold. Mid-interview, staring at a VP of Sales, trying to remember if my pipeline number was $3.2M or $2.8M. I built the first version in a week. Used it on every round after that &mdash; phone screens through exec panels, across multiple companies. I landed the role. This isn&apos;t a product I think would be useful. It&apos;s the product I used to get the offer I&apos;m working under right now.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Social proof line */}
        <div className="transition-all duration-700" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transitionDelay: '0.3s' }}>
          <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#8B9BB4', marginBottom: '32px' }}>
            Since then, hundreds of AEs have used Interview Coach to show up sharper, with less stress and more confidence &mdash; in the rounds that actually determine their income.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transitionDelay: '0.45s' }}>
          {stats.map((stat, i) => (
            <div key={i} style={{
              background: 'rgba(16,22,34,0.55)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '12px',
              padding: '20px 16px',
              textAlign: 'center',
            }}>
              <p className="font-heading font-bold" style={{ fontSize: 'clamp(24px, 5vw, 32px)', color: '#00E0CC', letterSpacing: '-0.02em', lineHeight: 1 }}>
                {stat.value}
              </p>
              <p style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#5A6A82', marginTop: '8px' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
