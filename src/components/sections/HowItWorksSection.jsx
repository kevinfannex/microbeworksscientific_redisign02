import { useEffect, useRef } from 'react'
import SectionLabel from '../SectionLabel'
import useScrollReveal from '../../hooks/useScrollReveal'

const steps = [
  {
    num: '01',
    icon: '🧬',
    title: 'Genome Engineering',
    desc: "Using CRISPR-Cas9, we splice chromogenic gene clusters into Bacillus subtilis, switching on dormant pigment-producing pathways with surgical precision.",
    tag: 'CRISPR-Cas9',
  },
  {
    num: '02',
    icon: '🌾',
    title: 'Nutrient Feed',
    desc: "Engineered strains are cultured in bioreactors with precise glucose-mineral media. No petrochemicals. Just carbohydrates and trace minerals.",
    tag: 'BIOREACTOR',
  },
  {
    num: '03',
    icon: '🔬',
    title: 'Fermentation',
    desc: "72-hour aerobic fermentation at 32°C. Microbes multiply exponentially while secreting pigment molecules into the broth at 4-8% dry weight yield.",
    tag: '72HR CYCLE',
  },
  {
    num: '04',
    icon: '💧',
    title: 'Pigment Extraction',
    desc: "Cell-free broth is centrifuged and membrane-filtered. Pigments are concentrated by nanofiltration — no organic solvents required.",
    tag: 'ZERO SOLVENT',
  },
  {
    num: '05',
    icon: '🎨',
    title: 'Textile Application',
    desc: "Bio-dye formulations drop into existing exhaust dyeing equipment. Compatible with cotton, silk, wool, and synthetic blends. ISO-grade colorfastness.",
    tag: 'DROP-IN READY',
  },
]

export default function HowItWorksSection() {
  const sectionRef = useScrollReveal()
  const trackRef = useRef(null)
  const progressRefs = useRef([])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const cards = track.querySelectorAll('.step-card-animated')
            cards.forEach((card, i) => {
              setTimeout(() => {
                card.classList.add('visible')
                if (progressRefs.current[i]) {
                  setTimeout(() => {
                    progressRefs.current[i].style.width = '100%'
                  }, 200)
                }
              }, i * 180)
            })
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(track)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="how"
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-40 bg-bg2 overflow-hidden"
    >
      <div className="px-4 md:px-8 lg:px-12 max-w-[1200px] mx-auto mb-12 md:mb-20">
        <SectionLabel className="reveal">The Process</SectionLabel>
        <h2 className="reveal reveal-delay-1 font-display text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.1] text-text-primary tracking-tight">
          From genome to <em className="italic text-accent">garment.</em>
        </h2>
      </div>

      {/* Steps Track */}
      <div
        ref={trackRef}
        className="flex px-4 md:px-8 lg:px-12 gap-4 md:gap-6 overflow-x-auto hide-scrollbar max-w-[1400px] mx-auto pb-4"
      >
        {steps.map((step, i) => (
          <div
            key={step.num}
            className="step-card-animated flex-shrink-0 w-[260px] md:w-[280px] border border-border-default bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)] backdrop-blur-[10px] px-5 py-8 md:px-6 md:py-10 relative overflow-hidden transition-all duration-400 hover:-translate-y-2 hover:border-border-bright hover:shadow-[0_4px_32px_rgba(0,255,136,0.18)]"
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            {/* Big number background */}
            <span className="font-mono text-[4rem] font-bold text-accent opacity-[0.08] absolute top-4 right-6 leading-none">
              {step.num}
            </span>

            {/* Icon ring */}
            <div className="ring-pulse relative w-14 h-14 border border-border-bright rounded-full flex items-center justify-center text-2xl mb-6">
              {step.icon}
            </div>

            <h3 className="text-base font-semibold text-text-primary mb-3 tracking-[0.02em]">
              {step.title}
            </h3>
            <p className="text-[0.85rem] text-text-muted leading-relaxed font-light">
              {step.desc}
            </p>

            {/* Tag */}
            <span className="inline-block mt-5 font-mono text-[0.65rem] tracking-[0.1em] text-accent2 border border-accent/20 px-2.5 py-1 rounded-full">
              {step.tag}
            </span>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="max-w-[1200px] mx-auto mt-8 md:mt-12 px-4 md:px-8 lg:px-12 flex items-center gap-2">
        {steps.map((_, i) => (
          <div key={i} className="h-0.5 flex-1 bg-border-default rounded-sm overflow-hidden">
            <div
              ref={(el) => (progressRefs.current[i] = el)}
              className="h-full bg-accent w-0 transition-[width] duration-1000 ease-out"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
