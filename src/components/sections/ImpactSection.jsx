import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from '../SectionLabel'
import useScrollReveal from '../../hooks/useScrollReveal'
import useAnimatedCounter from '../../hooks/useAnimatedCounter'

gsap.registerPlugin(ScrollTrigger)

function StatCard({ target, suffix, label, sublabel, delay = '' }) {
  const { ref, count } = useAnimatedCounter(target)

  return (
    <div
      ref={ref}
      className={`reveal ${delay} stat-card-bar relative overflow-hidden border border-border-default bg-bg shadow-[0_2px_16px_rgba(0,0,0,0.06)] backdrop-blur-[10px] px-5 py-6 md:px-6 md:py-8`}
    >
      <div className="font-display text-[2.5rem] md:text-[3rem] text-accent leading-none mb-2">
        {count}{suffix}
      </div>
      <div className="text-[0.8rem] text-text-muted font-light leading-normal">
        {label}
      </div>
      <div className="font-mono text-[0.75rem] text-accent2 mt-1">
        {sublabel}
      </div>
    </div>
  )
}

export default function ImpactSection() {
  const sectionRef = useScrollReveal()
  const splitRef = useRef(null)

  useEffect(() => {
    if (!splitRef.current) return

    const sides = splitRef.current.querySelectorAll('.impact-side-panel')
    gsap.from(sides, {
      x: (i) => (i === 0 ? -60 : 60),
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: splitRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      stagger: 0.2,
    })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <section
      id="impact"
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-40 bg-bg"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12">
        <SectionLabel className="reveal">Environmental Impact</SectionLabel>
        <h2 className="reveal reveal-delay-1 font-display text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.1] text-text-primary tracking-tight">
          The numbers<br />don't <em className="italic text-accent">lie.</em>
        </h2>

        {/* Before/After Split */}
        <div ref={splitRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-12 md:mt-20">
          {/* Dark Side - Chemical Dyeing */}
          <div className="impact-side-panel relative border border-[rgba(220,80,60,0.2)] px-6 py-8 md:px-8 md:py-12 overflow-hidden min-h-[300px] md:min-h-[400px] flex flex-col justify-end bg-gradient-to-br from-[#fff0ee] to-[#faf8f8]">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_30%_30%,rgba(220,80,60,.2),transparent_60%),radial-gradient(ellipse_at_70%_70%,rgba(180,40,40,.15),transparent_60%)]" />
            <svg className="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 300 200" fill="none">
              <circle cx="60" cy="100" r="40" fill="rgba(200,60,40,.3)" />
              <circle cx="120" cy="80" r="30" fill="rgba(180,50,30,.2)" />
              <circle cx="180" cy="110" r="50" fill="rgba(220,70,50,.2)" />
              <circle cx="240" cy="90" r="35" fill="rgba(160,40,20,.25)" />
              <path d="M0 150 C50 120 100 160 150 140 C200 120 250 155 300 135 L300 200 L0 200Z"
                fill="rgba(120,30,20,.3)" />
            </svg>
            <div className="relative z-[1] font-mono text-[0.7rem] tracking-[0.2em] uppercase text-[#ff6b50] mb-4">
              Before — Chemical Dyeing
            </div>
            <div className="relative z-[1] font-display text-xl md:text-[1.8rem] leading-[1.2] text-text-primary">
              72 toxic chemicals.<br />Carcinogenic wastewater.
            </div>
          </div>

          {/* Light Side - Bio-Dyeing */}
          <div className="impact-side-panel relative border border-[rgba(0,200,100,0.2)] px-6 py-8 md:px-8 md:py-12 overflow-hidden min-h-[300px] md:min-h-[400px] flex flex-col justify-end bg-gradient-to-br from-[#f0fff8] to-[#f5fff9]">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_70%_30%,rgba(0,255,136,.2),transparent_60%),radial-gradient(ellipse_at_30%_70%,rgba(0,200,200,.12),transparent_60%)]" />
            <svg className="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 300 200" fill="none">
              <circle cx="80" cy="100" r="6" fill="rgba(0,255,136,.6)" />
              <circle cx="120" cy="80" r="4" fill="rgba(0,200,80,.5)" />
              <circle cx="160" cy="110" r="8" fill="rgba(0,255,136,.4)" />
              <circle cx="200" cy="75" r="5" fill="rgba(0,200,80,.6)" />
              <circle cx="240" cy="100" r="6" fill="rgba(0,255,136,.5)" />
              <path d="M40 140 C80 120 120 135 160 125 C200 115 240 130 280 120" stroke="rgba(0,255,136,.3)"
                strokeWidth="1" fill="none" />
              <path d="M0 160 C50 145 100 155 150 148 C200 141 250 150 300 143 L300 200 L0 200Z"
                fill="rgba(0,180,80,.08)" />
            </svg>
            <div className="relative z-[1] font-mono text-[0.7rem] tracking-[0.2em] uppercase text-accent2 mb-4">
              After — Bio-Dyeing
            </div>
            <div className="relative z-[1] font-display text-xl md:text-[1.8rem] leading-[1.2] text-text-primary">
              Living microbes.<br />Clean effluent. Vivid color.
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-12 md:mt-16">
          <StatCard target={94} suffix="%" label="Reduction in wastewater toxicity versus azo dye processing" sublabel="WATER QUALITY" />
          <StatCard target={78} suffix="%" label="Lower CO₂ equivalent emissions across full production lifecycle" sublabel="CARBON FOOTPRINT" delay="reveal-delay-2" />
          <StatCard target={100} suffix="%" label="Non-toxic, biodegradable output — safe for aquatic ecosystems" sublabel="BIO-SAFE OUTPUT" delay="reveal-delay-3" />
        </div>
      </div>
    </section>
  )
}
