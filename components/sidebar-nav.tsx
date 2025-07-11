import { LayoutDashboard, Package, Users, ShoppingCart, Calculator, BarChart3, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", color: "text-blue-600" },
  { icon: Package, label: "Inventory", color: "text-gray-600" },
  { icon: Users, label: "CRM", color: "text-gray-600" },
  { icon: ShoppingCart, label: "Sales", color: "text-gray-600" },
  { icon: Calculator, label: "Accounting", color: "text-gray-600" },
  { icon: BarChart3, label: "Reports", color: "text-gray-600" },
  { icon: Settings, label: "Settings", color: "text-gray-600" },
]

export function SidebarNav() {
  return (
    <div className="w-64 p-4 border-r h-screen">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <LayoutDashboard className="w-5 h-5 text-white" />
        </div>
        <span className="font-semibold">ENTERPRISE ERP</span>
      </div>
      <nav className="space-y-2">
        {navItems.map((item, index) => (
          <Button key={index} variant="ghost" className={`w-full justify-start ${item.color}`}>
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </nav>
      <Button variant="ghost" className="w-full justify-start mt-auto text-gray-600 absolute bottom-4">
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </div>
  )
}
