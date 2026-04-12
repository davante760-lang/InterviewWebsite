import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeIn, SectionTitle } from '../AnimatedSection'

const faqs = [
  {
    q: 'Will this actually work during a live interview?',
    a: 'Tiers 1 and 2 run locally on your machine. No cloud round-trip, no buffering, no lag spikes. The answer hits your screen in under 500 milliseconds — while the interviewer is still finishing the question. It runs as a floating overlay on your desktop, the same way you\'d have Salesforce open during a customer call.',
  },
  {
    q: "Won't it distract me or make me look worse?",
    a: 'If you\'ve ever glanced at notes during a sales call, you already know how to use a second information source without breaking eye contact. The cards are designed to be scanned in 2–3 seconds — short, structured, your words. You\'re not reading a script. You\'re getting a memory jog with your actual numbers.',
  },
  {
    q: 'Is this just another AI interview gimmick?',
    a: 'It was built by a President\'s Club AE during a real job search and used on real interviews. The three-tier engine, the Prep Card system, the War Room — all of it came from the specific problems an enterprise seller faces in a hiring loop.',
  },
  {
    q: "What if I don't have time to build Prep Cards?",
    a: 'Upload your resume and any deal docs. The system generates your initial card set automatically — you refine from there. Most users have a working playbook in under 30 minutes.',
  },
  {
    q: "I'm a strong interviewer. Why do I need this?",
    a: '"Strong" in a pool of 30 other AEs who all hit quota isn\'t a differentiator. The question isn\'t whether you can get through interviews. It\'s whether you\'ll be the most specific, most metrics-sharp, most structured candidate the hiring panel sees that week.',
  },
]

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        className="w-full text-left py-5 flex items-start justify-between gap-4 cursor-pointer"
      >
        <span className="text-text-primary font-medium text-[15px]">{faq.q}</span>
        <span className="text-text-tertiary text-[20px] shrink-0 mt-[-2px]">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="text-text-secondary text-[14px] leading-[1.7] pb-5">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null)

  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-[720px] mx-auto">
        <FadeIn>
          <SectionTitle
            eyebrow="Straight Answers"
            title="You're Thinking It. Here It Is."
          />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div>
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                isOpen={openIdx === i}
                onToggle={() => setOpenIdx(openIdx === i ? null : i)}
              />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
