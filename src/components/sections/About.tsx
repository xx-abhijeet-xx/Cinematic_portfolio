import { useInView } from 'react-intersection-observer'
import { LazyImage } from '@/components/ui/LazyImage'
import { useReveal } from '@/hooks/useReveal'
import { useCounter } from '@/hooks/useCounter'
import { STATS } from '@/lib/constants'

function StatItem({ num, suffix, label }: { num: number; suffix: string; label: string }) {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true })
  const count = useCounter(num, 1600, inView)

  return (
    <div ref={ref}>
      <p className="font-display text-[48px] md:text-[52px] text-gold leading-none">
        {count}{suffix}
      </p>
      <p className="font-body text-[10px] tracking-[0.18em] uppercase text-lgrey mt-1.5">
        {label}
      </p>
    </div>
  )
}

export function About() {
  const textRef  = useReveal<HTMLDivElement>()
  const imgRef   = useReveal<HTMLDivElement>({ rootMargin: '0px 0px -40px 0px' })

  return (
    <section id="about" className="py-24 md:py-36 px-6 md:px-[60px]">
      <div className="max-w-[1320px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-24 items-center">

        {/* Text column */}
        <div ref={textRef} className="reveal-up">
          <p className="deco-line font-body text-[10px] tracking-ultra uppercase text-gold mb-7">
            About Me
          </p>

          <h2 className="font-serif font-light text-fluid-h2 leading-[1.1] text-ivory mb-7">
            Visual stories<br />
            <em className="italic text-gold">worth feeling.</em>
          </h2>

          <p className="font-body font-light text-[14px] leading-[1.95] text-lgrey mb-12 max-w-[440px]">
            I'm Shubham — a freelance videographer based in Mumbai. I work at the
            intersection of cinematic craft and commercial intent. Whether it's an ad
            that needs to convert, a couple's golden-hour story, or a brand reel that
            stops the scroll — I bring the same obsessive attention to light, motion,
            and emotion to every frame.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-9 border-t border-white/[0.06]">
            {STATS.map((s) => (
              <StatItem key={s.label} {...s} />
            ))}
          </div>
        </div>

        {/* Image column */}
        <div ref={imgRef} className="reveal-up order-first md:order-last">
          <div className="relative">
            {/* Corner accents */}
            <span
              aria-hidden="true"
              className="absolute -top-3 -right-3 w-14 h-14 border-t border-r border-gold-dim z-10 pointer-events-none"
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-3 -left-3 w-14 h-14 border-b border-l border-gold-dim z-10 pointer-events-none"
            />

            <LazyImage
              src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=700&q=80&auto=format"
              srcSet="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&q=75&auto=format 400w, https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=700&q=80&auto=format 700w"
              sizes="(max-width: 768px) 100vw, 50vw"
              alt="Shubham behind the camera on a film set"
              wrapperClassName="aspect-[3/4] max-w-[420px]"
              className="grayscale-[15%] contrast-[1.08] hover:scale-[1.04] transition-transform duration-700 ease-out"
            />

            {/* Caption overlay */}
            <p className="absolute bottom-5 left-5 font-serif italic text-[12px] text-ivory/50 z-10">
              Behind the lens, always.
            </p>

            {/* Gradient overlay */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none"
            />
          </div>

          {/* Location */}
          <div className="mt-5 flex items-center gap-2.5 font-body text-[11px] tracking-[0.15em] uppercase text-lgrey">
            <span className="text-gold text-sm">◎</span>
            Jabalpur · Available nationwide
          </div>
        </div>

      </div>
    </section>
  )
}
