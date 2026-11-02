import { useCallback, useEffect, useRef, useState } from 'react'
import type { Point, Size } from '../types'

// the four corners a window can be resized from.
export const CORNERS = ['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const
export type Corner = (typeof CORNERS)[number]

interface UseResizableOptions {
  position: Point
  size: Size
  // resizing from the top/left also moves the window.
  onResize: (rect: { position: Point; size: Size }) => void
  onStart?: () => void
}

const MIN_SIZE: Size = { width: 360, height: 300 }
const MENU_BAR_HEIGHT = 45 // same top limit useDraggable uses

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

/** Pointer-based window resizing from any corner, with viewport-aware bounds. */
export function useResizable({ position, size, onResize, onStart }: UseResizableOptions) {
  const [resizing, setResizing] = useState(false)
  // also remember which corner was grabbed and where the window was.
  const origin = useRef({ corner: 'bottom-right' as Corner, pointerX: 0, pointerY: 0, x: 0, y: 0, width: 0, height: 0 })
  const latest = useRef({ position, size, onResize })
  latest.current = { position, size, onResize }

  // a function that *returns* a handler, so each corner gets its own.
  const startResize = useCallback((corner: Corner) => (event: React.PointerEvent) => {
    event.preventDefault()
    event.stopPropagation()
    origin.current = {
      corner,
      pointerX: event.clientX,
      pointerY: event.clientY,
      ...latest.current.position,
      ...latest.current.size,
    }
    setResizing(true)
    onStart?.()
  }, [onStart])

  useEffect(() => {
    if (!resizing) return

    const handleMove = (event: PointerEvent) => {
      const o = origin.current
      const dx = event.clientX - o.pointerX
      const dy = event.clientY - o.pointerY
      let { x, y } = o
      let width: number
      let height: number

      if (o.corner.endsWith('left')) {
        const right = o.x + o.width                       // this edge stays fixed
        width = clamp(o.width - dx, MIN_SIZE.width, right) // can't pass the screen's left edge
        x = right - width
      } else {
        width = clamp(o.width + dx, MIN_SIZE.width, window.innerWidth - o.x)
      }

      if (o.corner.startsWith('top')) {
        const bottom = o.y + o.height
        height = clamp(o.height - dy, MIN_SIZE.height, bottom - MENU_BAR_HEIGHT)
        y = bottom - height
      } else {
        height = clamp(o.height + dy, MIN_SIZE.height, window.innerHeight - o.y)
      }

      latest.current.onResize({ position: { x, y }, size: { width, height } })
    }

    const stop = () => setResizing(false)
    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerup', stop)
    window.addEventListener('pointercancel', stop)
    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerup', stop)
      window.removeEventListener('pointercancel', stop)
    }
  }, [resizing])

  return { startResize, resizing }
}
