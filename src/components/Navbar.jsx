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
          scrolled ? 'h-12 px-2' : 'h-14 pl-2 pr-2'
        }`}
      >
        {/* MM logo — collapses on scroll, returns on hover (desktop) */}
        <a
          href="#home"
          className={`grid h-9 w-9 flex-shrink-0 place-items-center overflow-hidden whitespace-nowrap rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 font-display text-xs font-extrabold text-white shadow-glow transition-all duration-500 ${
            scrolled
              ? 'md:max-w-0 md:opacity-0 md:group-hover:ml-1 md:group-hover:max-w-[2.5rem] md:group-hover:opacity-100'
              : 'ml-1 max-w-[2.5rem] opacity-100'
          }`}
        >
          MM
        </a>

        {/* Name — ALWAYS visible on desktop (this is all that shows when scrolled) */}
        <span className="hidden whitespace-nowrap px-3 font-display text-sm font-semibold tracking-tight text-ink md:inline">
          {profile.name}
        </span>

        {/* Links — collapse on scroll, return on hover */}
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

        {/* Theme toggle — collapses on scroll, returns on hover */}
        <div
          className={`flex flex-shrink-0 items-center overflow-hidden whitespace-nowrap transition-all duration-500 ${
            scrolled
              ? 'md:max-w-0 md:opacity-0 md:group-hover:max-w-[2.75rem] md:group-hover:opacity-100'
              : 'max-w-[2.75rem] opacity-100'
          }`}
        >
          <ThemeToggle />
        </div>

        {/* CTA — collapses on scroll, returns on hover (desktop) */}
        <a
          href="#contact"
          className={`hidden flex-shrink-0 items-center gap-2 overflow-hidden whitespace-nowrap rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-glow transition-all duration-500 hover:bg-brand-600 md:inline-flex ${
            scrolled
              ? 'md:mr-1 md:max-w-0 md:opacity-0 md:group-hover:max-w-[9rem] md:group-hover:opacity-100'
              : 'mr-1 max-w-[9rem] opacity-100'
          }`}
        >
          Let&apos;s talk
        </a>

        {/* Mobile menu button */}
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
