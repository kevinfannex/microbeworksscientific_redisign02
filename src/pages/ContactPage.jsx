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
      className="h-screen px-4 md:px-8 lg:px-24 bg-bg flex flex-col items-center justify-center transition-colors duration-500"
    >
      <div className="w-full max-w-[580px]">
        {/* Title - outside the card, left-aligned */}
        <h1 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.2rem] text-center font-display font-medium tracking-tight mb-6 md:mb-8 contact-reveal text-accent">
          Contact
        </h1>

        {/* Single unified card */}
        <div className="w-full bg-bg2 dark:bg-surface p-8 md:p-10 rounded-[20px] md:rounded-[30px] border border-border-default shadow-xl contact-reveal">
          {/* Intro text */}
          <p className="text-[1rem] md:text-[1.15rem] font-display font-medium text-text-primary mb-8 leading-relaxed">
            Have a question, comment, or request?<br />
            We'd love to hear from you.
          </p>

          {/* Contact details */}
          <div className="mb-8">
            <h4 className="font-mono text-[0.7rem] font-bold text-text-muted uppercase tracking-wider mb-4">Reach us at</h4>
            <div className="space-y-3">
              <a href="mailto:info@mws.bio" className="flex items-center gap-3 text-[1rem] md:text-[1.15rem] font-display font-medium text-accent2 hover:text-accent transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                info@mws.bio
              </a>
              <a href="tel:+918971126869" className="flex items-center gap-3 text-[1rem] md:text-[1.15rem] font-display font-medium text-text-primary hover:text-accent transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                8971126869
              </a>
              <a href="https://www.linkedin.com/company/microbeworks-scientific/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[1rem] md:text-[1.15rem] font-medium text-text-primary hover:text-accent transition-colors group">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-[#0a66c2] group-hover:text-accent transition-colors shrink-0">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-mono text-[0.7rem] font-bold text-text-muted uppercase tracking-wider mb-2">Our Location</h4>
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
