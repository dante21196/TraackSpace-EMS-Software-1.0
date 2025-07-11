import { apiClient } from "../api/client"
import { API_ENDPOINTS } from "../api/endpoints"
import { toastService } from "../notifications/toast.service"
import type { Company, User, CompanySettings, CompanyStats } from "../../types/global"

export interface InviteUserData {
  email: string
  firstName: string
  lastName: string
  role: string
  projectIds?: string[]
}

class CompanyService {
  async getProfile(): Promise<Company> {
    try {
      const response = await apiClient.get<Company>(API_ENDPOINTS.COMPANY.PROFILE)

      if (response.success) {
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to fetch company profile", error.message)
      throw error
    }
  }

  async updateProfile(data: Partial<Company>): Promise<Company> {
    try {
      const response = await apiClient.put<Company>(API_ENDPOINTS.COMPANY.UPDATE_PROFILE, data)

      if (response.success) {
        toastService.success("Profile updated", "Company profile has been updated")
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to update profile", error.message)
      throw error
    }
  }

  async getSettings(): Promise<CompanySettings> {
    try {
      const response = await apiClient.get<CompanySettings>(API_ENDPOINTS.COMPANY.SETTINGS)

      if (response.success) {
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to fetch settings", error.message)
      throw error
    }
  }

  async updateSettings(settings: CompanySettings): Promise<CompanySettings> {
    try {
      const response = await apiClient.put<CompanySettings>(API_ENDPOINTS.COMPANY.UPDATE_SETTINGS, settings)

      if (response.success) {
        toastService.success("Settings updated", "Company settings have been saved")
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to update settings", error.message)
      throw error
    }
  }

  async getUsers(page = 1, limit = 20, search?: string): Promise<{ users: User[]; total: number }> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      })

      if (search) params.append("search", search)

      const response = await apiClient.get<{ users: User[]; total: number }>(
        `${API_ENDPOINTS.COMPANY.USERS}?${params.toString()}`,
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

  async inviteUser(data: InviteUserData): Promise<void> {
    try {
      const response = await apiClient.post(API_ENDPOINTS.COMPANY.INVITE_USER, data)

      if (response.success) {
        toastService.success("Invitation sent", `Invitation sent to ${data.email}`)
        return
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to send invitation", error.message)
      throw error
    }
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    try {
      const response = await apiClient.put<User>(API_ENDPOINTS.COMPANY.UPDATE_USER(id), data)

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

  async deactivateUser(id: string): Promise<void> {
    try {
      const response = await apiClient.post(API_ENDPOINTS.COMPANY.DEACTIVATE_USER(id))

      if (response.success) {
        toastService.success("User deactivated", "User has been deactivated")
        return
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to deactivate user", error.message)
      throw error
    }
  }

  async getStats(): Promise<CompanyStats> {
    try {
      const response = await apiClient.get<CompanyStats>(API_ENDPOINTS.COMPANY.STATS)

      if (response.success) {
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to fetch stats", error.message)
      throw error
    }
  }
}

export const companyService = new CompanyService()
