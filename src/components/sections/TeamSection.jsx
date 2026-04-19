import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from '../SectionLabel'
import useScrollReveal from '../../hooks/useScrollReveal'

gsap.registerPlugin(ScrollTrigger)

const team = [
  { initials: 'SR', name: 'Ms. Suchitha Raghunathan', role: 'CEO and co-founder', bio: 'MSc Life Sciences', cred: '7+ years at NCBS-TIFR', gradient: 'from-accent to-accent3', linkedin: 'https://www.linkedin.com/in/suchitha-raghunathan/', image: 'https://media.licdn.com/dms/image/v2/D5603AQG0RYXJis-QRw/profile-displayphoto-scale_400_400/B56ZuiY2l2GwAg-/0/1767955983586?e=1778112000&v=beta&t=NwRdjcHJ8YQnqdkQ3lpMcn8YeruBRdHCab6NgVU45tY' },
  { initials: 'AB', name: 'Dr. Anjana Badrinarayanan', role: 'Scientific advisor and co-founder', bio: 'Associate Professor, NCBS-TIFR', cred: 'Post-doc MIT | PhD University of Oxford', gradient: 'from-accent2 to-[#0a8a50]', linkedin: 'https://www.linkedin.com/in/anjana-badrinarayanan-40b08264/', image: 'https://media.licdn.com/dms/image/v2/D5603AQHSO_tQ0RjqRQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1629460897868?e=1778112000&v=beta&t=4W1iOGpo1F5hJ1are4buN0mndQHbUUhdNJKQIYbiyCk' },
]

const supportedBy = [
  { id: 'social-alpha', text: <><span className="text-accent font-medium">Social Alpha</span> – Foundation for Innovation and Social Entrepreneurship</>, logo: 'https://ik.imagekit.io/g4lukt2ll/Microb_Redisign/social_alpha.jpeg' },
  { id: 'c-camp', text: <><span className="text-accent font-medium">C-CAMP</span> – Centre for Cellular and Molecular Platforms</>, logo: 'https://ik.imagekit.io/g4lukt2ll/Microb_Redisign/c-camp.png' }
]

const awards = [
  { id: 'c-camp-dia', text: <><span className="text-accent font-medium">Cohort member of C-CAMP</span> – Discovery to Innovation Accelerator (DIA), as part of the Wadhwani Foundation backed by Wadhwani Innovation Network – Centre of Excellence programme.</>, logo: 'https://ik.imagekit.io/g4lukt2ll/Microb_Redisign/image.png?updatedAt=1776541987355  ' },
  { id: 'elevate-2025', text: <><span className="text-accent font-medium">Winners of ELEVATE 2025</span>, Grant in aid scheme by Department of Electronics, Information Technology and Biotechnology, Government of Karnataka</>, logo: 'https://ik.imagekit.io/g4lukt2ll/Microb_Redisign/elevate_2025.png' },
  { id: 'mufg-social-alpha', text: <><span className="text-accent font-medium">Cohort member</span> of product development program by Mitsubishi UFJ Financial Group (MUFG) and Social Alpha Accelerator</>, logo: 'https://d3vrux30chabys.cloudfront.net/wp-content/uploads/2025/12/MUFG-Program-Banner-new.jpg' },
  { id: 'ind-aus', text: <>Winners: <span className="text-accent font-medium">Ind-Aus</span> Launchpad Program conducted by Bangalore Bioinnovation Centre, India and La Trobe University, Australia</>, logo: 'https://ik.imagekit.io/g4lukt2ll/Microb_Redisign/Screenshot_2026-04-19_002955-removebg-preview.png?updatedAt=1776540867748' },
  { id: 'techtonic', text: <><span className="text-accent font-medium">Techtonic</span>–Innovations for Circular Economy, supported by H&M Foundation, powered by Social Alpha</>, logo: 'https://ik.imagekit.io/g4lukt2ll/Microb_Redisign/image.png?updatedAt=1776596079840' },
  { id: 'startup-india', text: <><span className="text-accent font-medium">Startup India Seed Fund</span>, Government of India</>, logo: 'https://ik.imagekit.io/g4lukt2ll/Microb_Redisign/startup%20ind%20sppedfund.jpeg' },
]

export default function TeamSection() {
  const sectionRef = useScrollReveal()
  const containerRef = useRef(null)

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

  return (
    <section id="team" ref={sectionRef} className="relative px-4 md:px-8 lg:px-12 py-24 md:pt-12 md:pb-32 lg:pt-16 lg:pb-40 bg-bg overflow-hidden">
      {/* Decorative Parallax Background Elements */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none bg-parallax-1" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-accent2/5 rounded-full blur-[80px] pointer-events-none bg-parallax-2" />

      <div className="max-w-[1200px] mx-auto relative z-10" ref={containerRef}>
        <SectionLabel className="reveal">The Team</SectionLabel>
        <h2 className="reveal reveal-delay-1 font-display text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.1] text-text-primary tracking-tight">
          Built by scientists.<br /><em className="italic text-accent">Led by vision.</em>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 mt-12 md:mt-20 max-w-4xl">
          {team.map((m, i) => (
            <div key={m.initials} className={`reveal reveal-delay-${i} team-card-parallax team-card-bar relative overflow-hidden border border-border-default bg-white/80 shadow-[0_2px_16px_rgba(0,0,0,0.06)] backdrop-blur-[10px] px-4 py-6 md:px-6 md:py-8 transition-all duration-300 hover:border-border-bright hover:-translate-y-1 hover:shadow-[0_4px_32px_rgba(0,255,136,0.18)]`}>
              {m.image ? (
                <img src={m.image} alt={m.name} className="w-24 h-24 rounded-full object-cover mb-5 border border-border-default shadow-sm" />
              ) : (
                <div className={`w-13 h-13 rounded-full bg-gradient-to-br ${m.gradient} flex items-center justify-center font-mono text-[0.85rem] font-bold text-white mb-5`}>
                  {m.initials}
                </div>
              )}
              <div className="text-[0.95rem] font-semibold text-text-primary mb-1">
                <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors inline-flex items-center gap-1.5 group" aria-label={`${m.name} LinkedIn`}>
                  {m.name}
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0a66c2] opacity-80 group-hover:opacity-100 transition-opacity">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
              <div className="text-[0.78rem] text-accent font-mono tracking-[0.05em] mb-3">{m.role}</div>
              <div className="text-[0.8rem] text-text-muted leading-relaxed font-light">{m.bio}</div>
              <div className="mt-4 pt-4 border-t border-border-default font-mono text-[0.65rem] text-text-primary tracking-[0.08em]">{m.cred}</div>
            </div>
          ))}
        </div>

        {/* Supported By */}
        <div className="reveal mt-20 md:mt-24 max-w-4xl">
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
        </div>

        {/* Awards */}
        <div className="reveal mt-20 md:mt-24 max-w-4xl">
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
        </div>

      </div>
    </section>
  )
}
