"use client"

import { useEffect } from "react"
import { useAuth } from "../../src/hooks/useAuth"
import { Sidebar } from "../../components/layout/sidebar"
import { Header } from "../../components/layout/header"
import { StatsCards } from "../../components/dashboard/stats-cards"
import { RecentActivity } from "../../components/dashboard/recent-activity"
import { OnlineUsers } from "../../components/dashboard/online-users"
import { trackingService } from "../../src/services/tracking/tracking.service"

export default function Dashboard() {
  const { user, isLoading, isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      trackingService.logActivity("view", "dashboard")
    }
  }, [isAuthenticated])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    window.location.href = "/auth/login"
    return null
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {user?.firstName}!</h1>
            <p className="text-gray-600">Here's what's happening in your workspace today.</p>
          </div>

          <StatsCards />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentActivity />
            <OnlineUsers />
          </div>
        </main>
      </div>
    </div>
  )
}
