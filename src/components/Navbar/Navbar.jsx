"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ChevronDown } from "lucide-react"
import { Button } from "../ui/button"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-[#003226]">Gamaan</span>
        </Link>

        <nav
  className={`${mobileMenuOpen ? "flex" : "hidden"} md:flex gap-6 flex-col md:flex-row absolute md:absolute top-16 md:top-1/2 md:-translate-y-1/2 left-1/2 -translate-x-1/2 bg-white p-4 md:p-0 border-b md:border-0 z-50`}
>
  <Link to="/" className="text-sm font-medium hover:text-[#003226]">
    Inicio
  </Link>
  <a href="#solicitud" className="text-sm font-medium hover:text-[#003226]">
    Solicitá tu Crédito
  </a>
  <a href="#faq" className="text-sm font-medium hover:text-[#003226]">
    Preguntas Frecuentes
  </a>
  <a href="#contacto" className="text-sm font-medium hover:text-[#003226]">
    Contacto
  </a>
</nav>


        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <ChevronDown className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>

          {/* Botón de login */}
          <Button variant="outline" asChild>
            <Link to="/login">Login</Link>
          </Button>

          <Button asChild>
            <Link to="/dashboard">Acceso Clientes</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
