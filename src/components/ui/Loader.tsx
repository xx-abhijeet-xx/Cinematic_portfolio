import { useEffect, useRef, useState } from 'react'

interface LoaderProps {
  onComplete: () => void
}

/**
 * Cinematic loader: counter 0 → 100 with eased timing,
 * progress bar, vertical lines, then curtain wipe out.
 */
export function Loader({ onComplete }: LoaderProps) {
  const [count,   setCount]   = useState(0)
  const [exiting, setExiting] = useState(false)
  const barRef     = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const DURATION  = 2600
    const startTime = performance.now()

    let rafId: number

    function tick(now: number) {
      const elapsed  = now - startTime
      const raw      = Math.min(elapsed / DURATION, 1)
      // easeInOutCubic
      const eased    = raw < 0.5
        ? 4 * raw * raw * raw
        : 1 - Math.pow(-2 * raw + 2, 3) / 2

      const value = Math.round(eased * 100)
      setCount(value)
      if (barRef.current) barRef.current.style.width = `${value}%`

      if (value < 100) {
        rafId = requestAnimationFrame(tick)
      } else {
        // Counter exit animation, then fade loader
        setTimeout(() => {
          setExiting(true)
          setTimeout(onComplete, 900)
        }, 400)
      }
    }

    // Small delay so the page has painted
    const initTimer = setTimeout(() => {
      rafId = requestAnimationFrame(tick)
    }, 300)

    return () => {
      clearTimeout(initTimer)
      cancelAnimationFrame(rafId)
    }
  }, [onComplete])

  return (
    <div
      aria-label="Loading"
      aria-live="polite"
      className={`
        fixed inset-0 z-[99997] bg-black flex flex-col items-center justify-center
        overflow-hidden select-none
        transition-opacity duration-700 ease-in-out
        ${exiting ? 'opacity-0 pointer-events-none' : 'opacity-100'}
      `}
    >
      {/* Background decorative lines */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex justify-around opacity-[0.04]"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className="block w-px h-full bg-ivory" />
        ))}
      </div>

      {/* Counter */}
      <div
        ref={counterRef}
        className={`
          font-display text-ivory relative z-10 leading-none tracking-tight
          transition-all duration-700 ease-expo-out
          ${exiting ? '-translate-y-16 scale-110 opacity-0' : 'translate-y-0 scale-100 opacity-100'}
        `}
        style={{ fontSize: 'clamp(90px, 18vw, 220px)' }}
        aria-hidden="true"
      >
        {count}
      </div>

      {/* Label */}
      <p
        className={`
          font-body text-gold text-[10px] tracking-ultra uppercase mt-5
          relative z-10 transition-opacity duration-500
          ${exiting ? 'opacity-0' : 'opacity-100'}
        `}
      >
        Loading
      </p>

      {/* Progress bar */}
      <div className="absolute bottom-14 left-14 right-14 h-px bg-white/[0.08]">
        <div
          ref={barRef}
          className="h-full bg-gold w-0 transition-none"
          role="progressbar"
          aria-valuenow={count}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      {/* Site name */}
      <p className="absolute bottom-8 left-14 font-display text-[11px] tracking-[0.25em] text-ivory/20">
        SHUBHAM · VIDEOGRAPHER
      </p>
    </div>
  )
}
