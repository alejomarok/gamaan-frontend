import { ArrowRight, Home } from "lucide-react"
import { Button } from "../ui/button"

export default function CreditoHipotecarioSection() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-green-100 p-3 rounded-full">
          <Home className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800">Crédito Hipotecario</h3>
      </div>

      <p className="text-gray-600 mb-6">
        Haz realidad el sueño de tu casa propia con nuestro crédito hipotecario. Financiamos la compra, construcción o
        refacción de tu vivienda con las mejores condiciones del mercado y asesoramiento personalizado.
      </p>

      <ul className="mb-6 space-y-2">
        <li className="flex items-start">
          <span className="text-green-500 mr-2">✓</span>
          <span className="text-gray-600">Financiamiento hasta el 90% del valor de la propiedad</span>
        </li>
        <li className="flex items-start">
          <span className="text-green-500 mr-2">✓</span>
          <span className="text-gray-600">Plazos extendidos de hasta 30 años</span>
        </li>
        <li className="flex items-start">
          <span className="text-green-500 mr-2">✓</span>
          <span className="text-gray-600">Tasas competitivas y fijas durante los primeros años</span>
        </li>
      </ul>

      <Button className="w-full bg-green-600 hover:bg-green-700">
        Solicitar Crédito Hipotecario
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}
