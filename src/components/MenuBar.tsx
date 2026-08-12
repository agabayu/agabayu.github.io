import { useEffect, useRef, useState } from 'react'
import { APPS } from '../apps/registry'
import { useWindowManager } from '../context/WindowManager'

/** The macOS-style top menu bar with the logo, titles, and a Help dropdown. */
export default function MenuBar() {
  const { activeAppId, close, open, openSettings } = useWindowManager()
  const [menuOpen, setMenuOpen] = useState<'app' | 'help' | null>(null)
  const menusRef = useRef<HTMLElement>(null)
  const activeApp = APPS.find((app) => app.id === activeAppId)

  // Close the dropdown when clicking anywhere outside of it.
  useEffect(() => {
    if (menuOpen === null) return
    const onClick = (e: MouseEvent) => {
      if (!menusRef.current?.contains(e.target as Node)) setMenuOpen(null)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [menuOpen])

  return (
    <nav className="menubar" ref={menusRef}>
      <img src="/header/icons/logo.PNG" alt="Logo" className="menubar-logo" />
      <div className="dropdown">
        <button
          type="button"
          className="menubar-project menubar-link"
          aria-expanded={menuOpen === 'app'}
          aria-haspopup="menu"
          disabled={!activeApp}
          onClick={() => setMenuOpen((openMenu) => openMenu === 'app' ? null : 'app')}
        >
          {activeApp?.title ?? 'Personal Website'}
        </button>
        {menuOpen === 'app' && activeApp && (
          <div className="dropdown-content app-menu" role="menu">
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                openSettings(activeApp.id)
                setMenuOpen(null)
              }}
            >
              Settings
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                close(activeApp.id)
                setMenuOpen(null)
              }}
            >
              Quit {activeApp.title}
            </button>
          </div>
        )}
      </div>
      <div className="dropdown">
        <button
          type="button"
          className="menubar-link"
          aria-expanded={menuOpen === 'help'}
          aria-haspopup="menu"
          onClick={() => setMenuOpen((openMenu) => openMenu === 'help' ? null : 'help')}
        >
          Help
        </button>
        {menuOpen === 'help' && (
          <div className="dropdown-content" role="menu">
            {APPS.map((app) => (
              <button
                key={app.id}
                type="button"
                role="menuitem"
                onClick={() => {
                  open(app.id)
                  setMenuOpen(null)
                }}
              >
                {app.title}
              </button>
            ))}
          </div>
        )}
      </div>
      <span className="menubar-name">Angela You</span>
    </nav>
  )
}
