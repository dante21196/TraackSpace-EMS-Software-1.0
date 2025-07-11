export interface UserSession {
  id: string
  userId: string
  companyId: string
  startTime: string
  endTime?: string
  duration?: number
  ipAddress: string
  userAgent: string
  location?: SessionLocation
  isActive: boolean
  activities: UserActivity[]
}

export interface SessionLocation {
  country: string
  region: string
  city: string
  timezone: string
}

export interface UserActivity {
  id: string
  sessionId: string
  userId: string
  action: ActivityAction
  module: string
  details: Record<string, any>
  timestamp: string
  ipAddress: string
}

export enum ActivityAction {
  LOGIN = "login",
  LOGOUT = "logout",
  VIEW = "view",
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  EXPORT = "export",
  IMPORT = "import",
  SEARCH = "search",
  NAVIGATE = "navigate",
}

export interface UserTrackingAnalytics {
  userId: string
  totalSessions: number
  totalHours: number
  averageSessionDuration: number
  lastLoginAt: string
  mostActiveHours: number[]
  mostUsedModules: ModuleUsage[]
  loginFrequency: LoginFrequency[]
  deviceInfo: DeviceInfo[]
}

export interface ModuleUsage {
  module: string
  count: number
  percentage: number
}

export interface LoginFrequency {
  date: string
  count: number
}

export interface DeviceInfo {
  userAgent: string
  count: number
  lastUsed: string
}

export interface CompanyTrackingAnalytics {
  companyId: string
  totalUsers: number
  activeUsers: number
  totalSessions: number
  totalHours: number
  averageSessionDuration: number
  userActivity: UserActivitySummary[]
  moduleUsage: ModuleUsage[]
  peakHours: number[]
}

export interface UserActivitySummary {
  userId: string
  userName: string
  totalSessions: number
  totalHours: number
  lastLoginAt: string
  isActive: boolean
}

export interface TrackingFilters {
  startDate?: string
  endDate?: string
  userId?: string
  module?: string
  action?: ActivityAction
  page?: number
  limit?: number
}
