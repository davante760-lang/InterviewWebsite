import LandingNav from './components/landing/LandingNav'
import LandingHero from './components/landing/LandingHero'
import CinematicDemo from './components/landing/CinematicDemo'
import TypingStruggle from './components/landing/TypingStruggle'
import VideoWalkthrough from './components/landing/VideoWalkthrough'
import ProductExplainer from './components/landing/ProductExplainer'
import QuestionRouting from './components/landing/QuestionRouting'
import YourPlaybook from './components/landing/YourPlaybook'
import PracticeMode from './components/landing/PracticeMode'
import WarRoom from './components/landing/WarRoom'
import FounderCredibility from './components/landing/FounderCredibility'
import Pricing from './components/landing/Pricing'
import FAQ from './components/landing/FAQ'
import FinalCTA from './components/landing/FinalCTA'
import LandingFooter from './components/landing/LandingFooter'

export default function App() {
  return (
    <>
      <LandingNav />
      <LandingHero />
      <CinematicDemo />
      <TypingStruggle />
      <VideoWalkthrough />
      <ProductExplainer />
      <QuestionRouting />
      <YourPlaybook />
      <PracticeMode />
      <WarRoom />
      <FounderCredibility />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <LandingFooter />
    </>
  )
}
