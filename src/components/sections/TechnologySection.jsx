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
    const W = canvas.offsetWidth || 560
    const H = 500
    canvas.width = W
    canvas.height = H
    let frame = 0
    let animId

    function drawDNA() {
      ctx.clearRect(0, 0, W, H)
      frame++
      const t = frame * 0.018
      const cx = W / 2
      for (let y = 0; y < H; y += 2) {
        const fy = y / H
        const wave = Math.sin(fy * Math.PI * 5 + t)
        const x1 = cx + wave * 90
        const x2 = cx - wave * 90
        const alpha = 0.15 + Math.abs(wave) * 0.4
        ctx.beginPath(); ctx.arc(x1, y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,180,80,${alpha})`; ctx.fill()
        ctx.beginPath(); ctx.arc(x2, y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,255,136,${alpha * 0.9})`; ctx.fill()
        if (y % 20 === 0) {
          ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y)
          ctx.strokeStyle = `rgba(0,0,0,${0.08 + Math.abs(wave) * 0.2})`
          ctx.lineWidth = 0.8; ctx.stroke()
          const mid = (x1 + x2) / 2
          ctx.beginPath(); ctx.arc(mid, y, 3, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${Math.random() > 0.5 ? '0,180,80' : '0,120,60'},0.5)`; ctx.fill()
        }
      }
      const grad = ctx.createRadialGradient(cx, H / 2, 0, cx, H / 2, 130)
      grad.addColorStop(0, 'rgba(0,255,136,0.06)')
      grad.addColorStop(1, 'rgba(0,255,136,0)')
      ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H)
      animId = requestAnimationFrame(drawDNA)
    }
    drawDNA()

    gsap.from(canvas, {
      x: 80, opacity: 0, duration: 1.2,
      scrollTrigger: { trigger: canvas.parentElement, start: 'top 75%' },
    })

    return () => { cancelAnimationFrame(animId); ScrollTrigger.getAll().forEach((t) => t.kill()) }
  }, [])

  return (
    <section id="tech" ref={sectionRef} className="relative px-4 md:px-8 lg:px-12 py-24 md:py-32 lg:py-40 bg-bg2 overflow-hidden">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        <div>
          <SectionLabel className="reveal">Deep Technology</SectionLabel>
          <h2 className="reveal reveal-delay-1 font-display text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.1] text-text-primary tracking-tight">
            Precision biology<br />at <em className="italic text-accent">scale.</em>
          </h2>
          <p className="reveal reveal-delay-2 text-text-muted text-base leading-relaxed font-light my-6 md:my-8">
            Our proprietary strain library contains 200+ engineered variants across 8 chassis organisms. Each strain is optimized for yield, stability, and color gamut.
          </p>
          <div className="reveal reveal-delay-2 flex flex-col gap-px mt-8 md:mt-12">
            {specs.map((s) => (
              <div key={s.label} className="flex items-center justify-between py-3 border-b border-border-default text-[0.82rem]">
                <span className="text-text-muted font-light">{s.label}</span>
                <span className="font-mono text-accent text-[0.75rem]">{s.val}</span>
              </div>
            ))}
          </div>
          <div className="reveal reveal-delay-3 mt-8 md:mt-10 px-5 py-4 md:px-6 md:py-5 border-l-2 border-accent bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
            <p className="font-display italic text-[1.05rem] text-text-primary leading-relaxed mb-3">
              "We didn't just find a greener dye — we reprogrammed 3.8 billion years of evolution to grow the exact color we want."
            </p>
            <cite className="font-mono text-[0.7rem] text-text-muted tracking-[0.1em] not-italic">— DR. PRIYA MEHTA, CO-FOUNDER & CSO</cite>
          </div>
        </div>
        <div className="relative reveal reveal-delay-2">
          <canvas ref={canvasRef} className="w-full h-[400px] md:h-[500px] block" />
        </div>
      </div>
    </section>
  )
}
