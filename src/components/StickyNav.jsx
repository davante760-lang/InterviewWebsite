import { useEffect, useState } from 'react'

const sections = [
  { id: 'numbers', short: 'Record', full: 'Track Record' },
  { id: 'experience', short: 'Exp', full: 'Experience' },
  { id: 'built-for', short: 'Fit', full: "Built For" },
  { id: 'how-i-sell', short: 'Sell', full: 'How I Sell' },
  { id: 'founder-signal', short: 'Signal', full: 'Signal' },
  { id: 'deal-spotlight', short: 'Deal', full: 'Deal' },
  { id: 'what-you-get', short: 'Value', full: 'What You Get' },
  { id: 'about', short: 'About', full: 'About' },
  { id: 'resume', short: 'Resume', full: 'Resume' },
]

export default function StickyNav() {
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 300)

      let current = ''
      for (const section of sections) {
        const el = document.getElementById(section.id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120) {
            current = section.id
          }
        }
      }
      setActive(current)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollTo(id) {
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 72
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-8px)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div className="bg-bg/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-[860px] mx-auto px-4 py-2.5 flex items-center justify-center gap-1">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                active === s.id
                  ? 'bg-surface-2 text-text-primary'
                  : 'text-text-tertiary hover:text-text-secondary'
              }`}
            >
              <span className="sm:hidden">{s.short}</span>
              <span className="hidden sm:inline">{s.full}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
