"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface InviteCompanyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onInvite: (data: any) => void
}

export function InviteCompanyDialog({ open, onOpenChange, onInvite }: InviteCompanyDialogProps) {
  const [formData, setFormData] = useState({
    companyName: "",
    adminEmail: "",
    adminFirstName: "",
    adminLastName: "",
    plan: "",
    trialDays: "14",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onInvite(formData)
    onOpenChange(false)
    setFormData({
      companyName: "",
      adminEmail: "",
      adminFirstName: "",
      adminLastName: "",
      plan: "",
      trialDays: "14",
      message: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Invite Company</DialogTitle>
          <DialogDescription>Send an onboarding invitation to a new company.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="plan">Subscription Plan</Label>
              <Select value={formData.plan} onValueChange={(value) => setFormData({ ...formData, plan: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="starter">Starter</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="adminFirstName">Admin First Name</Label>
              <Input
                id="adminFirstName"
                value={formData.adminFirstName}
                onChange={(e) => setFormData({ ...formData, adminFirstName: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="adminLastName">Admin Last Name</Label>
              <Input
                id="adminLastName"
                value={formData.adminLastName}
                onChange={(e) => setFormData({ ...formData, adminLastName: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="adminEmail">Admin Email</Label>
            <Input
              id="adminEmail"
              type="email"
              value={formData.adminEmail}
              onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="trialDays">Trial Days</Label>
            <Input
              id="trialDays"
              type="number"
              value={formData.trialDays}
              onChange={(e) => setFormData({ ...formData, trialDays: e.target.value })}
              min="0"
              max="90"
            />
          </div>

          <div>
            <Label htmlFor="message">Welcome Message (Optional)</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Add a personalized welcome message..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              Send Invitation
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
