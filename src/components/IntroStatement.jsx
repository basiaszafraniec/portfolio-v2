import { useEffect, useRef } from 'react'

const WORDS = ['she builds', 'she designs', 'she draws', 'she codes', 'she makes things feel alive']

function SlowMarquee() {
  const innerRef = useRef(null)
  const posRef = useRef(0)

  useEffect(() => {
    const el = innerRef.current
    if (!el) return
    let raf
    const tick = () => {
      posRef.current -= 0.45
      const hw = el.scrollWidth / 2
      if (posRef.current <= -hw) posRef.current += hw
      el.style.transform = `translateX(${posRef.current}px)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const content = WORDS.map((t, i) => (
    <span key={i} className="is-mq-item">
      {t}<span className="is-mq-dot"> · </span>
    </span>
  ))

  return (
    <div className="is-marquee" aria-hidden="true">
      <div ref={innerRef} className="is-mq-inner">
        {content}{content}{content}
      </div>
    </div>
  )
}

export default function IntroStatement() {
  const ref = useRef(null)

  useEffect(() => {
    const lines = ref.current?.querySelectorAll('.is-line')
    if (!lines) return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.3 })
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
      <SlowMarquee />
    </section>
  )
}
