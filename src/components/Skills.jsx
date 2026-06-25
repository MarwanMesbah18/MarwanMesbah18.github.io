import { skillGroups } from '../data/skills'
import { useReveal } from '../hooks/useReveal'

const Icons = {
  brain: (
    <path d="M12 2a4 4 0 0 0-4 4v.5A3.5 3.5 0 0 0 5 10a3.5 3.5 0 0 0 .5 6.8A3.5 3.5 0 0 0 9 22a3 3 0 0 0 3-2V2zm0 0a4 4 0 0 1 4 4v.5A3.5 3.5 0 0 1 19 10a3.5 3.5 0 0 1-.5 6.8A3.5 3.5 0 0 1 15 22a3 3 0 0 1-3-2V2z" />
  ),
  stack: <path d="M12 2 2 7l10 5 10-5-10-5zm0 9L2 16l10 5 10-5-10-5z" />,
  code: <path d="m8 6-6 6 6 6 1.4-1.4L4.8 12 9.4 7.4 8 6zm8 0-1.4 1.4L19.2 12l-4.6 4.6L16 18l6-6-6-6z" />,
  wrench: <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.1-2.1 2.6-2.4z" />,
  compass: (
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm3.2 6.8-2 5-5 2 2-5 5-2zM12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
  ),
}

function Icon({ name }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      {Icons[name] || Icons.code}
    </svg>
  )
}

export default function Skills() {
  const ref = useReveal()

  return (
    <section id="skills" ref={ref} className="section-pad relative">
      <div className="container-px">
        <div className="mb-12 max-w-2xl">
          <div data-reveal className="eyebrow mb-4">
            <span className="h-px w-8 bg-brand-400" /> Skills
          </div>
          <h2 data-reveal className="heading-lg">
            The toolbox behind the <span className="text-gradient">work.</span>
          </h2>
          <p data-reveal className="body-lead mt-4">
            A blend of AI, full-stack, and embedded systems — sharpened across competitions, coursework, and production software.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g) => (
            <div key={g.title} data-reveal className="glass-card group p-6 transition-all hover:-translate-y-1 hover:shadow-glow">
              <div className="mb-4 flex items-center gap-3">
                <span className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${g.accent} text-white shadow-sm`}>
                  <Icon name={g.icon} />
                </span>
                <h3 className="font-display text-lg font-semibold text-ink">{g.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
