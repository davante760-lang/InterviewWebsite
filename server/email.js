import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@interviewcoach.ai'
const appUrl = process.env.APP_URL || 'http://localhost:4173'

export async function sendWelcomeEmail(email, bridgeToken, downloadUrl) {
  const IC_SERVER = process.env.IC_SERVER_URL || 'https://interview-coach-production-9c63.up.railway.app'
  const practiceUrl = `${IC_SERVER}/auth/bridge?token=${bridgeToken}&client=browser`
  const deepLink = `interviewcoach://activate?token=${bridgeToken}`

  if (!resend) {
    console.log(`[email] Resend not configured. Would send welcome email to ${email}`)
    console.log(`[email] Deep link: ${deepLink}`)
    console.log(`[email] Practice URL: ${practiceUrl}`)
    console.log(`[email] Download: ${downloadUrl}`)
    return
  }

  try {
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: 'Your first practice interview is ready',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; color: #EDF2F7; background: #0B0D12; padding: 40px 24px; max-width: 480px; margin: 0 auto;">
          <p style="font-size: 16px; line-height: 1.7; color: #CBD5E1; margin-bottom: 24px;">
            Your Interview Coach account is ready. Here's how to get started:
          </p>

          <p style="font-size: 14px; color: #8B9BB4; margin-bottom: 8px;">Step 1 — Download the companion app (10 seconds):</p>
          <a href="${downloadUrl}" style="display: inline-block; padding: 12px 24px; background: rgba(0,224,204,0.08); border: 1px solid rgba(0,224,204,0.2); border-radius: 8px; color: #00E0CC; text-decoration: none; font-weight: 500; font-size: 14px; margin-bottom: 24px;">
            Download Interview Coach
          </a>

          <p style="font-size: 14px; color: #8B9BB4; margin: 24px 0 8px;">Step 2 — Start your first practice:</p>
          <a href="${practiceUrl}" style="display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, rgba(0,224,204,0.2), rgba(0,224,204,0.1)); border: 1px solid rgba(0,224,204,0.4); border-radius: 10px; color: #00E0CC; text-decoration: none; font-weight: 700; font-size: 15px; margin-bottom: 12px;">
            Start Your First Practice →
          </a>

          <p style="font-size: 12px; color: #5A6A82; margin-bottom: 24px;">
            The companion app runs silently in your menu bar and captures audio during practice.
          </p>

          <p style="font-size: 12px; color: #5A6A82; margin-top: 32px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 16px;">
            — Interview Coach
          </p>
        </div>
      `,
    })
    console.log(`[email] Welcome email sent to ${email}`)
  } catch (err) {
    console.error(`[email] Failed to send to ${email}:`, err.message)
  }
}
