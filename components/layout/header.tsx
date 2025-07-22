"use client"

import {
  Bell,
  CheckCircle2,
  MessageSquareText,
  User,
  LogOut,
  Settings,
  MailOpen,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export function Header() {
  return (
    <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
      {/* Left: Search */}
      <div className="relative w-72">
        <Input
          type="text"
          placeholder="Search tasks, users, workspaces..."
          className="pl-10 bg-gray-50 border border-gray-200 text-sm"
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
        </span>
      </div>

      {/* Right: Icons and Profile */}
      <div className="flex items-center gap-5">
        {/* Chat Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <MessageSquareText className="h-5 w-5 text-gray-700" />
              <Badge className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs px-1.5 rounded-full">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-96 p-3">
  <DropdownMenuLabel className="text-gray-700 text-sm mb-1">Recent Chats</DropdownMenuLabel>
  <DropdownMenuSeparator />

  {/* Message 1 */}
  <DropdownMenuItem className="flex items-center gap-3 py-3">
    <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200">
      <img src="https://i.pravatar.cc/100?img=16" alt="Priya Sharma" className="w-full h-full object-cover" />
    </div>
    <div className="flex flex-col justify-center">
      <span className="text-sm font-medium text-gray-900">Priya Sharma</span>
      <span className="text-xs text-gray-600 truncate w-64">“Hey! Can you send the report?”</span>
      <span className="text-[10px] text-gray-400 mt-0.5">2 min ago</span>
    </div>
  </DropdownMenuItem>

  {/* Message 2 */}
  <DropdownMenuItem className="flex items-center gap-3 py-3">
    <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200">
      <img src="https://i.pravatar.cc/100?img=10" alt="Ravi Dev" className="w-full h-full object-cover" />
    </div>
    <div className="flex flex-col justify-center">
      <span className="text-sm font-medium text-gray-900">Ravi Dev</span>
      <span className="text-xs text-gray-600 truncate w-64">“Zoom call at 4 PM?”</span>
      <span className="text-[10px] text-gray-400 mt-0.5">10 min ago</span>
    </div>
  </DropdownMenuItem>

  {/* Message 3 */}
  <DropdownMenuItem className="flex items-center gap-3 py-3">
    <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200">
      <img src="https://i.pravatar.cc/100?img=12" alt="Ankit Chauhan" className="w-full h-full object-cover" />
    </div>
    <div className="flex flex-col justify-center">
      <span className="text-sm font-medium text-gray-900">Ankit Chauhan</span>
      <span className="text-xs text-gray-600 truncate w-64">“Thanks for pushing the fix.”</span>
      <span className="text-[10px] text-gray-400 mt-0.5">30 min ago</span>
    </div>
  </DropdownMenuItem>
</DropdownMenuContent>

        </DropdownMenu>

        {/* Notification Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-gray-700" />
              <Badge className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 rounded-full">
                7
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80 p-2">
            <DropdownMenuLabel className="text-gray-700 text-sm">Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-start gap-2 py-2">
              <CheckCircle2 className="h-4 w-4 text-green-600 mt-1" />
              <div>
                <span className="text-sm font-medium text-gray-900">Deployment Success</span>
                <p className="text-xs text-gray-600">Trackspace Admin Panel deployed</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-start gap-2 py-2">
              <MailOpen className="h-4 w-4 text-indigo-600 mt-1" />
              <div>
                <span className="text-sm font-medium text-gray-900">New Signup</span>
                <p className="text-xs text-gray-600">A user just joined via referral</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-start gap-2 py-2">
              <Settings className="h-4 w-4 text-yellow-600 mt-1" />
              <div>
                <span className="text-sm font-medium text-gray-900">Update Available</span>
                <p className="text-xs text-gray-600">System patch v2.1 ready</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer border-l pl-4">
              <div className="relative w-9 h-9">
                <Image
                  src="https://i.pravatar.cc/100?img=11"
                  alt="Profile"
                  width={36}
                  height={36}
                  className="rounded-full object-cover"
                />
                <span className="absolute bottom-0 right-0 bg-green-500 border-2 border-white w-2.5 h-2.5 rounded-full"></span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-900">Alex Johnson</span>
                <span className="text-xs text-gray-500">Online</span>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 p-1">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>My Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => (window.location.href = "/")}>
              <LogOut className="mr-2 h-4 w-4 text-red-600" />
              <span className="text-red-600">Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
