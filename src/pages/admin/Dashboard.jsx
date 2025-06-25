import DashboardLayout from "../../layouts/DashboardLayout"
// import DashboardStats from "../components/dashboard/DashboardStats"
// import DashboardCharts from "../components/dashboard/DashboardCharts"
// import ApplicationsTable from "../components/dashboard/ApplicationsTable"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Bienvenido al panel de administración de Gamaan.</p>
        </div>

        {/* <DashboardStats />

        <DashboardCharts />

        <Card>
          <CardHeader>
            <CardTitle>Solicitudes recientes</CardTitle>
            <CardDescription>Gestiona las solicitudes de crédito recibidas.</CardDescription>
          </CardHeader>
          <CardContent>
            <ApplicationsTable />
          </CardContent>
        </Card> */}
      </div>
    </DashboardLayout>
  )
}
