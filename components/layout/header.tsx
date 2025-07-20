import { Search, Bell, MessageSquare, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Header() {
  return (
    <div className="bg-white border-b px-6 py-4 flex justify-end items-center gap-6">
      {/* Search + Actions */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative max-w-xs w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search tasks, users, workspaces..."
            className="pl-10 bg-gray-50 border border-gray-200 text-sm"
          />
        </div>

        {/* Chat */}
        <Button variant="ghost" size="icon" className="relative">
          <MessageSquare className="h-5 w-5 text-gray-600" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-600 text-xs p-0 flex items-center justify-center">
            3
          </Badge>
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-gray-600" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-600 text-xs p-0 flex items-center justify-center">
            7
          </Badge>
        </Button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-4 border-l">
          <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
          <div className="flex flex-col justify-center leading-tight">
            <span className="text-sm font-semibold text-gray-900">Alex Johnson</span>
            <span className="text-xs text-gray-500">Online</span>
          </div>
        </div>
      </div>
    </div>
  )
}
