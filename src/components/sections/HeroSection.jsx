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



    // Textures & Materials
    const textureLoader = new THREE.TextureLoader()
    const microbeTexture = textureLoader.load('/Microbe_Icon.svg')
    microbeTexture.minFilter = THREE.LinearFilter



    // Create exactly two prominent microbes (largest and 2nd largest)
    // Create 12 microbes for more negative space
    const microbes = []
    const MB_COUNT = 18

    for (let i = 0; i < MB_COUNT; i++) {
      const isLargest = i === 0
      const isSecondLargest = i === 1

      // Size calculation: largest is 15, 2nd largest is 9, others vary between 2.5 and 5.5
      const size = isLargest ? 15 : (isSecondLargest ? 9 : (2.5 + Math.random() * 3.0))
      const t = Math.random()

      // Gradient color interpolation between Accent Green (#C4FA34) and Primary Blue (#5CC1FF)
      const color = new THREE.Color().lerpColors(
        new THREE.Color(0xc4fa34),
        new THREE.Color(0x5cc1ff),
        t
      )

      const mbMat = new THREE.SpriteMaterial({
        map: microbeTexture,
        color: color,
        transparent: true,
        opacity: isLargest ? 0.9 : (isSecondLargest ? 0.85 : (0.4 + Math.random() * 0.3)),
        blending: THREE.AdditiveBlending
      })

      const sprite = new THREE.Sprite(mbMat)
      sprite.scale.set(size, size, 1)

      // Spread them evenly across the entire screen
      const spreadX = 160; 
      const spreadY = 90; 
      const x = (Math.random() - 0.5) * spreadX;
      const y = (Math.random() - 0.5) * spreadY;
      const z = 10 + Math.random() * 25;

      sprite.position.set(x, y, z)

      // Assign random, independent direction and velocity
      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.03,
        (Math.random() - 0.5) * 0.03,
        (Math.random() - 0.5) * 0.015
      )

      microbes.push({
        sprite,
        material: mbMat,
        velocity,
        spinSpeed: (Math.random() - 0.5) * 0.06,
        baseOpacity: mbMat.opacity
      })

      scene.add(sprite)
    }

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



      // Move individual microbes independently in random directions
      microbes.forEach((mb) => {
        mb.sprite.position.add(mb.velocity)
        mb.material.rotation += mb.spinSpeed * 0.1

        // Bounce off invisible boundaries to stay in view
        const xBound = 80
        const yBound = 45
        const zBoundMin = 10
        const zBoundMax = 35

        if (Math.abs(mb.sprite.position.x) > xBound) mb.velocity.x *= -1
        if (Math.abs(mb.sprite.position.y) > yBound) mb.velocity.y *= -1
        if (mb.sprite.position.z < zBoundMin || mb.sprite.position.z > zBoundMax) mb.velocity.z *= -1

        // Fade opacity on scroll
        mb.material.opacity = mb.baseOpacity - scrollFrac * (mb.baseOpacity * 0.75)
      })

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

      microbes.forEach((mb) => {
        mb.material.dispose()
      })
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
