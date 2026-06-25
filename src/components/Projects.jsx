import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/projects'

const reduceMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Scatter positions for the floating chips — kept in the safe side margins,
// only shown on wide (xl+) screens so they never overlap the centered title.
const SPOTS = [
  { top: '17%', left: '4%', rot: -6 },
  { top: '19%', right: '5%', rot: 5 },
  { top: '50%', left: '1%', rot: 4 },
  { bottom: '19%', right: '3%', rot: -5 },
  { bottom: '17%', left: '5%', rot: 6 },
  { top: '52%', right: '1%', rot: -4 },
]

const container = {
  initial: {},
  animate: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
  exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
}

const item = {
  initial: { opacity: 0, y: 26, scale: 0.92, filter: 'blur(8px)' },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, y: -16, scale: 0.96, filter: 'blur(8px)', transition: { duration: 0.3 } },
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.41-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.42.36.8 1.08.8 2.18v3.23c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  )
}

function ProjectStage({ p, index }) {
  const scatter = [...p.highlights.slice(0, 4), ...p.tech.slice(0, 2)].slice(0, SPOTS.length)

  return (
    <>
      {/* Center composition */}
      <div className="absolute inset-0 grid place-items-center px-6">
        <motion.div
          variants={container}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative w-full max-w-3xl text-center"
        >
          <div
            className={`pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br ${p.accent} opacity-25 blur-[90px] dark:opacity-30`}
          />

          <motion.div
            variants={item}
            className="mb-3 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted sm:gap-3 sm:text-xs"
          >
            <span className="text-base font-bold text-ink sm:text-lg">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="h-px w-6 bg-ink/20 sm:w-8" />
            <span className="hidden sm:inline">{p.category}</span>
            {p.flag && (
              <span className="rounded-full bg-brand-500/15 px-2 py-0.5 text-brand-600 dark:text-brand-300">
                {p.flag}
              </span>
            )}
          </motion.div>

          <motion.h2
            variants={item}
            className="font-display text-4xl font-extrabold leading-[0.95] tracking-tight text-ink sm:text-6xl md:text-8xl"
          >
            {p.title}
          </motion.h2>

          <motion.p
            variants={item}
            className="mt-2 font-display text-base font-semibold text-gradient sm:mt-3 sm:text-2xl"
          >
            {p.subtitle}
          </motion.p>

          <motion.p
            variants={item}
            className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-ink-soft sm:mt-5 sm:text-base"
          >
            {p.description}
          </motion.p>

          {/* Inline highlights — cohesive block shown below xl (mobile/tablet/narrow windows) */}
          <motion.div variants={item} className="mt-4 flex flex-col items-center gap-3 xl:hidden">
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

          <motion.div
            variants={item}
            className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:mt-7"
          >
            {p.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="btn-primary px-4 py-2 text-xs sm:px-5 sm:py-2.5 sm:text-sm"
              >
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
        </motion.div>
      </div>

      {/* Scattered chips — wide desktop only (xl+), positioned in the side margins */}
      <div className="pointer-events-none absolute inset-0 hidden xl:block">
        {scatter.map((s, i) => {
          const spot = SPOTS[i % SPOTS.length]
          return (
            <motion.span
              key={i}
              variants={item}
              style={{
                position: 'absolute',
                top: spot.top,
                left: spot.left,
                right: spot.right,
                bottom: spot.bottom,
                rotate: `${spot.rot}deg`,
              }}
              className="max-w-[18rem] rounded-2xl border border-ink/15 bg-surface/90 px-5 py-3 text-sm font-semibold text-ink shadow-card backdrop-blur-md"
            >
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-brand-500 align-middle" />
              {s}
            </motion.span>
          )
        })}
      </div>
    </>
  )
}

function Showcase() {
  const sectionRef = useRef(null)
  const [active, setActive] = useState(0)
  const N = projects.length

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let raf = 0
    const update = () => {
      raf = 0
      const rect = section.getBoundingClientRect()
      const total = section.offsetHeight - window.innerHeight
      const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0
      setActive(Math.round(progress * (N - 1)))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [N])

  const p = projects[active]

  return (
    <section id="projects" ref={sectionRef} style={{ height: `${N * 100}vh` }} className="relative">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* HUD */}
        <div className="container-px pointer-events-none absolute inset-x-0 top-20 z-20 flex items-center justify-between sm:top-24">
          <div className="eyebrow">
            <span className="h-px w-8 bg-brand-500" /> Selected work
          </div>
          <div className="flex items-center gap-2 font-mono text-sm text-ink-muted sm:gap-3">
            <span className="text-base font-bold text-ink sm:text-lg">
              {String(active + 1).padStart(2, '0')}
            </span>
            <span>/</span>
            <span>{String(N).padStart(2, '0')}</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <ProjectStage key={active} p={p} index={active} />
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-x-0 bottom-3 z-10 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-ink-muted sm:text-[11px] sm:tracking-[0.3em]">
          Scroll for next ↻
        </div>
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
