"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthLayout } from "./auth-layout"
import Link from "next/link"

export function ResetPasswordForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate password reset email
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <AuthLayout title="Check your email" subtitle="We've sent a password reset link to your email">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-gray-600">
            If an account with email <strong>{email}</strong> exists, you will receive a password reset link shortly.
          </p>
          <Link href="/auth/login" className="text-blue-600 hover:text-blue-500">
            Back to sign in
          </Link>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title="Reset your password" subtitle="Enter your email to receive a reset link">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@company.com"
            className="mt-1"
          />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700">
          {isLoading ? "Sending..." : "Send reset link"}
        </Button>

        <div className="text-center">
          <Link href="/auth/login" className="text-sm text-blue-600 hover:text-blue-500">
            Back to sign in
          </Link>
        </div>
      </form>
    </AuthLayout>
  )
}
