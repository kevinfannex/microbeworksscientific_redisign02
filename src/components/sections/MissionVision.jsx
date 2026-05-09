import ScrollReveal from '../ScrollReveal';

const MissionVision = () => {
    return (
        <div className="relative flex flex-row justify-between items-center h-auto py-10 md:h-[90dvh] md:py-0 gap-12 overflow-hidden">
            {/* SVG Microbe Background Elements */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <img 
                    src="/Microbe_Icon.svg" 
                    alt="" 
                    className="absolute top-[10%] left-[2%] md:left-[10%] w-48 md:w-64 h-auto opacity-40 dark:opacity-50 blur-[1px] animate-[spin_35s_linear_infinite]"
                />
                <img 
                    src="/Microbe_Icon.svg" 
                    alt="" 
                    className="absolute bottom-[5%] right-[2%] md:right-[10%] w-56 md:w-80 h-auto opacity-40 dark:opacity-50 blur-[2px] animate-[spin_45s_linear_infinite_reverse]"
                />
                {/* <img 
                    src="/Microbe_Icon.svg" 
                    alt="" 
                    className="absolute top-[40%] left-[40%] w-24 md:w-32 h-auto opacity-35 dark:opacity-40 blur-[1px] animate-[spin_25s_linear_infinite]"
                /> */}
            </div>
            <div className="w-full text-center relative z-10">
                <ScrollReveal
                    baseOpacity={0.1}
                    enableBlur
                    baseRotation={3}
                    blurStrength={4}
                    containerClassName="max-w-[1200px] mx-auto px-8 md:px-12"
                    textClassName="text-[clamp(2rem,4vw,3rem)] text-text-primary font-display font-bold tracking-tight"
                >
                    Microbeworks is a bio-innovation company on a mission to replace conventional chemicals with sustainable alternatives.
                </ScrollReveal>
            </div>
        </div>
    )
}

export default MissionVision