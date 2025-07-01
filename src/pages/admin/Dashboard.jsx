import ApplicationsTable from "../../components/Dashboard/ApplicationsTable"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import UserManagement from "../Users"
import CalculadorTasas from "../CalculadorTasas"
import SolicitudesPage from "../Solicitudes"
export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Bienvenido al panel de administración de Gamaan.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Solicitudes recientes</CardTitle>
          <CardDescription>Gestiona las solicitudes de crédito recibidas.</CardDescription>
        </CardHeader>
        <CardContent>
          <SolicitudesPage />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gestión de Usuarios</CardTitle>
          <CardDescription>Visualiza y cambia los roles de los usuarios del sistema.</CardDescription>
        </CardHeader>
        <CardContent>
          <UserManagement />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Simulador de Crédito</CardTitle>
          <CardDescription>Visualiza y simula diferentes opciones de crédito.</CardDescription>
        </CardHeader>
        <CardContent>
          <CalculadorTasas />
        </CardContent>
      </Card>

      
    </div>
  )
}
