import { profile } from '../data/profile'
import { useReveal } from '../hooks/useReveal'

export default function Contact() {
  const ref = useReveal()

  return (
    <section id="contact" ref={ref} className="section-pad relative">
      <div className="container-px">
        <div className="glass-card relative overflow-hidden p-8 text-center md:p-16">
          <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-brand-300/40 blur-3xl" />
          <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-indigo-300/40 blur-3xl" />
          <div className="absolute inset-0 bg-dot-grid opacity-40" />

          <div className="relative mx-auto max-w-2xl">
            <div data-reveal className="eyebrow mb-4 justify-center">
              <span className="h-px w-8 bg-brand-400" /> Contact
            </div>
            <h2 data-reveal className="heading-lg">
              Let&apos;s build something <span className="text-gradient">worth shipping.</span>
            </h2>
            <p data-reveal className="body-lead mt-4">
              I&apos;m open to internships, freelance AI &amp; full-stack work, and research collaborations. Have an idea or a
              role in mind? My inbox is always open.
            </p>

            <div data-reveal className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href={`mailto:${profile.email}`} className="btn-primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
                {profile.email}
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z"/></svg>
                LinkedIn
              </a>
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.41-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.42.36.8 1.08.8 2.18v3.23c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>
                GitHub
              </a>
            </div>

            <p data-reveal className="mt-8 text-sm text-ink-muted">
              Based in {profile.location} · Available worldwide (remote)
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
