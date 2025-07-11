import { Package, TrendingUp, Users, ShoppingCart, FileText, AlertTriangle } from "lucide-react"

const categories = [
  { icon: Package, label: "Inventory", items: "1,245 Items", active: true },
  { icon: TrendingUp, label: "Sales", items: "89 Orders" },
  { icon: Users, label: "Customers", items: "456 Contacts" },
  { icon: ShoppingCart, label: "Purchase", items: "23 Orders" },
  { icon: FileText, label: "Invoices", items: "67 Pending" },
  { icon: AlertTriangle, label: "Low Stock", items: "12 Items" },
]

export function CategoryFilter() {
  return (
    <div className="flex gap-3 mb-4 overflow-x-auto pb-2">
      {categories.map((category, index) => (
        <div
          key={index}
          className={`flex flex-col items-center p-3 rounded-xl min-w-[100px] ${
            category.active ? "bg-blue-50 text-blue-600" : "bg-white"
          } border cursor-pointer hover:bg-blue-50`}
        >
          <category.icon className="h-6 w-6 mb-1" />
          <span className="text-sm font-medium">{category.label}</span>
          <span className="text-xs text-gray-500">{category.items}</span>
        </div>
      ))}
    </div>
  )
}
