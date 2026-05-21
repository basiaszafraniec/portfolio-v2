import { useState, useEffect, useRef } from 'react'
import { PROJECT_DATA, FILE_SYSTEM } from '../../js/data/projectData.js'
import ProjectModal from './ProjectModal.jsx'

const categoryMap = {}
Object.entries(FILE_SYSTEM).forEach(([cat, files]) => {
  if (cat === 'root') return
  files.forEach(f => { categoryMap[f.id] = cat })
})

const catColors = {
  javascript: 'var(--cat-js)',
  python: 'var(--cat-py)',
  blender: 'var(--cat-bl)',
  figma: 'var(--cat-fig)',
}
const catLabels = {
  javascript: 'JavaScript',
  python: 'Python',
  blender: 'Blender',
  figma: 'Figma',
}
const FILTERS = ['all', 'javascript', 'python', 'blender', 'figma']
const allProjects = Object.entries(PROJECT_DATA).map(([id, data]) => ({
  id, ...data, cat: categoryMap[id] || 'other',
}))

function GCard({ project, onClick, featured }) {
  const cardRef = useRef(null)
  const thumb = project.images?.[0] || null
  const catColor = catColors[project.cat] || '#888'

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() }
    }, { threshold: 0.08 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const onMouseEnter = () => {
    cardRef.current.style.transition = 'box-shadow 0.3s, opacity 0.7s, transform 0.7s'
  }
  const onMouseMove = (e) => {
    const el = cardRef.current
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 10
    el.style.transition = 'box-shadow 0.3s'
    el.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateZ(6px)`
  }
  const onMouseLeave = () => {
    const el = cardRef.current
    el.style.transition = 'transform 0.45s ease, box-shadow 0.3s'
    el.style.transform = ''
    setTimeout(() => { if (el) el.style.transition = '' }, 450)
  }

  return (
    <div
      ref={cardRef}
      className={`g-card reveal${featured ? ' featured' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {thumb ? (
        <>
          <img src={thumb} alt={project.title} className="g-card-img" />
          <div className="g-card-overlay" />
        </>
      ) : (
        <div className="g-card-placeholder" style={{ background: catColor }} />
      )}
      <div className="g-card-info">
        <div className="g-card-title">{project.title}</div>
        <div className="g-card-cat">
          <span className="card-cat-dot" style={{ background: thumb ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.35)' }} />
          {catLabels[project.cat] || project.cat}
        </div>
      </div>
    </div>
  )
}

export default function WorkSection() {
  const [active, setActive] = useState('all')
  const [selected, setSelected] = useState(null)

  const filtered = active === 'all'
    ? allProjects
    : allProjects.filter(p => p.cat === active)

  return (
    <section className="work-section" id="work">
      <div className="work-inner">
        <div className="work-header">
          <p className="chapter-label">Chapter 01</p>
          <h2>Work</h2>
          <div className="filter-tabs">
            {FILTERS.map(f => (
              <button
                key={f}
                className={`filter-tab ${active === f ? 'active' : ''}`}
                onClick={() => setActive(f)}
              >
                {f === 'all' ? 'All' : catLabels[f]}
              </button>
            ))}
          </div>
        </div>

        <div className="project-grid">
          {filtered.map((p, i) => (
            <GCard
              key={p.id}
              project={p}
              onClick={() => setSelected(p)}
              featured={i % 3 === 2}
            />
          ))}
        </div>
      </div>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}
