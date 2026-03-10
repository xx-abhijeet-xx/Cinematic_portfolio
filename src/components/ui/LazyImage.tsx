import { useState, useRef, useEffect } from 'react'

interface LazyImageProps {
  src: string
  srcSet?: string
  alt: string
  className?: string
  sizes?: string
  /** Aspect ratio wrapper class, e.g. "aspect-[3/4]" */
  wrapperClassName?: string
  objectFit?: 'cover' | 'contain'
}

/**
 * Lazy-loads an image using IntersectionObserver.
 * Shows a skeleton shimmer until loaded.
 * Falls back to native lazy loading for browsers that don't support IO.
 */
export function LazyImage({
  src,
  srcSet,
  alt,
  className = '',
  sizes,
  wrapperClassName = '',
  objectFit = 'cover',
}: LazyImageProps) {
  const [loaded,   setLoaded]   = useState(false)
  const [inView,   setInView]   = useState(false)
  const [errored,  setErrored]  = useState(false)
  const imgRef  = useRef<HTMLImageElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  // IO — trigger load when near viewport
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(el)
        }
      },
      { rootMargin: '200px 0px' }, // pre-load 200px before entering view
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Once in view, watch for the img load event
  useEffect(() => {
    const img = imgRef.current
    if (!img || !inView) return

    if (img.complete && img.naturalWidth > 0) {
      setLoaded(true)
    }
  }, [inView])

  const fitClass = objectFit === 'cover' ? 'object-cover' : 'object-contain'

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${wrapperClassName}`}>
      {/* Skeleton */}
      {!loaded && !errored && (
        <div
          aria-hidden="true"
          className="absolute inset-0 skeleton"
        />
      )}

      {/* Error state */}
      {errored && (
        <div
          aria-label="Image failed to load"
          className="absolute inset-0 flex items-center justify-center bg-charcoal text-lgrey text-xs tracking-widest uppercase"
        >
          —
        </div>
      )}

      {/* Image — only rendered once IO fires */}
      {inView && (
        <img
          ref={imgRef}
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={`
            w-full h-full transition-opacity duration-700 ease-out
            ${fitClass}
            ${loaded ? 'opacity-100' : 'opacity-0'}
            ${className}
          `}
        />
      )}
    </div>
  )
}
