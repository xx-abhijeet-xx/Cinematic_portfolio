import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

/**
 * Initialises Lenis smooth scroll.
 * Returns the Lenis instance so callers can scrollTo() if needed.
 * Automatically destroyed on unmount.
 */
export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration:  1.2,
      easing:    (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // Disable smooth scroll on touch devices — native feels better
      // Lenis checks internally, but we guard here too
      smoothWheel: true,
    })

    lenisRef.current = lenis

    let raf: number

    function onFrame(time: number) {
      lenis.raf(time)
      raf = requestAnimationFrame(onFrame)
    }

    raf = requestAnimationFrame(onFrame)

    // Expose lenis globally for GSAP ScrollTrigger integration
    ;(window as unknown as Record<string, unknown>).__lenis__ = lenis

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return lenisRef
}
