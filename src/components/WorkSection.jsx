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

function TiltCard({ children, onClick, onKeyDown, className, style }) {
  const ref = useRef(null)

  const onMove = e => {
    const el = ref.current
    if (!el?.classList.contains('visible')) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 7}deg) translateZ(10px)`
    el.style.boxShadow = `${-x * 24}px ${y * 24}px 48px rgba(0,0,0,0.14)`
    el.style.transition = 'transform 0.08s ease, box-shadow 0.08s ease'
  }

  const onLeave = () => {
    const el = ref.current
    el.style.transform = ''
    el.style.boxShadow = ''
    el.style.transition = 'transform 0.55s cubic-bezier(0.4,0,0.2,1), box-shadow 0.55s ease'
  }

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      role="button"
      tabIndex={0}
    >
      {children}
    </div>
  )
}

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
              <TiltCard
                key={project.id}
                className="project-card reveal"
                style={{ transitionDelay: `${(i % 3) * 0.08}s` }}
                onClick={() => setSelected(project)}
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
              </TiltCard>
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
