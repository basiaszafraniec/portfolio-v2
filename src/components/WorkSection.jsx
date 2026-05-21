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

export default function WorkSection() {
  const [active, setActive] = useState('all')
  const [selected, setSelected] = useState(null)
  const [hovered, setHovered] = useState(null)
  const previewRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const posRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  const filtered = active === 'all' ? allProjects : allProjects.filter(p => p.cat === active)

  useEffect(() => {
    const onMove = e => { mouseRef.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMove)

    const PREVIEW_W = 300
    const loop = () => {
      const tx = Math.min(mouseRef.current.x + 36, window.innerWidth - PREVIEW_W - 16)
      const ty = mouseRef.current.y
      posRef.current.x += (tx - posRef.current.x) * 0.13
      posRef.current.y += (ty - posRef.current.y) * 0.13
      if (previewRef.current) {
        previewRef.current.style.left = `${posRef.current.x}px`
        previewRef.current.style.top = `${posRef.current.y}px`
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

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

        <div className="work-list">
          {filtered.map((p, i) => {
            const catColor = catColors[p.cat] || '#888'
            return (
              <div
                key={p.id}
                className="work-list-item"
                onClick={() => setSelected(p)}
                onMouseEnter={() => setHovered(p)}
                onMouseLeave={() => setHovered(null)}
                style={{ '--hover-color': catColor, animationDelay: `${i * 0.05}s` }}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setSelected(p)}
              >
                <span className="wl-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="wl-title">{p.title}</span>
                <span className="wl-cat">{catLabels[p.cat] || p.cat}</span>
                <span className="wl-arrow">↗</span>
              </div>
            )
          })}
        </div>
      </div>

      <div
        ref={previewRef}
        className={`work-cursor-preview${hovered ? ' active' : ''}`}
        aria-hidden="true"
      >
        {hovered && (
          hovered.images?.[0]
            ? <img src={hovered.images[0]} alt={hovered.title} />
            : <div className="wcp-placeholder" style={{ background: catColors[hovered.cat] || '#1a1a1a' }}>
                <span>{hovered.title}</span>
              </div>
        )}
      </div>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}
