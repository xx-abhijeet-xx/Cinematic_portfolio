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

      <p className="font-body text-[10px] tracking-[0.12em] text-mgrey uppercase order-last md:order-none">
        © {new Date().getFullYear()} · All rights reserved
      </p>

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
