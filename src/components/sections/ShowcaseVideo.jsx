import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MicrobVideoSection } from '../VideoPlayer'

gsap.registerPlugin(ScrollTrigger)

export default function ShowcaseVideo() {
  const containerRef = useRef(null)
  const videoWrapperRef = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Cinematic internal reveal (Fade & Blur only, removed Y to prevent double-parallax)
      gsap.fromTo(videoWrapperRef.current,
        {
          scale: 0.95,
          opacity: 0,
          filter: 'blur(10px)'
        },
        {
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Parallax for the video content itself
      gsap.fromTo('.video-parallax',
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative pt-16 md:pt-32 pb-10 md:pb-24 bg-bg overflow-hidden transition-colors duration-500 z-10"
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        <div ref={videoWrapperRef}>
          {/* Header Text - Now part of the animated reveal */}
          <div className="mb-8 md:mb-16 max-w-[800px]">

            <h2 className="text-3xl md:text-5xl font-display font-medium text-accent tracking-tight leading-[1.1] mb-6">
              Experience the Innovation
            </h2>
            <p className="text-text-muted text-[1rem] md:text-[1.2rem] font-light leading-relaxed max-w-[600px]">
              Watch how we are redefining the colors of the world through the precision of biology.
            </p>
          </div>

          {/* Animated Video Container */}
          <div className="relative w-full rounded-[32px] md:rounded-[60px] overflow-hidden border border-border-default shadow-2xl bg-black">
            <div className="video-parallax w-full h-full scale-[1.1]">
              <MicrobVideoSection
                videoSrc="https://ik.imagekit.io/g4lukt2ll/Microb_Redisign/pitch_video.mp4?updatedAt=1778316180059"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
