"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthLayout } from "./auth-layout"

export function SetPasswordForm() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }
    setIsLoading(true)
    // Simulate password setting
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    // Redirect to login
    window.location.href = "/auth/login"
  }

  return (
    <AuthLayout title="Set your password" subtitle="Create a secure password for your ERP account">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="password">New Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            className="mt-1"
          />
          <p className="mt-1 text-xs text-gray-500">Password must be at least 8 characters long</p>
        </div>

        <div>
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            id="confirm-password"
            name="confirm-password"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className="mt-1"
          />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700">
          {isLoading ? "Setting password..." : "Set Password"}
        </Button>
      </form>
    </AuthLayout>
  )
}
