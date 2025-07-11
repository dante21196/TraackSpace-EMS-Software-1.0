import { apiClient } from "../api/client"
import { API_ENDPOINTS } from "../api/endpoints"

class TrackingService {
  private sessionId: string | null = null
  private activityBuffer: any[] = []
  private flushInterval: NodeJS.Timeout | null = null

  async startSession(): Promise<void> {
    try {
      const response = await apiClient.post(API_ENDPOINTS.TRACKING.LOG_SESSION, {
        startTime: new Date().toISOString(),
        userAgent: navigator.userAgent,
        ipAddress: await this.getClientIP(),
      })

      if (response.success) {
        this.sessionId = response.data.sessionId
        this.startActivityTracking()
      }
    } catch (error) {
      console.error("Failed to start tracking session:", error)
    }
  }

  async endSession(): Promise<void> {
    try {
      if (this.sessionId) {
        await apiClient.put(API_ENDPOINTS.TRACKING.LOG_SESSION, {
          sessionId: this.sessionId,
          endTime: new Date().toISOString(),
        })

        this.stopActivityTracking()
        this.sessionId = null
      }
    } catch (error) {
      console.error("Failed to end tracking session:", error)
    }
  }

  async logActivity(action: string, module: string, details: any = {}): Promise<void> {
    if (!this.sessionId) return

    const activity = {
      sessionId: this.sessionId,
      action,
      module,
      details,
      timestamp: new Date().toISOString(),
    }

    this.activityBuffer.push(activity)

    if (this.activityBuffer.length >= 10) {
      await this.flushActivityBuffer()
    }
  }

  async getDashboardStats(): Promise<any> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.TRACKING.GET_DASHBOARD_STATS)
      return response.success ? response.data : null
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error)
      return null
    }
  }

  private startActivityTracking(): void {
    this.flushInterval = setInterval(() => {
      if (this.activityBuffer.length > 0) {
        this.flushActivityBuffer()
      }
    }, 30000)

    document.addEventListener("visibilitychange", () => {
      this.logActivity(document.hidden ? "blur" : "focus", "system")
    })
  }

  private stopActivityTracking(): void {
    if (this.flushInterval) {
      clearInterval(this.flushInterval)
      this.flushInterval = null
    }

    if (this.activityBuffer.length > 0) {
      this.flushActivityBuffer()
    }
  }

  private async flushActivityBuffer(): Promise<void> {
    if (this.activityBuffer.length === 0) return

    try {
      const activities = [...this.activityBuffer]
      this.activityBuffer = []

      await apiClient.post(API_ENDPOINTS.TRACKING.LOG_ACTIVITY, { activities })
    } catch (error) {
      console.error("Failed to flush activity buffer:", error)
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
}

export const trackingService = new TrackingService()
