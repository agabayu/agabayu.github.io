import { beyondCode, focusAreas, intro } from '../data/about'

export default function AboutApp() {
  return (
    <div className="app about-app">
      <header className="about-hero reveal">
        <div className="about-doodles" aria-hidden>
          <span>✦</span><span>⌁</span><span>♪</span>
        </div>
        <div className="about-heading">
          <p className="about-kicker">Hi, I&rsquo;m</p>
          <h1><span className="accent">{intro.name}</span>.</h1>
          <p className="subtitle">{intro.tagline}</p>
          <div className="about-location"><span aria-hidden>⌖</span> Queens, NY → Boston, MA</div>
        </div>
        <div className="about-story">
          {intro.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </header>

      <section className="about-currently">
        <div className="about-section-heading reveal">
          <span className="handwritten">currently...</span>
          <h2>Learning by making things</h2>
        </div>
        <div className="focus-path">
          {focusAreas.map((card, index) => (
            <article key={card.title} className="focus-item reveal">
              <span className="focus-number">0{index + 1}</span>
              <div>
                <span className="card-eyebrow">{card.eyebrow}</span>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-beyond reveal">
        <div className="beyond-intro">
          <span className="handwritten">also me →</span>
          <h2>More than my GitHub</h2>
          <p>I like when technical and creative ways of thinking overlap.</p>
        </div>
        <div className="note-stack">
          {beyondCode.map((card, index) => (
            <article key={card.title} className={`personal-note note-${index + 1}`}>
              <span className="note-tape" aria-hidden />
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
