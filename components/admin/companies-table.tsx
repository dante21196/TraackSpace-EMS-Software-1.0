"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Plus, MoreHorizontal, Edit, Trash2, Settings } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Company } from "../../src/types/global"

interface CompaniesTableProps {
  companies: Company[]
  onInviteCompany: () => void
  onEditCompany: (company: Company) => void
  onDeleteCompany: (company: Company) => void
  onManageLimits: (company: Company) => void
}

export function CompaniesTable({
  companies,
  onInviteCompany,
  onEditCompany,
  onDeleteCompany,
  onManageLimits,
}: CompaniesTableProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.domain.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "trial":
        return "bg-blue-100 text-blue-800"
      case "past_due":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "enterprise":
        return "bg-purple-100 text-purple-800"
      case "professional":
        return "bg-blue-100 text-blue-800"
      case "starter":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Companies</CardTitle>
          <Button onClick={onInviteCompany} className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Invite Company
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredCompanies.map((company) => (
            <div key={company.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {company.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-gray-900">{company.name}</h3>
                  <p className="text-sm text-gray-500">{company.domain}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={getPlanColor(company.subscription.plan)}>{company.subscription.plan}</Badge>
                    <Badge className={getStatusColor(company.subscription.status)}>{company.subscription.status}</Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{company.stats.totalUsers} users</p>
                  <p className="text-xs text-gray-500">{company.stats.activeProjects} projects</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEditCompany(company)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Company
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onManageLimits(company)}>
                      <Settings className="h-4 w-4 mr-2" />
                      Manage Limits
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDeleteCompany(company)} className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Company
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
