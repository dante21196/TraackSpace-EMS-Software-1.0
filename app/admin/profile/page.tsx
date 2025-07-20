'use client';

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AdminSidebar } from "../../../components/layout/admin-sidebar"
import { Header } from "../../../components/layout/header"

export default function ProfilePage() {
  const user = {
    name: "Ashmin Singh",
    email: "ashmin@example.com",
    role: "Admin",
    joined: "Jan 2023"
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6 space-y-6">
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <Card className="shadow-md border rounded-2xl">
            <CardContent className="p-6 space-y-4">
              <div><strong>Name:</strong> {user.name}</div>
              <div><strong>Email:</strong> {user.email}</div>
              <div><strong>Role:</strong> {user.role}</div>
              <div><strong>Member Since:</strong> {user.joined}</div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}