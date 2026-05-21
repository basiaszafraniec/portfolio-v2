import { useEffect, useRef, Suspense, lazy } from 'react'

const HeroScene = lazy(() => import('./HeroScene'))

const FIRST = 'BASIA'
const LAST = 'SZAFRANIEC'

export default function Hero() {
  const heroRef = useRef(null)
  const contentRef = useRef(null)
  const nameRef = useRef(null)
  const metaRef = useRef(null)

  useEffect(() => {
    const t1 = setTimeout(() => nameRef.current?.classList.add('loaded'), 80)
    const t2 = setTimeout(() => metaRef.current?.classList.add('loaded'), 100)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const h = window.innerHeight
      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${y * 0.38}px)`
        contentRef.current.style.opacity = String(Math.max(0, 1 - y / (h * 0.55)))
      }
      const canvas = heroRef.current?.querySelector('canvas')
      if (canvas) {
        canvas.style.transform = `translateY(${y * 0.12}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      <div className="hero-content" ref={contentRef}>
        <h1 className="hero-name" ref={nameRef}>
          <span className="name-line">
            {FIRST.split('').map((c, i) => (
              <span key={i} className="name-char" style={{ transitionDelay: `${0.08 + i * 0.05}s` }}>
                {c}
              </span>
            ))}
          </span>
          <span className="name-line">
            {LAST.split('').map((c, i) => (
              <span key={i} className="name-char" style={{ transitionDelay: `${0.28 + i * 0.04}s` }}>
                {c}
              </span>
            ))}
          </span>
        </h1>

        <div className="hero-meta" ref={metaRef}>
          <span className="hero-role">developer & designer</span>
          <span className="hero-tagline">making technology fun again.</span>
        </div>
      </div>

      <div className="hero-scroll">
        <span>scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}
