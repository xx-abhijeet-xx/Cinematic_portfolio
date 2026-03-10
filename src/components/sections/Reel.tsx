import { useState, useCallback } from 'react'
import { useReveal } from '@/hooks/useReveal'
import { useMagnetic } from '@/hooks/useMagnetic'
import { SITE } from '@/lib/constants'

function FilmHoles() {
  return (
    <div aria-hidden="true" className="flex gap-1 mb-3 opacity-20">
      {Array.from({ length: 6 }).map((_, i) => (
        <span key={i} className="w-2.5 h-2 border border-ivory rounded-sm" />
      ))}
    </div>
  )
}

export function Reel() {
  const [modalOpen, setModalOpen] = useState(false)
  const revealRef = useReveal<HTMLDivElement>()
  const btnRef    = useMagnetic<HTMLButtonElement>(0.2)

  const openModal  = useCallback(() => setModalOpen(true),  [])
  const closeModal = useCallback(() => setModalOpen(false), [])

  // Close modal on Escape
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeModal()
  }, [closeModal])

  return (
    <section id="reel" className="relative py-24 md:py-28 px-6 md:px-[60px] bg-offblack">
      {/* Wrap */}
      <div className="relative w-full md:w-[78%] mx-auto">
        {/* Reveal box */}
        <div
          ref={revealRef}
          className="reveal-up"
        >
          {/* Border glow */}
          <div
            aria-hidden="true"
            className="absolute -inset-px bg-gradient-to-br from-gold/40 via-transparent to-gold/20 pointer-events-none z-0"
          />

          {/* Click area */}
          <button
            ref={btnRef}
            onClick={openModal}
            aria-label="Watch showreel 2024"
            className="
              relative z-10 w-full aspect-video bg-charcoal
              flex flex-col items-center justify-center gap-5
              cursor-none group
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold
            "
          >
            <FilmHoles />

            {/* Play circle */}
            <div className="
              relative w-20 h-20 rounded-full border border-gold/50
              flex items-center justify-center
              group-hover:bg-gold group-hover:border-gold
              transition-all duration-400
              before:absolute before:inset-[-10px] before:rounded-full before:border before:border-gold/15
              group-hover:before:inset-[-18px] group-hover:before:border-gold/25
              before:transition-all before:duration-400
            ">
              <svg
                className="w-5 h-5 ml-1 fill-gold group-hover:fill-black transition-colors duration-300"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>

            <p className="font-body text-[10px] tracking-ultra uppercase text-gold-dim">
              Watch Showreel 2024
            </p>

            {/* Year tag */}
            <span
              aria-hidden="true"
              className="absolute top-4 right-4 font-display text-[11px] tracking-[0.15em] text-ivory/20"
            >
              © 2024
            </span>
          </button>
        </div>

        {/* Ghost text */}
        <p
          aria-hidden="true"
          className="absolute -bottom-8 left-0 font-display text-ivory/[0.025] whitespace-nowrap pointer-events-none select-none"
          style={{ fontSize: 'clamp(60px, 10vw, 130px)' }}
        >
          SHOWREEL
        </p>
      </div>

      {/* Video modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Showreel video"
          className="fixed inset-0 z-[99990] bg-black/92 flex items-center justify-center p-4"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <div
            className="relative w-full max-w-4xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={SITE.reelUrl}
              title="Showreel 2024"
              allow="autoplay; fullscreen"
              allowFullScreen
              loading="lazy"
              className="w-full h-full border-none"
            />
          </div>
          <button
            onClick={closeModal}
            aria-label="Close video"
            className="absolute top-6 right-6 font-body text-[11px] tracking-[0.2em] uppercase text-ivory/60 hover:text-gold transition-colors duration-300 cursor-none"
          >
            ✕ Close
          </button>
        </div>
      )}
    </section>
  )
}
