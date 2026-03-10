import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        black:    '#070707',
        offblack: '#0d0d0d',
        charcoal: '#161616',
        gold:     '#c8a96d',
        'gold-dim': '#7a6640',
        ivory:    '#ede9e1',
        mgrey:    '#3a3a3a',
        lgrey:    '#888888',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        serif:   ['"Cormorant Garamond"', 'serif'],
        body:    ['"DM Sans"', 'sans-serif'],
      },
      fontSize: {
        'fluid-hero': 'clamp(68px, 13vw, 190px)',
        'fluid-h2':   'clamp(38px, 4.5vw, 64px)',
        'fluid-h3':   'clamp(46px, 7vw, 96px)',
      },
      lineHeight: {
        tight2: '0.88',
        tight3: '0.90',
      },
      letterSpacing: {
        ultra: '0.4em',
        wide2: '0.22em',
        wide3: '0.35em',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'circ-out': 'cubic-bezier(0.0, 0.55, 0.45, 1)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        'scroll-bar': {
          '0%,100%': { opacity: '0.4', height: '55px' },
          '50%':     { opacity: '1',   height: '72px' },
        },
        'pulse-green': {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(76,175,80,0.5)' },
          '60%':     { boxShadow: '0 0 0 7px rgba(76,175,80,0)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
      },
      animation: {
        marquee:       'marquee 22s linear infinite',
        'scroll-bar':  'scroll-bar 2.2s ease-in-out infinite',
        'pulse-green': 'pulse-green 2s ease infinite',
        shimmer:       'shimmer 1.8s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
