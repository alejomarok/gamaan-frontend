import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <footer className="border-t bg-white py-6 mt-10">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-gray-500">© {new Date().getFullYear()} Gamaan. Todos los derechos reservados.</p>
        <div className="flex gap-4">
          <Link href="#faq" className="text-sm text-gray-600 hover:text-[#003226] transition-colors">
            Preguntas Frecuentes
          </Link>
          <Link href="#contacto" className="text-sm text-gray-600 hover:text-[#003226] transition-colors">
            Contacto
          </Link>
        </div>
      </div>
    </footer>
  )
}
