import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Zap, Target, Layout, Clock, Check, X, Mic, ArrowRight } from 'lucide-react'

/* ── Reveal on scroll ── */
function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect() } }, { threshold: 0.1 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return <div ref={ref} className={className} style={{ opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(20px)', transition: `opacity 0.6s ${delay}s ease-out, transform 0.6s ${delay}s ease-out` }}>{children}</div>
}

/* ── Counter animation ── */
function Counter({ end, suffix = '', prefix = '' }) {
  const ref = useRef(null)
  const [val, setVal] = useState(0)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        obs.disconnect()
        const dur = 1500; const start = performance.now()
        const tick = (now) => {
          const p = Math.min((now - start) / dur, 1)
          setVal(Math.floor(end * (1 - Math.pow(1 - p, 3))))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.3 })
    obs.observe(el); return () => obs.disconnect()
  }, [end])
  return <span ref={ref}>{prefix}{val}{suffix}</span>
}

/* ── Data ── */
const comparison = [
  ['Built for', 'Engineers doing LeetCode', 'Quota carriers running MEDDPICC'],
  ['Answer source', 'AI generates from scratch', 'YOUR stories, YOUR metrics'],
  ['Coaching speed', '3-8 seconds (cloud LLM)', '< 500ms (local inference)'],
  ['Deal stories', 'Generic STAR format', 'Full arc: Champion → EB → Close'],
  ['Job search mgmt', 'None', 'War Room pipeline management'],
]

const features = [
  { icon: Mic, title: 'Real-Time Coaching', body: 'The system listens to your live interview, classifies each question by type, and delivers your best answer to screen in under 500ms. Not generic AI — YOUR prep cards with YOUR metrics.', badge: '⚡ 500ms delivery' },
  { icon: Target, title: 'Sales-Specific Practice', body: 'AI interviewer asks the questions enterprise hiring managers actually ask — calibrated to your resume, your target role, and the specific round. Full coaching sidebar. Per-question scoring.', badge: '🎯 Role-calibrated questions' },
  { icon: Layout, title: 'Career Pipeline Management', body: "Every active opportunity gets stages, stakeholders, comp tracking, and a close plan. Your job search is a pipeline. The War Room treats it like one.", badge: '📊 MEDDPICC tracking' },
]

const tiers = [
  { name: 'Keyword Triggers', speed: '< 100ms', desc: 'Your custom coaching prompts fire instantly from keyword detection. No cloud. No delay.' },
  { name: 'Card Matching', speed: '< 500ms', desc: 'Semantic search against your pre-built answer cards. Three ways of asking the same question — your card surfaces with exact metrics.' },
  { name: 'AI Generation', speed: '1-3s', desc: "For questions your cards don't cover, AI generates a contextual answer using your resume and deal context." },
]

const faqs = [
  { q: "Isn't this just cheating?", a: "It organizes YOUR stories, YOUR metrics, YOUR frameworks and makes them accessible in real time. Same as having notes during a call — which every sales professional does. The practice mode is straight coaching. No one calls mock interviews cheating." },
  { q: "I interview fine without tools.", a: '"Fine" isn\'t the bar at $250K+ OTE. The bar is being the most specific, most metrics-sharp candidate in a pool of 30 other strong sellers. The one who says "$3.2M in pipeline, 23% conversion, 47-day cycle" beats the one who says "I built strong pipeline."' },
  { q: "Won't it be obvious I'm using something?", a: "Runs as a floating overlay on your desktop — same as having Salesforce or notes open during a customer call. No screen injection. No bot joining the meeting. Same as a second monitor with better notes." },
  { q: "$99/month is a lot during a job search.", a: "Run the math you'd run on any deal. $99 is 0.47% of one month's earnings at a $250K OTE. One stronger interview can be the difference between an offer and a rejection. This isn't a subscription cost — it's a rounding error against the career outcome." },
]

const stats = [
  { value: 2, suffix: 'x', label: "President's Club" },
  { value: 124, suffix: '%', label: 'Avg. Quota Attainment' },
  { value: 1.5, suffix: 'M', prefix: '$', label: 'Annual Targets' },
]

const BG = '#0A0A0F'
const SURFACE = '#12121A'
const GREEN = '#00FF88'
const BLUE = '#3B82F6'
const BORDER = 'rgba(255,255,255,0.06)'
const MUTED = '#94A3B8'
const WHITE = '#F8FAFC'

export default function StartPage() {
  const [modal, setModal] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const [role, setRole] = useState('')
  const [stage, setStage] = useState('')

  const openModal = () => setModal(true)

  return (
    <div style={{ background: BG, color: WHITE, fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif", minHeight: '100vh' }}>

      {/* ══ TOP BAR ══ */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: `${BG}ee`, backdropFilter: 'blur(20px)', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: GREEN, boxShadow: `0 0 8px ${GREEN}` }} />
            <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Interview Coach</span>
          </div>
          <button onClick={openModal} style={{ background: GREEN, color: BG, border: 'none', padding: '8px 20px', borderRadius: 4, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            Start Free Trial
          </button>
        </div>
      </div>

      {/* ══ HERO ══ */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 20%, rgba(0,255,136,0.03) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(59,130,246,0.02) 0%, transparent 60%)' }} />
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{ fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 24 }}>
            You&apos;d Never Walk Into a QBR Unprepared.<br />
            <span style={{ color: GREEN }}>Stop Interviewing That Way.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            style={{ fontSize: 'clamp(16px, 3vw, 19px)', lineHeight: 1.7, color: MUTED, maxWidth: 620, margin: '0 auto 40px' }}>
            Real-time AI coaching that surfaces your stories, your metrics, and your frameworks in under 500ms. Built by a 2x President&apos;s Club enterprise AE. Not for job seekers. For sales professionals.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <button onClick={openModal} style={{ background: GREEN, color: BG, border: 'none', padding: '16px 40px', borderRadius: 6, fontSize: 16, fontWeight: 700, cursor: 'pointer', boxShadow: `0 0 30px ${GREEN}33`, transition: 'all 0.2s' }}>
              Start Free Practice Interview <ArrowRight size={18} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 6 }} />
            </button>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            style={{ marginTop: 24, display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap', fontSize: 13, color: MUTED }}>
            {['Sub-500ms coaching delivery', 'Sales-specific question bank', 'No credit card required'].map(t => (
              <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Check size={14} style={{ color: GREEN }} />{t}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ COACHING CARD DEMO ══ */}
      <Reveal className="px-6 pb-20">
        <div style={{ maxWidth: 480, margin: '0 auto', background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4, overflow: 'hidden', boxShadow: `0 0 40px ${GREEN}08` }}>
          <div style={{ padding: '10px 16px', borderBottom: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: GREEN }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: GREEN }}>Live Coaching</span>
          </div>
          <div style={{ padding: 20 }}>
            <p style={{ fontSize: 13, color: MUTED, marginBottom: 12 }}>Q: &ldquo;Walk me through your biggest deal this quarter&rdquo;</p>
            <div style={{ borderLeft: `2px solid ${GREEN}`, paddingLeft: 14 }}>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: MUTED, marginBottom: 6 }}>Your Card: Enterprise Fleet Deal</p>
              <p style={{ fontSize: 13, color: WHITE, lineHeight: 1.6, marginBottom: 8 }}>Champion: VP of Operations<br />ACV: $1.2M | Close: 94 days<br />Competitive displacement<br />Attainment impact: 124% to plan</p>
            </div>
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Zap size={14} style={{ color: GREEN }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: GREEN }}>Delivered in 340ms</span>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ══ PROBLEM ══ */}
      <section style={{ padding: '80px 24px', maxWidth: 720, margin: '0 auto' }}>
        <Reveal>
          <h2 style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: 32 }}>
            Every Interview Tool Was Built for Engineers. <span style={{ color: GREEN }}>You&apos;re Not an Engineer.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ fontSize: 16, lineHeight: 1.8, color: MUTED, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <p>You run MEDDPICC on eight-figure pipelines. You&apos;ve multi-threaded above your Champion into the C-suite. But when a VP of Sales asks you to walk through your biggest deal, you&apos;re working from a Google Doc you updated at midnight.</p>
            <p>Every interview prep tool on the market optimizes for LeetCode and system design. They&apos;ve never heard of a Champion letter. They don&apos;t know why a 3-second pause while recalling your territory growth number kills your credibility in a hiring manager round.</p>
            <p style={{ color: WHITE, fontWeight: 500 }}>The market didn&apos;t build a tool for you. So one of us did.</p>
          </div>
        </Reveal>

        {/* Comparison table */}
        <Reveal delay={0.2}>
          <div style={{ marginTop: 48, background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: `1px solid ${BORDER}`, padding: '12px 16px' }}>
              <span style={{ fontSize: 11, color: MUTED, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}></span>
              <span style={{ fontSize: 11, color: MUTED, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Generic Tools</span>
              <span style={{ fontSize: 11, color: GREEN, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Interview Coach</span>
            </div>
            {comparison.map(([label, gen, ic], i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: i < comparison.length - 1 ? `1px solid ${BORDER}` : 'none', padding: '14px 16px' }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: WHITE }}>{label}</span>
                <span style={{ fontSize: 13, color: `${MUTED}88` }}>{gen}</span>
                <span style={{ fontSize: 13, color: WHITE }}>{ic}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ══ THREE FEATURES ══ */}
      <section style={{ padding: '80px 24px', maxWidth: 960, margin: '0 auto' }}>
        <Reveal>
          <h2 style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: 48, textAlign: 'center' }}>
            Three Products. One Platform. <span style={{ color: GREEN }}>Built for How You Actually Interview.</span>
          </h2>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {features.map((f, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4, padding: 24, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <f.icon size={24} style={{ color: GREEN, marginBottom: 16 }} />
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{f.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: MUTED, flex: 1 }}>{f.body}</p>
                <span style={{ marginTop: 16, fontSize: 12, fontWeight: 600, color: GREEN, background: `${GREEN}15`, padding: '4px 10px', borderRadius: 4, alignSelf: 'flex-start' }}>{f.badge}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ THREE-TIER ENGINE ══ */}
      <section style={{ padding: '80px 24px', maxWidth: 720, margin: '0 auto' }}>
        <Reveal>
          <h2 style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: 48, textAlign: 'center' }}>
            Your Best Answer. <span style={{ color: GREEN }}>Before You Finish Hearing the Question.</span>
          </h2>
        </Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {tiers.map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4, padding: 24, display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 800, color: GREEN, whiteSpace: 'nowrap', minWidth: 90 }}>{t.speed}</span>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{t.name}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: MUTED }}>{t.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ FOUNDER CREDIBILITY ══ */}
      <section style={{ padding: '80px 24px', maxWidth: 720, margin: '0 auto' }}>
        <Reveal>
          <h2 style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: 32, textAlign: 'center' }}>
            Built by an AE. Used on Real Interviews. <span style={{ color: GREEN }}>Now It&apos;s Yours.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
            {stats.map((s, i) => (
              <div key={i} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4, padding: 20, textAlign: 'center' }}>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 28, fontWeight: 800, color: GREEN }}>
                  <Counter end={s.value} prefix={s.prefix || ''} suffix={s.suffix} />
                </p>
                <p style={{ fontSize: 11, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 6 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div style={{ borderLeft: `2px solid ${GREEN}33`, paddingLeft: 20 }}>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: MUTED, fontStyle: 'italic' }}>
              &ldquo;I built Interview Coach during my own job search because nothing existed for quota carriers. I used it on real interviews — phone screens through executive rounds. I landed my current role with it. Every feature exists because I needed it mid-process.&rdquo;
            </p>
          </div>
        </Reveal>
      </section>

      {/* ══ PRICING ══ */}
      <section style={{ padding: '80px 24px', maxWidth: 800, margin: '0 auto' }}>
        <Reveal>
          <h2 style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: 12, textAlign: 'center' }}>
            $99/Month. <span style={{ color: GREEN }}>That&apos;s 0.04% of Your Next OTE.</span>
          </h2>
          <p style={{ fontSize: 15, color: MUTED, textAlign: 'center', marginBottom: 48, maxWidth: 560, margin: '0 auto 48px' }}>
            A $250K OTE role pays $20,833/month. One sharper interview is the difference between &ldquo;moving forward with another candidate&rdquo; and an offer letter.
          </p>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {[
            { name: 'Pro', price: '$49', features: ['Unlimited live coaching', '10 practice sessions/month', '5 active positions', 'Prep Card system'], highlight: false },
            { name: 'Premium', price: '$99', features: ['Everything in Pro', 'Unlimited practice sessions', 'Unlimited positions', 'Calendar integration', 'Meeting bot auto-join', 'Priority AI processing'], highlight: true },
          ].map((plan, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{
                background: SURFACE, borderRadius: 4, padding: 28, position: 'relative',
                border: plan.highlight ? `1px solid ${GREEN}44` : `1px solid ${BORDER}`,
                boxShadow: plan.highlight ? `0 0 30px ${GREEN}11` : 'none',
              }}>
                {plan.highlight && <span style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', background: GREEN, color: BG, padding: '3px 12px', borderRadius: 4 }}>Most Popular</span>}
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{plan.name}</h3>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 36, fontWeight: 800, color: plan.highlight ? GREEN : WHITE, marginBottom: 20 }}>{plan.price}<span style={{ fontSize: 14, color: MUTED }}>/mo</span></p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: MUTED }}>
                      <Check size={14} style={{ color: GREEN, flexShrink: 0 }} />{f}
                    </li>
                  ))}
                </ul>
                <button onClick={openModal} style={{
                  width: '100%', padding: '12px 0', borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: 'pointer', border: 'none',
                  background: plan.highlight ? GREEN : 'transparent', color: plan.highlight ? BG : GREEN,
                  border: plan.highlight ? 'none' : `1px solid ${GREEN}44`,
                }}>Start Free Trial</button>
              </div>
            </Reveal>
          ))}
        </div>
        <p style={{ textAlign: 'center', fontSize: 13, color: MUTED, marginTop: 16 }}>No credit card required for trial. Cancel anytime.</p>
      </section>

      {/* ══ FAQ ══ */}
      <section style={{ padding: '80px 24px', maxWidth: 680, margin: '0 auto' }}>
        <Reveal>
          <h2 style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: 32, textAlign: 'center' }}>
            Yeah, We&apos;ve Heard That One Before.
          </h2>
        </Reveal>
        {faqs.map((faq, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div style={{ borderBottom: `1px solid ${BORDER}` }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', color: WHITE, padding: '20px 0', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: 15, fontWeight: 600 }}>{faq.q}</span>
                <ChevronRight size={18} style={{ color: MUTED, flexShrink: 0, transition: 'transform 0.3s', transform: openFaq === i ? 'rotate(90deg)' : 'rotate(0)' }} />
              </button>
              <div style={{ maxHeight: openFaq === i ? 300 : 0, overflow: 'hidden', transition: 'max-height 0.3s ease-out' }}>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: MUTED, paddingBottom: 20 }}>{faq.a}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* ══ FINAL CTA ══ */}
      <section style={{ padding: '100px 24px', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 50%, ${GREEN}06 0%, transparent 60%)` }} />
        <Reveal>
          <h2 style={{ fontSize: 'clamp(28px, 6vw, 48px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 16, position: 'relative' }}>
            Your Next Role Is a Six-Figure Deal.<br /><span style={{ color: GREEN }}>Close It Like One.</span>
          </h2>
          <p style={{ fontSize: 17, color: MUTED, marginBottom: 40, maxWidth: 500, margin: '0 auto 40px' }}>Your playbook. Running in real time. Built by a closer, for closers.</p>
          <button onClick={openModal} style={{ background: GREEN, color: BG, border: 'none', padding: '16px 40px', borderRadius: 6, fontSize: 16, fontWeight: 700, cursor: 'pointer', boxShadow: `0 0 30px ${GREEN}33` }}>
            Start Your Free Practice Interview <ArrowRight size={18} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 6 }} />
          </button>
          <p style={{ marginTop: 16, fontSize: 13, color: MUTED }}>Free trial · No credit card · Built for quota carriers</p>
        </Reveal>
      </section>

      {/* ══ SIGNUP MODAL ══ */}
      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', padding: 24 }}
            onClick={(e) => { if (e.target === e.currentTarget) setModal(false) }}>
            <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
              style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 6, padding: 32, maxWidth: 440, width: '100%', position: 'relative' }}>
              <button onClick={() => setModal(false)} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: MUTED, cursor: 'pointer' }}><X size={20} /></button>
              <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Get Your Playbook Running</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <input type="email" placeholder="Work email" style={{
                  background: BG, border: `1px solid ${BORDER}`, borderRadius: 4, padding: '12px 16px',
                  fontSize: 14, color: WHITE, outline: 'none', width: '100%',
                }} />

                <select value={role} onChange={e => setRole(e.target.value)} style={{
                  background: BG, border: `1px solid ${BORDER}`, borderRadius: 4, padding: '12px 16px',
                  fontSize: 14, color: role ? WHITE : MUTED, outline: 'none', width: '100%', appearance: 'none',
                }}>
                  <option value="" disabled>Current Role</option>
                  <option>SDR / BDR</option>
                  <option>Mid-Market AE</option>
                  <option>Enterprise AE</option>
                  <option>SE / CSM / AM</option>
                  <option>Sales Manager / Director</option>
                  <option>VP+</option>
                </select>

                <div>
                  <p style={{ fontSize: 13, color: MUTED, marginBottom: 8 }}>Where are you?</p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {['Actively Interviewing', 'Starting to Look', 'Just Exploring'].map(s => (
                      <button key={s} onClick={() => setStage(s)} style={{
                        background: stage === s ? `${GREEN}20` : BG, border: `1px solid ${stage === s ? GREEN + '55' : BORDER}`,
                        borderRadius: 4, padding: '8px 14px', fontSize: 13, cursor: 'pointer',
                        color: stage === s ? GREEN : MUTED, fontWeight: stage === s ? 600 : 400,
                      }}>{s}</button>
                    ))}
                  </div>
                </div>

                <button style={{
                  background: GREEN, color: BG, border: 'none', padding: '14px 0', borderRadius: 4,
                  fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%', marginTop: 8,
                }}>
                  Start Free Practice Interview <ArrowRight size={16} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 6 }} />
                </button>
                <p style={{ fontSize: 12, color: MUTED, textAlign: 'center' }}>No credit card required. Your first practice session is free.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${BORDER}`, padding: '24px', textAlign: 'center' }}>
        <p style={{ fontSize: 12, color: MUTED }}>Interview Coach — Real-Time Sales Interview Performance</p>
      </div>
    </div>
  )
}
