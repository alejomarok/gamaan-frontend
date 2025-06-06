import CreditoPrendarioSection from "./CreditoPrendarioSection"
import CreditoPersonalSection from "./CreditoPersonalSection"
import CreditoHipotecarioSection from "./CreditoHipotecarioSection"

export default function CreditosSection() {
  return (
    <section className="py-16 bg-gray-50" id="creditos">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nuestras Soluciones Financieras</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ofrecemos diferentes tipos de créditos adaptados a tus necesidades específicas, con condiciones competitivas
            y procesos ágiles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <CreditoPrendarioSection />
          <CreditoPersonalSection />
          <CreditoHipotecarioSection />
        </div>
      </div>
    </section>
  )
}
