import { useEffect, useState } from 'react'

const navLinks = [
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'pricing', label: 'Pricing' },
]

export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
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
        background: scrolled ? 'rgba(11,13,18,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
      }}
    >
      <div className="max-w-[1120px] mx-auto px-6 py-4 flex items-center justify-between">
        <span className="font-heading font-bold text-[18px] text-text-primary tracking-[-0.02em]">
          Interview Coach
        </span>

        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-[13px] text-text-tertiary hover:text-text-primary transition-all duration-300 cursor-pointer hidden sm:block relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1px] after:bg-accent/40 hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </button>
          ))}
          <a
            href="/start"
            className="text-white text-[13px] font-medium px-5 py-2.5 rounded-lg transition-all duration-300"
            style={{ background: 'rgba(0,224,204,0.15)', border: '1px solid rgba(0,224,204,0.35)', color: '#00E0CC' }}
          >
            Start Free Practice Interview &rarr;
          </a>
        </div>
      </div>
    </nav>
  )
}
