"use client";

import { useState } from "react";
import { CompanySidebar } from "../../../components/layout/company-sidebar";
import { Header } from "../../../components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


export default function ReportsPage() {
  const reports = [
    { id: 1, title: "Weekly Summary", date: "2025-07-19" },
    { id: 2, title: "Monthly Overview", date: "2025-07-01" }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <CompanySidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6 space-y-10">
          <section>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Reports</h1>
            <p className="text-gray-600 mb-4">Generate and view reports for team and project analytics</p>
            <Card className="shadow-md border rounded-2xl">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Title</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>{report.title}</TableCell>
                        <TableCell>{report.date}</TableCell>
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

