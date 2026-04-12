import { useRef, useState, useEffect } from 'react'

function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

const heroes = [
  {
    name: 'Natalie Voss',
    title: 'Mid-Market AE',
    context: 'Interviewed at a growth-stage DevTools company. $240K OTE.',
    quote: "I blanked on my pipeline number in a phone screen. Not a hard question. Not a trick question. I just froze because the pressure hits different when someone is evaluating you instead of buying from you. Never happened again after I started using Interview Coach. Every metric on screen before I needed it.",
  },
  {
    name: 'Megan Cho',
    title: 'AE → Strategic Accounts',
    context: 'Interviewed at a top-three cloud provider. $400K OTE.',
    quote: "Seven rounds. Two panels. A case study presentation. Three different interviewers asked about my approach to account planning in slightly different ways. Same framework every time, tailored examples to each person's focus area. Zero contradictions across seven conversations. That's not memory. That's the Prep Card system doing what it's supposed to do.",
  },
  {
    name: 'Marcus Cole',
    title: 'SDR → First Closing Role',
    context: 'Interviewed at a vertical SaaS company. $160K OTE.',
    quote: "My biggest fear was not having deal stories. I'd never closed anything. Interview Coach helped me reframe my SDR work as discovery, qualification, and objection handling — which is literally what it is. The hiring manager told me I articulated the full cycle transition better than candidates who'd been closing for two years.",
  },
]

const tickerQuotes = [
  { name: 'Jake M.', pull: 'My $1.8M displacement was on screen before she finished the question.' },
  { name: 'Rachel D.', pull: 'Three active processes at once and I stopped showing up scattered.' },
  { name: 'Priya N.', pull: 'Five rounds. Same metrics, same arc, same confidence every time.' },
  { name: 'Tommy H.', pull: 'They never once questioned whether I could handle larger accounts.' },
  { name: 'Danielle O.', pull: 'Completely changed how I showed up in leadership rounds.' },
  { name: 'Chris B.', pull: 'Walked into the CRO round like it was a board review. Got the call next morning.' },
  { name: 'Aisha R.', pull: 'The HM said I was the most commercially minded candidate in the pool.' },
  { name: 'Derek Y.', pull: 'No bitterness, no red flags. That prep was non-negotiable.' },
  { name: 'Jordan P.', pull: 'I articulated my contribution better than most AEs he\'d interviewed.' },
  { name: 'Samantha T.', pull: 'Board presentation round. They made the offer that week.' },
  { name: 'Will A.', pull: 'I wasn\'t just coaching reps. I was building the engine.' },
  { name: 'Ryan K.', pull: 'That exact question came up in round three. The muscle memory was just there.' },
  { name: 'Tara M.', pull: 'Simple reframe but it made all the difference.' },
  { name: 'Alex P.', pull: 'Told that story in round five with the same precision as if I\'d closed it last Tuesday.' },
  { name: 'Brianna W.', pull: 'I answered like I\'d been thinking about it for months.' },
  { name: 'Elijah T.', pull: 'I negotiated from clarity instead of anxiety.' },
  { name: 'Courtney L.', pull: 'Most structured deal walkthrough she\'d heard in 40 interviews that quarter.' },
]

export default function Testimonials() {
  const [sectionRef, visible] = useReveal()

  return (
    <>
      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <section ref={sectionRef} className="py-24 sm:py-32 px-5" style={{ background: '#0B0D12' }}>
        <div className="max-w-[900px] mx-auto">

          {/* Header */}
          <div className="text-center mb-12 transition-all duration-700"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#00E0CC', marginBottom: '16px' }}>
              From the People Using It
            </p>
            <h2 className="font-heading font-bold" style={{ fontSize: 'clamp(24px, 5vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.025em', color: '#EDF2F7' }}>
              Real AEs. Real Interviews. <span style={{ color: '#00E0CC' }}>Real Offers.</span>
            </h2>
          </div>

          {/* 3 Hero testimonials */}
          <div className="flex flex-col gap-6 mb-16">
            {heroes.map((h, i) => (
              <div key={i} className="transition-all duration-700"
                style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transitionDelay: `${0.2 + i * 0.15}s` }}>
                <div style={{
                  background: 'rgba(16,22,34,0.72)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '14px',
                  padding: '24px',
                }}>
                  {/* Quote */}
                  <div style={{ borderLeft: '3px solid rgba(0,224,204,0.25)', paddingLeft: '18px', marginBottom: '16px' }}>
                    <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#CBD5E1', fontStyle: 'italic' }}>
                      &ldquo;{h.quote}&rdquo;
                    </p>
                  </div>
                  {/* Attribution */}
                  <div className="flex items-center gap-3">
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,224,204,0.1)', border: '1px solid rgba(0,224,204,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#00E0CC' }}>{h.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: '#EDF2F7' }}>{h.name}</p>
                      <p style={{ fontSize: '12px', color: '#5A6A82' }}>{h.title} &middot; {h.context}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stat line */}
          <div className="text-center mb-10 transition-all duration-700"
            style={{ opacity: visible ? 1 : 0, transitionDelay: '0.7s' }}>
            <p style={{ fontSize: '14px', color: '#5A6A82' }}>
              Used by <span style={{ color: '#00E0CC', fontWeight: 600 }}>hundreds of AEs</span> across enterprise, mid-market, and career transitions
            </p>
          </div>

          {/* Scrolling ticker */}
          <div className="overflow-hidden transition-opacity duration-700" style={{ opacity: visible ? 1 : 0, transitionDelay: '0.8s' }}>
            <div style={{
              display: 'flex',
              width: 'max-content',
              animation: 'ticker-scroll 60s linear infinite',
            }}>
              {/* Double the items for seamless loop */}
              {[...tickerQuotes, ...tickerQuotes].map((t, i) => (
                <div key={i} className="shrink-0" style={{
                  padding: '12px 20px',
                  marginRight: '12px',
                  background: 'rgba(16,22,34,0.45)',
                  border: '1px solid rgba(255,255,255,0.04)',
                  borderRadius: '10px',
                  maxWidth: '360px',
                  minWidth: '280px',
                }}>
                  <p style={{ fontSize: '13px', lineHeight: 1.5, color: '#8B9BB4', fontStyle: 'italic', marginBottom: '6px' }}>
                    &ldquo;{t.pull}&rdquo;
                  </p>
                  <p style={{ fontSize: '11px', color: '#5A6A82', fontWeight: 600 }}>— {t.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <a href="#start" className="inline-block font-semibold transition-all duration-200"
              style={{ padding: '14px 32px', borderRadius: '10px', background: '#00E0CC', color: '#080B12', fontSize: '14px', textDecoration: 'none' }}>
              Start Your Free Practice Interview &rarr;
            </a>
          </div>

        </div>
      </section>
    </>
  )
}
