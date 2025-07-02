"use client"

import { useState, useEffect } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebaseconfig"

export default function ReportesDebug() {
  const [loading, setLoading] = useState(true)
  const [debugInfo, setDebugInfo] = useState({})

  const debugFirebase = async () => {
    try {
      setLoading(true)
      const debug = {
        hipotecarios: [],
        personales: [],
        prendarios: [],
        errores: [],
      }

      // Debug créditos hipotecarios
      try {
        const hipotecariosRef = collection(db, "creditosHipotecarios")
        const hipotecariosSnapshot = await getDocs(hipotecariosRef)

        console.log("📊 Hipotecarios encontrados:", hipotecariosSnapshot.size)

        hipotecariosSnapshot.forEach((doc) => {
          const data = doc.data()
          debug.hipotecarios.push({
            id: doc.id,
            data: data,
            fechaCreacion: data.fechaCreacion,
            fechaTipo: typeof data.fechaCreacion,
            fechaValida: data.fechaCreacion ? new Date(data.fechaCreacion).toString() : "FECHA INVÁLIDA",
          })
        })
      } catch (error) {
        debug.errores.push(`Error hipotecarios: ${error.message}`)
      }

      // Debug créditos personales
      try {
        const personalesRef = collection(db, "creditosPersonales")
        const personalesSnapshot = await getDocs(personalesRef)

        console.log("👤 Personales encontrados:", personalesSnapshot.size)

        personalesSnapshot.forEach((doc) => {
          const data = doc.data()
          debug.personales.push({
            id: doc.id,
            data: data,
            fechaCreacion: data.fechaCreacion,
            fechaTipo: typeof data.fechaCreacion,
            fechaValida: data.fechaCreacion ? new Date(data.fechaCreacion).toString() : "FECHA INVÁLIDA",
          })
        })
      } catch (error) {
        debug.errores.push(`Error personales: ${error.message}`)
      }

      // Debug créditos prendarios
      try {
        const prendariosRef = collection(db, "creditosPrendarios")
        const prendariosSnapshot = await getDocs(prendariosRef)

        console.log("🚗 Prendarios encontrados:", prendariosSnapshot.size)

        prendariosSnapshot.forEach((doc) => {
          const data = doc.data()
          debug.prendarios.push({
            id: doc.id,
            data: data,
            fechaCreacion: data.fechaCreacion,
            fechaTipo: typeof data.fechaCreacion,
            fechaValida: data.fechaCreacion ? new Date(data.fechaCreacion).toString() : "FECHA INVÁLIDA",
          })
        })
      } catch (error) {
        debug.errores.push(`Error prendarios: ${error.message}`)
      }

      setDebugInfo(debug)
      console.log("🔍 Debug completo:", debug)
    } catch (error) {
      console.error("❌ Error general:", error)
      setDebugInfo({ errores: [error.message] })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    debugFirebase()
  }, [])

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>🔍 Debuggeando Firebase...</h2>
        <p>Verificando conexión y datos...</p>
      </div>
    )
  }

  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <h1>🔍 Debug de Firebase</h1>

      {/* Errores */}
      {debugInfo.errores && debugInfo.errores.length > 0 && (
        <div style={{ background: "#ffebee", padding: "15px", marginBottom: "20px", borderRadius: "8px" }}>
          <h3>❌ Errores encontrados:</h3>
          {debugInfo.errores.map((error, index) => (
            <p key={index} style={{ color: "red" }}>
              {error}
            </p>
          ))}
        </div>
      )}

      {/* Resumen */}
      <div style={{ background: "#e8f5e8", padding: "15px", marginBottom: "20px", borderRadius: "8px" }}>
        <h3>📊 Resumen de datos:</h3>
        <p>
          <strong>Hipotecarios:</strong> {debugInfo.hipotecarios?.length || 0} registros
        </p>
        <p>
          <strong>Personales:</strong> {debugInfo.personales?.length || 0} registros
        </p>
        <p>
          <strong>Prendarios:</strong> {debugInfo.prendarios?.length || 0} registros
        </p>
        <p>
          <strong>Total:</strong>{" "}
          {(debugInfo.hipotecarios?.length || 0) +
            (debugInfo.personales?.length || 0) +
            (debugInfo.prendarios?.length || 0)}{" "}
          registros
        </p>
      </div>

      {/* Detalles de Hipotecarios */}
      {debugInfo.hipotecarios && debugInfo.hipotecarios.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <h3>🏠 Créditos Hipotecarios ({debugInfo.hipotecarios.length}):</h3>
          {debugInfo.hipotecarios.slice(0, 3).map((item, index) => (
            <div key={index} style={{ background: "#f5f5f5", padding: "10px", margin: "10px 0", borderRadius: "5px" }}>
              <p>
                <strong>ID:</strong> {item.id}
              </p>
              <p>
                <strong>Nombre:</strong> {item.data.nombre || "N/A"}
              </p>
              <p>
                <strong>Monto:</strong> {item.data.montoSolicitado || "N/A"}
              </p>
              <p>
                <strong>Estado:</strong> {item.data.estado || "N/A"}
              </p>
              <p>
                <strong>Fecha (raw):</strong> {item.fechaCreacion || "N/A"}
              </p>
              <p>
                <strong>Fecha (tipo):</strong> {item.fechaTipo}
              </p>
              <p>
                <strong>Fecha (parseada):</strong> {item.fechaValida}
              </p>
            </div>
          ))}
          {debugInfo.hipotecarios.length > 3 && <p>... y {debugInfo.hipotecarios.length - 3} más</p>}
        </div>
      )}

      {/* Detalles de Personales */}
      {debugInfo.personales && debugInfo.personales.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <h3>👤 Créditos Personales ({debugInfo.personales.length}):</h3>
          {debugInfo.personales.slice(0, 3).map((item, index) => (
            <div key={index} style={{ background: "#f5f5f5", padding: "10px", margin: "10px 0", borderRadius: "5px" }}>
              <p>
                <strong>ID:</strong> {item.id}
              </p>
              <p>
                <strong>Nombre:</strong> {item.data.nombre || "N/A"}
              </p>
              <p>
                <strong>Monto:</strong> {item.data.montoSolicitado || "N/A"}
              </p>
              <p>
                <strong>Estado:</strong> {item.data.estado || "N/A"}
              </p>
              <p>
                <strong>Fecha (raw):</strong> {item.fechaCreacion || "N/A"}
              </p>
              <p>
                <strong>Fecha (tipo):</strong> {item.fechaTipo}
              </p>
              <p>
                <strong>Fecha (parseada):</strong> {item.fechaValida}
              </p>
            </div>
          ))}
          {debugInfo.personales.length > 3 && <p>... y {debugInfo.personales.length - 3} más</p>}
        </div>
      )}

      {/* Detalles de Prendarios */}
      {debugInfo.prendarios && debugInfo.prendarios.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <h3>🚗 Créditos Prendarios ({debugInfo.prendarios.length}):</h3>
          {debugInfo.prendarios.slice(0, 3).map((item, index) => (
            <div key={index} style={{ background: "#f5f5f5", padding: "10px", margin: "10px 0", borderRadius: "5px" }}>
              <p>
                <strong>ID:</strong> {item.id}
              </p>
              <p>
                <strong>Nombre:</strong> {item.data.nombre || "N/A"}
              </p>
              <p>
                <strong>Monto:</strong> {item.data.montoSolicitado || "N/A"}
              </p>
              <p>
                <strong>Estado:</strong> {item.data.estado || "N/A"}
              </p>
              <p>
                <strong>Fecha (raw):</strong> {item.fechaCreacion || "N/A"}
              </p>
              <p>
                <strong>Fecha (tipo):</strong> {item.fechaTipo}
              </p>
              <p>
                <strong>Fecha (parseada):</strong> {item.fechaValida}
              </p>
            </div>
          ))}
          {debugInfo.prendarios.length > 3 && <p>... y {debugInfo.prendarios.length - 3} más</p>}
        </div>
      )}

      {/* Si no hay datos */}
      {(!debugInfo.hipotecarios || debugInfo.hipotecarios.length === 0) &&
        (!debugInfo.personales || debugInfo.personales.length === 0) &&
        (!debugInfo.prendarios || debugInfo.prendarios.length === 0) && (
          <div style={{ background: "#fff3cd", padding: "15px", borderRadius: "8px" }}>
            <h3>⚠️ No se encontraron datos</h3>
            <p>Posibles causas:</p>
            <ul>
              <li>Las colecciones están vacías</li>
              <li>Los nombres de las colecciones no coinciden</li>
              <li>Problemas de permisos en Firebase</li>
              <li>Error en la configuración de Firebase</li>
            </ul>
          </div>
        )}

      <button
        onClick={debugFirebase}
        style={{
          padding: "10px 20px",
          background: "#1a5f3f",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        🔄 Volver a verificar
      </button>
    </div>
  )
}
