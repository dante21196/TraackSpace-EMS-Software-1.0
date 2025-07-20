"use client"

import { AdminSidebar } from "@/components/layout/admin-sidebar"
import { Header } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { Users, Building2, DollarSign } from "lucide-react"
import { useState } from "react"
import { CompanySidebar } from "@/components/layout/company-sidebar"

const summaryData = [
  { title: "Total Users", value: "1,520", icon: Users },
  { title: "Companies", value: "120", icon: Building2 },
  { title: "Monthly Revenue", value: "₹5,30,000", icon: DollarSign },
]

const barChartData = [
  { month: "Jan", users: 200 },
  { month: "Feb", users: 400 },
  { month: "Mar", users: 350 },
  { month: "Apr", users: 500 },
  { month: "May", users: 420 },
  { month: "Jun", users: 600 },
]

const activityLog = [
  { id: 1, activity: "New user registered: Ravi Kumar", timestamp: "5 mins ago" },
  { id: 2, activity: "Company onboarded: Finverse Inc.", timestamp: "20 mins ago" },
  { id: 3, activity: "Billing issued to Zentech", timestamp: "1 hour ago" },
  { id: 4, activity: "User updated profile: Neha Roy", timestamp: "2 hours ago" },
]

const members = [
  { name: "Ravi Kumar", email: "ravi@example.com", role: "Admin" },
  { name: "Neha Roy", email: "neha@example.com", role: "Editor" },
  { name: "Zoya Ali", email: "zoya@example.com", role: "Viewer" },
]

export default function DashboardPage() {
  const [inviteEmail, setInviteEmail] = useState("")

  const handleInvite = () => {
    if (!inviteEmail) return
    alert(`Invite sent to ${inviteEmail}`)
    setInviteEmail("")
  }

  return (
    <div className="flex min-h-screen">
      <CompanySidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-6 space-y-6">
          {/* Title */}
          <div>
            <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
            <p className="text-sm text-muted-foreground">Overview of platform, members, and metrics.</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {summaryData.map((item, index) => (
              <Card key={index}>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-sm text-muted-foreground">{item.title}</p>
                    <p className="text-xl font-bold">{item.value}</p>
                  </div>
                  <item.icon className="w-6 h-6 text-muted-foreground" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Chart + Activity Log */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Users Growth Chart */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">User Growth</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={barChartData}>
                    <XAxis dataKey="month" stroke="#888888" fontSize={12} />
                    <YAxis stroke="#888888" fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="users" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Activity Log */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold">Recent Activity</h3>
                <ul className="space-y-2">
                  {activityLog.map((log) => (
                    <li key={log.id} className="text-sm border-b py-2">
                      <p>{log.activity}</p>
                      <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Member List */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Team Members</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map((member, i) => (
                    <TableRow key={i}>
                      <TableCell>{member.name}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.role}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Invite Form */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Invite Team Member</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                <div>
                  <Label htmlFor="invite-email">Email</Label>
                  <Input
                    id="invite-email"
                    type="email"
                    placeholder="Enter email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                  />
                </div>
                <Button onClick={handleInvite}>Send Invite</Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
