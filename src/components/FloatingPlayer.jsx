import { useState, useRef, useEffect } from 'react'

export default function FloatingPlayer() {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100)
      }
    }
    audio.addEventListener('timeupdate', onTimeUpdate)

    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.5)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (playing) {
      audio.pause()
    } else {
      audio.play().catch(() => {})
    }
    setPlaying(p => !p)
  }

  return (
    <>
      <audio ref={audioRef} src="/assets/music/BeepBox-Song.mp3" loop />
      <div className={`floating-player ${visible ? '' : 'hidden'}`}>
        <span className="player-icon">♪</span>
        <div className="player-meta">
          <div className="player-title">BeepBox Song</div>
          <div className="player-artist">basia.exe</div>
        </div>
        <div className="player-controls">
          <button className="player-btn" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>
            {playing ? '⏸' : '▶'}
          </button>
        </div>
        <div className="player-progress">
          <div className="player-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </>
  )
}
