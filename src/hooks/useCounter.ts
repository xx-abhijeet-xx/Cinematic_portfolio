import { useEffect, useRef, useState } from 'react'

/**
 * Returns an animated count value from 0 → `target`.
 * Animation starts when `shouldStart` becomes true.
 */
export function useCounter(target: number, duration = 1600, shouldStart = false) {
  const [count, setCount] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!shouldStart) return

    let startTime: number | null = null

    function step(timestamp: number) {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step)
      }
    }

    rafRef.current = requestAnimationFrame(step)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [target, duration, shouldStart])

  return count
}
