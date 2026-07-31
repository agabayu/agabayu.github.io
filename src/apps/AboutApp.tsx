import { activities, interests, intro } from '../data/about'
import type { Card } from '../data/about'

function InfoCard({ card, delay }: { card: Card; delay: number }) {
  return (
    <div className="info-card reveal" style={{ animationDelay: `${delay}s` }}>
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
        <p className="subtitle reveal" style={{ animationDelay: '0.15s' }}>
          {intro.tagline}
        </p>
        <blockquote className="reveal" style={{ animationDelay: '0.3s' }}>
          {intro.quote}
        </blockquote>
      </header>

      <section>
        <h2 className="section-title reveal" style={{ animationDelay: '0.4s' }}>
          Interests
        </h2>
        <div className="card-grid">
          {interests.map((card, i) => (
            <InfoCard key={card.title} card={card} delay={0.5 + i * 0.1} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="section-title reveal" style={{ animationDelay: '0.6s' }}>
          What I&rsquo;ve done
        </h2>
        <div className="card-grid">
          {activities.map((card, i) => (
            <InfoCard key={card.title} card={card} delay={0.7 + i * 0.1} />
          ))}
        </div>
      </section>
    </div>
  )
}
