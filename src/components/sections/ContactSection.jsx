import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function ContactSection() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-reveal', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%'
        }
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="contact"
      ref={containerRef}
      className="pt-8 md:pt-12 pb-16 md:pb-24 px-4 md:px-8 bg-bg flex flex-col items-center justify-start transition-colors duration-500 relative overflow-hidden"
    >
      <div className="w-full max-w-[640px] relative z-10">
        {/* Title */}
        <h2 className="text-[2.5rem] md:text-[3.5rem] font-display font-medium tracking-tight mb-6 text-accent contact-reveal text-center">
          Contact
        </h2>

        {/* Single Unified Card */}
        <div className="w-full bg-[#181818] border border-white/5 rounded-2xl p-6 md:p-8 text-left shadow-2xl contact-reveal transition-colors duration-500 light-card-override">
          {/* Tagline */}
          <p className="text-white text-[1.1rem] md:text-[1.3rem] font-medium leading-relaxed mb-8 card-text-override">
            Have a question, comment, or request?<br />
            We'd love to hear from you.
          </p>

          {/* Contact Details */}
          <div className="space-y-5 mb-8">
            <p className="text-white/60 text-[14px] font-semibold tracking-wide uppercase card-label-override">
              Reach us at
            </p>
            
            {/* Email */}
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-accent shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5A2.25 2.25 0 012.25 17.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <a href="mailto:info@mws.bio" className="text-[1.125rem] md:text-[1.35rem] font-semibold text-accent1 hover:underline leading-none">
                info@mws.bio
              </a>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-accent shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.806-5.122-4.104-6.928-6.928l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              <a href="tel:+918971126869" className="text-[1.125rem] md:text-[1.35rem] font-semibold text-white hover:underline leading-none card-link-override">
                +91 8971126869
              </a>
            </div>

            {/* LinkedIn */}
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-accent shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <a href="https://www.linkedin.com/company/microbeworks-scientific/" target="_blank" rel="noopener noreferrer" className="text-[1.125rem] md:text-[1.35rem] font-semibold text-white hover:underline leading-none card-link-override">
                LinkedIn
              </a>
            </div>
          </div>

          {/* Location details */}
          <div className="border-t border-white/10 pt-6 card-border-override">
            <h4 className="font-mono text-[0.7rem] font-bold text-white/50 uppercase tracking-widest mb-2 card-sublabel-override">
              OUR LOCATION
            </h4>
            <p className="text-[0.95rem] md:text-[1rem] text-white/80 leading-relaxed font-light mb-4 card-location-override">
              Centre for Cellular and Molecular Platforms (C-CAMP)<br />
              GKVK Post, Bellary Rd, Bengaluru, Karnataka 560065
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Centre+for+Cellular+and+Molecular+Platforms+(C-CAMP)+GKVK+Post+Bellary+Rd+Bengaluru+Karnataka+560065"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-accent hover:text-accent2 hover:underline transition-colors font-semibold text-[0.95rem]"
            >
              <span>View on Google Maps</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h6v6" />
                <path d="M10 14 21 3" />
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}


