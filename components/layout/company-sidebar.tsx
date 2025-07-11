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

const navigationItems = [
  { icon: LayoutDashboard, label: "Dashboard", isActive: true },
  { icon: Users, label: "Team", badge: "12" },
  { icon: FolderOpen, label: "Projects", badge: "8" },
  { icon: Clock, label: "Time Tracking" },
  { icon: BarChart3, label: "Reports" },
  { icon: Bell, label: "Notifications", badge: "3" },
  { icon: Settings, label: "Company Settings" },
]

export function CompanySidebar() {
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
        {navigationItems.map((item, index) => (
          <Button
            key={index}
            variant={item.isActive ? "secondary" : "ghost"}
            className={`w-full justify-start ${
              item.isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
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
        ))}
      </nav>

      {/* Settings Box */}
      <div className="p-4">
        <Card className="bg-gray-50 border-gray-200 p-3 space-y-2">
          <Button variant="ghost" className="w-full justify-start text-gray-600 hover:bg-gray-100 h-8">
            <User className="mr-3 h-4 w-4" />
            <span className="text-sm">Profile</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-600 hover:bg-gray-100 h-8">
            <HelpCircle className="mr-3 h-4 w-4" />
            <span className="text-sm">Help Center</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-600 hover:bg-gray-100 h-8">
            <Settings className="mr-3 h-4 w-4" />
            <span className="text-sm">Settings</span>
          </Button>
        </Card>

        {/* Logout */}
        <Button variant="ghost" className="w-full justify-start text-red-600 hover:bg-red-50 mt-3">
          <LogOut className="mr-3 h-4 w-4" />
          <span className="text-sm">Sign Out</span>
        </Button>
      </div>
    </div>
  )
}
