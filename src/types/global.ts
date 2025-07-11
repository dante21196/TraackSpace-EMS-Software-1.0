export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
  role: UserRole
  companyId?: string
  company?: Company
  isActive: boolean
  lastLoginAt?: string
  createdAt: string
  updatedAt: string
  permissions: Permission[]
}

export enum UserRole {
  SUPER_ADMIN = "super_admin",
  COMPANY_ADMIN = "company_admin",
  PROJECT_MANAGER = "project_manager",
  TEAM_LEAD = "team_lead",
  EMPLOYEE = "employee",
  CONTRACTOR = "contractor",
}

export interface Company {
  id: string
  name: string
  domain: string
  logo?: string
  industry: string
  size: CompanySize
  subscription: Subscription
  settings: CompanySettings
  limits: CompanyLimits
  isActive: boolean
  createdAt: string
  updatedAt: string
  stats: CompanyStats
}

export enum CompanySize {
  STARTUP = "startup",
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
  ENTERPRISE = "enterprise",
}

export interface Subscription {
  plan: SubscriptionPlan
  status: SubscriptionStatus
  startDate: string
  endDate?: string
  billingCycle: BillingCycle
  amount: number
}

export enum SubscriptionPlan {
  STARTER = "starter",
  PROFESSIONAL = "professional",
  ENTERPRISE = "enterprise",
  CUSTOM = "custom",
}

export enum SubscriptionStatus {
  TRIAL = "trial",
  ACTIVE = "active",
  PAST_DUE = "past_due",
  CANCELLED = "cancelled",
  EXPIRED = "expired",
}

export enum BillingCycle {
  MONTHLY = "monthly",
  YEARLY = "yearly",
}

export interface CompanyLimits {
  maxUsers: number
  maxProjects: number
  maxStorage: number // in GB
  maxIntegrations: number
  features: FeatureLimits
}

export interface FeatureLimits {
  timeTracking: boolean
  projectManagement: boolean
  reporting: boolean
  apiAccess: boolean
  customRoles: boolean
  sso: boolean
  auditLogs: boolean
}

export interface CompanySettings {
  timezone: string
  workingHours: WorkingHours
  holidays: string[]
  trackingSettings: TrackingSettings
  securitySettings: SecuritySettings
}

export interface WorkingHours {
  monday: DaySchedule
  tuesday: DaySchedule
  wednesday: DaySchedule
  thursday: DaySchedule
  friday: DaySchedule
  saturday: DaySchedule
  sunday: DaySchedule
}

export interface DaySchedule {
  isWorkingDay: boolean
  startTime: string
  endTime: string
  breakTime?: number // minutes
}

export interface TrackingSettings {
  autoTrackTime: boolean
  requireManualEntry: boolean
  allowMobileTracking: boolean
  screenshotFrequency: number // minutes, 0 = disabled
  trackIdleTime: boolean
  idleThreshold: number // minutes
}

export interface SecuritySettings {
  requireTwoFactor: boolean
  passwordPolicy: PasswordPolicy
  sessionTimeout: number // minutes
  allowedIpRanges: string[]
  restrictMobileAccess: boolean
}

export interface PasswordPolicy {
  minLength: number
  requireUppercase: boolean
  requireLowercase: boolean
  requireNumbers: boolean
  requireSpecialChars: boolean
  expiryDays: number
}

export interface CompanyStats {
  totalUsers: number
  activeUsers: number
  totalProjects: number
  activeProjects: number
  totalHoursTracked: number
  averageProductivity: number
}

export interface Permission {
  id: string
  name: string
  resource: string
  action: string
}

export interface Project {
  id: string
  name: string
  description?: string
  companyId: string
  managerId: string
  status: ProjectStatus
  priority: ProjectPriority
  startDate: string
  endDate?: string
  budget?: number
  currency: string
  members: ProjectMember[]
  tasks: Task[]
  timeEntries: TimeEntry[]
  createdAt: string
  updatedAt: string
}

export enum ProjectStatus {
  PLANNING = "planning",
  ACTIVE = "active",
  ON_HOLD = "on_hold",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export enum ProjectPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

export interface ProjectMember {
  id: string
  userId: string
  user: User
  role: ProjectRole
  hourlyRate?: number
  joinedAt: string
}

export enum ProjectRole {
  MANAGER = "manager",
  LEAD = "lead",
  DEVELOPER = "developer",
  DESIGNER = "designer",
  TESTER = "tester",
  ANALYST = "analyst",
  MEMBER = "member",
}

export interface Task {
  id: string
  title: string
  description?: string
  projectId: string
  assignedToId?: string
  assignedTo?: User
  status: TaskStatus
  priority: TaskPriority
  estimatedHours?: number
  actualHours?: number
  dueDate?: string
  completedAt?: string
  createdAt: string
  updatedAt: string
  tags: string[]
  timeEntries: TimeEntry[]
}

export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  REVIEW = "review",
  TESTING = "testing",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent",
}

export interface TimeEntry {
  id: string
  userId: string
  user: User
  projectId?: string
  project?: Project
  taskId?: string
  task?: Task
  description?: string
  startTime: string
  endTime?: string
  duration: number // minutes
  isManual: boolean
  screenshots: Screenshot[]
  activityLevel: number // 0-100
  createdAt: string
  updatedAt: string
}

export interface Screenshot {
  id: string
  url: string
  timestamp: string
  activityLevel: number
}
