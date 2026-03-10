import { useEffect, useRef } from 'react'

/**
 * Custom cursor — dot + trailing ring.
 * Only renders on pointer:fine devices.
 * Uses RAF for the ring lag effect (not CSS transition).
 */
export function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouse   = useRef({ x: 0, y: 0 })
  const ring    = useRef({ x: 0, y: 0 })
  const rafId   = useRef<number | null>(null)
  const isHover = useRef(false)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const dot  = dotRef.current
    const ringEl = ringRef.current
    if (!dot || !ringEl) return

    function onMove(e: MouseEvent) {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      // Dot follows immediately
      dot!.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    }

    function tick() {
      const lerp = 0.12
      ring.current.x += (mouse.current.x - ring.current.x) * lerp
      ring.current.y += (mouse.current.y - ring.current.y) * lerp
      ringEl!.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`
      rafId.current = requestAnimationFrame(tick)
    }

    function onEnterHoverable() {
      isHover.current = true
      dot!.style.width  = '14px'
      dot!.style.height = '14px'
      dot!.style.background = '#ede9e1'
      ringEl!.style.width  = '56px'
      ringEl!.style.height = '56px'
      ringEl!.style.borderColor = 'rgba(200,169,109,0.7)'
    }

    function onLeaveHoverable() {
      isHover.current = false
      dot!.style.width  = '8px'
      dot!.style.height = '8px'
      dot!.style.background = '#c8a96d'
      ringEl!.style.width  = '38px'
      ringEl!.style.height = '38px'
      ringEl!.style.borderColor = 'rgba(200,169,109,0.45)'
    }

    function attachHoverListeners() {
      document.querySelectorAll('a, button, [data-cursor-hover]').forEach(el => {
        el.addEventListener('mouseenter', onEnterHoverable)
        el.addEventListener('mouseleave', onLeaveHoverable)
      })
    }

    window.addEventListener('mousemove', onMove)
    rafId.current = requestAnimationFrame(tick)
    attachHoverListeners()

    // Re-attach when DOM changes (lazy-loaded sections)
    const mo = new MutationObserver(attachHoverListeners)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      if (rafId.current) cancelAnimationFrame(rafId.current)
      mo.disconnect()
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position:   'fixed',
          top:        0,
          left:       0,
          width:      '8px',
          height:     '8px',
          background: '#c8a96d',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex:     99999,
          marginTop:  '-4px',
          marginLeft: '-4px',
          willChange: 'transform',
          transition: 'width .25s, height .25s, background .25s',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position:   'fixed',
          top:        0,
          left:       0,
          width:      '38px',
          height:     '38px',
          border:     '1px solid rgba(200,169,109,0.45)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex:     99998,
          marginTop:  '-19px',
          marginLeft: '-19px',
          willChange: 'transform',
          transition: 'width .4s cubic-bezier(.25,.46,.45,.94), height .4s cubic-bezier(.25,.46,.45,.94), border-color .3s',
        }}
      />
    </>
  )
}
