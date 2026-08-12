import type { AppDefinition } from '../types'

interface Props {
  app: AppDefinition
  onOpen: (app: AppDefinition) => void
  selected: boolean
  onSelect: () => void
}

/** A single desktop icon. Double-click (or Enter) launches the app. */
export default function DesktopIcon({ app, onOpen, selected, onSelect }: Props) {
  return (
    <button
      type="button"
      className={`desktop-icon${selected ? ' selected' : ''}`}
      onClick={onSelect}
      onDoubleClick={() => onOpen(app)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onOpen(app)
      }}
      aria-label={`Open ${app.title}`}
      aria-pressed={selected}
    >
      <img src={app.icon} alt="" />
    </button>
  )
}
