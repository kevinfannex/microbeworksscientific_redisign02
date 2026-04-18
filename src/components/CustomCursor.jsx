import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    // Only show custom cursor on desktop
    if (window.matchMedia('(max-width: 900px)').matches) return
    if ('ontouchstart' in window) return

    document.body.classList.add('has-cursor')

    const dot = dotRef.current
    const ring = ringRef.current
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dot) {
        dot.style.left = mouseX + 'px'
        dot.style.top = mouseY + 'px'
      }
    }

    document.addEventListener('mousemove', onMouseMove)

    let animId
    function animateCursor() {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      if (ring) {
        ring.style.left = ringX + 'px'
        ring.style.top = ringY + 'px'
      }
      animId = requestAnimationFrame(animateCursor)
    }
    animateCursor()

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(animId)
      document.body.classList.remove('has-cursor')
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference hidden md:block">
      <div
        ref={dotRef}
        className="w-2 h-2 bg-white rounded-full absolute -translate-x-1/2 -translate-y-1/2 transition-[width,height] duration-150"
      />
      <div
        ref={ringRef}
        className="w-9 h-9 border border-white/50 rounded-full absolute -translate-x-1/2 -translate-y-1/2 transition-[width,height,border-color] duration-300"
      />
    </div>
  )
}
