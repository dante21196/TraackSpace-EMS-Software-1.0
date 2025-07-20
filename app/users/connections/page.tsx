"use client"

import { Sidebar } from "../../../components/layout/sidebar"
import { Header } from "../../../components/layout/header"
import { Card, CardContent } from "@/components/ui/card"

export default function ConnectionsPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your Connections</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-4">
                <h2 className="font-semibold">John Doe</h2>
                <p className="text-gray-600">Frontend Developer at Acme Corp</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h2 className="font-semibold">Jane Smith</h2>
                <p className="text-gray-600">Backend Lead at Globex</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
