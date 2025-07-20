"use client"

import { Sidebar } from "../../../components/layout/sidebar"
import { Header } from "../../../components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function SecurityPage() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Security Settings</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Password Section */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">Change Password</h2>
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input type="password" id="currentPassword" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input type="password" id="newPassword" placeholder="••••••••" />
                </div>
                <Button className="mt-2">Update Password</Button>
              </CardContent>
            </Card>

            {/* 2FA Section */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">Two-Factor Authentication</h2>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Enable 2FA</span>
                  <Switch
                    checked={twoFactorEnabled}
                    onCheckedChange={setTwoFactorEnabled}
                  />
                </div>
                {twoFactorEnabled && (
                  <p className="text-sm text-gray-500">
                    You will be asked for a 2FA code when logging in.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Activity Logs */}
            <Card className="lg:col-span-2">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Security Activity</h2>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>🟢 Login from New Delhi, India - July 19, 2025</li>
                  <li>🔴 Failed login attempt - July 18, 2025</li>
                  <li>🟢 Password changed - July 15, 2025</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
