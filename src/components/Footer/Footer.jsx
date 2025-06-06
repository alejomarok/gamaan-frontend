import { Facebook, Instagram, MessageCircle } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#003226] text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Gamaan</h3>
            <p className="text-[#DBC5A8]">Soluciones financieras a tu medida</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-2">
              <p>Garibaldi esquina General Paz, Río Tercero, Córdoba</p>
              <p>+54 11 4567-8900</p>
              <p>info@gamaan.com.ar</p>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Seguinos</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#DBC5A8]">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="hover:text-[#DBC5A8]">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="hover:text-[#DBC5A8]">
                <MessageCircle className="h-6 w-6" />
                <span className="sr-only">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} Gamaan. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
