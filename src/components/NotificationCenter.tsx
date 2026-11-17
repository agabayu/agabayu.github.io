import { useEffect, useState } from 'react'
import { APPS } from '../apps/registry'
import { useWindowManager } from '../context/WindowManager'
import { notifications, type SiteNotification } from '../data/notifications'

/** Newest first. */
const sorted = [...notifications].sort((a, b) => b.date.localeCompare(a.date))

/** 'YYYY-MM-DD' → 'Nov 16' (parsed as a local date so it never shifts a day). */
function formatDate(date: string) {
  const [y, m, d] = date.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

/**
 * Scroll an element (inside a window that may still be mounting) into view
 * and briefly outline it. Retries for a few frames until it exists.
 */
function revealTarget(id: string, framesLeft = 30) {
  const el = document.getElementById(id)
  if (!el) {
    if (framesLeft > 0) requestAnimationFrame(() => revealTarget(id, framesLeft - 1))
    return
  }
  el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  el.classList.remove('notif-highlight')
  void el.offsetWidth // restart the outline animation if it's already running
  el.classList.add('notif-highlight')
  window.setTimeout(() => el.classList.remove('notif-highlight'), 2200)
}

function CardContent({ n, more = 0 }: { n: SiteNotification; more?: number }) {
  const app = APPS.find((a) => a.id === n.app)
  return (
    <span className="nc-card">
      <span className="nc-card-top">
        {app && <img src={app.icon} alt="" aria-hidden />}
        <span>{app?.title ?? 'Website'}</span>
        <span className="nc-time">{formatDate(n.date)}</span>
      </span>
      <span className="nc-card-title">{n.title}</span>
      <span className="nc-card-body">{n.body}</span>
      {more > 0 && <span className="nc-more">{more} more update{more > 1 ? 's' : ''}</span>}
    </span>
  )
}

interface Props {
  open: boolean
  onClose: () => void
}

/** macOS-style panel that slides in from the right with site-update cards. */
export default function NotificationCenter({ open, onClose }: Props) {
  const { open: openApp, setPage } = useWindowManager()
  const [expanded, setExpanded] = useState(false)

  // Re-stack the cards whenever the panel closes.
  useEffect(() => {
    if (!open) setExpanded(false)
  }, [open])

  const openNotification = (n: SiteNotification) => {
    onClose()
    openApp(n.app)
    setPage(n.app, 'content')
    if (n.target) revealTarget(n.target)
  }

  const stacked = sorted.length > 1 && !expanded

  return (
    <aside
      className={`notification-center${open ? ' open' : ''}`}
      aria-label="Notification Center"
      aria-hidden={!open}
    >
      <div className="nc-content">
        <header className="nc-header">
          <h2>Notification Center</h2>
          {expanded && (
            <button type="button" className="nc-show-less" onClick={() => setExpanded(false)}>
              Show less
            </button>
          )}
        </header>

        <p className="nc-group-label">Website updates</p>

        {sorted.length === 0 && <p className="nc-empty">No new updates</p>}

        {sorted.length > 0 && (
          // The soft blur + dim halo is drawn behind this group (see .nc-cards).
          <div className="nc-cards">
            {stacked ? (
              <button
                type="button"
                className={`nc-item nc-stack${sorted.length > 2 ? ' nc-stack-deep' : ''}`}
                onClick={() => setExpanded(true)}
                aria-label={`${sorted.length} website updates. Show all`}
              >
                <CardContent n={sorted[0]} more={sorted.length - 1} />
                <span className="nc-stack-plate plate-1" aria-hidden />
                {sorted.length > 2 && <span className="nc-stack-plate plate-2" aria-hidden />}
              </button>
            ) : (
              sorted.map((n) => (
                <button key={n.id} type="button" className="nc-item" onClick={() => openNotification(n)}>
                  <CardContent n={n} />
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </aside>
  )
}
