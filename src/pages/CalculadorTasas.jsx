"use client"
import { useState, useEffect } from "react"
import "../styles/calculadorTasas.css"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { db } from "../firebaseconfig"
import { useAuth } from "../context/AuthContext" // Declare the useAuth variable

const CalculadorTasas = () => {
  const { user } = useAuth() // Acá deberías tener el uid del usuario logueado

  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userRef = doc(db, "users", user.uid)
        const userSnap = await getDoc(userRef)

        if (userSnap.exists()) {
          setUserData(userSnap.data())
        } else {
          console.log("No se encontró el usuario en Firestore")
        }
      } catch (error) {
        console.error("Error al cargar datos del usuario:", error)
      }
    }

    if (user?.uid) {
      loadUserData()
    }
  }, [user?.uid])

  const [showConfig, setShowConfig] = useState(false)
  const [configSaved, setConfigSaved] = useState(false)

  // Datos del vehículo
  const [vehicleData, setVehicleData] = useState({
    marca: "",
    modelo: "",
    año: new Date().getFullYear(),
    version: "",
    precioRevista: 0,
    precioManual: 0,
    usarPrecioManual: false,
  })

  // Configuración del simulador
  const [configs, setConfigs] = useState({
    prendario: {
      tasaAnual: 35, // % Anual
      cuotasMaximas: 60, // Cuotas máximas
      porcentajeMaximo: 80, // % máximo del valor del vehículo
      minAmount: 500000,
      maxAmount: 7000000,
      minTerm: 6,
      maxTerm: 60,
    },
  })

  // Cargar configuraciones desde Firebase al iniciar
  useEffect(() => {
    const loadConfigFromFirebase = async () => {
      try {
        const docRef = doc(db, "configuraciones", "simulador")
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const firebaseConfig = docSnap.data()
          setConfigs(firebaseConfig)
          console.log("Configuración cargada desde Firebase:", firebaseConfig)
        } else {
          // Si no existe, crear configuración por defecto
          await setDoc(docRef, configs)
          console.log("Configuración por defecto creada en Firebase")
        }
      } catch (error) {
        console.error("Error al cargar configuración:", error)
      }
    }

    loadConfigFromFirebase()
  }, [])

  const [loanData, setLoanData] = useState({
    amount: 0,
    term: 18,
    vehicleValue: 0,
  })

  const [results, setResults] = useState({})
  const [clientData, setClientData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
    email: "",
  })

  const [showClientForm, setShowClientForm] = useState(false)

  // Simulación de API INFOAUTO
  const buscarPrecioInfoauto = async (marca, modelo, año, version) => {
    // Simulación de llamada a API
    return new Promise((resolve) => {
      setTimeout(() => {
        // Precio simulado basado en los datos
        const precioBase = 2000000 + (año - 2010) * 100000
        const factorMarca = marca.toLowerCase().includes("toyota")
          ? 1.2
          : marca.toLowerCase().includes("ford")
            ? 1.1
            : 1.0
        resolve(Math.round(precioBase * factorMarca))
      }, 1000)
    })
  }

  // Buscar precio cuando cambien los datos del vehículo
  useEffect(() => {
    if (
      vehicleData.marca &&
      vehicleData.modelo &&
      vehicleData.año &&
      vehicleData.version &&
      !vehicleData.usarPrecioManual
    ) {
      buscarPrecioInfoauto(vehicleData.marca, vehicleData.modelo, vehicleData.año, vehicleData.version).then(
        (precio) => {
          setVehicleData((prev) => ({ ...prev, precioRevista: precio }))
          setLoanData((prev) => ({ ...prev, vehicleValue: precio }))
        },
      )
    }
  }, [vehicleData.marca, vehicleData.modelo, vehicleData.año, vehicleData.version, vehicleData.usarPrecioManual])

  // Actualizar valor del vehículo cuando se use precio manual
  useEffect(() => {
    if (vehicleData.usarPrecioManual) {
      setLoanData((prev) => ({ ...prev, vehicleValue: vehicleData.precioManual }))
    } else {
      setLoanData((prev) => ({ ...prev, vehicleValue: vehicleData.precioRevista }))
    }
  }, [vehicleData.usarPrecioManual, vehicleData.precioManual, vehicleData.precioRevista])

  // Calcular monto máximo basado en % del vehículo
  useEffect(() => {
    if (loanData.vehicleValue > 0) {
      const maxAmount = Math.round(loanData.vehicleValue * (configs.prendario.porcentajeMaximo / 100))
      if (loanData.amount > maxAmount) {
        setLoanData((prev) => ({ ...prev, amount: maxAmount }))
      }
    }
  }, [loanData.vehicleValue, configs.prendario.porcentajeMaximo])

  // Función para calcular préstamos (Sistema Francés)
  const calculateLoan = (amount, annualRate, termMonths) => {
    const monthlyRate = annualRate / 100 / 12
    const monthlyPayment =
      (amount * (monthlyRate * Math.pow(1 + monthlyRate, termMonths))) / (Math.pow(1 + monthlyRate, termMonths) - 1)
    const totalAmount = monthlyPayment * termMonths
    const totalInterest = totalAmount - amount

    return {
      monthlyPayment,
      totalInterest,
      totalAmount,
    }
  }

  // Recalcular cuando cambien los datos
  useEffect(() => {
    if (loanData.amount > 0 && loanData.term > 0) {
      const result = calculateLoan(loanData.amount, configs.prendario.tasaAnual, loanData.term)
      setResults(result)
    }
  }, [loanData, configs.prendario.tasaAnual])

  const updateLoanData = (field, value) => {
    setLoanData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const updateConfig = (field, value) => {
    setConfigs((prev) => ({
      ...prev,
      prendario: {
        ...prev.prendario,
        [field]: value,
      },
    }))
    setConfigSaved(false)
  }

  const updateVehicleData = (field, value) => {
    setVehicleData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const saveConfiguration = async () => {
    try {
      const docRef = doc(db, "configuraciones", "simulador")
      await setDoc(docRef, configs)

      console.log("Configuración guardada en Firebase:", configs)
      localStorage.setItem("loanConfigs", JSON.stringify(configs))
      setConfigSaved(true)
      setTimeout(() => setConfigSaved(false), 3000)
    } catch (error) {
      console.error("Error al guardar configuración:", error)
      alert("Error al guardar la configuración. Intente nuevamente.")
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getMaxLoanAmount = () => {
    if (loanData.vehicleValue > 0) {
      return Math.round(loanData.vehicleValue * (configs.prendario.porcentajeMaximo / 100))
    }
    return configs.prendario.maxAmount
  }

  const getSliderBackground = (value, min, max) => {
    const percent = ((value - min) / (max - min)) * 100
    return `linear-gradient(to right, #003226 0%, #003226 ${percent}%, #DBC5A8 ${percent}%, #DBC5A8 100%)`
  }

  // Generar PDF y enviar por WhatsApp
  const generarPDFyWhatsApp = async () => {
    if (!results.monthlyPayment) {
      alert("Por favor complete todos los datos del vehículo y simulación")
      return
    }

    try {
      // Importar jsPDF dinámicamente
      const jsPDF = (await import("jspdf")).default

      // Crear nuevo documento PDF
      const doc = new jsPDF()

      // Configurar fuente
      doc.setFont("helvetica")

      // Header - Logo y título
      doc.setFontSize(20)
      doc.setTextColor(26, 95, 63) // Verde corporativo
      doc.text("CRÉDITO PRENDARIO", 105, 30, { align: "center" })

      // Línea separadora
      doc.setDrawColor(26, 95, 63)
      doc.setLineWidth(0.5)
      doc.line(20, 35, 190, 35)

      // Datos del Vehículo
      doc.setFontSize(14)
      doc.setTextColor(0, 0, 0)
      doc.text("DATOS DEL VEHÍCULO", 20, 50)

      doc.setFontSize(11)
      const vehiculoInfo = [
        `Marca: ${vehicleData.marca}`,
        `Modelo: ${vehicleData.modelo}`,
        `Año: ${vehicleData.año}`,
        `Versión: ${vehicleData.version}`,
        `Valor del vehículo: ${formatCurrency(loanData.vehicleValue)}`,
      ]

      vehiculoInfo.forEach((info, index) => {
        doc.text(info, 25, 60 + index * 8)
      })

      // Datos del Préstamo
      doc.setFontSize(14)
      doc.text("DATOS DEL PRÉSTAMO", 20, 110)

      doc.setFontSize(11)
      const prestamoInfo = [
        `Monto del préstamo: ${formatCurrency(loanData.amount)}`,
        `Plazo en meses: ${loanData.term} meses`,
        `Tasa anual: ${configs.prendario.tasaAnual}%`,
      ]

      prestamoInfo.forEach((info, index) => {
        doc.text(info, 25, 120 + index * 8)
      })

      // Cuota Mensual - Destacada
      doc.setFillColor(240, 248, 244) // Verde claro
      doc.rect(20, 150, 170, 25, "F")

      doc.setFontSize(16)
      doc.setTextColor(26, 95, 63)
      doc.text("CUOTA MENSUAL", 105, 165, { align: "center" })

      doc.setFontSize(20)
      doc.text(formatCurrency(results.monthlyPayment), 105, 172, { align: "center" })

      // Información adicional
      doc.setFontSize(10)
      doc.setTextColor(100, 100, 100)
      doc.text("* Simulación sujeta a aprobación crediticia", 20, 190)
      doc.text("* Las condiciones pueden variar según evaluación", 20, 195)

      // Footer
      doc.setFontSize(12)
      doc.setTextColor(26, 95, 63)
      doc.text("Informe generado por Financiera Gaaman", 105, 220, { align: "center" })

      doc.setFontSize(10)
      doc.setTextColor(100, 100, 100)
      const fecha = new Date().toLocaleDateString("es-AR")
      doc.text(`Fecha: ${fecha}`, 105, 230, { align: "center" })

      // Línea final
      doc.line(20, 235, 190, 235)

      // Generar nombre del archivo
      const nombreArchivo = `Credito_Prendario_${vehicleData.marca}_${vehicleData.modelo}_${fecha.replace(/\//g, "-")}.pdf`

      // Descargar el PDF automáticamente
      doc.save(nombreArchivo)

      // Mensaje para WhatsApp con instrucciones
      const mensaje = `*CRÉDITO PRENDARIO*
    
*DATOS DEL VEHÍCULO*
• Marca: ${vehicleData.marca}
• Modelo: ${vehicleData.modelo}
• Año: ${vehicleData.año}
• Versión: ${vehicleData.version}
• Valor: ${formatCurrency(loanData.vehicleValue)}

*INFORME EN PDF:* ${nombreArchivo} se adjuntó al mensaje

_Informe generado por Financiera Gaaman_
¡Consultá por más información!`

      // Pequeño delay para asegurar que la descarga se inicie
      setTimeout(() => {
        // Abrir WhatsApp
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(mensaje)}`
        window.open(whatsappUrl, "_blank")

        // Mostrar instrucciones al usuario
        alert(
          `✅ PDF generado y descargado como: ${nombreArchivo}\n\n📱 WhatsApp se abrirá ahora.\n\n📎 Para enviar el PDF:\n1. Adjunta el archivo descargado al chat\n2. Envía el mensaje`,
        )
      }, 500)

      console.log("PDF generado y descargado:", nombreArchivo)
    } catch (error) {
      console.error("Error al generar PDF:", error)
      alert("Error al generar el PDF. Verifique que jsPDF esté instalado correctamente.")
    }
  }

  // Solicitar crédito
  const solicitarCredito = () => {
    if (!results.monthlyPayment) {
      alert("Por favor complete todos los datos del vehículo y simulación")
      return
    }
    setShowClientForm(true)
  }

  const enviarSolicitudCredito = () => {
    if (!clientData.nombre || !clientData.apellido || !clientData.dni || !clientData.telefono) {
      alert("Por favor complete todos los campos obligatorios")
      return
    }

    const solicitud = {
      cliente: clientData,
      vehiculo: vehicleData,
      prestamo: {
        monto: loanData.amount,
        plazo: loanData.term,
        cuotaMensual: results.monthlyPayment,
        totalAPagar: results.totalAmount,
      },
      fecha: new Date().toISOString(),
    }

    console.log("Solicitud de crédito enviada:", solicitud)
    alert("Solicitud de crédito enviada correctamente. Nos contactaremos pronto.")
    setShowClientForm(false)
    setClientData({
      nombre: "",
      apellido: "",
      dni: "",
      telefono: "",
      email: "",
    })
  }

  const isAdmin = userData?.rol === "admin"

  return (
    <div className="loan-calculator">
      {/* Header con configuración */}
      <div className="admin-header">
        <div className="admin-info">
        </div>
        {userData && isAdmin && (
          <button className={`config-button ${showConfig ? "active" : ""}`} onClick={() => setShowConfig(!showConfig)}>
            <span className="settings-icon">⚙️</span>
            Configuración
          </button>
        )}
      </div>

      {/* Panel de configuración */}
      {showConfig && userData && isAdmin && (
        <div className="config-panel">
          <div className="config-header">
            <h2>Configuración del Simulador</h2>
            <p>Ajusta los parámetros del crédito prendario</p>
          </div>
          <div className="config-content">
            <div className="config-grid">
              <div className="config-section">
                <h3>Crédito Prendario</h3>
                <div className="config-inputs">
                  <div className="input-group">
                    <label>% Anual</label>
                    <input
                      type="number"
                      step="0.1"
                      value={configs.prendario.tasaAnual}
                      onChange={(e) => updateConfig("tasaAnual", Number.parseFloat(e.target.value))}
                    />
                  </div>
                  <div className="input-group">
                    <label>Cuotas Máximas</label>
                    <input
                      type="number"
                      value={configs.prendario.cuotasMaximas}
                      onChange={(e) => updateConfig("cuotasMaximas", Number.parseInt(e.target.value))}
                    />
                  </div>
                  <div className="input-group">
                    <label>% Máximo del Valor del Vehículo</label>
                    <input
                      type="number"
                      value={configs.prendario.porcentajeMaximo}
                      onChange={(e) => updateConfig("porcentajeMaximo", Number.parseInt(e.target.value))}
                    />
                  </div>
                  <div className="input-group">
                    <label>Monto Mínimo</label>
                    <input
                      type="number"
                      value={configs.prendario.minAmount}
                      onChange={(e) => updateConfig("minAmount", Number.parseInt(e.target.value))}
                    />
                  </div>
                  <div className="input-group">
                    <label>Plazo Mínimo (meses)</label>
                    <input
                      type="number"
                      value={configs.prendario.minTerm}
                      onChange={(e) => updateConfig("minTerm", Number.parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="config-actions">
              <button className={`save-button ${configSaved ? "saved" : ""}`} onClick={saveConfiguration}>
                {configSaved ? "✅ Guardado" : " Guardar Configuración"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Datos del Vehículo */}
      <div className="simulator-container" style={{ marginBottom: "20px" }}>
        <div className="simulator-header">
          <div className="simulator-icon"></div>
          <div>
            <h1>Datos del Vehículo</h1>
            <p style={{ color: "#DBC5A8" }}>Ingresá los datos para obtener el precio de revista</p>
          </div>
        </div>

        <div className="simulator-controls">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            <div className="input-group">
              <label>Marca</label>
              <input
                type="text"
                value={vehicleData.marca}
                onChange={(e) => updateVehicleData("marca", e.target.value)}
                placeholder="Ej: Toyota"
                style={{ padding: "12px", border: "2px solid #e0e0e0", borderRadius: "8px", fontSize: "16px" }}
              />
            </div>
            <div className="input-group">
              <label>Modelo</label>
              <input
                type="text"
                value={vehicleData.modelo}
                onChange={(e) => updateVehicleData("modelo", e.target.value)}
                placeholder="Ej: Corolla"
                style={{ padding: "12px", border: "2px solid #e0e0e0", borderRadius: "8px", fontSize: "16px" }}
              />
            </div>
            <div className="input-group">
              <label>Año</label>
              <input
                type="number"
                min="1990"
                max={new Date().getFullYear() + 1}
                value={vehicleData.año}
                onChange={(e) => updateVehicleData("año", Number.parseInt(e.target.value))}
                style={{ padding: "12px", border: "2px solid #e0e0e0", borderRadius: "8px", fontSize: "16px" }}
              />
            </div>
            <div className="input-group">
              <label>Versión</label>
              <input
                type="text"
                value={vehicleData.version}
                onChange={(e) => updateVehicleData("version", e.target.value)}
                placeholder="Ej: XEI 1.8"
                style={{ padding: "12px", border: "2px solid #e0e0e0", borderRadius: "8px", fontSize: "16px" }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
            <div className="result-card">
              <div className="result-label">Precio de Revista (INFOAUTO)</div>
              <div className="result-amount">{formatCurrency(vehicleData.precioRevista)}</div>
            </div>
            <div>
              <div style={{ marginBottom: "10px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={vehicleData.usarPrecioManual}
                    onChange={(e) => updateVehicleData("usarPrecioManual", e.target.checked)}
                  />
                  Usar precio manual
                </label>
              </div>
              {vehicleData.usarPrecioManual && (
                <input
                  type="number"
                  value={vehicleData.precioManual}
                  onChange={(e) => updateVehicleData("precioManual", Number.parseInt(e.target.value))}
                  placeholder="Ingrese precio manual"
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "8px",
                    fontSize: "16px",
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Simulador de Crédito */}
      <div className="simulator-container">
        <div className="simulator-header">
          <div className="simulator-icon"></div>
          <div>
            <h1>Simulador de Crédito Prendario</h1>
            <p style={{ color: "#DBC5A8" }}>Calculá el monto de tus cuotas mensuales</p>
          </div>
        </div>

        {/* Controles del simulador */}
        <div className="simulator-controls">
          {/* Monto del préstamo */}
          <div className="control-group">
            <div className="control-header">
              <label>Monto del préstamo</label>
              <span className="control-value">{formatCurrency(loanData.amount)}</span>
            </div>
            <div className="slider-container">
              <input
                type="range"
                min={configs.prendario.minAmount}
                max={getMaxLoanAmount()}
                step="50000"
                value={loanData.amount}
                onChange={(e) => updateLoanData("amount", Number.parseInt(e.target.value))}
                className="slider amount-slider"
                style={{
                  background: getSliderBackground(loanData.amount, configs.prendario.minAmount, getMaxLoanAmount()),
                }}
              />
              <div className="slider-labels">
                <span>{formatCurrency(configs.prendario.minAmount)}</span>
                <span>{formatCurrency(getMaxLoanAmount())}</span>
              </div>
            </div>
            <div style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>
              Máximo: {configs.prendario.porcentajeMaximo}% del valor del vehículo
            </div>
          </div>

          {/* Plazo en meses */}
          <div className="control-group">
            <div className="control-header">
              <label>Plazo en meses</label>
              <span className="control-value">{loanData.term} meses</span>
            </div>
            <div className="slider-container">
              <input
                type="range"
                min={configs.prendario.minTerm}
                max={configs.prendario.cuotasMaximas}
                step="1"
                value={loanData.term}
                onChange={(e) => updateLoanData("term", Number.parseInt(e.target.value))}
                className="slider term-slider"
                style={{
                  background: getSliderBackground(
                    loanData.term,
                    configs.prendario.minTerm,
                    configs.prendario.cuotasMaximas,
                  ),
                }}
              />
              <div className="slider-labels">
                <span>{configs.prendario.minTerm} meses</span>
                <span>{configs.prendario.cuotasMaximas} meses</span>
              </div>
            </div>
          </div>
        </div>

        {/* Resultados */}
        {results.monthlyPayment && (
          <div className="results-section">
            <div className="result-cards">
              <div className="result-card">
                <div className="result-label">Cuota mensual</div>
                <div className="result-amount">{formatCurrency(results.monthlyPayment)}</div>
              </div>
              <div className="result-card">
                <div className="result-label">Tasa anual</div>
                <div className="result-amount">{configs.prendario.tasaAnual}%</div>
              </div>
            </div>

            {/* Botones de acción */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginTop: "20px" }}>
              <button className="solicitar-button" onClick={generarPDFyWhatsApp} style={{ background: "#25D366" }}>
                 Generar PDF y enviar por WhatsApp
              </button>
              <button className="solicitar-button" onClick={solicitarCredito}>
                 Solicitar Crédito
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal para datos del cliente */}
      {showClientForm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "15px",
              width: "90%",
              maxWidth: "500px",
              maxHeight: "90vh",
              overflow: "auto",
            }}
          >
            <h2 style={{ marginTop: 0, color: "#1a5f3f" }}>Datos del Cliente</h2>

            <div style={{ display: "grid", gap: "15px" }}>
              <div className="input-group">
                <label>Nombre *</label>
                <input
                  type="text"
                  value={clientData.nombre}
                  onChange={(e) => setClientData((prev) => ({ ...prev, nombre: e.target.value }))}
                  style={{ padding: "12px", border: "2px solid #e0e0e0", borderRadius: "8px", fontSize: "16px" }}
                />
              </div>

              <div className="input-group">
                <label>Apellido *</label>
                <input
                  type="text"
                  value={clientData.apellido}
                  onChange={(e) => setClientData((prev) => ({ ...prev, apellido: e.target.value }))}
                  style={{ padding: "12px", border: "2px solid #e0e0e0", borderRadius: "8px", fontSize: "16px" }}
                />
              </div>

              <div className="input-group">
                <label>DNI *</label>
                <input
                  type="text"
                  value={clientData.dni}
                  onChange={(e) => setClientData((prev) => ({ ...prev, dni: e.target.value }))}
                  style={{ padding: "12px", border: "2px solid #e0e0e0", borderRadius: "8px", fontSize: "16px" }}
                />
              </div>

              <div className="input-group">
                <label>Teléfono *</label>
                <input
                  type="tel"
                  value={clientData.telefono}
                  onChange={(e) => setClientData((prev) => ({ ...prev, telefono: e.target.value }))}
                  style={{ padding: "12px", border: "2px solid #e0e0e0", borderRadius: "8px", fontSize: "16px" }}
                />
              </div>

              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  value={clientData.email}
                  onChange={(e) => setClientData((prev) => ({ ...prev, email: e.target.value }))}
                  style={{ padding: "12px", border: "2px solid #e0e0e0", borderRadius: "8px", fontSize: "16px" }}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button className="solicitar-button" onClick={enviarSolicitudCredito} style={{ flex: 1 }}>
                Enviar Solicitud
              </button>
              <button className="config-button" onClick={() => setShowClientForm(false)} style={{ flex: 1 }}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CalculadorTasas
