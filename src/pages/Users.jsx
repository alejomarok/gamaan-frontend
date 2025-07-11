"use client"

import { useState, useEffect } from "react"
import { db } from "../firebaseconfig"
import { collection, getDocs, updateDoc, doc } from "firebase/firestore"
import "../styles/userManagement.css" // Asegúrate de tener este archivo CSS para estilos personalizados

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [userSearchTerm, setUserSearchTerm] = useState("")
  const [selectedUsers, setSelectedUsers] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"))
      const usersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      setUsers(usersData)
    } catch (error) {
      console.error("Error al obtener usuarios:", error)
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      (user.firstName?.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
        user.rol?.toLowerCase().includes(userSearchTerm.toLowerCase()))
  )

  const handleSelectUser = (userId) => {
    setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const handleSelectAll = () => {
    setSelectedUsers(selectedUsers.length === filteredUsers.length ? [] : filteredUsers.map((user) => user.id))
  }

  const handleRoleChange = async (userId, newRole) => {
    try {
      const userRef = doc(db, "users", userId)
      await updateDoc(userRef, { rol: newRole })

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, rol: newRole } : user
        )
      )

      console.log(`Rol del usuario ${userId} actualizado a ${newRole}`)
    } catch (error) {
      console.error("Error al actualizar rol:", error)
    }
  }

  const RoleSelector = ({ user }) => (
    <select
      value={user.rol}
      onChange={(e) => handleRoleChange(user.id, e.target.value)}
      className="role-selector"
    >
      <option value="concesionaria">Concesionaria</option>
      <option value="user">User</option>
      <option value="admin">Admin</option>
    </select>
  )

  return (
    <div className="user-management">
      <div className="user-management-header">
        <h2>Usuarios</h2>
        <p>Gestiona los usuarios administradores del sistema.</p>
        <button className="btn-primary">
          <span>➕</span> Agregar usuario
        </button>
      </div>

      <div className="user-management-card">
        <div className="card-header">
          <h3>Usuarios administradores</h3>
          <p>Lista de usuarios con acceso al panel de administración.</p>
        </div>

        <div className="table-controls">
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Buscar por nombre, email o rol..."
              value={userSearchTerm}
              onChange={(e) => setUserSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="table-wrapper">
          <table className="user-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Usuario</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                    />
                  </td>
                  <td>
                    <div className="user-info">
                      <div className="avatar-large">{user.avatar}</div>
                      <div>
                        <div className="user-name">{user.firstName}</div>
                        <div className="user-email">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`role-badge ${user.rol.toLowerCase()}`}>{user.rol}</span>
                  </td>
                  <td>
                    <span className={`status-badge ${user.status === "Activo" ? "active" : "inactive"}`}>{user.status}</span>
                  </td>
                  <td>
                    <RoleSelector user={user} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UserManagement
