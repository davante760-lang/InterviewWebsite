import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check, ExternalLink } from 'lucide-react'
import LandingNav from './components/landing/LandingNav'

const stages = ['Actively Interviewing', 'Starting to Look', 'Just Exploring']
const stageValues = ['actively_interviewing', 'starting_to_look', 'just_exploring']
const roles = ['SDR / BDR', 'Mid-Market AE', 'Enterprise AE', 'SE / CSM / AM', 'Sales Manager / Director', 'VP+']
const roleValues = ['sdr_bdr', 'mid_market_ae', 'enterprise_ae', 'se_csm_am', 'sales_manager_director', 'vp_plus']

const roleTeasers = {
  sdr_bdr: "You're transitioning from setting meetings to running full-cycle deals. Walk me through a qualified opportunity you sourced and tell me what happened after you handed it off.",
  mid_market_ae: "You're interviewing for an enterprise role with $1.5M targets. Your current ACV is $85K. How do you convince me you can sell a $300K deal?",
  enterprise_ae: "Walk me through how you displaced an incumbent vendor in an account that had been with them for four years.",
  se_csm_am: "You're moving into a closing role. Tell me about a time you identified expansion revenue in an existing account and drove it to close.",
  sales_manager_director: "You're inheriting a team of 8 reps. Three are below 60% attainment. Walk me through your first 90 days.",
  vp_plus: "The board wants to see a path to $50M ARR in 18 months. You have 12 reps today. Walk me through your hiring plan, territory design, and ramp assumptions.",
}

function detectPlatform() {
  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes('macintosh') || ua.includes('mac os')) {
    return { os: 'macos', buttonText: 'Download for macOS' }
  }
  if (ua.includes('windows')) {
    return { os: 'windows', buttonText: 'Download for Windows' }
  }
  return { os: 'unknown', buttonText: null }
}

export default function StartPage() {
  const [email, setEmail] = useState('')
  const [roleIdx, setRoleIdx] = useState(-1)
  const [stageIdx, setStageIdx] = useState(-1)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null) // null | 'email_exists' | 'server_error' | 'invalid_email'
  const [signupData, setSignupData] = useState(null) // response from /api/auth/signup
  const [resending, setResending] = useState(false)
  const [resent, setResent] = useState(false)

  const validEmail = email.includes('@') && email.includes('.')
  const ready = validEmail && roleIdx >= 0 && stageIdx >= 0 && !submitting

  // Auto-download disabled until download.interviewcoach.ai is live
  // useEffect(() => {
  //   if (signupData?.download_url) {
  //     const link = document.createElement('a')
  //     link.href = signupData.download_url
  //     link.download = ''
  //     document.body.appendChild(link)
  //     link.click()
  //     document.body.removeChild(link)
  //   }
  // }, [signupData])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!ready) return
    setError(null)
    setSubmitting(true)

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), role: roleValues[roleIdx], stage: stageValues[stageIdx] }),
      })
      const data = await res.json()

      if (data.success) {
        setSignupData({ ...data, roleKey: roleValues[roleIdx] })
      } else if (data.error === 'email_exists') {
        setError('email_exists')
      } else {
        setError('server_error')
      }
    } catch {
      setError('server_error')
    } finally {
      setSubmitting(false)
    }
  }

  const handleResend = async () => {
    setResending(true)
    try {
      await fetch('/api/auth/send-magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      setResent(true)
    } catch {} finally {
      setResending(false)
    }
  }

  const platform = detectPlatform()

  return (
    <div style={{ background: '#0B0D12', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <LandingNav />

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 20px 60px' }}>
        <AnimatePresence mode="wait">

          {/* ══ SUCCESS: Post-signup onboarding card ══ */}
          {signupData && (
            <motion.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
              style={{ width: '100%', maxWidth: 480, background: 'rgba(16,22,34,0.72)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '32px 28px' }}>

              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#EDF2F7', marginBottom: 6 }}>You&apos;re in.</h2>
              <p style={{ fontSize: 13, color: '#8B9BB4', marginBottom: 24, lineHeight: 1.6 }}>
                Your first practice runs in the browser. 4 minutes. No install.
              </p>

              {/* Primary CTA: Start practicing in browser */}
              <a href={signupData.practice_url || '#'}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: '14px 0', borderRadius: 10, background: 'linear-gradient(135deg, rgba(0,224,204,0.2), rgba(0,224,204,0.1))', border: '1px solid rgba(0,224,204,0.4)', color: '#00E0CC', fontSize: 15, fontWeight: 700, textDecoration: 'none', marginBottom: 20 }}>
                <ExternalLink size={16} /> Start Your First Practice
              </a>

              {/* Role teaser */}
              {signupData.roleKey && roleTeasers[signupData.roleKey] && (
                <div style={{ marginBottom: 20 }}>
                  <p style={{ fontSize: 11, color: '#5A6A82', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, marginBottom: 8 }}>Your first practice question:</p>
                  <div style={{ background: 'rgba(13,17,23,0.75)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, padding: '12px 14px' }}>
                    <p style={{ fontSize: 14, color: '#CBD5E1', lineHeight: 1.6, fontStyle: 'italic' }}>&ldquo;{roleTeasers[signupData.roleKey]}&rdquo;</p>
                  </div>
                </div>
              )}

              <p style={{ fontSize: 11, color: '#5A6A82', textAlign: 'center' }}>
                We also sent setup instructions to <span style={{ color: '#8B9BB4' }}>{email}</span>.
              </p>
            </motion.div>
          )}

          {/* ══ EMAIL EXISTS: Already have an account ══ */}
          {!signupData && error === 'email_exists' && (
            <motion.div key="exists" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
              style={{ width: '100%', maxWidth: 460, background: 'rgba(16,22,34,0.72)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '36px 32px', textAlign: 'center' }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#EDF2F7', marginBottom: 8 }}>Looks like you already have an account.</h2>
              <p style={{ fontSize: 14, color: '#5A6A82', marginBottom: 24 }}>We&apos;ll send a link to <span style={{ color: '#8B9BB4' }}>{email}</span> to sign you into the app.</p>

              <button onClick={handleResend} disabled={resending || resent}
                style={{ width: '100%', padding: '13px 0', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', color: resent ? '#00E0CC' : '#8B9BB4', fontSize: 14, fontWeight: 500, cursor: resending ? 'default' : 'pointer', marginBottom: 16 }}>
                {resent ? 'Login link sent!' : resending ? 'Sending...' : 'Resend login link'}
              </button>

              <button onClick={() => { setError(null); setResent(false) }}
                style={{ background: 'none', border: 'none', color: '#5A6A82', fontSize: 13, cursor: 'pointer' }}>
                ← Try a different email
              </button>
            </motion.div>
          )}

          {/* ══ FORM: Signup capture ══ */}
          {!signupData && error !== 'email_exists' && (
            <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
              style={{ width: '100%', maxWidth: 460, background: 'rgba(16,22,34,0.72)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '36px 32px' }}>

              <form onSubmit={handleSubmit}>
                <h1 style={{ fontSize: 24, fontWeight: 700, color: '#EDF2F7', marginBottom: 8, letterSpacing: '-0.02em' }}>Get Your Playbook Running</h1>
                <p style={{ fontSize: 14, color: '#5A6A82', marginBottom: 28 }}>Free practice interview. No credit card. Built for quota carriers.</p>

                {error === 'server_error' && (
                  <div style={{ background: 'rgba(239,107,107,0.08)', border: '1px solid rgba(239,107,107,0.2)', borderRadius: 8, padding: '10px 14px', marginBottom: 14 }}>
                    <p style={{ fontSize: 13, color: '#ef6b6b' }}>Something went wrong. Try again.</p>
                  </div>
                )}

                <div style={{ marginBottom: 14 }}>
                  <input type="email" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)}
                    style={{ width: '100%', padding: '13px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(8,11,18,0.65)', color: '#EDF2F7', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                    onFocus={e => e.target.style.borderColor = 'rgba(0,224,204,0.4)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.07)'} />
                </div>

                <div style={{ marginBottom: 14 }}>
                  <select value={roleIdx >= 0 ? roleIdx : ''} onChange={e => setRoleIdx(Number(e.target.value))}
                    style={{ width: '100%', padding: '13px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(8,11,18,0.65)', color: roleIdx >= 0 ? '#EDF2F7' : '#5A6A82', fontSize: 14, outline: 'none', boxSizing: 'border-box', appearance: 'none', cursor: 'pointer' }}>
                    <option value="" disabled>Current Role</option>
                    {roles.map((r, i) => <option key={r} value={i}>{r}</option>)}
                  </select>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <p style={{ fontSize: 13, color: '#5A6A82', marginBottom: 10 }}>Where are you in your search?</p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {stages.map((s, i) => (
                      <button key={s} type="button" onClick={() => setStageIdx(i)}
                        style={{ flex: 1, padding: '10px 8px', borderRadius: 8, fontSize: 12, fontWeight: 500, cursor: 'pointer', border: `1px solid ${stageIdx === i ? 'rgba(0,224,204,0.35)' : 'rgba(255,255,255,0.07)'}`, background: stageIdx === i ? 'rgba(0,224,204,0.1)' : 'rgba(8,11,18,0.65)', color: stageIdx === i ? '#00E0CC' : '#5A6A82', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <button type="submit" disabled={!ready}
                  style={{ width: '100%', padding: '16px 0', borderRadius: 10, background: ready ? 'rgba(0,224,204,0.12)' : 'rgba(0,224,204,0.04)', border: `1px solid ${ready ? 'rgba(0,224,204,0.3)' : 'rgba(0,224,204,0.08)'}`, color: ready ? '#00E0CC' : 'rgba(0,224,204,0.25)', fontSize: 14, fontWeight: 600, cursor: ready ? 'pointer' : 'default', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  {submitting ? 'Setting up your session...' : <>Start Free Practice Interview <ArrowRight size={16} /></>}
                </button>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginTop: 14, fontSize: 11, color: '#5A6A82' }}>
                  <span>✓ Free desktop app</span>
                  <span>✓ 2-minute setup</span>
                  <span>✓ No credit card required</span>
                </div>
              </form>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <div style={{ padding: '16px 24px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <p style={{ fontSize: 11, color: '#5A6A82' }}>Interview Coach · Built by a 2x President&apos;s Club AE</p>
      </div>

      <style>{`
        ::placeholder { color: #5A6A82; }
        select option { background: #12121A; color: #EDF2F7; }
      `}</style>
    </div>
  )
}
