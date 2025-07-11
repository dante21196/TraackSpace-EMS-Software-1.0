import { apiClient } from "../api/client"
import { API_ENDPOINTS } from "../api/endpoints"
import { toastService } from "../notifications/toast.service"
import type {
  UserSession,
  UserActivity,
  UserTrackingAnalytics,
  CompanyTrackingAnalytics,
  ActivityAction,
  TrackingFilters,
} from "./types"
// import { ActivityAction } from './constants' // Declare or import ActivityAction

class UserTrackingService {
  private currentSession: UserSession | null = null
  private activityBuffer: UserActivity[] = []
  private flushInterval: NodeJS.Timeout | null = null

  async startSession(userId: string): Promise<UserSession> {
    try {
      const sessionData = {
        userId,
        startTime: new Date().toISOString(),
        ipAddress: await this.getClientIP(),
        userAgent: navigator.userAgent,
      }

      const response = await apiClient.post<UserSession>(API_ENDPOINTS.TRACKING.LOG_SESSION, sessionData)

      if (response.success) {
        this.currentSession = response.data
        this.startActivityTracking()
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      console.error("Failed to start tracking session:", error.message)
      throw error
    }
  }

  async endSession(userId: string): Promise<void> {
    try {
      if (this.currentSession) {
        const endTime = new Date().toISOString()
        const duration = new Date(endTime).getTime() - new Date(this.currentSession.startTime).getTime()

        await apiClient.put(API_ENDPOINTS.TRACKING.LOG_SESSION, {
          sessionId: this.currentSession.id,
          endTime,
          duration: Math.floor(duration / 1000), // Convert to seconds
        })

        this.stopActivityTracking()
        this.currentSession = null
      }
    } catch (error: any) {
      console.error("Failed to end tracking session:", error.message)
    }
  }

  async logActivity(action: ActivityAction, module: string, details: Record<string, any> = {}): Promise<void> {
    if (!this.currentSession) return

    const activity: Partial<UserActivity> = {
      sessionId: this.currentSession.id,
      userId: this.currentSession.userId,
      action,
      module,
      details,
      timestamp: new Date().toISOString(),
      ipAddress: this.currentSession.ipAddress,
    }

    this.activityBuffer.push(activity as UserActivity)

    // Flush buffer if it gets too large
    if (this.activityBuffer.length >= 10) {
      await this.flushActivityBuffer()
    }
  }

  async getUserAnalytics(userId: string, filters?: TrackingFilters): Promise<UserTrackingAnalytics> {
    try {
      const queryParams = new URLSearchParams()

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined) {
            queryParams.append(key, value.toString())
          }
        })
      }

      const endpoint = `${API_ENDPOINTS.TRACKING.GET_USER_ACTIVITY(userId)}?${queryParams.toString()}`
      const response = await apiClient.get<UserTrackingAnalytics>(endpoint)

      if (response.success) {
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to fetch user analytics", error.message)
      throw error
    }
  }

  async getCompanyAnalytics(companyId: string, filters?: TrackingFilters): Promise<CompanyTrackingAnalytics> {
    try {
      const queryParams = new URLSearchParams()

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined) {
            queryParams.append(key, value.toString())
          }
        })
      }

      const endpoint = `${API_ENDPOINTS.TRACKING.GET_COMPANY_ANALYTICS(companyId)}?${queryParams.toString()}`
      const response = await apiClient.get<CompanyTrackingAnalytics>(endpoint)

      if (response.success) {
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to fetch company analytics", error.message)
      throw error
    }
  }

  private startActivityTracking(): void {
    // Flush activity buffer every 30 seconds
    this.flushInterval = setInterval(() => {
      if (this.activityBuffer.length > 0) {
        this.flushActivityBuffer()
      }
    }, 30000)

    // Track page visibility changes
    document.addEventListener("visibilitychange", () => {
      this.logActivity(document.hidden ? ActivityAction.NAVIGATE : ActivityAction.VIEW, "system", {
        visibility: document.hidden ? "hidden" : "visible",
      })
    })

    // Track navigation
    window.addEventListener("beforeunload", () => {
      this.logActivity(ActivityAction.NAVIGATE, "system", { action: "page_unload" })
      this.flushActivityBuffer()
    })
  }

  private stopActivityTracking(): void {
    if (this.flushInterval) {
      clearInterval(this.flushInterval)
      this.flushInterval = null
    }

    // Flush any remaining activities
    if (this.activityBuffer.length > 0) {
      this.flushActivityBuffer()
    }
  }

  private async flushActivityBuffer(): Promise<void> {
    if (this.activityBuffer.length === 0) return

    try {
      const activities = [...this.activityBuffer]
      this.activityBuffer = []

      await apiClient.post("/tracking/activities", { activities })
    } catch (error) {
      console.error("Failed to flush activity buffer:", error)
      // Re-add activities to buffer if flush failed
      this.activityBuffer.unshift(...this.activityBuffer)
    }
  }

  private async getClientIP(): Promise<string> {
    try {
      const response = await fetch("https://api.ipify.org?format=json")
      const data = await response.json()
      return data.ip
    } catch (error) {
      return "unknown"
    }
  }

  getCurrentSession(): UserSession | null {
    return this.currentSession
  }
}

export const userTrackingService = new UserTrackingService()
