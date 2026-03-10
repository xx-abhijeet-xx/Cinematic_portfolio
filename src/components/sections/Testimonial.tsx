import { useReveal } from '@/hooks/useReveal'
import { TESTIMONIAL } from '@/lib/constants'

export function Testimonial() {
  const ref = useReveal<HTMLElement>()

  return (
    <section
      ref={ref}
      className="reveal-up relative py-24 md:py-32 px-6 md:px-[60px] bg-charcoal text-center overflow-hidden"
    >
      {/* Giant decorative quote mark */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 font-serif text-gold/[0.04] leading-none pointer-events-none select-none"
        style={{ fontSize: 'clamp(200px, 35vw, 400px)' }}
      >
        &ldquo;
      </span>

      <blockquote className="relative z-10 font-serif italic font-light text-fluid-xl leading-relaxed text-ivory max-w-3xl mx-auto mb-9">
        {TESTIMONIAL.quote}
      </blockquote>

      <p className="font-body text-[10px] tracking-[0.35em] uppercase text-gold relative z-10">
        — {TESTIMONIAL.author}, {TESTIMONIAL.role}
      </p>
    </section>
  )
}
