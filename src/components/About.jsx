import { profile, languages } from '../data/profile'
import { useReveal } from '../hooks/useReveal'

export default function About() {
  const ref = useReveal()

  return (
    <section id="about" ref={ref} className="section-pad relative">
      <div className="container-px">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Portrait */}
          <div data-reveal className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-300/50 to-indigo-300/40 blur-2xl" />
            <div className="glass-card overflow-hidden rounded-[1.75rem] p-2">
              <img
                src={profile.avatar}
                alt={profile.name}
                loading="lazy"
                className="aspect-[4/5] w-full rounded-[1.4rem] object-cover"
              />
            </div>
            <div className="glass-card absolute -bottom-5 -right-3 flex items-center gap-2 px-4 py-2 text-sm font-semibold text-ink">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              Open to opportunities
            </div>
          </div>

          {/* Text */}
          <div>
            <div data-reveal className="eyebrow mb-4">
              <span className="h-px w-8 bg-brand-400" /> About me
            </div>
            <h2 data-reveal className="heading-lg mb-6">
              Turning complex problems into <span className="text-gradient">shipped, working software.</span>
            </h2>

            <div className="space-y-4">
              {profile.about.map((p, i) => (
                <p key={i} data-reveal className="body-lead">
                  {p}
                </p>
              ))}
            </div>

            <div data-reveal className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="glass-card p-4">
                <div className="text-xs font-medium uppercase tracking-wider text-ink-muted">Based in</div>
                <div className="mt-1 font-semibold text-ink">{profile.location}</div>
              </div>
              <div className="glass-card p-4">
                <div className="text-xs font-medium uppercase tracking-wider text-ink-muted">Education</div>
                <div className="mt-1 font-semibold text-ink">B.Sc. Computer Science · AAST</div>
              </div>
            </div>

            <div data-reveal className="mt-6 flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-ink-muted">Languages:</span>
              {languages.map((l) => (
                <span key={l.name} className="chip">
                  {l.name} · {l.level}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
