import { useEffect, useRef } from 'react'

const lines = [
  { text: 'she builds.', indent: 0 },
  { text: 'she designs.', indent: 1 },
  { text: 'she draws.', indent: 2 },
  { text: 'she codes.', indent: 3 },
  { text: ['she makes things ', <em key="e">feel alive.</em>], indent: 4 },
]

export default function IntroLines() {
  const containerRef = useRef(null)

  useEffect(() => {
    const items = containerRef.current?.querySelectorAll('.intro-line-item')
    if (!items) return

    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 }
    )

    items.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section className="intro-lines" ref={containerRef}>
      <div className="intro-lines-inner">
        {lines.map((line, i) => (
          <p
            key={i}
            className="intro-line-item"
            style={{ '--i': line.indent, transitionDelay: `${i * 0.08}s` }}
          >
            {line.text}
          </p>
        ))}
      </div>
    </section>
  )
}
