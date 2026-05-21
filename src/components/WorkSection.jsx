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
  id,
  ...data,
  cat: categoryMap[id] || 'other',
}))

export default function WorkSection() {
  const [active, setActive] = useState('all')
  const [selected, setSelected] = useState(null)
  const gridRef = useRef(null)

  const filtered = active === 'all'
    ? allProjects
    : allProjects.filter(p => p.cat === active)

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.project-card')
    if (!cards) return

    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 }
    )

    cards.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [filtered])

  return (
    <section className="work-section" id="work">
      <div className="work-inner">
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
        <div className="project-grid" ref={gridRef}>
          {filtered.map((project, i) => {
            const thumb = project.images?.[0] || null
            const catColor = catColors[project.cat] || '#888'
            return (
              <div
                key={project.id}
                className="project-card reveal"
                style={{ transitionDelay: `${(i % 3) * 0.08}s` }}
                onClick={() => setSelected(project)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setSelected(project)}
              >
                <div
                  className="card-thumb"
                  style={!thumb ? { background: catColor } : {}}
                >
                  {thumb
                    ? <img src={thumb} alt={project.title} />
                    : project.title
                  }
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
          })}
        </div>
      </div>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}
