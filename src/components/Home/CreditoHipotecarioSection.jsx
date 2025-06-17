import { ArrowRight, Home } from "lucide-react"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom" 

export default function CreditoHipotecarioSection() {
  const navigate = useNavigate(); // Hook para navegación

  const handleSolicitarClick = () => {
    navigate("../credito-hipotecario"); // Cambia la ruta según tu configuración de rutas
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-[#DBC5A8] p-3 rounded-full">
          <Home className="h-8 w-8 text-[#003226]" />
        </div>
        <h3 className="text-2xl font-bold text-[#003226]">Crédito Hipotecario</h3>
      </div>

      <p className="text-gray-700 mb-6">
        Haz realidad el sueño de tu casa propia con nuestro crédito hipotecario. Financiamos la compra, construcción o
        refacción de tu vivienda con las mejores condiciones del mercado y asesoramiento personalizado.
      </p>

      <ul className="mb-6 space-y-2">
        <li className="flex items-start">
          <span className="text-[#003226] mr-2">✓</span>
          <span className="text-gray-700">Financiamiento hasta el 90% del valor de la propiedad</span>
        </li>
        <li className="flex items-start">
          <span className="text-[#003226] mr-2">✓</span>
          <span className="text-gray-700">Plazos extendidos de hasta 30 años</span>
        </li>
        <li className="flex items-start">
          <span className="text-[#003226] mr-2">✓</span>
          <span className="text-gray-700">Tasas competitivas y fijas durante los primeros años</span>
        </li>
      </ul>

      <Button
        className="w-full bg-[#003226] hover:bg-[#00291f] text-white"
        onClick={handleSolicitarClick}
      >
        Solicitar Crédito Hipotecario
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}