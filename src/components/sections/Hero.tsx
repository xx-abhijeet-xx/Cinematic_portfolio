import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SITE, SERVICES, STATS } from '@/lib/constants'

interface HeroProps { loaded: boolean }

export function Hero({ loaded }: HeroProps) {
  const rowRefs   = useRef<(HTMLSpanElement | null)[]>([])
  const eyeRef    = useRef<HTMLParagraphElement>(null)
  const tagRef    = useRef<HTMLParagraphElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const availRef  = useRef<HTMLDivElement>(null)
  const rightRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!loaded) return

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

    tl
      .to(eyeRef.current,   { opacity: 1, y: 0, duration: 0.8 }, 0)
      .to(rowRefs.current,  { y: 0, duration: 1.1, stagger: 0.12 }, 0.1)
      .to(tagRef.current,   { opacity: 1, y: 0, duration: 0.9 }, 0.6)
      .to([scrollRef.current, availRef.current], { opacity: 1, duration: 0.8 }, 0.9)
      .to(rightRef.current, { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out' }, 0.4)

    return () => { tl.kill() }
  }, [loaded])

  const TAGS: Record<string, string> = {
    'Ad Films & Commercials': 'High Production',
    'Social Media Content':   'Scroll-stopping',
    'Pre-Wedding Shoots':     'Timeless',
    'Digital Marketing':      'Results-driven',
  }

  const SUBS: Record<string, string> = {
    'Ad Films & Commercials': 'Brand · Product · Campaign',
    'Social Media Content':   'Reels · Stories · Short-form',
    'Pre-Wedding Shoots':     'Cinematic · Golden Hour · Raw',
    'Digital Marketing':      'Strategy · Distribution · Analytics',
  }

  return (
    <section className="relative w-full h-screen min-h-[600px] flex overflow-hidden bg-black">

      {/* ── LEFT SIDE ── */}
      <div className="relative z-10 flex flex-col justify-end w-full md:w-1/2 px-6 md:px-[60px] pb-16 md:pb-20">

        {/* Decorative lines */}
        <div aria-hidden="true" className="absolute top-0 left-32 w-px h-full bg-gradient-to-b from-transparent via-white/[0.04] to-transparent pointer-events-none" />

        {/* Ambient glow */}
        <div aria-hidden="true" className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-gradient-radial from-gold/[0.05] to-transparent pointer-events-none" />

        {/* Ghost letter */}
        <div aria-hidden="true" className="absolute top-1/2 right-0 -translate-y-1/2 font-display text-ivory/[0.025] pointer-events-none select-none leading-none" style={{ fontSize: 'clamp(100px, 16vw, 220px)' }}>
          SH
        </div>

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
              <span ref={(el) => { rowRefs.current[i] = el }} className={`block translate-y-full ${cls}`}>
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

        {/* Available badge */}
        <div
          ref={availRef}
          className="absolute bottom-16 left-6 md:left-[60px] items-center gap-2 font-body text-[10px] tracking-[0.2em] uppercase text-lgrey opacity-0 hidden md:flex"
        >
          <span className="w-1.5 h-1.5 bg-[#4caf50] rounded-full animate-pulse-green" />
          Available for Projects
        </div>

        {/* Scroll hint */}
        <div
          ref={scrollRef}
          aria-hidden="true"
          className="absolute bottom-16 right-6 md:right-8 flex-col items-center gap-3 opacity-0 hidden md:flex"
        >
          <div className="w-px animate-scroll-bar bg-gradient-to-b from-gold-dim to-transparent" style={{ height: '55px' }} />
          <span className="font-body text-[9px] tracking-[0.35em] uppercase text-gold-dim [writing-mode:vertical-rl]">Scroll</span>
        </div>
      </div>

      {/* ── RIGHT SIDE — Service Cards ── */}
      <div
        ref={rightRef}
        className="hidden md:flex w-1/2 items-center justify-center px-10 py-20 border-l border-white/[0.03] relative z-10 opacity-0 translate-x-8"
      >
        {/* Subtle radial glow */}
        <div aria-hidden="true" className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full bg-gradient-radial from-gold/[0.05] to-transparent pointer-events-none" />

        <div className="w-full relative">

          {/* Header */}
          <div className="flex items-center gap-4 mb-5">
            <span className="font-body text-[9px] tracking-[0.45em] uppercase text-gold/30 whitespace-nowrap">
              What I do
            </span>
            <div className="flex-1 h-px bg-gold/10" />
          </div>

          {/* Service rows */}
          <ul className="list-none flex flex-col">
            {SERVICES.map((s, i) => (
              <li
                key={s.num}
                className="group relative flex items-center gap-5 py-5 border-b border-white/[0.04] transition-all duration-300 hover:pl-3 cursor-default"
              >
                {/* Left accent bar */}
                <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-gold scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />

                {/* Number */}
                <span className="font-serif italic text-[13px] text-gold/25 group-hover:text-gold/60 transition-colors duration-300 w-6 shrink-0 text-right">
                  {s.num}
                </span>

                {/* Name + sub */}
                <div className="flex flex-col gap-[3px] flex-1 min-w-0">
                  <span className="font-serif text-[20px] font-light text-ivory/75 group-hover:text-ivory transition-colors duration-300 leading-none">
                    {s.name}
                  </span>
                  <span className="font-body text-[9px] tracking-[0.2em] uppercase text-gold/25 group-hover:text-gold/40 transition-colors duration-300">
                    {SUBS[s.name]}
                  </span>
                </div>

                {/* Tag pill */}
                <span className="font-body text-[8px] tracking-[0.18em] uppercase text-gold/30 border border-gold/10 px-2.5 py-1 shrink-0 group-hover:border-gold/35 group-hover:text-gold/60 transition-all duration-300">
                  {TAGS[s.name]}
                </span>

                {/* Arrow */}
                <span className="font-body text-[13px] text-gold/40 opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0">
                  →
                </span>
              </li>
            ))}
          </ul>

          {/* Stats footer */}
          <div className="grid grid-cols-3 mt-5 pt-5 border-t border-white/[0.04]">
            {STATS.map((s, i) => (
              <div key={s.label} className={`flex flex-col gap-1 ${i === 1 ? 'items-center' : i === 2 ? 'items-end' : ''}`}>
                <span className="font-display text-[30px] text-gold leading-none">{s.num}{s.suffix}</span>
                <span className="font-body text-[8px] tracking-[0.28em] uppercase text-gold/30">{s.label}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

    </section>
  )
}