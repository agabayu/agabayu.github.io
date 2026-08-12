import type { AppId, AppSettings } from '../types'

interface Props {
  appId: AppId
  settings: AppSettings
  onChange: (settings: Partial<AppSettings>) => void
}

export default function SettingsPanel({ appId, settings, onChange }: Props) {
  const setTextSize = (value: number) =>
    onChange({ textSize: Math.min(24, Math.max(12, value)) })

  return (
    <div className="settings-panel">
      <h2>Settings</h2>
      <p className="settings-caption">These settings apply only to {appId}.</p>
      <div className="settings-grid">
        <label htmlFor={`${appId}-theme`}>Appearance</label>
        <select
          id={`${appId}-theme`}
          value={settings.theme}
          onChange={(e) => onChange({ theme: e.target.value as AppSettings['theme'] })}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>

        <label htmlFor={`${appId}-text-size`}>Text size</label>
        <div className="text-size-control">
          <button type="button" onClick={() => setTextSize(settings.textSize - 1)} aria-label="Decrease text size">−</button>
          <input
            id={`${appId}-text-size`}
            type="range"
            min="12"
            max="24"
            value={settings.textSize}
            onChange={(e) => setTextSize(Number(e.target.value))}
          />
          <button type="button" onClick={() => setTextSize(settings.textSize + 1)} aria-label="Increase text size">+</button>
          <input
            className="text-size-number"
            type="number"
            min="12"
            max="24"
            value={settings.textSize}
            onChange={(e) => setTextSize(Number(e.target.value))}
            aria-label="Text size value"
          />
        </div>
      </div>
    </div>
  )
}
