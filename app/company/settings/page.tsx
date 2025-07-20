"use client";

import { useState } from "react";
import { CompanySidebar } from "../../../components/layout/company-sidebar";
import { Header } from "../../../components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ProjectsPage() {
  const projects = [
    { id: 1, name: "Project Alpha", status: "Active" },
    { id: 2, name: "Project Beta", status: "Completed" },
    { id: 3, name: "Project Gamma", status: "On Hold" }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <CompanySidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6 space-y-10">
          <section>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Projects</h1>
            <p className="text-gray-600 mb-4">View and manage ongoing projects</p>
            <Card className="shadow-md border rounded-2xl">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project Name</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell>{project.name}</TableCell>
                        <TableCell>{project.status}</TableCell>
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

