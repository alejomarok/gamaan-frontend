"use client"
import { Menu } from "lucide-react"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback } from "../ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

export default function DashboardHeader({ toggleSidebar }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 sm:px-6">
      {/* Botón menú en mobile */}
      <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleSidebar}>
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle menu</span>
      </Button>

      {/* Espacio vacío para centrar o empujar el contenido */}
      <div className="flex-1"></div>

      {/* Perfil alineado a la derecha */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-[#003226] text-white">GL</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-[#003226] hidden sm:inline">Gaston Lopez</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Gaston Lopez</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Perfil</DropdownMenuItem>
          <DropdownMenuItem>Configuración</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Cerrar sesión</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
