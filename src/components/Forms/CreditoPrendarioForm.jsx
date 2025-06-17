"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea"
import { ArrowLeft, Car } from "lucide-react"

export default function CreditoPrendarioForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    dni: "",
    ingresos: "",
    tipoVehiculo: "",
    marca: "",
    modelo: "",
    año: "",
    montoSolicitado: "",
    plazo: "",
    observaciones: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Datos del formulario prendario:", formData)
    alert("Solicitud enviada correctamente. Nos contactaremos contigo pronto.")
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-4">
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
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Car className="w-8 h-8 text-blue-600" />
            </div>
            <CardTitle className="text-3xl">Solicitud de Crédito Prendario</CardTitle>
            <CardDescription>Completa el formulario para solicitar tu crédito prendario</CardDescription>
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

              <div className="space-y-2">
                <Label htmlFor="ingresos">Ingresos Mensuales *</Label>
                <Input
                  id="ingresos"
                  value={formData.ingresos}
                  onChange={(e) => handleChange("ingresos", e.target.value)}
                  placeholder="$300,000"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipoVehiculo">Tipo de Vehículo *</Label>
                  <Select onValueChange={(value) => handleChange("tipoVehiculo", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectItem value="camioneta">Camioneta</SelectItem>
                      <SelectItem value="suv">SUV</SelectItem>
                      <SelectItem value="moto">Moto</SelectItem>
                      <SelectItem value="utilitario">Utilitario</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="año">Año del Vehículo *</Label>
                  <Input
                    id="año"
                    value={formData.año}
                    onChange={(e) => handleChange("año", e.target.value)}
                    placeholder="2020"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="marca">Marca *</Label>
                  <Input
                    id="marca"
                    value={formData.marca}
                    onChange={(e) => handleChange("marca", e.target.value)}
                    placeholder="Toyota, Ford, Chevrolet, etc."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modelo">Modelo *</Label>
                  <Input
                    id="modelo"
                    value={formData.modelo}
                    onChange={(e) => handleChange("modelo", e.target.value)}
                    placeholder="Corolla, Focus, Cruze, etc."
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="montoSolicitado">Monto Solicitado *</Label>
                  <Input
                    id="montoSolicitado"
                    value={formData.montoSolicitado}
                    onChange={(e) => handleChange("montoSolicitado", e.target.value)}
                    placeholder="$5,000,000"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plazo">Plazo (años) *</Label>
                  <Select onValueChange={(value) => handleChange("plazo", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el plazo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 año</SelectItem>
                      <SelectItem value="2">2 años</SelectItem>
                      <SelectItem value="3">3 años</SelectItem>
                      <SelectItem value="4">4 años</SelectItem>
                      <SelectItem value="5">5 años</SelectItem>
                      <SelectItem value="6">6 años</SelectItem>
                      <SelectItem value="7">7 años</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="observaciones">Observaciones</Label>
                <Textarea
                  id="observaciones"
                  value={formData.observaciones}
                  onChange={(e) => handleChange("observaciones", e.target.value)}
                  placeholder="Información adicional sobre el vehículo o tu situación"
                  className="min-h-[100px]"
                />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Enviar Solicitud de Crédito Prendario
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
