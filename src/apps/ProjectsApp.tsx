import { hackathons } from '../data/hackathons'
import { projects } from '../data/projects'
import type { Hackathon } from '../data/hackathons'

function HackathonCard({ h }: { h: Hackathon }) {
  return (
    <article id={h.id} className="hackathon-card reveal">
      <div className="hackathon-head">
        <div>
          <h3>{h.project}</h3>
          <p className="hackathon-event">{h.event}</p>
        </div>
        {h.award && <span className="award-badge">🏆 {h.award}</span>}
      </div>

      <ul className="hackathon-meta">
        {h.date && <li>📅 {h.date}</li>}
        {h.location && <li>📍 {h.location}</li>}
        {h.role && <li>👤 {h.role}</li>}
      </ul>

      <p className="hackathon-desc">{h.description}</p>

      {h.tech.length > 0 && (
        <ul className="tag-list">
          {h.tech.map((t) => (
            <li key={t} className="tag">
              {t}
            </li>
          ))}
        </ul>
      )}

      {h.links.length > 0 && (
        <div className="hackathon-links">
          {h.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="link-btn"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      )}
    </article>
  )
}

export default function ProjectsApp() {
  return (
    <div className="app projects-app">
      {projects.length > 0 && (
        <>
          <header className="projects-intro">
            <h2 className="section-title reveal">Projects</h2>
            <p className="reveal">
              What I&rsquo;m building with teams and organizations.
            </p>
          </header>

          <div className="hackathon-grid projects-grid">
            {projects.map((p, i) => (
              <HackathonCard key={`${p.project}-${i}`} h={p} />
            ))}
          </div>
        </>
      )}

      <header className="projects-intro">
        <h2 className="section-title reveal">Hackathons</h2>
        <p className="reveal">
          A selection of projects I&rsquo;ve built at hackathons.
        </p>
      </header>

      <div className="hackathon-grid">
        {hackathons.map((h, i) => (
          <HackathonCard key={`${h.event}-${i}`} h={h} />
        ))}
      </div>
    </div>
  )
}
