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
const analyticsData = [
  { month: "Jan", activeUsers: 400, newCompanies: 24, revenue: 2400 },
  { month: "Feb", activeUsers: 300, newCompanies: 13, revenue: 2210 },
  { month: "Mar", activeUsers: 500, newCompanies: 32, revenue: 2290 },
  { month: "Apr", activeUsers: 478, newCompanies: 28, revenue: 2000 },
  { month: "May", activeUsers: 589, newCompanies: 34, revenue: 2780 },
  { month: "Jun", activeUsers: 439, newCompanies: 23, revenue: 2500 }
];

export default function AnalyticsPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Platform Analytics</h1>
            <p className="text-gray-600">Track usage, engagement and growth metrics</p>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <Card className="shadow-md border rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Summary</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-indigo-100 text-indigo-800 rounded-xl">
                    <p className="text-sm">Active Users</p>
                    <p className="text-xl font-bold">{analyticsData.reduce((sum, d) => sum + d.activeUsers, 0)}</p>
                  </div>
                  <div className="p-4 bg-green-100 text-green-800 rounded-xl">
                    <p className="text-sm">New Companies</p>
                    <p className="text-xl font-bold">{analyticsData.reduce((sum, d) => sum + d.newCompanies, 0)}</p>
                  </div>
                  <div className="p-4 bg-yellow-100 text-yellow-800 rounded-xl">
                    <p className="text-sm">Revenue</p>
                    <p className="text-xl font-bold">${analyticsData.reduce((sum, d) => sum + d.revenue, 0)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md border rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Monthly Breakdown</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead>Active Users</TableHead>
                      <TableHead>New Companies</TableHead>
                      <TableHead>Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {analyticsData.map((entry) => (
                      <TableRow key={entry.month}>
                        <TableCell className="font-medium">{entry.month}</TableCell>
                        <TableCell>{entry.activeUsers}</TableCell>
                        <TableCell>{entry.newCompanies}</TableCell>
                        <TableCell>${entry.revenue}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
