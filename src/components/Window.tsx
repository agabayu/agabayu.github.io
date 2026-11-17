import { useDraggable } from '../hooks/useDraggable'
import { RESIZE_HANDLES, useResizable } from '../hooks/useResizable'
import { useWindowManager } from '../context/WindowManager'
import type { AppDefinition, WindowState } from '../types'
import SettingsPanel from './SettingsPanel'
import { useLayoutEffect, useRef, type CSSProperties } from 'react'

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
    close, closeSettings, focus, minimize, move, resize, setPage, settings, toggleMaximize, updateSettings,
  } = useWindowManager()
  const { onPointerDown, dragging } = useDraggable({
    position: state.position,
    onMove: (p) => move(app.id, p),
    onStart: () => focus(app.id),
  })
  const { startResize, resizing } = useResizable({
    position: state.position,
    size: state.size,
    onResize: ({ position, size }) => {
      move(app.id, position)
      resize(app.id, size)
    },
    onStart: () => focus(app.id),
  })
  // When a second tab opens, slide the first tab from the centered title spot
  // to its place on the left (and back when it closes). We remember where the
  // title's text sat last time and animate from there to the new spot.
  const titlebarRef = useRef<HTMLElement>(null)
  const firstLabelRef = useRef<HTMLSpanElement>(null)
  const lastLabelLeft = useRef<number | null>(null)
  const lastTabsOpen = useRef(state.settingsOpen)
  useLayoutEffect(() => {
    const bar = titlebarRef.current
    const label = firstLabelRef.current
    if (!bar || !label) return
    const left = label.getBoundingClientRect().left - bar.getBoundingClientRect().left
    const from = lastLabelLeft.current
    const tabsChanged = lastTabsOpen.current !== state.settingsOpen
    lastLabelLeft.current = left
    lastTabsOpen.current = state.settingsOpen
    if (!tabsChanged || from === null || from === left) return
    const moving = (label.closest('.window-tab') as HTMLElement | null) ?? label
    moving.animate(
      [{ transform: `translateX(${from - left}px)` }, { transform: 'none' }],
      { duration: 280, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' },
    )
  }, [state.settingsOpen, state.size.width, state.minimized])

  if (state.minimized) return null

  const Body = app.Component

  return (
    <section
      className={`window${dragging ? ' dragging' : ''}${resizing ? ' resizing' : ''}`}
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
      <header className="window-titlebar" ref={titlebarRef} onPointerDown={onPointerDown}>
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
          <button
            type="button"
            className="light maximize"
            aria-label={state.restore ? 'Restore window size' : 'Fit window to screen'}
            onClick={() => toggleMaximize(app.id)}
          />
        </div>
        {state.settingsOpen ? (
          // Several tabs: pills on the left, each with its own ×.
          <div className="window-tabs">
            <button
              type="button"
              data-no-drag
              className={`window-tab${state.activePage === 'content' ? ' active' : ''}`}
              onClick={() => setPage(app.id, 'content')}
            >
              <span className="tab-label" ref={firstLabelRef}>{app.title}</span>
              <span className="tab-close" role="button" aria-label={`Close ${app.title}`} onClick={(e) => { e.stopPropagation(); close(app.id) }}>×</span>
            </button>
            <button
              type="button"
              data-no-drag
              className={`window-tab${state.activePage === 'settings' ? ' active' : ''}`}
              onClick={() => setPage(app.id, 'settings')}
            >
              <span className="tab-label">Settings</span>
              <span className="tab-close" role="button" aria-label="Close Settings" onClick={(e) => { e.stopPropagation(); closeSettings(app.id) }}>×</span>
            </button>
          </div>
        ) : (
          // One tab: just a centered title (no highlight, no ×). Part of the
          // draggable title bar.
          <div className="window-title-single">
            <span ref={firstLabelRef}>{app.title}</span>
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
      {RESIZE_HANDLES.map((corner) => (
        <div
          key={corner}
          className={`window-resize-handle ${corner}`}
          onPointerDown={startResize(corner)}
          aria-hidden="true"
          title="Drag to resize"
        />
      ))}
    </section>
  )
}
