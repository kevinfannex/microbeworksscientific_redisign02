import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from '../SectionLabel'
import useScrollReveal from '../../hooks/useScrollReveal'

gsap.registerPlugin(ScrollTrigger)

const specs = [
  { label: 'Chassis Organisms', val: '8 SPECIES' },
  { label: 'Strain Library', val: '200+ VARIANTS' },
  { label: 'Pigment Yield', val: '4–8% DW' },
  { label: 'Production Cycle', val: '72 HOURS' },
  { label: 'Color Gamut', val: '12 UNIQUE HUES' },
  { label: 'Patent Portfolio', val: '14 GRANTED' },
]

export default function TechnologySection() {
  const sectionRef = useScrollReveal()
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const updateSize = () => {
      canvas.width = canvas.offsetWidth || Math.min(window.innerWidth, 1000)
      canvas.height = canvas.offsetHeight || 800
      return { W: canvas.width, H: canvas.height }
    }

    let dim = updateSize()
    let frame = 0
    let animId

    function drawDNA() {
      if (!ctx) return
      ctx.clearRect(0, 0, dim.W, dim.H)
      frame++
      const t = frame * 0.015 // Fluid, relaxed speed
      const cx = dim.W / 2

      // Draw DNA backbone
      for (let y = 0; y < dim.H; y += 3) {
        const fy = y / dim.H
        const wave = Math.sin(fy * Math.PI * 3 + t)
        const radius = 100 + (Math.sin(fy * Math.PI) * 50) // Tapers at ends
        const x1 = cx + wave * radius
        const x2 = cx - wave * radius
        const alpha = 0.15 + Math.abs(wave) * 0.4

        ctx.beginPath(); ctx.arc(x1, y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,180,80,${alpha})`; ctx.fill()

        ctx.beginPath(); ctx.arc(x2, y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,255,136,${alpha * 0.8})`; ctx.fill()

        if (y % 30 === 0) {
          ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y)
          ctx.strokeStyle = `rgba(0,0,0,${0.03 + Math.abs(wave) * 0.08})`
          ctx.lineWidth = 0.5; ctx.stroke()

          const mid = (x1 + x2) / 2
          ctx.beginPath(); ctx.arc(mid, y, 2.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${Math.random() > 0.5 ? '0,180,80' : '0,120,60'},0.3)`; ctx.fill()
        }
      }

      const grad = ctx.createRadialGradient(cx, dim.H / 2, 0, cx, dim.H / 2, dim.H * 0.6)
      grad.addColorStop(0, 'rgba(0,255,136,0.03)')
      grad.addColorStop(1, 'rgba(0,255,136,0)')
      ctx.fillStyle = grad; ctx.fillRect(0, 0, dim.W, dim.H)

      animId = requestAnimationFrame(drawDNA)
    }

    drawDNA()

    const anim = gsap.from(canvas, {
      y: 60, opacity: 0, duration: 1.5, ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
    })

    const onResize = () => { dim = updateSize() }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId);
      if (anim.scrollTrigger) anim.scrollTrigger.kill()
      window.removeEventListener('resize', onResize)
    }
  }, [sectionRef])

  return (
    <section id="tech" ref={sectionRef} className="relative w-full px-4 md:px-8 lg:px-12 py-24 md:py-32 lg:py-40 bg-bg2 overflow-hidden flex flex-col items-center justify-center">

      {/* Background Animated DNA Canvas */}
      <div className="absolute inset-0 flex justify-center items-center opacity-30 pointer-events-none">
        <canvas ref={canvasRef} className="w-full max-w-[1200px] h-[800px] md:h-[1000px] block" />
      </div>

      <div className="max-w-[900px] mx-auto flex flex-col items-center text-center z-10 w-full relative">
        <SectionLabel className="reveal mx-auto mb-6">Deep Technology</SectionLabel>

        <h2 className="reveal reveal-delay-1 font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] text-text-primary tracking-tight mb-6 mt-2">
          Precision biology <br className="md:hidden" /><em className="italic text-accent">at scale.</em>
        </h2>

        <p className="reveal reveal-delay-2 text-text-muted text-[clamp(1.05rem,1.8vw,1.3rem)] leading-relaxed font-light mb-16 max-w-[640px] mx-auto">
          Our proprietary strain library contains 200+ engineered variants across 8 chassis organisms. Each strain is optimized for yield, stability, and color gamut.
        </p>

        {/* Specs Grid */}
        <div className="reveal reveal-delay-2 w-full grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-24 max-w-[800px] mx-auto">
          {specs.map((s) => (
            <div key={s.label} className="group flex flex-col items-center justify-center p-6 bg-bg/70 backdrop-blur-sm border border-border-default/50 hover:border-accent/30 rounded-[1.5rem] shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,255,136,0.08)] hover:bg-bg cursor-default">
              <span className="font-mono text-accent text-lg md:text-xl lg:text-2xl mb-2 font-medium tracking-tight group-hover:scale-105 transition-transform duration-300">{s.val}</span>
              <span className="text-text-muted text-[0.65rem] md:text-xs tracking-[0.2em] uppercase font-semibold">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Quote */}
        {/* <div className="reveal reveal-delay-3 px-6 md:px-12 py-10 md:py-12 bg-white/90 backdrop-blur-md border border-border-bright rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.04)] relative mx-auto max-w-[760px] w-full">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-accent/10 rounded-full p-3 border border-accent/20 backdrop-blur-sm shadow-[0_0_20px_rgba(0,255,136,0.15)] flex items-center justify-center">
             <svg className="w-6 h-6 text-accent drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
          <p className="font-display italic text-[1.25rem] md:text-[1.65rem] text-text-primary leading-[1.4] mb-8 mt-2 max-w-[600px] mx-auto">
            "We didn't just find a greener dye — we reprogrammed 3.8 billion years of evolution to grow the exact color we want."
          </p>
          <cite className="font-mono not-italic block uppercase flex flex-col items-center gap-1.5">
            <span className="text-text-primary font-bold tracking-widest text-[0.75rem] md:text-[0.8rem]">Dr. Priya Mehta</span>
            <span className="text-accent text-[0.65rem] md:text-[0.7rem] font-semibold tracking-[0.15em]">Co-Founder & CSO</span>
          </cite>
        </div> */}
      </div>

    </section>
  )
}
