import ScrollReveal from '../ScrollReveal';

const MissionVision = () => {
    return (
        <div className="flex flex-row justify-between items-center h-[90dvh] gap-12">
            <div className="w-full text-center">
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