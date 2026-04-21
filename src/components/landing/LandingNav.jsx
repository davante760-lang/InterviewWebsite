import { useEffect, useState } from 'react'

const navLinks = [
  { id: 'how-it-works', label: 'How it works' },
  { id: 'features',     label: 'Features' },
  { id: 'compare',      label: 'Compare' },
  { id: 'pricing',      label: 'Pricing' },
]

// Accent used for the wordmark square + Start Trial CTA. Hardcoded here so
// this component becomes the first visible adoption of the new cobalt
// aesthetic direction while the rest of the site still uses the legacy
// teal --color-accent. Swap to a CSS variable once the broader redesign
// adopts cobalt as the theme accent.
const COBALT = '#3454ff'
const COBALT_BRIGHT = '#5470ff'

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
      const y = el.getBoundingClientRect().top + window.scrollY - 96
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <nav
      className="fixed left-1/2 top-5 z-50 -translate-x-1/2 transition-all duration-300"
      style={{ willChange: 'transform' }}
    >
      <div
        className="flex items-center gap-2 sm:gap-3 rounded-full backdrop-blur-xl px-3 sm:px-4 py-2"
        style={{
          background: scrolled ? 'rgba(14,16,22,0.82)' : 'rgba(14,16,22,0.64)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: scrolled
            ? '0 12px 48px -16px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.02)'
            : '0 8px 32px -12px rgba(0,0,0,0.4)',
          transition: 'background 250ms ease, box-shadow 250ms ease',
        }}
      >
        {/* Logo mark + wordmark */}
        <a href="/" className="flex items-center gap-2 pl-2 pr-1 sm:pr-2 group">
          <span
            className="inline-block h-4 w-4 rounded-[4px]"
            style={{
              background: COBALT,
              boxShadow: `0 0 14px -2px ${COBALT}`,
            }}
            aria-hidden="true"
          />
          <span
            className="font-semibold text-[14px] text-white tracking-[-0.01em]"
          >
            Noruma
          </span>
        </a>

        {/* Divider between wordmark and links (visible on desktop only) */}
        <span
          aria-hidden="true"
          className="hidden md:block h-5 w-px"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        />

        {/* Nav links */}
        <div className="hidden md:flex items-center">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-[13px] text-white/65 hover:text-white px-3 py-1.5 rounded-full transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <a
          href="/start"
          className="inline-flex items-center gap-1.5 rounded-full text-[13px] font-medium text-white pl-4 pr-3.5 py-2 ml-1 sm:ml-2 transition-all duration-200"
          style={{
            background: COBALT,
            boxShadow: `0 4px 16px -4px ${COBALT}80`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = COBALT_BRIGHT
            e.currentTarget.style.boxShadow = `0 6px 22px -4px ${COBALT_BRIGHT}aa`
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = COBALT
            e.currentTarget.style.boxShadow = `0 4px 16px -4px ${COBALT}80`
          }}
        >
          Start trial
          <span aria-hidden="true" className="text-[14px] leading-none">→</span>
        </a>
      </div>
    </nav>
  )
}
