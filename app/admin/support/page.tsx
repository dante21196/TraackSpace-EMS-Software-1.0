'use client';

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AdminSidebar } from "../../../components/layout/admin-sidebar"
import { Header } from "../../../components/layout/header"

const tickets = [
  { id: 101, subject: "Login Issue", status: "Open", date: "2025-07-15" },
  { id: 102, subject: "Billing Error", status: "Resolved", date: "2025-07-10" },
];

export default function SupportPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6 space-y-6">
          <h1 className="text-2xl font-bold text-gray-900">Support</h1>
          <Card className="shadow-md border rounded-2xl">
            <CardContent className="p-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ticket ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tickets.map((ticket) => (
                    <tr key={ticket.id}>
                      <td className="px-6 py-4 text-sm text-gray-900">#{ticket.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{ticket.subject}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{ticket.status}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{ticket.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}