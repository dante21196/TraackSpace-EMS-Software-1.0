"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Plus, MoreHorizontal, Edit, UserX, Clock } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { User } from "../../src/types/global"

interface TeamManagementProps {
  users: User[]
  onInviteUser: () => void
  onEditUser: (user: User) => void
  onDeactivateUser: (user: User) => void
  onViewTimeTracking: (user: User) => void
}

export function TeamManagement({
  users,
  onInviteUser,
  onEditUser,
  onDeactivateUser,
  onViewTimeTracking,
}: TeamManagementProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getRoleColor = (role: string) => {
    switch (role) {
      case "company_admin":
        return "bg-purple-100 text-purple-800"
      case "project_manager":
        return "bg-blue-100 text-blue-800"
      case "team_lead":
        return "bg-green-100 text-green-800"
      case "employee":
        return "bg-gray-100 text-gray-800"
      case "contractor":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (isActive: boolean) => {
    return isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Team Members</CardTitle>
          <Button onClick={onInviteUser} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Invite Member
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search team members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {user.firstName.charAt(0)}
                    {user.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={getRoleColor(user.role)}>{user.role.replace("_", " ")}</Badge>
                    <Badge className={getStatusColor(user.isActive)}>{user.isActive ? "Active" : "Inactive"}</Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString() : "Never"}
                  </p>
                  <p className="text-xs text-gray-500">Last login</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEditUser(user)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit User
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onViewTimeTracking(user)}>
                      <Clock className="h-4 w-4 mr-2" />
                      View Time Tracking
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDeactivateUser(user)} className="text-red-600">
                      <UserX className="h-4 w-4 mr-2" />
                      Deactivate User
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
