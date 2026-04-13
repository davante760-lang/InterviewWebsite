import { Router } from 'express'
import crypto from 'crypto'
import { query } from '../db.js'
import { sendWelcomeEmail } from '../email.js'

const router = Router()

function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex')
}

function generateToken() {
  return crypto.randomBytes(32).toString('hex')
}

function detectPlatform(userAgent) {
  const ua = (userAgent || '').toLowerCase()
  if (ua.includes('macintosh') || ua.includes('mac os')) {
    return {
      os: 'macos',
      downloadUrl: 'https://download.interviewcoach.ai/InterviewCoach-latest.dmg',
      buttonText: 'Download for macOS',
    }
  }
  if (ua.includes('windows')) {
    return {
      os: 'windows',
      downloadUrl: 'https://download.interviewcoach.ai/InterviewCoach-latest.exe',
      buttonText: 'Download for Windows',
    }
  }
  return { os: 'unknown', downloadUrl: null, buttonText: null }
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const VALID_ROLES = ['sdr_bdr', 'mid_market_ae', 'enterprise_ae', 'se_csm_am', 'sales_manager_director', 'vp_plus']
const VALID_STAGES = ['actively_interviewing', 'starting_to_look', 'just_exploring']

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { email, role, stage } = req.body

    if (!email || !validateEmail(email)) {
      return res.status(400).json({ success: false, error: 'invalid_email', message: 'Enter a valid email address.' })
    }
    if (!role) {
      return res.status(400).json({ success: false, error: 'missing_role', message: 'Select your current role.' })
    }
    if (!stage) {
      return res.status(400).json({ success: false, error: 'missing_stage', message: 'Select your interview stage.' })
    }

    // Check for existing user
    const existing = await query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()])
    if (existing.rows.length > 0) {
      return res.status(409).json({ success: false, error: 'email_exists', message: 'Account already exists for this email.' })
    }

    // Create user
    const userResult = await query(
      'INSERT INTO users (email, role, stage) VALUES ($1, $2, $3) RETURNING id',
      [email.toLowerCase(), role, stage]
    )
    const userId = userResult.rows[0].id

    // Generate magic token
    const rawToken = generateToken()
    const tokenHash = hashToken(rawToken)
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    await query(
      'INSERT INTO magic_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, $3)',
      [userId, tokenHash, expiresAt]
    )

    // Detect platform
    const platform = detectPlatform(req.headers['user-agent'])

    // Send welcome email async (don't block response)
    sendWelcomeEmail(email, rawToken, platform.downloadUrl || 'https://download.interviewcoach.ai').catch(() => {})

    res.json({
      success: true,
      user_id: userId,
      magic_token: rawToken,
      download_url: platform.downloadUrl,
      download_button_text: platform.buttonText,
      platform: platform.os,
      deep_link: `interviewcoach://activate?token=${rawToken}`,
    })
  } catch (err) {
    console.error('[signup] Error:', err.message, err.stack)
    res.status(500).json({ success: false, error: 'server_error', message: 'Something went wrong. Try again.', debug: err.message })
  }
})

// POST /api/auth/validate-token
router.post('/validate-token', async (req, res) => {
  try {
    const { token } = req.body
    if (!token) {
      return res.status(400).json({ success: false, error: 'missing_token' })
    }

    const tokenHash = hashToken(token)

    // Find valid token
    const result = await query(
      `SELECT mt.id as token_id, mt.user_id, u.email, u.role, u.stage
       FROM magic_tokens mt
       JOIN users u ON mt.user_id = u.id
       WHERE mt.token_hash = $1 AND mt.used_at IS NULL AND mt.expires_at > now()`,
      [tokenHash]
    )

    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, error: 'token_invalid', message: 'This link has expired. Request a new login link from the app.' })
    }

    const { token_id, user_id, email, role, stage } = result.rows[0]

    // Mark token as used
    await query('UPDATE magic_tokens SET used_at = now() WHERE id = $1', [token_id])

    // Activate user
    await query("UPDATE users SET account_status = 'active', activated_at = now() WHERE id = $1", [user_id])

    // Create session
    const sessionToken = generateToken()
    const sessionHash = hashToken(sessionToken)
    const sessionExpires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days

    await query(
      'INSERT INTO sessions (user_id, session_token, expires_at) VALUES ($1, $2, $3)',
      [user_id, sessionHash, sessionExpires]
    )

    res.json({
      success: true,
      user_id,
      email,
      role,
      stage,
      session_token: sessionToken,
      session_expires_at: sessionExpires.toISOString(),
    })
  } catch (err) {
    console.error('[validate-token] Error:', err.message, err.stack)
    res.status(500).json({ success: false, error: 'server_error', debug: err.message })
  }
})

// POST /api/auth/send-magic-link
router.post('/send-magic-link', async (req, res) => {
  try {
    const { email } = req.body
    if (!email) {
      return res.status(400).json({ success: false, error: 'missing_email' })
    }

    // Always return success to prevent email enumeration
    const userResult = await query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()])
    if (userResult.rows.length === 0) {
      return res.json({ success: true })
    }

    const userId = userResult.rows[0].id

    // Invalidate existing unused tokens
    await query('UPDATE magic_tokens SET used_at = now() WHERE user_id = $1 AND used_at IS NULL', [userId])

    // Generate new token
    const rawToken = generateToken()
    const tokenHash = hashToken(rawToken)
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)

    await query(
      'INSERT INTO magic_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, $3)',
      [userId, tokenHash, expiresAt]
    )

    // Send email
    sendWelcomeEmail(email, rawToken, 'https://download.interviewcoach.ai').catch(() => {})

    res.json({ success: true })
  } catch (err) {
    console.error('[send-magic-link] Error:', err.message)
    res.json({ success: true }) // Don't leak errors
  }
})

// GET /api/auth/me
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'unauthorized' })
    }

    const sessionToken = authHeader.slice(7)
    const sessionHash = hashToken(sessionToken)

    const result = await query(
      `SELECT u.id as user_id, u.email, u.role, u.stage, u.account_status
       FROM sessions s
       JOIN users u ON s.user_id = u.id
       WHERE s.session_token = $1 AND s.expires_at > now()`,
      [sessionHash]
    )

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'unauthorized' })
    }

    res.json(result.rows[0])
  } catch (err) {
    console.error('[me] Error:', err.message)
    res.status(500).json({ error: 'server_error' })
  }
})

// GET /api/auth/health — diagnostic endpoint (remove in production)
router.get('/health', async (req, res) => {
  try {
    const dbResult = await query('SELECT now() as time, current_database() as db')
    const usersResult = await query('SELECT count(*) as count FROM users')
    const tokensResult = await query('SELECT count(*) as count FROM magic_tokens WHERE used_at IS NULL AND expires_at > now()')
    res.json({
      status: 'ok',
      database: dbResult.rows[0],
      users: parseInt(usersResult.rows[0].count),
      active_tokens: parseInt(tokensResult.rows[0].count),
      has_database_url: !!process.env.DATABASE_URL,
    })
  } catch (err) {
    res.status(500).json({
      status: 'error',
      error: err.message,
      has_database_url: !!process.env.DATABASE_URL,
    })
  }
})

export default router
