import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SciencePage() {
  const heroRef = useRef(null)
  const problemRef = useRef(null)
  const solutionRef = useRef(null)

  useEffect(() => {
    // Simple fade-in animations for the text blocks as you scroll
    const sections = [problemRef.current, solutionRef.current]

    sections.forEach((sec) => {
      if (!sec) return
      const textBlock = sec.querySelector('.text-block')
      const imgBlock = sec.querySelector('.img-block')

      gsap.fromTo(textBlock,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sec,
            start: 'top 75%',
          }
        }
      )

      gsap.fromTo(imgBlock,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sec,
            start: 'top 75%',
          }
        }
      )
    })

    // Hero Text Zoom Out Effect
    gsap.to('.hero-text-container', {
      scale: 0.8,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-spacer',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <div className="bg-black min-h-screen relative">
      {/* Fixed Hero Section */}
      <section ref={heroRef} className="fixed inset-0 z-0 h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://ik.imagekit.io/g4lukt2ll/Microb_Redisign/microbimg.jpg"
            alt="Microbes background"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
        </div>
        <div className="hero-text-container relative z-10 max-w-[800px] mx-auto -mt-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            From <span className="text-[rgba(0,255,136,0.5)]">Microbes</span> to <span className="text-white">Materials</span>
          </h1>
          <p className="text-base md:text-lg text-white/80 font-light leading-relaxed max-w-[500px] mx-auto">
            Engineering living systems to create sustainable color—replacing toxic dyes with biology.
          </p>
        </div>
      </section>

      {/* Spacer for Hero Scroll */}
      <div className="hero-spacer h-screen w-full relative z-0"></div>

      {/* Content wrapper to overlap Hero */}
      <div className="relative z-10 bg-black">
        {/* Problem Section */}
        <section ref={problemRef} className="bg-black text-white">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Text */}
            <div className="text-block flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16 md:py-32 order-2 md:order-1">
              <div className="text-[0.7rem] tracking-[0.2em] text-white/60 mb-8 font-mono uppercase">
                • PROBLEM
              </div>
              <p className="text-[0.95rem] md:text-base text-white/90 font-light leading-[1.8] mb-6">
                The textile industry’s reliance on synthetic dyes causes major environmental and health issues. Traditional dyeing uses large amounts of water, contributing to scarcity, and releases toxic chemicals into water bodies, harming ecosystems.
              </p>
              <p className="text-[0.95rem] md:text-base text-white/90 font-light leading-[1.8]">
                Workers and nearby communities are exposed to hazardous substances, leading to health problems. Additionally, dye production depends on petrochemicals and energy-intensive processes, increasing pollution and carbon emissions. Overall, this makes the current dyeing system unsustainable and harmful.
              </p>
            </div>
            {/* Image */}
            <div className="img-block relative order-1 md:order-2 h-[40vh] md:h-auto min-h-[400px]">
              <img
                src="https://ik.imagekit.io/g4lukt2ll/Microb_Redisign/Gemini_Generated_Image_isxu51isxu51isxu.png?updatedAt=1776515757661"
                alt="Industrial pollution and synthetic dyes"
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
              {/* Soft fade to black on the left edge for blending */}
              <div className="hidden md:block absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent"></div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section ref={solutionRef} className="bg-white text-black">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Text */}
            <div className="text-block flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16 md:py-32 order-2 md:order-1">
              <div className="text-[0.7rem] tracking-[0.2em] text-black/50 mb-8 font-mono uppercase font-semibold">
                • SOLUTION
              </div>
              <p className="text-[0.95rem] md:text-base text-black/80 font-light leading-[1.8] mb-6">
                A sustainable alternative is microbial dyeing, which uses microorganisms like bacteria or fungi to produce natural pigments. These microbes are grown in controlled conditions and used to dye fabrics without toxic chemicals.
              </p>
              <p className="text-[0.95rem] md:text-base text-black/80 font-light leading-[1.8]">
                This method significantly reduces water usage, is biodegradable, and safer for humans and the environment. It is also faster than traditional natural dyeing and relies on renewable processes, making it an eco-friendly solution for the future of the textile industry.
              </p>
            </div>
            {/* Image */}
            <div className="img-block relative order-1 md:order-2 h-[40vh] md:h-auto min-h-[400px]">
              <img
                src="https://ik.imagekit.io/g4lukt2ll/Microb_Redisign/Screenshot%202026-04-18%20182038.png"
                alt="Microbial solution and laboratory"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Soft fade to white on the left edge for blending */}
              <div className="hidden md:block absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
