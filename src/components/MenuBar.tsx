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
    // Close on any click outside a menu button or its dropdown — including
    // empty space in the menu bar itself.
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element
      const insideMenu = menusRef.current?.contains(target) && target.closest('.dropdown')
      if (!insideMenu) setMenuOpen(null)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [menuOpen])

  /** Clicking a menu-bar button toggles its menu. */
  const toggleMenu = (id: Exclude<MenuId, null>) =>
    setMenuOpen((current) => current === id ? null : id)

  /** While any menu is open, hovering another menu-bar button switches to it. */
  const switchMenuOnHover = (id: Exclude<MenuId, null>) =>
    setMenuOpen((current) => current === null ? null : id)

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
          onClick={() => toggleMenu('website')}
          onMouseEnter={() => switchMenuOnHover('website')}
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
          onClick={() => toggleMenu('help')}
          onMouseEnter={() => switchMenuOnHover('help')}
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
