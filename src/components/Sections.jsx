import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { site, roles, awards, awardMoments, portfolio, filters, services, courses, testimonials, nav } from '../data'
import { Reveal, SplitText, Eyebrow, Tilt, Icon, Magnetic, scrollTo, WhatsAppIcon } from './ui'
import { AwardMoments } from './Media'

const ease = [0.22, 1, 0.36, 1]

/* ════════════ LIGHTBOX ════════════ */
export function Lightbox({ list, index, onClose, setIndex }) {
  useEffect(() => {
    if (index === null) return
    const k = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setIndex((index + 1) % list.length)
      if (e.key === 'ArrowLeft') setIndex((index - 1 + list.length) % list.length)
    }
    window.addEventListener('keydown', k); document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [index, list, onClose, setIndex])
  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div className="lb" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <AnimatePresence mode="wait">
            <motion.figure key={list[index].img} initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4, ease }} onClick={(e) => e.stopPropagation()}>
              <img src={`images/${list[index].img}`} alt={list[index].title} />
              <figcaption>{list[index].title}<span>{index + 1} / {list.length}</span></figcaption>
            </motion.figure>
          </AnimatePresence>
          <button className="lb-btn lb-x" onClick={onClose} aria-label="Close"><Icon name="close" /></button>
          <button className="lb-btn lb-l" onClick={(e) => { e.stopPropagation(); setIndex((index - 1 + list.length) % list.length) }} aria-label="Previous"><Icon name="left" /></button>
          <button className="lb-btn lb-r" onClick={(e) => { e.stopPropagation(); setIndex((index + 1) % list.length) }} aria-label="Next"><Icon name="right" /></button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ════════════ ABOUT / SELF INTRO ════════════ */
export function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const frameY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const highlights = [
    { icon: 'heart', t: 'Personalised Looks', d: 'Planned around your skin, outfit & jewellery' },
    { icon: 'cert', t: 'Certified PMU Artist', d: 'Brows, lips & beauty-spot specialist' },
    { icon: 'users', t: 'Trainer & Mentor', d: 'Shaping the next generation of artists' },
  ]
  return (
    <section id="about" className="about" ref={ref}>
      <div className="wrap about-grid">
        <div className="about-img">
          <motion.div className="about-frame" style={{ y: frameY }} />
          <div className="about-main">
            <motion.img src="images/founder.jpg" alt={`${site.owner}, founder of Swini Makeup Studio`} style={{ y: imgY, scale: 1.18 }} />
            <motion.span className="curtain" initial={{ scaleX: 1 }} whileInView={{ scaleX: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }} />
          </div>
          <motion.div className="about-sig" initial={{ opacity: 0, y: 40, rotate: -4 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true }} transition={{ delay: 0.8, duration: 0.8, type: 'spring' }}>
            <b>{site.owner}</b><small>Founder &amp; Lead Artist</small>
          </motion.div>
          <motion.div className="about-years" initial={{ scale: 0, rotate: -90 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ delay: 1, type: 'spring', stiffness: 120 }}>
            <b>6+</b><small>Awards</small>
          </motion.div>
        </div>
        <div className="about-text">
          <Eyebrow>Meet the Artist</Eyebrow>
          <SplitText text="Hello, I'm *Manikeshwari*" />
          <Reveal delay={0.1}><p>I'm {site.ownerFull}, founder of Swini Makeup Studio in Zaheerabad. For me, makeup isn't about changing who you are — it's about bringing out the most confident, radiant version of you on the days that matter most.</p></Reveal>
          <Reveal delay={0.2}><p>From traditional Telugu bridal looks to soft modern glam, every look I create is planned around your skin, your outfit, your jewellery and your story. Alongside working with brides, I train the next generation of artists through hands-on masterclasses and professional permanent makeup (PMU) courses.</p></Reveal>
          <motion.div className="roles" initial="h" whileInView="s" viewport={{ once: true }} transition={{ staggerChildren: 0.08, delayChildren: 0.3 }}>
            {roles.map((r) => <motion.span key={r} variants={{ h: { opacity: 0, scale: 0.6 }, s: { opacity: 1, scale: 1 } }} transition={{ type: 'spring', stiffness: 260, damping: 18 }}>{r}</motion.span>)}
          </motion.div>
          <Reveal delay={0.3}><blockquote className="about-quote">“Every face has its own beauty — my job is to let it shine.”</blockquote></Reveal>
        </div>
      </div>
      <div className="wrap hl-grid">
        {highlights.map((h, i) => (
          <Reveal key={h.t} delay={i * 0.12} className="hl">
            <span className="hl-ic"><Icon name={h.icon} /></span>
            <div><b>{h.t}</b><small>{h.d}</small></div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ════════════ AWARDS ════════════ */
export function Awards() {
  const [idx, setIdx] = useState(null)
  const [mIdx, setMIdx] = useState(null)
  const list = awards.map((a) => ({ img: a.img, title: a.title }))
  const mList = awardMoments.filter((m) => m.type === 'image').map((m) => ({ img: m.img, title: m.title }))
  return (
    <section className="awards dark" id="awards">
      <div className="awards-bg" aria-hidden="true">AWARDS</div>
      <div className="wrap">
        <div className="center">
          <Eyebrow center>Recognition</Eyebrow>
          <SplitText text="Awards & *Achievements*" className="light" />
          <Reveal delay={0.1}><p className="lead">Honoured by leading beauty associations and business forums across Telangana for excellence in makeup artistry.</p></Reveal>
        </div>
        <div className="award-grid">
          {awards.map((a, i) => (
            <motion.div key={a.title} initial={{ opacity: 0, y: 80, rotateX: 25 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ delay: i * 0.12, duration: 1, ease }}>
              <Tilt className="award" onClick={() => setIdx(i)}>
                <div className="award-thumb"><img src={`images/${a.img}`} alt={a.title} loading="lazy" /><span className="zoom">View</span></div>
                <div className="award-info"><span className="by">{a.by}</span><h3>{a.title}</h3><p>{a.sub}</p></div>
              </Tilt>
            </motion.div>
          ))}
        </div>
        <AwardMoments onOpen={(img) => setMIdx(mList.findIndex((m) => m.img === img))} />
      </div>
      <Lightbox list={list} index={idx} setIndex={setIdx} onClose={() => setIdx(null)} />
      <Lightbox list={mList} index={mIdx} setIndex={setMIdx} onClose={() => setMIdx(null)} />
    </section>
  )
}

/* ════════════ PORTFOLIO ════════════ */
export function Portfolio() {
  const [f, setF] = useState('all')
  const [idx, setIdx] = useState(null)
  const shown = portfolio.filter((p) => f === 'all' || p.cat === f)
  return (
    <section id="portfolio" className="portfolio">
      <div className="wrap">
        <div className="center">
          <Eyebrow center>Portfolio</Eyebrow>
          <SplitText text="Looks we've *created*" />
          <Reveal delay={0.1}><p className="lead">A glimpse of our brides, engagement looks, classic glam and permanent makeup work.</p></Reveal>
        </div>
        <Reveal className="filters" delay={0.15}>
          {filters.map(([k, l]) => (
            <button key={k} className={f === k ? 'on' : ''} onClick={() => setF(k)}>
              {f === k && <motion.span layoutId="filterpill" className="pill" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
              <span className="lbl">{l}</span>
            </button>
          ))}
        </Reveal>
        <motion.div layout className="gallery">
          <AnimatePresence mode="popLayout">
            {shown.map((p, i) => (
              <motion.div layout key={p.img} className={`g-item ${f === 'all' ? p.size : ''}`}
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: i * 0.04, ease }} onClick={() => setIdx(i)}>
                <motion.img src={`images/${p.img}`} alt={p.title} loading="lazy" whileHover={{ scale: 1.08 }} transition={{ duration: 0.8 }} />
                <div className="g-cap"><small>{filters.find((x) => x[0] === p.cat)[1]}</small><b>{p.title}</b></div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        <Reveal className="center" delay={0.1}>
          <Magnetic><a href={site.social.instagram} target="_blank" rel="noopener" className="btn btn-dark" style={{ marginTop: 44 }}><Icon name="insta" size={18} /> See more on Instagram</a></Magnetic>
        </Reveal>
      </div>
      <Lightbox list={shown} index={idx} setIndex={setIdx} onClose={() => setIdx(null)} />
    </section>
  )
}

/* ════════════ SERVICES ════════════ */
export function Services({ onPick }) {
  return (
    <section id="services" className="services">
      <div className="wrap">
        <div className="svc-head">
          <div>
            <Eyebrow>Our Services</Eyebrow>
            <SplitText text="Makeover & *Hairstyling*" />
          </div>
          <Reveal delay={0.1}><p className="lead">Premium products and a look designed only for you — at the studio or at your venue.</p></Reveal>
        </div>
        <div className="svc-grid">
          {services.map((s, i) => (
            <motion.article key={s.title} className="svc" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: (i % 3) * 0.12, duration: 0.9, ease }} whileHover="hov">
              <span className="svc-num">0{i + 1}</span>
              <motion.span className="svc-ic" variants={{ hov: { rotate: 360, scale: 1.1 } }} transition={{ duration: 0.8 }}><Icon name={s.icon} size={26} /></motion.span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <ul>{s.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
              <button className="svc-link" onClick={() => onPick(s.title)}>Book this <Icon name="arrow" size={16} /></button>
              <motion.span className="svc-shine" variants={{ hov: { x: '220%' } }} initial={{ x: '-120%' }} transition={{ duration: 0.9 }} />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ════════════ ACADEMY ════════════ */
export function Academy({ onPick }) {
  const [tab, setTab] = useState(0)
  const [poster, setPoster] = useState(null)
  const c = courses[tab]
  return (
    <section id="academy" className="academy dark">
      <div className="wrap acad-grid">
        <div>
          <Eyebrow>Swini Academy</Eyebrow>
          <SplitText text="Learn from an *award-winning* artist" className="light" />
          <Reveal delay={0.1}><p className="lead">Turn your passion into a profession. Practical, small-batch training with real practice and lifetime mentorship.</p></Reveal>

          <Reveal delay={0.2} className="tabs">
            {courses.map((x, i) => (
              <button key={x.title} className={tab === i ? 'on' : ''} onClick={() => setTab(i)}>
                {tab === i && <motion.span layoutId="tabpill" className="pill" />}<span className="lbl">{x.title}</span>
              </button>
            ))}
          </Reveal>

          <AnimatePresence mode="wait">
            <motion.div key={c.title} className="course" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.45, ease }}>
              <div className="course-head"><h3>{c.title}</h3><span className="tag">{c.tag}</span></div>
              <p>{c.text}</p>
              <small className="ylw">You will learn</small>
              <motion.div className="chips" initial="h" animate="s" transition={{ staggerChildren: 0.04, delayChildren: 0.15 }}>
                {c.modules.map((m) => <motion.span key={m} variants={{ h: { opacity: 0, y: 14 }, s: { opacity: 1, y: 0 } }}>✦ {m}</motion.span>)}
              </motion.div>
              {c.poster && (
                <button className="course-poster" onClick={() => setPoster(0)}>
                  <img src={`images/${c.poster}`} alt={`${c.title} poster`} />
                  <span>View workshop poster <Icon name="arrow" size={14} /></span>
                </button>
              )}
            </motion.div>
          </AnimatePresence>

          <Reveal delay={0.2} className="acad-foot">
            <span className="partner">In association with <b>Rajini Aesthetic &amp; PMU Academy</b></span>
            <Magnetic><button className="btn btn-gold" onClick={() => onPick('Academy Training')}>Enquire About Courses <Icon name="arrow" size={18} /></button></Magnetic>
          </Reveal>
        </div>

        <div className="acad-visual">
          <motion.div className="orbit" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}><span /><span /><span /></motion.div>
          <motion.figure className="av1" initial={{ scale: 0, rotate: -30 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 80, damping: 14 }}>
            <img src="images/pmu-brows.jpg" alt="Microblading training" loading="lazy" />
          </motion.figure>
          <motion.figure className="av2" initial={{ scale: 0, rotate: 30 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ delay: 0.25, type: 'spring', stiffness: 80, damping: 14 }}>
            <img src="images/pmu-lips.jpg" alt="Lip tint training" loading="lazy" />
          </motion.figure>
          <motion.div className="acad-perks" initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.8, ease }}>
            <Icon name="cert" size={28} />
            <b>Certificate on completion</b>
            <small>Small batches · Real practice · Career guidance</small>
          </motion.div>
        </div>
      </div>
      <Lightbox list={c.poster ? [{ img: c.poster, title: c.title }] : []} index={c.poster ? poster : null} setIndex={setPoster} onClose={() => setPoster(null)} />
    </section>
  )
}

/* ════════════ TESTIMONIALS ════════════ */
export function Testimonials() {
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const n = testimonials.length
  const go = (d) => { setDir(d); setI((x) => (x + d + n) % n) }
  useEffect(() => { const t = setInterval(() => go(1), 5500); return () => clearInterval(t) }, [i])
  const t = testimonials[i]
  return (
    <section id="testimonials" className="testimonials">
      <div className="wrap">
        <div className="center">
          <Eyebrow center>Testimonials</Eyebrow>
          <SplitText text="Kind words from our *brides*" />
        </div>
        <Reveal className="t-stage" delay={0.1}>
          <span className="t-quote">“</span>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={i} className="t-card" custom={dir}
              initial={{ opacity: 0, x: dir * 80, filter: 'blur(8px)' }} animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, x: dir * -80, filter: 'blur(8px)' }}
              transition={{ duration: 0.6, ease }} drag="x" dragConstraints={{ left: 0, right: 0 }} onDragEnd={(e, info) => { if (info.offset.x < -60) go(1); else if (info.offset.x > 60) go(-1) }}>
              <div className="stars">{'★★★★★'.split('').map((s, k) => <motion.span key={k} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + k * 0.07, type: 'spring' }}>{s}</motion.span>)}</div>
              <p>{t.text}</p>
              <div className="who"><span className="av">{t.name.replace(/[[\]]/g, '')[0]}</span><div><b>{t.name}</b><small>{t.role}</small></div></div>
            </motion.div>
          </AnimatePresence>
          <div className="t-nav">
            <button onClick={() => go(-1)} aria-label="Previous"><Icon name="left" size={20} /></button>
            <div className="dots">{testimonials.map((_, k) => <button key={k} className={k === i ? 'on' : ''} onClick={() => { setDir(k > i ? 1 : -1); setI(k) }} aria-label={`Review ${k + 1}`} />)}</div>
            <button onClick={() => go(1)} aria-label="Next"><Icon name="right" size={20} /></button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ════════════ CONTACT ════════════ */
export function Contact({ service, setService }) {
  const [form, setForm] = useState({ name: '', phone: '', date: '', msg: '' })
  const [sent, setSent] = useState(false)
  const opts = [...services.map((s) => s.title), 'Academy Training']
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    const text = `Hi Swini Makeup Studio,\n\nName: ${form.name}\nPhone: ${form.phone}\nService: ${service}\nEvent Date: ${form.date || '-'}\nMessage: ${form.msg || '-'}`
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`, '_blank')
    setSent(true); setTimeout(() => setSent(false), 4000)
  }
  const info = [
    { icon: 'phone', l: 'Call / WhatsApp', v: <a href={`tel:+91${site.phone}`}>{site.phoneDisplay}</a> },
    { icon: 'pin', l: 'Studio', v: site.address },
    { icon: 'clock', l: 'Timings', v: <>{site.timings}<br />Early-morning bridal bookings available</> },
  ]
  return (
    <section id="contact" className="contact">
      <div className="wrap">
        <div className="center">
          <Eyebrow center>Contact Us</Eyebrow>
          <SplitText text="Let's create your *look*" />
          <Reveal delay={0.1}><p className="lead">Dates fill up fast during wedding season — reach out early to reserve your slot.</p></Reveal>
        </div>
        <motion.div className="contact-grid" initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 1, ease }}>
          <div className="c-info">
            <h3>Swini Makeup Studio</h3>
            {info.map((x, k) => (
              <motion.div key={x.l} className="c-item" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + k * 0.12 }}>
                <span className="ic"><Icon name={x.icon} size={20} /></span>
                <div><small>{x.l}</small><span>{x.v}</span></div>
              </motion.div>
            ))}
            <div className="map"><iframe title="Studio location" loading="lazy" src={`https://maps.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&z=15&output=embed`} /></div>
          </div>
          <form onSubmit={submit}>
            <h3>Book an Appointment</h3>
            <p className="note">Fill in your details — we'll open WhatsApp with your message ready to send.</p>
            <div className="fl"><input id="nm" required placeholder=" " value={form.name} onChange={set('name')} /><label htmlFor="nm">Your Name</label></div>
            <div className="fl"><input id="ph" type="tel" required placeholder=" " pattern="[0-9+ ]{10,14}" value={form.phone} onChange={set('phone')} /><label htmlFor="ph">Phone Number</label></div>
            <div className="fl"><select id="sv" value={service} onChange={(e) => setService(e.target.value)}>{opts.map((o) => <option key={o}>{o}</option>)}</select><label htmlFor="sv" className="up">Service</label></div>
            <div className="fl"><input id="dt" type="date" value={form.date} onChange={set('date')} /><label htmlFor="dt" className="up">Event Date</label></div>
            <div className="fl full"><textarea id="ms" placeholder=" " value={form.msg} onChange={set('msg')} /><label htmlFor="ms">Venue, number of people, look you have in mind…</label></div>
            <Magnetic strength={0.15}>
              <button className="btn btn-gold btn-full" type="submit">
                <AnimatePresence mode="wait">
                  {sent
                    ? <motion.span key="ok" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}>✓ Opening WhatsApp…</motion.span>
                    : <motion.span key="go" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} style={{ display: 'inline-flex', gap: 10, alignItems: 'center' }}><WhatsAppIcon size={18} /> Send via WhatsApp</motion.span>}
                </AnimatePresence>
              </button>
            </Magnetic>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

/* ════════════ FOOTER ════════════ */
export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="f-cta">
          <SplitText text="Ready to *shine* on your big day?" as="h2" className="light" />
          <Reveal delay={0.2}><Magnetic><button className="btn btn-gold" onClick={() => scrollTo('contact')}>Book Your Date <Icon name="arrow" size={18} /></button></Magnetic></Reveal>
        </div>
        <div className="f-grid">
          <div>
            <button className="logo" onClick={() => scrollTo('home')}><span className="logo-mark">S</span><span><b>Swini</b><small>Makeup Studio</small></span></button>
            <p>Award-winning bridal makeup, hairstyling and beauty academy by {site.owner}, Zaheerabad.</p>
            <div className="socials">
              <a href={site.social.instagram} target="_blank" rel="noopener" aria-label="Instagram"><Icon name="insta" size={18} /></a>
              <a href={site.social.threads} target="_blank" rel="noopener" aria-label="Threads"><Icon name="threads" size={18} /></a>
              <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener" aria-label="WhatsApp"><WhatsAppIcon size={18} /></a>
            </div>
          </div>
          <div><h4>Explore</h4><ul>{nav.slice(1).map(([id, l]) => <li key={id}><button onClick={() => scrollTo(id)}>{l}</button></li>)}</ul></div>
          <div><h4>Services</h4><ul>{services.slice(0, 5).map((s) => <li key={s.title}><button onClick={() => scrollTo('services')}>{s.title}</button></li>)}</ul></div>
          <div><h4>Visit Us</h4><ul><li>{site.address}</li><li><a href={`tel:+91${site.phone}`}>{site.phoneDisplay}</a></li><li>{site.timings}</li></ul></div>
        </div>
        <div className="f-big" aria-hidden="true">Swini</div>
        <div className="copy"><span>© {new Date().getFullYear()} Swini Makeup Studio. All rights reserved.</span><span>Designed by Keyblocks Strategy Consulting</span></div>
      </div>
    </footer>
  )
}
