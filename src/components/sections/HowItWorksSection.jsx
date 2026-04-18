import { useEffect, useRef } from 'react'
import SectionLabel from '../SectionLabel'
import useScrollReveal from '../../hooks/useScrollReveal'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    num: '01',
    icon: '🧬',
    title: 'Genome Engineering',
    desc: 'Using CRISPR-Cas9, we splice chromogenic gene clusters into Bacillus subtilis, switching on dormant pigment-producing pathways with surgical precision.',
    tag: 'CRISPR-Cas9',
  },
  {
    num: '02',
    icon: '🌾',
    title: 'Nutrient Feed',
    desc: 'Engineered strains are cultured in bioreactors with precise glucose-mineral media. No petrochemicals. Just carbohydrates and trace minerals.',
    tag: 'BIOREACTOR',
  },
  {
    num: '03',
    icon: '🔬',
    title: 'Fermentation',
    desc: '72-hour aerobic fermentation at 32°C. Microbes multiply exponentially while secreting pigment molecules into the broth at 4–8% dry weight yield.',
    tag: '72HR CYCLE',
  },
  {
    num: '04',
    icon: '💧',
    title: 'Pigment Extraction',
    desc: 'Cell-free broth is centrifuged and membrane-filtered. Pigments are concentrated by nanofiltration — no organic solvents required.',
    tag: 'ZERO SOLVENT',
  },
  {
    num: '05',
    icon: '🎨',
    title: 'Textile Application',
    desc: 'Bio-dye formulations drop into existing exhaust dyeing equipment. Compatible with cotton, silk, wool, and synthetic blends. ISO-grade colorfastness.',
    tag: 'DROP-IN READY',
  },
]

export default function HowItWorksSection() {
  const sectionRef = useScrollReveal()
  const timelineRef = useRef(null)

  // Refs for the animated line fills & orbs
  const mobileTrackRef = useRef(null)
  const mobileFillRef = useRef(null)
  const mobileOrbRef  = useRef(null)
  
  const desktopTrackRef = useRef(null)
  const desktopFillRef = useRef(null)
  const desktopOrbRef  = useRef(null)

  /* ── Scroll-reveal for timeline items ── */
  useEffect(() => {
    const section = timelineRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = section.querySelectorAll('.timeline-item')
            items.forEach((item, i) => {
              setTimeout(() => item.classList.add('visible'), i * 220)
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  /* ── GSAP scroll-driven light animation ── */
  useEffect(() => {
    const section = timelineRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // ── Mobile line fill (scaleY from top) ──
      if (mobileFillRef.current && mobileTrackRef.current) {
        gsap.fromTo(
          mobileFillRef.current,
          { scaleY: 0, transformOrigin: 'top center' },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: mobileTrackRef.current,
              start: 'top center',
              end: 'bottom center',
              scrub: 0.5,
            },
          }
        )
      }

      // ── Mobile orb travelling down ──
      if (mobileOrbRef.current && mobileTrackRef.current) {
        gsap.fromTo(
          mobileOrbRef.current,
          { top: '0%' },
          {
            top: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: mobileTrackRef.current,
              start: 'top center',
              end: 'bottom center',
              scrub: 0.5,
            },
          }
        )
      }

      // ── Desktop line fill (scaleY from top) ──
      if (desktopFillRef.current && desktopTrackRef.current) {
        gsap.fromTo(
          desktopFillRef.current,
          { scaleY: 0, transformOrigin: 'top center' },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: desktopTrackRef.current,
              start: 'top center',
              end: 'bottom center',
              scrub: 0.5,
            },
          }
        )
      }

      // ── Desktop orb travelling down ──
      if (desktopOrbRef.current && desktopTrackRef.current) {
        gsap.fromTo(
          desktopOrbRef.current,
          { top: '0%' },
          {
            top: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: desktopTrackRef.current,
              start: 'top center',
              end: 'bottom center',
              scrub: 0.5,
            },
          }
        )
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="how"
      ref={(el) => {
        sectionRef.current = el
        timelineRef.current = el
      }}
      className="relative py-20 md:py-32 lg:py-44 bg-bg2 overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 100%)',
        }}
      />

      {/* ── Header ── */}
      <div className="px-5 md:px-8 max-w-[680px] mx-auto mb-14 md:mb-28 text-center">
        <SectionLabel className="reveal justify-center">The Process</SectionLabel>

        <h2 className="reveal reveal-delay-1 font-display text-[clamp(2rem,6vw,4.6rem)] leading-[1.1] text-text-primary tracking-tight mt-3">
          From genome to{' '}
          <em className="text-accent" style={{ fontStyle: 'italic' }}>
            garment.
          </em>
        </h2>

        <p className="reveal reveal-delay-2 text-text-muted text-[0.95rem] md:text-[1.15rem] leading-[1.8] mt-5 max-w-[520px] mx-auto font-light">
          Five precisely engineered steps transform microbial biology into
          commercial-grade bio-dyes — clean, scalable, and drop-in ready.
        </p>
      </div>

      {/* ══════════════════════════════════════════
          MOBILE TIMELINE  (< md)
      ══════════════════════════════════════════ */}
      <div className="md:hidden relative max-w-[520px] mx-auto px-5" ref={mobileTrackRef}>

        {/* Base track line */}
        <div
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{ left: '28px', width: '1px', background: 'rgba(0,0,0,0.1)' }}
        >
          {/* Green fill — grows as you scroll */}
          <div
            ref={mobileFillRef}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, #00ff88, #00cc6a)',
              transformOrigin: 'top center',
              scaleY: 0,
              boxShadow: '0 0 6px 1px rgba(0,255,136,0.45)',
            }}
          />

          {/* Travelling glowing orb */}
          <div
            ref={mobileOrbRef}
            style={{
              position: 'absolute',
              left: '50%',
              top: '0%',
              transform: 'translate(-50%, -50%)',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#ffffff',
              boxShadow: '0 0 12px 4px rgba(0,255,136,0.8), 0 0 24px 8px rgba(0,255,136,0.4)',
              pointerEvents: 'none',
              zIndex: 20,
            }}
          />
        </div>

        {steps.map((step, i) => (
          <div
            key={step.num}
            className="timeline-item relative flex items-start gap-5 mb-10 last:mb-0"
            style={{
              opacity: 0,
              transform: 'translateX(-24px)',
              transition: `opacity 0.6s cubic-bezier(0.4,0,0.2,1) ${i * 0.12}s, transform 0.6s cubic-bezier(0.4,0,0.2,1) ${i * 0.12}s`,
            }}
          >
            {/* Icon node */}
            <div className="relative z-10 flex-shrink-0">
              <div className="w-14 h-14 rounded-full border border-accent/35 bg-bg2 flex items-center justify-center shadow-[0_0_0_5px_#f6f6f4]">
                <div
                  className="w-10 h-10 rounded-full bg-white border border-accent/40 flex items-center justify-center shadow-[0_2px_12px_rgba(0,255,136,0.15)]"
                  style={{ fontSize: '1.35rem' }}
                >
                  {step.icon}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 pt-1">
              <span className="font-mono text-[0.65rem] tracking-[0.22em] text-accent2 uppercase block mb-1.5">
                Step {step.num}
              </span>
              <h3 className="font-display text-[1.15rem] font-semibold text-text-primary leading-snug mb-2 tracking-tight">
                {step.title}
              </h3>
              <p className="text-[0.88rem] text-text-muted leading-[1.8] font-light">
                {step.desc}
              </p>
              <span className="inline-flex items-center mt-4 font-mono text-[0.62rem] tracking-[0.14em] text-accent2 border border-accent/30 bg-white/60 px-3 py-1 rounded-full">
                {step.tag}
              </span>
            </div>
          </div>
        ))}

        {/* End cap */}
        <div
          className="absolute bottom-0 w-2.5 h-2.5 rounded-full bg-accent/60 shadow-[0_0_10px_rgba(0,255,136,0.6)]"
          style={{ left: '28px', transform: 'translate(-50%, 50%)' }}
        />
      </div>

      {/* ══════════════════════════════════════════
          DESKTOP TIMELINE  (≥ md)
      ══════════════════════════════════════════ */}
      <div className="hidden md:block relative max-w-[1100px] mx-auto px-10 lg:px-16" ref={desktopTrackRef}>

        {/* Base track line */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 pointer-events-none"
          style={{ width: '1px', background: 'rgba(0,0,0,0.1)' }}
        >
          {/* Green fill — grows as you scroll */}
          <div
            ref={desktopFillRef}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, #00ff88, #00cc6a)',
              transformOrigin: 'top center',
              scaleY: 0,
              boxShadow: '0 0 6px 1px rgba(0,255,136,0.45)',
            }}
          />

          {/* Travelling glowing orb */}
          <div
            ref={desktopOrbRef}
            style={{
              position: 'absolute',
              left: '50%',
              top: '0%',
              transform: 'translate(-50%, -50%)',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#ffffff',
              boxShadow: '0 0 15px 5px rgba(0,255,136,0.9), 0 0 30px 10px rgba(0,255,136,0.4)',
              pointerEvents: 'none',
              zIndex: 20,
            }}
          />
        </div>

        {steps.map((step, i) => {
          const isLeft = i % 2 === 0
          return (
            <div
              key={step.num}
              className={`timeline-item relative flex items-center mb-24 last:mb-0 ${
                isLeft ? 'flex-row' : 'flex-row-reverse'
              }`}
              style={{
                opacity: 0,
                transform: isLeft ? 'translateX(-40px)' : 'translateX(40px)',
                transition: `opacity 0.7s cubic-bezier(0.4,0,0.2,1) ${i * 0.1}s, transform 0.7s cubic-bezier(0.4,0,0.2,1) ${i * 0.1}s`,
              }}
            >
              {/* Content */}
              <div
                className={`w-[calc(50%-5rem)] flex flex-col ${
                  isLeft ? 'pr-12 text-right items-end' : 'pl-12 text-left items-start'
                }`}
              >
                <span className="font-mono text-[0.78rem] tracking-[0.22em] text-accent2 uppercase mb-3 block">
                  Step {step.num}
                </span>
                <h3 className="font-display text-[1.5rem] lg:text-[1.75rem] font-semibold text-text-primary leading-[1.25] mb-4 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-[1rem] lg:text-[1.08rem] text-text-muted leading-[1.85] font-light">
                  {step.desc}
                </p>
                <span
                  className="inline-flex items-center gap-2 mt-6 font-mono text-[0.7rem] tracking-[0.14em] text-accent2 border border-accent/30 bg-white/60 px-4 py-1.5 rounded-full"
                  style={{ alignSelf: isLeft ? 'flex-end' : 'flex-start' }}
                >
                  {step.tag}
                </span>
              </div>

              {/* Centre node */}
              <div className="absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
                {/* Glow halo */}
                <div
                  className="absolute w-24 h-24 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(0,255,136,0.14) 0%, transparent 70%)',
                  }}
                />
                {/* Outer ring */}
                <div className="w-20 h-20 rounded-full border border-accent/35 bg-bg2 flex items-center justify-center shadow-[0_0_0_7px_#f6f6f4]">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-full bg-white border border-accent/40 flex items-center justify-center shadow-[0_4px_16px_rgba(0,255,136,0.18)]"
                    style={{ fontSize: '1.75rem' }}
                  >
                    {step.icon}
                  </div>
                </div>
              </div>

              {/* Spacer */}
              <div className="w-[calc(50%-5rem)]" />
            </div>
          )
        })}

        {/* End cap */}
        <div 
          className="absolute left-1/2 bottom-0 w-3 h-3 rounded-full bg-accent/60 shadow-[0_0_10px_rgba(0,255,136,0.6)]"
          style={{ transform: 'translate(-50%, 50%)' }}
        />
      </div>

      {/* Animation override for scroll-reveal */}
      <style>{`
        .timeline-item.visible {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
      `}</style>
    </section>
  )
}
