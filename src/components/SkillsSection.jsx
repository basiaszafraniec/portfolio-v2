import { useRevealChildren } from '../hooks/useScrollReveal'

const skills = [
  { name: 'HTML & CSS', pct: 90 },
  { name: 'JavaScript', pct: 85 },
  { name: 'React', pct: 80 },
  { name: 'Figma', pct: 75 },
  { name: 'Python', pct: 65 },
  { name: 'Blender', pct: 55 },
]

const softSkills = [
  'curious & creative',
  'learning by doing',
  'loves collaborating',
  'versatile',
  'great at project work',
]

export default function SkillsSection() {
  const sectionRef = useRevealChildren('.skill-row, .reveal', 0.2)

  return (
    <section className="skills-section" id="skills" ref={sectionRef}>
      <div className="skills-inner">
        <p className="chapter-label">Chapter 03</p>
        <h2 className="reveal">Skills</h2>
        <div className="skills-grid">
          <div>
            {skills.map((s, i) => (
              <div
                key={s.name}
                className="skill-row"
                style={{ '--pct': `${s.pct}%`, transitionDelay: `${i * 0.08}s` }}
              >
                <div className="skill-header">
                  <span className="skill-name">{s.name}</span>
                  <span className="skill-pct">{s.pct}</span>
                </div>
                <div className="skill-track">
                  <div className="skill-bar" />
                </div>
              </div>
            ))}
          </div>
          <div className="soft-skills reveal d2">
            <h3>traits</h3>
            <div className="soft-list">
              {softSkills.map(s => (
                <div key={s} className="soft-item">{s}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
