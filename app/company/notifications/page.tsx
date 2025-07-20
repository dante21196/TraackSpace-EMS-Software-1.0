"use client";

import { useState } from "react";
import { CompanySidebar } from "../../../components/layout/company-sidebar";
import { Header } from "../../../components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function NotificationsPage() {
  const notifications = [
    { id: 1, message: "Alice joined Project Alpha", time: "2h ago" },
    { id: 2, message: "New report generated", time: "1d ago" }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <CompanySidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6 space-y-10">
          <section>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Notifications</h1>
            <p className="text-gray-600 mb-4">Recent updates and alerts</p>
            <Card className="shadow-md border rounded-2xl">
              <CardContent className="p-6 space-y-4">
                {notifications.map((note) => (
                  <div key={note.id} className="flex justify-between text-gray-800">
                    <span>{note.message}</span>
                    <span className="text-sm text-gray-500">{note.time}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
}


