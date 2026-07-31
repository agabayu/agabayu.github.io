import { useDraggable } from '../hooks/useDraggable'
import { useWindowManager } from '../context/WindowManager'
import type { AppDefinition, WindowState } from '../types'

interface Props {
  app: AppDefinition
  state: WindowState
}

/**
 * A draggable, focusable application window with macOS "traffic light"
 * controls. The body renders the app's own React component.
 */
export default function Window({ app, state }: Props) {
  const { close, focus, minimize, move } = useWindowManager()
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
        <span className="window-title">{app.title}</span>
      </header>

      <div className="window-body">
        <Body />
      </div>
    </section>
  )
}
