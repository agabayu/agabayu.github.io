import { useCallback, useState } from 'react'
import { contactMethods } from '../data/contact'

export default function ContactApp() {
  // Tracks which value was most recently copied, to show a "Copied!" pill.
  const [copied, setCopied] = useState<string | null>(null)

  const copy = useCallback(async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(value)
      window.setTimeout(() => setCopied(null), 1600)
    } catch {
      // Clipboard blocked (e.g. insecure context) — fail silently.
    }
  }, [])

  return (
    <div className="app contact-app">
      <h2 className="section-title reveal">Let&rsquo;s connect</h2>
      <p className="reveal">
        I&rsquo;m always happy to chat about projects, opportunities, or piano.
      </p>

      <div className="contact-list">
        {contactMethods.map((m) => (
          <div key={m.label} className="contact-card reveal">
            <span className="contact-icon" aria-hidden>
              {m.icon}
            </span>
            <div className="contact-text">
              <span className="contact-label">{m.label}</span>
              <a href={m.href} target="_blank" rel="noreferrer">
                {m.value}
              </a>
            </div>
            {m.copyable && (
              <button
                type="button"
                className="copy-btn"
                onClick={() => copy(m.value)}
              >
                {copied === m.value ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
