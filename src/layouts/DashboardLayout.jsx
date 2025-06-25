"use client"

import { useState } from "react"
import DashboardSidebar from "@/components/Dashboard/DashboardSidebar"
import DashboardHeader from "@/components/Dashboard/DashboardHeader"

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex min-h-screen bg-[#F8F8F8]">
      <DashboardSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex flex-1 flex-col">
        <DashboardHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-6">{children}</main>
      </div> 
    </div>
  )
}
