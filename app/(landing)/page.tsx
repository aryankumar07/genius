import { LandingContent } from "@/components/landing-content"
import LandingHero from "@/components/landingHero"
import { LandingNavbar } from "@/components/landingnavbar"

const LandingPage = ()=>{
  return (
    <div className="h-full">
      <LandingNavbar/>
      <LandingHero/>
      <LandingContent/>
    </div>
  )
}

export default LandingPage