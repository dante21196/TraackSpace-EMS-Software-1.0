export interface Company {
  id: string
  name: string
  domain: string
  industry: string
  size: CompanySize
  address: CompanyAddress
  settings: CompanySettings
  subscription: CompanySubscription
  createdAt: string
  updatedAt: string
  isActive: boolean
}

export interface CompanyAddress {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface CompanySettings {
  timezone: string
  currency: string
  dateFormat: string
  workingHours: {
    start: string
    end: string
    workingDays: number[]
  }
  features: {
    inventory: boolean
    analytics: boolean
    userTracking: boolean
    multiLocation: boolean
  }
}

export interface CompanySubscription {
  plan: SubscriptionPlan
  status: SubscriptionStatus
  maxUsers: number
  currentUsers: number
  expiresAt: string
}

export enum CompanySize {
  STARTUP = "startup",
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
  ENTERPRISE = "enterprise",
}

export enum SubscriptionPlan {
  BASIC = "basic",
  PROFESSIONAL = "professional",
  ENTERPRISE = "enterprise",
}

export enum SubscriptionStatus {
  ACTIVE = "active",
  TRIAL = "trial",
  EXPIRED = "expired",
  SUSPENDED = "suspended",
}

export interface CreateCompanyData {
  name: string
  domain: string
  industry: string
  size: CompanySize
  address: CompanyAddress
  adminEmail: string
  adminFirstName: string
  adminLastName: string
}
