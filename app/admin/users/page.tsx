"use client"

import { useState, useEffect } from "react"
import { AdminSidebar } from "../../../components/layout/admin-sidebar"
import { Header } from "../../../components/layout/header"
import { AdminDashboardStats } from "../../../components/admin/dashboard-stats"
import { CompaniesTable } from "../../../components/admin/companies-table"
import { InviteCompanyDialog } from "../../../components/admin/invite-company-dialog"
import { adminService } from "../../../src/services/admin/admin.service"
import type { Company } from "../../../src/types/global"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalCompanies: 0,
    activeCompanies: 0,
    totalUsers: 0,
    activeUsers: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    trialCompanies: 0,
    churnRate: 0,
  })
  const [companies, setCompanies] = useState<Company[]>([])
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
   // loadDashboardData()
         setIsLoading(false)

  }, [])

  const loadDashboardData = async () => {
    try {
      const [dashboardStats, companiesData] = await Promise.all([
        adminService.getDashboardStats(),
        adminService.getCompanies(1, 50),
      ])

      setStats(dashboardStats)
      setCompanies(companiesData.companies)
    } catch (error) {
      console.error("Failed to load dashboard data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInviteCompany = async (data: any) => {
    try {
      setIsLoading(true)
     const response =  await adminService.inviteCompany(data)
       // Refresh companies list
      // const companiesData = await adminService.getCompanies(1, 50)
      // setCompanies(companiesData.companies)
      setIsLoading(false)
    } catch (error) {
      console.error("Failed to invite company:", error)

      setIsLoading(false)
    }
  }

  const handleEditCompany = (company: Company) => {
    // TODO: Open edit company dialog
    console.log("Edit company:", company)
  }

  const handleDeleteCompany = async (company: Company) => {
    if (confirm(`Are you sure you want to delete ${company.name}?`)) {
      try {
        await adminService.deleteCompany(company.id)
        setCompanies(companies.filter((c) => c.id !== company.id))
      } catch (error) {
        console.error("Failed to delete company:", error)
      }
    }
  }

  const handleManageLimits = (company: Company) => {
    // TODO: Open manage limits dialog
    console.log("Manage limits for:", company)
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
            <p className="text-gray-600">Manage users and platform settings</p>
          </div>

          <AdminDashboardStats stats={stats} />

          <div className="grid grid-cols-1 gap-6">
            <CompaniesTable
              companies={companies}
              onInviteCompany={() => setInviteDialogOpen(true)}
              onEditCompany={handleEditCompany}
              onDeleteCompany={handleDeleteCompany}
              onManageLimits={handleManageLimits}
            />
          </div>
        </main>
      </div>

      <InviteCompanyDialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen} onInvite={handleInviteCompany} />
    </div>
  )
}
