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

export default function FinalCTA() {
  const [sectionRef, visible] = useReveal()

  return (
    <section ref={sectionRef} className="py-32 sm:py-40 px-5 relative" style={{ background: '#0B0D12' }}>
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ width: 500, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,224,204,0.04) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-[700px] mx-auto text-center transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}>
        <h2 className="font-heading font-bold mb-3" style={{ fontSize: 'clamp(28px, 6vw, 48px)', lineHeight: 1.1, letterSpacing: '-0.03em', color: '#EDF2F7' }}>
          Your Next Role Is a Six-Figure Deal.
        </h2>
        <h2 className="font-heading font-bold mb-8" style={{ fontSize: 'clamp(28px, 6vw, 48px)', lineHeight: 1.1, letterSpacing: '-0.03em', color: '#00E0CC' }}>
          Close It Like One.
        </h2>

        <p className="mb-10" style={{ fontSize: '17px', lineHeight: 1.7, color: '#8B9BB4', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
          Your stories. Your metrics. Your frameworks. On screen before you need them. Built by someone who&apos;s been in the chair.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <a href="#start" className="inline-block font-semibold transition-all duration-200" style={{
            padding: '16px 36px', borderRadius: '10px',
            background: '#00E0CC', color: '#080B12',
            fontSize: '15px', textDecoration: 'none',
          }}>
            Start Your Free Practice Interview &rarr;
          </a>
          <a href="#how-it-works" style={{ fontSize: '14px', color: '#5A6A82', textDecoration: 'none', transition: 'color 0.3s' }}>
            See How the Engine Works &rarr;
          </a>
        </div>
      </div>
    </section>
  )
}
