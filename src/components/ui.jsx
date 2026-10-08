import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform, animate } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

/** Fade/slide in when scrolled into view */
export function Reveal({ children, delay = 0, y = 40, x = 0, className = '', as = 'div' }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </M>
  )
}

/** Word-by-word masked reveal for headings. Wrap italic words in *asterisks*. */
export function SplitText({ text, as = 'h2', className = '', delay = 0, stagger = 0.06 }) {
  const Tag = motion[as]
  const words = text.split(' ')
  return (
    <Tag
      className={`split ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((w, i) => {
        const em = w.startsWith('*') && w.endsWith('*')
        const word = em ? w.slice(1, -1) : w
        return (
          <span className="split-mask" key={i}>
            <motion.span
              className={em ? 'em' : ''}
              variants={{ hidden: { y: '110%', rotate: 4 }, show: { y: '0%', rotate: 0, transition: { duration: 0.9, ease } } }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && ' '}
          </span>
        )
      })}
    </Tag>
  )
}

/** Small uppercase label with gold rules */
export function Eyebrow({ children, center }) {
  return (
    <Reveal className={`eyebrow ${center ? 'eyebrow-c' : ''}`} y={16}>
      {children}
    </Reveal>
  )
}

/** Button that drifts toward the cursor */
export function Magnetic({ children, strength = 0.35 }) {
  const ref = useRef(null)
  const x = useSpring(0, { stiffness: 200, damping: 15 })
  const y = useSpring(0, { stiffness: 200, damping: 15 })
  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * strength)
    y.set((e.clientY - r.top - r.height / 2) * strength)
  }
  const leave = () => { x.set(0); y.set(0) }
  return (
    <motion.span ref={ref} style={{ x, y, display: 'inline-flex' }} onMouseMove={move} onMouseLeave={leave}>
      {children}
    </motion.span>
  )
}

/** 3D tilt card with gold glare following the cursor */
export function Tilt({ children, className = '', onClick, max = 12 }) {
  const ref = useRef(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [max, -max]), { stiffness: 180, damping: 18 })
  const ry = useSpring(useTransform(mx, [0, 1], [-max, max]), { stiffness: 180, damping: 18 })
  const glare = useTransform([mx, my], ([a, b]) => `radial-gradient(circle at ${a * 100}% ${b * 100}%, rgba(255,226,160,.35), transparent 55%)`)
  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const leave = () => { mx.set(0.5); my.set(0.5) }
  return (
    <motion.div
      ref={ref}
      className={`tilt ${className}`}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onMouseMove={move}
      onMouseLeave={leave}
      onClick={onClick}
    >
      {children}
      <motion.span className="tilt-glare" style={{ background: glare }} />
    </motion.div>
  )
}

/** Number that counts up when visible */
export function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.8, ease, onUpdate: (n) => setV(Math.round(n)) })
    return () => c.stop()
  }, [inView, to])
  return <span ref={ref}>{v}{suffix}</span>
}

/** Inline SVG icon set */
export function Icon({ name, size = 24 }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }
  const icons = {
    crown: <path d="M3 8l4 4 5-7 5 7 4-4-2 11H5zM5 21h14" />,
    rings: <><circle cx="9" cy="14" r="5" /><circle cx="15" cy="10" r="5" /></>,
    camera: <><rect x="3" y="6" width="18" height="14" rx="2" /><circle cx="12" cy="13" r="4" /><path d="M8 6l2-3h4l2 3" /></>,
    glass: <path d="M8 3h8l-1 7a3 3 0 0 1-6 0zM12 13v6M8 21h8" />,
    comb: <path d="M6 3c0 6 4 7 4 12s-2 6-2 6M18 3c0 6-4 7-4 12s2 6 2 6M9 9h6" />,
    brow: <path d="M3 12c3-4 6-5 9-5s6 1 9 5M7 12.5c1.5 1 3 1.5 5 1.5s3.5-.5 5-1.5" />,
    arrow: <path d="M5 12h14M13 5l7 7-7 7" />,
    award: <><circle cx="12" cy="9" r="6" /><path d="M8.5 13.5 7 22l5-3 5 3-1.5-8.5" /></>,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />,
    pin: <><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    cert: <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M7 9h10M7 12h6" /><circle cx="17" cy="17" r="3" /><path d="M16 19.5V22l1-.6 1 .6v-2.5" /></>,
    users: <><circle cx="9" cy="8" r="4" /><path d="M2 21c0-4 3-6 7-6s7 2 7 6M16 4a4 4 0 0 1 0 8M22 21c0-3-1.5-5-4-5.6" /></>,
    heart: <path d="M12 21s-8-5.3-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.7-8 11-8 11z" />,
    insta: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".6" fill="currentColor" /></>,
    fb: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8z" />,
    yt: <><rect x="2" y="5" width="20" height="14" rx="4" /><path d="M10 9l5 3-5 3z" fill="currentColor" /></>,
    close: <path d="M6 6l12 12M18 6 6 18" />,
    left: <path d="M15 5l-7 7 7 7" />,
    right: <path d="M9 5l7 7-7 7" />,
    spark: <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z" />,
    threads: <path d="M16.5 11.2c-.3-2.4-1.9-3.7-4.3-3.7-2.6 0-4 1.6-4 3.4M16.6 11.3c2 .9 3 2.4 2.8 4.3-.3 3.1-3.2 5.4-7.3 5.4C7 21 4 17.6 4 12s3-9 8.1-9c3.8 0 6.4 1.8 7.4 5M16.6 11.3c-1.4-.6-3-.8-4.6-.6-2.1.3-3.4 1.4-3.3 2.9.1 1.6 1.6 2.5 3.4 2.4 2.7-.2 4.4-1.9 4.5-4.7z" />,
    play: <path d="M8 5v14l11-7z" fill="currentColor" stroke="none" />,
    pause: <><rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" stroke="none" /><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" stroke="none" /></>,
    sound: <><path d="M11 5 6 9H3v6h3l5 4z" /><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" /></>,
    mute: <><path d="M11 5 6 9H3v6h3l5 4z" /><path d="M22 9l-6 6M16 9l6 6" /></>,
    external: <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />,
    news: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 8h10M7 12h10M7 16h6" /></>,
  }
  return <svg {...p}>{icons[name]}</svg>
}

export function WhatsAppIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.3.5-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l2 .9c.3.1.5.2.5.3.1.1.1.6-.1 1.2z" />
    </svg>
  )
}

export const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -70, duration: 1.4 })
  else el.scrollIntoView({ behavior: 'smooth' })
}
