import { FadeIn, SectionTitle } from './AnimatedSection'

export default function DealStory() {
  return (
    <section id="deal-spotlight" className="py-24 md:py-28 px-6">
      <div className="max-w-[860px] mx-auto">
        <FadeIn>
          <SectionTitle eyebrow="DEAL SPOTLIGHT" title="$435K Competitive Displacement" />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="relative bg-surface-1 border border-border rounded-xl p-6 md:p-7 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent" />
            <p className="text-[14.5px] leading-[1.75] text-text-secondary max-w-[680px]">
              Reframed a technology decision for a leading concrete producer into a $2M operational
              risk problem. Secured early CFO alignment and built the executive business case around
              the cost of inaction. Happy to walk through the full deal mechanics live.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
