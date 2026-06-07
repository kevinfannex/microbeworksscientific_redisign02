import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollFloat from '../ScrollFloat'

gsap.registerPlugin(ScrollTrigger)

export default function ScienceSection() {
  const containerRef = useRef(null)
  const problemRef = useRef(null)
  const solutionRef = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Content Sections Fade In (Internal content only)
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
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} id="science" className="relative bg-black">
      {/* Intro Header */}
      <div className="science-intro-header pt-12 md:pt-20 pb-4 md:pb-8 px-6 text-center bg-black">
        <ScrollFloat
          animationDuration={1.5}
          ease='back.inOut(2)'
          scrollStart='top bottom-=20%'
          scrollEnd='bottom top+=20%'
          stagger={0.03}
          containerClassName="mb-4"
          textClassName="font-display font-bold text-white tracking-tight"
          fontSize="clamp(2rem, 6vw, 4.5rem)"
        >
          {[
            { text: "From " },
            { text: "Microbes ", className: "text-accent2" },
            { text: "to " },
            { br: true, className: "md:hidden" },
            { text: "Materials", className: "text-accent2" }
          ]}
        </ScrollFloat>
        <p className="text-base md:text-lg text-white/60 font-light max-w-[600px] mx-auto">
          Harnessing microbial cell factories to produce safe, sustainable colours       </p>
      </div>

      {/* Science Content Wrapper */}
      <div className="relative z-10">
        {/* Problem Section */}
        <section ref={problemRef} className="bg-black text-white overflow-hidden flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full items-center">
            <div className="text-block flex flex-col justify-center px-8 md:px-16 lg:px-24 py-8 md:py-4 order-2 md:order-1">
              <ScrollFloat
                animationDuration={0.5}
                ease='power4.out'
                scrollStart='top bottom-=10%'
                scrollEnd='bottom center'
                containerClassName="mb-8 text-left"
                fontSize="clamp(1.25rem, 1.8vw, 1.95rem)"
                textClassName="font-bold tracking-[0.25em] text-accent3 font-mono uppercase"
              >
                CURRENT STATE
              </ScrollFloat>
              <p className="text-white/50 font-light leading-[1.8] mb-6 text-justify" style={{ fontSize: 'clamp(0.95rem, 1.35vw, 1.25rem)' }}>
                Textile dyeing is the 2<sup>nd</sup> largest source of water pollution, due to it's reliance on synthetic and petrochemical derived dyes. These dyes use large amounts of water, contributing to scarcity, and release toxic chemicals into water bodies, harming ecosystems.
              </p>
              <p className="text-white/50 font-light leading-[1.8] text-justify" style={{ fontSize: 'clamp(0.95rem, 1.35vw, 1.25rem)' }}>
                While natural colours exist, they are difficult to scale and are inconsistent across batches, making adoption difficult. This means workers in industries and nearby communities are still exposed to hazardous substances, resulting in chronic health issues.
              </p>
              <p className="font-medium leading-[1.8] text-gold mt-6 text-justify" style={{ fontSize: 'clamp(0.95rem, 1.35vw, 1.25rem)' }}>
                There is a steep cost to our vibrant colours.
              </p>
            </div>
            <div className="img-block relative order-1 md:order-2 h-[50vh] md:min-h-[550px]">
              <img
                src="/Current State.png"
                alt="Current State of Industrial pollution"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: 'brightness(1.3)' }}
              />
              <div className="hidden md:block absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent"></div>
              <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-10 text-right">
                <p className="font-display font-bold text-white text-[8px] md:text-[14px] leading-tight">Probal Rashid</p>
                <p className="font-body text-white/70 text-[5px] md:text-[10px] leading-tight mt-0.5">Getty Images</p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section ref={solutionRef} className="bg-bg text-text-primary overflow-hidden flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full items-center">
            <div className="img-block relative order-1 md:order-1 h-[50vh] md:h-[500px]">
              <img
                src="/Our Vision.png"
                alt="Microbial solution"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="hidden md:block absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bg to-transparent"></div>
            </div>
            <div className="text-block flex flex-col justify-center px-8 md:px-16 lg:px-24 py-8 md:py-4 order-2 md:order-2">
              <ScrollFloat
                animationDuration={0.5}
                ease='power4.out'
                scrollStart='top bottom-=10%'
                scrollEnd='bottom center'
                containerClassName="mb-8 text-left"
                fontSize="clamp(1.25rem, 1.8vw, 1.95rem)"
                textClassName="font-bold tracking-[0.25em] text-accent3 font-mono uppercase font-semibold"
              >
                Our Vision
              </ScrollFloat>
              <p className="text-text-muted font-light leading-[1.8] mb-6 text-justify" style={{ fontSize: 'clamp(0.95rem, 1.35vw, 1.25rem)' }}>
                We grow microbes in controlled conditions to produce colours that are biodegradable and non-toxic. They are consistent, replicable and use fewer resources for production and dyeing.
              </p>
              <p className="text-text-muted font-light leading-[1.8] text-justify" style={{ fontSize: 'clamp(0.95rem, 1.35vw, 1.25rem)' }}>
                Microbial dyes combine the ecological safety of plant dyes with the scalability of synthetics making them a sustainable solution.
              </p>
              <p className='font-medium leading-[1.8] text-gold mt-6 text-justify' style={{ fontSize: 'clamp(0.95rem, 1.35vw, 1.25rem)' }}>
                We envision a world in which the colours we wear are in harmony with the planet and people.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
