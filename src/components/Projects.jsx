import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

const reduceMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Fixed scatter positions around the centered card (desktop only).
const SPOTS = [
  { top: '15%', left: '8%', rot: -6 },
  { top: '19%', right: '10%', rot: 5 },
  { top: '47%', left: '4%', rot: 4 },
  { bottom: '22%', right: '6%', rot: -5 },
  { bottom: '13%', left: '16%', rot: 6 },
  { top: '43%', right: '5%', rot: -4 },
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

function ProjectScene({ p, index, total }) {
  const scatter = [
    ...p.highlights.slice(0, 4),
    ...p.tech.slice(0, 2),
  ].slice(0, SPOTS.length)

  return (
    <>
      {/* Center composition */}
      <div className="absolute inset-0 grid place-items-center px-6">
        <motion.div
          key={p.id}
          variants={container}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative w-full max-w-3xl text-center"
        >
          {/* accent glow behind */}
          <div
            className={`pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br ${p.accent} opacity-25 blur-[90px] dark:opacity-30`}
          />

          <motion.div variants={item} className="mb-4 flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-ink-muted">
            <span className="text-lg font-bold text-ink">{String(index + 1).padStart(2, '0')}</span>
            <span className="h-px w-8 bg-ink/20" />
            <span>{p.category}</span>
            {p.flag && <span className="rounded-full bg-brand-500/15 px-2 py-0.5 text-brand-600 dark:text-brand-300">{p.flag}</span>}
          </motion.div>

          <motion.h2
            variants={item}
            className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-ink sm:text-7xl md:text-8xl"
          >
            {p.title}
          </motion.h2>

          <motion.p variants={item} className="mt-3 font-display text-lg font-semibold text-gradient sm:text-2xl">
            {p.subtitle}
          </motion.p>

          <motion.p variants={item} className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-ink-soft sm:text-base">
            {p.description}
          </motion.p>

          <motion.div variants={item} className="mt-7 flex flex-wrap items-center justify-center gap-2">
            {p.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="btn-primary px-5 py-2.5 text-sm">
                <GithubIcon />
                {l.label}
              </a>
            ))}
            {p.proprietary && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-surface/60 px-3 py-2 text-[11px] font-medium text-ink-muted">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                Code on request
              </span>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Scattered description chips (desktop only) */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={p.id + '-scatter'}
            variants={container}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0"
          >
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
                  className="max-w-[16rem] rounded-2xl border border-ink/10 bg-surface/60 px-4 py-2 text-xs font-medium text-ink-soft shadow-card backdrop-blur-md"
                >
                  <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-brand-500 align-middle" />
                  {s}
                </motion.span>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile details (stacked, no scatter) */}
      <div className="absolute inset-x-0 bottom-6 px-6 md:hidden">
        <div className="glass-card max-w-md p-4">
          <div className="flex flex-wrap gap-1.5">
            {p.tech.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default function Projects() {
  const sectionRef = useRef(null)
  const [active, setActive] = useState(0)
  const N = projects.length

  useEffect(() => {
    if (reduceMotion) return
    const section = sectionRef.current
    if (!section) return

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: () => '+=' + window.innerHeight * N,
      pin: true,
      scrub: 0.6,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      snap: 1 / (N - 1),
      onUpdate: (self) => setActive(Math.round(self.progress * (N - 1))),
    })

    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 350)
    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)

    return () => {
      clearTimeout(refreshTimer)
      window.removeEventListener('resize', onResize)
      st.kill()
    }
  }, [N])

  if (reduceMotion) {
    return (
      <section id="projects" className="section-pad">
        <div className="container-px">
          <h2 className="heading-lg mb-10">Projects</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((proj) => (
              <div key={proj.id} className="glass-card p-6">
                <h3 className="heading-md mt-1">{proj.title}</h3>
                <div className="text-brand-600">{proj.subtitle}</div>
                <p className="body-lead mt-3 text-sm">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  const p = projects[active]

  return (
    <section id="projects" ref={sectionRef} className="relative h-[100svh] w-full overflow-hidden">
      {/* Top HUD */}
      <div className="container-px pointer-events-none absolute inset-x-0 top-24 z-20 flex items-center justify-between">
        <div className="eyebrow">
          <span className="h-px w-8 bg-brand-500" /> Selected work
        </div>
        <div className="flex items-center gap-3 font-mono text-sm text-ink-muted">
          <span className="text-lg font-bold text-ink">{String(active + 1).padStart(2, '0')}</span>
          <span>/</span>
          <span>{String(N).padStart(2, '0')}</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <ProjectScene key={active} p={p} index={active} total={N} />
      </AnimatePresence>

      {/* Scroll hint */}
      <div className="pointer-events-none absolute inset-x-0 bottom-3 z-10 hidden text-center font-mono text-[11px] uppercase tracking-[0.3em] text-ink-muted md:block">
        Scroll for next ↻
      </div>
    </section>
  )
}
