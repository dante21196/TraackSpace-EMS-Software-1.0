'use client';

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AdminSidebar } from "../../../components/layout/admin-sidebar"
import { Header } from "../../../components/layout/header"
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const settings = [
  { key: "enableNotifications", label: "Enable Notifications", value: true },
  { key: "autoUpdate", label: "Auto Update System", value: false },
  { key: "maintenanceMode", label: "Maintenance Mode", value: false }
];

export default function SystemSettingsPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6 space-y-10">
          <section>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">System Settings</h1>
            <p className="text-gray-600 mb-4">Manage global configurations and system-level options.</p>
            <Card className="shadow-md border rounded-2xl">
              <CardContent className="p-6 space-y-6">
                {settings.map((setting) => (
                  <div key={setting.key} className="flex items-center justify-between">
                    <Label htmlFor={setting.key} className="text-base text-gray-800">
                      {setting.label}
                    </Label>
                    <Switch id={setting.key} defaultChecked={setting.value} />
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
