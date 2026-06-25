import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '../data/profile'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

function RoleRotator() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % profile.roles.length), 2200)
    return () => clearInterval(t)
  }, [])
  return (
    <span className="relative inline-flex h-[1.4em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-gradient whitespace-nowrap font-extrabold"
        >
          {profile.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-[100svh] items-center pt-24">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container-px flex flex-col items-start"
      >
        <motion.div variants={item} className="eyebrow mb-6">
          <span className="h-px w-8 bg-brand-400" />
          Portfolio · 2026
        </motion.div>

        <motion.h1 variants={item} className="heading-xl max-w-4xl">
          Hi, I&apos;m {profile.name}. <br className="hidden sm:block" />
          I&apos;m a <RoleRotator />
        </motion.h1>

        <motion.p variants={item} className="body-lead mt-7 max-w-2xl">
          {profile.tagline}
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
          <a href="#projects" className="btn-primary">
            View my work
            <span aria-hidden>↓</span>
          </a>
          <a href="#contact" className="btn-ghost">
            Get in touch
          </a>
          <a href={profile.resume} target="_blank" rel="noreferrer" className="btn-ghost">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"/></svg>
            CV
          </a>
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            className="grid h-12 w-12 place-items-center rounded-full border border-ink/10 bg-surface/70 text-ink-soft transition-colors hover:border-brand-300 hover:text-brand-600"
            aria-label="GitHub"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.41-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.42.36.8 1.08.8 2.18v3.23c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="grid h-12 w-12 place-items-center rounded-full border border-ink/10 bg-surface/70 text-ink-soft transition-colors hover:border-brand-300 hover:text-brand-600"
            aria-label="LinkedIn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z"/></svg>
          </a>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-14 grid w-full max-w-xl grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {profile.highlights.map((h) => (
            <div key={h.label} className="glass-card px-4 py-3 text-center">
              <div className="font-display text-2xl font-extrabold text-gradient">{h.value}</div>
              <div className="mt-1 text-xs font-medium text-ink-muted">{h.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-medium text-ink-muted md:flex"
      >
        <span className="font-mono uppercase tracking-widest">Scroll</span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-ink/20 pt-1.5">
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="h-1.5 w-1 rounded-full bg-brand-500"
          />
        </span>
      </a>
    </section>
  )
}
