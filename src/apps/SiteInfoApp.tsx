export default function SiteInfoApp() {
  return (
    <div className="app site-info-app">
      <header className="site-info-hero">
        <img src="/header/icons/logo.PNG" alt="Angela You website logo" />
        <div>
          <p className="about-kicker">Behind the screen</p>
          <h1>About This Site</h1>
          <p>A personal portfolio disguised as a tiny desktop.</p>
        </div>
      </header>

      <section className="site-info-section">
        <h2>How it&rsquo;s built</h2>
        <p>This site is built with React, TypeScript, Vite, HTML, and CSS. A custom window manager handles opening, focusing, moving, minimizing, resizing, and personalizing each window.</p>
        <div className="build-tags" aria-label="Technologies used">
          {['React', 'TypeScript', 'Vite', 'HTML', 'CSS'].map((item) => <span key={item}>{item}</span>)}
        </div>
      </section>

      <section className="site-info-section personal-detail">
        <span className="personal-detail-mark" aria-hidden>✎</span>
        <div>
          <h2>Made personally</h2>
          <p>Every icon and image on the site was drawn by me. The cat hanging out in the desktop background is my cat, Chestnut!</p>
        </div>
      </section>
    </div>
  )
}
