import { useCallback, useEffect, useRef, useState } from 'react'
import type { Point } from '../types'

interface UseDraggableOptions {
  position: Point
  onMove: (position: Point) => void
  /** Called once at the start of a drag — used to focus the window. */
  onStart?: () => void
}

/**
 * Pointer-based dragging with clamping to the viewport. Built on the Pointer
 * Events API so it works for mouse and touch alike, and it listens on `window`
 * during a drag so the pointer can leave the handle without dropping it.
 */
export function useDraggable({ position, onMove, onStart }: UseDraggableOptions) {
  const [dragging, setDragging] = useState(false)
  // Offset between the pointer and the window's top-left corner at grab time.
  const offset = useRef<Point>({ x: 0, y: 0 })
  // Keep the latest values in a ref so the window listeners stay stable.
  const latest = useRef({ position, onMove })
  latest.current = { position, onMove }

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      // Ignore clicks that originate on interactive controls (e.g. traffic lights).
      if ((e.target as HTMLElement).closest('[data-no-drag]')) return
      e.preventDefault()
      offset.current = {
        x: e.clientX - latest.current.position.x,
        y: e.clientY - latest.current.position.y,
      }
      setDragging(true)
      onStart?.()
    },
    [onStart],
  )

  useEffect(() => {
    if (!dragging) return

    const handleMove = (e: PointerEvent) => {
      const width = window.innerWidth
      const height = window.innerHeight
      const next: Point = {
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      }
      // Clamp so the title bar always stays grabbable on screen.
      next.x = Math.min(Math.max(next.x, -width * 0.4), width - 80)
      next.y = Math.min(Math.max(next.y, 45), height - 60)
      latest.current.onMove(next)
    }

    const stop = () => setDragging(false)

    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerup', stop)
    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerup', stop)
    }
  }, [dragging])

  return { onPointerDown, dragging }
}
