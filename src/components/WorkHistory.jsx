import { FadeIn, SectionTitle } from './AnimatedSection'
import { motion } from 'framer-motion'

const companies = [
  {
    name: 'Samsara',
    logo: '/logo-samsara.png',
    invertLogo: true,
    role: 'Senior Account Executive, Enterprise',
    takeaway:
      'Built pipeline in a saturated market by reframing conversations around operational risk and P&L impact rather than product features.',
  },
  {
    name: 'Applied Systems',
    logo: '/logo-applied.png',
    role: 'Account Executive, Mid-Market',
    takeaway:
      'Led legacy-replacement motions where the primary friction was change management. Specialized in unseating entrenched, stable incumbents.',
  },
  {
    name: 'EZLynx',
    logo: '/logo-ezlynx.png',
    role: 'Account Executive, SMB',
    takeaway:
      'Established the foundation of trigger-based prospecting and outbound discipline within the insurance distribution chain.',
  },
]

export default function WorkHistory() {
  return (
    <section id="experience" className="py-24 md:py-28 px-6">
      <div className="max-w-[860px] mx-auto">
        <FadeIn>
          <SectionTitle eyebrow="EXPERIENCE" title="Where I've Sold" />
        </FadeIn>

        {/* Timeline connector line (desktop only) */}
        <div className="hidden md:block relative mb-8">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-border" />
          <div className="flex justify-between relative z-10">
            {companies.map((c) => (
              <div key={c.name} className="w-2 h-2 rounded-full bg-accent" />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {companies.map((company, i) => (
            <FadeIn key={company.name} delay={i * 0.1}>
              <motion.div
                className="bg-surface-1 border border-border rounded-xl p-5 flex flex-col h-full"
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Logo */}
                <div className="h-10 mb-4 flex items-center">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="h-8 max-w-[140px] object-contain"
                    style={company.invertLogo ? { filter: 'brightness(0) invert(1)' } : undefined}
                  />
                </div>

                {/* Role */}
                <h3 className="font-heading text-[15px] font-semibold text-text-primary tracking-[-0.01em] mb-4">
                  {company.role}
                </h3>

                {/* Takeaway */}
                <div className="mt-auto pt-4 border-t border-border-light">
                  <p className="text-[13px] italic text-text-tertiary leading-[1.65]">
                    "{company.takeaway}"
                  </p>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
