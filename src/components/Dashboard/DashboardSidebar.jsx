import { Link, useLocation } from "react-router-dom"
import { ArrowLeft, FileText, Home, LogOut, Settings, Users, X } from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "../../lib/utils"

export default function DashboardSidebar({ open, setOpen }) {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`)
  }

  const menuItems = [
    { title: "Dashboard", icon: Home, href: "/dashboard" },
    { title: "Solicitudes", icon: FileText, href: "/applications" },
    { title: "Configuraciones", icon: Settings, href: "/settings" },
    { title: "Usuarios", icon: Users, href: "/users" },
  ]

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="border-b px-4 py-4 flex justify-between items-center">
          <Link to="/dashboard" className="flex items-center">
            <span className="text-xl font-bold text-[#003226]">Gamaan</span>
            <span className="ml-2 rounded-md bg-[#003226] px-1.5 py-0.5 text-xs font-medium text-white">Admin</span>
          </Link>

          {/* Botón para cerrar la sidebar (solo en móvil) */}
          <Button
            onClick={() => setOpen(false)}
            variant="ghost"
            size="icon"
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navegación */}
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            {menuItems.map((item, index) => {
              const Icon = item.icon
              return (
                <Link
                  key={index}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                    isActive(item.href)
                      ? "bg-[#003226] text-white"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="mt-auto border-t p-4 space-y-2">
          {/* Botón volver al sitio, ahora más compacto */}
          <Button
            asChild
            variant="outline"
            className="w-full justify-start gap-2 text-sm"
          >
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Volver al sitio
            </Link>
          </Button>

          {/* Cerrar sesión */}
          <Link
            to="/login"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </Link>
        </div>
      </div>
    </div>
  )
}
