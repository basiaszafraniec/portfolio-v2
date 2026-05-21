import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

const catColors = {
  javascript: '#F59E0B',
  python: '#38BDF8',
  blender: '#F97316',
  figma: '#8B5CF6',
}

export default function ProjectModal({ project, onClose }) {
  const [imgIdx, setImgIdx] = useState(0)
  const hasImages = project.images && project.images.length > 0
  const hasMultiple = hasImages && project.images.length > 1
  const catColor = catColors[project.cat] || '#888'

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return createPortal(
    <>
      <div className="side-overlay" onClick={onClose} />

      <div className="side-panel" role="dialog" aria-modal="true">
        {/* Media area */}
        <div className="panel-media">
          {project.type === 'iframe' ? (
            <iframe src={project.src} title={project.title} allowFullScreen />
          ) : hasImages ? (
            <img
              key={imgIdx}
              src={project.images[imgIdx]}
              alt={`${project.title} ${imgIdx + 1}`}
              className="panel-media-img"
            />
          ) : (
            <div className="panel-no-img" style={{ background: catColor }} />
          )}

          {hasMultiple && (
            <div className="panel-media-nav">
              <button
                className="pmn-btn"
                onClick={() => setImgIdx(i => Math.max(0, i - 1))}
                disabled={imgIdx === 0}
              >←</button>
              <span className="pmn-count">{imgIdx + 1} / {project.images.length}</span>
              <button
                className="pmn-btn"
                onClick={() => setImgIdx(i => Math.min(project.images.length - 1, i + 1))}
                disabled={imgIdx === project.images.length - 1}
              >→</button>
            </div>
          )}

          <button className="panel-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* Scrollable content */}
        <div className="panel-body">
          <div className="panel-heading">
            <h2 className="panel-title">{project.title}</h2>
            {project.cat && (
              <span className="panel-cat" style={{ '--dot': catColor }}>
                {project.cat.charAt(0).toUpperCase() + project.cat.slice(1)}
              </span>
            )}
          </div>

          {(project.stack?.length > 0 || project.learned?.length > 0) && (
            <div className="panel-tags">
              {project.stack?.map(s => (
                <span key={s} className="tag stack">{s}</span>
              ))}
              {project.learned?.map(l => (
                <span key={l} className="tag">{l}</span>
              ))}
            </div>
          )}

          {project.description && (
            <p className="panel-desc">{project.description}</p>
          )}

          {(project.webLink || project.ghLink) && (
            <div className="panel-links">
              {project.webLink && (
                <a href={project.webLink} target="_blank" rel="noreferrer" className="panel-link primary">
                  Visit site ↗
                </a>
              )}
              {project.ghLink && (
                <a href={project.ghLink} target="_blank" rel="noreferrer" className="panel-link secondary">
                  GitHub ↗
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </>,
    document.body
  )
}
