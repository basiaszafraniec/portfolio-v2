import { useRevealChildren } from '../hooks/useScrollReveal'

export default function ContactSection() {
  const sectionRef = useRevealChildren('.reveal', 0.15)

  return (
    <section className="contact-section" id="contact" ref={sectionRef}>
      <div className="contact-inner">
        <p className="chapter-label light">Chapter 04</p>
        <h2 className="contact-big reveal">
          let's make<br />
          something<span>.</span>
        </h2>
        <div className="contact-links reveal d1">
          <a href="mailto:basia.szafraniec@gmail.com" className="contact-link">
            basia.szafraniec@gmail.com
          </a>
          <a
            href="https://github.com/basiaszafraniec"
            target="_blank"
            rel="noreferrer"
            className="contact-link"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/basia-szafraniec"
            target="_blank"
            rel="noreferrer"
            className="contact-link"
          >
            LinkedIn
          </a>
        </div>
        <div className="contact-footer reveal d2">
          <span>Basia Szafraniec © 2026</span>
          <span>made with React + Vite</span>
        </div>
      </div>
    </section>
  )
}
