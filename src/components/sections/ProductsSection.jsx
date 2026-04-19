import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useScrollReveal from '../../hooks/useScrollReveal'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="w-12 h-12 text-accent">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    title: 'IP PROTECTED',
    desc: 'Novel powder formulation,\nshelf stable for 1 year'
  },
  {
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="w-12 h-12 text-accent">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3" />
      </svg>
    ),
    title: 'DROP-IN',
    desc: 'Directly compatible with\nexisting dyeing infrastructure.'
  },
  {
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="w-12 h-12 text-accent">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'BIODEGRADABLE',
    desc: '90% in domestic sewage\nconditions in 28 days'
  },
  {
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="w-12 h-12 text-accent">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
      </svg>
    ),
    title: 'SCALABLE',
    desc: 'Proven in bio-\nmanufacturing'
  },
  {
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="w-12 h-12 text-accent">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    title: 'ECOLOGICAL SAFETY',
    desc: 'ZDHC MRSL level 1 certified\nGOTS 7.1 compliant'
  },
  {
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="w-12 h-12 text-accent">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
      </svg>
    ),
    title: 'WORKS ON FABRIC',
    desc: 'Fastness ~4/5'
  }
]

export default function ProductsSection() {
  const sectionRef = useScrollReveal()

  useEffect(() => {
    // Parallax for Powder Image
    gsap.fromTo('.powder-img', 
      { y: 50, rotation: -10 },
      {
        y: -50,
        rotation: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: '.powder-container',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      }
    )

    // Parallax for Fabric Image
    gsap.fromTo('.fabric-img',
      { yPercent: -15 },
      {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: '.fabric-container',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative px-4 md:px-8 lg:px-12 py-24 md:pt-16 md:pb-32 bg-white text-text-primary min-h-screen"
    >
      <div className="max-w-[1000px] mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <div className="text-[0.9rem] md:text-[1.1rem] tracking-[0.2em] text-accent mb-6 font-mono uppercase">
            INTRODUCING
          </div>
          
          <img 
            src="https://ik.imagekit.io/g4lukt2ll/Microb_Redisign/Screenshot%202026-04-19%20164655.png?updatedAt=1776597705652" 
            alt="MicroBlue Logo" 
            className="h-20 md:h-28 w-auto object-contain mb-8 mx-auto rounded-xl"
          />
          
          <p className="text-[1.05rem] md:text-[1.15rem] text-text-muted font-light leading-relaxed max-w-[760px] mx-auto text-center">
            MicroBlue is our flagship innovation: a biodegradable, IP-protected microbial blue dye that serves as a seamless drop-in replacement for conventional textile dyeing systems.
          </p>
        </div>

        {/* Powder Image */}
        <div className="powder-container w-full bg-[#f3f4f6] rounded-[24px] md:rounded-[40px] p-8 md:p-16 mb-20 reveal reveal-delay-1 flex justify-center items-center shadow-inner overflow-hidden">
            <img 
              src="https://microbeworksscientific.com/static/media/image_1.f862905b7edbb95b1537.png" 
              alt="MicroBlue powder" 
              className="powder-img w-64 h-64 md:w-[420px] md:h-[420px] object-cover rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-white"
            />
        </div>

        {/* 6 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-16 w-full mb-24 max-w-[900px] mx-auto">
          {features.map((f, i) => (
            <div key={f.title} className="flex gap-6 items-start reveal" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="shrink-0">{f.icon}</div>
              <div>
                <div className="text-accent font-mono font-bold tracking-[0.1em] text-[0.85rem] md:text-[0.95rem] mb-2">{f.title}</div>
                <div className="text-text-muted font-light text-[0.9rem] md:text-[1rem] leading-[1.6] whitespace-pre-line">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Fabric Image */}
        <div className="fabric-container w-full rounded-[24px] md:rounded-[30px] overflow-hidden mb-24 reveal h-[300px] md:h-[500px]">
          <img 
            src="https://microbeworksscientific.com/static/media/image_3.67cf055e17595920fc5d.png"
            alt="Fabrics dyed with MicroBlue"
            className="fabric-img w-full h-full object-cover scale-[1.3] origin-center"
          />
        </div>

        {/* Impact Table */}
        <div className="w-full reveal max-w-[900px] mx-auto">
          <h3 className="text-xl md:text-2xl font-bold tracking-widest mb-8 uppercase font-display text-text-primary">POTENTIAL IMPACT</h3>
          
          <div className="border border-border-default rounded-[20px] overflow-hidden bg-white shadow-sm">
            {/* Header */}
            <div className="grid grid-cols-[1.8fr_1fr_1fr_1.2fr] md:grid-cols-[1.2fr_1fr_1fr_1fr] items-center p-4 md:p-8 border-b border-border-default">
              <div className="text-accent font-mono tracking-widest text-[0.6rem] md:text-[0.9rem] uppercase">PARAMETER</div>
              <div className="flex justify-center">
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="w-7 h-7 md:w-12 md:h-12 text-accent"><path d="M12 22C12 22 12 17 12 12M12 12C12 12 16 12 19 9C22 6 21 2 21 2C21 2 17 1 14 4C11 7 12 12 12 12ZM12 12C12 12 8 12 5 9C2 6 3 2 3 2C3 2 7 1 10 4C13 7 12 12 12 12Z" /></svg>
              </div>
              <div className="flex justify-center">
                <img 
                  src="https://ik.imagekit.io/g4lukt2ll/Microb_Redisign/Screenshot%202026-04-19%20164655.png?updatedAt=1776597705652" 
                  alt="MicroBlue Logo" 
                  className="h-6 md:h-10 w-auto object-contain rounded-xl"
                />
              </div>
              <div className="text-accent font-mono tracking-widest text-[0.6rem] md:text-[0.9rem] text-right uppercase">REDUCTION</div>
            </div>
            
            {/* Row 1 */}
            <div className="grid grid-cols-[1.8fr_1fr_1fr_1.2fr] md:grid-cols-[1.2fr_1fr_1fr_1fr] items-center p-4 md:p-8 border-b border-border-default hover:bg-bg transition-colors">
              <div className="flex items-center gap-2 md:gap-4">
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="w-6 h-6 md:w-10 md:h-10 text-accent shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="text-text-primary text-[0.65rem] md:text-[1rem] font-light leading-snug">Growth<br/>time (days)</span>
              </div>
              <div className="text-center font-bold text-lg md:text-3xl text-text-primary">274</div>
              <div className="text-center font-bold text-lg md:text-3xl text-text-primary">5</div>
              <div className="text-right font-bold text-base md:text-3xl flex items-center justify-end gap-1 text-[#0a8a50]">
                98.2% <svg fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" className="w-3 h-3 md:w-5 md:h-5 text-[#0a8a50]"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" /></svg>
              </div>
            </div>
 
            {/* Row 2 */}
            <div className="grid grid-cols-[1.8fr_1fr_1fr_1.2fr] md:grid-cols-[1.2fr_1fr_1fr_1fr] items-center p-4 md:p-8 hover:bg-bg transition-colors">
              <div className="flex items-center gap-2 md:gap-4">
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="w-6 h-6 md:w-10 md:h-10 text-accent shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" /></svg>
                <span className="text-text-primary text-[0.65rem] md:text-[1rem] font-light leading-snug">Water per KG<br/>(litres)</span>
              </div>
              <div className="text-center font-bold text-lg md:text-3xl text-text-primary">100,000</div>
              <div className="text-center font-bold text-lg md:text-3xl text-text-primary">5</div>
              <div className="text-right font-bold text-base md:text-3xl flex items-center justify-end gap-1 text-[#0a8a50]">
                99.95% <svg fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" className="w-3 h-3 md:w-5 md:h-5 text-[#0a8a50]"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" /></svg>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
