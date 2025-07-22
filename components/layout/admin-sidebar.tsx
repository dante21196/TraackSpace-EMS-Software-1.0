"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LockIcon,
  LayoutDashboard,
  IdCard,
  Building2,
  Users,
  Settings,
  BarChart3,
  Shield,
  CreditCard,
  FileText,
  LogOut,
  User,
  HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { authService } from "@/src/services/auth/auth.service"

const navigationItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Building2, label: "Companies", href: "/admin/companies" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: IdCard, label: "Roles", href: "/admin/roles" },
    { icon: LockIcon, label: "Permissions", href: "/admin/permissions" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: CreditCard, label: "Billing", href: "/admin/billing" },
  { icon: Shield, label: "Security", href: "/admin/security" },
  { icon: FileText, label: "Audit Logs", href: "/admin/audit-logs" },
  { icon: Settings, label: "System Settings", href: "/admin/settings" },
]

const signOut = async () => {
  await authService.logout()
  window.location.href = "/"
}

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 h-screen bg-white border-r flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-gray-900">WorkTracker Admin</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item, index) => {
          const isActive = pathname === item.href
          return (
            <Link key={index} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full justify-start ${
                  isActive
                    ? "bg-purple-50 text-purple-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <item.icon className="mr-3 h-4 w-4" />
                <span className="text-sm">{item.label}</span>
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* Settings & Logout */}
      <div className="p-4">
        <Card className="bg-gray-50 border-gray-200 p-3 space-y-2">
          <Link href="/admin/profile">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600 hover:bg-gray-100 h-8"
            >
              <User className="mr-3 h-4 w-4" />
              <span className="text-sm">Admin Profile</span>
            </Button>
          </Link>
          <Link href="/admin/support">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600 hover:bg-gray-100 h-8"
            >
              <HelpCircle className="mr-3 h-4 w-4" />
              <span className="text-sm">Support</span>
            </Button>
          </Link>
          <Link href="/admin/settings">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600 hover:bg-gray-100 h-8"
            >
              <Settings className="mr-3 h-4 w-4" />
              <span className="text-sm">Admin Settings</span>
            </Button>
          </Link>
        </Card>

        {/* Logout */}
        <Button
          onClick={signOut}
          variant="ghost"
          className="w-full justify-start text-red-600 hover:bg-red-50 mt-3"
        >
          <LogOut className="mr-3 h-4 w-4" />
          <span className="text-sm">Sign Out</span>
        </Button>
      </div>
    </div>
  )
}
