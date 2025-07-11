import { apiClient } from "../api/client"
import { API_ENDPOINTS } from "../api/endpoints"
import { toastService } from "../notifications/toast.service"
import type { Employee, InviteEmployeeData, EmployeeInvitation, EmployeeFilters, EmployeeListResponse } from "./types"

class EmployeeService {
  async inviteEmployee(data: InviteEmployeeData): Promise<EmployeeInvitation> {
    try {
      const response = await apiClient.post<EmployeeInvitation>(API_ENDPOINTS.EMPLOYEE.INVITE, data)

      if (response.success) {
        toastService.success("Invitation sent", `Invitation has been sent to ${data.email}`)
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Invitation failed", error.message)
      throw error
    }
  }

  async getEmployees(filters?: EmployeeFilters): Promise<EmployeeListResponse> {
    try {
      const queryParams = new URLSearchParams()

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined) {
            queryParams.append(key, value.toString())
          }
        })
      }

      const endpoint = `${API_ENDPOINTS.EMPLOYEE.GET_ALL}?${queryParams.toString()}`
      const response = await apiClient.get<EmployeeListResponse>(endpoint)

      if (response.success) {
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to fetch employees", error.message)
      throw error
    }
  }

  async getEmployee(id: string): Promise<Employee> {
    try {
      const response = await apiClient.get<Employee>(API_ENDPOINTS.EMPLOYEE.GET_BY_ID(id))

      if (response.success) {
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to fetch employee", error.message)
      throw error
    }
  }

  async updateEmployee(id: string, data: Partial<Employee>): Promise<Employee> {
    try {
      const response = await apiClient.put<Employee>(API_ENDPOINTS.EMPLOYEE.UPDATE(id), data)

      if (response.success) {
        toastService.success("Employee updated", "Employee information has been updated")
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Update failed", error.message)
      throw error
    }
  }

  async activateEmployee(id: string): Promise<Employee> {
    try {
      const response = await apiClient.post<Employee>(API_ENDPOINTS.EMPLOYEE.ACTIVATE(id))

      if (response.success) {
        toastService.success("Employee activated", "Employee has been activated")
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Activation failed", error.message)
      throw error
    }
  }

  async deactivateEmployee(id: string): Promise<Employee> {
    try {
      const response = await apiClient.post<Employee>(API_ENDPOINTS.EMPLOYEE.DEACTIVATE(id))

      if (response.success) {
        toastService.success("Employee deactivated", "Employee has been deactivated")
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Deactivation failed", error.message)
      throw error
    }
  }

  async deleteEmployee(id: string): Promise<void> {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.EMPLOYEE.DELETE(id))

      if (response.success) {
        toastService.success("Employee removed", "Employee has been removed from the system")
        return
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Removal failed", error.message)
      throw error
    }
  }
}

export const employeeService = new EmployeeService()
