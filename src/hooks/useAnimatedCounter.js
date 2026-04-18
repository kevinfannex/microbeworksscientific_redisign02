import { useEffect, useRef, useState } from 'react'

export default function useAnimatedCounter(target, duration = 2000, threshold = 0.4) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            const start = performance.now()

            function tick(now) {
              const p = Math.min((now - start) / duration, 1)
              const ease = 1 - Math.pow(1 - p, 3) // ease-out cubic
              setCount(Math.floor(ease * target))
              if (p < 1) requestAnimationFrame(tick)
            }

            requestAnimationFrame(tick)
          }
        })
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration, threshold])

  return { ref, count }
}
