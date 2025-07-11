"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface InviteUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onInvite: (data: any) => void
  projects: Array<{ id: string; name: string }>
}

export function InviteUserDialog({ open, onOpenChange, onInvite, projects }: InviteUserDialogProps) {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    role: "",
    projectIds: [] as string[],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onInvite(formData)
    onOpenChange(false)
    setFormData({
      email: "",
      firstName: "",
      lastName: "",
      role: "",
      projectIds: [],
    })
  }

  const handleProjectToggle = (projectId: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, projectIds: [...formData.projectIds, projectId] })
    } else {
      setFormData({ ...formData, projectIds: formData.projectIds.filter((id) => id !== projectId) })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Invite Team Member</DialogTitle>
          <DialogDescription>Send an invitation to join your team.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="role">Role</Label>
            <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="project_manager">Project Manager</SelectItem>
                <SelectItem value="team_lead">Team Lead</SelectItem>
                <SelectItem value="employee">Employee</SelectItem>
                <SelectItem value="contractor">Contractor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Assign to Projects (Optional)</Label>
            <div className="space-y-2 mt-2 max-h-32 overflow-y-auto">
              {projects.map((project) => (
                <div key={project.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={project.id}
                    checked={formData.projectIds.includes(project.id)}
                    onCheckedChange={(checked) => handleProjectToggle(project.id, checked as boolean)}
                  />
                  <Label htmlFor={project.id} className="text-sm">
                    {project.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Send Invitation
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
