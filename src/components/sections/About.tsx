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
        <div ref={imgRef} className="reveal-up order-first md:order-last flex gap-4 items-stretch">

          {/* Vertical cinematic text strip */}
          <div className="hidden md:flex flex-col items-center justify-between py-2 shrink-0">
            {/* Thin gold line top */}
            <div className="w-px flex-1 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
            {/* Rotated text */}
            <p
              aria-hidden="true"
              className="font-body text-[9px] tracking-[0.45em] uppercase text-gold/40 my-4"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              Videographer · Mumbai · 2020–Present
            </p>
            {/* Thin gold line bottom */}
            <div className="w-px flex-1 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
          </div>

          {/* Image wrapper — fills full column */}
          <div className="relative flex-1">
            {/* Corner accents */}
            <span aria-hidden="true" className="absolute -top-3 -right-3 w-14 h-14 border-t border-r border-gold-dim z-10 pointer-events-none" />
            <span aria-hidden="true" className="absolute -bottom-3 -left-3 w-14 h-14 border-b border-l border-gold-dim z-10 pointer-events-none" />

            <LazyImage
              src="https://res.cloudinary.com/dtnjsldz3/image/upload/w_700,q_80,c_fill,g_face,ar_3:4/v1773157597/b87ab299-94ae-46b3-959d-bc7acdb94cf2_zgr4ko.jpg"
              srcSet="https://res.cloudinary.com/dtnjsldz3/image/upload/w_400,q_75,c_fill,g_face,ar_3:4/v1773157597/b87ab299-94ae-46b3-959d-bc7acdb94cf2_zgr4ko.jpg 400w, https://res.cloudinary.com/dtnjsldz3/image/upload/w_700,q_80,c_fill,g_face,ar_3:4/v1773157597/b87ab299-94ae-46b3-959d-bc7acdb94cf2_zgr4ko.jpg 700w"
              sizes="(max-width: 768px) 100vw, 50vw"
              alt="Shubham — Videographer & Filmmaker, Mumbai"
              wrapperClassName="aspect-[3/4] w-full"
              className="grayscale-[20%] contrast-[1.1] brightness-[0.92] transition-all duration-700 ease-out"
            />

            {/* Caption overlay */}
            <p className="absolute bottom-5 left-5 font-serif italic text-[12px] text-ivory/50 z-10">
              The eye behind the lens.
            </p>

            {/* Bottom gradient */}
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
            {/* Side vignette */}
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />
            {/* Gold tint */}
            <div aria-hidden="true" className="absolute inset-0 mix-blend-color opacity-[0.06] bg-[#c8a96d] pointer-events-none" />
          </div>

          {/* Right side — availability badge + year */}
          <div className="hidden md:flex flex-col items-center justify-between py-2 shrink-0">
            <div className="w-px flex-1 bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
            {/* Availability dot */}
            <div className="flex flex-col items-center gap-2 my-4">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <p
                className="font-body text-[9px] tracking-[0.4em] uppercase text-gold/40"
                style={{ writingMode: 'vertical-rl' }}
              >
                Available
              </p>
            </div>
            <div className="w-px flex-1 bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
          </div>

        </div>

        {/* Location — below image on mobile */}
        <div className="md:hidden mt-4 flex items-center gap-2.5 font-body text-[11px] tracking-[0.15em] uppercase text-lgrey">
          <span className="text-gold text-sm">◎</span>
          Mumbai · Available nationwide
        </div>

      </div>
    </section>
  )
}
