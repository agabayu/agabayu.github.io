import type { AppDefinition } from '../types'

interface Props {
  app: AppDefinition
  onOpen: (app: AppDefinition) => void
}

/** A single desktop icon. Double-click (or Enter) launches the app. */
export default function DesktopIcon({ app, onOpen }: Props) {
  return (
    <button
      type="button"
      className="desktop-icon"
      onDoubleClick={() => onOpen(app)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onOpen(app)
      }}
      aria-label={`Open ${app.title}`}
    >
      <img src={app.icon} alt="" />
    </button>
  )
}
