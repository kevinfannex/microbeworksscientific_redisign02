import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useScrollReveal from '../../hooks/useScrollReveal'

const bulletPoints = [
  {
    title: 'Biodegradable and non-toxic',
    desc: 'Decomposes naturally without leaving harmful petrochemical residues or chemical trace.',
  },
  {
    title: 'Fast on yarns, fabrics and garments',
    desc: 'Demonstrates excellent color-fastness, durability, and resistance to washing and light.',
  },
  {
    title: 'Drop-in solution for industry',
    desc: 'Requires zero changes to existing textile manufacturing or dyeing infrastructure.',
  },
  {
    title: 'Makes several shades on fabrics',
    desc: 'Versatile formulation capable of producing a wide spectrum of blue hues and gradients.',
  },
  {
    title: 'Scalable through fermentation',
    desc: 'Harnesses high-yield precision bio-manufacturing to meet global industrial demands.',
  }
]

const slideshowImages = [
  '/Image 1.png',
  '/Image 2.jpeg',
  '/Image 3.png',
  '/Image 4.jpg'
]

export default function ProductsSection() {
  const sectionRef = useScrollReveal()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Automatic slideshow cycle
  useEffect(() => {
    if (isHovered) return // Pause auto-cycle when user is actively interacting/hovering
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slideshowImages.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [isHovered])

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative px-6 md:px-12 lg:px-24 py-24 md:py-32 bg-bg text-text-primary overflow-hidden border-b border-border-default/30"
    >
      {/* Premium background effects */}
      <div className="absolute top-1/3 -left-20 w-[400px] h-[400px] bg-accent/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-1/3 -right-20 w-[400px] h-[400px] bg-accent2/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Title & Interactive Bullet Points */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[0.8rem] md:text-[0.9rem] font-bold tracking-[0.2em] text-accent font-mono uppercase mb-4"
            >
              Flagship Innovation
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[2.2rem] md:text-[3.2rem] font-display font-medium tracking-tight mb-6 leading-tight text-accent2"
            >
              MicroBlue
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[1.1rem] md:text-[1.3rem] text-text-muted font-light leading-relaxed mb-10 max-w-[600px]"
            >
              For this we have developed <strong className="text-text-primary font-medium">MicroBlue</strong>, a powdered Blue Dye that is:
            </motion.p>

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
                    onMouseEnter={() => {
                      setIsHovered(true)
                      setActiveIndex(index % slideshowImages.length)
                    }}
                    onMouseLeave={() => {
                      setIsHovered(false)
                    }}
                    className="group relative flex items-start gap-4 p-5 rounded-2xl border border-border-default/40 bg-surface/30 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:border-accent/40 hover:bg-surface/60 shadow-sm hover:shadow-md"
                  >
                    {/* Glowing highlight indicator */}
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Interactive Bullet Point Icon */}
                    <div className="mt-1 flex-shrink-0">
                      <div className="relative w-6 h-6 flex items-center justify-center">
                        {/* Static dot */}
                        <span className="w-2.5 h-2.5 rounded-full bg-border-bright group-hover:bg-accent transition-colors duration-300" />
                        {/* Hover pulse circle */}
                        <span className="absolute inset-0 rounded-full border border-accent/0 scale-50 opacity-0 group-hover:border-accent/40 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h4 className="text-[1.05rem] md:text-[1.2rem] font-display font-medium text-text-primary group-hover:text-accent transition-colors duration-300">
                        {bp.title}
                      </h4>
                      <p className="text-[0.9rem] md:text-[0.95rem] text-text-muted font-light leading-relaxed mt-1 opacity-0 h-0 overflow-hidden group-hover:opacity-100 group-hover:h-auto transition-all duration-500 ease-in-out">
                        {bp.desc}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Right Column: Premium Auto-Cycling Slideshow */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full aspect-square max-w-[420px] lg:max-w-none rounded-[36px] md:rounded-[48px] overflow-hidden border border-border-default/80 shadow-2xl p-3 bg-surface/20 backdrop-blur-md"
            >
              {/* Outer soft ambient glow */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-accent/20 to-accent2/20 blur-xl opacity-40 rounded-[36px] md:rounded-[48px]" />

              <div className="relative w-full h-full rounded-[28px] md:rounded-[38px] overflow-hidden bg-black/40">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeIndex}
                    src={slideshowImages[activeIndex]}
                    alt={`MicroBlue showcase ${activeIndex + 1}`}
                    initial={{ opacity: 0, scale: 1.05, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95, x: -20 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>

              {/* Progress indicators/dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                {slideshowImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeIndex === i ? 'bg-accent w-4' : 'bg-white/40 hover:bg-white/60'
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
