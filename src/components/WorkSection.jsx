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

function ProjectCard({ project, onClick }) {
  const cardRef = useRef(null)
  const thumb = project.images?.[0] || null
  const catColor = catColors[project.cat] || '#888'

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className="project-card reveal"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}
      style={{ '--cat-color': catColor }}
    >
      <div className="card-thumb" style={!thumb ? { background: catColor } : {}}>
        {thumb ? <img src={thumb} alt={project.title} /> : project.title}
      </div>
      <div className="card-info">
        <div className="card-title">{project.title}</div>
        <div className="card-cat">
          <span className="card-cat-dot" style={{ background: catColor }} />
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
          {filtered.map(p => (
            <ProjectCard key={p.id} project={p} onClick={() => setSelected(p)} />
          ))}
        </div>
      </div>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}
