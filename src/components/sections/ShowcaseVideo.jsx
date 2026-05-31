import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MicrobVideoSection } from '../VideoPlayer'
import { useTheme } from '../../context/ThemeContext'

gsap.registerPlugin(ScrollTrigger)

export default function ShowcaseVideo() {
  const containerRef = useRef(null)
  const videoWrapperRef = useRef(null)
  const { isDark } = useTheme()

  useEffect(() => {
    let ctx = gsap.context(() => {
      // High-impact scroll-driven zoom/pop-up reveal
      gsap.fromTo(videoWrapperRef.current,
        {
          scale: 0.82,
          y: 100
        },
        {
          scale: 1,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 95%',  // Starts animating as soon as section enters the viewport
            end: 'top 30%',    // Fully expanded and clear by the time it reaches upper-middle screen
            scrub: 1.2,        // Smoothly interpolates with user scrolling
          }
        }
      )

      // Video parallax removed to prevent thumbnail cropping
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative pt-0 md:pt-0 pb-10 md:pb-24 bg-bg overflow-hidden transition-colors duration-500 z-10"
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        <div ref={videoWrapperRef}>
          {/* Header Text - Now part of the animated reveal */}
          {/* <div className="mb-8 md:mb-16 max-w-[800px]">

            <h2 className="text-3xl md:text-5xl font-display font-medium text-accent tracking-tight leading-[1.1] mb-6">
              Experience the Innovation
            </h2>
            <p className="text-text-muted text-[1rem] md:text-[1.2rem] font-light leading-relaxed max-w-[600px]">
              Watch how we are redefining the colours of the world through the precision of biology.
            </p>
          </div> */}

          {/* Animated Video Container */}
          <div className="relative w-full max-w-[1000px] mx-auto rounded-[32px] md:rounded-[60px] overflow-hidden border border-border-default shadow-2xl bg-white dark:bg-black aspect-video">
            <MicrobVideoSection
              videoSrc="https://ik.imagekit.io/g4lukt2ll/Microb_Redisign/pitch_video.mp4?updatedAt=1778316180059"
              thumbnailSrc={isDark ? "/Image 1_ Dark Background.jpg" : "/thumbnail for the video.jpg"}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
