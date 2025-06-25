import { Routes, Route } from "react-router-dom"
import MainLayout from "@/layouts/MainLayout"

import CreditoHipotecarioForm from "./components/Forms/CreditoHipotecarioForm"
import CreditoPrendarioForm from "./components/Forms/CreditoPrendarioForm"
import CreditoPersonalForm from "./components/Forms/CreditoPersonalForm"

// Páginas
import Home from "@/pages/Home"
import Login from "@/pages/Login"
import Dashboard from '@/pages/admin/Dashboard'

export default function App() {
  return (
    <Routes>
      {/* Rutas públicas con MainLayout */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />

      <Route
        path="/login"
        element={
            <Login />
        }
      />

      {/* Rutas de formularios de crédito */}
      <Route
        path="/credito-hipotecario"
        element={
          <MainLayout>
            <CreditoHipotecarioForm />
          </MainLayout>
        }
      />

      <Route
        path="/credito-prendario"
        element={
          <MainLayout>
            <CreditoPrendarioForm />
          </MainLayout>
        }
      />

      <Route
        path="/credito-personal"
        element={
          <MainLayout>
            <CreditoPersonalForm />
          </MainLayout>
        }
      />

      {/* Rutas protegidas o del panel admin */}
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}
