import { apiClient } from "../api/client"
import { API_ENDPOINTS } from "../api/endpoints"
import { toastService } from "../notifications/toast.service"
import type { Company, User, CompanyLimits } from "../../types/global"

export interface AdminDashboardStats {
  totalCompanies: number
  activeCompanies: number
  totalUsers: number
  activeUsers: number
  totalRevenue: number
  monthlyRevenue: number
  trialCompanies: number
  churnRate: number
}

export interface CompanyInviteData {
  companyName: string
  adminEmail: string
  adminFirstName: string
  adminLastName: string
  plan: string
  trialDays?: number
}

export interface CreateCompanyData {
  name: string
  domain: string
  industry: string
  size: string
  adminEmail: string
  adminFirstName: string
  adminLastName: string
  plan: string
  limits: CompanyLimits
}

class AdminService {
  async getDashboardStats(): Promise<AdminDashboardStats> {
    try {
      const response = await apiClient.get<AdminDashboardStats>(API_ENDPOINTS.ADMIN.DASHBOARD)

      if (response.success) {
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to fetch dashboard stats", error.message)
      throw error
    }
  }

  async getCompanies(page = 1, limit = 20, search?: string): Promise<{ companies: Company[]; total: number }> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      })

      if (search) params.append("search", search)

      const response = await apiClient.get<{ companies: Company[]; total: number }>(
        `${API_ENDPOINTS.ADMIN.COMPANIES}?${params.toString()}`,
      )

      if (response.success) {
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to fetch companies", error.message)
      throw error
    }
  }

  async createCompany(data: CreateCompanyData): Promise<Company> {
    try {
      const response = await apiClient.post<Company>(API_ENDPOINTS.ADMIN.CREATE_COMPANY, data)

      if (response.success) {
        toastService.success("Company created", `${data.name} has been successfully onboarded`)
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to create company", error.message)
      throw error
    }
  }

  async inviteCompany(data: CompanyInviteData): Promise<void> {
    try {
      const response = await apiClient.post(API_ENDPOINTS.ADMIN.INVITE_COMPANY, data)

      if (response.success) {
        toastService.success("Invitation sent", `Onboarding invitation sent to ${data.adminEmail}`)
        return
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to send invitation", error.message)
      throw error
    }
  }

  async updateCompany(id: string, data: Partial<Company>): Promise<Company> {
    try {
      const response = await apiClient.put<Company>(API_ENDPOINTS.ADMIN.UPDATE_COMPANY(id), data)

      if (response.success) {
        toastService.success("Company updated", "Company information has been updated")
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to update company", error.message)
      throw error
    }
  }

  async setCompanyLimits(id: string, limits: CompanyLimits): Promise<void> {
    try {
      const response = await apiClient.put(API_ENDPOINTS.ADMIN.SET_COMPANY_LIMITS(id), limits)

      if (response.success) {
        toastService.success("Limits updated", "Company limits have been updated")
        return
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to update limits", error.message)
      throw error
    }
  }

  async getAllUsers(
    page = 1,
    limit = 20,
    search?: string,
    companyId?: string,
  ): Promise<{ users: User[]; total: number }> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      })

      if (search) params.append("search", search)
      if (companyId) params.append("companyId", companyId)

      const response = await apiClient.get<{ users: User[]; total: number }>(
        `${API_ENDPOINTS.ADMIN.USERS}?${params.toString()}`,
      )

      if (response.success) {
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to fetch users", error.message)
      throw error
    }
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    try {
      const response = await apiClient.put<User>(API_ENDPOINTS.ADMIN.UPDATE_USER(id), data)

      if (response.success) {
        toastService.success("User updated", "User information has been updated")
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to update user", error.message)
      throw error
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.ADMIN.DELETE_USER(id))

      if (response.success) {
        toastService.success("User deleted", "User has been removed from the system")
        return
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to delete user", error.message)
      throw error
    }
  }

  async deleteCompany(id: string): Promise<void> {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.ADMIN.DELETE_COMPANY(id))

      if (response.success) {
        toastService.success("Company deleted", "Company has been removed from the system")
        return
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to delete company", error.message)
      throw error
    }
  }
}

export const adminService = new AdminService()
