import { MARQUEE_ITEMS } from '@/lib/constants'

export function Marquee() {
  // Duplicate for seamless loop
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

  return (
    <div className="overflow-hidden border-t border-b border-white/[0.05] bg-offblack py-4">
      <div
        className="flex gap-12 w-max animate-marquee"
        aria-hidden="true" // decorative
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-12 shrink-0 font-display text-[12px] tracking-[0.3em] text-mgrey uppercase"
          >
            {item}
            <span className="w-1 h-1 bg-gold rounded-full shrink-0" />
          </div>
        ))}
      </div>
    </div>
  )
}
