import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const canvasContainerRef = useRef(null)
  const contentRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const container = canvasContainerRef.current
    if (!container) return

    const canvas = document.createElement('canvas')
    canvas.style.display = 'block'
    container.appendChild(canvas)

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 80

    // Particle geometry
    const COUNT = 1800
    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)
    const sizes = new Float32Array(COUNT)

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3
      const r = 60 + Math.random() * 40
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6
      positions[i3 + 2] = r * Math.cos(phi)
      const t = Math.random()
      colors[i3] = t * 0.0 + (1 - t) * 0.05
      colors[i3 + 1] = t * 1.0 + (1 - t) * 0.55
      colors[i3 + 2] = t * 0.53 + (1 - t) * 0.1
      sizes[i] = 0.3 + Math.random() * 1.2
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const mat = new THREE.PointsMaterial({
      size: 0.8, vertexColors: true, transparent: true,
      opacity: 0.5, sizeAttenuation: true,
    })

    const particles = new THREE.Points(geo, mat)
    scene.add(particles)

    // Central glow sphere
    const sphereGeo = new THREE.SphereGeometry(8, 32, 32)
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x00ff88, transparent: true, opacity: 0.04, wireframe: true,
    })
    const sphere = new THREE.Mesh(sphereGeo, sphereMat)
    scene.add(sphere)

    // Inner core
    const coreGeo = new THREE.SphereGeometry(3, 16, 16)
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x00ff88, transparent: true, opacity: 0.12,
    })
    const core = new THREE.Mesh(coreGeo, coreMat)
    scene.add(core)

    // Mouse parallax
    let mx = 0, my = 0
    const onMouseMove = (e) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2
      my = (e.clientY / window.innerHeight - 0.5) * 2
    }
    document.addEventListener('mousemove', onMouseMove)

    let scrollY = 0
    const onScroll = () => { scrollY = window.scrollY }
    window.addEventListener('scroll', onScroll)

    const clock = new THREE.Clock()
    let animId
    function animate() {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      const scrollFrac = Math.min(scrollY / window.innerHeight, 1)

      particles.rotation.y = t * 0.03 + mx * 0.1
      particles.rotation.x = t * 0.015 + my * 0.05
      mat.opacity = 0.45 - scrollFrac * 0.35

      sphere.rotation.y = t * 0.1
      sphere.rotation.x = t * 0.07

      camera.position.z = 80 + scrollFrac * 20
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    let fadeAnim;
    // Fade out hero content as user scrolls toward Info section
    if (contentRef.current) {
      fadeAnim = gsap.to(contentRef.current, {
        y: -80,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'center center',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }

    return () => {
      cancelAnimationFrame(animId)
      document.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      renderer.forceContextLoss()
      renderer.dispose()
      if (container && canvas.parentNode === container) {
        container.removeChild(canvas)
      }
      geo.dispose()
      mat.dispose()
      sphereGeo.dispose()
      sphereMat.dispose()
      coreGeo.dispose()
      coreMat.dispose()
      if (fadeAnim && fadeAnim.scrollTrigger) {
        fadeAnim.scrollTrigger.kill()
      }
    }
  }, [])

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} id="hero" className="relative h-screen flex items-center justify-center overflow-hidden z-10 sticky top-0">
      <div ref={canvasContainerRef} className="absolute inset-0 w-full h-full" />

      <div ref={contentRef} className="relative z-[2] text-center max-w-[860px] px-4 md:px-8">
        {/* Badge */}
        {/* <div className="inline-flex items-center gap-2 border border-border-bright bg-accent/7 px-4 py-1.5 rounded-full text-[0.72rem] tracking-[0.15em] uppercase text-accent mb-8 font-mono">
          <div className="w-1.5 h-1.5 bg-accent2 rounded-full animate-pulse-dot" />
          Synthetic Biology · Series A 2025
        </div> */}

        {/* Title */}
        <h1 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[1.0] text-text-primary mb-6 tracking-tight">
          We grow color.
          <em className="block italic text-accent not-italic" style={{ fontStyle: 'italic' }}>Not pollution.</em>
        </h1>

        {/* Subtitle */}
        {/* <p className="text-[clamp(1rem,2vw,1.2rem)] text-text-muted font-light leading-relaxed max-w-[480px] mx-auto mb-10 md:mb-12">
          Sustainable textile dyes engineered from living microorganisms —
          replacing toxic chemicals with the precision of biology.
        </p> */}

        {/* CTAs */}
        {/* <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => scrollToSection('how')}
            className="btn-clip bg-accent text-white border-none px-7 py-3.5 text-[0.85rem] font-semibold tracking-[0.08em] uppercase cursor-pointer font-body transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,255,136,0.5)] hover:-translate-y-0.5"
          >
            Explore Technology
          </button>
          <button
            onClick={() => scrollToSection('cta')}
            className="bg-transparent border border-black/15 text-text-primary px-7 py-3.5 text-[0.85rem] font-normal tracking-[0.08em] uppercase cursor-pointer font-body transition-all duration-300 hover:bg-black/4 hover:border-black/25"
          >
            Partner With Us
          </button>
        </div> */}
      </div>

      {/* Scroll Hint */}
      <div className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-dim text-[0.72rem] tracking-[0.15em] uppercase font-mono">
        <span>Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-accent to-transparent animate-scroll-down" />
      </div>
    </section>
  )
}
