import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const TooltipContent = ({ label, onClose }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-start">
      {/* <p className="text-[0.6rem] font-mono uppercase tracking-widest text-text-muted">specifications</p> */}
      {/* <button 
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="text-text-dim hover:text-text-primary transition-colors"
      >
        <X size={14} />
      </button> */}
    </div>

    <h3 className="text-lg md:text-xl font-display font-bold text-text-primary leading-tight transition-colors duration-500">{label.content.text}</h3>

    {label.content.image && (
      <div className="rounded-lg overflow-hidden aspect-video bg-bg3 border border-border-default transition-colors duration-500">
        <img
          src={label.content.image}
          alt={label.text}
          className="w-full h-full object-cover transition-all duration-500"
        />
      </div>
    )}
  </div>
)

export default function ShowcaseImage() {
  const containerRef = useRef(null)
  const labelsRef = useRef([])
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Fade in labels
      gsap.fromTo(labelsRef.current,
        {
          opacity: 0,
          y: 20,
          filter: 'blur(10px)'
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
          }
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const labels = [
    {
      id: "fast",
      text: "Fast on fabric",
      pos: "top-[14%] left-[6%] md:top-[20%] md:left-[15%]",
      align: "left",
      side: "bottom",
      content: {
        text: "≥3.5/5",
        image: "https://ik.imagekit.io/g4lukt2ll/Microb_Redisign/MicroBlue_Shades.jpg?updatedAt=1778580785698"
      }
    },
    {
      id: "bio",
      text: "Biodegradable",
      pos: "top-[14%] right-[6%] md:top-[25%] md:right-[12%]",
      align: "right",
      side: "bottom",
      content: { text: "90% in 28 days in domestic sewage", image: "" }
    },
    {
      id: "versatile",
      text: "Versatile",
      pos: "top-[24%] left-1/2 -translate-x-1/2 md:top-[50%] md:right-[8%] md:translate-x-0",
      align: "center",
      side: "bottom",
      content: {
        text: "dyes yarns, fabrics and garments",
        image: "https://ik.imagekit.io/g4lukt2ll/Microb_Redisign/Product%20Shot.jpeg?updatedAt=1778581991677"
      }
    },
    {
      id: "toxic",
      text: "Non toxic",
      pos: "bottom-[18%] left-[10%] md:bottom-[30%] md:left-[10%]",
      align: "left",
      side: "top",
      content: { text: "Safe in aquatic systems", image: "" }
    },
    {
      id: "drop",
      text: "Drop in solution",
      pos: "bottom-[18%] right-[10%] md:bottom-[20%] md:right-[15%]",
      align: "right",
      side: "top",
      content: { text: "works in existing dyeing infrastructure", image: "" }
    }
  ]

  // return (
  //   <section id="products" ref={containerRef} className="h-[85vh] md:h-[80vh] w-full bg-bg flex items-center justify-center overflow-hidden relative transition-colors duration-500">
  //     <div className="max-w-[1400px] w-full h-full p-4 md:p-16 flex items-center justify-center relative">        {/* Floating Labels and In-line Tooltips */}
  //       {labels.map((label, index) => (
  //         <div
  //           key={label.id}
  //           ref={el => labelsRef.current[index] = el}
  //           className={`absolute z-30 ${label.pos} flex flex-col items-center md:items-${label.align === 'right' ? 'end' : 'start'}`}
  //           onMouseEnter={() => setActiveId(label.id)}
  //           onMouseLeave={() => setActiveId(null)}
  //         >
  //           {/* The Label Button */}
  //           <div className="group cursor-pointer transition-all duration-300 relative">
  //             <div className={`flex flex-col items-center md:items-${label.align === 'right' ? 'end' : 'start'}`}>
  //               <span className={`text-[0.7rem] md:text-xs font-mono font-bold tracking-[0.3em] uppercase pb-1 border-b transition-colors duration-300 text-center md:text-left ${activeId === label.id ? 'text-accent border-accent' : 'text-text-dim border-border-default group-hover:text-text-primary group-hover:border-text-muted'}`}>
  //                 {label.text}
  //               </span>
  //               <div className={`mt-2 w-2 h-2 rounded-full transition-all duration-300 ${activeId === label.id ? 'bg-accent shadow-[0_0_15px_rgba(var(--accent-rgb),0.5)]' : 'bg-border-default group-hover:bg-text-muted'}`} />
  //             </div>

  //             {/* Tooltip Above */}
  //             <AnimatePresence>
  //               {activeId === label.id && label.side === 'top' && (
  //                 <motion.div
  //                   initial={{ opacity: 0, y: -10, scale: 0.95 }}
  //                   animate={{ opacity: 1, y: 0, scale: 1 }}
  //                   exit={{ opacity: 0, y: -10, scale: 0.95 }}
  //                   className={`absolute bottom-full mb-6 bg-surface shadow-[0_-15px_40px_rgba(0,0,0,0.12)] border border-border-default p-4 rounded-xl w-[250px] md:w-[320px] pointer-events-auto origin-bottom text-center md:text-${label.align === 'right' ? 'right' : 'left'} transition-colors duration-500 ${label.align === 'center' ? 'left-1/2 -translate-x-1/2' : label.align === 'right' ? 'right-0' : 'left-0'}`}
  //                 >
  //                   <TooltipContent label={label} onClose={() => setActiveId(null)} />
  //                 </motion.div>
  //               )}
  //             </AnimatePresence>

  //             {/* Tooltip Below */}
  //             <AnimatePresence>
  //               {activeId === label.id && label.side !== 'top' && (
  //                 <motion.div
  //                   initial={{ opacity: 0, y: 10, scale: 0.95 }}
  //                   animate={{ opacity: 1, y: 0, scale: 1 }}
  //                   exit={{ opacity: 0, y: 10, scale: 0.95 }}
  //                   className={`absolute top-full mt-6 bg-surface shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-border-default p-4 rounded-xl w-[250px] md:w-[320px] pointer-events-auto origin-top text-center md:text-${label.align === 'right' ? 'right' : 'left'} transition-colors duration-500 ${label.align === 'center' ? 'left-1/2 -translate-x-1/2' : label.align === 'right' ? 'right-0' : 'left-0'}`}
  //                 >
  //                   <TooltipContent label={label} onClose={() => setActiveId(null)} />
  //                 </motion.div>
  //               )}
  //             </AnimatePresence>
  //           </div>
  //         </div>
  //       ))}

  //       {/* Backdrop for closing (optional for hover, but kept for mobile touch fallback) */}
  //       {activeId && (
  //         <div
  //           onClick={() => setActiveId(null)}
  //           className="absolute inset-0 z-20 cursor-zoom-out md:hidden"
  //         />
  //       )}

  //       {/* Main Image */}
  //       <img
  //         src="https://ik.imagekit.io/g4lukt2ll/Microb_Redisign/Screenshot%202026-05-12%20121747.png?updatedAt=1778569588405"
  //         alt="Microbeworks Showcase"
  //         className="max-w-[85%] max-h-[85%] object-contain relative z-10 transition-all duration-500 dark:brightness-90 dark:contrast-110 rounded-2xl"
  //       />
  //     </div>
  //   </section>
  // )
}
