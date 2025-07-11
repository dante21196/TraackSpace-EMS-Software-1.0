import type React from "react"
import { Package, TrendingUp, Users, ShoppingCart, FileText, AlertTriangle } from "lucide-react"

interface BusinessModule {
  icon: React.ComponentType<{ className?: string }>
  label: string
  itemCount: string
  isActive: boolean
}

const businessModules: BusinessModule[] = [
  { icon: Package, label: "Inventory", itemCount: "2,847 Products", isActive: true },
  { icon: TrendingUp, label: "Sales", itemCount: "156 Orders", isActive: false },
  { icon: Users, label: "Customers", itemCount: "1,234 Contacts", isActive: false },
  { icon: ShoppingCart, label: "Procurement", itemCount: "89 POs", isActive: false },
  { icon: FileText, label: "Invoicing", itemCount: "234 Pending", isActive: false },
  { icon: AlertTriangle, label: "Alerts", itemCount: "45 Critical", isActive: false },
]

export function BusinessModuleFilter() {
  return (
    <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
      {businessModules.map((module, index) => (
        <div
          key={index}
          className={`flex flex-col items-center p-4 rounded-xl min-w-[120px] transition-all cursor-pointer ${
            module.isActive
              ? "bg-blue-50 text-blue-600 border-2 border-blue-200 shadow-sm"
              : "bg-white border border-gray-200 hover:bg-blue-50 hover:border-blue-200"
          }`}
        >
          <module.icon className="h-6 w-6 mb-2" />
          <span className="text-sm font-medium">{module.label}</span>
          <span className="text-xs text-gray-500 mt-1">{module.itemCount}</span>
        </div>
      ))}
    </div>
  )
}
