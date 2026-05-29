import useScrollReveal from '../../hooks/useScrollReveal'
import Marquee from "react-fast-marquee";

const items = [
    { img: "/logos/social_alpha.jpeg", name: 'Social Alpha' },
    { img: "/logos/ccamp.jpg", name: 'C-CAMP' },
    { img: "/logos/win-coe.png", name: 'WiN CoE' },
    { img: "/logos/elevate.png", name: 'Elevate' },
    { img: "/logos/mufg.png", name: 'MUFG' },
    { img: "/logos/hm-foundation.png", name: 'H&M Foundation', scale: 'scale-100' },
    { img: "/logos/startup-india.png", name: 'Start up India' },
]

// Fix for react-fast-marquee import in some environments
const MarqueeComponent = Marquee.default || Marquee;

export default function SupportAwards() {
    const sectionRef = useScrollReveal()

    return (
        <section
            id="recognition"
            ref={sectionRef}
            className="relative py-8 md:py-12 bg-bg2 dark:bg-bg overflow-hidden transition-colors duration-500"
        >
            <div className="max-w-[1200px] mx-auto px-4 text-center mb-6 md:mb-8">
                <h2 className="font-display font-bold text-[0.9rem] md:text-xl uppercase tracking-[0.6em] text-accent">
                    Proudly Supported By
                </h2>
            </div>

            {/* react-fast-marquee Implementation */}
            <div className="relative w-full">
                <MarqueeComponent
                    gradient={false}
                    speed={80}
                    pauseOnHover={true}
                    className="py-4"
                >
                    {items.map((item, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-center px-10 md:px-20 group"
                        >
                            <img
                                src={item.img}
                                alt={item.name}
                                className={`h-10 md:h-14 w-auto object-contain opacity-100 transition-all duration-500 mix-blend-multiply dark:mix-blend-normal pointer-events-none rounded-[4px] ${item.scale || ''}`}
                            />
                        </div>
                    ))}
                </MarqueeComponent>

                {/* Left/Right Edge Fades */}
                <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-bg2 dark:from-bg to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-bg2 dark:from-bg to-transparent z-10 pointer-events-none" />
            </div>

            {/* Decorative background glows */}
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent2 opacity-[0.02] blur-[120px] rounded-full pointer-events-none" />
        </section>
    )
}
