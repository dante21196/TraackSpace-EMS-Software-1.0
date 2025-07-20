'use client';

import React from "react";
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

const companiesData = [
  { name: "Acme Corp", industry: "Finance", users: 120 },
  { name: "Globex", industry: "Healthcare", users: 98 },
  { name: "Soylent Inc.", industry: "Tech", users: 305 }
];

export default function CompaniesPage() {
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
