import Navbar from "../components/Navbar/Navbar"
import HeroSection from "../components/HeroSection/HeroSection"
// import BenefitsSection from "../components/home/BenefitsSection"
// import SimulatorSection from "../components/home/SimulatorSection"
// import RatesSection from "../components/home/RatesSection"
// import ApplicationFormSection from "../components/home/ApplicationFormSection"
// import FaqSection from "../components/home/FaqSection"
// import ContactSection from "../components/home/ContactSection"
import Footer from "../components/Footer/Footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <h1 className="text-3xl font-bold text-red-500">Hola Mundo</h1>

        {/* <BenefitsSection />
        <SimulatorSection />
        <RatesSection />
        <ApplicationFormSection />
        <FaqSection />
        <ContactSection /> */}
      </main>
      <Footer />
    </div>
  )
}
