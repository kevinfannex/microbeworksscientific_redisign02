import { useEffect, useRef } from 'react'

export default function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold }
    )

    // Observe all .reveal elements inside the ref, or the ref itself
    const revealEls = el.querySelectorAll('.reveal')
    if (revealEls.length > 0) {
      revealEls.forEach((child) => observer.observe(child))
    } else if (el.classList.contains('reveal')) {
      observer.observe(el)
    }

    return () => observer.disconnect()
  }, [threshold])

  return ref
}
