import { useDraggable } from '../hooks/useDraggable'
import { useWindowManager } from '../context/WindowManager'
import type { AppDefinition, WindowState } from '../types'
import SettingsPanel from './SettingsPanel'
import type { CSSProperties } from 'react'

interface Props {
  app: AppDefinition
  state: WindowState
}

/**
 * A draggable, focusable application window with macOS "traffic light"
 * controls. The body renders the app's own React component.
 */
export default function Window({ app, state }: Props) {
  const {
    close, closeSettings, focus, minimize, move, setPage, settings, updateSettings,
  } = useWindowManager()
  const { onPointerDown, dragging } = useDraggable({
    position: state.position,
    onMove: (p) => move(app.id, p),
    onStart: () => focus(app.id),
  })

  if (state.minimized) return null

  const Body = app.Component

  return (
    <section
      className={`window${dragging ? ' dragging' : ''}`}
      style={{
        left: state.position.x,
        top: state.position.y,
        width: state.size.width,
        height: state.size.height,
        zIndex: state.z,
      }}
      onMouseDown={() => focus(app.id)}
      role="dialog"
      aria-label={app.title}
    >
      <header className="window-titlebar" onPointerDown={onPointerDown}>
        <div className="traffic-lights" data-no-drag>
          <button
            type="button"
            className="light close"
            aria-label="Close window"
            onClick={() => close(app.id)}
          />
          <button
            type="button"
            className="light minimize"
            aria-label="Minimize window"
            onClick={() => minimize(app.id)}
          />
          <span className="light disabled" aria-hidden />
        </div>
        {state.settingsOpen ? (
          <div className="window-tabs" data-no-drag>
            <button
              type="button"
              className={`window-tab${state.activePage === 'content' ? ' active' : ''}`}
              onClick={() => setPage(app.id, 'content')}
            >
              <span>{app.title}</span>
              <span className="tab-close" role="button" aria-label={`Close ${app.title}`} onClick={(e) => { e.stopPropagation(); close(app.id) }}>×</span>
            </button>
              <span className="tab-divider" aria-hidden />
            <button
              type="button"
              className={`window-tab${state.activePage === 'settings' ? ' active' : ''}`}
              onClick={() => setPage(app.id, 'settings')}
            >
              <span>Settings</span>
              <span className="tab-close" role="button" aria-label="Close Settings" onClick={(e) => { e.stopPropagation(); closeSettings(app.id) }}>×</span>
            </button>
          </div>
        ) : (
          <div className="window-title-single" data-no-drag>
            <span>{app.title}</span>
            <button type="button" className="single-title-close" aria-label={`Close ${app.title}`} onClick={() => close(app.id)}>×</button>
          </div>
        )}
      </header>

      <div
        className={`window-body theme-${settings[app.id].theme}`}
        style={{
          '--app-text-size': `${settings[app.id].textSize}px`,
          '--app-scale': settings[app.id].textSize / 16,
        } as CSSProperties}
      >
        {state.activePage === 'settings' ? (
          <SettingsPanel appId={app.id} settings={settings[app.id]} onChange={(next) => updateSettings(app.id, next)} />
        ) : (
          <Body />
        )}
      </div>
    </section>
  )
}
