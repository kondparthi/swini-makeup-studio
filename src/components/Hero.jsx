import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { stats, site, marquee, ratings } from '../data'
import { RatingBadge } from './Chrome'
import { Counter, Icon, Magnetic, scrollTo } from './ui'

/* Gold dust particles drifting upward */
function Sparkles() {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current, ctx = c.getContext('2d')
    let w, h, raf
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => { w = c.offsetWidth; h = c.offsetHeight; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0) }
    resize(); window.addEventListener('resize', resize)
    const N = window.innerWidth < 700 ? 40 : 90
    const ps = Array.from({ length: N }, () => ({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.8 + 0.3, s: Math.random() * 0.4 + 0.1, t: Math.random() * Math.PI * 2, d: (Math.random() - 0.5) * 0.3 }))
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ps.forEach((p) => {
        p.y -= p.s; p.x += p.d; p.t += 0.03
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w }
        const a = 0.35 + Math.sin(p.t) * 0.35
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4)
        g.addColorStop(0, `rgba(243,220,165,${a})`); g.addColorStop(1, 'rgba(201,164,92,0)')
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2); ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="sparkles" />
}

const words = ['bride', 'face', 'moment', 'smile']

function RotatingWord() {
  const [i, setI] = useState(0)
  useEffect(() => { const t = setInterval(() => setI((n) => (n + 1) % words.length), 2600); return () => clearInterval(t) }, [])
  return (
    <span className="rot">
      <AnimatePresence initial={false}>
        <motion.span key={words[i]} initial={{ y: '100%', opacity: 0, filter: 'blur(6px)' }} animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }} exit={{ y: '-100%', opacity: 0, filter: 'blur(6px)' }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default function Hero({ ready }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yText = useTransform(scrollYProgress, [0, 1], [0, 180])
  const yImg1 = useTransform(scrollYProgress, [0, 1], [0, -120])
  const yImg2 = useTransform(scrollYProgress, [0, 1], [0, 80])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // mouse parallax
  const mx = useMotionValue(0), my = useMotionValue(0)
  const px = useSpring(mx, { stiffness: 60, damping: 20 }), py = useSpring(my, { stiffness: 60, damping: 20 })
  const px2 = useTransform(px, (v) => v * -1.6), py2 = useTransform(py, (v) => v * -1.6)
  const onMove = (e) => { mx.set((e.clientX / window.innerWidth - 0.5) * 24); my.set((e.clientY / window.innerHeight - 0.5) * 24) }

  const a = (d) => ({ initial: { opacity: 0, y: 40 }, animate: ready ? { opacity: 1, y: 0 } : {}, transition: { duration: 1, delay: d, ease: [0.22, 1, 0.36, 1] } })

  return (
    <section className="hero" id="home" ref={ref} onMouseMove={onMove}>
      <Sparkles />
      <div className="hero-glow" />
      <div className="wrap hero-grid">
        <motion.div style={{ y: yText, opacity: fade }}>
          <motion.span className="eyebrow light" {...a(0.1)}>Zaheerabad · Hyderabad · Telangana</motion.span>
          <h1 className="hero-title">
            {['Where', 'every'].map((w, i) => (
              <span className="split-mask" key={w}><motion.span initial={{ y: '110%' }} animate={ready ? { y: 0 } : {}} transition={{ delay: 0.2 + i * 0.08, duration: 1, ease: [0.22, 1, 0.36, 1] }}>{w}&nbsp;</motion.span></span>
            ))}
            <span className="split-mask"><motion.span initial={{ y: '110%' }} animate={ready ? { y: 0 } : {}} transition={{ delay: 0.36, duration: 1 }} style={{ display: 'inline-block' }}><RotatingWord /></motion.span></span>
            <br />
            {['becomes', 'a'].map((w, i) => (
              <span className="split-mask" key={w}><motion.span initial={{ y: '110%' }} animate={ready ? { y: 0 } : {}} transition={{ delay: 0.44 + i * 0.08, duration: 1, ease: [0.22, 1, 0.36, 1] }}>{w}&nbsp;</motion.span></span>
            ))}
            <span className="split-mask"><motion.span className="em shimmer" initial={{ y: '110%' }} animate={ready ? { y: 0 } : {}} transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}>masterpiece</motion.span></span>
          </h1>
          <motion.p className="hero-p" {...a(0.8)}>
            Award-winning bridal makeup, hairstyling and professional makeup training by celebrity makeup artist <b>{site.owner}</b>.
          </motion.p>
          <motion.div className="rating-row hero-ratings" {...a(0.9)}>
            {ratings.map((r) => <RatingBadge key={r.platform} r={r} />)}
          </motion.div>
          <motion.div className="hero-btns" {...a(0.95)}>
            <Magnetic><button className="btn btn-gold" onClick={() => scrollTo('contact')}>Book Your Look <Icon name="arrow" size={18} /></button></Magnetic>
            <Magnetic><button className="btn btn-line" onClick={() => scrollTo('academy')}>Join the Academy</button></Magnetic>
          </motion.div>
          <motion.div className="hero-stats" {...a(1.1)}>
            {stats.map((s) => (
              <div key={s.label}><b><Counter to={s.n} suffix={s.suffix} /></b><span>{s.label}</span></div>
            ))}
          </motion.div>
        </motion.div>

        <div className="collage">
          <motion.figure className="c1" style={{ y: yImg1, x: px, rotateZ: 0 }} initial={{ clipPath: 'inset(100% 0 0 0 round 300px 300px 18px 18px)' }} animate={ready ? { clipPath: 'inset(0% 0 0 0 round 300px 300px 18px 18px)' } : {}} transition={{ duration: 1.4, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}>
            <motion.img src="images/bridal-2.jpg" alt="Traditional bridal makeup" initial={{ scale: 1.4 }} animate={ready ? { scale: 1 } : {}} transition={{ duration: 1.8, delay: 0.3 }} />
          </motion.figure>
          <motion.figure className="c2" style={{ y: yImg2, x: px2 }} initial={{ opacity: 0, scale: 0.8, rotate: -8 }} animate={ready ? { opacity: 1, scale: 1, rotate: -4 } : {}} transition={{ duration: 1.1, delay: 0.8, type: 'spring' }}>
            <img src="images/bridal-3.jpg" alt="Bridal eye makeup" />
          </motion.figure>
          <motion.figure className="c3" style={{ y: py2, x: px }} initial={{ opacity: 0, scale: 0.8, rotate: 8 }} animate={ready ? { opacity: 1, scale: 1, rotate: 4 } : {}} transition={{ duration: 1.1, delay: 1, type: 'spring' }}>
            <img src="images/bridal-4.jpg" alt="Engagement makeup" />
          </motion.figure>
          <motion.div className="badge-float" style={{ x: px2, y: py }} initial={{ opacity: 0, x: -40 }} animate={ready ? { opacity: 1, x: 0 } : {}} transition={{ delay: 1.2, duration: 0.8 }}>
            <span className="bf-ic"><Icon name="award" size={30} /></span>
            <div><b>Best Makeup Artist</b><small>Zaheerabad · IBA 2023</small></div>
          </motion.div>
          <motion.div className="spin-badge" initial={{ opacity: 0, scale: 0 }} animate={ready ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 1.4, type: 'spring' }}>
            <svg viewBox="0 0 100 100"><defs><path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
              <text><textPath href="#circ">✦ BRIDAL ARTIST ✦ PMU TRAINER ✦ AWARD WINNER </textPath></text></svg>
            <Icon name="spark" size={22} />
          </motion.div>
        </div>
      </div>
      <motion.button className="scroll-cue" onClick={() => scrollTo('about')} initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 1.6 }} aria-label="Scroll down">
        <span /> Scroll
      </motion.button>
    </section>
  )
}

export function Marquee() {
  const row = [...marquee, ...marquee]
  return (
    <div className="ribbon">
      <div className="ribbon-track">{row.map((t, i) => <span key={i}>{t}</span>)}</div>
      <div className="ribbon-track rev">{row.map((t, i) => <span key={i}>{t}</span>)}</div>
    </div>
  )
}
