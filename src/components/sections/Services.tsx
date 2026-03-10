import { useReveal } from '@/hooks/useReveal'
import { SERVICES } from '@/lib/constants'

const ICONS: Record<string, React.ReactNode> = {
  video: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.9L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  ),
  trending: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
}

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M7 17L17 7M17 7H7M17 7v10" />
  </svg>
)

export function Services() {
  const headerRef = useReveal<HTMLDivElement>()

  return (
    <section id="services" className="relative py-24 md:py-32 px-6 md:px-[60px] bg-offblack overflow-hidden">
      {/* Ghost word */}
      <p
        aria-hidden="true"
        className="absolute top-10 -right-8 font-display text-ivory/[0.018] whitespace-nowrap pointer-events-none select-none"
        style={{ fontSize: 'clamp(80px, 16vw, 230px)' }}
      >
        SERVICES
      </p>

      <div className="max-w-[1320px] mx-auto">
        {/* Header */}
        <div ref={headerRef} className="reveal-up mb-16 md:mb-20">
          <p className="deco-line font-body text-[10px] tracking-ultra uppercase text-gold mb-6">
            What I Do
          </p>
          <h2 className="font-display leading-heading tracking-[0.03em] text-ivory"
              style={{ fontSize: 'clamp(48px, 7.5vw, 108px)' }}>
            CRAFT &amp;<br />
            <span className="font-serif italic font-light text-gold" style={{ fontSize: '0.52em' }}>
              Expertise
            </span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.num} service={service} delay={i % 2 === 0 ? 0 : 150} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({
  service,
  delay,
}: {
  service: typeof SERVICES[number]
  delay: number
}) {
  const ref = useReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className="reveal-up group relative bg-charcoal hover:bg-[#1c1c1c] transition-colors duration-400 p-12 md:p-14 overflow-hidden cursor-none"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Bottom accent line */}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-gold to-transparent group-hover:w-full transition-all duration-600 ease-expo-out"
      />

      <p className="font-display text-[68px] text-gold/10 group-hover:text-gold/22 leading-none mb-5 transition-colors duration-400">
        {service.num}
      </p>

      <div className="w-10 h-10 text-gold mb-5">
        {ICONS[service.icon]}
      </div>

      <h3 className="font-serif text-[28px] font-normal text-ivory leading-tight mb-3">
        {service.name}
      </h3>

      <p className="font-body font-light text-[13px] leading-[1.85] text-lgrey max-w-[360px]">
        {service.desc}
      </p>

      {/* Arrow */}
      <div
        aria-hidden="true"
        className="absolute bottom-9 right-9 w-10 h-10 rounded-full border border-gold/18 flex items-center justify-center text-gold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400"
      >
        <ArrowIcon />
      </div>
    </div>
  )
}
