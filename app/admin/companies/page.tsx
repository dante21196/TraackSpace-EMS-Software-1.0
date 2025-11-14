'use client';

import React,{useState} from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { AdminSidebar } from "../../../components/layout/admin-sidebar"
import { Header } from "../../../components/layout/header"
import { InviteCompanyDialog } from "../../../components/admin/invite-company-dialog"
import { adminService } from "../../../src/services/admin/admin.service"
import type { Company } from "../../../src/types/global"

const companiesData = [
  { name: "Acme Corp", industry: "Finance", users: 120 },
  { name: "Globex", industry: "Healthcare", users: 98 },
  { name: "Soylent Inc.", industry: "Tech", users: 305 }
];

export default function CompaniesPage() {

  const [companies, setCompanies] = useState<Company[]>([])
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const getCompanies = () => {
       // TODO get plans 
   
     }
    const getPlans = () => {
       // TODO get plans 
   
     }
     const handleInviteCompany = async (data: any) => {
       try {
         setIsLoading(true)
        const response =  await adminService.inviteCompany(data)
          // Refresh companies list
         // const companiesData = await adminService.getCompanies(1, 50)
         // setCompanies(companiesData.companies)
         setIsLoading(false)
       } catch (error) {
         console.error("Failed to invite company:", error)
   
         setIsLoading(false)
       }
     }
   
     const handleEditCompany = (company: Company) => {
       // TODO: Open edit company dialog
       console.log("Edit company:", company)
     }
   
     const handleDeleteCompany = async (company: Company) => {
       if (confirm(`Are you sure you want to delete ${company.name}?`)) {
         try {
           await adminService.deleteCompany(company.id)
           setCompanies(companies.filter((c) => c.id !== company.id))
         } catch (error) {
           console.error("Failed to delete company:", error)
         }
       }
      }
  
  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6 space-y-10">
          <section>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Companies</h1>
            <p className="text-gray-600 mb-4">Manage registered organizations</p>
            <Card className="shadow-md border rounded-2xl">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Industry</TableHead>
                      <TableHead>Users</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {companiesData.map((c) => (
                      <TableRow key={c.name}>
                        <TableCell>{c.name}</TableCell>
                        <TableCell>{c.industry}</TableCell>
                        <TableCell>{c.users}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
}
