import { useEffect, useRef, useState } from 'react'
import { APPS } from '../apps/registry'
import { useWindowManager } from '../context/WindowManager'

/** The macOS-style top menu bar with the logo, titles, and a Help dropdown. */
export default function MenuBar() {
  const { open } = useWindowManager()
  const [menuOpen, setMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close the dropdown when clicking anywhere outside of it.
  useEffect(() => {
    if (!menuOpen) return
    const onClick = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [menuOpen])

  return (
    <nav className="menubar">
      <img src="/header/icons/logo.PNG" alt="Logo" className="menubar-logo" />
      <span className="menubar-name">Angela You</span>
      <span className="menubar-project">Personal Website</span>
      <div className="dropdown" ref={dropdownRef}>
        <button
          type="button"
          className="menubar-link"
          onClick={() => setMenuOpen((o) => !o)}
        >
          Help
        </button>
        {menuOpen && (
          <div className="dropdown-content">
            {APPS.map((app) => (
              <button
                key={app.id}
                type="button"
                onClick={() => {
                  open(app.id)
                  setMenuOpen(false)
                }}
              >
                {app.title}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
