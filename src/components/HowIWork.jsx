import { FadeIn, SectionTitle } from './AnimatedSection'

const items = [
  {
    title: 'Trigger-Based Prospecting',
    body: 'I tier territories into 15–20 priority accounts based on active signals: M&A, leadership shifts, or compliance audits. I lead with the business change, not a product pitch.',
  },
  {
    title: 'Multi-Threaded Alignment',
    body: 'I run simultaneous top-down (C-Suite) and bottom-up (Operational Staff) threads. One champion is a single point of failure; I build committees around a shared business case.',
  },
  {
    title: 'Hard-Stop Qualification',
    body: 'I prioritize "no" over "maybe." I surface contract buyouts, legal blockers, and budget authority early to ensure resources are only deployed against deals with a real path to action.',
  },
]

export default function HowIWork() {
  return (
    <section id="how-i-sell" className="py-24 md:py-28 px-6">
      <div className="max-w-[860px] mx-auto">
        <FadeIn>
          <SectionTitle eyebrow="APPROACH" title="How I Sell" />
        </FadeIn>

        <div className="space-y-6">
          {items.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.08}>
              <div className="pl-4 border-l border-border-light max-w-[680px]">
                <h3 className="font-heading text-[15px] font-semibold text-text-primary tracking-[-0.01em] mb-2">
                  {item.title}
                </h3>
                <p className="text-[14.5px] leading-[1.75] text-text-secondary">
                  {item.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
