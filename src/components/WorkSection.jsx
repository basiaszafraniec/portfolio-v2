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
  const catColor = catColors[project.cat] || '#888'
  return (
    <div className="h-card" onClick={() => onClick(project)}>
      {project.images?.[0]
        ? <img className="h-card-img" src={project.images[0]} alt={project.title} />
        : <div className="h-card-placeholder" style={{ background: catColor }} />
      }
      <div className="h-card-overlay" />
      <div className="h-card-info">
        <div className="h-card-title">{project.title}</div>
        <div className="h-card-cat">
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: catColor, display: 'inline-block' }} />
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
  const trackRef = useRef(null)
  const progressRef = useRef(null)
  const rafRef = useRef(null)

  const filtered = active === 'all' ? allProjects : allProjects.filter(p => p.cat === active)

  const setHeight = () => {
    if (!sectionRef.current || !trackRef.current) return
    const extra = trackRef.current.scrollWidth - window.innerWidth
    sectionRef.current.style.height = extra > 0
      ? `calc(100svh + ${extra}px)`
      : '100svh'
  }

  useEffect(() => {
    setHeight()
    const ro = new ResizeObserver(setHeight)
    if (trackRef.current) ro.observe(trackRef.current)
    window.addEventListener('resize', setHeight)
    return () => { ro.disconnect(); window.removeEventListener('resize', setHeight) }
  }, [filtered])

  useEffect(() => {
    const drive = () => {
      if (sectionRef.current && trackRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const scrolled = Math.max(0, -rect.top)
        const maxScroll = rect.height - window.innerHeight
        const progress = maxScroll > 0 ? Math.min(scrolled / maxScroll, 1) : 0
        const maxTranslate = trackRef.current.scrollWidth - window.innerWidth
        if (maxTranslate > 0) {
          trackRef.current.style.transform = `translateX(${-progress * maxTranslate}px)`
        }
        if (progressRef.current) {
          progressRef.current.style.width = `${progress * 100}%`
        }
      }
      rafRef.current = requestAnimationFrame(drive)
    }
    rafRef.current = requestAnimationFrame(drive)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const changeFilter = (f) => {
    setActive(f)
    if (sectionRef.current) {
      const top = sectionRef.current.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <section className="work-section" id="work" ref={sectionRef}>
      <div className="work-sticky">
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

        <div className="work-track" ref={trackRef}>
          {filtered.map(p => (
            <HCard key={p.id} project={p} onClick={setSelected} />
          ))}
        </div>

        <div className="work-progress-bar">
          <div className="work-progress-fill" ref={progressRef} />
        </div>
      </div>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}
