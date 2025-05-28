import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold text-[#003226]">Gamaan</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="#" className="text-sm font-medium hover:text-[#003226]">
            Inicio
          </Link>
          <Link href="#simulador" className="text-sm font-medium hover:text-[#003226]">
            Simulador
          </Link>
          <Link href="#tasas" className="text-sm font-medium hover:text-[#003226]">
            Tasas Vigentes
          </Link>
          <Link href="#solicitud" className="text-sm font-medium hover:text-[#003226]">
            Solicitá tu Crédito
          </Link>
          <Link href="#faq" className="text-sm font-medium hover:text-[#003226]">
            Preguntas Frecuentes
          </Link>
          <Link href="#contacto" className="text-sm font-medium hover:text-[#003226]">
            Contacto
          </Link>
        </nav>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="md:hidden">
            <ChevronDown className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <Button asChild>
            <Link href="/dashboard">Acceso Clientes</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
