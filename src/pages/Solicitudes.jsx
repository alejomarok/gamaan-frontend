import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, doc, updateDoc, addDoc, query, where } from 'firebase/firestore';
import '../styles/solicitudesPages.css';
import { db } from '../firebaseconfig'; 
import emailjs from '@emailjs/browser';


// Configuración de EmailJS
const EMAILJS_CONFIG = {
  serviceId: 'service_envioMail', // Reemplaza con tu Service ID
  templateId: 'template_cd13cwr', // Reemplaza con tu Template ID
  publicKey: '3wUdwFaJauhwPBn7I' // Reemplaza con tu Public Key
};

// Inicializar EmailJS
emailjs.init(EMAILJS_CONFIG.publicKey)

const SolicitudesPage = () => {
  const [solicitudes, setSolicitudes] = useState([])
  const [filteredSolicitudes, setFilteredSolicitudes] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSolicitudes, setSelectedSolicitudes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showActionMenu, setShowActionMenu] = useState(null)
  const [showDetalles, setShowDetalles] = useState(null)

  // Cargar solicitudes desde Firebase
  const cargarSolicitudes = async () => {
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
          dni: data.dni || "",
          email: data.email || "",
          telefono: data.telefono || "",
          montoSolicitado: Number.parseInt(data.montoSolicitado) || 0,
          plazo: Number.parseInt(data.plazo) || 0,
          ingresos: Number.parseInt(data.ingresos) || 0,
          observaciones: data.observaciones || "",
          estado: data.estado || "pendiente",
          fechaCreacion: data.fechaCreacion || new Date().toISOString(),
          // Campos específicos hipotecario
          tipoPropiedad: data.tipoPropiedad || "",
          ubicacion: data.ubicacion || "",
          valorPropiedad: data.valorPropiedad || "",
          motivoRechazo: data.motivoRechazo || "",
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
          dni: data.dni || "",
          email: data.email || "",
          telefono: data.telefono || "",
          montoSolicitado: Number.parseInt(data.montoSolicitado) || 0,
          plazo: Number.parseInt(data.plazo) || 0,
          ingresos: Number.parseInt(data.ingresos) || 0,
          observaciones: data.observaciones || "",
          estado: data.estado || "pendiente",
          fechaCreacion: data.fechaCreacion || new Date().toISOString(),
          // Campos específicos personal
          destino: data.destino || "",
          situacionLaboral: data.situacionLaboral || "",
          motivoRechazo: data.motivoRechazo || "",
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
          dni: data.dni || "",
          email: data.email || "",
          telefono: data.telefono || "",
          montoSolicitado: Number.parseInt(data.montoSolicitado) || 0,
          plazo: Number.parseInt(data.plazo) || 0,
          ingresos: Number.parseInt(data.ingresos) || 0,
          observaciones: data.observaciones || "",
          estado: data.estado || "pendiente",
          fechaCreacion: data.fechaCreacion || new Date().toISOString(),
          // Campos específicos prendario
          marca: data.marca || "",
          modelo: data.modelo || "",
          año: data.año || "",
          tipoVehiculo: data.tipoVehiculo || "",
          motivoRechazo: data.motivoRechazo || "",
          ...data,
        })
      })

      // Ordenar por fecha más reciente
      todasLasSolicitudes.sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion))

      setSolicitudes(todasLasSolicitudes)
      setFilteredSolicitudes(todasLasSolicitudes)
    } catch (error) {
      console.error("Error cargando solicitudes:", error)
      alert("Error al cargar las solicitudes: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    cargarSolicitudes()
  }, [])

  useEffect(() => {
    // Filtrar solicitudes
    const filtered = solicitudes.filter(
      (solicitud) =>
        solicitud.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        solicitud.dni.includes(searchTerm) ||
        solicitud.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        solicitud.email.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredSolicitudes(filtered)
  }, [searchTerm, solicitudes])

  // Función para enviar email con EmailJS - CORREGIDA
  const enviarEmail = async (solicitud, accion) => {
    try {
      const templateParams = {
        // Datos del cliente
        nombre_cliente: solicitud.nombre,
        email_cliente: solicitud.email, // Email del cliente
        dni_cliente: solicitud.dni,

        // Datos de la solicitud
        id_solicitud: solicitud.id.substring(0, 8),
        tipo_credito: solicitud.tipo.charAt(0).toUpperCase() + solicitud.tipo.slice(1),
        monto_formateado: formatCurrency(solicitud.montoSolicitado),
        plazo: solicitud.plazo,
        estado_solicitud: accion,
        observaciones: solicitud.observaciones || "",
        motivo_rechazo: solicitud.motivoRechazo || "",

        // Flags para mostrar secciones específicas
        es_aprobada: accion === "aprobada",
        es_rechazada: accion === "rechazada",
        es_revision: accion === "en revisión",

        // Datos de la empresa
        empresa_nombre: "Tu Empresa de Créditos",
        telefono_empresa: "0800-123-4567",
        email_empresa: "creditos@tuempresa.com",
        web_empresa: "www.tuempresa.com",

        // Email de destino - CORREGIDO: ahora va al cliente
        to_email: solicitud.email, // ✅ Email del cliente, no tuyo
        to_name: solicitud.nombre,
      }

      console.log("Enviando email a:", solicitud.email) // Para debug
      console.log("Parámetros del template:", templateParams)

      const response = await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams)

      console.log("Email enviado exitosamente a:", solicitud.email, response)
      return true
    } catch (error) {
      console.error("Error enviando email:", error)

      // Mostrar error específico
      if (error.status === 400) {
        alert("Error: Configuración de EmailJS incorrecta. Revisa Service ID y Template ID.")
      } else if (error.status === 402) {
        alert("Error: Límite de emails alcanzado en EmailJS.")
      } else if (error.status === 403) {
        alert("Error: Public Key de EmailJS incorrecta.")
      } else {
        alert("Error enviando email: " + (error.text || error.message))
      }

      return false
    }
  }

  // Función para verificar si usuario existe - CORREGIDA
  const verificarUsuarioExiste = async (email) => {
    try {
      // Buscar por email en lugar de DNI
      const usuariosRef = collection(db, "users")
      const q = query(usuariosRef, where("email", "==", email))
      const querySnapshot = await getDocs(q)

      return !querySnapshot.empty
    } catch (error) {
      console.error("Error verificando usuario:", error)
      return false
    }
  }

  // Función para crear usuario - ESTRUCTURA CORREGIDA
  const crearUsuario = async (solicitud) => {
    try {
      // Separar nombre completo en firstName y lastName
      const nombreCompleto = solicitud.nombre.trim().split(" ")
      const firstName = nombreCompleto[0] || ""
      const lastName = nombreCompleto.slice(1).join(" ") || ""

      const nuevoUsuario = {
        // ✅ Estructura exacta que necesitas
        email: solicitud.email,
        firstName: firstName,
        lastName: lastName,
        password: "Admin1234", // Password por defecto
        phone: solicitud.telefono,
        rol: "Cliente",

        // Campos adicionales útiles
        dni: solicitud.dni,
        ingresos: solicitud.ingresos,
        fechaRegistro: new Date().toISOString(),
        estado: "activo",
        creditosAprobados: [
          {
            id: solicitud.id,
            tipo: solicitud.tipo,
            monto: solicitud.montoSolicitado,
            plazo: solicitud.plazo,
            fechaAprobacion: new Date().toISOString(),
          },
        ],
      }

      const usuariosRef = collection(db, "users")
      const docRef = await addDoc(usuariosRef, nuevoUsuario)

      console.log("Usuario creado con ID:", docRef.id)
      console.log("Datos del usuario:", nuevoUsuario)
      return true
    } catch (error) {
      console.error("Error creando usuario:", error)
      return false
    }
  }

  // Función para actualizar estado
  const actualizarEstado = async (solicitud, nuevoEstado, datosAdicionales = {}) => {
    try {
      const coleccion = `creditos${solicitud.tipo.charAt(0).toUpperCase() + solicitud.tipo.slice(1)}s`
      const docRef = doc(db, coleccion, solicitud.id)

      const updateData = {
        estado: nuevoEstado,
        fechaActualizacion: new Date().toISOString(),
        ...datosAdicionales,
        ...(nuevoEstado === "aprobada" && { fechaAprobacion: new Date().toISOString() }),
      }

      await updateDoc(docRef, updateData)

      // Actualizar estado local
      setSolicitudes((prev) =>
        prev.map((sol) => (sol.id === solicitud.id ? { ...sol, estado: nuevoEstado, ...datosAdicionales } : sol)),
      )

      return true
    } catch (error) {
      console.error("Error actualizando estado:", error)
      return false
    }
  }

  // Función principal para aprobar
  const aprobarSolicitud = async (solicitud) => {
    const confirmacion = window.confirm(
      `¿Estás seguro de aprobar la solicitud de ${solicitud.nombre}?\n\n` +
        `Tipo: ${solicitud.tipo}\n` +
        `Monto: ${formatCurrency(solicitud.montoSolicitado)}\n` +
        `Email: ${solicitud.email}\n\n` +
        `Se enviará un email de confirmación a: ${solicitud.email}`,
    )

    if (!confirmacion) return

    try {
      setLoading(true)

      // 1. Actualizar estado
      const estadoActualizado = await actualizarEstado(solicitud, "aprobada")
      if (!estadoActualizado) {
        throw new Error("Error actualizando estado en Firebase")
      }

      // 2. Verificar y crear usuario si es necesario (buscar por email)
      const usuarioExiste = await verificarUsuarioExiste(solicitud.email)
      let usuarioCreado = false

      if (!usuarioExiste) {
        usuarioCreado = await crearUsuario(solicitud)
      }

      // 3. Enviar email al cliente
      const emailEnviado = await enviarEmail(solicitud, "aprobada")

      // 4. Mostrar resultado
      let mensaje = `✅ Solicitud ${solicitud.id.substring(0, 8)} aprobada exitosamente.`

      if (usuarioCreado) {
        mensaje += "\n👤 Usuario creado automáticamente."
      } else {
        mensaje += "\n👤 Usuario ya existía en el sistema."
      }

      if (emailEnviado) {
        mensaje += `\n📧 Email de confirmación enviado a: ${solicitud.email}`
      } else {
        mensaje += "\n⚠️ Error enviando email (solicitud aprobada correctamente)."
      }

      alert(mensaje)
    } catch (error) {
      console.error("Error aprobando solicitud:", error)
      alert("❌ Error al aprobar la solicitud: " + error.message)
    } finally {
      setLoading(false)
      setShowActionMenu(null)
    }
  }

  // Función para rechazar
  const rechazarSolicitud = async (solicitud) => {
    const motivo = prompt(
      `¿Por qué se rechaza la solicitud de ${solicitud.nombre}?\n\n` +
        `Esta información se incluirá en el email de notificación:`,
    )

    if (motivo === null) return // Usuario canceló

    const confirmacion = window.confirm(
      `¿Confirmas el rechazo de la solicitud?\n\n` +
        `Cliente: ${solicitud.nombre}\n` +
        `Email: ${solicitud.email}\n` +
        `Motivo: ${motivo}\n\n` +
        `Se enviará un email de notificación.`,
    )

    if (!confirmacion) return

    try {
      setLoading(true)

      // Actualizar con motivo de rechazo
      const estadoActualizado = await actualizarEstado(solicitud, "rechazada", {
        motivoRechazo: motivo,
      })

      if (!estadoActualizado) {
        throw new Error("Error actualizando estado en Firebase")
      }

      // Enviar email con motivo
      const solicitudConMotivo = { ...solicitud, motivoRechazo: motivo }
      const emailEnviado = await enviarEmail(solicitudConMotivo, "rechazada")

      let mensaje = `❌ Solicitud ${solicitud.id.substring(0, 8)} rechazada.`
      if (emailEnviado) {
        mensaje += `\n📧 Email de notificación enviado a: ${solicitud.email}`
      } else {
        mensaje += "\n⚠️ Error enviando email (solicitud rechazada correctamente)."
      }

      alert(mensaje)
    } catch (error) {
      console.error("Error rechazando solicitud:", error)
      alert("❌ Error al rechazar la solicitud: " + error.message)
    } finally {
      setLoading(false)
      setShowActionMenu(null)
    }
  }

  // Función para marcar en revisión
  const marcarEnRevision = async (solicitud) => {
    const observacion = prompt(
      `Solicitud de ${solicitud.nombre} marcada en revisión.\n\n` + `Observaciones adicionales (opcional):`,
    )

    if (observacion === null) return // Usuario canceló

    try {
      setLoading(true)

      const datosAdicionales = observacion ? { observacionRevision: observacion } : {}
      const estadoActualizado = await actualizarEstado(solicitud, "revision", datosAdicionales)

      if (!estadoActualizado) {
        throw new Error("Error actualizando estado en Firebase")
      }

      const emailEnviado = await enviarEmail(solicitud, "en revisión")

      let mensaje = `⏳ Solicitud ${solicitud.id.substring(0, 8)} marcada en revisión.`
      if (emailEnviado) {
        mensaje += `\n📧 Email de notificación enviado a: ${solicitud.email}`
      }

      alert(mensaje)
    } catch (error) {
      console.error("Error marcando en revisión:", error)
      alert("❌ Error al marcar en revisión: " + error.message)
    } finally {
      setLoading(false)
      setShowActionMenu(null)
    }
  }


  const handleSelectSolicitud = (solicitudId) => {
    setSelectedSolicitudes((prev) =>
      prev.includes(solicitudId) ? prev.filter((id) => id !== solicitudId) : [...prev, solicitudId],
    )
  }

  const handleSelectAll = () => {
    if (selectedSolicitudes.length === filteredSolicitudes.length) {
      setSelectedSolicitudes([])
    } else {
      setSelectedSolicitudes(filteredSolicitudes.map((sol) => sol.id))
    }
  }

  const getEstadoBadge = (estado) => {
    const badges = {
      pendiente: { class: "badge-pendiente", text: "Pendiente" },
      aprobada: { class: "badge-aprobada", text: "Aprobada" },
      rechazada: { class: "badge-rechazada", text: "Rechazada" },
      revision: { class: "badge-revision", text: "En revisión" },
    }

    const badge = badges[estado] || badges.pendiente
    return <span className={`badge ${badge.class}`}>{badge.text}</span>
  }

  const getTipoBadge = (tipo) => {
    const badges = {
      hipotecario: { class: "tipo-hipotecario", text: "Hipotecario", icon: "🏠" },
      personal: { class: "tipo-personal", text: "Personal", icon: "👤" },
      prendario: { class: "tipo-prendario", text: "Prendario", icon: "🚗" },
    }

    const badge = badges[tipo] || badges.personal
    return (
      <span className={`tipo-badge ${badge.class}`}>
        {badge.icon} {badge.text}
      </span>
    )
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("es-AR")
    } catch {
      return "N/A"
    }
  }

  // Modal de detalles
  const DetallesModal = ({ solicitud, onClose }) => {
    if (!solicitud) return null

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Detalles de Solicitud</h2>
            <button className="modal-close" onClick={onClose}>
              ×
            </button>
          </div>
          <div className="modal-body">
            <div className="detalles-grid">
              <div className="detalle-section">
                <h3>Información Personal</h3>
                <p>
                  <strong>Nombre:</strong> {solicitud.nombre}
                </p>
                <p>
                  <strong>DNI:</strong> {solicitud.dni}
                </p>
                <p>
                  <strong>Email:</strong> {solicitud.email}
                </p>
                <p>
                  <strong>Teléfono:</strong> {solicitud.telefono}
                </p>
                <p>
                  <strong>Ingresos:</strong> {formatCurrency(solicitud.ingresos)}
                </p>
              </div>

              <div className="detalle-section">
                <h3>Información del Crédito</h3>
                <p>
                  <strong>ID:</strong> {solicitud.id}
                </p>
                <p>
                  <strong>Tipo:</strong> {getTipoBadge(solicitud.tipo)}
                </p>
                <p>
                  <strong>Monto:</strong> {formatCurrency(solicitud.montoSolicitado)}
                </p>
                <p>
                  <strong>Plazo:</strong> {solicitud.plazo} meses
                </p>
                <p>
                  <strong>Estado:</strong> {getEstadoBadge(solicitud.estado)}
                </p>
                <p>
                  <strong>Fecha:</strong> {formatDate(solicitud.fechaCreacion)}
                </p>
              </div>

              {solicitud.tipo === "hipotecario" && (
                <div className="detalle-section">
                  <h3>Información de Propiedad</h3>
                  <p>
                    <strong>Tipo:</strong> {solicitud.tipoPropiedad}
                  </p>
                  <p>
                    <strong>Ubicación:</strong> {solicitud.ubicacion}
                  </p>
                  <p>
                    <strong>Valor:</strong> {formatCurrency(Number.parseInt(solicitud.valorPropiedad) || 0)}
                  </p>
                </div>
              )}

              {solicitud.tipo === "personal" && (
                <div className="detalle-section">
                  <h3>Información Laboral</h3>
                  <p>
                    <strong>Situación:</strong> {solicitud.situacionLaboral}
                  </p>
                  <p>
                    <strong>Destino:</strong> {solicitud.destino}
                  </p>
                </div>
              )}

              {solicitud.tipo === "prendario" && (
                <div className="detalle-section">
                  <h3>Información del Vehículo</h3>
                  <p>
                    <strong>Tipo:</strong> {solicitud.tipoVehiculo}
                  </p>
                  <p>
                    <strong>Marca:</strong> {solicitud.marca}
                  </p>
                  <p>
                    <strong>Modelo:</strong> {solicitud.modelo}
                  </p>
                  <p>
                    <strong>Año:</strong> {solicitud.año}
                  </p>
                </div>
              )}

              {solicitud.observaciones && (
                <div className="detalle-section full-width">
                  <h3>Observaciones</h3>
                  <p>{solicitud.observaciones}</p>
                </div>
              )}

              {solicitud.motivoRechazo && (
                <div className="detalle-section full-width">
                  <h3>Motivo de Rechazo</h3>
                  <p style={{ color: "var(--red-primary)" }}>{solicitud.motivoRechazo}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="solicitudes-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando solicitudes desde Firebase...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="solicitudes-page">
      <div className="page-header">
        <div className="header-actions">
          <button className="refresh-button" onClick={cargarSolicitudes}>
             Actualizar
          </button>
        </div>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar por nombre, DNI, ID o email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {filteredSolicitudes.length > 0 && (
          <span className="search-results">
            {filteredSolicitudes.length} solicitud{filteredSolicitudes.length !== 1 ? "es" : ""} encontrada
            {filteredSolicitudes.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      <div className="table-container">
        <table className="solicitudes-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedSolicitudes.length === filteredSolicitudes.length && filteredSolicitudes.length > 0}
                  onChange={handleSelectAll}
                />
              </th>
              <th>ID</th>
              <th>Tipo</th>
              <th>Nombre</th>
              <th>DNI</th>
              <th>Email</th>
              <th>Monto</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredSolicitudes.map((solicitud) => (
              <tr key={solicitud.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedSolicitudes.includes(solicitud.id)}
                    onChange={() => handleSelectSolicitud(solicitud.id)}
                  />
                </td>
                <td className="id-cell">{solicitud.id.substring(0, 8)}...</td>
                <td>{getTipoBadge(solicitud.tipo)}</td>
                <td className="nombre-cell">{solicitud.nombre}</td>
                <td>{solicitud.dni}</td>
                <td className="email-cell">{solicitud.email}</td>
                <td className="monto-cell">{formatCurrency(solicitud.montoSolicitado)}</td>
                <td>{formatDate(solicitud.fechaCreacion)}</td>
                <td>{getEstadoBadge(solicitud.estado)}</td>
                <td className="acciones-cell">
                  <div className="acciones-container">
                    <button
                      className="acciones-button"
                      onClick={() => setShowActionMenu(showActionMenu === solicitud.id ? null : solicitud.id)}
                    >
                      ⋯
                    </button>
                    {showActionMenu === solicitud.id && (
                      <div className="acciones-menu">
                        <button
                          onClick={() => {
                            setShowDetalles(solicitud)
                            setShowActionMenu(null)
                          }}
                        >
                          👁 Ver detalles
                        </button>
                        {solicitud.estado !== "aprobada" && (
                          <button onClick={() => aprobarSolicitud(solicitud)} className="aprobar-btn">
                            ✓ Aprobar
                          </button>
                        )}
                        {solicitud.estado !== "rechazada" && (
                          <button onClick={() => rechazarSolicitud(solicitud)} className="rechazar-btn">
                            ✗ Rechazar
                          </button>
                        )}
                        {solicitud.estado !== "revision" && (
                          <button onClick={() => marcarEnRevision(solicitud)} className="revision-btn">
                            ⏳ Marcar en revisión
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredSolicitudes.length === 0 && !loading && (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>No se encontraron solicitudes</h3>
          <p>No hay solicitudes que coincidan con tu búsqueda.</p>
        </div>
      )}

      {showDetalles && <DetallesModal solicitud={showDetalles} onClose={() => setShowDetalles(null)} />}
    </div>
  )
}

export default SolicitudesPage
