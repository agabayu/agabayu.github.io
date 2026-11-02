const tips = [
  { symbol: '↗', title: 'Open something', detail: 'Double-click a folder on the desktop, or choose an app from Files in the menu bar.' },
  { symbol: '⌁', title: 'Move & resize', detail: 'Drag a window by its top bar. Drag any of its corners to make it larger or smaller.' },
  { symbol: '●', title: 'Window controls', detail: 'Use the red button to close a window and the yellow button to minimize it.' },
  { symbol: 'Aa', title: 'Make it yours', detail: 'With a window active, open Personal Website → Window Settings to change its theme or text size.' },
]

export default function WelcomeApp() {
  return (
    <div className="app guide-app">
      <header className="guide-hero">
        <span className="guide-wave" aria-hidden>👋</span>
        <div>
          <p className="about-kicker">A tiny field guide</p>
          <h1>Welcome to my desktop!</h1>
          <p>Click around—this portfolio is designed to work like a small computer.</p>
        </div>
      </header>
      <div className="guide-list">
        {tips.map((tip) => (
          <section key={tip.title} className="guide-tip">
            <span className="guide-symbol" aria-hidden>{tip.symbol}</span>
            <div><h2>{tip.title}</h2><p>{tip.detail}</p></div>
          </section>
        ))}
      </div>
      <p className="guide-footer">Nothing here will break—exploring is encouraged. ✦</p>
    </div>
  )
}
