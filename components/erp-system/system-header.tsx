import { Search, Bell, User, MessageSquare } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface SystemHeaderProps {
  currentUser: {
    name: string
    role: string
    avatar?: string
  }
  notificationCount: number
  messageCount: number
}

export function SystemHeader({
  currentUser = { name: "Sarah Mitchell", role: "Operations Manager" },
  notificationCount = 7,
  messageCount = 3,
}: SystemHeaderProps) {
  return (
    <div className="bg-white p-4 flex items-center gap-4 border-b shadow-sm">
      <div className="flex-1 relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search inventory, customers, orders..."
          className="pl-10 w-full bg-gray-50 border-gray-200"
        />
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative">
          <MessageSquare className="h-5 w-5 text-gray-600" />
          {messageCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-600 text-xs p-0 flex items-center justify-center">
              {messageCount}
            </Badge>
          )}
        </Button>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-gray-600" />
          {notificationCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-600 text-xs p-0 flex items-center justify-center">
              {notificationCount}
            </Badge>
          )}
        </Button>

        <div className="flex items-center gap-3 pl-3 border-l">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
          <div className="text-right">
            <div className="font-semibold text-sm text-gray-900">{currentUser.name}</div>
            <div className="text-xs text-gray-500">{currentUser.role}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
