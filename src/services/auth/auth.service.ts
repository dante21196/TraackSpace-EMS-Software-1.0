import { apiClient } from "../api/client"
import { API_ENDPOINTS } from "../api/endpoints"
import { toastService } from "../notifications/toast.service"
import { trackingService } from "../tracking/tracking.service"
import type { LoginCredentials, RegisterData, User, AuthResponse } from "./types"

class AuthService {
  private currentUser: User | null = null

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials)

      if (response.success) {
        this.currentUser = response.data.user
        apiClient.setAuthToken(response.data.token)

        // Start tracking session
        //await trackingService.startSession()

        toastService.success("Welcome back!", `Hello ${response.data.user.name}`)
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Login failed", error.message)
      throw error
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, data)

      if (response.success) {
        this.currentUser = response.data.user
        apiClient.setAuthToken(response.data.token)

        toastService.success("Account created!", "Welcome to the platform")
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Registration failed", error.message)
      throw error
    }
  }

  async logout(): Promise<void> {
    try {
     // await trackingService.endSession()
      //await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT)

      this.currentUser = null
      apiClient.removeAuthToken()

      toastService.success("Logged out", "See you later!")
    } catch (error: any) {
      toastService.error("Logout failed", error.message)
      throw error
    }
  }

  async verifyToken(): Promise<User | null> {
    try {
      const response = await apiClient.get<User>(API_ENDPOINTS.AUTH.VERIFY_TOKEN)

      if (response.success) {
        this.currentUser = response.data
        return response.data
      }

      return null
    } catch (error) {
      this.currentUser = null
      apiClient.removeAuthToken()
      return null
    }
  }

  getCurrentUser(): User | null {
    return this.currentUser
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null
  }
}

export const authService = new AuthService()
