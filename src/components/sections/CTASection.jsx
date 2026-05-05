import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from '../SectionLabel'
import useScrollReveal from '../../hooks/useScrollReveal'

gsap.registerPlugin(ScrollTrigger)

const partners = ['ADIDAS', 'H&M GROUP', 'INDITEX', 'LVMH']

export default function CTASection() {
  const sectionRef = useScrollReveal()

  useEffect(() => {
    gsap.from('.cta-title-anim', {
      y: 40, opacity: 0, duration: 1.2,
      scrollTrigger: { trigger: '#cta', start: 'top 80%' },
    })
    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <section id="cta" ref={sectionRef} className="relative px-4 md:px-8 lg:px-12 py-32 md:py-40 lg:py-48 bg-bg2 overflow-hidden">
      {/* Bg effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,255,136,.08),transparent_70%)] pointer-events-none" />
      <div className="cta-grid-bg absolute inset-0 overflow-hidden" />

      <div className="max-w-[900px] mx-auto text-center relative z-[1]">
        <SectionLabel className="reveal" center>Get Involved</SectionLabel>

        <h2 className="cta-title-anim reveal reveal-delay-1 font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] text-text-primary tracking-tight mb-6">
          The future of color<br />is <em className="italic text-accent">alive.</em>
        </h2>

        <p className="reveal reveal-delay-2 text-text-muted text-base font-light leading-relaxed max-w-[560px] mx-auto mb-10 md:mb-14">
          Whether you're a textile manufacturer, sustainability-driven brand,
          or climate investor — we want to hear from you.
        </p>

        <div className="reveal reveal-delay-3 flex gap-4 md:gap-6 justify-center flex-wrap">
          <button className="btn-clip-lg bg-accent text-white border-none px-8 py-4 md:px-10 md:py-5 text-[0.9rem] font-semibold tracking-[0.1em] uppercase cursor-pointer font-body transition-all duration-300 hover:shadow-[0_0_50px_rgba(0,255,136,.5)] hover:-translate-y-1">
            Work With Us
          </button>
          <button className="bg-transparent border border-border-bright text-text-primary px-8 py-4 md:px-10 md:py-5 text-[0.9rem] tracking-[0.1em] uppercase cursor-pointer font-body transition-colors duration-300 hover:bg-text-primary/4">
            Investor Deck →
          </button>
        </div>

        <div className="reveal reveal-delay-4 mt-12 md:mt-16 flex items-center justify-center gap-6 md:gap-12 flex-wrap">
          <span className="font-mono text-[0.65rem] text-text-dim tracking-[0.2em] uppercase">In conversation with</span>
          <div className="flex gap-6 md:gap-10 items-center flex-wrap">
            {partners.map((p) => (
              <span key={p} className="font-mono text-[0.75rem] text-text-dim tracking-[0.15em] font-bold opacity-50 transition-opacity duration-300 hover:opacity-100 cursor-default">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
