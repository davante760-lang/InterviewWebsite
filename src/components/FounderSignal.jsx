import { motion } from 'framer-motion'
import { FadeIn, SectionTitle } from './AnimatedSection'

const cards = [
  {
    title: 'Former Agency Owner',
    body: 'Built and sold an independent insurance agency. I speak the language of my customers because I have sat in their chair and managed their P&L.',
  },
  {
    title: 'AI Practitioner',
    body: 'Active early-adopter of LLM and AI tools. I build my own workflows to automate prospecting research and territory mapping, providing a technical edge in speed-to-lead.',
  },
  {
    title: 'Stage Fit',
    body: 'I work best where the category is still being defined, the sales motion is not yet institutionalized, and leadership values commercial judgment over raw activity volume.',
  },
]

export default function FounderSignal() {
  return (
    <section id="founder-signal" className="bg-surface-1 border-b border-border py-24 md:py-28 px-6">
      <div className="max-w-[860px] mx-auto">
        <FadeIn>
          <SectionTitle eyebrow="SIGNAL" title="Founder-Level Signal" />
        </FadeIn>

        <div className="flex flex-col gap-4">
          {cards.map((card, i) => (
            <FadeIn key={card.title} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="bg-surface-2 border border-border rounded-xl p-5"
              >
                <h3 className="font-heading font-medium text-text-primary mb-2">{card.title}</h3>
                <p className="text-[14.5px] leading-[1.75] text-text-secondary">{card.body}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
