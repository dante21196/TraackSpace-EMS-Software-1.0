export interface Conversation {
  id: string
  type: ConversationType
  name?: string
  avatar?: string
  participants: ConversationParticipant[]
  lastMessage?: Message
  unreadCount: number
  createdAt: string
  updatedAt: string
}

export enum ConversationType {
  DIRECT = "direct",
  GROUP = "group",
  WORKSPACE = "workspace",
}

export interface ConversationParticipant {
  id: string
  user: User
  role: ParticipantRole
  joinedAt: string
  isOnline: boolean
  lastSeenAt: string
}

export enum ParticipantRole {
  ADMIN = "admin",
  MEMBER = "member",
}

export interface Message {
  id: string
  conversationId: string
  sender: User
  content: string
  type: MessageType
  attachments: MessageAttachment[]
  replyTo?: Message
  reactions: MessageReaction[]
  isEdited: boolean
  createdAt: string
  updatedAt?: string
}

export enum MessageType {
  TEXT = "text",
  IMAGE = "image",
  FILE = "file",
  SYSTEM = "system",
}

export interface MessageAttachment {
  id: string
  name: string
  url: string
  size: number
  type: string
}

export interface MessageReaction {
  id: string
  emoji: string
  user: User
  createdAt: string
}

export interface SendMessageData {
  conversationId: string
  content: string
  type: MessageType
  replyToId?: string
  attachments?: File[]
}

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar?: string
  isOnline: boolean
}
