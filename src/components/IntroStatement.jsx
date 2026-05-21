import { useRef, useEffect } from 'react'

export default function IntroStatement() {
  const ref = useRef(null)

  useEffect(() => {
    const lines = ref.current?.querySelectorAll('.is-line')
    if (!lines) return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.5 })
    lines.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="intro-statement">
      <div className="is-inner">
        <p className="is-line">making technology</p>
        <p className="is-line accent">fun again.</p>
        <div className="is-line is-sub">developer · designer · artist</div>
      </div>
    </section>
  )
}
