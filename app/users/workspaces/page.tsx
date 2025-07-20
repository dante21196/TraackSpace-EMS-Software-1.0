"use client"

import { Sidebar } from "../../../components/layout/sidebar"
import { Header } from "../../../components/layout/header"
import { Card, CardContent } from "@/components/ui/card"

export default function WorkspacesPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Workspaces</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <h2 className="font-semibold text-gray-800">Marketing Team</h2>
                <p className="text-gray-600">Collaboration space for all marketing efforts.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h2 className="font-semibold text-gray-800">Development Team</h2>
                <p className="text-gray-600">Sprint planning and feature tracking board.</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}