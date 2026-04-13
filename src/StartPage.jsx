import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import LandingNav from './components/landing/LandingNav'

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
    <div style={{ background: '#0B0D12', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      <LandingNav />

      {/* Centered card */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 20px 60px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            width: '100%', maxWidth: 460,
            background: 'rgba(16,22,34,0.72)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '14px',
            padding: '36px 32px',
          }}
        >
          {done ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(0,224,204,0.12)', border: '2px solid #00E0CC', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <Check size={24} style={{ color: '#00E0CC' }} />
              </div>
              <p style={{ fontSize: 18, fontWeight: 700, color: '#EDF2F7', marginBottom: 8 }}>You&apos;re in.</p>
              <p style={{ fontSize: 14, color: '#8B9BB4', lineHeight: 1.6 }}>Check your email to start your first practice interview.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h1 style={{ fontSize: 24, fontWeight: 700, color: '#EDF2F7', marginBottom: 8, letterSpacing: '-0.02em' }}>Get Your Playbook Running</h1>
              <p style={{ fontSize: 14, color: '#5A6A82', marginBottom: 28 }}>Free practice interview. No credit card. Built for quota carriers.</p>

              {/* Email */}
              <div style={{ marginBottom: 14 }}>
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    width: '100%', padding: '13px 16px', borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(8,11,18,0.65)',
                    color: '#EDF2F7', fontSize: 14, outline: 'none', boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(0,224,204,0.4)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.07)'}
                />
              </div>

              {/* Role */}
              <div style={{ marginBottom: 14 }}>
                <select
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  style={{
                    width: '100%', padding: '13px 16px', borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(8,11,18,0.65)',
                    color: role ? '#EDF2F7' : '#5A6A82', fontSize: 14, outline: 'none',
                    boxSizing: 'border-box', appearance: 'none', cursor: 'pointer',
                  }}
                >
                  <option value="" disabled>Current Role</option>
                  {roles.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              {/* Stage pills */}
              <div style={{ marginBottom: 24 }}>
                <p style={{ fontSize: 13, color: '#5A6A82', marginBottom: 10 }}>Where are you in your search?</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  {stages.map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setStage(s)}
                      style={{
                        flex: 1, padding: '10px 8px', borderRadius: '8px', fontSize: 12, fontWeight: 500,
                        cursor: 'pointer',
                        border: `1px solid ${stage === s ? 'rgba(0,224,204,0.35)' : 'rgba(255,255,255,0.07)'}`,
                        background: stage === s ? 'rgba(0,224,204,0.1)' : 'rgba(8,11,18,0.65)',
                        color: stage === s ? '#00E0CC' : '#5A6A82',
                        transition: 'all 0.2s', whiteSpace: 'nowrap',
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
                  width: '100%', padding: '14px 0', borderRadius: '8px', border: 'none',
                  background: ready ? 'rgba(0,224,204,0.15)' : 'rgba(0,224,204,0.06)',
                  border: `1px solid ${ready ? 'rgba(0,224,204,0.35)' : 'rgba(0,224,204,0.1)'}`,
                  color: ready ? '#00E0CC' : 'rgba(0,224,204,0.3)',
                  fontSize: 15, fontWeight: 700, cursor: ready ? 'pointer' : 'default',
                  transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  animation: submitting ? 'pulse 1s ease-in-out infinite' : 'none',
                }}
              >
                {submitting ? 'Setting up your session...' : <>Start Free Practice Interview <ArrowRight size={16} /></>}
              </button>

              <p style={{ fontSize: 11, color: '#5A6A82', textAlign: 'center', marginTop: 12 }}>
                Your first practice session starts immediately after signup.
              </p>
            </form>
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <div style={{ padding: '16px 24px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <p style={{ fontSize: 11, color: '#5A6A82' }}>Interview Coach · Built by a 2x President&apos;s Club AE</p>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        ::placeholder { color: #5A6A82; }
        select option { background: #12121A; color: #EDF2F7; }
      `}</style>
    </div>
  )
}
