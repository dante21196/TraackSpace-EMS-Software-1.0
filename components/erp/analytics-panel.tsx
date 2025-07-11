import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Users,
  ShoppingCart,
  AlertTriangle,
  FileText,
} from "lucide-react"

const businessMetrics = [
  { title: "Monthly Revenue", value: "$284,750", change: "+18.2%", trend: "up", icon: DollarSign },
  { title: "Active Orders", value: "1,847", change: "+12.5%", trend: "up", icon: ShoppingCart },
  { title: "Customer Base", value: "3,456", change: "-2.1%", trend: "down", icon: Users },
  { title: "Inventory Value", value: "$1.2M", change: "+8.7%", trend: "up", icon: Package },
]

const criticalAlerts = [
  { id: "ALT-001", message: "Low stock: Industrial Steel Pipes", priority: "High", time: "2 min ago" },
  { id: "ALT-002", message: "Payment overdue: TechCorp Ltd", priority: "Critical", time: "15 min ago" },
  { id: "ALT-003", message: "Shipment delayed: Order #SO-2024-156", priority: "Medium", time: "1 hour ago" },
  { id: "ALT-004", message: "New customer registration", priority: "Low", time: "2 hours ago" },
]

const recentTransactions = [
  { id: "TXN-001", type: "Sale", customer: "Manufacturing Corp", amount: 15750.0, status: "Completed" },
  { id: "TXN-002", type: "Purchase", supplier: "MetalWorks Inc", amount: 8900.5, status: "Processing" },
  { id: "TXN-003", type: "Sale", customer: "Tech Solutions Ltd", amount: 4299.99, status: "Shipped" },
  { id: "TXN-004", type: "Refund", customer: "Global Industries", amount: 1250.0, status: "Pending" },
]

export function AnalyticsPanel() {
  return (
    <div className="w-[400px] bg-white border-l flex flex-col h-full shadow-sm">
      <div className="p-4 border-b bg-gray-50">
        <h2 className="text-xl font-bold text-gray-900">Business Analytics</h2>
        <p className="text-sm text-gray-600">Real-time performance metrics</p>
      </div>

      <div className="p-4 space-y-6 flex-1 overflow-auto">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3">
          {businessMetrics.map((metric, index) => (
            <Card key={index} className="p-3 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <metric.icon className="h-4 w-4 text-gray-500" />
                <div
                  className={`flex items-center text-xs font-medium ${
                    metric.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {metric.change}
                </div>
              </div>
              <div className="text-lg font-bold text-gray-900">{metric.value}</div>
              <div className="text-xs text-gray-500">{metric.title}</div>
            </Card>
          ))}
        </div>

        {/* Critical Alerts */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              Critical Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {criticalAlerts.map((alert, index) => (
              <div key={index} className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{alert.message}</div>
                  <div className="text-xs text-gray-500">{alert.time}</div>
                </div>
                <div
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    alert.priority === "Critical"
                      ? "bg-red-100 text-red-800"
                      : alert.priority === "High"
                        ? "bg-orange-100 text-orange-800"
                        : alert.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {alert.priority}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-500" />
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentTransactions.map((transaction, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900">{transaction.id}</div>
                  <div className="text-xs text-gray-500">
                    {transaction.type} • {transaction.customer || transaction.supplier}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-900">${transaction.amount.toLocaleString()}</div>
                  <div
                    className={`text-xs px-2 py-1 rounded-full ${
                      transaction.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : transaction.status === "Processing"
                          ? "bg-blue-100 text-blue-800"
                          : transaction.status === "Shipped"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {transaction.status}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-3">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Generate Business Report</Button>
          <Button variant="outline" className="w-full bg-transparent hover:bg-gray-50">
            Export Analytics Data
          </Button>
          <Button variant="outline" className="w-full bg-transparent hover:bg-green-50 text-green-700 border-green-200">
            Create Purchase Order
          </Button>
        </div>
      </div>
    </div>
  )
}
