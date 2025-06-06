import { ArrowRight, Car } from "lucide-react"
import { Button } from "../ui/button"

export default function CreditoPrendarioSection() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-blue-100 p-3 rounded-full">
          <Car className="h-8 w-8 text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800">Crédito Prendario</h3>
      </div>

      <p className="text-gray-600 mb-6">
        Financiamos la compra de tu vehículo nuevo o usado con las mejores tasas del mercado. Nuestro crédito prendario
        te permite acceder a plazos flexibles y cuotas adaptadas a tu capacidad de pago, utilizando el vehículo como
        garantía.
      </p>

      <ul className="mb-6 space-y-2">
        <li className="flex items-start">
          <span className="text-green-500 mr-2">✓</span>
          <span className="text-gray-600">Tasas preferenciales desde 12% anual</span>
        </li>
        <li className="flex items-start">
          <span className="text-green-500 mr-2">✓</span>
          <span className="text-gray-600">Financiamiento hasta el 80% del valor del vehículo</span>
        </li>
        <li className="flex items-start">
          <span className="text-green-500 mr-2">✓</span>
          <span className="text-gray-600">Plazos de hasta 60 meses</span>
        </li>
      </ul>

      <Button className="w-full bg-blue-600 hover:bg-blue-700">
        Solicitar Crédito Prendario
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}
