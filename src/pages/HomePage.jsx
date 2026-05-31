import HeroSection from '../components/sections/HeroSection'
import ScienceSection from '../components/sections/ScienceSection'
import ProductsSection from '../components/sections/ProductsSection'
import WhatWeDoSection from '../components/sections/WhatWeDoSection'
import Info from '../components/sections/Info'
import ShowcaseImage from '../components/sections/ShowcaseImage'
import ShowcaseVideo from '../components/sections/ShowcaseVideo'
import TeamSection from '../components/sections/TeamSection'
import MissionVision from '../components/sections/MissionVision'
import SupportAwards from '../components/sections/SupportAwards'
import ContactSection from '../components/sections/ContactSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ScienceSection />
      <ProductsSection />
      <Info />
      <ShowcaseImage />
      <ShowcaseVideo />
      <TeamSection />
      <MissionVision />
      <WhatWeDoSection />
      <SupportAwards />
      <ContactSection />
    </>
  )
}
