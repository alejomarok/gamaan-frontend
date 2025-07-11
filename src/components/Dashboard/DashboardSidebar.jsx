import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  FileText,
  Home,
  LogOut,
  Settings,
  Users,
  X,
  FileBarChart,
} from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "../../lib/utils"
import logo2 from "../../assets/logo2.png"
import { auth, db } from "../../firebaseconfig"
import { signOut } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"

export default function DashboardSidebar({ open, setOpen }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [userRole, setUserRole] = useState(null)

  // 🔐 Obtener rol del usuario logueado
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setUserRole(docSnap.data().rol)
        }
      }
    })
    return () => unsubscribe()
  }, [])

  const isActive = (path) => {
    const current = location.pathname.toLowerCase()
    const target = path.toLowerCase()
    if (target === "/dashboard") return current === "/dashboard"
    return current === target || current.startsWith(target + "/")
  }

  // ✨ Menú completo
  const allMenuItems = [
    { title: "Dashboard", icon: Home, href: "/dashboard", roles: ["admin"] },
    { title: "Solicitudes", icon: FileText, href: "/dashboard/solicitudes", roles: ["admin", "user", "concesionaria"] },
    { title: "Usuarios", icon: Users, href: "/dashboard/users", roles: ["admin"] },
    { title: "Simulador de Crédito", icon: FileText, href: "/dashboard/calculador-tasas", roles: ["admin", "concesionaria"] },
    { title: "Reportes", icon: FileBarChart, href: "/dashboard/reportes", roles: ["admin"] },
    { title: "Configuraciones", icon: Settings, href: "/dashboard/configuraciones", roles: ["admin"] },
  ]

  // 🔍 Filtrar por rol
  const menuItems = allMenuItems.filter(item => item.roles.includes(userRole))

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate("/")
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
    }
  }

  return (
    <div className={cn(
      "fixed left-0 top-0 z-40 w-64 h-screen transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
      open ? "translate-x-0" : "-translate-x-full",
      "bg-[#003226] text-white flex flex-col"
    )}>
      {/* Header */}
      <div className="border-b border-[#00271e] px-4 py-4 flex justify-between items-center">
        <Link to="/dashboard" className="flex items-center">
          <img src={logo2} alt="Gamaan Logo" className="h-10 w-auto sm:h-12 md:h-14" />
          <span className="ml-2 rounded-md bg-white px-1.5 py-0.5 text-xs font-medium text-[#003226]">
            {userRole ? userRole.charAt(0).toUpperCase() + userRole.slice(1) : ""}
          </span>
        </Link>
        <Button onClick={() => setOpen(false)} variant="ghost" size="icon" className="text-white lg:hidden">
          <X className="h-5 w-5" />
        </Button>
      </div>

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
        <Button asChild variant="outline" className="w-full justify-start gap-2 text-sm bg-white text-[#003226] hover:bg-[#DBC5A8]">
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            Volver al sitio
          </Link>
        </Button>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white transition-all hover:bg-[#004432]"
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}
