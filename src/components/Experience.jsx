import { experiences, education } from '../data/profile'
import { useReveal } from '../hooks/useReveal'

export default function Experience() {
  const ref = useReveal()

  return (
    <section id="experience" ref={ref} className="section-pad relative">
      <div className="container-px">
        <div className="mb-16 max-w-2xl">
          <div data-reveal className="eyebrow mb-4">
            <span className="h-px w-8 bg-brand-400" /> Experience
          </div>
          <h2 data-reveal className="heading-lg">
            Where I&apos;ve been making <span className="text-gradient">an impact.</span>
          </h2>
        </div>

        {/* Achievement banner */}
        <div data-reveal className="glass-card relative mb-14 overflow-hidden p-6 md:p-8">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-300/30 blur-3xl" />
          <div className="relative flex flex-wrap items-center gap-6">
            <div className="grid h-16 w-16 flex-shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-brand-600 text-3xl shadow-glow">
              🏆
            </div>
            <div>
              <div className="font-display text-xl font-bold text-ink md:text-2xl">
                2nd Place — MATE ROV Competition, 2025 &amp; 2026
              </div>
              <p className="mt-1 text-ink-soft">
                Led the software &amp; AI effort for RobEn&apos;s underwater ROV — two consecutive years on the podium at the
                international underwater-robotics competition.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-brand-400 via-brand-300 to-transparent md:left-1/2" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <div
                key={`${exp.org}-${i}`}
                data-reveal
                className={`relative flex flex-col gap-4 md:flex-row md:items-start ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* dot */}
                <div className="absolute left-[11px] top-2 z-10 grid h-5 w-5 place-items-center rounded-full border-2 border-white bg-brand-500 shadow md:left-1/2 md:-translate-x-1/2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </div>

                <div className="ml-10 md:ml-0 md:w-1/2" />
                <div className="ml-10 md:ml-0 md:w-1/2 md:px-8">
                  <div className="glass-card p-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-display text-lg font-semibold text-ink">{exp.role}</h3>
                      <span className="font-mono text-xs text-ink-muted">{exp.period}</span>
                    </div>
                    <div className="mt-0.5 text-sm font-medium text-brand-600">
                      {exp.org} · {exp.location}
                    </div>
                    <ul className="mt-3 space-y-2">
                      {exp.points.map((p, j) => (
                        <li key={j} className="flex gap-2 text-sm text-ink-soft">
                          <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-brand-400" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}

            {/* Education entry */}
            <div data-reveal className="relative flex flex-col gap-4 md:flex-row md:items-start">
              <div className="absolute left-[11px] top-2 z-10 grid h-5 w-5 place-items-center rounded-full border-2 border-white bg-indigo-500 shadow md:left-1/2 md:-translate-x-1/2">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </div>
              <div className="ml-10 md:ml-0 md:w-1/2" />
              <div className="ml-10 md:ml-0 md:w-1/2 md:px-8">
                <div className="glass-card p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold text-ink">{education[0].role}</h3>
                    <span className="font-mono text-xs text-ink-muted">{education[0].period}</span>
                  </div>
                  <div className="mt-0.5 text-sm font-medium text-indigo-600">{education[0].org}</div>
                  <div className="mt-0.5 text-xs text-ink-muted">{education[0].location}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
