"use client"

import { useState } from "react"
import { CompanySidebar } from "@/components/layout/company-sidebar"
import { Header } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { PlusCircle } from "lucide-react"

type TeamMember = {
  id: number
  name: string
  email: string
  role: string
  status: "Active" | "Inactive"
}

const mockTeam: TeamMember[] = [
  { id: 1, name: "Alice Sharma", email: "alice@example.com", role: "Project Manager", status: "Active" },
  { id: 2, name: "Ravi Singh", email: "ravi@example.com", role: "Frontend Developer", status: "Active" },
  { id: 3, name: "Meera Das", email: "meera@example.com", role: "Backend Developer", status: "Inactive" },
  { id: 4, name: "John Paul", email: "john@example.com", role: "QA Engineer", status: "Active" },
]

export default function TeamPage() {
  const [team, setTeam] = useState(mockTeam)
  const [search, setSearch] = useState("")

  const filteredTeam = team.filter((member) =>
    member.name.toLowerCase().includes(search.toLowerCase()) ||
    member.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex min-h-screen">
      <CompanySidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Team Members</h2>
              <p className="text-muted-foreground text-sm">Manage your company’s team access and roles.</p>
            </div>
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" />
              Invite Member
            </Button>
          </div>

          <Card>
            <CardContent className="p-4 space-y-4">
              <Input
                placeholder="Search team members..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-1/2"
              />
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeam.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>{member.name}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            member.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {member.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
