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

export default function VideoWalkthrough() {
  const [sectionRef, visible] = useReveal()

  return (
    <section ref={sectionRef} className="py-16 md:py-24 px-4 sm:px-6" style={{ background: '#0B0D12' }}>
      <div className="max-w-[1000px] mx-auto">

        <p className="text-center mb-6 transition-opacity duration-500" style={{
          opacity: visible ? 1 : 0,
          fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: '0.12em', color: '#00E0CC',
        }}>
          See It in Action
        </p>

        <h2 className="font-heading font-bold text-center mb-8 transition-all duration-700" style={{
          opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(12px)',
          fontSize: 'clamp(22px, 5vw, 36px)', lineHeight: 1.15, letterSpacing: '-0.025em', color: '#EDF2F7',
        }}>
          Watch the Full System <span style={{ color: '#00E0CC' }}>in 90 Seconds.</span>
        </h2>

        <div className="transition-all duration-700" style={{ opacity: visible ? 1 : 0, transform: visible ? 'scale(1)' : 'scale(0.95)' }}>
          <div style={{
            position: 'relative', borderRadius: '14px', overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.07)',
            background: 'rgba(16,22,34,0.72)',
          }}>
            <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%' }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at 50% 40%, rgba(0,224,204,0.06) 0%, rgba(11,13,18,0.98) 70%)',
              }} />

              {/* Play button */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                  width: 80, height: 80, borderRadius: '50%',
                  background: 'rgba(0,224,204,0.15)', border: '1px solid rgba(0,224,204,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 0 40px rgba(0,224,204,0.1)',
                }}>
                  <svg viewBox="0 0 24 24" fill="#00E0CC" style={{ width: 28, height: 28, marginLeft: 3 }}>
                    <path d="M8 5.14v14l11-7-11-7z" />
                  </svg>
                </div>
              </div>

              {/* Duration */}
              <div style={{ position: 'absolute', bottom: 16, right: 16 }}>
                <span style={{
                  background: 'rgba(8,11,18,0.6)', backdropFilter: 'blur(8px)',
                  color: '#CBD5E1', fontSize: '11px', padding: '4px 10px',
                  borderRadius: '6px', fontWeight: 500, border: '1px solid rgba(255,255,255,0.05)',
                }}>1:32</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center mt-5 transition-opacity duration-500" style={{
          opacity: visible ? 0.5 : 0, fontSize: '12px', color: '#5A6A82', letterSpacing: '0.02em',
        }}>
          Watch the founder walk through a live session — question to answer in under 500ms
        </p>

          {/* CTA */}
          <div className="text-center mt-12">
            <a href="#start" className="inline-block font-semibold transition-all duration-200"
              style={{ padding: '14px 32px', borderRadius: '10px', background: 'rgba(0,224,204,0.12)', border: '1px solid rgba(0,224,204,0.3)', color: '#00E0CC', fontSize: '14px', textDecoration: 'none' }}>
              Start Your Free Practice Interview &rarr;
            </a>
          </div>

      </div>
    </section>
  )
}
