"use client"

import { Sidebar } from "../../../components/layout/sidebar"
import { Header } from "../../../components/layout/header"
import { Card, CardContent } from "@/components/ui/card"

export default function SettingsPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Settings</h1>

          <Card>
            <CardContent className="p-4">
              <p className="text-gray-600">Manage your notification, privacy, and account preferences.</p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}