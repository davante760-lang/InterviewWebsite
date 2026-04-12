import { useState, useRef, useEffect } from 'react'

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

const faqs = [
  {
    q: 'Will this actually work during a live interview?',
    a: 'Tiers 1 and 2 run locally on your machine. No cloud round-trip, no buffering, no lag spikes. The answer hits your screen in under 500 milliseconds — while the interviewer is still finishing the question. It runs as a floating overlay on your desktop, the same way you\'d have Salesforce open during a customer call.',
  },
  {
    q: "Won't it distract me or make me look worse?",
    a: 'If you\'ve ever glanced at notes during a sales call, you already know how to use a second information source without breaking eye contact. The cards are designed to be scanned in 2–3 seconds — short, structured, your words. You\'re not reading a script. You\'re getting a memory jog with your actual numbers.',
  },
  {
    q: 'Is this just another AI interview gimmick?',
    a: 'It was built by a President\'s Club AE during a real job search and used on real interviews. The three-tier engine, the Prep Card system, the War Room — all of it came from the specific problems an enterprise seller faces in a hiring loop.',
  },
  {
    q: "What if I don't have time to build Prep Cards?",
    a: 'Upload your resume and any deal docs. The system generates your initial card set automatically — you refine from there. Most users have a working playbook in under 30 minutes.',
  },
  {
    q: "I'm a strong interviewer. Why do I need this?",
    a: '"Strong" in a pool of 30 other AEs who all hit quota isn\'t a differentiator. The question isn\'t whether you can get through interviews. It\'s whether you\'ll be the most specific, most metrics-sharp, most structured candidate the hiring panel sees that week.',
  },
]

export default function FAQ() {
  const [sectionRef, visible] = useReveal()
  const [openIdx, setOpenIdx] = useState(null)

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 px-5" style={{ background: '#0B0D12' }}>
      <div className="max-w-[680px] mx-auto">

        {/* Header */}
        <div className="transition-all duration-700 mb-10" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#00E0CC', marginBottom: '16px' }}>
            Straight Answers
          </p>
          <h2 className="font-heading font-bold" style={{ fontSize: 'clamp(24px, 5vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.025em', color: '#EDF2F7' }}>
            You&apos;re Thinking It. <span style={{ color: '#00E0CC' }}>Here It Is.</span>
          </h2>
        </div>

        {/* Questions */}
        <div className="transition-all duration-700" style={{ opacity: visible ? 1 : 0, transitionDelay: '0.2s' }}>
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i
            return (
              <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full text-left cursor-pointer flex items-start justify-between gap-4"
                  style={{ padding: '20px 0' }}
                >
                  <span style={{ fontSize: '15px', fontWeight: 600, color: '#EDF2F7', lineHeight: 1.4 }}>{faq.q}</span>
                  <span style={{ fontSize: '18px', color: '#5A6A82', flexShrink: 0, marginTop: '-2px', transition: 'transform 0.3s', transform: isOpen ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
                </button>
                <div style={{
                  maxHeight: isOpen ? '300px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease-out, opacity 0.3s',
                  opacity: isOpen ? 1 : 0,
                }}>
                  <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#8B9BB4', paddingBottom: '20px' }}>{faq.a}</p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
