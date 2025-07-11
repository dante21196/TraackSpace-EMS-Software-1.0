import { LayoutDashboard, Package, Users, ShoppingCart, Calculator, BarChart3, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

const erpModules = [
  { icon: LayoutDashboard, label: "Dashboard", color: "text-blue-600", isActive: true },
  { icon: Package, label: "Inventory Management", color: "text-gray-600", isActive: false },
  { icon: Users, label: "Customer Relations", color: "text-gray-600", isActive: false },
  { icon: ShoppingCart, label: "Sales Orders", color: "text-gray-600", isActive: false },
  { icon: Calculator, label: "Financial Management", color: "text-gray-600", isActive: false },
  { icon: BarChart3, label: "Business Intelligence", color: "text-gray-600", isActive: false },
  { icon: Settings, label: "System Configuration", color: "text-gray-600", isActive: false },
]

export function NavigationSidebar() {
  return (
    <div className="w-64 p-4 border-r h-screen bg-white">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <LayoutDashboard className="w-5 h-5 text-white" />
        </div>
        <span className="font-semibold text-gray-900">NEXUS ERP</span>
      </div>
      <nav className="space-y-2">
        {erpModules.map((module, index) => (
          <Button
            key={index}
            variant={module.isActive ? "secondary" : "ghost"}
            className={`w-full justify-start ${module.color} ${module.isActive ? "bg-blue-50 text-blue-600" : "hover:bg-blue-50"}`}
          >
            <module.icon className="mr-3 h-4 w-4" />
            <span className="text-sm">{module.label}</span>
          </Button>
        ))}
      </nav>
      <div className="absolute bottom-4 w-56">
        <Button variant="ghost" className="w-full justify-start text-gray-600 hover:bg-red-50 hover:text-red-600">
          <LogOut className="mr-3 h-4 w-4" />
          <span className="text-sm">Sign Out</span>
        </Button>
      </div>
    </div>
  )
}
