"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea"
import { ArrowLeft, CreditCard } from "lucide-react"

export default function CreditoPersonalForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    dni: "",
    ingresos: "",
    montoSolicitado: "",
    plazo: "",
    destino: "",
    situacionLaboral: "",
    observaciones: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Datos del formulario personal:", formData)
    alert("Solicitud enviada correctamente. Nos contactaremos contigo pronto.")
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <CreditCard className="w-8 h-8 text-purple-600" />
            </div>
            <CardTitle className="text-3xl">Solicitud de Crédito Personal</CardTitle>
            <CardDescription>Completa el formulario para solicitar tu crédito personal</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre Completo *</Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) => handleChange("nombre", e.target.value)}
                    placeholder="Ingresa tu nombre completo"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dni">DNI *</Label>
                  <Input
                    id="dni"
                    value={formData.dni}
                    onChange={(e) => handleChange("dni", e.target.value)}
                    placeholder="12345678"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="tu@email.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono *</Label>
                  <Input
                    id="telefono"
                    value={formData.telefono}
                    onChange={(e) => handleChange("telefono", e.target.value)}
                    placeholder="+54 11 1234-5678"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ingresos">Ingresos Mensuales *</Label>
                  <Input
                    id="ingresos"
                    value={formData.ingresos}
                    onChange={(e) => handleChange("ingresos", e.target.value)}
                    placeholder="$200,000"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="situacionLaboral">Situación Laboral *</Label>
                  <Select onValueChange={(value) => handleChange("situacionLaboral", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tu situación" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="empleado">Empleado en relación de dependencia</SelectItem>
                      <SelectItem value="autonomo">Trabajador autónomo</SelectItem>
                      <SelectItem value="monotributista">Monotributista</SelectItem>
                      <SelectItem value="jubilado">Jubilado/Pensionado</SelectItem>
                      <SelectItem value="empresario">Empresario</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="montoSolicitado">Monto Solicitado *</Label>
                  <Input
                    id="montoSolicitado"
                    value={formData.montoSolicitado}
                    onChange={(e) => handleChange("montoSolicitado", e.target.value)}
                    placeholder="$1,000,000"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plazo">Plazo (meses) *</Label>
                  <Select onValueChange={(value) => handleChange("plazo", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el plazo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12 meses</SelectItem>
                      <SelectItem value="18">18 meses</SelectItem>
                      <SelectItem value="24">24 meses</SelectItem>
                      <SelectItem value="36">36 meses</SelectItem>
                      <SelectItem value="48">48 meses</SelectItem>
                      <SelectItem value="60">60 meses</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="destino">Destino del Préstamo *</Label>
                <Select onValueChange={(value) => handleChange("destino", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="¿Para qué necesitas el préstamo?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consolidacion">Consolidación de deudas</SelectItem>
                    <SelectItem value="mejoras">Mejoras en el hogar</SelectItem>
                    <SelectItem value="educacion">Educación</SelectItem>
                    <SelectItem value="salud">Gastos médicos</SelectItem>
                    <SelectItem value="viaje">Viaje</SelectItem>
                    <SelectItem value="emprendimiento">Emprendimiento</SelectItem>
                    <SelectItem value="otros">Otros</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="observaciones">Observaciones</Label>
                <Textarea
                  id="observaciones"
                  value={formData.observaciones}
                  onChange={(e) => handleChange("observaciones", e.target.value)}
                  placeholder="Información adicional que consideres relevante"
                  className="min-h-[100px]"
                />
              </div>

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                Enviar Solicitud de Crédito Personal
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
