import { apiClient } from "../api/client"
import { API_ENDPOINTS } from "../api/endpoints"
import { toastService } from "../notifications/toast.service"
import { trackingService } from "../tracking/tracking.service"
import type { Workspace, CreateWorkspaceData, WorkspaceInvitation, WorkspaceRole } from "./types"

class WorkspacesService {
  async getWorkspaces(): Promise<Workspace[]> {
    try {
      await trackingService.logActivity("view", "workspaces")

      const response = await apiClient.get<Workspace[]>(API_ENDPOINTS.WORKSPACES.GET_ALL)

      if (response.success) {
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to fetch workspaces", error.message)
      throw error
    }
  }

  async createWorkspace(data: CreateWorkspaceData): Promise<Workspace> {
    try {
      const response = await apiClient.post<Workspace>(API_ENDPOINTS.WORKSPACES.CREATE, data)

      if (response.success) {
        await trackingService.logActivity("create", "workspaces", { workspaceId: response.data.id })
        toastService.success("Workspace created", `"${data.name}" workspace has been created`)
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to create workspace", error.message)
      throw error
    }
  }

  async joinWorkspace(id: string): Promise<Workspace> {
    try {
      const response = await apiClient.post<Workspace>(API_ENDPOINTS.WORKSPACES.JOIN(id))

      if (response.success) {
        await trackingService.logActivity("join", "workspaces", { workspaceId: id })
        toastService.success("Joined workspace", "You've successfully joined the workspace")
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to join workspace", error.message)
      throw error
    }
  }

  async leaveWorkspace(id: string): Promise<void> {
    try {
      const response = await apiClient.post(API_ENDPOINTS.WORKSPACES.LEAVE(id))

      if (response.success) {
        await trackingService.logActivity("leave", "workspaces", { workspaceId: id })
        toastService.success("Left workspace", "You've left the workspace")
        return
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to leave workspace", error.message)
      throw error
    }
  }

  async inviteUser(workspaceId: string, userId: string, role: WorkspaceRole): Promise<WorkspaceInvitation> {
    try {
      const response = await apiClient.post<WorkspaceInvitation>(API_ENDPOINTS.WORKSPACES.INVITE_USER(workspaceId), {
        userId,
        role,
      })

      if (response.success) {
        await trackingService.logActivity("invite", "workspaces", { workspaceId, userId })
        toastService.success("Invitation sent", "User has been invited to the workspace")
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to send invitation", error.message)
      throw error
    }
  }
}

export const workspacesService = new WorkspacesService()
