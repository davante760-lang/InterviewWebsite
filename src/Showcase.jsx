import { useState } from 'react'
import Option1 from './components/showcase/Option1'
import Option2 from './components/showcase/Option2'
import Option3 from './components/showcase/Option3'
import Option4 from './components/showcase/Option4'
import Option5 from './components/showcase/Option5'
import Option6 from './components/showcase/Option6'
import Option7 from './components/showcase/Option7'
import Option8 from './components/showcase/Option8'
import Option9 from './components/showcase/Option9'
import Option10 from './components/showcase/Option10'
import Option11 from './components/showcase/Option11'
import Option12 from './components/showcase/Option12'
import Option13 from './components/showcase/Option13'
import Option14 from './components/showcase/Option14'
import Option15 from './components/showcase/Option15'

const options = [
  { component: Option11, label: 'Signal-to-Noise — Stats crisp, noise crowds in, scan bar clears to answer' },
  { component: Option12, label: 'Defragmentation — Messy cards converge, fuse into spark, SAY THIS expands' },
  { component: Option13, label: 'Structural Blueprint — All failures appear at once as wall, dim+blur, answer rises' },
  { component: Option14, label: 'Redaction Reveal — Rambling text block, teal highlights gold, rest redacts away' },
  { component: Option15, label: 'Phase State Machine — Discrete scroll phases, AnimatePresence swaps, one-at-a-time then stack' },
  { component: Option1, label: '(OLD) Ghost in the Machine — Stats blur behind the struggle' },
  { component: Option2, label: '(OLD) Deconstruction — Bento grid breaks under pressure' },
  { component: Option3, label: '(OLD) Pulse & Flatline — Heartbeat dies at interview' },
  { component: Option4, label: '(OLD) Trophy Stack Choke — Stats compress and crush' },
  { component: Option5, label: '(OLD) Numbers Morph to Broken Speech' },
  { component: Option6, label: '(OLD) Confidence Meter Flip' },
  { component: Option7, label: '(OLD) Same Person / Two Outputs' },
  { component: Option8, label: '(OLD) The Redaction' },
  { component: Option9, label: '(OLD) Interrogation Transcript' },
  { component: Option10, label: '(OLD) The Split Self' },
]

export default function Showcase() {
  const [activeOnly, setActiveOnly] = useState(null)

  const visible = activeOnly !== null ? [options[activeOnly]] : options
  const visibleIndices = activeOnly !== null ? [activeOnly] : options.map((_, i) => i)

  return (
    <div className="min-h-screen bg-bg text-text-primary">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-bg/90 backdrop-blur-xl border-b border-border/30 px-4 py-3">
        <div className="max-w-[800px] mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-heading font-bold text-[15px]">Section Showcase</h1>
            <p className="text-[10px] text-text-tertiary/50">{options.length} options &middot; scroll each to compare</p>
          </div>
          <div className="flex items-center gap-2">
            {activeOnly !== null && (
              <button onClick={() => setActiveOnly(null)}
                className="text-[10px] text-teal border border-teal/20 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-teal/10 transition-colors">
                Show All
              </button>
            )}
            <a href="/" className="text-[10px] text-text-tertiary/40 hover:text-text-tertiary transition-colors">&larr; Main Site</a>
          </div>
        </div>
      </div>

      <div className="pt-14">
        {visible.map((opt, vi) => {
          const realIndex = visibleIndices[vi]
          const Comp = opt.component
          return (
            <div key={realIndex}>
              {/* Option label bar */}
              <div className="sticky top-[52px] z-40 bg-surface-1/95 backdrop-blur border-b border-border/20 px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] bg-teal/15 text-teal px-2.5 py-1 rounded font-bold border border-teal/20 font-mono">
                    {realIndex + 1}
                  </span>
                  <span className="text-[11px] sm:text-[12px] text-text-tertiary/60">{opt.label}</span>
                </div>
                <button
                  onClick={() => setActiveOnly(activeOnly === realIndex ? null : realIndex)}
                  className="text-[9px] text-text-tertiary/30 hover:text-text-tertiary cursor-pointer transition-colors uppercase tracking-wider">
                  {activeOnly === realIndex ? 'All' : 'Focus'}
                </button>
              </div>

              {/* The scroll section */}
              <Comp />

              {/* Separator */}
              <div className="py-8 px-6">
                <div className="h-px bg-border/15 max-w-[400px] mx-auto" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
