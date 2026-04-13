import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@interviewcoach.ai'
const appUrl = process.env.APP_URL || 'http://localhost:4173'

export async function sendWelcomeEmail(email, rawToken, downloadUrl) {
  if (!resend) {
    console.log(`[email] Resend not configured. Would send welcome email to ${email}`)
    console.log(`[email] Deep link: interviewcoach://activate?token=${rawToken}`)
    console.log(`[email] Download: ${downloadUrl}`)
    return
  }

  const deepLink = `interviewcoach://activate?token=${rawToken}`

  try {
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: 'Interview Coach — Download & Setup',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; color: #EDF2F7; background: #0B0D12; padding: 40px 24px; max-width: 480px; margin: 0 auto;">
          <p style="font-size: 16px; line-height: 1.7; color: #CBD5E1; margin-bottom: 24px;">
            Your Interview Coach account is ready.
          </p>

          <p style="font-size: 14px; color: #8B9BB4; margin-bottom: 8px;">1. Download the app:</p>
          <a href="${downloadUrl}" style="display: inline-block; padding: 12px 24px; background: rgba(0,224,204,0.12); border: 1px solid rgba(0,224,204,0.3); border-radius: 8px; color: #00E0CC; text-decoration: none; font-weight: 600; font-size: 14px; margin-bottom: 24px;">
            Download Interview Coach
          </a>

          <p style="font-size: 14px; color: #8B9BB4; margin: 24px 0 8px;">2. Once installed, click here to sign in:</p>
          <a href="${deepLink}" style="display: inline-block; padding: 12px 24px; background: rgba(0,224,204,0.12); border: 1px solid rgba(0,224,204,0.3); border-radius: 8px; color: #00E0CC; text-decoration: none; font-weight: 600; font-size: 14px; margin-bottom: 24px;">
            Open Interview Coach
          </a>

          <p style="font-size: 14px; color: #8B9BB4; margin-top: 24px;">
            That's it. Your first practice interview is waiting.
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
