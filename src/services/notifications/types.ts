export interface ToastNotification {
  id: string
  type: ToastType
  title: string
  message: string
  duration?: number
  action?: ToastAction
  timestamp: string
}

export enum ToastType {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

export interface ToastAction {
  label: string
  onClick: () => void
}

export interface SystemNotification {
  id: string
  userId: string
  companyId: string
  type: NotificationType
  title: string
  message: string
  data?: Record<string, any>
  isRead: boolean
  createdAt: string
  expiresAt?: string
}

export enum NotificationType {
  SYSTEM = "system",
  SECURITY = "security",
  INVENTORY = "inventory",
  ORDER = "order",
  USER = "user",
  COMPANY = "company",
}

export interface NotificationPreferences {
  userId: string
  email: boolean
  push: boolean
  inApp: boolean
  types: Record<NotificationType, boolean>
}
