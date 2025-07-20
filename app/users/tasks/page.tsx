"use client"

import { Sidebar } from "../../../components/layout/sidebar"
import { Header } from "../../../components/layout/header"
import { Card, CardContent } from "@/components/ui/card"

export default function TasksPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your Tasks</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">Ongoing Task</h2>
                <p className="text-gray-600">Finish project documentation by Friday.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">Pending Task</h2>
                <p className="text-gray-600">Update profile with recent certifications.</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
