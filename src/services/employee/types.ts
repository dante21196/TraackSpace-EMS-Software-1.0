import type { UserRole } from "../auth/types"

export interface Employee {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  department: string
  position: string
  companyId: string
  managerId?: string
  permissions: string[]
  invitedAt: string
  activatedAt?: string
  lastLoginAt?: string
  isActive: boolean
  profileImage?: string
  phoneNumber?: string
  address?: EmployeeAddress
}

export interface EmployeeAddress {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface InviteEmployeeData {
  email: string
  firstName: string
  lastName: string
  role: UserRole
  department: string
  position: string
  managerId?: string
  permissions: string[]
}

export interface EmployeeInvitation {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  department: string
  position: string
  companyId: string
  invitedBy: string
  invitedAt: string
  expiresAt: string
  status: InvitationStatus
  token: string
}

export enum InvitationStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  EXPIRED = "expired",
  REVOKED = "revoked",
}

export interface EmployeeFilters {
  department?: string
  role?: UserRole
  isActive?: boolean
  search?: string
  page?: number
  limit?: number
}

export interface EmployeeListResponse {
  employees: Employee[]
  total: number
  page: number
  limit: number
  totalPages: number
}
