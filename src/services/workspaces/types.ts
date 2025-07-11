export interface Workspace {
  id: string
  name: string
  description?: string
  avatar?: string
  isPrivate: boolean
  createdBy: User
  members: WorkspaceMember[]
  createdAt: string
  updatedAt: string
  stats: WorkspaceStats
}

export interface WorkspaceMember {
  id: string
  user: User
  role: WorkspaceRole
  joinedAt: string
  isOnline: boolean
  lastSeenAt: string
}

export enum WorkspaceRole {
  OWNER = "owner",
  ADMIN = "admin",
  MEMBER = "member",
  VIEWER = "viewer",
}

export interface WorkspaceStats {
  totalMembers: number
  onlineMembers: number
  totalTasks: number
  completedTasks: number
  activeDiscussions: number
}

export interface CreateWorkspaceData {
  name: string
  description?: string
  isPrivate: boolean
}

export interface WorkspaceInvitation {
  id: string
  workspaceId: string
  workspace: Workspace
  invitedBy: User
  invitedUser: User
  role: WorkspaceRole
  status: InvitationStatus
  createdAt: string
  expiresAt: string
}

export enum InvitationStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  DECLINED = "declined",
  EXPIRED = "expired",
}

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar?: string
  isOnline: boolean
}
