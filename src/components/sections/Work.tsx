import { useRef, useCallback } from 'react'
import { LazyImage } from '@/components/ui/LazyImage'
import { useReveal } from '@/hooks/useReveal'
import { WORKS } from '@/lib/constants'

export function Work() {
  const headerRef = useReveal<HTMLDivElement>()
  const trackRef  = useRef<HTMLDivElement>(null)

  // Drag to scroll
  const isDragging = useRef(false)
  const startX     = useRef(0)
  const scrollLeft = useRef(0)

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true
    startX.current     = e.pageX - (trackRef.current?.offsetLeft ?? 0)
    scrollLeft.current = trackRef.current?.scrollLeft ?? 0
    if (trackRef.current) trackRef.current.style.cursor = 'grabbing'
  }, [])

  const onMouseUp = useCallback(() => {
    isDragging.current = false
    if (trackRef.current) trackRef.current.style.cursor = ''
  }, [])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return
    e.preventDefault()
    const x    = e.pageX - trackRef.current.offsetLeft
    const walk = (x - startX.current) * 1.6
    trackRef.current.scrollLeft = scrollLeft.current - walk
  }, [])

  return (
    <section id="work" className="pt-24 md:pt-32">
      {/* Header */}
      <div
        ref={headerRef}
        className="reveal-up px-6 md:px-[60px] flex flex-col md:flex-row justify-between items-start md:items-end gap-5 mb-14 max-w-[1320px] mx-auto"
      >
        <div>
          <p className="deco-line font-body text-[10px] tracking-ultra uppercase text-gold mb-5">
            Selected Work
          </p>
          <h2 className="font-display text-fluid-h3 leading-heading text-ivory">
            SELECTED<br />WORK
          </h2>
        </div>
        <p className="font-serif italic text-[16px] text-lgrey max-w-[250px] leading-relaxed md:text-right">
          A curated cut of recent projects across film, content &amp; campaigns.
        </p>
      </div>

      {/* Horizontal scrollable track */}
      <div
        ref={trackRef}
        className="
          flex gap-5 px-6 md:px-[60px] pb-16
          overflow-x-auto overflow-y-hidden
          [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          select-none
        "
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onMouseMove={onMouseMove}
        role="list"
        aria-label="Work portfolio"
      >
        {WORKS.map((work, i) => (
          <WorkCard key={work.id} work={work} index={i} />
        ))}
      </div>

      {/* Drag hint */}
      <div
        aria-hidden="true"
        className="flex items-center gap-4 px-6 md:px-[60px] pb-16 font-body text-[10px] tracking-[0.3em] uppercase text-mgrey"
      >
        <span className="block w-12 h-px bg-mgrey" />
        Drag to explore
      </div>
    </section>
  )
}

function WorkCard({
  work,
  index,
}: {
  work: typeof WORKS[number]
  index: number
}) {
  const ref = useReveal<HTMLDivElement>()

  return (
    <article
      ref={ref}
      role="listitem"
      className="
        reveal-up group relative shrink-0 overflow-hidden bg-charcoal
        w-[82vw] md:w-[380px] lg:w-[420px]
        cursor-none
      "
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="work-card-aspect relative overflow-hidden">
        {/* Lazy image */}
        <LazyImage
          src={work.src}
          srcSet={work.srcSet}
          sizes="(max-width: 768px) 82vw, 420px"
          alt={`${work.title} — ${work.subtitle}`}
          wrapperClassName="absolute inset-0"
          className="group-hover:scale-[1.06] transition-transform duration-700 ease-out"
        />

        {/* Fallback gradient (shows until image loads) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: work.bg }}
        />

        {/* Overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent"
        />

        {/* Year */}
        <span
          aria-hidden="true"
          className="absolute top-4 right-4 font-display text-[11px] tracking-[0.15em] text-ivory/25"
        >
          {work.year}
        </span>

        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0 p-7 translate-y-3 group-hover:translate-y-0 transition-transform duration-400 ease-expo-out">
          <p className="font-body text-[9px] tracking-[0.35em] uppercase text-gold mb-2">
            {work.cat}
          </p>
          <h3 className="font-serif text-[20px] font-normal text-ivory leading-tight">
            {work.title}<br />{work.subtitle}
          </h3>
        </div>
      </div>
    </article>
  )
}
