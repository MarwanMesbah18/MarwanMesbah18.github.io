import { profile } from '../data/profile'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative border-t border-ink/5 py-10">
      <div className="container-px flex flex-col items-center justify-between gap-4 text-sm text-ink-muted md:flex-row">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-brand-400 to-brand-700 font-display text-xs font-extrabold text-white">
            MM
          </span>
          <span className="font-medium text-ink-soft">
            {profile.name} · © {year}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a href={profile.socials.github} target="_blank" rel="noreferrer" className="transition-colors hover:text-brand-600">
            GitHub
          </a>
          <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-brand-600">
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`} className="transition-colors hover:text-brand-600">
            Email
          </a>
        </div>

        <div className="font-mono text-xs">
          Built with React · Three.js · GSAP
        </div>
      </div>
    </footer>
  )
}
