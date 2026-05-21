import { useEffect, useRef } from 'react'

const rows = [
  {
    items: ['she builds', 'she designs', 'she draws', 'she codes'],
    dir: -1,
    base: 1.2,
    size: 'clamp(40px, 7.5vw, 110px)',
    opacity: 1,
  },
  {
    items: ['developer', 'designer', 'artist', 'coder', 'creator', 'student'],
    dir: 1,
    base: 0.8,
    size: 'clamp(26px, 4.5vw, 68px)',
    opacity: 0.35,
  },
  {
    items: ['she makes things feel alive'],
    dir: -1,
    base: 1.8,
    size: 'clamp(20px, 3.2vw, 48px)',
    opacity: 1,
    accent: true,
  },
]

function Row({ items, dir, base, size, opacity, accent }) {
  const innerRef = useRef(null)
  const pos = useRef(dir === 1 ? -9999 : 0)
  const vel = useRef(0)
  const lastY = useRef(typeof window !== 'undefined' ? window.scrollY : 0)
  const rafId = useRef(null)

  const sep = <span className="marquee-sep">·</span>
  const content = items.map((t, i) => (
    <span key={i} className="marquee-item">{t}{sep}</span>
  ))

  useEffect(() => {
    const el = innerRef.current
    if (!el) return

    const initPos = () => {
      const hw = el.scrollWidth / 2
      if (dir === 1) pos.current = -hw
    }
    initPos()

    const tick = () => {
      const y = window.scrollY
      const delta = y - lastY.current
      lastY.current = y
      vel.current = vel.current * 0.85 + delta * 0.15

      const speed = (base + Math.abs(vel.current) * 0.6) * dir
      pos.current += speed

      const hw = el.scrollWidth / 2
      if (dir === -1 && pos.current <= -hw) pos.current += hw
      if (dir === 1 && pos.current >= 0) pos.current -= hw

      el.style.transform = `translateX(${pos.current}px)`
      rafId.current = requestAnimationFrame(tick)
    }
    rafId.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId.current)
  }, [base, dir])

  return (
    <div
      className={`marquee-row${accent ? ' accent' : ''}`}
      style={{ fontSize: size, opacity }}
    >
      <div ref={innerRef} className="marquee-inner" aria-hidden="true">
        {content}{content}{content}
      </div>
    </div>
  )
}

export default function ScrollMarquee() {
  return (
    <section className="scroll-marquee">
      <div className="marquee-rows">
        {rows.map((r, i) => <Row key={i} {...r} />)}
      </div>
    </section>
  )
}
