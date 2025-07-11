import { Package, TrendingUp, Users, ShoppingCart, FileText, AlertTriangle } from "lucide-react"

const businessModules = [
  { icon: Package, label: "Inventory", items: "2,847 Products", active: true },
  { icon: TrendingUp, label: "Sales", items: "156 Orders" },
  { icon: Users, label: "Customers", items: "1,234 Contacts" },
  { icon: ShoppingCart, label: "Procurement", items: "89 POs" },
  { icon: FileText, label: "Invoicing", items: "234 Pending" },
  { icon: AlertTriangle, label: "Alerts", items: "45 Critical" },
]

export function ModuleFilter() {
  return (
    <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
      {businessModules.map((module, index) => (
        <div
          key={index}
          className={`flex flex-col items-center p-4 rounded-xl min-w-[120px] transition-all cursor-pointer ${
            module.active
              ? "bg-blue-50 text-blue-600 border-2 border-blue-200 shadow-sm"
              : "bg-white border border-gray-200 hover:bg-blue-50 hover:border-blue-200"
          }`}
        >
          <module.icon className="h-6 w-6 mb-2" />
          <span className="text-sm font-medium">{module.label}</span>
          <span className="text-xs text-gray-500 mt-1">{module.items}</span>
        </div>
      ))}
    </div>
  )
}
