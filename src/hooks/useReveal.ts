import { useEffect, useRef } from 'react'

interface UseRevealOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
  className?: string
}

/**
 * Attaches an IntersectionObserver to the returned ref.
 * When the element enters the viewport, `className` is added.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(
  options: UseRevealOptions = {},
) {
  const {
    threshold  = 0.12,
    rootMargin = '0px 0px -60px 0px',
    once       = true,
    className  = 'in-view',
  } = options

  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(className)
          if (once) observer.unobserve(el)
        } else if (!once) {
          el.classList.remove(className)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once, className])

  return ref
}
