// ─── Site Metadata ────────────────────────────────────────────────────────────
export const SITE = {
  name:        'Shubham',
  title:       'Shubham — Videographer & Filmmaker',
  tagline:     'Cinematic storytelling for brands, couples, and campaigns that refuse to be ordinary.',
  location:    'Jabalpur, India',
  email:       'hello@shubham.film',          // ← replace
  phone:       '+917489553039',              // ← replace
  whatsapp:    '+917489553039',                 // ← replace (no + or spaces)
  instagram:   'https://instagram.com/shubham.lens',
  reelUrl:     'https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1',              // ← replace from formspree.io
} as const

// ─── Navigation ───────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Reel',     href: '#reel'     },
  { label: 'About',    href: '#about'    },
  { label: 'Services', href: '#services' },
  { label: 'Work',     href: '#work'     },
] as const

// ─── Services ─────────────────────────────────────────────────────────────────
export const SERVICES = [
  {
    num:   '01',
    name:  'Ad Films & Commercials',
    desc:  'Cinematic brand stories that sell. From concept to final cut — high-production ad films for brands that demand to be remembered.',
    icon:  'video',
  },
  {
    num:   '02',
    name:  'Social Media Content',
    desc:  'Thumb-stopping reels, stories, and short-form content engineered for reach, engagement, and conversion. Made for the scroll.',
    icon:  'instagram',
  },
  {
    num:   '03',
    name:  'Pre-Wedding Shoots',
    desc:  'Your love story told with cinematic depth. Every frame crafted to hold a feeling — raw, romantic, and completely timeless.',
    icon:  'heart',
  },
  {
    num:   '04',
    name:  'Digital Marketing',
    desc:  'Video-led digital campaigns that move people — from strategy and scripting to distribution and analytics.',
    icon:  'trending',
  },
] as const

// ─── Work ─────────────────────────────────────────────────────────────────────
export const WORKS = [
  {
    id:       'brew-co',
    cat:      'Ad Film',
    title:    'Bangalore Brew Co.',
    subtitle: 'Brand Campaign',
    year:     '2024',
    // Replace src with real image paths or CDN URLs
    src:      'https://images.unsplash.com/photo-1518791841217-8f162f1912da?w=600&q=75&auto=format',
    srcSet:   'https://images.unsplash.com/photo-1518791841217-8f162f1912da?w=400&q=70&auto=format 400w, https://images.unsplash.com/photo-1518791841217-8f162f1912da?w=600&q=75&auto=format 600w',
    bg:       'linear-gradient(135deg,#160f05 0%,#2e1f08 60%,#160f05 100%)',
  },
  {
    id:       'priya-arjun',
    cat:      'Pre-Wedding',
    title:    'Priya & Arjun',
    subtitle: 'Golden Hour Edit',
    year:     '2024',
    src:      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=75&auto=format',
    srcSet:   'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&q=70&auto=format 400w, https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=75&auto=format 600w',
    bg:       'linear-gradient(135deg,#0b0810 0%,#1c1428 60%,#0b0810 100%)',
  },
  {
    id:       'fitfusion',
    cat:      'Social Media',
    title:    'FitFusion',
    subtitle: 'Reel Series',
    year:     '2023',
    src:      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=75&auto=format',
    srcSet:   'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=70&auto=format 400w, https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=75&auto=format 600w',
    bg:       'linear-gradient(135deg,#060e0c 0%,#0d2018 60%,#060e0c 100%)',
  },
  {
    id:       'techspark',
    cat:      'Digital Marketing',
    title:    'TechSpark',
    subtitle: 'Product Launch',
    year:     '2023',
    src:      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=75&auto=format',
    srcSet:   'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=70&auto=format 400w, https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=75&auto=format 600w',
    bg:       'linear-gradient(135deg,#0e0606 0%,#200d0d 60%,#0e0606 100%)',
  },
  {
    id:       'nisha-rahul',
    cat:      'Pre-Wedding',
    title:    'Nisha & Rahul',
    subtitle: 'Monsoon Story',
    year:     '2023',
    src:      'https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&q=75&auto=format',
    srcSet:   'https://images.unsplash.com/photo-1529636798458-92182e662485?w=400&q=70&auto=format 400w, https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&q=75&auto=format 600w',
    bg:       'linear-gradient(135deg,#0a0a0a 0%,#1a1a1a 60%,#0a0a0a 100%)',
  },
] as const

// ─── Stats ────────────────────────────────────────────────────────────────────
export const STATS = [
  { num: 80,  suffix: '+', label: 'Projects'  },
  { num: 4,   suffix: '+', label: 'Years Exp.' },
  { num: 30,  suffix: '+', label: 'Clients'    },
] as const

// ─── Marquee items ────────────────────────────────────────────────────────────
export const MARQUEE_ITEMS = [
  'Ad Films', 'Pre-Wedding', 'Social Media',
  'Digital Marketing', 'Brand Films', 'Cinematography', 'Reels',
] as const

// ─── Testimonial ──────────────────────────────────────────────────────────────
export const TESTIMONIAL = {
  quote:  '"Shubham doesn\'t just shoot — he understands the story you\'re trying to tell, and then he makes it look better than you imagined."',
  author: 'Priya M.',
  role:   'Brand Founder',
} as const
