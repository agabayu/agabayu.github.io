import { useState } from 'react'
import { APPS } from '../apps/registry'
import { useWindowManager } from '../context/WindowManager'
import DesktopIcon from './DesktopIcon'
import Window from './Window'

/** The desktop background, its icon column, and every open window. */
export default function Desktop() {
  const { windows, open } = useWindowManager()
  const [selectedId, setSelectedId] = useState<string | null>(null)

  return (
    <main
      className="desktop"
      onPointerDown={(e) => {
        if (!(e.target as HTMLElement).closest('.desktop-icon')) setSelectedId(null)
      }}
    >
      <div className="desktop-icons">
        {APPS.map((app) => (
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
