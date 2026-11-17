import { useEffect, useState } from 'react'
import { APPS, DESKTOP_APPS } from '../apps/registry'
import { useWindowManager } from '../context/WindowManager'
import { notifications } from '../data/notifications'
import DesktopIcon from './DesktopIcon'
import Window from './Window'

const SEEN_UPDATES_KEY = 'seen-updates'

/**
 * True for first-time visitors, and for returning visitors when the
 * Notification Center has a card they haven't seen yet. Records the current
 * cards as seen either way, so it only fires once per new update.
 */
function shouldShowSiteInfo(): boolean {
  const current = notifications.map((n) => n.id)
  try {
    const saved = localStorage.getItem(SEEN_UPDATES_KEY)
    localStorage.setItem(SEEN_UPDATES_KEY, JSON.stringify(current))
    if (saved === null) return true // first visit
    const seen = new Set<string>(JSON.parse(saved))
    return current.some((id) => !seen.has(id))
  } catch {
    return false // storage unavailable: don't pop it up on every visit
  }
}

/** The desktop background, its icon column, and every open window. */
export default function Desktop() {
  const { windows, open, openCentered } = useWindowManager()
  const [selectedId, setSelectedId] = useState<string | null>(null)

  // Greet first-time visitors (and anyone returning after a new update) with
  // the About This Site window, centered on screen.
  useEffect(() => {
    if (shouldShowSiteInfo()) openCentered('site-info')
  }, []) // once, on page load

  return (
    <main
      className="desktop"
      onPointerDown={(e) => {
        if (!(e.target as HTMLElement).closest('.desktop-icon')) setSelectedId(null)
      }}
    >
      <div className="desktop-icons">
        {DESKTOP_APPS.map((app) => (
          <DesktopIcon
            key={app.id}
            app={app}
            selected={selectedId === app.id}
            onSelect={() => setSelectedId(app.id)}
            onOpen={() => open(app.id)}
          />
        ))}
      </div>

      {windows.map((state) => {
        const app = APPS.find((a) => a.id === state.id)
        if (!app) return null
        return <Window key={state.id} app={app} state={state} />
      })}

    </main>
  )
}
