import { useState, useEffect, useRef } from 'react'

const INPUT_ITEMS = [
  { icon: 'doc', label: 'Resume', detail: 'Roles, titles, tenure, promotions', color: '#5b8def' },
  { icon: 'trophy', label: 'Closed Won', detail: '$225K ACV displacement, 7-month cycle', color: '#00E0CC' },
  { icon: 'x', label: 'Closed Lost', detail: 'What happened, what you learned', color: '#ef6b6b' },
  { icon: 'mic', label: 'Your Why', detail: 'Motivation, what you want next', color: '#8B7AFF' },
  { icon: 'transcript', label: 'Call Transcripts', detail: 'How you actually talk about deals', color: '#FFB347' },
  { icon: 'metrics', label: 'Your Metrics', detail: 'Attainment, pipeline, cycle times', color: '#00E0CC' },
]

function IconSVG({ type, color }) {
  const s = { width: 20, height: 20 }
  switch (type) {
    case 'doc': return <svg {...s} viewBox="0 0 20 20" fill="none"><rect x="3" y="1" width="14" height="18" rx="2" stroke={color} strokeWidth="1.5" /><line x1="6" y1="6" x2="14" y2="6" stroke={color} strokeWidth="1.2" opacity="0.6" /><line x1="6" y1="9" x2="14" y2="9" stroke={color} strokeWidth="1.2" opacity="0.6" /><line x1="6" y1="12" x2="11" y2="12" stroke={color} strokeWidth="1.2" opacity="0.6" /></svg>
    case 'trophy': return <svg {...s} viewBox="0 0 20 20" fill="none"><path d="M6 3h8v6a4 4 0 01-8 0V3z" stroke={color} strokeWidth="1.5" /><path d="M6 5H4a2 2 0 000 4h2" stroke={color} strokeWidth="1.2" opacity="0.5" /><path d="M14 5h2a2 2 0 010 4h-2" stroke={color} strokeWidth="1.2" opacity="0.5" /><line x1="10" y1="13" x2="10" y2="16" stroke={color} strokeWidth="1.5" /><line x1="7" y1="16" x2="13" y2="16" stroke={color} strokeWidth="1.5" /></svg>
    case 'x': return <svg {...s} viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke={color} strokeWidth="1.5" /><line x1="7" y1="7" x2="13" y2="13" stroke={color} strokeWidth="1.5" /><line x1="13" y1="7" x2="7" y2="13" stroke={color} strokeWidth="1.5" /></svg>
    case 'mic': return <svg {...s} viewBox="0 0 20 20" fill="none"><rect x="7" y="2" width="6" height="10" rx="3" stroke={color} strokeWidth="1.5" /><path d="M4 10a6 6 0 0012 0" stroke={color} strokeWidth="1.2" opacity="0.5" /><line x1="10" y1="16" x2="10" y2="18" stroke={color} strokeWidth="1.5" /></svg>
    case 'transcript': return <svg {...s} viewBox="0 0 20 20" fill="none"><rect x="2" y="3" width="16" height="14" rx="2" stroke={color} strokeWidth="1.5" /><line x1="5" y1="7" x2="10" y2="7" stroke={color} strokeWidth="1.2" opacity="0.6" /><line x1="5" y1="10" x2="15" y2="10" stroke={color} strokeWidth="1.2" opacity="0.6" /><line x1="5" y1="13" x2="12" y2="13" stroke={color} strokeWidth="1.2" opacity="0.6" /></svg>
    case 'metrics': return <svg {...s} viewBox="0 0 20 20" fill="none"><polyline points="2,15 6,9 10,12 14,5 18,8" stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round" /><circle cx="6" cy="9" r="1.5" fill={color} opacity="0.4" /><circle cx="14" cy="5" r="1.5" fill={color} opacity="0.4" /></svg>
    default: return null
  }
}

function FlowParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * 360
        const delay = i * 0.4
        const duration = 2.5 + (i % 3) * 0.5
        const startRadius = 180 + (i % 3) * 30
        return (
          <div key={i} className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full opacity-0"
            style={{
              background: `hsl(${170 + i * 15}, 60%, 55%)`,
              animation: `flowToCenter ${duration}s ${delay}s ease-in infinite`,
              '--angle': `${angle}deg`,
              '--startR': `${startRadius}px`,
            }} />
        )
      })}
    </div>
  )
}

export default function YourPlaybook() {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <style>{`
        @keyframes flowToCenter {
          0% { opacity: 0; transform: translate(calc(cos(var(--angle)) * var(--startR)), calc(sin(var(--angle)) * var(--startR))); }
          20% { opacity: 0.7; }
          90% { opacity: 0.3; }
          100% { opacity: 0; transform: translate(0, 0); }
        }
        @keyframes enginePulse {
          0%, 100% { box-shadow: 0 0 30px rgba(0,224,204,0.1), 0 0 60px rgba(0,224,204,0.03); }
          50% { box-shadow: 0 0 40px rgba(0,224,204,0.18), 0 0 80px rgba(0,224,204,0.06); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes outputReveal {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .ic-input-chip {
          display: flex; align-items: center; gap: 10px; padding: 10px 16px;
          border-radius: 10px; background: rgba(16,22,34,0.55); border: 1px solid rgba(255,255,255,0.05);
          opacity: 0; transition: border-color 0.3s, background 0.3s;
        }
        .ic-input-chip:hover { background: rgba(28,38,58,0.65); border-color: rgba(255,255,255,0.1); }
        .ic-input-chip.show { animation: fadeInUp 0.5s ease-out forwards; }
      `}</style>

      <section ref={sectionRef} className="py-24 sm:py-32 px-5 overflow-hidden" style={{ background: '#0B0D12' }}>

        {/* Header */}
        <div className="text-center max-w-[620px] mx-auto mb-16 sm:mb-20 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}>
          <h2 className="font-heading font-semibold mb-4" style={{ fontSize: 'clamp(26px, 5.5vw, 40px)', lineHeight: 1.2, letterSpacing: '-0.02em', color: '#EDF2F7' }}>
            We don&apos;t generate your answers.<br />
            <span style={{ color: '#00E0CC' }}>We learn them.</span>
          </h2>
          <p className="mx-auto" style={{ fontSize: 'clamp(15px, 3.5vw, 17px)', lineHeight: 1.7, color: '#8B9BB4', maxWidth: '480px' }}>
            Feed the engine everything — your resume, your deal stories, your transcripts, the way you actually talk. Every answer it surfaces sounds like you on your sharpest day.
          </p>
        </div>

        {/* Visual: Inputs → Engine → Output */}
        <div className="flex flex-col items-center max-w-[540px] mx-auto relative">

          {/* Input grid */}
          <div className="grid grid-cols-2 gap-2 w-full mb-0">
            {INPUT_ITEMS.map((item, i) => (
              <div key={item.label} className={`ic-input-chip${visible ? ' show' : ''}`}
                style={{ animationDelay: `${0.15 + i * 0.1}s` }}>
                <div className="shrink-0"><IconSVG type={item.icon} color={item.color} /></div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#EDF2F7', lineHeight: 1.2 }}>{item.label}</div>
                  <div style={{ fontSize: '11px', color: '#5A6A82', lineHeight: 1.3, marginTop: '2px' }}>{item.detail}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Flow arrows */}
          <div className="w-full h-12 flex justify-center transition-opacity duration-600"
            style={{ opacity: visible ? 1 : 0, transitionDelay: '0.9s' }}>
            <svg width="120" height="48" viewBox="0 0 120 48" fill="none">
              <path d="M20 4 L60 40 L100 4" stroke="rgba(0,224,204,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
              <path d="M40 4 L60 28 L80 4" stroke="rgba(0,224,204,0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
              <circle cx="60" cy="42" r="3" fill="#00E0CC" opacity="0.4" />
            </svg>
          </div>

          {/* Engine core */}
          <div className="relative w-full flex justify-center transition-all duration-600"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'scale(1)' : 'scale(0.92)', transitionDelay: '1s' }}>
            <FlowParticles />
            <div className="relative z-10 w-full text-center" style={{
              maxWidth: '380px',
              background: 'rgba(16,22,34,0.72)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0,224,204,0.15)', borderRadius: '14px',
              padding: '24px 32px',
              animation: visible ? 'enginePulse 3s ease-in-out infinite' : 'none',
            }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(0,224,204,0.5)', marginBottom: '8px' }}>
                Interview Coach Engine
              </div>
              <div style={{ fontSize: '18px', fontWeight: 600, color: '#EDF2F7', lineHeight: 1.3, marginBottom: '8px' }}>
                Your voice. Your stories.<br />Indexed and retrievable.
              </div>
              <div style={{ fontSize: '12px', color: '#5A6A82', lineHeight: 1.5 }}>
                Every answer the AI surfaces passes through<br />your material first — not the other way around.
              </div>
            </div>
          </div>

          {/* Flow arrow down */}
          <div className="w-full h-12 flex justify-center transition-opacity duration-600"
            style={{ opacity: visible ? 1 : 0, transitionDelay: '1.3s' }}>
            <svg width="40" height="48" viewBox="0 0 40 48" fill="none">
              <line x1="20" y1="0" x2="20" y2="38" stroke="rgba(0,224,204,0.2)" strokeWidth="1.5" strokeDasharray="4 4" />
              <polygon points="14,34 20,44 26,34" fill="#00E0CC" opacity="0.35" />
            </svg>
          </div>

          {/* Output card — matches production answer card tokens */}
          <div className="w-full" style={{ opacity: visible ? 1 : 0, animation: visible ? 'outputReveal 0.7s 1.5s ease-out both' : 'none' }}>
            <div style={{
              background: 'rgba(0,224,204,0.04)', border: '1px solid rgba(0,224,204,0.14)',
              borderLeft: '3px solid #00E0CC', borderRadius: '10px',
              padding: '20px 24px', boxShadow: '0 0 20px rgba(0,224,204,0.04)',
            }}>
              <div className="flex items-center gap-2 mb-3">
                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#00E0CC', background: 'rgba(0,224,204,0.12)', padding: '4px 10px', borderRadius: '4px', fontFamily: "'JetBrains Mono', monospace" }}>
                  What They Hear
                </span>
                <span style={{ fontSize: '10px', fontWeight: 500, color: 'rgba(0,224,204,0.4)', fontFamily: "'JetBrains Mono', monospace" }}>
                  &lt; 500ms
                </span>
              </div>
              <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#EDF2F7' }}>
                &ldquo;Displaced an 8-year incumbent. $225K ACV, 7-month cycle. They had relationships at every level — I had zero. Started with the ops director, who was living with the pain daily. Mapped his priorities back to a business case, got finance aligned on the ROI, then used both of them to get 30 minutes with the CFO. Ran a structured eval, controlled the criteria, three-year commitment on the close.&rdquo;
              </p>
              <div className="flex items-center gap-1.5 mt-3">
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00E0CC', opacity: 0.6 }} />
                <span style={{ fontSize: '11px', color: 'rgba(0,224,204,0.45)', fontStyle: 'italic' }}>
                  Sourced from your closed-won narrative + your transcript cadence
                </span>
              </div>
            </div>
          </div>

          {/* Closing */}
          <div className="text-center mt-10 transition-opacity duration-600"
            style={{ opacity: visible ? 1 : 0, transitionDelay: '2s' }}>
            <p className="mb-6" style={{ fontSize: 'clamp(15px, 3.8vw, 18px)', fontWeight: 500, color: '#8B9BB4', fontStyle: 'italic' }}>
              AI writes the structure. You&apos;re the source material.
            </p>
            <a href="#start" className="inline-block font-semibold transition-all duration-200"
              style={{ padding: '14px 32px', borderRadius: '8px', background: '#00E0CC', color: '#080B12', fontSize: '14px', letterSpacing: '0.01em', textDecoration: 'none' }}>
              Build Your Playbook — Free
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
