import { apiClient } from "../api/client"
import { API_ENDPOINTS } from "../api/endpoints"
import { toastService } from "../notifications/toast.service"
import { trackingService } from "../tracking/tracking.service"
import type { Task, CreateTaskData, TaskFilters } from "./types"

class TasksService {
  async getTasks(filters?: TaskFilters): Promise<{ tasks: Task[]; total: number }> {
    try {
      await trackingService.logActivity("view", "tasks", { filters })

      const queryParams = new URLSearchParams()
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined) {
            queryParams.append(key, value.toString())
          }
        })
      }

      const endpoint = `${API_ENDPOINTS.TASKS.GET_ALL}?${queryParams.toString()}`
      const response = await apiClient.get<{ tasks: Task[]; total: number }>(endpoint)

      if (response.success) {
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to fetch tasks", error.message)
      throw error
    }
  }

  async createTask(data: CreateTaskData): Promise<Task> {
    try {
      const response = await apiClient.post<Task>(API_ENDPOINTS.TASKS.CREATE, data)

      if (response.success) {
        await trackingService.logActivity("create", "tasks", { taskId: response.data.id })
        toastService.success("Task created", `"${data.title}" has been created`)
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to create task", error.message)
      throw error
    }
  }

  async updateTask(id: string, data: Partial<Task>): Promise<Task> {
    try {
      const response = await apiClient.put<Task>(API_ENDPOINTS.TASKS.UPDATE(id), data)

      if (response.success) {
        await trackingService.logActivity("update", "tasks", { taskId: id })
        toastService.success("Task updated", "Task has been updated successfully")
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to update task", error.message)
      throw error
    }
  }

  async completeTask(id: string): Promise<Task> {
    try {
      const response = await apiClient.post<Task>(API_ENDPOINTS.TASKS.COMPLETE(id))

      if (response.success) {
        await trackingService.logActivity("complete", "tasks", { taskId: id })
        toastService.success("Task completed", "Great job! Task marked as completed")
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to complete task", error.message)
      throw error
    }
  }

  async deleteTask(id: string): Promise<void> {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.TASKS.DELETE(id))

      if (response.success) {
        await trackingService.logActivity("delete", "tasks", { taskId: id })
        toastService.success("Task deleted", "Task has been removed")
        return
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to delete task", error.message)
      throw error
    }
  }
}

export const tasksService = new TasksService()
