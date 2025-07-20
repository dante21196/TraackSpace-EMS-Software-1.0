"use client"

import { Sidebar } from "../../../components/layout/sidebar"
import { Header } from "../../../components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Mail, AlertCircle } from "lucide-react"

const mockNotifications = [
  {
    id: 1,
    title: "New Message",
    description: "You have received a new message from Sarah.",
    type: "message",
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "System Alert",
    description: "Server downtime scheduled for 12:00 AM.",
    type: "alert",
    time: "6 hours ago",
  },
  {
    id: 3,
    title: "Task Assigned",
    description: "You’ve been assigned a new task: ‘Review PR #234’",
    type: "task",
    time: "Yesterday",
  },
]

export default function NotificationsPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <h1 className="text-2xl font-bold mb-4 text-gray-900">Notifications</h1>
          <div className="grid grid-cols-1 gap-4">
            {mockNotifications.map((notification) => (
              <Card key={notification.id}>
                <CardContent className="flex gap-4 items-center py-4">
                  <div className="p-2 rounded-full bg-gray-100">
                    {notification.type === "message" && <Mail className="text-blue-500" />}
                    {notification.type === "alert" && <AlertCircle className="text-red-500" />}
                    {notification.type === "task" && <Bell className="text-yellow-500" />}
                  </div>
                  <div className="flex-1">
                    <h2 className="font-medium text-gray-800">{notification.title}</h2>
                    <p className="text-sm text-gray-600">{notification.description}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs whitespace-nowrap">
                    {notification.time}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
