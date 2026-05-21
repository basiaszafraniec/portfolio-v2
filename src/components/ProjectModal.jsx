import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function ProjectModal({ project, onClose }) {
  const [imgIdx, setImgIdx] = useState(0)
  const hasImages = project.images && project.images.length > 0
  const hasMultiple = hasImages && project.images.length > 1

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const handleOverlay = e => {
    if (e.target === e.currentTarget) onClose()
  }

  return createPortal(
    <div className="modal-overlay" onClick={handleOverlay}>
      <div className="modal" role="dialog" aria-modal="true">
        <div className="modal-header">
          <h2 className="modal-title">{project.title}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        {project.type === 'iframe' ? (
          <div className="modal-media">
            <iframe src={project.src} title={project.title} allowFullScreen />
          </div>
        ) : hasImages ? (
          <>
            <div className="modal-media">
              <img src={project.images[imgIdx]} alt={`${project.title} ${imgIdx + 1}`} />
            </div>
            {hasMultiple && (
              <div className="modal-media-nav">
                <button
                  className="media-nav-btn"
                  onClick={() => setImgIdx(i => Math.max(0, i - 1))}
                  disabled={imgIdx === 0}
                >← prev</button>
                <span className="media-count">{imgIdx + 1} / {project.images.length}</span>
                <button
                  className="media-nav-btn"
                  onClick={() => setImgIdx(i => Math.min(project.images.length - 1, i + 1))}
                  disabled={imgIdx === project.images.length - 1}
                >next →</button>
              </div>
            )}
          </>
        ) : null}

        <div className="modal-body">
          <div className="modal-tags">
            {project.stack?.map(s => <span key={s} className="tag stack">{s}</span>)}
            {project.learned?.map(l => <span key={l} className="tag">{l}</span>)}
          </div>
          {project.description && (
            <p className="modal-desc">{project.description}</p>
          )}
          {(project.webLink || project.ghLink) && (
            <div className="modal-links">
              {project.webLink && (
                <a href={project.webLink} target="_blank" rel="noreferrer" className="modal-link primary">
                  Visit site ↗
                </a>
              )}
              {project.ghLink && (
                <a href={project.ghLink} target="_blank" rel="noreferrer" className="modal-link secondary">
                  GitHub ↗
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}
