import { Suspense, lazy, useState, useCallback } from 'react'
import { Cursor }       from '@/components/ui/Cursor'
import { Loader }       from '@/components/ui/Loader'
import { Navbar }       from '@/components/layout/Navbar'
import { Footer }       from '@/components/layout/Footer'
import { Hero }         from '@/components/sections/Hero'
import { Marquee }      from '@/components/ui/Marquee'
import { WhatsAppFloat } from '@/components/ui/WhatsAppFloat'
import { useLenis }     from '@/hooks/useLenis'

// ── Lazy-load below-fold sections ─────────────────────────────────────────────
const Reel        = lazy(() => import('@/components/sections/Reel').then(m       => ({ default: m.Reel        })))
const About       = lazy(() => import('@/components/sections/About').then(m      => ({ default: m.About       })))
const Services    = lazy(() => import('@/components/sections/Services').then(m   => ({ default: m.Services    })))
const Work        = lazy(() => import('@/components/sections/Work').then(m       => ({ default: m.Work        })))
const Testimonial = lazy(() => import('@/components/sections/Testimonial').then(m => ({ default: m.Testimonial })))
const Contact     = lazy(() => import('@/components/sections/Contact').then(m    => ({ default: m.Contact     })))

// Minimal skeleton while each section code-splits in
function SectionFallback() {
  return (
    <div className="w-full py-24 flex items-center justify-center">
      <span className="block w-10 h-10 rounded-full border border-gold/30 border-t-gold animate-spin" />
    </div>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)
  useLenis() // initialise smooth scroll globally

  const handleLoaderComplete = useCallback(() => {
    setLoaded(true)
  }, [])

  return (
    <>
      {/* Grain overlay */}
      <div aria-hidden="true" className="grain" />

      {/* Custom cursor */}
      <Cursor />

      {/* Cinematic loader */}
      {!loaded && <Loader onComplete={handleLoaderComplete} />}

      {/* Sticky nav */}
      <Navbar loaded={loaded} />

      {/* Main content */}
      <main id="main-content">
        {/* Hero and Marquee always eager-loaded (above fold) */}
        <Hero loaded={loaded} />
        <Marquee />

        {/* All below-fold sections are lazy + Suspense-wrapped */}
        <Suspense fallback={<SectionFallback />}>
          <Reel />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Services />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Work />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Testimonial />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  )
}
