"use client";

import { useState } from "react";
import { CompanySidebar } from "../../../components/layout/company-sidebar";
import { Header } from "../../../components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ProfilePage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <CompanySidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6 space-y-10">
          <section>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile</h1>
            <p className="text-gray-600 mb-4">Manage your personal profile, email and password</p>
            <Card className="shadow-md border rounded-2xl">
              <CardContent className="p-6 text-gray-800">
                Coming soon: update profile picture, contact information and login credentials.
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
}


