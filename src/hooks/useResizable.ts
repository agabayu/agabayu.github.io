import { useCallback, useEffect, useRef, useState } from 'react'
import type { Point, Size } from '../types'

interface UseResizableOptions {
  position: Point
  size: Size
  onResize: (size: Size) => void
  onStart?: () => void
}

const MIN_SIZE: Size = { width: 360, height: 300 }

/** Pointer-based bottom-right window resizing with viewport-aware bounds. */
export function useResizable({ position, size, onResize, onStart }: UseResizableOptions) {
  const [resizing, setResizing] = useState(false)
  const origin = useRef({ x: 0, y: 0, width: 0, height: 0 })
  const latest = useRef({ position, size, onResize })
  latest.current = { position, size, onResize }

  const onResizePointerDown = useCallback((event: React.PointerEvent) => {
    event.preventDefault()
    event.stopPropagation()
    origin.current = {
      x: event.clientX,
      y: event.clientY,
      width: latest.current.size.width,
      height: latest.current.size.height,
    }
    setResizing(true)
    onStart?.()
  }, [onStart])

  useEffect(() => {
    if (!resizing) return

    const handleMove = (event: PointerEvent) => {
      const maxWidth = Math.max(MIN_SIZE.width, window.innerWidth - latest.current.position.x)
      const maxHeight = Math.max(MIN_SIZE.height, window.innerHeight - latest.current.position.y)
      latest.current.onResize({
        width: Math.min(maxWidth, Math.max(MIN_SIZE.width, origin.current.width + event.clientX - origin.current.x)),
        height: Math.min(maxHeight, Math.max(MIN_SIZE.height, origin.current.height + event.clientY - origin.current.y)),
      })
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

  return { onResizePointerDown, resizing }
}
