import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stages = ['Applied', 'Screen', 'HM Round', 'VP Round', 'Panel', 'Offer']

const positions = [
  {
    company: 'Datadog', role: 'Enterprise AE', stage: 3, comp: '$280K OTE',
    initials: 'DD', color: '#632ca6', nextInterview: 'Apr 14 · 2:00 PM',
    stakeholders: [{ initials: 'MK', role: 'VP Sales' }, { initials: 'JL', role: 'Dir Rev Ops' }],
    notes: 'Strong signal from HM. Prep competitive positioning vs. Splunk.',
  },
  {
    company: 'CrowdStrike', role: 'Strategic AE', stage: 4, comp: '$310K OTE',
    initials: 'CS', color: '#e8462e', nextInterview: 'Apr 16 · 10:30 AM',
    stakeholders: [{ initials: 'RB', role: 'CRO' }, { initials: 'AP', role: 'VP Enterprise' }, { initials: 'TN', role: 'Panel' }],
    notes: 'Final panel. CRO attending. Lead with $1.2M deal story.',
  },
  {
    company: 'Snowflake', role: 'Commercial AE', stage: 1, comp: '$250K OTE',
    initials: 'SF', color: '#29b5e8', nextInterview: 'Pending',
    stakeholders: [{ initials: 'KW', role: 'Recruiter' }],
    notes: 'Initial screen. Research data cloud positioning.',
  },
]

export default function WarRoom() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-24 md:py-32 px-6 relative">
      <div className="max-w-[760px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <span className="block text-[11px] uppercase tracking-[0.25em] font-medium text-accent/60 mb-3">
            Your Pipeline
          </span>
          <h2 className="font-heading font-bold text-[28px] sm:text-[36px] md:text-[42px] leading-[1.1] tracking-[-0.03em] text-text-primary mb-4">
            Your Job Search Is a Pipeline.{' '}
            <span className="text-accent">Run It Like One.</span>
          </h2>
          <p className="text-text-secondary text-[16px] leading-[1.7] max-w-[520px]">
            Each opportunity gets a dedicated workspace: intel, stakeholder mapping, comp tracking,
            and per-round notes.
          </p>
        </motion.div>

        {/* Dashboard reveal */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.92, filter: 'blur(10px)' }}
          animate={isInView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Scan line effect */}
          {isInView && (
            <motion.div
              initial={{ top: '-100%' }}
              animate={{ top: '200%' }}
              transition={{ duration: 1.5, ease: 'linear' }}
              className="absolute left-0 right-0 h-[1px] z-20 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(124,106,239,0.4), transparent)',
              }}
            />
          )}

          <div
            className="bg-surface-1/90 backdrop-blur-xl border border-border/30 rounded-xl overflow-hidden"
            style={{ boxShadow: '0 0 60px rgba(124,106,239,0.05), 0 20px 60px rgba(0,0,0,0.3)' }}
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-border/20 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.15em] text-accent/60 font-medium">
                  War Room
                </span>
                <p className="text-text-primary font-heading font-semibold text-[15px] mt-0.5">
                  3 Active Positions
                </p>
              </div>
              <span className="text-[10px] bg-accent/10 text-accent/80 px-2.5 py-1 rounded-md font-medium border border-accent/10">
                2 Interviews This Week
              </span>
            </div>

            {/* Rows */}
            <div className="divide-y divide-border/15">
              {positions.map((pos, posIdx) => (
                <motion.div
                  key={pos.company}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + posIdx * 0.15, duration: 0.5 }}
                  className="px-6 py-4 hover:bg-surface-2/20 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${pos.color}20` }}>
                        <span className="text-[10px] font-bold" style={{ color: pos.color }}>{pos.initials}</span>
                      </div>
                      <div>
                        <p className="text-text-primary font-medium text-[14px]">{pos.company}</p>
                        <p className="text-text-tertiary/50 text-[11px]">{pos.role}</p>
                      </div>
                    </div>
                    <span className="text-[12px] text-text-tertiary/60 font-medium">{pos.comp}</span>
                  </div>

                  {/* Stage bar */}
                  <div className="flex gap-1 mb-2">
                    {stages.map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: '100%' } : {}}
                        transition={{ delay: 0.6 + posIdx * 0.15 + i * 0.05, duration: 0.3 }}
                        className={`h-1 rounded-full flex-1 ${
                          i < pos.stage ? 'bg-accent/60' : i === pos.stage ? 'bg-accent/25' : 'bg-surface-3/30'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1">
                        {pos.stakeholders.map((sh, i) => (
                          <motion.div
                            key={sh.initials}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.8 + posIdx * 0.15 + i * 0.08 }}
                            className="w-5 h-5 rounded-full bg-surface-3/60 border border-border/20 flex items-center justify-center"
                          >
                            <span className="text-[7px] text-text-tertiary/60 font-medium">{sh.initials}</span>
                          </motion.div>
                        ))}
                      </div>
                      <span className="text-[9px] text-text-tertiary/40">{pos.stakeholders.length}</span>
                    </div>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.9 + posIdx * 0.15 }}
                      className={`text-[11px] font-medium ${pos.nextInterview === 'Pending' ? 'text-text-tertiary/40' : 'text-accent/70'}`}
                    >
                      {pos.nextInterview}
                    </motion.span>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.0 + posIdx * 0.15 }}
                    className="mt-3 bg-surface-2/30 rounded-lg px-3 py-2 border border-border/10"
                  >
                    <p className="text-[10px] text-text-secondary/60 leading-[1.5]">{pos.notes}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
