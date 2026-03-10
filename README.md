# Shubham — Videographer Portfolio

> Cinematic portfolio for a freelance videographer based in Mumbai, India.
c
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat&logo=tailwindcss)
![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?style=flat&logo=greensock)

---

## Features

- 🎬 **Cinematic loader** — 0→100 counter with eased timing + curtain wipe reveal
- ✍️ **GSAP hero animations** — staggered text slam-in on load
- 🚂 **Lenis smooth scroll** — disabled on mobile for native performance
- ↔️ **Horizontal drag-scroll** — work section with mouse + touch drag
- 🖼️ **Lazy images** — IntersectionObserver fires 200px before viewport + skeleton shimmer
- 🧲 **Magnetic buttons** — cursor pull effect on all CTAs
- 🖱️ **Custom cursor** — dot + lagged trailing ring
- 💬 **WhatsApp float** — pre-filled message CTA
- 📬 **Mailto contact form** — no backend needed
- 📱 **Fully responsive** — mobile, tablet, desktop
- ⚡ **Code splitting** — every section lazy loaded via React.lazy()

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| [React](https://react.dev) | 18 | UI framework |
| [Vite](https://vitejs.dev) | 5 | Build tool & dev server |
| [TypeScript](https://typescriptlang.org) | 5 | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | 3 | Styling |
| [GSAP](https://gsap.com) | 3 | Hero animations |
| [Lenis](https://lenis.darkroom.engineering) | 1 | Smooth scroll |
| [react-intersection-observer](https://github.com/thebuilder/react-intersection-observer) | 9 | Scroll-triggered counter |

---

## Getting Started

### Prerequisites
- Node.js v18+
- npm v9+

### Install & Run

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/shubham-portfolio.git
cd shubham-portfolio

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
npm run preview
```

---

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Fixed nav + mobile hamburger menu
│   │   └── Footer.tsx          # Footer with social links
│   ├── sections/
│   │   ├── Hero.tsx            # Full-viewport hero with GSAP text reveal
│   │   ├── Reel.tsx            # Showreel with video modal
│   │   ├── About.tsx           # About + animated stats counter
│   │   ├── Services.tsx        # 4-service grid with hover effects
│   │   ├── Work.tsx            # Horizontal drag-scroll work cards
│   │   ├── Testimonial.tsx     # Client quote block
│   │   └── Contact.tsx         # Mailto contact form
│   └── ui/
│       ├── Cursor.tsx          # Custom cursor + trailing ring
│       ├── Loader.tsx          # Cinematic 0–100 counter loader
│       ├── Marquee.tsx         # Infinite scrolling ticker
│       ├── MagneticButton.tsx  # Magnetic hover CTA button
│       ├── LazyImage.tsx       # Lazy image with skeleton shimmer
│       └── WhatsAppFloat.tsx   # Floating WhatsApp CTA
├── hooks/
│   ├── useLenis.ts             # Lenis smooth scroll init
│   ├── useReveal.ts            # Scroll-reveal IntersectionObserver
│   ├── useMagnetic.ts          # Magnetic hover effect
│   └── useCounter.ts           # Animated number counter
├── lib/
│   └── constants.ts            # ← All site content & config lives here
├── App.tsx                     # Root — lazy loads all sections
├── main.tsx                    # Entry point
└── index.css                   # Tailwind + global base styles
```

---

## Configuration

**Everything is in one file: `src/lib/constants.ts`**

```ts
export const SITE = {
  name:      'Shubham',
  email:     'your@email.com',
  phone:     '+91 XXXXX XXXXX',
  whatsapp:  '91XXXXXXXXXX',        // no + or spaces
  instagram: 'https://instagram.com/your_handle',
  youtube:   'https://youtube.com/@your_channel',
  linkedin:  'https://linkedin.com/in/your_profile',
  reelUrl:   'https://www.youtube.com/embed/VIDEO_ID?autoplay=1',
}
```

### Media Hosting
| Media | Host | Why |
|-------|------|-----|
| Photos | [Cloudinary](https://cloudinary.com) free tier | CDN, auto-resize, WebP |
| Videos | YouTube (Unlisted) | Free, embeddable |
| Icons/logos | `public/` folder | Served directly by Vite |

---

## Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag & drop the /dist folder at netlify.com
```

---

## License

Private project — built for personal use.
Not licensed for redistribution.

---