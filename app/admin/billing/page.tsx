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

const billingData = [
  { company: "Acme Corp", plan: "Pro", amount: "$120", date: "2025-07-01" },
  { company: "Globex", plan: "Basic", amount: "$50", date: "2025-07-10" },
  { company: "Soylent Inc.", plan: "Enterprise", amount: "$500", date: "2025-07-15" }
];

export default function BillingPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6 space-y-10">
          <section>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Billing</h1>
            <p className="text-gray-600 mb-4">Track and manage company billing</p>
            <Card className="shadow-md border rounded-2xl">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {billingData.map((bill, index) => (
                      <TableRow key={index}>
                        <TableCell>{bill.company}</TableCell>
                        <TableCell>{bill.plan}</TableCell>
                        <TableCell>{bill.amount}</TableCell>
                        <TableCell>{bill.date}</TableCell>
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
