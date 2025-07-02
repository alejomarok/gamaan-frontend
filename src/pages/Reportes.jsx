"use client"

import { useState, useEffect } from "react"
import { collection, getDocs } from "firebase/firestore"
import { Download, FileText, Filter, TrendingUp, DollarSign } from "lucide-react"
import { db } from "../firebaseconfig"
import '../styles/reportesPage.css' 

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"




export default function ReportesPage() {
  const [loading, setLoading] = useState(true)
  const [solicitudes, setSolicitudes] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(),
  })
  const [tipoFiltro, setTipoFiltro] = useState("todos")
  const [estadoFiltro, setEstadoFiltro] = useState("todos")
  const [activeTab, setActiveTab] = useState("solicitudes")

  // Cargar datos desde Firebase
  const cargarDatos = async () => {
    try {
      setLoading(true)
      const todasLasSolicitudes = []

      // Cargar créditos hipotecarios
      const hipotecariosRef = collection(db, "creditosHipotecarios")
      const hipotecariosSnapshot = await getDocs(hipotecariosRef)
      hipotecariosSnapshot.forEach((doc) => {
        const data = doc.data()
        todasLasSolicitudes.push({
          id: doc.id,
          tipo: "hipotecario",
          nombre: data.nombre || "",
          email: data.email || "",
          montoSolicitado: Number.parseInt(data.montoSolicitado) || 0,
          plazo: Number.parseInt(data.plazo) || 0,
          estado: data.estado || "pendiente",
          fechaCreacion: data.fechaCreacion || new Date().toISOString(),
          ...data,
        })
      })

      // Cargar créditos personales
      const personalesRef = collection(db, "creditosPersonales")
      const personalesSnapshot = await getDocs(personalesRef)
      personalesSnapshot.forEach((doc) => {
        const data = doc.data()
        todasLasSolicitudes.push({
          id: doc.id,
          tipo: "personal",
          nombre: data.nombre || "",
          email: data.email || "",
          montoSolicitado: Number.parseInt(data.montoSolicitado) || 0,
          plazo: Number.parseInt(data.plazo) || 0,
          estado: data.estado || "pendiente",
          fechaCreacion: data.fechaCreacion || new Date().toISOString(),
          ...data,
        })
      })

      // Cargar créditos prendarios
      const prendariosRef = collection(db, "creditosPrendarios")
      const prendariosSnapshot = await getDocs(prendariosRef)
      prendariosSnapshot.forEach((doc) => {
        const data = doc.data()
        todasLasSolicitudes.push({
          id: doc.id,
          tipo: "prendario",
          nombre: data.nombre || "",
          email: data.email || "",
          montoSolicitado: Number.parseInt(data.montoSolicitado) || 0,
          plazo: Number.parseInt(data.plazo) || 0,
          estado: data.estado || "pendiente",
          fechaCreacion: data.fechaCreacion || new Date().toISOString(),
          ...data,
        })
      })

      setSolicitudes(todasLasSolicitudes)
      setFilteredData(todasLasSolicitudes)
    } catch (error) {
      console.error("Error cargando datos:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    cargarDatos()
  }, [])

  // Aplicar filtros
  useEffect(() => {
    let filtered = [...solicitudes]

    // Filtro por tipo
    if (tipoFiltro !== "todos") {
      filtered = filtered.filter((item) => item.tipo === tipoFiltro)
    }

    // Filtro por estado
    if (estadoFiltro !== "todos") {
      filtered = filtered.filter((item) => item.estado === estadoFiltro)
    }

    // Filtro por fecha
    if (dateRange.from && dateRange.to) {
      filtered = filtered.filter((item) => {
        const fecha = new Date(item.fechaCreacion)
        return fecha >= dateRange.from && fecha <= dateRange.to
      })
    }

    setFilteredData(filtered)
  }, [solicitudes, tipoFiltro, estadoFiltro, dateRange])

  // Calcular estadísticas
  const calcularEstadisticas = () => {
    const total = filteredData.length
    const aprobadas = filteredData.filter((s) => s.estado === "aprobada").length
    const rechazadas = filteredData.filter((s) => s.estado === "rechazada").length
    const pendientes = filteredData.filter((s) => s.estado === "pendiente").length
    const montoTotal = filteredData
      .filter((s) => s.estado === "aprobada")
      .reduce((sum, s) => sum + s.montoSolicitado, 0)
    const tasaAprobacion = total > 0 ? ((aprobadas / total) * 100).toFixed(1) : 0

    return {
      total,
      aprobadas,
      rechazadas,
      pendientes,
      montoTotal,
      tasaAprobacion,
    }
  }

  // Datos para gráfico de barras (por mes)
  const generarDatosBarChart = () => {
    const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
    const datosPorMes = {}

    // Inicializar meses
    meses.forEach((mes) => {
      datosPorMes[mes] = { name: mes, solicitudes: 0, aprobados: 0, rechazados: 0 }
    })

    // Contar solicitudes por mes
    filteredData.forEach((solicitud) => {
      const fecha = new Date(solicitud.fechaCreacion)
      const mes = meses[fecha.getMonth()]

      if (datosPorMes[mes]) {
        datosPorMes[mes].solicitudes++
        if (solicitud.estado === "aprobada") datosPorMes[mes].aprobados++
        if (solicitud.estado === "rechazada") datosPorMes[mes].rechazados++
      }
    })

    return Object.values(datosPorMes)
  }

  // Datos para gráfico de torta (distribución por tipo)
  const generarDatosPieChart = () => {
    const tipos = {
      hipotecario: { name: "Hipotecario", value: 0, color: "#1a5f3f" },
      personal: { name: "Personal", value: 0, color: "#2d7a57" },
      prendario: { name: "Prendario", value: 0, color: "#4a9d6f" },
    }

    filteredData.forEach((solicitud) => {
      if (tipos[solicitud.tipo]) {
        tipos[solicitud.tipo].value++
      }
    })

    return Object.values(tipos).filter((tipo) => tipo.value > 0)
  }

  // Datos para gráfico de líneas (montos por mes)
  const generarDatosLineChart = () => {
    const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
    const montosPorMes = {}

    // Inicializar meses
    meses.forEach((mes) => {
      montosPorMes[mes] = { name: mes, monto: 0 }
    })

    // Sumar montos aprobados por mes
    filteredData
      .filter((s) => s.estado === "aprobada")
      .forEach((solicitud) => {
        const fecha = new Date(solicitud.fechaCreacion)
        const mes = meses[fecha.getMonth()]

        if (montosPorMes[mes]) {
          montosPorMes[mes].monto += solicitud.montoSolicitado
        }
      })

    return Object.values(montosPorMes)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const exportarDatos = () => {
    const csvContent = [
      ["ID", "Tipo", "Nombre", "Email", "Monto", "Estado", "Fecha"].join(","),
      ...filteredData.map((item) =>
        [
          item.id,
          item.tipo,
          item.nombre,
          item.email,
          item.montoSolicitado,
          item.estado,
          new Date(item.fechaCreacion).toLocaleDateString(),
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `reportes_${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const estadisticas = calcularEstadisticas()
  const barChartData = generarDatosBarChart()
  const pieChartData = generarDatosPieChart()
  const lineChartData = generarDatosLineChart()

  if (loading) {
    return (
      <div className="reportes-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando reportes desde Firebase...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="reportes-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Reportes y Estadísticas</h1>
          <p>Visualiza el rendimiento de tu cartera de créditos</p>
        </div>
        <div className="header-actions">
          <button className="filter-button" onClick={() => window.location.reload()}>
            <Filter size={16} />
            Actualizar
          </button>
          <button className="export-button" onClick={exportarDatos}>
            <Download size={16} />
            Exportar CSV
          </button>
        </div>
      </div>

      {/* Cards de estadísticas */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Total Solicitudes</span>
            <FileText className="stat-icon" />
          </div>
          <div className="stat-content">
            <div className="stat-value">{estadisticas.total}</div>
            <p className="stat-description">{estadisticas.pendientes} pendientes</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Monto Total Otorgado</span>
            <DollarSign className="stat-icon" />
          </div>
          <div className="stat-content">
            <div className="stat-value">{formatCurrency(estadisticas.montoTotal)}</div>
            <p className="stat-description">{estadisticas.aprobadas} créditos aprobados</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Tasa de Aprobación</span>
            <TrendingUp className="stat-icon" />
          </div>
          <div className="stat-content">
            <div className="stat-value">{estadisticas.tasaAprobacion}%</div>
            <p className="stat-description">{estadisticas.rechazadas} rechazadas</p>
          </div>
        </div>
      </div>

      {/* Filtros y gráfico de líneas */}
      <div className="charts-row">
        <div className="filters-card">
          <div className="card-header">
            <h3>Filtros</h3>
            <p>Personaliza tu vista de datos</p>
          </div>
          <div className="filters-content">
            <div className="filter-group">
              <label>Tipo de crédito</label>
              <select value={tipoFiltro} onChange={(e) => setTipoFiltro(e.target.value)} className="filter-select">
                <option value="todos">Todos</option>
                <option value="hipotecario">Hipotecario</option>
                <option value="personal">Personal</option>
                <option value="prendario">Prendario</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Estado</label>
              <select value={estadoFiltro} onChange={(e) => setEstadoFiltro(e.target.value)} className="filter-select">
                <option value="todos">Todos</option>
                <option value="aprobada">Aprobados</option>
                <option value="rechazada">Rechazados</option>
                <option value="pendiente">Pendientes</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Período</label>
              <select
                onChange={(e) => {
                  const value = e.target.value
                  const now = new Date()
                  let from = new Date()

                  switch (value) {
                    case "7d":
                      from.setDate(now.getDate() - 7)
                      break
                    case "30d":
                      from.setDate(now.getDate() - 30)
                      break
                    case "90d":
                      from.setDate(now.getDate() - 90)
                      break
                    case "1y":
                      from.setFullYear(now.getFullYear() - 1)
                      break
                    default:
                      from = new Date(now.getFullYear(), 0, 1)
                  }

                  setDateRange({ from, to: now })
                }}
                className="filter-select"
              >
                <option value="all">Todo el tiempo</option>
                <option value="7d">Últimos 7 días</option>
                <option value="30d">Últimos 30 días</option>
                <option value="90d">Últimos 90 días</option>
                <option value="1y">Último año</option>
              </select>
            </div>
          </div>
        </div>

        <div className="chart-card">
          <div className="card-header">
            <h3>Montos Otorgados</h3>
            <p>Evolución mensual de montos aprobados</p>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Line
                  type="monotone"
                  dataKey="monto"
                  name="Monto Otorgado"
                  stroke="#1a5f3f"
                  strokeWidth={3}
                  dot={{ fill: "#1a5f3f", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tabs con gráficos */}
      <div className="tabs-container">
        <div className="tabs-header">
          <button
            className={`tab-button ${activeTab === "solicitudes" ? "active" : ""}`}
            onClick={() => setActiveTab("solicitudes")}
          >
            Solicitudes
          </button>
          <button
            className={`tab-button ${activeTab === "distribucion" ? "active" : ""}`}
            onClick={() => setActiveTab("distribucion")}
          >
            Distribución
          </button>
          <button
            className={`tab-button ${activeTab === "rendimiento" ? "active" : ""}`}
            onClick={() => setActiveTab("rendimiento")}
          >
            Rendimiento
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "solicitudes" && (
            <div className="chart-card">
              <div className="card-header">
                <h3>Solicitudes por Mes</h3>
                <p>Comparativa de solicitudes recibidas vs. aprobadas vs. rechazadas</p>
              </div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="solicitudes" name="Solicitudes" fill="#1a5f3f" />
                    <Bar dataKey="aprobados" name="Aprobados" fill="#2d7a57" />
                    <Bar dataKey="rechazados" name="Rechazados" fill="#4a9d6f" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === "distribucion" && (
            <div className="chart-card">
              <div className="card-header">
                <h3>Distribución por Tipo de Crédito</h3>
                <p>Porcentaje de solicitudes por tipo</p>
              </div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === "rendimiento" && (
            <div className="chart-card">
              <div className="card-header">
                <h3>Análisis de Rendimiento</h3>
                <p>Métricas clave de tu cartera de créditos</p>
              </div>
              <div className="rendimiento-grid">
                <div className="rendimiento-item">
                  <h4>Promedio de Monto</h4>
                  <div className="rendimiento-value">
                    {formatCurrency(estadisticas.total > 0 ? estadisticas.montoTotal / estadisticas.aprobadas : 0)}
                  </div>
                </div>
                <div className="rendimiento-item">
                  <h4>Solicitudes por Día</h4>
                  <div className="rendimiento-value">{(estadisticas.total / 30).toFixed(1)}</div>
                </div>
                <div className="rendimiento-item">
                  <h4>Tiempo Promedio</h4>
                  <div className="rendimiento-value">2.5 días</div>
                </div>
                <div className="rendimiento-item">
                  <h4>Satisfacción</h4>
                  <div className="rendimiento-value">94%</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
