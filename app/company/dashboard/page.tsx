"use client"

import { useState, useEffect } from "react"
import { CompanySidebar } from "../../../components/layout/company-sidebar"
import { Header } from "../../../components/layout/header"
import { TeamManagement } from "../../../components/company/team-management"
import { InviteUserDialog } from "../../../components/company/invite-user-dialog"
import { companyService } from "../../../src/services/company/company.service"
import { projectsService } from "../../../src/services/projects/projects.service"
import type { User, Project } from "../../../src/types/global"

export default function CompanyDashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const [usersData, projectsData] = await Promise.all([
        companyService.getUsers(1, 50),
        projectsService.getProjects({ limit: 50 }),
      ])

      setUsers(usersData.users)
      setProjects(projectsData.projects)
    } catch (error) {
      console.error("Failed to load dashboard data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInviteUser = async (data: any) => {
    try {
      await companyService.inviteUser(data)
      // Refresh users list
      const usersData = await companyService.getUsers(1, 50)
      setUsers(usersData.users)
    } catch (error) {
      console.error("Failed to invite user:", error)
    }
  }

  const handleEditUser = (user: User) => {
    // TODO: Open edit user dialog
    console.log("Edit user:", user)
  }

  const handleDeactivateUser = async (user: User) => {
    if (confirm(`Are you sure you want to deactivate ${user.firstName} ${user.lastName}?`)) {
      try {
        await companyService.deactivateUser(user.id)
        setUsers(users.map((u) => (u.id === user.id ? { ...u, isActive: false } : u)))
      } catch (error) {
        console.error("Failed to deactivate user:", error)
      }
    }
  }

  const handleViewTimeTracking = (user: User) => {
    // TODO: Navigate to time tracking view for user
    console.log("View time tracking for:", user)
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <CompanySidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Team Dashboard</h1>
            <p className="text-gray-600">Manage your team members and track their productivity</p>
          </div>

          <TeamManagement
            users={users}
            onInviteUser={() => setInviteDialogOpen(true)}
            onEditUser={handleEditUser}
            onDeactivateUser={handleDeactivateUser}
            onViewTimeTracking={handleViewTimeTracking}
          />
        </main>
      </div>

      <InviteUserDialog
        open={inviteDialogOpen}
        onOpenChange={setInviteDialogOpen}
        onInvite={handleInviteUser}
        projects={projects}
      />
    </div>
  )
}
