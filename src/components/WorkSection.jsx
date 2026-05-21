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

function HCard({ project, onClick }) {
  const thumb = project.images?.[0] || null
  const catColor = catColors[project.cat] || '#888'

  return (
    <div className="h-card" onClick={onClick} role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}>
      {thumb ? (
        <>
          <img src={thumb} alt={project.title} className="h-card-img" />
          <div className="h-card-overlay" />
        </>
      ) : (
        <div className="h-card-placeholder" style={{ background: catColor }}>
          {project.title}
        </div>
      )}
      <div className="h-card-info">
        <div className="h-card-title">{project.title}</div>
        <div className="h-card-cat">
          <span className="card-cat-dot" style={{ background: thumb ? 'rgba(255,255,255,0.6)' : catColor }} />
          {catLabels[project.cat] || project.cat}
        </div>
      </div>
    </div>
  )
}

export default function WorkSection() {
  const [active, setActive] = useState('all')
  const [selected, setSelected] = useState(null)
  const sectionRef = useRef(null)
  const stickyRef = useRef(null)
  const trackRef = useRef(null)
  const progressRef = useRef(null)
  const rafRef = useRef(null)

  const filtered = active === 'all'
    ? allProjects
    : allProjects.filter(p => p.cat === active)

  // Set section height so horizontal track can fully scroll
  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const updateHeight = () => {
      const extra = Math.max(0, track.scrollWidth - window.innerWidth)
      section.style.height = `calc(100vh + ${extra}px)`
    }
    updateHeight()

    const ro = new ResizeObserver(updateHeight)
    ro.observe(track)
    window.addEventListener('resize', updateHeight)
    return () => { ro.disconnect(); window.removeEventListener('resize', updateHeight) }
  }, [filtered])

  // Drive horizontal scroll via rAF (smooth with Lenis)
  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    const progress = progressRef.current
    if (!section || !track) return

    const tick = () => {
      const max = Math.max(0, track.scrollWidth - window.innerWidth)
      if (max > 0) {
        const scrolled = -section.getBoundingClientRect().top
        const pct = Math.max(0, Math.min(1, scrolled / max))
        track.style.transform = `translateX(${-pct * max}px)`
        if (progress) progress.style.width = `${pct * 100}%`
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [filtered])

  const changeFilter = f => {
    setActive(f)
    const top = sectionRef.current?.getBoundingClientRect().top + window.scrollY
    if (top != null) window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} className="work-section" id="work">
      <div ref={stickyRef} className="work-sticky">
        <div className="work-header">
          <div className="work-header-top">
            <p className="chapter-label">Chapter 01</p>
            <h2>Work</h2>
          </div>
          <div className="filter-tabs">
            {FILTERS.map(f => (
              <button
                key={f}
                className={`filter-tab ${active === f ? 'active' : ''}`}
                onClick={() => changeFilter(f)}
              >
                {f === 'all' ? 'All' : catLabels[f]}
              </button>
            ))}
          </div>
        </div>

        <div ref={trackRef} className="work-track">
          {filtered.map(p => (
            <HCard key={p.id} project={p} onClick={() => setSelected(p)} />
          ))}
        </div>

        <div className="work-progress-bar">
          <div ref={progressRef} className="work-progress-fill" />
        </div>
      </div>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}
