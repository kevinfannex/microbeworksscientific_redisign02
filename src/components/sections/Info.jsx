import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Info = () => {
    const sectionRef = useRef(null)
    const cardRef = useRef(null)
    const imgRef = useRef(null)
    const textRef = useRef(null)

    useEffect(() => {
        const section = sectionRef.current
        const card = cardRef.current
        const img = imgRef.current
        const textEl = textRef.current
        if (!section || !card || !img || !textEl) return

        // Set initial states
        gsap.set(card, {
            scale: 0.75,
            borderRadius: '30px',
        })
        
        gsap.set(img, {
            scale: 0.5,
            opacity: 0
        })

        const words = textEl.querySelectorAll('.info-word')
        gsap.set(words, { opacity: 0, y: 60, filter: 'blur(12px)' })

        // Sequence animation tied to scroll
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top 85%',    
                end: 'center center',          
                scrub: 1,
            },
        })

        // 1. Background (card) zooms up
        tl.to(card, {
            scale: 1,
            borderRadius: '20px',
            duration: 1.5,
            ease: 'power2.inOut',
        }, 0)

        // 2. Image zooms in and fades in (starts with a delay after card begins)
        tl.to(img, {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out',
        }, 0.6)

        // 3. Text animates with a staggered blur reveal (starts after image)
        tl.to(words, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            stagger: 0.08,
            ease: 'back.out(1.2)'
        }, 1.2)

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill())
        }
    }, [])

    const text = 'sustainable futures from microbe inspired solutions'
    const words = text.split(' ')

    return (
        <section
            ref={sectionRef}
            className="relative z-20 min-h-[60vh] md:min-h-screen w-full flex items-center justify-center overflow-hidden bg-transparent py-10 md:py-0"
        >
            <div
                ref={cardRef}
                className="bg-black flex items-center justify-center overflow-hidden w-[96%] h-[50vh] md:h-[96vh] mx-auto relative"
                style={{ borderRadius: '30px', transform: 'scale(0.75)' }}
            >
                {/* Background Image Layer */}
                <img 
                    ref={imgRef}
                    src="https://microbeworksscientific.com/static/media/image_1.f862905b7edbb95b1537.png" 
                    alt="Background blobs"
                    className="absolute inset-[5%] w-[90%] h-[90%] object-contain z-0 pointer-events-none"
                    style={{ transform: 'scale(0.5)', opacity: 0 }}
                />
                
                {/* Text Layer */}
                <p 
                    ref={textRef}
                    className="text-4xl md:text-6xl lg:text-7xl max-w-[1200px] mx-auto text-center text-white font-display font-bold leading-[1.1] px-8 md:px-12 tracking-tight z-10 relative"
                >
                    {words.map((word, i) => (
                        <span 
                            key={i} 
                            className="info-word inline-block mr-[0.3em]" 
                            style={{ transform: 'translateY(60px)', filter: 'blur(12px)', opacity: 0 }}
                        >
                            {word}
                        </span>
                    ))}
                </p>
            </div>
        </section>
    )
}

export default Info