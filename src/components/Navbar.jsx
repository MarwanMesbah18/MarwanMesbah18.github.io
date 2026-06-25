import { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import ThemeToggle from './ThemeToggle'

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 md:pt-4">
      <nav
        className={`group flex items-center gap-1 rounded-full border border-ink/10 bg-surface/70 shadow-card backdrop-blur-xl transition-all duration-500 ${
          scrolled ? 'h-12 px-2' : 'h-14 pl-3 pr-2'
        }`}
      >
        <a href="#home" className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 font-display text-xs font-extrabold text-white shadow-glow">
          MM
        </a>

        {/* Name — always visible on desktop */}
        <span className="hidden font-display text-sm font-semibold tracking-tight text-ink md:inline">
          {profile.name}
        </span>

        {/* Links — collapse on scroll, expand on hover (dynamic island) */}
        <div
          className={`hidden items-center gap-1 overflow-hidden whitespace-nowrap transition-all duration-500 md:flex ${
            scrolled
              ? 'max-w-0 opacity-0 group-hover:mx-1 group-hover:max-w-[40rem] group-hover:opacity-100'
              : 'mx-1 max-w-[40rem] opacity-100'
          }`}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-brand-500/10 hover:text-brand-600"
            >
              {l.label}
            </a>
          ))}
        </div>

        <ThemeToggle />

        <a
          href="#contact"
          className="hidden flex-shrink-0 items-center gap-2 rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-glow transition-all hover:bg-brand-600 sm:inline-flex"
        >
          Let&apos;s talk
        </a>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl border border-ink/10 bg-surface/70 md:hidden"
        >
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-5 bg-ink transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block h-0.5 w-5 bg-ink transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-5 bg-ink transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </div>
        </button>
      </nav>

      {open && (
        <div className="container-px absolute top-full left-0 right-0 md:hidden">
          <div className="mt-2 flex flex-col gap-1 rounded-2xl border border-ink/10 bg-surface/90 p-3 shadow-card backdrop-blur-xl">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-ink-soft hover:bg-brand-500/10 hover:text-brand-600"
              >
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-1 px-4 py-3 text-sm">
              Let&apos;s talk
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
