import { type ReactNode } from 'react'
import { useMagnetic } from '@/hooks/useMagnetic'

interface MagneticButtonProps {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
  disabled?: boolean
  'aria-label'?: string
}

/**
 * A button with a magnetic pull effect on desktop.
 * Uses a sliding fill on hover (CSS-only, no JS needed for the style).
 */
export function MagneticButton({
  children,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  'aria-label': ariaLabel,
}: MagneticButtonProps) {
  const ref = useMagnetic<HTMLButtonElement>(0.28)

  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`
        group relative inline-flex items-center gap-3
        border border-gold text-gold
        font-body text-[10px] font-medium tracking-[0.3em] uppercase
        px-11 py-[17px]
        overflow-hidden
        transition-colors duration-400
        disabled:opacity-50 disabled:cursor-not-allowed
        cursor-none
        ${className}
      `}
    >
      {/* Fill slide */}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-[0.45s] ease-expo-out"
      />
      {/* Content sits above fill */}
      <span className="relative z-10 flex items-center gap-3 transition-colors duration-300 group-hover:text-black">
        {children}
      </span>
    </button>
  )
}
