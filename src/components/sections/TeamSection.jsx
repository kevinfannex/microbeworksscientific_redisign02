import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from '../SectionLabel'
import useScrollReveal from '../../hooks/useScrollReveal'
import { useTheme } from '../../context/ThemeContext'

// Import Team Images
import SuchithaImg from '../../assets/Suchitha_2.png'
import SakshiImg from '../../assets/Sakshi.jpeg'
import AnjanaImg from '../../assets/Anjana.png'
import SwethaImg from '../../assets/Swetha.jpeg'

gsap.registerPlugin(ScrollTrigger)

const team = [
  { name: 'Suchitha Raghunathan', role: 'Co-Founder & Chief Executive Officer', linkedin: 'http://www.linkedin.com/in/suchitha-raghunathan', image: SuchithaImg },
  { name: 'Sakshi Gore', role: 'Chief Commercial Officer', linkedin: 'https://www.linkedin.com/in/sakshi-gore-6903b399', image: SakshiImg },
  { name: 'Anjana Badrinarayanan', role: 'Co-Founder & Scientific Advisor', linkedin: 'https://www.linkedin.com/in/anjana-badrinarayanan-40b08264', image: AnjanaImg },
  { name: 'Swetha Sampathgiri', role: 'Scale-up Advisor', linkedin: 'https://www.linkedin.com/in/swethasg', image: SwethaImg, style: { objectPosition: 'top' } },
]

const supportedBy = [
  { id: 'social-alpha', text: <><span className="text-accent font-medium">Social Alpha</span> – Foundation for Innovation and Social Entrepreneurship</>, logo: 'https://ik.imagekit.io/g4lukt2ll/Microb_Redisign/social_alpha.jpeg' },
  { id: 'c-camp', text: <><span className="text-accent font-medium">C-CAMP</span> – Centre for Cellular and Molecular Platforms</>, logo: 'https://ik.imagekit.io/g4lukt2ll/Microb_Redisign/Untitled%20design.jpg' }
]

const awards = [
  { id: 'c-camp-dia', text: <><span className="text-accent font-medium">Cohort member of C-CAMP</span> – Discovery to Innovation Accelerator (DIA), as part of the Wadhwani Foundation backed by Wadhwani Innovation Network – Centre of Excellence programme.</>, logo: 'https://ik.imagekit.io/g4lukt2ll/Microb_Redisign/Screenshot%202026-05-05%20140142.png' },
  { id: 'elevate-2025', text: <><span className="text-accent font-medium">Winners of ELEVATE 2025</span>, Grant in aid scheme by Department of Electronics, Information Technology and Biotechnology, Government of Karnataka</>, logo: 'https://ik.imagekit.io/g4lukt2ll/Microb_Redisign/elevate_2025.png' },
  { id: 'mufg-social-alpha', text: <><span className="text-accent font-medium">Cohort member</span> of product development program by Mitsubishi UFJ Financial Group (MUFG) and Social Alpha Accelerator</>, logo: 'https://d3vrux30chabys.cloudfront.net/wp-content/uploads/2025/12/MUFG-Program-Banner-new.jpg' },
  { id: 'ind-aus', text: <>Winners: <span className="text-accent font-medium">Ind-Aus</span> Launchpad Program conducted by Bangalore Bioinnovation Centre, India and La Trobe University, Australia</>, logo: 'https://ik.imagekit.io/g4lukt2ll/Microb_Redisign/Screenshot_2026-04-19_002955-removebg-preview.png' },
  { id: 'techtonic', text: <><span className="text-accent font-medium">Techtonic</span>–Innovations for Circular Economy, supported by H&M Foundation, powered by Social Alpha</>, logo: 'https://ik.imagekit.io/g4lukt2ll/Microb_Redisign/image.png?updatedAt=1776596079840' },
  { id: 'startup-india', text: <><span className="text-accent font-medium">Startup India Seed Fund</span>, Government of India</>, logo: 'https://ik.imagekit.io/g4lukt2ll/Microb_Redisign/startup%20ind%20sppedfund.jpeg' },
]

export default function TeamSection() {
  const sectionRef = useScrollReveal()
  const containerRef = useRef(null)
  const { isDark } = useTheme()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax for cards
      gsap.fromTo(".team-card-parallax",
        { y: 50 },
        {
          y: -50,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        }
      )

      // Background decorative parallax
      gsap.to(".bg-parallax-1", {
        yPercent: -20,
        xPercent: 10,
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: 2
        }
      })

      gsap.to(".bg-parallax-2", {
        yPercent: 20,
        xPercent: -5,
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: 1.5
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [sectionRef])

  // Re-apply scroll reveal visibility after theme toggle re-render
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    // Small delay to let React finish DOM updates
    requestAnimationFrame(() => {
      const revealEls = section.querySelectorAll('.reveal')
      revealEls.forEach(el => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('visible')
        }
      })
    })
  }, [isDark])

  return (
    <section id="team" ref={sectionRef} className="relative px-4 md:px-8 lg:px-12 py-24 md:pt-12 md:pb-32 lg:pt-16 lg:pb-40 bg-bg overflow-hidden">
      {/* Decorative Parallax Background Elements */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none bg-parallax-1" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-accent2/5 rounded-full blur-[80px] pointer-events-none bg-parallax-2" />

      <div className="max-w-[1200px] mx-auto relative z-10" ref={containerRef}>
        <SectionLabel className="reveal">The Team</SectionLabel>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10 md:mt-16">
          {team.map((m, i) => (
            <div key={m.name} className={`reveal reveal-delay-${i} team-card-parallax flex flex-col items-center text-center group`}>
              {/* Image Circle Placeholder */}
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden mb-6 border-4 border-accent/20 transition-transform duration-500 group-hover:scale-105 bg-accent/5 flex items-center justify-center">
                {m.image ? (
                  <img src={m.image} alt={m.name} className="w-full h-full object-cover" style={m.style} />
                ) : (
                  <span className="text-accent/40 font-mono text-sm uppercase tracking-widest">Image</span>
                )}
              </div>

              {/* Name & LinkedIn Icon */}
              <div className="flex items-center justify-center gap-2 mb-2">
                <h3 className="text-xl md:text-2xl font-bold text-text-primary hover:text-accent transition-colors duration-300 cursor-pointer">
                  {m.name}
                </h3>
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0a66c2] hover:text-accent transition-colors duration-300 mb-0.5"
                  aria-label={`${m.name} LinkedIn`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>

              {/* Role */}
              <div className="text-sm md:text-base text-text-primary/80 font-medium">
                {m.role}
              </div>
            </div>
          ))}
        </div>

        {/* Supported By */}
        {/* <div className="mt-20 md:mt-24 max-w-4xl">
          <div className="flex items-center gap-4 mb-10">
            <h3 className="font-mono text-[0.85rem] font-bold text-text-primary tracking-[0.15em] uppercase whitespace-nowrap">SUPPORTED BY</h3>
            <div className="h-[1px] w-full bg-border-default"></div>
          </div>

          <div className="flex flex-col gap-10 md:gap-14 pl-0">
            {supportedBy.map((org) => (
              <div key={org.id} className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12">
                <div className="w-[180px] md:w-[220px] shrink-0">
                  <img src={org.logo} alt={org.id} className="w-full h-auto object-contain opacity-90" />
                </div>
                <div className="text-[1rem] md:text-[1.1rem] text-text-primary font-light">
                  {org.text}
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Awards */}
        {/* <div className="mt-20 md:mt-24 max-w-4xl">
          <div className="flex items-center gap-4 mb-10">
            <h3 className="font-mono text-[0.85rem] font-bold text-text-primary tracking-[0.15em] uppercase whitespace-nowrap">AWARDS</h3>
            <div className="h-[1px] w-full bg-border-default"></div>
          </div>

          <div className="flex flex-col gap-10 md:gap-14 pl-0">
            {awards.map((award) => (
              <div key={award.id} className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12">
                <div className="w-[180px] md:w-[220px] shrink-0">
                  <img src={award.logo} alt={award.id} className="w-full h-auto object-contain opacity-90" />
                </div>
                <div className="text-[1rem] md:text-[1.1rem] text-text-primary font-light">
                  {award.text}
                </div>
              </div>
            ))}
          </div>
        </div> */}

      </div>
    </section>
  )
}
