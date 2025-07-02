"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea"
import { ArrowLeft, Home } from "lucide-react"

import { db } from "../../firebaseconfig"; 
import { collection, addDoc } from "firebase/firestore";

export default function CreditoHipotecarioForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    dni: "",
    ingresos: "",
    valorPropiedad: "",
    montoSolicitado: "",
    plazo: "",
    tipoPropiedad: "",
    ubicacion: "",
    observaciones: "",
    estado: "pendiente",
    fechaCreacion: new Date().toISOString(),
  })

  const enviarSolicitudAFirebase = async (data) => {
      try {
        await addDoc(collection(db, "creditosHipotecarios"), data);
        alert("Solicitud enviada correctamente. Nos contactaremos contigo pronto.");
      } catch (error) {
        alert("Error al enviar la solicitud: " + error.message);
      }
    };

  const handleSubmit = (e) => {
    e.preventDefault()
    enviarSolicitudAFirebase(formData)
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
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
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Home className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-3xl">Solicitud de Crédito Hipotecario</CardTitle>
            <CardDescription>Completa el formulario para solicitar tu crédito hipotecario</CardDescription>
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
                    placeholder="$500,000"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="valorPropiedad">Valor de la Propiedad *</Label>
                  <Input
                    id="valorPropiedad"
                    value={formData.valorPropiedad}
                    onChange={(e) => handleChange("valorPropiedad", e.target.value)}
                    placeholder="$50,000,000"
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
                    placeholder="$40,000,000"
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
                      <SelectItem value="10">10 años</SelectItem>
                      <SelectItem value="15">15 años</SelectItem>
                      <SelectItem value="20">20 años</SelectItem>
                      <SelectItem value="25">25 años</SelectItem>
                      <SelectItem value="30">30 años</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipoPropiedad">Tipo de Propiedad *</Label>
                  <Select onValueChange={(value) => handleChange("tipoPropiedad", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="casa">Casa</SelectItem>
                      <SelectItem value="departamento">Departamento</SelectItem>
                      <SelectItem value="ph">PH</SelectItem>
                      <SelectItem value="duplex">Duplex</SelectItem>
                      <SelectItem value="terreno">Terreno</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ubicacion">Ubicación *</Label>
                  <Input
                    id="ubicacion"
                    value={formData.ubicacion}
                    onChange={(e) => handleChange("ubicacion", e.target.value)}
                    placeholder="Ciudad, Provincia"
                    required
                  />
                </div>
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

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                Enviar Solicitud de Crédito Hipotecario
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}