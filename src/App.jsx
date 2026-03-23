import StickyNav from './components/StickyNav'
import Hero from './components/Hero'
import NumbersBar from './components/NumbersBar'
import WhyOutmarket from './components/WhyOutmarket'
import HowIWork from './components/HowIWork'
import WhatYoullGet from './components/WhatYoullGet'
import DealStory from './components/DealStory'
import WhatIveLearned from './components/WhatIveLearned'
import WorkHistory from './components/WorkHistory'
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
      <WhyOutmarket />
      <SectionDivider />
      <HowIWork />
      <SectionDivider />
      <WhatYoullGet />
      <SectionDivider />
      <DealStory />
      <SectionDivider />
      <WhatIveLearned />
      <SectionDivider />
      <WorkHistory />
      <SectionDivider />
      <AboutDave />
      <SectionDivider />
      <ResumeDownload />
      <Footer />
    </>
  )
}
