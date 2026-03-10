import { SITE } from '@/lib/constants'

const SOCIAL = [
  { label: 'Instagram', href: SITE.instagram },
  { label: 'YouTube',   href: SITE.youtube   },
  { label: 'LinkedIn',  href: SITE.linkedin   },
] as const

export function Footer() {
  return (
    <footer className="border-t border-white/[0.05] px-6 md:px-[60px] py-9 flex flex-col md:flex-row justify-between items-center gap-5 flex-wrap">
      <p className="font-display text-[18px] tracking-[0.18em] text-ivory">
        {SITE.name.toUpperCase()}
      </p>

      <div className="flex flex-col items-center gap-1.5 order-last md:order-none">
        <p className="font-body text-[10px] tracking-[0.12em] text-mgrey uppercase">
          © {new Date().getFullYear()} · All rights reserved
        </p>
        <p className="font-body text-[9px] tracking-[0.18em] text-mgrey/40 uppercase">
          Designed & built by{' '}
          <a
            href="https://github.com/xx-abhijeet-xx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold/50 hover:text-gold transition-colors duration-300 cursor-none"
          >
            Abhijeet
          </a>
        </p>
      </div>

      <nav aria-label="Social links">
        <ul className="flex gap-5 list-none">
          {SOCIAL.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-hover font-body text-[10px] tracking-[0.2em] uppercase text-mgrey hover:text-gold transition-colors duration-300 cursor-none"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  )
}