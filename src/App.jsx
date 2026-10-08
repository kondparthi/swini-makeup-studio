import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import Lenis from 'lenis'
import { Preloader, Cursor, Navbar, Floaters } from './components/Chrome'
import Hero, { Marquee } from './components/Hero'
import { About, Awards, Portfolio, Services, Academy, Testimonials, Contact, Footer } from './components/Sections'
import { scrollTo } from './components/ui'
import { News, Videos, Instagram } from './components/Media'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [service, setService] = useState('Bridal Makeup')
  const done = useCallback(() => setLoading(false), [])

  // buttery smooth scrolling
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    window.__lenis = lenis
    let raf
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); lenis.destroy(); window.__lenis = null }
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = loading ? 'hidden' : ''
    if (window.__lenis) loading ? window.__lenis.stop() : window.__lenis.start()
  }, [loading])

  const pick = (s) => { setService(s); scrollTo('contact') }

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{loading && <Preloader onDone={done} />}</AnimatePresence>
      <Cursor />
      <Navbar />
      <main>
        <Hero ready={!loading} />
        <Marquee />
        <About />
        <Awards />
        <News />
        <Portfolio />
        <Services onPick={pick} />
        <Academy onPick={pick} />
        <Videos />
        <Testimonials />
        <Instagram />
        <Contact service={service} setService={setService} />
      </main>
      <Footer />
      <Floaters />
    </MotionConfig>
  )
}
