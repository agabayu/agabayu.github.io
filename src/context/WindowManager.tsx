import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react'
import type { AppDefinition, AppId, AppSettings, Point, WindowState } from '../types'
import { APPS } from '../apps/registry'

/**
 * Central window manager for the desktop. Modelled as a reducer so that every
 * window interaction (open / close / focus / move / minimize) is an explicit,
 * traceable action — the same pattern a real OS shell uses.
 */

interface State {
  windows: WindowState[]
  settings: Record<AppId, AppSettings>
  /** Monotonically increasing counter used to assign z-index on focus. */
  topZ: number
}

type Action =
  | { type: 'OPEN'; app: AppDefinition }
  | { type: 'CLOSE'; id: AppId }
  | { type: 'FOCUS'; id: AppId }
  | { type: 'MINIMIZE'; id: AppId }
  | { type: 'MOVE'; id: AppId; position: Point }
  | { type: 'OPEN_SETTINGS'; id: AppId }
  | { type: 'CLOSE_SETTINGS'; id: AppId }
  | { type: 'SET_PAGE'; id: AppId; page: 'content' | 'settings' }
  | { type: 'UPDATE_SETTINGS'; id: AppId; settings: Partial<AppSettings> }

const DEFAULT_SETTINGS: AppSettings = { theme: 'light', textSize: 16 }
const INITIAL_STATE: State = {
  windows: [],
  topZ: 1,
  settings: Object.fromEntries(
    APPS.map((app) => {
      try {
        const saved = localStorage.getItem(`app-settings-${app.id}`)
        return [app.id, saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : { ...DEFAULT_SETTINGS }]
      } catch {
        return [app.id, { ...DEFAULT_SETTINGS }]
      }
    }),
  ) as Record<AppId, AppSettings>,
}

/** Cascade newly opened windows so they don't stack exactly on top of one another. */
function nextPosition(count: number): Point {
  const OFFSET = 28
  return { x: 80 + count * OFFSET, y: 80 + count * OFFSET }
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'OPEN': {
      const existing = state.windows.find((w) => w.id === action.app.id)
      const z = state.topZ + 1
      // Re-opening an already-open app just focuses & un-minimizes it.
      if (existing) {
        return {
          ...state,
          topZ: z,
          windows: state.windows.map((w) =>
            w.id === action.app.id ? { ...w, z, minimized: false } : w,
          ),
        }
      }
      return {
        ...state,
        topZ: z,
        windows: [
          ...state.windows,
          {
            id: action.app.id,
            position: nextPosition(state.windows.length),
            size: action.app.defaultSize,
            z,
            minimized: false,
            activePage: 'content',
            settingsOpen: false,
          },
        ],
      }
    }

    case 'CLOSE':
      return { ...state, windows: state.windows.filter((w) => w.id !== action.id) }

    case 'FOCUS': {
      const z = state.topZ + 1
      return {
        ...state,
        topZ: z,
        windows: state.windows.map((w) => (w.id === action.id ? { ...w, z } : w)),
      }
    }

    case 'MINIMIZE':
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, minimized: true } : w,
        ),
      }

    case 'MOVE':
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, position: action.position } : w,
        ),
      }

    case 'OPEN_SETTINGS':
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, settingsOpen: true, activePage: 'settings' } : w,
        ),
      }

    case 'CLOSE_SETTINGS':
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, settingsOpen: false, activePage: 'content' } : w,
        ),
      }

    case 'SET_PAGE':
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, activePage: action.page } : w,
        ),
      }

    case 'UPDATE_SETTINGS': {
      const next = { ...state.settings[action.id], ...action.settings }
      try {
        localStorage.setItem(`app-settings-${action.id}`, JSON.stringify(next))
      } catch {
        // Settings still work for this session when storage is unavailable.
      }
      return { ...state, settings: { ...state.settings, [action.id]: next } }
    }

    default:
      return state
  }
}

interface WindowManagerValue {
  windows: WindowState[]
  open: (id: AppId) => void
  close: (id: AppId) => void
  focus: (id: AppId) => void
  minimize: (id: AppId) => void
  move: (id: AppId, position: Point) => void
  isOpen: (id: AppId) => boolean
  activeAppId: AppId | null
  settings: Record<AppId, AppSettings>
  openSettings: (id: AppId) => void
  closeSettings: (id: AppId) => void
  setPage: (id: AppId, page: 'content' | 'settings') => void
  updateSettings: (id: AppId, settings: Partial<AppSettings>) => void
}

const WindowManagerContext = createContext<WindowManagerValue | null>(null)

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  const value = useMemo<WindowManagerValue>(() => {
    const findApp = (id: AppId) => APPS.find((a) => a.id === id)!
    return {
      windows: state.windows,
      settings: state.settings,
      activeAppId:
        state.windows
          .filter((w) => !w.minimized)
          .reduce<WindowState | null>((top, w) => (!top || w.z > top.z ? w : top), null)?.id ?? null,
      open: (id) => dispatch({ type: 'OPEN', app: findApp(id) }),
      close: (id) => dispatch({ type: 'CLOSE', id }),
      focus: (id) => dispatch({ type: 'FOCUS', id }),
      minimize: (id) => dispatch({ type: 'MINIMIZE', id }),
      move: (id, position) => dispatch({ type: 'MOVE', id, position }),
      isOpen: (id) => state.windows.some((w) => w.id === id && !w.minimized),
      openSettings: (id) => dispatch({ type: 'OPEN_SETTINGS', id }),
      closeSettings: (id) => dispatch({ type: 'CLOSE_SETTINGS', id }),
      setPage: (id, page) => dispatch({ type: 'SET_PAGE', id, page }),
      updateSettings: (id, settings) => dispatch({ type: 'UPDATE_SETTINGS', id, settings }),
    }
  }, [state])

  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  )
}

/** Typed hook that guarantees the provider is present. */
export function useWindowManager(): WindowManagerValue {
  const ctx = useContext(WindowManagerContext)
  if (!ctx) {
    throw new Error('useWindowManager must be used within a WindowManagerProvider')
  }
  return ctx
}
