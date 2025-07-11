import { apiClient } from "../api/client"
import { API_ENDPOINTS } from "../api/endpoints"
import { toastService } from "../notifications/toast.service"
import type { TimeEntry } from "../../types/global"

export interface StartTimeTrackingData {
  projectId?: string
  taskId?: string
  description?: string
}

export interface CreateTimeEntryData {
  projectId?: string
  taskId?: string
  description?: string
  startTime: string
  endTime: string
  duration: number
}

export interface TimeTrackingFilters {
  projectId?: string
  taskId?: string
  userId?: string
  startDate?: string
  endDate?: string
  page?: number
  limit?: number
}

class TimeTrackingService {
  private currentEntry: TimeEntry | null = null
  private screenshotInterval: NodeJS.Timeout | null = null

  async startTracking(data: StartTimeTrackingData): Promise<TimeEntry> {
    try {
      const response = await apiClient.post<TimeEntry>(API_ENDPOINTS.TIME_TRACKING.START, data)

      if (response.success) {
        this.currentEntry = response.data
        this.startScreenshotCapture()
        toastService.success("Time tracking started", "Timer is now running")
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to start tracking", error.message)
      throw error
    }
  }

  async stopTracking(): Promise<TimeEntry> {
    try {
      const response = await apiClient.post<TimeEntry>(API_ENDPOINTS.TIME_TRACKING.STOP)

      if (response.success) {
        this.currentEntry = null
        this.stopScreenshotCapture()
        toastService.success("Time tracking stopped", `Tracked ${this.formatDuration(response.data.duration)}`)
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to stop tracking", error.message)
      throw error
    }
  }

  async getCurrentEntry(): Promise<TimeEntry | null> {
    try {
      const response = await apiClient.get<TimeEntry>(API_ENDPOINTS.TIME_TRACKING.GET_CURRENT)

      if (response.success) {
        this.currentEntry = response.data
        return response.data
      }

      return null
    } catch (error) {
      return null
    }
  }

  async getTimeEntries(filters?: TimeTrackingFilters): Promise<{ entries: TimeEntry[]; total: number }> {
    try {
      const params = new URLSearchParams()

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined) {
            params.append(key, value.toString())
          }
        })
      }

      const response = await apiClient.get<{ entries: TimeEntry[]; total: number }>(
        `${API_ENDPOINTS.TIME_TRACKING.GET_ENTRIES}?${params.toString()}`,
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

  async createTimeEntry(data: CreateTimeEntryData): Promise<TimeEntry> {
    try {
      const response = await apiClient.post<TimeEntry>(API_ENDPOINTS.TIME_TRACKING.CREATE_ENTRY, data)

      if (response.success) {
        toastService.success("Time entry created", "Manual time entry has been added")
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to create time entry", error.message)
      throw error
    }
  }

  async updateTimeEntry(id: string, data: Partial<TimeEntry>): Promise<TimeEntry> {
    try {
      const response = await apiClient.put<TimeEntry>(API_ENDPOINTS.TIME_TRACKING.UPDATE_ENTRY(id), data)

      if (response.success) {
        toastService.success("Time entry updated", "Time entry has been updated")
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to update time entry", error.message)
      throw error
    }
  }

  async deleteTimeEntry(id: string): Promise<void> {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.TIME_TRACKING.DELETE_ENTRY(id))

      if (response.success) {
        toastService.success("Time entry deleted", "Time entry has been removed")
        return
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to delete time entry", error.message)
      throw error
    }
  }

  private async startScreenshotCapture(): void {
    // Only capture screenshots if enabled in company settings
    const frequency = 10 // minutes - should come from company settings

    if (frequency > 0) {
      this.screenshotInterval = setInterval(
        async () => {
          await this.captureScreenshot()
        },
        frequency * 60 * 1000,
      )
    }
  }

  private stopScreenshotCapture(): void {
    if (this.screenshotInterval) {
      clearInterval(this.screenshotInterval)
      this.screenshotInterval = null
    }
  }

  private async captureScreenshot(): Promise<void> {
    try {
      // This would use screen capture API in a real implementation
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      // Simulate screenshot capture
      canvas.width = 1280
      canvas.height = 720

      if (ctx) {
        ctx.fillStyle = "#f0f0f0"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "#333"
        ctx.font = "24px Arial"
        ctx.fillText("Screenshot captured at " + new Date().toLocaleTimeString(), 50, 50)
      }

      canvas.toBlob(async (blob) => {
        if (blob) {
          const formData = new FormData()
          formData.append("screenshot", blob, "screenshot.png")
          formData.append("timestamp", new Date().toISOString())

          await apiClient.post(API_ENDPOINTS.TIME_TRACKING.UPLOAD_SCREENSHOT, formData)
        }
      })
    } catch (error) {
      console.error("Failed to capture screenshot:", error)
    }
  }

  private formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60

    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  isTracking(): boolean {
    return this.currentEntry !== null
  }

  getCurrentTrackingEntry(): TimeEntry | null {
    return this.currentEntry
  }
}

export const timeTrackingService = new TimeTrackingService()
