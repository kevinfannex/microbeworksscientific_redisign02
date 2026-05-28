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
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 80

    // Particles geometries: 80% Squares, 20% Microbes
    const COUNT = 700
    const SQ_COUNT = Math.floor(COUNT * 0.8) // 80% Squares
    const MB_COUNT = COUNT - SQ_COUNT        // 20% Microbes

    // Arrays for Squares
    const sqPositions = new Float32Array(SQ_COUNT * 3)
    const sqColors = new Float32Array(SQ_COUNT * 3)
    const sqSizes = new Float32Array(SQ_COUNT)

    // Arrays for Microbes
    const mbPositions = new Float32Array(MB_COUNT * 3)
    const mbColors = new Float32Array(MB_COUNT * 3)
    const mbSizes = new Float32Array(MB_COUNT)

    // Generate positions & attributes
    const populateParticles = (positions, colors, sizes, count) => {
      for (let i = 0; i < count; i++) {
        const r = 60 + Math.random() * 40
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        const x = r * Math.sin(phi) * Math.cos(theta)
        const y = r * Math.sin(phi) * Math.sin(theta) * 0.6
        const z = r * Math.cos(phi) * 0.45 // Compress Z to keep particles safely in the background (max Z is ~45, camera is at 80+)

        const t = Math.random()
        // Dynamic gradient between Accent Green (#C4FA34) and Primary Blue (#5CC1FF)
        const r_val = t * 0.77 + (1 - t) * 0.36
        const g_val = t * 0.98 + (1 - t) * 0.76
        const b_val = t * 0.20 + (1 - t) * 1.00

        const size = 0.5 + Math.random() * 1.0 // Reduced variance in size attribute

        const i3 = i * 3
        positions[i3] = x
        positions[i3 + 1] = y
        positions[i3 + 2] = z
        colors[i3] = r_val
        colors[i3 + 1] = g_val
        colors[i3 + 2] = b_val
        sizes[i] = size
      }
    }

    populateParticles(sqPositions, sqColors, sqSizes, SQ_COUNT)
    populateParticles(mbPositions, mbColors, mbSizes, MB_COUNT)

    // Build geometries
    const sqGeo = new THREE.BufferGeometry()
    sqGeo.setAttribute('position', new THREE.BufferAttribute(sqPositions, 3))
    sqGeo.setAttribute('color', new THREE.BufferAttribute(sqColors, 3))
    sqGeo.setAttribute('size', new THREE.BufferAttribute(sqSizes, 1))

    const mbGeo = new THREE.BufferGeometry()
    mbGeo.setAttribute('position', new THREE.BufferAttribute(mbPositions, 3))
    mbGeo.setAttribute('color', new THREE.BufferAttribute(mbColors, 3))
    mbGeo.setAttribute('size', new THREE.BufferAttribute(mbSizes, 1))

    // Textures & Materials
    const textureLoader = new THREE.TextureLoader()
    const microbeTexture = textureLoader.load('/Microbe_Icon.svg')
    microbeTexture.minFilter = THREE.LinearFilter

    // Materials
    const sqMat = new THREE.PointsMaterial({
      size: 1.1, // Reduced size for crisp, premium, micro-squares
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })

    const mbMat = new THREE.PointsMaterial({
      size: 2.8, // Reduced size for delicate floating microbes
      map: microbeTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })

    // Particle systems
    const squareParticles = new THREE.Points(sqGeo, sqMat)
    const microbeParticles = new THREE.Points(mbGeo, mbMat)

    scene.add(squareParticles)
    scene.add(microbeParticles)

    // Central glow sphere
    const sphereGeo = new THREE.SphereGeometry(8, 32, 32)
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0xc4fa34, transparent: true, opacity: 0.04, wireframe: true,
    })
    const sphere = new THREE.Mesh(sphereGeo, sphereMat)
    scene.add(sphere)

    // Inner core (Primary Blue)
    const coreGeo = new THREE.SphereGeometry(3, 16, 16)
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x5cc1ff, transparent: true, opacity: 0.12,
    })
    const core = new THREE.Mesh(coreGeo, coreMat)
    scene.add(core)

    let scrollY = 0
    const onScroll = () => { scrollY = window.scrollY }
    window.addEventListener('scroll', onScroll)

    const clock = new THREE.Clock()
    let animId
    function animate() {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      const scrollFrac = Math.min(scrollY / window.innerHeight, 1)

      // Rotate without cursor following
      squareParticles.rotation.y = -t * 0.02
      squareParticles.rotation.x = t * 0.01

      microbeParticles.rotation.y = t * 0.03
      microbeParticles.rotation.x = t * 0.015

      // Fading opacity on scroll
      sqMat.opacity = 0.7 - scrollFrac * 0.5
      mbMat.opacity = 0.85 - scrollFrac * 0.65

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
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      renderer.forceContextLoss()
      renderer.dispose()
      if (container && canvas.parentNode === container) {
        container.removeChild(canvas)
      }
      sqGeo.dispose()
      sqMat.dispose()
      mbGeo.dispose()
      mbMat.dispose()
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
    <section ref={sectionRef} id="hero" className="relative h-screen flex items-center justify-center overflow-hidden z-10 sticky top-0 dark:bg-black" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div ref={canvasContainerRef} className="absolute inset-0 w-full h-full" />

      <div ref={contentRef} className="relative z-[2] text-center max-w-[860px] px-4 md:px-8">
        {/* Badge */}
        {/* <div className="inline-flex items-center gap-2 border border-border-bright bg-accent/7 px-4 py-1.5 rounded-full text-[0.72rem] tracking-[0.15em] uppercase text-accent mb-8 font-mono">
          <div className="w-1.5 h-1.5 bg-accent2 rounded-full animate-pulse-dot" />
          Synthetic Biology · Series A 2025
        </div> */}

        {/* SEO H1 (Visually Hidden) */}
        <h1 className="sr-only">Sustainable dyes for textiles</h1>

        {/* Visual Title */}
        <div aria-hidden="true" className="font-display leading-[1.1] text-text-primary mb-6 tracking-tight">
          <span className="block text-[1.7rem] md:text-[clamp(2.5rem,6vw,4.8rem)] whitespace-nowrap md:whitespace-normal mb-1 md:mb-0">Powered by microbes.</span>
          <em className="block italic text-accent2 not-italic text-[2.1rem] md:text-[clamp(2.5rem,8vw,5.5rem)] whitespace-nowrap md:whitespace-normal" style={{ fontStyle: 'italic' }}>Built for the planet.</em>
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-dim text-[0.72rem] tracking-[0.15em] uppercase font-mono">
        <span>Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-accent2 to-transparent animate-scroll-down" />
      </div>
    </section>
  )
}
