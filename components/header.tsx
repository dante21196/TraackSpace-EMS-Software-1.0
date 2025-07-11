import { Search, Bell, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <div className="bg-white p-4 flex items-center gap-4 border-b">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input type="text" placeholder="Search products, customers, orders..." className="pl-10 w-full" />
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
          <div className="text-right">
            <div className="font-semibold text-sm">John Admin</div>
            <div className="text-xs text-gray-500">Administrator</div>
          </div>
        </div>
      </div>
    </div>
  )
}
