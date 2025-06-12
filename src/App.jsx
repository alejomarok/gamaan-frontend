import { Routes, Route } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'

// Páginas
import Home from '@/pages/Home'
import Login from '@/pages/Login'
// import Dashboard from '@/pages/admin/Dashboard'

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
          <MainLayout>
            <Login />
          </MainLayout>
        }
      />

      {/* Rutas protegidas o del panel admin */}
      {/* <Route path="/admin/dashboard" element={<Dashboard />} /> */}
    </Routes>
  )
}
