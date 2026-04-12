import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion'

/* ── ScrollReveal ──
   Transforms opacity/y/scale/blur based on element's scroll progress through viewport */
export function ScrollReveal({ children, className = '', y = 60, scale = 1, blur = 0 }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const yVal = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [y, 0, 0, -y])
  const scaleVal = useTransform(scrollYProgress, [0, 0.3], [scale === 1 ? 1 : scale, 1])
  const blurVal = useTransform(scrollYProgress, [0, 0.3], [blur, 0])
  const filter = useTransform(blurVal, (v) => `blur(${v}px)`)

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y: yVal, scale: scaleVal, filter }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ── StickySection ──
   Pins content while scroll progresses through a tall container.
   Returns scrollYProgress (0→1) to children via render prop. */
export function StickySection({ children, height = '300vh', className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  return (
    <div ref={ref} className={`relative ${className}`} style={{ height }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {typeof children === 'function' ? children(scrollYProgress) : children}
      </div>
    </div>
  )
}

/* ── ParallaxLayer ──
   Offsets element based on scroll for depth effect */
export function ParallaxLayer({ children, className = '', speed = 0.5 }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100])

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}

/* ── CountUp ──
   Animated number counter triggered on scroll-into-view */
export function CountUp({
  end,
  prefix = '',
  suffix = '',
  duration = 2,
  className = '',
  decimals = 0,
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [display, setDisplay] = useState(`${prefix}0${suffix}`)

  useEffect(() => {
    if (!isInView) return
    const start = 0
    const startTime = performance.now()
    const dur = duration * 1000

    function tick(now) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / dur, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = start + (end - start) * eased
      setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isInView, end, prefix, suffix, duration, decimals])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}

/* ── GradientMesh ──
   Animated background with moving gradient blobs */
export function GradientMesh({ className = '', colors = ['#7c6aef', '#5b8def', '#4ecdc4'], opacity = 0.08 }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {colors.map((color, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: '50%',
            height: '50%',
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            opacity,
            left: `${20 + i * 25}%`,
            top: `${15 + i * 20}%`,
          }}
          animate={{
            x: [0, 60 * (i % 2 === 0 ? 1 : -1), 0],
            y: [0, 40 * (i % 2 === 0 ? -1 : 1), 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 8 + i * 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

/* ── TextRevealByWord ──
   Words reveal sequentially as user scrolls through the section */
export function TextRevealByWord({ text, className = '', highlight = [], scrollProgress }) {
  const words = text.split(' ')

  return (
    <p className={className}>
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        return (
          <Word
            key={i}
            word={word}
            range={[start, end]}
            progress={scrollProgress}
            isHighlight={highlight.some((h) => word.toLowerCase().includes(h.toLowerCase()))}
          />
        )
      })}
    </p>
  )
}

function Word({ word, range, progress, isHighlight }) {
  const opacity = useTransform(progress, range, [0.12, 1])
  const color = isHighlight ? 'var(--color-accent)' : 'var(--color-text-primary)'

  return (
    <motion.span
      style={{ opacity, color }}
      className={`inline-block mr-[0.3em] ${isHighlight ? 'font-semibold' : ''}`}
    >
      {word}
    </motion.span>
  )
}

/* ── GlowButton ──
   CTA button with animated gradient border glow */
export function GlowButton({ children, href = '#', className = '' }) {
  return (
    <a href={href} className={`relative inline-block group ${className}`}>
      {/* Animated glow border */}
      <div
        className="absolute -inset-[1px] rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(135deg, #7c6aef, #5b8def, #4ecdc4, #7c6aef)',
          backgroundSize: '300% 300%',
          animation: 'gradient-rotate 4s linear infinite',
        }}
      />
      {/* Button face */}
      <div className="relative bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-[15px]">
        {children}
      </div>
    </a>
  )
}

/* ── TiltCard ──
   Card with 3D perspective tilt following mouse position */
export function TiltCard({ children, className = '', maxTilt = 4 }) {
  const ref = useRef(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  function handleMouseMove(e) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    rotateX.set(-y * maxTilt)
    rotateY.set(x * maxTilt)
  }

  function handleMouseLeave() {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 1200,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ── NoiseOverlay ──
   Subtle film grain texture overlay */
export function NoiseOverlay({ opacity = 0.03 }) {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100]"
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '128px 128px',
      }}
    />
  )
}
