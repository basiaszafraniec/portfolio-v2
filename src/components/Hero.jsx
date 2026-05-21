import { useEffect, useRef } from 'react'

export default function Hero() {
  const nameRef = useRef(null)
  const metaRef = useRef(null)

  useEffect(() => {
    const t1 = setTimeout(() => nameRef.current?.classList.add('loaded'), 100)
    const t2 = setTimeout(() => metaRef.current?.classList.add('loaded'), 200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <h1 className="hero-name" ref={nameRef}>
          <span>BASIA</span>
          <span>SZAFRANIEC</span>
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
