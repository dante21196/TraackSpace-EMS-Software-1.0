"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  FolderOpen,
  Clock,
  BarChart3,
  Settings,
  Bell,
  LogOut,
  User,
  HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { authService } from "@/src/services/auth/auth.service"

const navigationItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/company/dashboard" },
  { icon: Users, label: "Team", href: "/company/team", badge: "12" },
  { icon: FolderOpen, label: "Projects", href: "/company/projects", badge: "8" },
  { icon: Clock, label: "Time Tracking", href: "/company/time-tracking" },
  { icon: BarChart3, label: "Reports", href: "/company/reports" },
  { icon: Bell, label: "Notifications", href: "/company/notifications", badge: "3" },
  { icon: Settings, label: "Company Settings", href: "/company/settings" },
]

const signOut = async () => {
  await authService.logout()
  window.location.href = "/"
}

export function CompanySidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 h-screen bg-white border-r flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-gray-900">WorkTracker</span>
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
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <item.icon className="mr-3 h-4 w-4" />
                <span className="text-sm flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <Badge variant="secondary" className="ml-auto bg-gray-200 text-gray-700 text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* Settings & Logout */}
      <div className="p-4">
        <Card className="bg-gray-50 border-gray-200 p-3 space-y-2">
          <Link href="/company/profile">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600 hover:bg-gray-100 h-8"
            >
              <User className="mr-3 h-4 w-4" />
              <span className="text-sm">Profile</span>
            </Button>
          </Link>
          <Link href="/company/help">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600 hover:bg-gray-100 h-8"
            >
              <HelpCircle className="mr-3 h-4 w-4" />
              <span className="text-sm">Help Center</span>
            </Button>
          </Link>
          <Link href="/company/settings">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600 hover:bg-gray-100 h-8"
            >
              <Settings className="mr-3 h-4 w-4" />
              <span className="text-sm">Settings</span>
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
