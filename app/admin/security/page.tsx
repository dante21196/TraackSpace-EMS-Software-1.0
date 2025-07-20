'use client';

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AdminSidebar } from "../../../components/layout/admin-sidebar"
import { Header } from "../../../components/layout/header"
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const securitySettings = [
  { key: "2fa", label: "Two-Factor Authentication", value: true },
  { key: "alerts", label: "Login Alerts", value: true },
  { key: "ipLock", label: "IP Address Locking", value: false },
];

export default function SecurityPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6 space-y-6">
          <h1 className="text-2xl font-bold text-gray-900">Security Settings</h1>
          <Card className="shadow-md border rounded-2xl">
            <CardContent className="p-6 space-y-6">
              {securitySettings.map((setting) => (
                <div key={setting.key} className="flex items-center justify-between">
                  <Label htmlFor={setting.key} className="text-base text-gray-800">
                    {setting.label}
                  </Label>
                  <Switch id={setting.key} defaultChecked={setting.value} />
                </div>
              ))}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
