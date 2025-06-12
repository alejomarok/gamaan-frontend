import { ArrowRight, Wallet } from "lucide-react"
import { Button } from "../ui/button"

export default function CreditoPersonalSection() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-[#DBC5A8] p-3 rounded-full">
          <Wallet className="h-8 w-8 text-[#003226]" />
        </div>
        <h3 className="text-2xl font-bold text-[#003226]">Crédito Personal</h3>
      </div>

      <p className="text-gray-700 mb-6">
        Obtén el dinero que necesitas para tus proyectos personales sin necesidad de garantías. Ideal para viajes,
        reformas, consolidación de deudas o cualquier imprevisto que requiera financiamiento inmediato.
      </p>

      <ul className="mb-6 space-y-2">
        <li className="flex items-start">
          <span className="text-[#003226] mr-2">✓</span>
          <span className="text-gray-700">Aprobación rápida en 24 horas</span>
        </li>
        <li className="flex items-start">
          <span className="text-[#003226] mr-2">✓</span>
          <span className="text-gray-700">Montos desde $500 hasta $30,000</span>
        </li>
        <li className="flex items-start">
          <span className="text-[#003226] mr-2">✓</span>
          <span className="text-gray-700">Sin comisiones por cancelación anticipada</span>
        </li>
      </ul>

      <Button className="w-full bg-[#003226] hover:bg-[#00291f] text-white">
        Solicitar Crédito Personal
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}
