"use client"

import { useState } from "react"
import DashboardSidebar from "@/components/Dashboard/DashboardSidebar"
import DashboardHeader from "@/components/Dashboard/DashboardHeader"

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex min-h-screen bg-[#F8F8F8]">
      {/* Sidebar fijo a la izquierda */}
      <DashboardSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Contenido a la derecha */}
      <div className="flex flex-1 flex-col max-h-screen overflow-hidden">
        {/* Header sticky ya viene correcto */}
        <DashboardHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Contenido scrollable debajo del header */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
