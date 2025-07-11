"use client"

import { useEffect } from "react"
import { useAuth } from "../../src/hooks/useAuth"
import { NavigationSidebar } from "../../components/erp-system/navigation-sidebar"
import { SystemHeader } from "../../components/erp-system/system-header"
import { BusinessModuleFilter } from "../../components/erp-system/business-module-filter"
import { DataViewSelector } from "../../components/erp-system/data-view-selector"
import { InventoryProductGrid } from "../../components/erp-system/inventory-product-grid"
import { BusinessAnalyticsPanel } from "../../components/erp-system/business-analytics-panel"
import { BusinessActivityFooter } from "../../components/erp-system/business-activity-footer"
import { userTrackingService } from "../../src/services/user-tracking/tracking.service"
import { ActivityAction } from "../../src/services/user-tracking/types"

export default function ERPDashboard() {
  const { user, isLoading, isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated && user) {
      // Log dashboard access
      userTrackingService.logActivity(ActivityAction.VIEW, "dashboard", {
        page: "inventory-management",
      })
    }
  }, [isAuthenticated, user])

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
      <NavigationSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <SystemHeader
          currentUser={{
            name: `${user?.firstName} ${user?.lastName}`,
            role: user?.role || "Employee",
          }}
          notificationCount={7}
          messageCount={3}
        />
        <div className="flex-1 flex overflow-hidden">
          <main className="flex-1 overflow-auto p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Inventory Management</h1>
              <p className="text-gray-600">Manage your products, stock levels, and suppliers</p>
            </div>
            <BusinessModuleFilter />
            <DataViewSelector />
            <InventoryProductGrid />
          </main>
          <BusinessAnalyticsPanel />
        </div>
        <BusinessActivityFooter />
      </div>
    </div>
  )
}
