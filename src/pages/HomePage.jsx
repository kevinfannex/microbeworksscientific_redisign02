import HeroSection from '../components/sections/HeroSection'
import WhatWeDoSection from '../components/sections/WhatWeDoSection'
// import HowItWorksSection from '../components/sections/HowItWorksSection'
import Info from '../components/sections/Info'
import MissionVision from '../components/sections/MissionVision'
import SupportAwards from '../components/sections/SupportAwards'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Info />
      <MissionVision />
      <WhatWeDoSection />
      <SupportAwards />
      {/* <HowItWorksSection /> */}
    </>
  )
}
