"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí se implementará la lógica de autenticación
    console.log("Login attempt:", formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Botón de regreso */}
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-green-700 hover:text-green-800 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Link>
        </div>

        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#003226' }}>
              <span className="text-2xl font-bold text-white">G</span>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Bienvenido a Gamaan</CardTitle>
            <CardDescription className="text-gray-600">Ingresa a tu cuenta para continuar</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Correo electrónico
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <Label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                    Recordarme
                  </Label>
                </div>
                <Link to="/forgot-password" className="text-sm text-green-600 hover:text-green-700 font-medium">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full hover:bg-green-700 text-white font-medium py-2.5 transition-colors"
                style={{ backgroundColor: '#003226' }}
              >
                Iniciar Sesión
              </Button>
            </form>
          </CardContent>

          <CardFooter className="text-center pt-6">
            <p className="text-sm text-gray-600">
              ¿No tienes una cuenta?{" "}
              <Link to="/register" className="text-green-600 hover:text-green-700 font-medium">
                Regístrate aquí
              </Link>
            </p>
          </CardFooter>
        </Card>

        {/* Información adicional */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-4">¿Necesitas ayuda? Contáctanos</p>
          <div className="flex justify-center space-x-6 text-sm">
            <Link to="/contact" className="text-green-600 hover:text-green-700">
              Soporte
            </Link>
            <Link to="/privacy" className="text-green-600 hover:text-green-700">
              Privacidad
            </Link>
            <Link to="/terms" className="text-green-600 hover:text-green-700">
              Términos
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
