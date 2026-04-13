import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'

const BG = '#0A0A0F'
const SURFACE = '#12121A'
const GREEN = '#00FF88'
const MUTED = '#94A3B8'
const WHITE = '#F8FAFC'
const INPUT_BG = '#1A1A2E'
const BORDER = 'rgba(255,255,255,0.08)'

const stages = ['Actively Interviewing', 'Starting to Look', 'Just Exploring']
const roles = ['SDR / BDR', 'Mid-Market AE', 'Enterprise AE', 'SE / CSM / AM', 'Sales Manager / Director', 'VP+']

export default function StartPage() {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [stage, setStage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const validEmail = email.includes('@') && email.includes('.')
  const ready = validEmail && role && stage && !submitting

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!ready) return
    setSubmitting(true)
    setTimeout(() => { setSubmitting(false); setDone(true) }, 1500)
  }

  return (
    <div style={{ background: BG, minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif" }}>

      {/* Logo */}
      <div style={{ padding: '20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: GREEN, boxShadow: `0 0 6px ${GREEN}` }} />
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: WHITE }}>Interview Coach</span>
        </div>
      </div>

      {/* Centered card */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 20px 60px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{ width: '100%', maxWidth: 440, background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4, padding: 32 }}
        >
          {done ? (
            /* ── Success state ── */
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: `${GREEN}20`, border: `2px solid ${GREEN}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <Check size={24} style={{ color: GREEN }} />
              </div>
              <p style={{ fontSize: 18, fontWeight: 700, color: WHITE, marginBottom: 8 }}>You&apos;re in.</p>
              <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.6 }}>Check your email to start your first practice interview.</p>
            </div>
          ) : (
            /* ── Form ── */
            <form onSubmit={handleSubmit}>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: WHITE, marginBottom: 6 }}>Get Your Playbook Running</h1>
              <p style={{ fontSize: 13, color: MUTED, marginBottom: 28 }}>Free practice interview. No credit card. Built for quota carriers.</p>

              {/* Email */}
              <div style={{ marginBottom: 16 }}>
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    width: '100%', padding: '12px 14px', borderRadius: 4, border: `1px solid ${BORDER}`,
                    background: INPUT_BG, color: WHITE, fontSize: 14, outline: 'none', boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = `${GREEN}66`}
                  onBlur={e => e.target.style.borderColor = BORDER}
                />
              </div>

              {/* Role */}
              <div style={{ marginBottom: 16 }}>
                <select
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  style={{
                    width: '100%', padding: '12px 14px', borderRadius: 4, border: `1px solid ${BORDER}`,
                    background: INPUT_BG, color: role ? WHITE : MUTED, fontSize: 14, outline: 'none',
                    boxSizing: 'border-box', appearance: 'none', cursor: 'pointer',
                  }}
                >
                  <option value="" disabled>Current Role</option>
                  {roles.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              {/* Stage pills */}
              <div style={{ marginBottom: 24 }}>
                <p style={{ fontSize: 13, color: MUTED, marginBottom: 10 }}>Where are you in your search?</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  {stages.map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setStage(s)}
                      style={{
                        flex: 1, padding: '10px 8px', borderRadius: 4, fontSize: 12, fontWeight: 500,
                        cursor: 'pointer', border: `1px solid ${stage === s ? GREEN + '55' : BORDER}`,
                        background: stage === s ? `${GREEN}12` : INPUT_BG,
                        color: stage === s ? GREEN : MUTED, transition: 'all 0.2s',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!ready}
                style={{
                  width: '100%', padding: '14px 0', borderRadius: 4, border: 'none',
                  background: ready ? GREEN : `${GREEN}44`, color: BG,
                  fontSize: 15, fontWeight: 700, cursor: ready ? 'pointer' : 'default',
                  transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  boxShadow: ready ? `0 0 20px ${GREEN}22` : 'none',
                  animation: submitting ? 'pulse 1s ease-in-out infinite' : 'none',
                }}
              >
                {submitting ? 'Setting up your session...' : <>Start Free Practice Interview <ArrowRight size={16} /></>}
              </button>

              <p style={{ fontSize: 11, color: `${MUTED}88`, textAlign: 'center', marginTop: 12 }}>
                Your first practice session starts immediately after signup.
              </p>
            </form>
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <div style={{ padding: '16px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: 11, color: `${MUTED}66` }}>Interview Coach · Built by a 2x President&apos;s Club AE</p>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        ::placeholder { color: ${MUTED}88; }
        select option { background: ${SURFACE}; color: ${WHITE}; }
      `}</style>
    </div>
  )
}
