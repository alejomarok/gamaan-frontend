import { Routes, Route } from "react-router-dom"
import MainLayout from "@/layouts/MainLayout"
import DashboardLayout from "@/layouts/DashboardLayout" // Asegurate de importarlo

// Formularios
import CreditoHipotecarioForm from "./components/Forms/CreditoHipotecarioForm"
import CreditoPrendarioForm from "./components/Forms/CreditoPrendarioForm"
import CreditoPersonalForm from "./components/Forms/CreditoPersonalForm"

// Páginas
import Home from "@/pages/Home"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import CalculadorTasas from "./pages/CalculadorTasas"
import UserManagement from "./pages/Users"
import Dashboard from "@/pages/admin/Dashboard"

export default function App() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<MainLayout><Register /></MainLayout>} />

      {/* Formularios públicos */}
      <Route path="/credito-hipotecario" element={<MainLayout><CreditoHipotecarioForm /></MainLayout>} />
      <Route path="/credito-prendario" element={<MainLayout><CreditoPrendarioForm /></MainLayout>} />
      <Route path="/credito-personal" element={<MainLayout><CreditoPersonalForm /></MainLayout>} />

      {/* Rutas dentro del Dashboard */}
      <Route
        path="/dashboard"
        element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        }
      />
      <Route
        path="/dashboard/calculador-tasas"
        element={
          <DashboardLayout>
            <CalculadorTasas />
          </DashboardLayout>
        }
      />
      <Route
        path="/dashboard/users"
        element={
          <DashboardLayout>
            <UserManagement />
          </DashboardLayout>
        }
      />
    </Routes>
  )
}
