"use client";

import { useState } from "react";
import { CompanySidebar } from "../../../components/layout/company-sidebar";
import { Header } from "../../../components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const dummyTrackingData = [
  { id: 1, employee: "Alice", project: "Project Alpha", hours: 5, date: "2025-07-20" },
  { id: 2, employee: "Bob", project: "Project Beta", hours: 8, date: "2025-07-19" },
  { id: 3, employee: "Charlie", project: "Project Alpha", hours: 6, date: "2025-07-18" }
];

export default function TimeTrackingPage() {
  const [trackingData] = useState(dummyTrackingData);

  return (
    <div className="flex h-screen bg-gray-50">
      <CompanySidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6 space-y-10">
          <section>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Time Tracking</h1>
            <p className="text-gray-600 mb-4">Monitor team hours and work duration across projects</p>
            <Card className="shadow-md border rounded-2xl">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Employee</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Hours Worked</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {trackingData.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell>{entry.date}</TableCell>
                        <TableCell>{entry.employee}</TableCell>
                        <TableCell>{entry.project}</TableCell>
                        <TableCell>{entry.hours}</TableCell>
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
