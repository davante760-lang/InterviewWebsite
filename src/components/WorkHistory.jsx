import { FadeIn, SectionTitle } from './AnimatedSection'
import { motion } from 'framer-motion'

const companies = [
  {
    name: 'Samsara',
    logo: '/samsara-logo.svg',
    role: 'Senior Account Executive, Enterprise',
    stats: [
      { label: 'Quota', value: '$1.5M' },
      { label: 'Attainment', value: '124% avg · 2× President\'s Club' },
    ],
    takeaway:
      'Learned to build pipeline in a saturated market by reframing conversations around operational risk, not product features.',
  },
  {
    name: 'Applied Systems',
    logo: '/applied-logo.svg',
    role: 'Account Executive, Mid-Market',
    stats: [
      { label: 'Quota', value: '$800K' },
      { label: 'Attainment', value: '105%' },
    ],
    takeaway:
      'Where I learned that the real sale in a legacy-replacement motion is change management, not technology.',
  },
  {
    name: 'EZLynx',
    logo: '/ezlynx-logo.svg',
    role: 'Account Executive, SMB',
    stats: [
      { label: 'Quota', value: '$350K' },
      { label: 'Attainment', value: 'Largest deal of the year · Top pipeline generator' },
    ],
    takeaway:
      'Where outbound discipline and trigger-based prospecting became the foundation everything else is built on.',
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
                <div className="h-8 mb-4 flex items-center">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="h-6 object-contain opacity-70"
                  />
                </div>

                {/* Role */}
                <h3 className="font-heading text-[15px] font-semibold text-text-primary tracking-[-0.01em] mb-4">
                  {company.role}
                </h3>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {company.stats.map((stat) => (
                    <div key={stat.label} className={stat.value.length > 15 ? 'col-span-2' : ''}>
                      <div className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary mb-1">
                        {stat.label}
                      </div>
                      <div className="text-[13px] font-medium text-text-primary leading-snug">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Takeaway */}
                <div className="mt-auto pt-4 border-t border-border-light">
                  <p className="text-[12.5px] italic text-text-tertiary leading-[1.65]">
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
