import { useEffect, useRef } from 'react'

/**
 * Adds a magnetic pull effect to any element.
 * Automatically disabled on touch devices.
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>(strength = 0.3) {
  const ref = useRef<T>(null)

  useEffect(() => {
    // Skip on touch devices
    if (!window.matchMedia('(pointer: fine)').matches) return

    const el = ref.current
    if (!el) return

    function onMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect()
      const cx   = rect.left + rect.width  / 2
      const cy   = rect.top  + rect.height / 2
      const dx   = (e.clientX - cx) * strength
      const dy   = (e.clientY - cy) * strength
      el!.style.transform = `translate(${dx}px, ${dy}px)`
    }

    function onLeave() {
      el!.style.transform = ''
      el!.style.transition = 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)'
      const reset = () => { el!.style.transition = '' }
      el!.addEventListener('transitionend', reset, { once: true })
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)

    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength])

  return ref
}
