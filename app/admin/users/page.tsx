"use client"

import { useState, useEffect } from "react"
import { AdminSidebar } from "../../../components/layout/admin-sidebar"
import { Header } from "../../../components/layout/header"
import { adminService } from "../../../src/services/admin/admin.service"
import type { User } from "../../../src/types/global"

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    //loadUsers()

  setTimeout(() => {
    const mockUsers: User[] = [
      {
        id: "1",
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        role_id: 1,
      },
      {
        id: "2",
        name: "Bob Smith",
        email: "bob.smith@example.com",
        role_id: 2,
      },
      {
        id: "3",
        name: "Charlie Brown",
        email: "charlie.brown@example.com",
        role_id: 3,
      },
      {
        id: "4",
        name: "Diana Prince",
        email: "diana.prince@example.com",
        role_id: 2,
      },
    ]
    setUsers(mockUsers)
    setIsLoading(false)
  }, 800) // Simulate network delay

  }, [])

  const loadUsers = async () => {
    try {
      // const res = await adminService.getUsers(1, 50)
      // setUsers(res.users)
    } catch (error) {
      console.error("Failed to load users:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteUser = async (user: User) => {
    if (confirm(`Delete user ${user.name} (${user.email})?`)) {
      try {
        await adminService.deleteUser(user.id)
        setUsers(users.filter((u) => u.id !== user.id))
      } catch (err) {
        console.error("Failed to delete user:", err)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Users</h1>
            <p className="text-gray-600">View and manage all users in the system</p>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDeleteUser(user)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && (
              <div className="p-6 text-center text-gray-500">No users found.</div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
