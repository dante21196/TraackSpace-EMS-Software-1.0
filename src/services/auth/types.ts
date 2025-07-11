export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  username: string
  avatar?: string
  bio?: string
  location?: string
  website?: string
  isOnline: boolean
  lastSeenAt: string
  createdAt: string
  settings: UserSettings
  stats: UserStats
}

export interface UserSettings {
  theme: "light" | "dark" | "system"
  notifications: {
    email: boolean
    push: boolean
    desktop: boolean
    sound: boolean
  }
  privacy: {
    showOnlineStatus: boolean
    allowDirectMessages: boolean
    showActivity: boolean
  }
  language: string
  timezone: string
}

export interface UserStats {
  totalTasks: number
  completedTasks: number
  activeWorkspaces: number
  connections: number
  totalHours: number
  weeklyHours: number
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken: string
  expiresAt: string
}
