"use client"

import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Menu, UserCircle, LogOut } from "lucide-react"
import { Button } from "../ui/button"
import logo from "../../assets/logo.png"

import { auth, db } from "../../firebaseconfig"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setUserData(docSnap.data())
        }
      } else {
        setUserData(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    setUserData(null)
    navigate("/") // o a /login si preferís
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Gamaan Logo" className="h-12 w-auto object-contain" />
        </Link>

        {/* Navegación */}
        <nav
          className={`${
            mobileMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row md:items-center gap-4 md:gap-6 absolute md:static top-16 left-0 w-full md:w-auto bg-white p-4 md:p-0 border-b md:border-none z-50`}
        >
          <Link to="/" className="text-sm font-medium hover:text-[#003226]">Inicio</Link>
          <a href="#solicitud" className="text-sm font-medium hover:text-[#003226]">Solicitá tu Crédito</a>
          <a href="#faq" className="text-sm font-medium hover:text-[#003226]">Preguntas Frecuentes</a>
          <a href="#contacto" className="text-sm font-medium hover:text-[#003226]">Contacto</a>

          {/* Mobile: login o nombre + logout */}
          {!loading && (
            <div className="flex flex-col gap-2 md:hidden">
              {userData ? (
                <>
                  <div className="flex items-center gap-2 text-[#003226] font-medium px-2">
                    <UserCircle className="w-5 h-5" />
                    {userData.firstName} {userData.lastName}
                  </div>
                  <Button variant="outline" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-1" /> Cerrar Sesión
                  </Button>
                </>
              ) : (
                <Button variant="outline" asChild>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                </Button>
              )}
              <Button asChild>
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>Acceso Clientes</Link>
              </Button>
            </div>
          )}
        </nav>

        {/* Escritorio: login o nombre + logout */}
        {!loading && (
          <div className="hidden md:flex items-center gap-2">
            {userData ? (
              <>
                <div className="flex items-center gap-2 text-[#003226] font-medium px-2">
                  <UserCircle className="w-5 h-5" />
                  {userData.firstName} {userData.lastName}
                </div>
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-1" /> Cerrar Sesión
                </Button>
              </>
            ) : (
              <Button variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
            )}
            <Button asChild>
              <Link to="/dashboard">Acceso Clientes</Link>
            </Button>
          </div>
        )}

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
