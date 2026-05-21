import { useEffect } from 'react'
import Lenis from 'lenis'

export let lenis = null

export function useLenis() {
  useEffect(() => {
    lenis = new Lenis({
      duration: 1.25,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      lenis = null
      cancelAnimationFrame(rafId)
    }
  }, [])
}
