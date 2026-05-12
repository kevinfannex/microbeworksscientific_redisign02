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
      <div className="science-intro-header py-12 md:py-20 px-6 text-center bg-black">
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
            { text: "Microbes ", className: "text-accent" },
            { text: "to " },
            { br: true, className: "md:hidden" },
            { text: "Materials", className: "text-accent" }
          ]}
        </ScrollFloat>
        <p className="text-base md:text-lg text-white/60 font-light max-w-[600px] mx-auto">
          Engineering living systems to create sustainable color—replacing toxic dyes with biology.
        </p>
      </div>

      {/* Science Content Wrapper */}
      <div className="relative z-10">
        {/* Problem Section */}
        <section ref={problemRef} className="bg-black text-white overflow-hidden min-h-screen flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full">
            <div className="text-block flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20 md:py-0 order-2 md:order-1">
              <ScrollFloat
                animationDuration={0.5}
                ease='power4.out'
                scrollStart='top bottom-=10%'
                scrollEnd='bottom center'
                containerClassName="mb-8 text-left"
                textClassName="text-[0.8rem] md:text-[0.9rem] font-bold tracking-[0.2em] text-white/60 font-mono uppercase"
              >
                • PROBLEM
              </ScrollFloat>
              <p className="text-[1.075rem] md:text-lg text-white/90 font-light leading-[1.8] mb-6">
                The textile industry’s reliance on synthetic dyes causes major environmental and health issues. Traditional dyeing uses large amounts of water, contributing to scarcity, and releases toxic chemicals into water bodies, harming ecosystems.
              </p>
              <p className="text-[1.075rem] md:text-lg text-white/90 font-light leading-[1.8]">
                Workers and nearby communities are exposed to hazardous substances, leading to health problems. Additionally, dye production depends on petrochemicals and energy-intensive processes.
              </p>
            </div>
            <div className="img-block relative order-1 md:order-2 h-[50vh] md:h-screen min-h-[400px]">
              <img
                src="https://ik.imagekit.io/g4lukt2ll/Microb_Redisign/Gemini_Generated_Image_isxu51isxu51isxu.png?updatedAt=1776515757661"
                alt="Industrial pollution"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="hidden md:block absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent"></div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section ref={solutionRef} className="bg-bg text-text-primary overflow-hidden min-h-screen flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full">
            <div className="text-block flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20 md:py-0 order-2 md:order-1">
              <ScrollFloat
                animationDuration={0.5}
                ease='power4.out'
                scrollStart='top bottom-=10%'
                scrollEnd='bottom center'
                containerClassName="mb-8 text-left"
                textClassName="text-[0.8rem] md:text-[0.9rem] font-bold tracking-[0.2em] text-accent font-mono uppercase font-semibold"
              >
                • SOLUTION
              </ScrollFloat>
              <p className="text-[1.075rem] md:text-lg text-text-muted font-light leading-[1.8] mb-6">
                A sustainable alternative is microbial dyeing, which uses microorganisms like bacteria or fungi to produce natural pigments. These microbes are grown in controlled conditions and used to dye fabrics without toxic chemicals.
              </p>
              <p className="text-[1.075rem] md:text-lg text-text-muted font-light leading-[1.8]">
                This method significantly reduces water usage, is biodegradable, and safer for humans and the environment. It relies on renewable processes, making it an eco-friendly solution for the future.
              </p>
            </div>
            <div className="img-block relative order-1 md:order-2 h-[50vh] md:h-screen min-h-[400px]">
              <img
                src="https://ik.imagekit.io/g4lukt2ll/Microb_Redisign/Screenshot%202026-04-18%20182038.png"
                alt="Microbial solution"
                className="absolute inset-0 w-full h-full object-cover object-[left_top]"
              />
              <div className="hidden md:block absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg to-transparent"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
