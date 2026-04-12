import LandingNav from './components/landing/LandingNav'
import LandingHero from './components/landing/LandingHero'
import ProblemStatement from './components/landing/ProblemStatement'
import VideoWalkthrough from './components/landing/VideoWalkthrough'
import HowItWorks from './components/landing/HowItWorks'
import PrepCards from './components/landing/PrepCards'
import PracticeMode from './components/landing/PracticeMode'
import WarRoom from './components/landing/WarRoom'
import FounderCredibility from './components/landing/FounderCredibility'
import Competitive from './components/landing/Competitive'
import Pricing from './components/landing/Pricing'
import FAQ from './components/landing/FAQ'
import FinalCTA from './components/landing/FinalCTA'
import LandingFooter from './components/landing/LandingFooter'

export default function App() {
  return (
    <>
      <LandingNav />
      <LandingHero />
      <ProblemStatement />
      <VideoWalkthrough />
      <HowItWorks />
      <PrepCards />
      <PracticeMode />
      <WarRoom />
      <FounderCredibility />
      <Competitive />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <LandingFooter />
    </>
  )
}
