"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { MoreHorizontal, ArrowUpDown, CheckCircle, XCircle, Clock, Eye } from "lucide-react"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { Badge } from "../ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Input } from "../ui/input"

const applications = [
  {
    id: "APP-1234",
    name: "Juan Pérez",
    dni: "28456789",
    amount: "$150,000",
    date: "15/04/2023",
    status: "pending",
  },
  {
    id: "APP-1235",
    name: "María González",
    dni: "30123456",
    amount: "$200,000",
    date: "14/04/2023",
    status: "approved",
  },
  {
    id: "APP-1236",
    name: "Carlos Rodríguez",
    dni: "25789456",
    amount: "$100,000",
    date: "13/04/2023",
    status: "rejected",
  },
  {
    id: "APP-1237",
    name: "Ana Martínez",
    dni: "32456123",
    amount: "$180,000",
    date: "12/04/2023",
    status: "review",
  },
  {
    id: "APP-1238",
    name: "Luis Sánchez",
    dni: "27896541",
    amount: "$120,000",
    date: "11/04/2023",
    status: "approved",
  },
]

export default function ApplicationsTable({ status }) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredApplications = applications.filter(
    (app) =>
      (!status || app.status === status) &&
      (app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.dni.includes(searchTerm) ||
        app.id.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Aprobada</Badge>
      case "rejected":
        return <Badge variant="destructive">Rechazada</Badge>
      case "review":
        return <Badge className="bg-orange-500">En revisión</Badge>
      default:
        return (
          <Badge variant="outline" className="bg-blue-500 text-white">
            Pendiente
          </Badge>
        )
    }
  }

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Buscar por nombre, DNI o ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table className="min-w-[700px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox />
              </TableHead>
              <TableHead>
                <div className="flex items-center">
                  ID
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="hidden sm:table-cell">Nombre</TableHead>
              <TableHead className="hidden md:table-cell">DNI</TableHead>
              <TableHead className="hidden md:table-cell">Monto</TableHead>
              <TableHead>
                <div className="flex items-center">
                  Fecha
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="hidden sm:table-cell">Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            ) : (
              filteredApplications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell className="font-medium">{application.id}</TableCell>
                  <TableCell className="hidden sm:table-cell">{application.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{application.dni}</TableCell>
                  <TableCell className="hidden md:table-cell">{application.amount}</TableCell>
                  <TableCell>{application.date}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {getStatusBadge(application.status)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menú</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link to={`/applications/${application.id}`} className="flex items-center">
                            <Eye className="mr-2 h-4 w-4" />
                            Ver detalles
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Aprobar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center">
                          <XCircle className="mr-2 h-4 w-4" />
                          Rechazar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center">
                          <Clock className="mr-2 h-4 w-4" />
                          Marcar en revisión
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
