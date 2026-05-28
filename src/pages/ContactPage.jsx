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

          <div className="flex flex-col items-center gap-8">
            <div className="w-full max-w-[520px] bg-bg2 dark:bg-surface p-6 rounded-[30px] md:rounded-[50px] border border-border-default shadow-xl">
              <p className="text-[1.2rem] md:text-[1.6rem] font-display font-medium text-text-primary mb-6 text-center contact-reveal">Have a question, comment, or request? We'd love to hear from you.</p>
            </div>

            <div className="w-full max-w-[520px] bg-bg2 dark:bg-surface p-6 rounded-[30px] md:rounded-[50px] border border-border-default shadow-xl">
              <p className="text-[1.2rem] md:text-[1.6rem] font-display font-medium text-text-primary mb-6">Reach us at</p>
              <div className="space-y-4 flex flex-col items-center">
                <a href="mailto:info@mws.bio" className="text-[1.8rem] sm:text-[2.2rem] md:text-[3.2rem] font-display font-medium text-accent2 block break-all leading-none">info@mws.bio</a>
                <a href="tel:+918971126869" className="text-[1.8rem] sm:text-[2.2rem] md:text-[3.2rem] font-display font-medium text-text-primary block leading-none">8971126869</a>
                <a href="https://www.linkedin.com/company/microbeworks-scientific/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[1.1rem] sm:text-[1.2rem] font-medium text-text-primary hover:text-accent transition-colors group !mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round" className="text-[#0a66c2] group-hover:text-accent transition-colors w-5 h-5 shrink-0">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  <span className="underline decoration-transparent group-hover:decoration-current transition-all">LinkedIn</span>
                </a>
              </div>
            </div>

            <div className="w-full max-w-[520px] bg-bg2 dark:bg-surface p-6 rounded-[30px] md:rounded-[50px] border border-border-default shadow-xl">
              <h4 className="font-mono text-[0.75rem] font-bold text-text-muted uppercase tracking-wider mb-2">Our Location</h4>
              <p className="text-[0.9rem] md:text-[1rem] text-text-primary leading-relaxed font-light">
                Centre for Cellular and Molecular Platforms (C-CAMP)<br />
                GKVK Post, Bellary Rd, Bengaluru, Karnataka 560065
              </p>
              <a href="https://www.google.com/maps/search/?api=1&query=Centre+for+Cellular+and+Molecular+Platforms+(C-CAMP)+GKVK+Post+Bellary+Rd+Bengaluru+Karnataka+560065" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-3 text-[0.85rem] font-mono text-accent hover:text-accent2 hover:underline transition-colors font-semibold">
                <span>View on Google Maps</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h6v6" />
                  <path d="M10 14 21 3" />
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                </svg>
              </a>
            </div>
          </div>
        </div>

      {/* Decorative Orbs */}
      <div className="fixed top-[-5%] right-[-5%] w-[400px] h-[400px] bg-accent/5 blur-[100px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-5%] left-[-5%] w-[350px] h-[350px] bg-accent2/5 blur-[100px] rounded-full pointer-events-none z-0" />
    </div>
  )
}
