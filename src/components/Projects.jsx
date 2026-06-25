import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/projects'
import { useLenis } from '../lib/lenisContext'

const reduceMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const HOLD_MS = 1000 // each project is "held" — inputs ignored for this long after a move

const container = {
  initial: {},
  animate: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
  exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
}

const item = {
  initial: { opacity: 0, y: 22, scale: 0.94, filter: 'blur(8px)' },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, y: -14, scale: 0.96, filter: 'blur(8px)', transition: { duration: 0.3 } },
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.41-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.42.36.8 1.08.8 2.18v3.23c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  )
}

function Chip({ text, rotate, align }) {
  return (
    <motion.span
      variants={item}
      style={{ rotate: `${rotate}deg`, alignSelf: align }}
      className="inline-block w-full max-w-[15rem] rounded-2xl border border-ink/15 bg-surface/90 px-4 py-2.5 text-xs font-semibold text-ink shadow-card backdrop-blur-md sm:text-sm"
    >
      <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-brand-500 align-middle" />
      {text}
    </motion.span>
  )
}

function ProjectStage({ p, index }) {
  // Split the highlight + tech snippets into two flanking columns (wide screens).
  const snippets = [...p.highlights.slice(0, 4), ...p.tech.slice(0, 2)]
  const left = snippets.slice(0, Math.ceil(snippets.length / 2))
  const right = snippets.slice(Math.ceil(snippets.length / 2))
  const rotL = [-4, 3, -3]
  const rotR = [3, -4, 4]

  return (
    <div className="absolute inset-0 flex items-center justify-center px-5 py-24 sm:px-6 sm:py-20">
      <motion.div
        variants={container}
        initial="initial"
        animate="animate"
        exit="exit"
        className="relative flex w-full max-w-6xl items-center justify-center gap-3 xl:gap-8"
      >
        {/* glow */}
        <div
          className={`pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br ${p.accent} opacity-20 blur-[90px] dark:opacity-25`}
        />

        {/* Left flank — wide screens only */}
        <div className="hidden w-48 flex-col gap-3 lg:flex xl:w-56">
          {left.map((s, i) => (
            <Chip key={i} text={s} rotate={rotL[i % rotL.length]} align={i % 2 ? 'self-start' : 'self-end'} />
          ))}
        </div>

        {/* Center card */}
        <div className="w-full max-w-3xl text-center lg:max-w-2xl">
          <motion.div
            variants={item}
            className="mb-2 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted sm:gap-3 sm:text-xs"
          >
            <span className="text-base font-bold text-ink sm:text-lg">{String(index + 1).padStart(2, '0')}</span>
            <span className="h-px w-6 bg-ink/20 sm:w-8" />
            <span className="hidden sm:inline">{p.category}</span>
            {p.flag && (
              <span className="rounded-full bg-brand-500/15 px-2 py-0.5 text-brand-600 dark:text-brand-300">{p.flag}</span>
            )}
          </motion.div>

          <motion.h2
            variants={item}
            className="font-display text-4xl font-extrabold leading-[0.98] tracking-tight text-ink sm:text-5xl md:text-6xl xl:text-7xl"
          >
            {p.title}
          </motion.h2>

          <motion.p variants={item} className="mt-2 font-display text-base font-semibold text-gradient sm:text-xl md:text-2xl">
            {p.subtitle}
          </motion.p>

          <motion.p
            variants={item}
            className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-ink-soft line-clamp-4 sm:mt-4 sm:text-sm md:line-clamp-none md:text-base"
          >
            {p.description}
          </motion.p>

          {/* Inline highlights — shown below lg (mobile / tablet / narrow windows) */}
          <motion.div variants={item} className="mt-4 flex flex-col items-center gap-3 lg:hidden">
            <ul className="grid max-w-md gap-1.5 text-left">
              {p.highlights.slice(0, 2).map((h, j) => (
                <li key={j} className="flex gap-2 text-[11px] text-ink-soft sm:text-sm">
                  <svg className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-brand-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="m5 12 5 5L20 7" />
                  </svg>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap justify-center gap-1.5">
              {p.tech.slice(0, 5).map((t) => (
                <span key={t} className="rounded-full border border-ink/10 bg-surface/70 px-2.5 py-1 text-[10px] font-medium text-ink-soft sm:text-xs">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div variants={item} className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:mt-6">
            {p.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="btn-primary px-4 py-2 text-xs sm:px-5 sm:py-2.5 sm:text-sm">
                <GithubIcon />
                {l.label}
              </a>
            ))}
            {p.proprietary && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-surface/60 px-3 py-2 text-[11px] font-medium text-ink-muted">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Code on request
              </span>
            )}
          </motion.div>
        </div>

        {/* Right flank — wide screens only */}
        <div className="hidden w-48 flex-col gap-3 lg:flex xl:w-56">
          {right.map((s, i) => (
            <Chip key={i} text={s} rotate={rotR[i % rotR.length]} align={i % 2 ? 'self-end' : 'self-start'} />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

function Showcase() {
  const sectionRef = useRef(null)
  const lenis = useLenis()
  const [active, setActive] = useState(0)
  const N = projects.length
  const stateRef = useRef({ active: 0, locked: false, lastNav: 0, exiting: false })

  useEffect(() => {
    stateRef.current.active = active
  }, [active])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const navigate = (dir) => {
      const s = stateRef.current
      const now = Date.now()
      if (now - s.lastNav < HOLD_MS) return // hold: ignore inputs within HOLD_MS

      const next = s.active + dir
      if (next < 0 || next > N - 1) {
        if (s.exiting) return
        s.exiting = true
        s.locked = false
        if (lenis) {
          lenis.start()
          const target = dir > 0 ? section.nextElementSibling : section.previousElementSibling
          if (target) lenis.scrollTo(target, { offset: 0, duration: 1 })
        }
        setTimeout(() => {
          s.exiting = false
        }, 900)
        return
      }

      s.lastNav = now
      setActive(next)
    }

    const onWheel = (e) => {
      if (!stateRef.current.locked) return
      e.preventDefault()
      if (Math.abs(e.deltaY) < 6) return
      navigate(e.deltaY > 0 ? 1 : -1)
    }

    let touchStartY = null
    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }
    const onTouchMove = (e) => {
      if (stateRef.current.locked && touchStartY != null) e.preventDefault()
    }
    const onTouchEnd = (e) => {
      if (!stateRef.current.locked || touchStartY == null) return
      const dy = touchStartY - e.changedTouches[0].clientY
      if (Math.abs(dy) > 35) navigate(dy > 0 ? 1 : -1)
      touchStartY = null
    }

    const onKey = (e) => {
      if (!stateRef.current.locked) return
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault()
        navigate(1)
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault()
        navigate(-1)
      }
    }

    const onAnchorClickCapture = (e) => {
      if (!stateRef.current.locked) return
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      stateRef.current.locked = false
      if (lenis) lenis.start()
    }

    const io = new IntersectionObserver(
      (entries) => {
        const s = stateRef.current
        const entry = entries[0]
        if (entry.intersectionRatio >= 0.85 && !s.exiting) {
          if (!s.locked) {
            s.locked = true
            s.lastNav = 0
            if (lenis) lenis.stop()
          }
        }
      },
      { threshold: [0, 0.5, 0.85, 1] },
    )
    io.observe(section)

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: false })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd, { passive: false })
    window.addEventListener('keydown', onKey)
    document.addEventListener('click', onAnchorClickCapture, true)

    return () => {
      io.disconnect()
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onAnchorClickCapture, true)
    }
  }, [lenis, N])

  const p = projects[active]

  return (
    <section id="projects" ref={sectionRef} className="relative h-[100svh] w-full overflow-hidden">
      <div className="container-px pointer-events-none absolute inset-x-0 top-20 z-20 flex items-center justify-between sm:top-24">
        <div className="eyebrow">
          <span className="h-px w-8 bg-brand-500" /> Selected work
        </div>
        <div className="flex items-center gap-2 font-mono text-sm text-ink-muted sm:gap-3">
          <span className="text-base font-bold text-ink sm:text-lg">{String(active + 1).padStart(2, '0')}</span>
          <span>/</span>
          <span>{String(N).padStart(2, '0')}</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <ProjectStage key={active} p={p} index={active} />
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center gap-1.5">
        {projects.map((pr, i) => (
          <span
            key={pr.id}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? 'w-6 bg-brand-500' : 'w-1.5 bg-ink/20'
            }`}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-2 z-10 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-ink-muted sm:text-[11px] sm:tracking-[0.3em]">
        Scroll / swipe for next ↻
      </div>
    </section>
  )
}

function MobileList() {
  return (
    <section id="projects" className="section-pad">
      <div className="container-px">
        <div className="mb-10 max-w-2xl">
          <div className="eyebrow mb-4">
            <span className="h-px w-8 bg-brand-500" /> Selected work
          </div>
          <h2 className="heading-lg">
            Projects &amp; products I&apos;ve <span className="text-gradient">built.</span>
          </h2>
        </div>
        <div className="flex flex-col gap-5">
          {projects.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between font-mono text-xs text-ink-muted">
                <span className="text-sm font-bold text-ink">{String(i + 1).padStart(2, '0')}</span>
                <span>{p.category}</span>
              </div>
              <h3 className="heading-md mt-3">{p.title}</h3>
              <p className="mt-1 font-medium text-brand-600 dark:text-brand-300">{p.subtitle}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{p.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                {p.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="btn-primary px-4 py-2 text-xs">
                    <GithubIcon />
                    {l.label}
                  </a>
                ))}
                {p.proprietary && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-surface/60 px-3 py-2 text-[11px] font-medium text-ink-muted">
                    Code on request
                  </span>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Projects() {
  return reduceMotion ? <MobileList /> : <Showcase />
}
