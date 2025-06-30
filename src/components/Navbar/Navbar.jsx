"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu } from "lucide-react"
import { Button } from "../ui/button"
import logo from "../../assets/logo.png"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Gamaan Logo"
            className="h-12 w-auto max-h-12 sm:h-12 sm:max-h-16 md:h-12"
          />
        </Link>

        {/* Menú mobile */}
        <nav
          className={`${
            mobileMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row md:items-center absolute top-16 left-0 w-full md:static bg-white border-b md:border-none shadow-md md:shadow-none p-4 md:p-0 gap-4 z-50`}
        >
          <Link
            to="/"
            className="text-sm font-medium hover:text-[#003226] transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            Inicio
          </Link>
          <a
            href="#solicitud"
            className="text-sm font-medium hover:text-[#003226] transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            Solicitá tu Crédito
          </a>
          <a
            href="#faq"
            className="text-sm font-medium hover:text-[#003226] transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            Preguntas Frecuentes
          </a>
          <a
            href="#contacto"
            className="text-sm font-medium hover:text-[#003226] transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contacto
          </a>

          {/* Solo visible en mobile */}
          <div className="flex flex-col gap-2 md:hidden mt-2">
            <Button variant="outline" asChild>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                Login
              </Link>
            </Button>
            <Button asChild>
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                Acceso Clientes
              </Link>
            </Button>
          </div>
        </nav>

        {/* Botones en escritorio */}
        <div className="hidden md:flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/dashboard">Acceso Clientes</Link>
          </Button>
        </div>

        {/* Botón hamburguesa */}
        <Button
          variant="outline"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Abrir menú</span>
        </Button>
      </div>
    </header>
  )
}
