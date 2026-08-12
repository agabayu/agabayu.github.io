import { useEffect, useRef, useState } from 'react'
import { APPS, DESKTOP_APPS } from '../apps/registry'
import { useWindowManager } from '../context/WindowManager'

type MenuId = 'website' | 'help' | null

/** Desktop-style navigation for site information and portfolio apps. */
export default function MenuBar() {
  const { activeAppId, close, open, openSettings } = useWindowManager()
  const [menuOpen, setMenuOpen] = useState<MenuId>(null)
  const menusRef = useRef<HTMLElement>(null)
  const activeApp = APPS.find((app) => app.id === activeAppId)

  useEffect(() => {
    if (menuOpen === null) return
    const onClick = (event: MouseEvent) => {
      if (!menusRef.current?.contains(event.target as Node)) setMenuOpen(null)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [menuOpen])

  const launch = (id: Parameters<typeof open>[0]) => {
    open(id)
    setMenuOpen(null)
  }

  return (
    <nav className="menubar" ref={menusRef} aria-label="Website menu">
      <img src="/header/icons/logo.PNG" alt="Angela You logo" className="menubar-logo" />

      <div className="dropdown">
        <button
          type="button"
          className="menubar-project menubar-link"
          aria-expanded={menuOpen === 'website'}
          aria-haspopup="menu"
          onClick={() => setMenuOpen((current) => current === 'website' ? null : 'website')}
        >
          Personal Website
        </button>
        {menuOpen === 'website' && (
          <div className="dropdown-content app-menu" role="menu">
            <button type="button" role="menuitem" onClick={() => launch('site-info')}>
              About This Site
            </button>
            {activeApp && (
              <>
                <div className="menu-separator" role="separator" />
                <p className="menu-label">{activeApp.title}</p>
                <button type="button" role="menuitem" onClick={() => { openSettings(activeApp.id); setMenuOpen(null) }}>
                  Window Settings
                </button>
                <button type="button" role="menuitem" onClick={() => { close(activeApp.id); setMenuOpen(null) }}>
                  Close {activeApp.title}
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <div className="dropdown">
        <button
          type="button"
          className="menubar-link"
          aria-expanded={menuOpen === 'help'}
          aria-haspopup="menu"
          onClick={() => setMenuOpen((current) => current === 'help' ? null : 'help')}
        >
          Help
        </button>
        {menuOpen === 'help' && (
          <div className="dropdown-content help-menu" role="menu">
            <button type="button" role="menuitem" onClick={() => launch('welcome')}>
              Welcome
            </button>
            <div className="submenu">
              <button type="button" className="submenu-trigger" role="menuitem" aria-haspopup="menu">
                <span>Files</span><span className="submenu-arrow" aria-hidden>›</span>
              </button>
              <div className="dropdown-content files-menu" role="menu">
                <p className="menu-label">Open a file</p>
                {DESKTOP_APPS.map((app) => (
                  <button key={app.id} type="button" role="menuitem" onClick={() => launch(app.id)}>
                    <img src={app.icon} alt="" aria-hidden />
                    <span>{app.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <span className="menubar-name">Angela You</span>
    </nav>
  )
}
