export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: "/users/login",
    LOGOUT: "/users/logout",
    REFRESH: "/users/refresh",
    VERIFY_TOKEN: "/users/verify-token",
    RESET_PASSWORD: "/users/reset-password",
  },

  // Super Admin
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    COMPANIES: "/admin/companies",
    CREATE_COMPANY: "/admin/companies",
    GET_COMPANY: (id: string) => `/admin/companies/${id}`,
    UPDATE_COMPANY: (id: string) => `/admin/companies/${id}`,
    DELETE_COMPANY: (id: string) => `/admin/companies/${id}`,
    INVITE_COMPANY: "/admin/companies/invite",
    SET_COMPANY_LIMITS: (id: string) => `/admin/companies/${id}/limits`,
    USERS: "/admin/users",
    GET_USER: (id: string) => `/admin/users/${id}`,
    UPDATE_USER: (id: string) => `/admin/users/${id}`,
    DELETE_USER: (id: string) => `/admin/users/${id}`,
    SYSTEM_STATS: "/admin/stats",
    AUDIT_LOGS: "/admin/audit-logs",
  },

  // Company Management
  COMPANY: {
    PROFILE: "/company/profile",
    UPDATE_PROFILE: "/company/profile",
    SETTINGS: "/company/settings",
    UPDATE_SETTINGS: "/company/settings",
    USERS: "/company/users",
    INVITE_USER: "/company/users/invite",
    GET_USER: (id: string) => `/company/users/${id}`,
    UPDATE_USER: (id: string) => `/company/users/${id}`,
    DEACTIVATE_USER: (id: string) => `/company/users/${id}/deactivate`,
    STATS: "/company/stats",
    BILLING: "/company/billing",
  },

  // Projects
  PROJECTS: {
    GET_ALL: "/projects",
    CREATE: "/projects",
    GET_BY_ID: (id: string) => `/projects/${id}`,
    UPDATE: (id: string) => `/projects/${id}`,
    DELETE: (id: string) => `/projects/${id}`,
    ADD_MEMBER: (id: string) => `/projects/${id}/members`,
    REMOVE_MEMBER: (projectId: string, userId: string) => `/projects/${projectId}/members/${userId}`,
    GET_TASKS: (id: string) => `/projects/${id}/tasks`,
    GET_TIME_ENTRIES: (id: string) => `/projects/${id}/time-entries`,
  },

  // Tasks
  TASKS: {
    GET_ALL: "/tasks",
    CREATE: "/tasks",
    GET_BY_ID: (id: string) => `/tasks/${id}`,
    UPDATE: (id: string) => `/tasks/${id}`,
    DELETE: (id: string) => `/tasks/${id}`,
    ASSIGN: (id: string) => `/tasks/${id}/assign`,
    COMPLETE: (id: string) => `/tasks/${id}/complete`,
    GET_TIME_ENTRIES: (id: string) => `/tasks/${id}/time-entries`,
  },

  // Time Tracking
  TIME_TRACKING: {
    START: "/time-tracking/start",
    STOP: "/time-tracking/stop",
    GET_ENTRIES: "/time-tracking/entries",
    CREATE_ENTRY: "/time-tracking/entries",
    UPDATE_ENTRY: (id: string) => `/time-tracking/entries/${id}`,
    DELETE_ENTRY: (id: string) => `/time-tracking/entries/${id}`,
    GET_CURRENT: "/time-tracking/current",
    UPLOAD_SCREENSHOT: "/time-tracking/screenshot",
  },

  // Reports
  REPORTS: {
    TIME_SUMMARY: "/reports/time-summary",
    PROJECT_SUMMARY: "/reports/project-summary",
    USER_PRODUCTIVITY: "/reports/user-productivity",
    COMPANY_OVERVIEW: "/reports/company-overview",
    EXPORT: "/reports/export",
  },

  // Notifications
  NOTIFICATIONS: {
    GET_ALL: "/notifications",
    MARK_READ: (id: string) => `/notifications/${id}/read`,
    MARK_ALL_READ: "/notifications/read-all",
    GET_UNREAD_COUNT: "/notifications/unread-count",
  },
} as const
