import { useRef, useEffect, useState } from 'react'

/* ── Reveal hook (same pattern as ProductExplainer) ─────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return [ref, visible]
}

function RevealBlock({ children, className = '', delay = 0 }) {
  const [ref, visible] = useReveal()
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.5s ease-out ${delay}ms, transform 0.5s ease-out ${delay}ms`,
    }}>
      {children}
    </div>
  )
}

/* ── Tab data ───────────────────────────────────────────────────── */
const tabs = [
  {
    id: 'story',
    label: 'Story',
    badge: 'STAR STORY',
    wordRange: '60–100 words',
    question: 'Walk me through your biggest competitive displacement.',
    structure: 'Tension opener → your actions → one numbered result.',
    answer: 'Acme Corp had been locked in with their incumbent for eight years. Zero relationship capital, full exec alignment against us. I started with the ops director — he was buried in manual workarounds their platform couldn\'t solve. Built the business case with him, got finance to validate the ROI gap, and used both to get 30 minutes with the CFO. Ran a structured eval, controlled the criteria, and closed a three-year commitment. $225K ACV, 124% to quota that year.',
  },
  {
    id: 'reframe',
    label: 'Reframe',
    badge: 'REFRAME',
    wordRange: '40–60 words',
    question: 'Tell me about a deal you lost.',
    structure: 'Quick acknowledge → what you built from it → proof the pivot is real.',
    answer: 'Lost a $180K deal at the procurement stage — legal flagged our data residency terms and the timeline collapsed. Rebuilt our mutual action plan template to front-load legal review in week two instead of week eight. Next three enterprise deals closed with zero procurement delays. The loss cost one deal. The fix saved a dozen.',
  },
  {
    id: 'metrics',
    label: 'Metrics',
    badge: 'METRICS-LED',
    wordRange: '35–55 words',
    question: 'What\'s your quota attainment look like?',
    structure: 'Open with the number → why it matters → brief method.',
    answer: '124% average over the last two years, with a $225K ACV in mid-market. That\'s off a $3.2M pipeline I built 60% self-sourced. The method is tiered account prioritization — ICP fit plus trigger events — so the pipeline is qualified before it enters the forecast.',
  },
  {
    id: 'framework',
    label: 'Framework',
    badge: 'FRAMEWORK',
    wordRange: '45–65 words',
    question: 'How do you approach territory planning?',
    structure: 'Name your framework → key steps → quick proof it works.',
    answer: 'I run a three-tier system: Tier 1 accounts get a custom play within 30 days — mapped org chart, identified pain, sequenced outreach. Tier 2 gets templated multi-thread sequences. Tier 3 is inbound-only with automated nurture. At Samsara this generated $4.8M pipeline in the first two quarters with 60% self-sourced.',
  },
  {
    id: 'close',
    label: 'Close',
    badge: 'ENTHUSIASM CLOSE',
    wordRange: '35–55 words',
    question: 'Why this company? Why now?',
    structure: 'One specific thing about THEM → why your background maps → forward energy.',
    answer: 'Your expansion into mid-market fleet safety is what got my attention — I spent two years selling exactly that motion at Samsara and understand the buyer, the objections, and the competitive landscape. I\'m not ramping on the market. I\'m ramping on your product. That\'s a faster path to revenue.',
  },
]

/* ── Main component ─────────────────────────────────────────────── */
export default function QuestionRouting() {
  const [activeTab, setActiveTab] = useState('story')
  const active = tabs.find(t => t.id === activeTab)

  return (
    <section className="relative py-24 sm:py-32 px-5" style={{ background: '#0B0D12' }}>

      {/* ── Section header ─────────────────────────────────────── */}
      <RevealBlock className="max-w-[720px] mx-auto text-center mb-14 sm:mb-20">
        <p style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '12px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: '#2dd4bf',
          marginBottom: '16px',
        }}>
          Question Routing
        </p>
        <h2 style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 'clamp(26px, 5vw, 42px)',
          fontWeight: 700,
          lineHeight: 1.15,
          letterSpacing: '-0.025em',
          color: '#f1f5f9',
          marginBottom: '14px',
        }}>
          Different Questions Demand<br />Different Structures.
        </h2>
        <p style={{
          fontSize: '15px',
          lineHeight: 1.7,
          color: 'rgba(241,245,249,0.45)',
          maxWidth: '560px',
          margin: '0 auto',
        }}>
          Every other tool sends every question through the same prompt and gets back the same-shaped paragraph.
          Interview Coach classifies the question <em style={{ color: 'rgba(241,245,249,0.65)', fontStyle: 'italic' }}>before</em> it generates — and
          routes each to a purpose-built answer structure.
        </p>
      </RevealBlock>

      {/* ── Interactive card ────────────────────────────────────── */}
      <RevealBlock className="max-w-[720px] mx-auto" delay={120}>
        <div style={{
          background: 'rgba(17,24,37,0.45)',
          border: '1px solid rgba(241,245,249,0.07)',
          borderRadius: '14px',
          overflow: 'hidden',
        }}>

          {/* Tab bar */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid rgba(241,245,249,0.06)',
            padding: '0 4px',
            overflowX: 'auto',
          }}>
            {tabs.map(tab => {
              const isActive = tab.id === activeTab
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    flex: '1 1 0',
                    minWidth: '0',
                    padding: '14px 12px 12px',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: isActive ? '2px solid #2dd4bf' : '2px solid transparent',
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '13px',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? '#f1f5f9' : 'rgba(241,245,249,0.35)',
                    cursor: 'pointer',
                    transition: 'color 0.2s, border-color 0.2s',
                    letterSpacing: '0.01em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Content area */}
          <div style={{ padding: '24px 24px 28px', minHeight: '340px', position: 'relative' }}>
            {/* Wrap in a keyed div for crossfade */}
            <div
              key={active.id}
              style={{
                animation: 'qr-fade-in 0.22s ease-out',
              }}
            >

              {/* Question (serif italic) */}
              <p style={{
                fontFamily: "'Newsreader', 'Georgia', serif",
                fontSize: '17px',
                fontStyle: 'italic',
                color: 'rgba(241,245,249,0.7)',
                lineHeight: 1.55,
                marginBottom: '16px',
              }}>
                "{active.question}"
              </p>

              {/* Badge row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                {/* Format badge */}
                <span style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '10px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#2dd4bf',
                  background: 'rgba(45,212,191,0.1)',
                  border: '1px solid rgba(45,212,191,0.2)',
                  borderRadius: '4px',
                  padding: '3px 8px',
                }}>
                  {active.badge}
                </span>
                {/* Word range */}
                <span style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '10px',
                  fontWeight: 500,
                  color: 'rgba(241,245,249,0.25)',
                  letterSpacing: '0.04em',
                }}>
                  {active.wordRange}
                </span>
              </div>

              {/* Structure description */}
              <p style={{
                fontSize: '13px',
                color: 'rgba(241,245,249,0.35)',
                lineHeight: 1.5,
                marginBottom: '18px',
              }}>
                {active.structure}
              </p>

              {/* Divider */}
              <div style={{
                height: '1px',
                background: 'rgba(241,245,249,0.06)',
                marginBottom: '18px',
              }} />

              {/* Mock answer card */}
              <div style={{
                background: 'rgba(45,212,191,0.03)',
                border: '1px solid rgba(45,212,191,0.1)',
                borderLeft: '3px solid #2dd4bf',
                borderRadius: '8px',
                padding: '16px 18px 16px 20px',
              }}>
                {/* Label row */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '10px',
                }}>
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#2dd4bf',
                    flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '10px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'rgba(241,245,249,0.35)',
                  }}>
                    Say This
                  </span>
                </div>

                {/* Answer text */}
                <p style={{
                  fontSize: '14.5px',
                  lineHeight: 1.75,
                  color: '#f1f5f9',
                  fontWeight: 400,
                }}>
                  {active.answer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </RevealBlock>

      {/* ── Closing line ───────────────────────────────────────── */}
      <RevealBlock className="max-w-[720px] mx-auto text-center mt-14 sm:mt-20" delay={200}>
        <p style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '13px',
          fontWeight: 500,
          color: 'rgba(241,245,249,0.3)',
          letterSpacing: '0.02em',
          lineHeight: 1.6,
        }}>
          Five question types. Five answer structures.<br />
          Classified in milliseconds — before the AI writes a single word.
        </p>
      </RevealBlock>

      {/* Crossfade keyframes */}
      <style>{`
        @keyframes qr-fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
