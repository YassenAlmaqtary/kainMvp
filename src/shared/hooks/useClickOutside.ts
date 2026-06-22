import { useEffect, useRef } from 'react'

/** Close popover/dropdown when clicking outside the container. */
export function useClickOutside<T extends HTMLElement>(
  onClose: () => void,
  enabled = true,
) {
  const ref = useRef<T>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    if (!enabled) return

    function handleMouseDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onCloseRef.current()
      }
    }

    document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [enabled])

  return ref
}
