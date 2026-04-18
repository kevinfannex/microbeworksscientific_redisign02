import SectionLabel from '../SectionLabel'
import useScrollReveal from '../../hooks/useScrollReveal'

const cards = [
  {
    num: '01',
    icon: '🧬',
    title: 'Microbe Engineering',
    desc: 'We reprogram Bacillus and Pseudomonas strains using precision CRISPR tools to express target chromogenic pathways.',
  },
  {
    num: '02',
    icon: '⚗️',
    title: 'Pigment Biosynthesis',
    desc: 'Fed simple sugars, engineered microbes metabolize and secrete stable, lightfast pigments at industrial scale.',
  },
  {
    num: '03',
    icon: '🌿',
    title: 'Drop-in Replacement',
    desc: 'Our bio-dyes are chemically compatible with existing textile infrastructure. No new machinery. Zero transition cost.',
  },
]

export default function WhatWeDoSection() {
  const sectionRef = useScrollReveal()

  return (
    <section
      id="what"
      ref={sectionRef}
      className="relative px-4 md:px-8 lg:px-12 py-24 md:py-32 lg:py-40 bg-gradient-to-b from-bg to-bg2"
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* Left Content */}
        <div>
          <SectionLabel className="reveal">What We Do</SectionLabel>

          <h2 className="reveal reveal-delay-1 font-display text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.1] text-text-primary tracking-tight mb-6">
            Biology is the<br />
            <em className="italic text-accent">new chemistry.</em>
          </h2>

          <p className="reveal reveal-delay-2 text-text-muted text-[1.05rem] leading-relaxed font-light mb-10">
            The textile industry pours 200 billion liters of toxic dye wastewater
            into ecosystems every year. We've engineered a living alternative —
            microbes that produce vivid, stable pigments with near-zero ecological footprint.
          </p>

          {/* Cards */}
          <div className="flex flex-col gap-px">
            {cards.map((card, i) => (
              <div
                key={card.num}
                className={`reveal reveal-delay-${i + 2} what-card-glow relative overflow-hidden border border-border-default bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)] backdrop-blur-[10px] px-5 py-4 md:px-6 md:py-5 flex items-start gap-4 md:gap-6 transition-all duration-300 hover:border-border-bright hover:shadow-[0_4px_32px_rgba(0,255,136,0.18)]`}
              >
                <span className="font-mono text-[0.65rem] text-accent opacity-70 min-w-[24px] mt-1">
                  {card.num}
                </span>
                <div className="w-11 h-11 shrink-0 border border-border-bright flex items-center justify-center rounded-[10px] text-xl">
                  {card.icon}
                </div>
                <div className="relative z-[1]">
                  <h3 className="text-[0.95rem] font-semibold text-text-primary mb-1 tracking-[0.02em]">
                    {card.title}
                  </h3>
                  <p className="text-[0.85rem] text-text-muted leading-relaxed font-light m-0">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Visual - Animated Microbe SVG */}
        <div className="relative flex items-center justify-center order-first lg:order-last">
          <svg viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[480px]">
            {/* Outer rings */}
            <circle cx="240" cy="240" r="220" stroke="rgba(0,255,136,0.08)" strokeWidth="1" />
            <circle cx="240" cy="240" r="180" stroke="rgba(0,255,136,0.10)" strokeWidth="1" />
            <circle cx="240" cy="240" r="140" stroke="rgba(0,255,136,0.12)" strokeWidth="1" />

            {/* Microbe body */}
            <ellipse cx="240" cy="240" rx="85" ry="105" stroke="rgba(0,200,80,0.5)" strokeWidth="1.5"
              fill="rgba(0,255,136,0.06)" />

            {/* Flagella paths */}
            <path d="M240 345 C280 370 320 360 340 390 C360 420 350 450 330 460" stroke="rgba(0,200,80,0.3)"
              strokeWidth="1" fill="none" className="microbe-path" style={{ animationDelay: '0s' }} />
            <path d="M240 345 C200 375 160 365 140 395 C120 425 130 455 150 465" stroke="rgba(0,200,80,0.3)"
              strokeWidth="1" fill="none" className="microbe-path" style={{ animationDelay: '0.5s' }} />
            <path d="M325 240 C360 220 390 230 410 210 C430 190 425 160 410 150" stroke="rgba(0,200,80,0.25)"
              strokeWidth="1" fill="none" className="microbe-path" style={{ animationDelay: '1s' }} />

            {/* DNA helix inside */}
            <path d="M220 170 Q240 185 260 200 Q240 215 220 230 Q240 245 260 260 Q240 275 220 290 Q240 305 260 320"
              stroke="rgba(0,255,136,0.4)" strokeWidth="1.5" fill="none" />
            <path d="M260 170 Q240 185 220 200 Q240 215 260 230 Q240 245 220 260 Q240 275 260 290 Q240 305 220 320"
              stroke="rgba(0,200,80,0.4)" strokeWidth="1.5" fill="none" />

            {/* Cross links */}
            <line x1="220" y1="200" x2="260" y2="200" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
            <line x1="260" y1="215" x2="220" y2="215" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
            <line x1="220" y1="230" x2="260" y2="230" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
            <line x1="260" y1="245" x2="220" y2="245" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
            <line x1="220" y1="260" x2="260" y2="260" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
            <line x1="260" y1="275" x2="220" y2="275" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
            <line x1="220" y1="290" x2="260" y2="290" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
            <line x1="260" y1="305" x2="220" y2="305" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />

            {/* Orbiting particles */}
            <g className="orbit-dot-el" style={{ animationDuration: '8s' }}>
              <circle cx="240" cy="60" r="4" fill="#00ff88" opacity="0.8" />
            </g>
            <g className="orbit-dot-el" style={{ animationDuration: '12s', animationDirection: 'reverse' }}>
              <circle cx="420" cy="240" r="3" fill="#00cc6a" opacity="0.6" />
            </g>
            <g className="orbit-dot-el" style={{ animationDuration: '6s' }}>
              <circle cx="60" cy="240" r="3" fill="rgba(0,200,80,.5)" opacity="0.5" />
            </g>

            {/* Labels */}
            <text x="350" y="130" fill="rgba(0,200,80,0.5)" fontSize="9" fontFamily="'Space Mono',monospace" letterSpacing="1">CRISPR-EDITED</text>
            <text x="350" y="145" fill="rgba(0,200,80,0.3)" fontSize="9" fontFamily="'Space Mono',monospace" letterSpacing="1">GENOME</text>
            <text x="22" y="150" fill="rgba(0,255,136,0.5)" fontSize="9" fontFamily="'Space Mono',monospace" letterSpacing="1">PIGMENT</text>
            <text x="22" y="165" fill="rgba(0,255,136,0.3)" fontSize="9" fontFamily="'Space Mono',monospace" letterSpacing="1">OUTPUT</text>

            {/* Glow center */}
            <circle cx="240" cy="245" r="20" fill="rgba(0,255,136,0.10)" />
            <circle cx="240" cy="245" r="10" fill="rgba(0,255,136,0.15)" />
            <circle cx="240" cy="245" r="4" fill="rgba(0,200,80,0.4)" />
          </svg>
        </div>
      </div>
    </section>
  )
}
