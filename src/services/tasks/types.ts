export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  assignedTo?: User
  assignedBy: User
  workspaceId?: string
  workspace?: Workspace
  dueDate?: string
  completedAt?: string
  createdAt: string
  updatedAt: string
  tags: string[]
  attachments: TaskAttachment[]
  comments: TaskComment[]
}

export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  REVIEW = "review",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent",
}

export interface TaskAttachment {
  id: string
  name: string
  url: string
  size: number
  type: string
  uploadedAt: string
  uploadedBy: User
}

export interface TaskComment {
  id: string
  content: string
  author: User
  createdAt: string
  updatedAt?: string
}

export interface CreateTaskData {
  title: string
  description?: string
  priority: TaskPriority
  assignedToId?: string
  workspaceId?: string
  dueDate?: string
  tags?: string[]
}

export interface TaskFilters {
  status?: TaskStatus
  priority?: TaskPriority
  assignedTo?: string
  workspace?: string
  search?: string
  dueDate?: string
  page?: number
  limit?: number
}

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar?: string
}

interface Workspace {
  id: string
  name: string
  description?: string
}
