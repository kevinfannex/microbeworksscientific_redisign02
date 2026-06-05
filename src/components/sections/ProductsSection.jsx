import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useScrollReveal from '../../hooks/useScrollReveal'

const bulletPoints = [
  {
    title: 'Biodegradable and non-toxic'
  },
  {
    title: 'Fast on yarns, fabrics and garments'
  },
  {
    title: 'Drop-in solution for industry'
  },
  {
    title: 'Makes several shades on fabrics'
  },
  {
    title: 'Scalable through fermentation'
  }
]

const slideshowImages = [
  '/Image 1.png',
  '/Image 2.jpeg',
  '/Image 3.png',
  '/Image 4.png'
]

export default function ProductsSection() {
  const sectionRef = useScrollReveal()
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Automatic slideshow cycle
  useEffect(() => {
    if (isHovered) return // Pause auto-cycle when user is actively interacting/hovering
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % slideshowImages.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [isHovered])

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative px-6 md:px-12 lg:px-24 pb-10 md:pb-32 pt-4 md:pt-[60px] bg-black lg:bg-bg text-white lg:text-text-primary overflow-hidden border-b border-white/10 lg:border-border-default/30"
    >
      {/* Premium background effects */}
      <div className="absolute top-1/3 -left-20 w-[400px] h-[400px] bg-accent/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-1/3 -right-20 w-[400px] h-[400px] bg-accent2/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Intro text on top */}
        <div className="mb-10 max-w-[600px] ">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[1.1rem] md:text-[1.3rem] text-white/70 lg:text-text-muted font-light leading-relaxed "
          >
            We have developed <strong className="text-white lg:text-text-primary font-medium hover:text-accent">MicroBlue</strong>, a powdered Blue Dye that is :
          </motion.p>
        </div>

        {/* Grid matching the height of bullet points and image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">

          {/* Left Column: Interactive Bullet Points */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Bullet Points Stack */}
            <div className="space-y-4 w-full">
              {bulletPoints.map((bp, index) => {
                return (
                  <motion.div
                    key={bp.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`group relative flex items-start gap-4 p-5 rounded-2xl border backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-md border-white/10 lg:border-border-default/40 bg-white/5 lg:bg-surface/30 hover:border-accent/40 hover:bg-white/10 lg:hover:bg-surface/60`}
                  >
                    {/* Glowing highlight indicator */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent rounded-2xl transition-opacity duration-300 pointer-events-none opacity-0 group-hover:opacity-100`}
                    />

                    {/* Interactive Bullet Point Icon */}
                    <div className="mt-1 flex-shrink-0">
                      <div className="relative w-6 h-6 flex items-center justify-center">
                        {/* Static dot */}
                        <span
                          className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 bg-white/60 lg:bg-border-bright group-hover:bg-accent`}
                        />
                        {/* Hover pulse circle */}
                        <span
                          className={`absolute inset-0 rounded-full border transition-all duration-300 border-accent/0 scale-50 opacity-0 group-hover:border-accent/40 group-hover:scale-100 group-hover:opacity-100`}
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h4
                        className={`text-[1.05rem] md:text-[1.2rem] font-display font-medium transition-colors duration-300 text-white lg:text-text-primary group-hover:text-accent`}
                      >
                        {bp.title}
                      </h4>
                      <p className="text-[0.9rem] md:text-[0.95rem] text-white/50 lg:text-text-muted font-light leading-relaxed mt-1 opacity-0 h-0 overflow-hidden group-hover:opacity-100 group-hover:h-auto transition-all duration-500 ease-in-out">
                        {bp.desc}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Right Column: Premium Auto-Cycling Slideshow */}
          <div className="lg:col-span-7 flex items-stretch">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-full aspect-[4/3] md:aspect-auto min-h-[300px] md:min-h-[420px] rounded-[36px] md:rounded-[48px] overflow-hidden border border-white/10 lg:border-border-default/80 shadow-2xl p-3 bg-white/5 lg:bg-surface/20 backdrop-blur-md flex flex-col"
            >
              {/* Outer soft ambient glow */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-accent/20 to-accent2/20 blur-xl opacity-40 rounded-[36px] md:rounded-[48px]" />

              <div className="relative w-full h-full rounded-[28px] md:rounded-[38px] overflow-hidden bg-black/40 flex-1">
                <AnimatePresence>
                  <motion.img
                    key={activeImageIndex}
                    src={slideshowImages[activeImageIndex]}
                    alt={`MicroBlue showcase ${activeImageIndex + 1}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>

              {/* Progress indicators/dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                {slideshowImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${activeImageIndex === i ? 'bg-accent w-4' : 'bg-white/40 hover:bg-white/60'
                      }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
