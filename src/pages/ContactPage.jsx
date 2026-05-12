import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function ContactPage() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-reveal', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div 
      ref={containerRef}
      className="min-h-screen pt-24 pb-12 px-4 md:px-8 lg:px-24 bg-bg flex flex-col items-center justify-start transition-colors duration-500"
    >
      <div className="max-w-[1100px] w-full">
        {/* Title - Reduced size and accent color */}
        <h1 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.2rem] font-display font-medium tracking-tight mb-8 md:mb-10 contact-reveal text-accent">
          Contact
        </h1>

        <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-16">
          {/* Main Question Card (Left) */}
          <div className="relative contact-reveal w-full lg:max-w-[520px]">
            {/* Glow/Shadow - Adaptive for light/dark */}
            <div className="absolute -inset-3 bg-accent/10 dark:bg-accent/20 blur-[40px] rounded-[40px] pointer-events-none opacity-50 dark:opacity-100" />
            
            <div className="relative p-8 md:p-12 rounded-[30px] md:rounded-[50px] bg-bg2 dark:bg-surface border border-border-default shadow-xl">
              <div className="relative z-10">
                <p className="text-[1.5rem] md:text-[2rem] leading-[1.2] font-display font-medium text-text-primary mb-10 max-w-[400px]">
                  Have a question, comment, or request? We'd love to hear from you.
                </p>
                
                <div className="space-y-4 pt-8 border-t border-border-default">
                  {/* <a 
                    href="mailto:info@mws.bio" 
                    className="block text-[0.9rem] md:text-[1rem] font-mono text-accent hover:text-accent2 transition-colors font-semibold"
                  >
                    info@mws.bio
                  </a> */}
                  {/* <p className="text-[0.75rem] md:text-[0.85rem] font-mono text-text-muted leading-relaxed max-w-[300px]">
                    For any sales enquiries, write to us at <a href="mailto:info@mws.bio" className="text-text-primary hover:text-accent font-bold underline decoration-accent/30 underline-offset-4">info@mws.bio</a>
                  </p> */}
                </div>
              </div>
            </div>
          </div>

          {/* Reach Us Info (Right) */}
          <div className="flex flex-col items-start pt-4 lg:pt-12 contact-reveal w-full lg:w-auto">
            <p className="text-[1.2rem] md:text-[1.6rem] font-display font-medium text-text-primary mb-6">
              Reach us at
            </p>
            <div className="space-y-4">
              <a 
                href="mailto:info@mws.bio" 
                className="text-[1.8rem] sm:text-[2.2rem] md:text-[3.2rem] font-display font-medium text-accent hover:text-accent2 block break-all leading-none transition-colors"
              >
                info@mws.bio
              </a>
              <a 
                href="tel:+918971126869" 
                className="text-[1.8rem] sm:text-[2.2rem] md:text-[3.2rem] font-display font-medium text-text-primary block leading-none hover:text-accent transition-colors"
              >
                8971126869
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Orbs */}
      <div className="fixed top-[-5%] right-[-5%] w-[400px] h-[400px] bg-accent/5 blur-[100px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-5%] left-[-5%] w-[350px] h-[350px] bg-accent2/5 blur-[100px] rounded-full pointer-events-none z-0" />
    </div>
  )
}
