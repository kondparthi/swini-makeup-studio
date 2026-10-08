import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue } from 'framer-motion'
import { nav, site } from '../data'
import { Magnetic, scrollTo, WhatsAppIcon } from './ui'

/* ── Preloader: monogram draws in, name rises, curtain lifts ── */
export function Preloader({ onDone }) {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    let n = 0
    const t = setInterval(() => {
      n += Math.ceil(Math.random() * 9)
      if (n >= 100) { n = 100; clearInterval(t); setTimeout(onDone, 500) }
      setPct(n)
    }, 45)
    return () => clearInterval(t)
  }, [onDone])
  return (
    <motion.div className="preloader" exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}>
      <svg viewBox="0 0 120 120" className="pre-ring">
        <motion.circle cx="60" cy="60" r="54" fill="none" stroke="url(#g)" strokeWidth="1.2"
          initial={{ pathLength: 0 }} animate={{ pathLength: pct / 100 }} transition={{ ease: 'linear' }} />
        <defs><linearGradient id="g"><stop offset="0" stopColor="#f3dca5" /><stop offset="1" stopColor="#9c7a3c" /></linearGradient></defs>
      </svg>
      <motion.span className="pre-s" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>S</motion.span>
      <div className="pre-name">
        <motion.span initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>Swini Makeup Studio</motion.span>
      </div>
      <span className="pre-pct">{pct}%</span>
    </motion.div>
  )
}

/* ── Custom gold cursor (desktop only) ── */
export function Cursor() {
  const x = useMotionValue(-100), y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40 }), sy = useSpring(y, { stiffness: 500, damping: 40 })
  const [hover, setHover] = useState(false)
  useEffect(() => {
    const m = (e) => { x.set(e.clientX); y.set(e.clientY) }
    const o = (e) => setHover(!!e.target.closest('a,button,.tilt,.g-item,input,select,textarea'))
    window.addEventListener('mousemove', m); window.addEventListener('mouseover', o)
    return () => { window.removeEventListener('mousemove', m); window.removeEventListener('mouseover', o) }
  }, [x, y])
  return (
    <>
      <motion.div className="cursor-dot" style={{ x, y }} />
      <motion.div className={`cursor-ring ${hover ? 'big' : ''}`} style={{ x: sx, y: sy }} />
    </>
  )
}

/* ── Header with scroll progress + mobile overlay menu ── */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const { scrollYProgress } = useScroll()
  const prog = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })

  useEffect(() => {
    const on = () => {
      setScrolled(window.scrollY > 40)
      let cur = 'home'
      nav.forEach(([id]) => { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top < 160) cur = id })
      setActive(cur)
    }
    window.addEventListener('scroll', on, { passive: true }); on()
    return () => window.removeEventListener('scroll', on)
  }, [])

  const go = (id) => { setOpen(false); setTimeout(() => scrollTo(id), open ? 350 : 0) }

  return (
    <>
      <motion.header className={`header ${scrolled ? 'scrolled' : ''}`} initial={{ y: -100 }} animate={{ y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
        <motion.div className="progress" style={{ scaleX: prog }} />
        <div className="wrap nav">
          <button className="logo" onClick={() => go('home')} aria-label="Home">
            <span className="logo-mark">S</span>
            <span><b>Swini</b><small>Makeup Studio</small></span>
          </button>
          <ul className="menu">
            {nav.map(([id, label]) => (
              <li key={id}>
                <button className={active === id ? 'active' : ''} onClick={() => go(id)}>
                  {label}
                  {active === id && <motion.span layoutId="navline" className="navline" />}
                </button>
              </li>
            ))}
          </ul>
          <div className="nav-cta"><Magnetic><button className="btn btn-gold btn-sm" onClick={() => go('contact')}>Book Now</button></Magnetic></div>
          <button className={`burger ${open ? 'x' : ''}`} onClick={() => setOpen(!open)} aria-label="Menu"><span /><span /></button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" initial={{ clipPath: 'circle(0% at 100% 0%)' }} animate={{ clipPath: 'circle(150% at 100% 0%)' }} exit={{ clipPath: 'circle(0% at 100% 0%)' }} transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}>
            {nav.map(([id, label], i) => (
              <motion.button key={id} onClick={() => go(id)} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.06 }}>
                <small>0{i + 1}</small>{label}
              </motion.button>
            ))}
            <motion.a href={`tel:+91${site.phone}`} className="mm-phone" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>{site.phoneDisplay}</motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ── Floating WhatsApp + back to top ── */
export function Floaters() {
  const { scrollYProgress } = useScroll()
  const [show, setShow] = useState(false)
  useEffect(() => scrollYProgress.on('change', (v) => setShow(v > 0.08)), [scrollYProgress])
  return (
    <>
      <motion.a className="wa-float" href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hi Swini Makeup Studio, I'd like to book an appointment.")}`} target="_blank" rel="noopener"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.5, type: 'spring' }} whileHover={{ scale: 1.1, rotate: 8 }} aria-label="WhatsApp">
        <WhatsAppIcon size={30} />
      </motion.a>
      <AnimatePresence>
        {show && (
          <motion.button className="to-top" onClick={() => scrollTo('home')} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} aria-label="Back to top">
            <svg viewBox="0 0 40 40"><motion.circle cx="20" cy="20" r="18" style={{ pathLength: scrollYProgress }} /></svg>
            <span>↑</span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
