import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SITE } from '@/lib/constants'

interface HeroProps { loaded: boolean }

export function Hero({ loaded }: HeroProps) {
  const rowRefs  = useRef<(HTMLSpanElement | null)[]>([])
  const eyeRef   = useRef<HTMLParagraphElement>(null)
  const tagRef   = useRef<HTMLParagraphElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const availRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!loaded) return

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

    tl
      .to(eyeRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0)
      .to(rowRefs.current, {
        y: 0,
        duration: 1.1,
        stagger: 0.12,
      }, 0.1)
      .to(tagRef.current, { opacity: 1, y: 0, duration: 0.9 }, 0.6)
      .to([scrollRef.current, availRef.current], { opacity: 1, duration: 0.8 }, 0.9)

    return () => { tl.kill() }
  }, [loaded])

  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-end overflow-hidden bg-black">
      {/* Decorative vertical lines */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-32 w-px h-full bg-gradient-to-b from-transparent via-gold/25 to-gold/08 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-0 left-32 w-px h-full bg-gradient-to-b from-transparent via-white/[0.04] to-transparent pointer-events-none"
      />

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-radial from-gold/[0.06] to-transparent pointer-events-none"
      />

      {/* Ghost letter */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 -right-4 -translate-y-1/2 font-display text-ivory/[0.025] pointer-events-none select-none leading-none"
        style={{ fontSize: 'clamp(100px, 22vw, 280px)' }}
      >
        SH
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full px-6 md:px-[60px] pb-16 md:pb-20">
        <p
          ref={eyeRef}
          className="deco-line font-body text-[10px] tracking-ultra uppercase text-gold mb-5 opacity-0 translate-y-5"
        >
          Freelance Videographer · {SITE.location}
        </p>

        <h1
          aria-label="Shubham — Frames that Speak"
          className="font-display text-fluid-hero leading-hero tracking-[0.025em] text-ivory"
        >
          {[
            { text: 'SHUBHAM',     cls: '' },
            { text: 'Frames that', cls: 'font-serif italic font-light text-gold text-[0.6em]' },
            { text: 'SPEAK',       cls: '' },
          ].map(({ text, cls }, i) => (
            <span key={i} className="block clip-text">
              <span
                ref={(el) => { rowRefs.current[i] = el }}
                className={`block translate-y-full ${cls}`}
              >
                {text}
              </span>
            </span>
          ))}
        </h1>

        <p
          ref={tagRef}
          className="mt-7 font-serif italic font-light text-lgrey max-w-sm leading-relaxed opacity-0 translate-y-5"
          style={{ fontSize: 'clamp(14px, 1.5vw, 19px)' }}
        >
          {SITE.tagline}
        </p>
      </div>

      {/* Available badge */}
      <div
        ref={availRef}
        className="absolute bottom-16 left-6 md:left-[60px] flex items-center gap-2 font-body text-[10px] tracking-[0.2em] uppercase text-lgrey opacity-0 hidden md:flex"
      >
        <span className="w-1.5 h-1.5 bg-[#4caf50] rounded-full animate-pulse-green" />
        Available for Projects
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollRef}
        aria-hidden="true"
        className="absolute bottom-16 right-6 md:right-[60px] flex flex-col items-center gap-3 opacity-0"
      >
        <div className="w-px animate-scroll-bar bg-gradient-to-b from-gold-dim to-transparent" style={{ height: '55px' }} />
        <span className="font-body text-[9px] tracking-[0.35em] uppercase text-gold-dim [writing-mode:vertical-rl]">
          Scroll
        </span>
      </div>
    </section>
  )
}
