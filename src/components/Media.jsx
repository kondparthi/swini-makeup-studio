import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { site, awardMoments, news, videos, instagramPosts, instagramGrid } from '../data'
import { Reveal, SplitText, Eyebrow, Icon, Magnetic, Tilt } from './ui'

const ease = [0.22, 1, 0.36, 1]

/* ── Vertical reel player: autoplays muted when on screen, tap to unmute / pause ── */
export function Reel({ src, poster, title, sub, className = '' }) {
  const ref = useRef(null)
  const wrap = useRef(null)
  const inView = useInView(wrap, { amount: 0.5 })
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [prog, setProg] = useState(0)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (inView) v.play().then(() => setPlaying(true)).catch(() => {})
    else { v.pause(); setPlaying(false) }
  }, [inView])

  const toggle = () => {
    const v = ref.current
    if (v.paused) { v.play(); setPlaying(true) } else { v.pause(); setPlaying(false) }
  }
  const sound = (e) => {
    e.stopPropagation()
    ref.current.muted = !muted
    setMuted(!muted)
    if (ref.current.paused) { ref.current.play(); setPlaying(true) }
  }

  return (
    <div ref={wrap} className={`reel ${className}`} onClick={toggle}>
      <video ref={ref} src={src} poster={poster} muted={muted} loop playsInline preload="metadata"
        onTimeUpdate={(e) => setProg(e.target.currentTime / (e.target.duration || 1))} />
      <div className="reel-shade" />
      <div className="reel-bar"><span style={{ transform: `scaleX(${prog})` }} /></div>
      <AnimatePresence>
        {!playing && (
          <motion.span className="reel-play" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.4, opacity: 0 }}>
            <Icon name="play" size={30} />
          </motion.span>
        )}
      </AnimatePresence>
      <button className="reel-sound" onClick={sound} aria-label={muted ? 'Unmute' : 'Mute'}><Icon name={muted ? 'mute' : 'sound'} size={18} /></button>
      <div className="reel-cap"><b>{title}</b><small>{sub}</small></div>
    </div>
  )
}

/* ── Award photos + award video strip (inside the Awards section) ── */
export function AwardMoments({ onOpen }) {
  return (
    <div className="moments">
      <Reveal className="moments-head" y={20}>
        <span className="eyebrow">Moments on stage</span>
      </Reveal>
      <div className="moments-grid">
        {awardMoments.map((m, i) => (
          <motion.div key={m.title} className={`moment ${m.type}`} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ delay: i * 0.12, duration: 0.9, ease }}>
            {m.type === 'video'
              ? <Reel src={m.src} poster={m.poster} title={m.title} sub={m.sub} />
              : (
                <div className="moment-img" onClick={() => onOpen(m.img)}>
                  <img src={`images/${m.img}`} alt={m.title} loading="lazy" />
                  <div className="reel-cap"><b>{m.title}</b><small>{m.sub}</small></div>
                </div>
              )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ── IN THE NEWS ── */
export function News() {
  return (
    <section id="news" className="news">
      <div className="wrap">
        <div className="center">
          <Eyebrow center>In the News</Eyebrow>
          <SplitText text="Featured in the *press*" />
          <Reveal delay={0.1}><p className="lead">Swini Makeup Studio's recognition at the Telangana Business Excellence Awards 2024 was covered by national media.</p></Reveal>
        </div>
        <div className="news-grid">
          {news.map((n, i) => (
            <motion.a key={n.url} href={n.url} target="_blank" rel="noopener" className="news-card"
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: i * 0.1, duration: 0.8, ease }} whileHover={{ y: -8 }}>
              <div className="news-top">
                <span className="news-outlet"><Icon name={n.outlet === 'Threads' ? 'threads' : 'news'} size={18} />{n.outlet}</span>
                {n.date && <span className="news-date">{n.date}</span>}
              </div>
              <h3>{n.title}</h3>
              <p>{n.text}</p>
              <span className="news-link">Read {n.outlet === 'Threads' ? 'post' : 'article'} <Icon name="external" size={15} /></span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── VIDEOS ── */
export function Videos() {
  return (
    <section id="videos" className="videos dark">
      <div className="wrap videos-grid">
        <div>
          <Eyebrow>Watch</Eyebrow>
          <SplitText text="Behind the *brush*" className="light" />
          <Reveal delay={0.1}><p className="lead">From live classes with our academy students to award nights — a glimpse of life at Swini. Tap a video to play or pause, and use the speaker for sound.</p></Reveal>
          <Reveal delay={0.2}>
            <Magnetic><a className="btn btn-line" href={site.social.instagram} target="_blank" rel="noopener" style={{ marginTop: 30 }}><Icon name="insta" size={18} /> More reels on Instagram</a></Magnetic>
          </Reveal>
        </div>
        <div className="reels">
          {videos.map((v, i) => (
            <motion.div key={v.src} initial={{ opacity: 0, y: 80, rotate: i ? 4 : -4 }} whileInView={{ opacity: 1, y: 0, rotate: i ? 2 : -2 }} viewport={{ once: true, margin: '-60px' }} transition={{ delay: i * 0.15, duration: 1, ease }} className={i ? 'reel-wrap down' : 'reel-wrap'}>
              <Reel {...v} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── INSTAGRAM ── */
function InstagramEmbeds() {
  useEffect(() => {
    const run = () => window.instgrm && window.instgrm.Embeds.process()
    if (window.instgrm) return run()
    const s = document.createElement('script')
    s.src = 'https://www.instagram.com/embed.js'; s.async = true; s.onload = run
    document.body.appendChild(s)
  }, [])
  return (
    <div className="ig-embeds">
      {instagramPosts.map((url) => (
        <blockquote key={url} className="instagram-media" data-instgrm-permalink={url} data-instgrm-version="14" />
      ))}
    </div>
  )
}

export function Instagram() {
  return (
    <section id="instagram" className="instagram">
      <div className="wrap">
        <div className="ig-head">
          <div>
            <Eyebrow>Follow Us</Eyebrow>
            <SplitText text="Life at *Swini*" />
          </div>
          <Reveal delay={0.1} className="ig-follow">
            <a href={site.social.instagram} target="_blank" rel="noopener" className="ig-handle">
              <span className="ig-ring"><span>S</span></span>
              <span><b>{site.instagramHandle}</b><small>Instagram · Threads</small></span>
            </a>
            <div className="ig-btns">
              <Magnetic><a href={site.social.instagram} target="_blank" rel="noopener" className="btn btn-gold btn-sm"><Icon name="insta" size={16} /> Follow</a></Magnetic>
              <Magnetic><a href={site.social.threads} target="_blank" rel="noopener" className="btn btn-dark btn-sm"><Icon name="threads" size={16} /> Threads</a></Magnetic>
            </div>
          </Reveal>
        </div>

        {instagramPosts.length > 0 ? <InstagramEmbeds /> : (
          <div className="ig-grid">
            {instagramGrid.map((img, i) => (
              <motion.a key={img} href={site.social.instagram} target="_blank" rel="noopener" className="ig-item"
                initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: (i % 4) * 0.08, duration: 0.7, ease }}>
                <img src={`images/${img}`} alt="Swini Makeup Studio on Instagram" loading="lazy" />
                <span className="ig-over"><Icon name="insta" size={30} /></span>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}


