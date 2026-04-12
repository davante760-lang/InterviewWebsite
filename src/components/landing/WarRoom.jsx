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

const stages = ['Applied', 'Screen', 'HM Round', 'VP Round', 'Panel', 'Offer']

const positions = [
  {
    company: 'Datadog', role: 'Enterprise AE', stage: 3, comp: '$280K OTE',
    initials: 'DD', color: '#632ca6', nextInterview: 'Apr 14 · 2:00 PM',
    stakeholders: [{ initials: 'MK' }, { initials: 'JL' }],
    notes: 'Strong signal from HM. Prep competitive positioning vs. Splunk.',
  },
  {
    company: 'CrowdStrike', role: 'Strategic AE', stage: 4, comp: '$310K OTE',
    initials: 'CS', color: '#e8462e', nextInterview: 'Apr 16 · 10:30 AM',
    stakeholders: [{ initials: 'RB' }, { initials: 'AP' }, { initials: 'TN' }],
    notes: 'Final panel. CRO attending. Lead with $1.2M deal story.',
  },
  {
    company: 'Snowflake', role: 'Commercial AE', stage: 1, comp: '$250K OTE',
    initials: 'SF', color: '#29b5e8', nextInterview: 'Pending',
    stakeholders: [{ initials: 'KW' }],
    notes: 'Initial screen. Research data cloud positioning.',
  },
]

export default function WarRoom() {
  const [sectionRef, visible] = useReveal()

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 px-5" style={{ background: '#0B0D12' }}>
      <div className="max-w-[760px] mx-auto">

        {/* Header */}
        <div className="transition-all duration-700 mb-10" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#00E0CC', marginBottom: '16px' }}>
            Your Pipeline
          </p>
          <h2 className="font-heading font-bold mb-4" style={{ fontSize: 'clamp(24px, 5vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.025em', color: '#EDF2F7' }}>
            Your Job Search Is a Pipeline.{' '}
            <span style={{ color: '#00E0CC' }}>Run It Like One.</span>
          </h2>
          <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#8B9BB4', maxWidth: '520px' }}>
            Each opportunity gets a dedicated workspace: intel, stakeholder mapping, comp tracking, and per-round notes.
          </p>
        </div>

        {/* Dashboard */}
        <div className="transition-all duration-700" style={{
          opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transitionDelay: '0.2s',
        }}>
          <div style={{
            background: 'rgba(16,22,34,0.72)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '14px',
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
          }}>
            {/* Header bar */}
            <div className="flex items-center justify-between" style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.04)', background: 'linear-gradient(180deg, rgba(255,255,255,0.015) 0%, transparent 100%)' }}>
              <div>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10.5px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8B9BB4' }}>War Room</p>
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#EDF2F7', marginTop: '2px' }}>3 Active Positions</p>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#00E0CC', background: 'rgba(0,224,204,0.10)', border: '1px solid rgba(0,224,204,0.2)', padding: '4px 12px', borderRadius: '8px' }}>
                2 Interviews This Week
              </span>
            </div>

            {/* Position rows */}
            {positions.map((pos, posIdx) => (
              <div key={pos.company} className="transition-all duration-500"
                style={{
                  padding: '16px 18px',
                  borderBottom: posIdx < positions.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(-10px)',
                  transitionDelay: `${0.4 + posIdx * 0.12}s`,
                }}>
                {/* Company + comp */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center" style={{ width: 32, height: 32, borderRadius: '8px', backgroundColor: `${pos.color}20` }}>
                      <span style={{ fontSize: '10px', fontWeight: 700, color: pos.color }}>{pos.initials}</span>
                    </div>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: '#EDF2F7' }}>{pos.company}</p>
                      <p style={{ fontSize: '11px', color: '#5A6A82' }}>{pos.role}</p>
                    </div>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 500, color: '#5A6A82' }}>{pos.comp}</span>
                </div>

                {/* Stage bars */}
                <div className="flex gap-1 mb-2">
                  {stages.map((_, i) => (
                    <div key={i} className="flex-1 rounded-full transition-all duration-500" style={{
                      height: '4px',
                      background: i < pos.stage ? 'rgba(0,224,204,0.5)' : i === pos.stage ? 'rgba(0,224,204,0.2)' : 'rgba(139,155,180,0.08)',
                      transitionDelay: `${0.5 + posIdx * 0.12 + i * 0.04}s`,
                    }} />
                  ))}
                </div>

                {/* Bottom row */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1">
                      {pos.stakeholders.map((sh, i) => (
                        <div key={i} className="flex items-center justify-center" style={{
                          width: 20, height: 20, borderRadius: '50%',
                          background: 'rgba(28,38,58,0.65)', border: '1px solid rgba(255,255,255,0.05)',
                          fontSize: '7px', fontWeight: 600, color: '#5A6A82',
                        }}>{sh.initials}</div>
                      ))}
                    </div>
                    <span style={{ fontSize: '9px', color: '#5A6A82' }}>{pos.stakeholders.length}</span>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 500, color: pos.nextInterview === 'Pending' ? '#5A6A82' : '#00E0CC' }}>
                    {pos.nextInterview}
                  </span>
                </div>

                {/* Notes */}
                <div className="mt-3" style={{ background: 'rgba(13,17,23,0.75)', borderRadius: '8px', padding: '8px 12px', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <p style={{ fontSize: '11px', color: '#8B9BB4', lineHeight: 1.5 }}>{pos.notes}</p>
                </div>
              </div>
            ))}
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
