import { useEffect, useRef, useState } from 'react'
import { NAV_LINKS, SITE } from '@/lib/constants'
import { useMagnetic } from '@/hooks/useMagnetic'

function NavCta() {
  const ref = useMagnetic<HTMLAnchorElement>(0.25)
  return (
    <a
      ref={ref}
      href="#contact"
      className="
        group relative hidden md:inline-flex items-center
        border border-gold/40 text-gold
        text-[10px] font-medium tracking-wide2 uppercase
        px-5 py-[10px]
        overflow-hidden
        transition-colors duration-300
        cursor-none
      "
    >
      <span
        aria-hidden
        className="absolute inset-0 bg-gold scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-[0.4s] ease-expo-out"
      />
      <span className="relative z-10 group-hover:text-black transition-colors duration-300">
        Let's Talk
      </span>
    </a>
  )
}

export function Navbar({ loaded }: { loaded: boolean }) {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 60) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lenis smooth scroll on nav clicks
  function scrollTo(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault()
    const target = document.querySelector(href)
    if (!target) return
    const lenis = (window as unknown as Record<string, unknown>).__lenis__ as { scrollTo: (el: Element) => void } | undefined
    if (lenis) {
      lenis.scrollTo(target)
    } else {
      target.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  return (
    <>
      <header
        ref={navRef}
        className={`
          fixed top-0 left-0 right-0 z-[1000]
          flex justify-between items-center
          px-6 md:px-[60px]
          transition-all duration-400
          ${loaded ? 'opacity-100' : 'opacity-0'}
          ${scrolled
            ? 'py-[18px] bg-black/85 backdrop-blur-md border-b border-white/[0.04]'
            : 'py-7'
          }
        `}
      >
        <a href="/" className="font-display text-[20px] tracking-[0.18em] text-ivory z-10">
          {SITE.name.toUpperCase()}
        </a>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex gap-9 list-none">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => scrollTo(e, href)}
                  className="link-hover font-body text-[10px] font-medium tracking-wide2 uppercase text-ivory/55 hover:text-ivory transition-colors duration-300 cursor-none"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <NavCta />

        {/* Hamburger — mobile */}
        <button
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(v => !v)}
          className="md:hidden flex flex-col gap-[5px] p-1 z-[9999] cursor-pointer"
        >
          <span className={`block w-6 h-px bg-ivory transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[9px]' : ''}`} />
          <span className={`block w-6 h-px bg-ivory transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-ivory transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[4px]' : ''}`} />
        </button>
      </header>

      {/* Mobile full-screen menu */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`
          fixed inset-0 z-[9000] bg-black
          flex flex-col items-center justify-center gap-10
          transition-opacity duration-400
          ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      >
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            onClick={(e) => scrollTo(e, href)}
            className="font-display text-[clamp(40px,10vw,72px)] tracking-[0.06em] text-ivory hover:text-gold transition-colors duration-300"
          >
            {label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={(e) => scrollTo(e, '#contact')}
          className="font-display text-[clamp(40px,10vw,72px)] tracking-[0.06em] text-gold"
        >
          Contact
        </a>
      </div>
    </>
  )
}
