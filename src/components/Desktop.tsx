import { APPS } from '../apps/registry'
import { useWindowManager } from '../context/WindowManager'
import DesktopIcon from './DesktopIcon'
import Window from './Window'

/** The desktop background, its icon column, and every open window. */
export default function Desktop() {
  const { windows, open } = useWindowManager()

  return (
    <main className="desktop">
      <div className="desktop-icons">
        {APPS.map((app) => (
          <DesktopIcon key={app.id} app={app} onOpen={() => open(app.id)} />
        ))}
      </div>

      {windows.map((state) => {
        const app = APPS.find((a) => a.id === state.id)
        if (!app) return null
        return <Window key={state.id} app={app} state={state} />
      })}

      <p className="desktop-hint">Double-click an icon to open it ✨</p>
    </main>
  )
}
