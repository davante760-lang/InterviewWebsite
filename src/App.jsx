import StickyNav from './components/StickyNav'
import Hero from './components/Hero'
import NumbersBar from './components/NumbersBar'
import WorkHistory from './components/WorkHistory'
import WhatImBuiltFor from './components/WhatImBuiltFor'
import HowIWork from './components/HowIWork'
import FounderSignal from './components/FounderSignal'
import DealStory from './components/DealStory'
import WhatYoullGet from './components/WhatYoullGet'
import AboutDave from './components/AboutDave'
import ResumeDownload from './components/ResumeDownload'
import Footer from './components/Footer'
import { SectionDivider } from './components/AnimatedSection'

export default function App() {
  return (
    <>
      <StickyNav />
      <Hero />
      <NumbersBar />
      <SectionDivider />
      <WorkHistory />
      <WhatImBuiltFor />
      <HowIWork />
      <FounderSignal />
      <DealStory />
      <WhatYoullGet />
      <AboutDave />
      <ResumeDownload />
      <Footer />
    </>
  )
}
