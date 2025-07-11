import { apiClient } from "../api/client"
import { API_ENDPOINTS } from "../api/endpoints"
import { toastService } from "../notifications/toast.service"
import { trackingService } from "../tracking/tracking.service"
import type { Conversation, Message, SendMessageData } from "./types"

class ChatService {
  async getConversations(): Promise<Conversation[]> {
    try {
      await trackingService.logActivity("view", "chat")

      const response = await apiClient.get<Conversation[]>(API_ENDPOINTS.CHAT.GET_CONVERSATIONS)

      if (response.success) {
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to fetch conversations", error.message)
      throw error
    }
  }

  async getMessages(conversationId: string, page = 1, limit = 50): Promise<{ messages: Message[]; hasMore: boolean }> {
    try {
      await trackingService.logActivity("view", "messages", { conversationId })

      const response = await apiClient.get<{ messages: Message[]; hasMore: boolean }>(
        `${API_ENDPOINTS.CHAT.GET_MESSAGES(conversationId)}?page=${page}&limit=${limit}`,
      )

      if (response.success) {
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to fetch messages", error.message)
      throw error
    }
  }

  async sendMessage(data: SendMessageData): Promise<Message> {
    try {
      const response = await apiClient.post<Message>(API_ENDPOINTS.CHAT.SEND_MESSAGE, data)

      if (response.success) {
        await trackingService.logActivity("send", "messages", { conversationId: data.conversationId })
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to send message", error.message)
      throw error
    }
  }

  async createConversation(participantIds: string[], name?: string): Promise<Conversation> {
    try {
      const response = await apiClient.post<Conversation>(API_ENDPOINTS.CHAT.CREATE_CONVERSATION, {
        participantIds,
        name,
      })

      if (response.success) {
        await trackingService.logActivity("create", "conversation", { conversationId: response.data.id })
        toastService.success("Conversation created", "New conversation started")
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to create conversation", error.message)
      throw error
    }
  }
}

export const chatService = new ChatService()
