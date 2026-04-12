import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function VideoWalkthrough() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1])
  const borderOpacity = useTransform(scrollYProgress, [0.5, 1], [0, 0.6])

  return (
    <section ref={ref} className="py-16 md:py-24 px-4 sm:px-6 relative">
      {/* Background dim */}
      <motion.div
        style={{ opacity: useTransform(scrollYProgress, [0.3, 0.8], [0, 0.5]) }}
        className="absolute inset-0 bg-black pointer-events-none"
      />

      <div className="relative z-10 max-w-[1000px] mx-auto">
        <motion.p
          style={{ opacity: useTransform(scrollYProgress, [0, 0.4], [0, 1]) }}
          className="text-center text-[11px] uppercase tracking-[0.25em] text-accent/60 font-medium mb-6"
        >
          See It in Action
        </motion.p>

        <motion.div style={{ scale, opacity }} className="relative">
          {/* Animated gradient border */}
          <motion.div
            style={{ opacity: borderOpacity }}
            className="absolute -inset-[1px] rounded-2xl"
            style2={{
              background: 'linear-gradient(135deg, rgba(124,106,239,0.4), rgba(91,141,239,0.2), rgba(78,205,196,0.15), rgba(124,106,239,0.4))',
              backgroundSize: '300% 300%',
              animation: 'gradient-rotate 6s linear infinite',
            }}
          >
            <div
              className="absolute -inset-[1px] rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(124,106,239,0.4), rgba(91,141,239,0.2), rgba(78,205,196,0.15), rgba(124,106,239,0.4))',
                backgroundSize: '300% 300%',
                animation: 'gradient-rotate 6s linear infinite',
              }}
            />
          </motion.div>

          {/* Video container */}
          <div className="relative rounded-2xl overflow-hidden border border-border/30 bg-surface-1">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              {/* Dark gradient background */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse at 50% 40%, rgba(124,106,239,0.08) 0%, rgba(11,13,18,0.98) 70%)',
                }}
              />

              {/* Ghosted product UI */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.07]">
                <div className="w-[75%] max-w-[500px] space-y-3">
                  <div className="flex gap-3">
                    <div className="bg-text-primary rounded-lg h-28 flex-1" />
                    <div className="bg-text-primary rounded-lg h-28 flex-1" />
                  </div>
                  <div className="bg-text-primary rounded-lg h-16 w-full" />
                </div>
              </div>

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative cursor-pointer"
                >
                  {/* Outer pulse rings */}
                  {[1.5, 2.0].map((s, i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, s], opacity: [0.25, 0] }}
                      transition={{ duration: 2.5 + i * 0.5, repeat: Infinity, ease: 'easeOut', delay: i * 0.4 }}
                      className="absolute inset-0 rounded-full border border-accent/40"
                    />
                  ))}

                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-accent/90 backdrop-blur-sm flex items-center justify-center shadow-2xl shadow-accent/30">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1">
                      <path d="M8 5.14v14l11-7-11-7z" />
                    </svg>
                  </div>
                </motion.div>
              </div>

              {/* Duration */}
              <div className="absolute bottom-4 right-4">
                <span className="bg-black/50 backdrop-blur-md text-white/80 text-[11px] px-3 py-1.5 rounded-lg font-medium border border-white/5">
                  1:32
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.p
          style={{ opacity: useTransform(scrollYProgress, [0.5, 1], [0, 0.6]) }}
          className="text-center text-text-tertiary/50 text-[12px] mt-5 tracking-wide"
        >
          Watch the founder walk through a live session — question to answer in under 500ms
        </motion.p>
      </div>
    </section>
  )
}
