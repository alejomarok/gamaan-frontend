import HeroSection from "../components/Home/HeroSection"
import BenefitsSection from "../components/Home/BenefitsSection"
// import SimulatorSection from "../components/home/SimulatorSection"
// import RatesSection from "../components/home/RatesSection"
// import ApplicationFormSection from "../components/home/ApplicationFormSection"
import FaqSection from "../components/Home/FaqSection"
import ContactSection from "../components/Home/ContactSection"
import CreditosSection from "../components/Home/CreditosSection"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">

      <main className="flex-1">
        <HeroSection />
        <BenefitsSection />
        <CreditosSection />
        {/* 
        <SimulatorSection />
        <RatesSection />
        <ApplicationFormSection />*/}
        <FaqSection />
        <ContactSection /> 
      </main>
    </div>
  )
}
