import { Link, useLocation } from "react-router-dom"
import { ArrowLeft, FileText, Home, LogOut, Settings, Users, X } from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "../../lib/utils"
import { FileBarChart } from "lucide-react"
import logo2 from "../../assets/logo2.png"


export default function DashboardSidebar({ open, setOpen }) {
  const location = useLocation()

const isActive = (path) => {
  const current = location.pathname.toLowerCase()
  const target = path.toLowerCase()

  // Si es el dashboard exacto, solo marcamos si es exactamente igual
  if (target === "/dashboard") {
    return current === "/dashboard"
  }

  // Para las demás, permitimos subrutas
  return current === target || current.startsWith(target + "/")
}

  const menuItems = [
    { title: "Dashboard", icon: Home, href: "/dashboard" },
    { title: "Solicitudes", icon: FileText, href: "/dashboard/Solicitudes" },
    { title: "Usuarios", icon: Users, href: "/dashboard/users" },
    { title: "Simulador de Crédito", icon: FileText, href: "/dashboard/calculador-tasas" },
    { title: "Reportes", icon: FileBarChart, href: "/dashboard/reportes" },
    { title: "Configuraciones", icon: Settings, href: "/dashboard/configuraciones" },
  ]

  return (
    <div
  className={cn(
    "fixed left-0 top-0 z-40 w-64 h-screen transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
    open ? "translate-x-0" : "-translate-x-full",
    "bg-[#003226] text-white flex flex-col"
  )}
>

      {/* Header */}
      <div className="border-b border-[#00271e] px-4 py-4 flex justify-between items-center">
        <Link to="/dashboard" className="flex items-center">
          <img src={logo2} alt="Gamaan Logo" className="h-10 w-auto sm:h-12 md:h-14" />
          <span className="ml-2 rounded-md bg-white px-1.5 py-0.5 text-xs font-medium text-[#003226]">
            Admin
          </span>
        </Link>
        <Button
          onClick={() => setOpen(false)}
          variant="ghost"
          size="icon"
          className="text-white lg:hidden"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Navegación */}
      {/* Navegación */}
<div className="flex-1 py-4">
  <nav className="grid px-2 text-sm font-medium">
    {menuItems.map((item, index) => {
      const Icon = item.icon
      return (
        <Link
          key={index}
          to={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
            isActive(item.href)
              ? "bg-[#DBC5A8] text-[#003226] font-semibold"
              : "text-white hover:bg-[#004432]"
          )}
        >
          <Icon className="h-4 w-4" />
          {item.title}
        </Link>
      )
    })}
  </nav>
</div>


      {/* Footer fijo */}
      <div className="border-t border-[#00271e] p-4 space-y-2">
        <Button
          asChild
          variant="outline"
          className="w-full justify-start gap-2 text-sm bg-white text-[#003226] hover:bg-[#DBC5A8]"
        >
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            Volver al sitio
          </Link>
        </Button>

        <Link
          to="/login"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white transition-all hover:bg-[#004432]"
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </Link>
      </div>
    </div>
  )
}
