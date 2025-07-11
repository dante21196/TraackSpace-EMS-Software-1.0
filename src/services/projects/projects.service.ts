import { apiClient } from "../api/client"
import { API_ENDPOINTS } from "../api/endpoints"
import { toastService } from "../notifications/toast.service"
import type { Project, ProjectMember, Task, TimeEntry } from "../../types/global"

export interface CreateProjectData {
  name: string
  description?: string
  startDate: string
  endDate?: string
  budget?: number
  currency: string
  priority: string
  memberIds: string[]
}

export interface ProjectFilters {
  status?: string
  priority?: string
  managerId?: string
  search?: string
  page?: number
  limit?: number
}

class ProjectsService {
  async getProjects(filters?: ProjectFilters): Promise<{ projects: Project[]; total: number }> {
    try {
      const params = new URLSearchParams()

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined) {
            params.append(key, value.toString())
          }
        })
      }

      const response = await apiClient.get<{ projects: Project[]; total: number }>(
        `${API_ENDPOINTS.PROJECTS.GET_ALL}?${params.toString()}`,
      )

      if (response.success) {
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to fetch projects", error.message)
      throw error
    }
  }

  async createProject(data: CreateProjectData): Promise<Project> {
    try {
      const response = await apiClient.post<Project>(API_ENDPOINTS.PROJECTS.CREATE, data)

      if (response.success) {
        toastService.success("Project created", `${data.name} has been created successfully`)
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to create project", error.message)
      throw error
    }
  }

  async getProject(id: string): Promise<Project> {
    try {
      const response = await apiClient.get<Project>(API_ENDPOINTS.PROJECTS.GET_BY_ID(id))

      if (response.success) {
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to fetch project", error.message)
      throw error
    }
  }

  async updateProject(id: string, data: Partial<Project>): Promise<Project> {
    try {
      const response = await apiClient.put<Project>(API_ENDPOINTS.PROJECTS.UPDATE(id), data)

      if (response.success) {
        toastService.success("Project updated", "Project has been updated successfully")
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to update project", error.message)
      throw error
    }
  }

  async deleteProject(id: string): Promise<void> {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.PROJECTS.DELETE(id))

      if (response.success) {
        toastService.success("Project deleted", "Project has been removed")
        return
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to delete project", error.message)
      throw error
    }
  }

  async addMember(projectId: string, userId: string, role: string, hourlyRate?: number): Promise<ProjectMember> {
    try {
      const response = await apiClient.post<ProjectMember>(API_ENDPOINTS.PROJECTS.ADD_MEMBER(projectId), {
        userId,
        role,
        hourlyRate,
      })

      if (response.success) {
        toastService.success("Member added", "Team member has been added to the project")
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to add member", error.message)
      throw error
    }
  }

  async removeMember(projectId: string, userId: string): Promise<void> {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.PROJECTS.REMOVE_MEMBER(projectId, userId))

      if (response.success) {
        toastService.success("Member removed", "Team member has been removed from the project")
        return
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to remove member", error.message)
      throw error
    }
  }

  async getProjectTasks(projectId: string): Promise<Task[]> {
    try {
      const response = await apiClient.get<Task[]>(API_ENDPOINTS.PROJECTS.GET_TASKS(projectId))

      if (response.success) {
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to fetch project tasks", error.message)
      throw error
    }
  }

  async getProjectTimeEntries(projectId: string, startDate?: string, endDate?: string): Promise<TimeEntry[]> {
    try {
      const params = new URLSearchParams()
      if (startDate) params.append("startDate", startDate)
      if (endDate) params.append("endDate", endDate)

      const response = await apiClient.get<TimeEntry[]>(
        `${API_ENDPOINTS.PROJECTS.GET_TIME_ENTRIES(projectId)}?${params.toString()}`,
      )

      if (response.success) {
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to fetch time entries", error.message)
      throw error
    }
  }
}

export const projectsService = new ProjectsService()
