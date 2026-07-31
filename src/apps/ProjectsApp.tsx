import { hackathons } from '../data/hackathons'
import type { Hackathon } from '../data/hackathons'

function HackathonCard({ h, index }: { h: Hackathon; index: number }) {
  return (
    <article
      className="hackathon-card reveal"
      style={{ animationDelay: `${0.1 + index * 0.1}s` }}
    >
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
      <header className="projects-intro">
        <h2 className="section-title reveal">Hackathons</h2>
        <p className="reveal" style={{ animationDelay: '0.1s' }}>
          Projects I&rsquo;ve designed and built under a deadline — with a team,
          from scratch, in a weekend.
        </p>
      </header>

      <div className="hackathon-grid">
        {hackathons.map((h, i) => (
          <HackathonCard key={`${h.event}-${i}`} h={h} index={i} />
        ))}
      </div>
    </div>
  )
}
