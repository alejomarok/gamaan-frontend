import { Routes, Route } from "react-router-dom"
import MainLayout from "@/layouts/MainLayout"

// Páginas Home 
import Home from "@/pages/Home"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
// Formularios del Home 
import CreditoHipotecarioForm from "./components/Forms/CreditoHipotecarioForm"
import CreditoPrendarioForm from "./components/Forms/CreditoPrendarioForm"
import CreditoPersonalForm from "./components/Forms/CreditoPersonalForm"

// Dashboard
import Dashboard from "@/pages/admin/Dashboard"
import DashboardLayout from "@/layouts/DashboardLayout"
// Páginas del dashboard
import CalculadorTasas from "./pages/CalculadorTasas"
import UserManagement from "./pages/Users"
import SolicitudesPage from "./pages/Solicitudes"
import ReportesPage from "./pages/Reportes"
import ProtectedRoute from "@/components/auth/ProtectedRoute"

export default function App() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<MainLayout><Register /></MainLayout>} />
      <Route path="/credito-hipotecario" element={<MainLayout><CreditoHipotecarioForm /></MainLayout>} />
      <Route path="/credito-prendario" element={<MainLayout><CreditoPrendarioForm /></MainLayout>} />
      <Route path="/credito-personal" element={<MainLayout><CreditoPersonalForm /></MainLayout>} />

      {/* Dashboard (solo logueados: todos los roles) */}
      <Route path="/dashboard" element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <DashboardLayout><Dashboard /></DashboardLayout>
        </ProtectedRoute>
      }/>

      {/* Calculador de tasas (solo admin y concesionaria) */}
      <Route path="/dashboard/calculador-tasas" element={
        <ProtectedRoute allowedRoles={["admin", "concesionaria"]}>
          <DashboardLayout><CalculadorTasas /></DashboardLayout>
        </ProtectedRoute>
      }/>

      {/* Solicitudes (todos los roles logueados) */}
      <Route path="/dashboard/solicitudes" element={
        <ProtectedRoute allowedRoles={["admin", "concesionaria", "user"]}>
          <DashboardLayout><SolicitudesPage /></DashboardLayout>
        </ProtectedRoute>
      }/>

      {/* Users y Reportes (solo admin) */}
      <Route path="/dashboard/users" element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <DashboardLayout><UserManagement /></DashboardLayout>
        </ProtectedRoute>
      }/>
      <Route path="/dashboard/reportes" element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <DashboardLayout><ReportesPage /></DashboardLayout>
        </ProtectedRoute>
      }/>
    </Routes>
  )
}
