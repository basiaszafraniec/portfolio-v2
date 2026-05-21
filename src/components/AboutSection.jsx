import { useRevealChildren } from '../hooks/useScrollReveal'

const interests = [
  'music', 'drawing', '3D art', 'animation', 'pixel art',
  'game dev', 'languages', 'film', 'cats',
]

export default function AboutSection() {
  const sectionRef = useRevealChildren('.reveal', 0.15)

  return (
    <section className="about-section" id="about" ref={sectionRef}>
      <div className="about-inner">
        <p className="chapter-label light">Chapter 02</p>
        <div className="about-grid">
          <div className="reveal">
            <img
              src="/assets/prof1.png"
              alt="Basia Szafraniec"
              className="about-photo"
            />
          </div>
          <div className="about-text">
            <h2 className="reveal d1">Hi, I'm Basia.</h2>
            <p className="about-bio reveal d2">
              I'm a developer & designer studying Multimedia Design in Denmark.
              I love building things that are both functional and fun —
              whether that's a game, a website, a 3D render, or something
              entirely new. When I'm not coding I'm drawing, making music,
              or modelling things in Blender.
            </p>
            <div className="about-edu reveal d3">
              <div className="about-edu-label">Education</div>
              <div className="about-edu-value">
                Multimedia Design<br />
                UCL Erhvervsakademi, Denmark<br />
                2023 — present
              </div>
            </div>
            <div className="reveal d4">
              <div className="about-interests-label">when I'm not coding</div>
              <div className="interests-list">
                {interests.map(i => (
                  <span key={i} className="interest-tag">{i}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
