import { activities, interests, intro } from '../data/about'
import type { Card } from '../data/about'

function InfoCard({ card }: { card: Card }) {
  return (
    <div className="info-card reveal">
      <h4>{card.title}</h4>
      <p>{card.body}</p>
      {card.link && (
        <a
          className="card-badge"
          href={card.link.href}
          target="_blank"
          rel="noreferrer"
          aria-label={card.link.label}
        >
          <img src={card.link.icon} alt={card.link.label} />
        </a>
      )}
    </div>
  )
}

export default function AboutApp() {
  return (
    <div className="app about-app">
      <header className="about-hero">
        <h1 className="reveal">
          Hello, my name is <span className="accent">{intro.name}</span>
        </h1>
        <p className="subtitle reveal">
          {intro.tagline}
        </p>
        <blockquote className="reveal">
          {intro.quote}
        </blockquote>
      </header>

      <section>
        <h2 className="section-title reveal">
          Interests
        </h2>
        <div className="card-grid">
          {interests.map((card) => (
            <InfoCard key={card.title} card={card} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="section-title reveal">
          What I&rsquo;ve done
        </h2>
        <div className="card-grid">
          {activities.map((card) => (
            <InfoCard key={card.title} card={card} />
          ))}
        </div>
      </section>
    </div>
  )
}
