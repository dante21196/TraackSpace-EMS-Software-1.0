import type React from "react"
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

interface BusinessMetric {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ComponentType<{ className?: string }>
}

interface SystemAlert {
  alertId: string
  message: string
  priority: "Critical" | "High" | "Medium" | "Low"
  timestamp: string
}

interface BusinessTransaction {
  transactionId: string
  transactionType: string
  businessEntity: string
  amount: number
  status: string
}

const businessMetrics: BusinessMetric[] = [
  { title: "Monthly Revenue", value: "$284,750", change: "+18.2%", trend: "up", icon: DollarSign },
  { title: "Active Orders", value: "1,847", change: "+12.5%", trend: "up", icon: ShoppingCart },
  { title: "Customer Base", value: "3,456", change: "-2.1%", trend: "down", icon: Users },
  { title: "Inventory Value", value: "$1.2M", change: "+8.7%", trend: "up", icon: Package },
]

const systemAlerts: SystemAlert[] = [
  { alertId: "ALT-001", message: "Low stock: Industrial Steel Pipes", priority: "High", timestamp: "2 min ago" },
  { alertId: "ALT-002", message: "Payment overdue: TechCorp Ltd", priority: "Critical", timestamp: "15 min ago" },
  { alertId: "ALT-003", message: "Shipment delayed: Order #SO-2024-156", priority: "Medium", timestamp: "1 hour ago" },
  { alertId: "ALT-004", message: "New customer registration", priority: "Low", timestamp: "2 hours ago" },
]

const businessTransactions: BusinessTransaction[] = [
  {
    transactionId: "TXN-001",
    transactionType: "Sale",
    businessEntity: "Manufacturing Corp",
    amount: 15750.0,
    status: "Completed",
  },
  {
    transactionId: "TXN-002",
    transactionType: "Purchase",
    businessEntity: "MetalWorks Inc",
    amount: 8900.5,
    status: "Processing",
  },
  {
    transactionId: "TXN-003",
    transactionType: "Sale",
    businessEntity: "Tech Solutions Ltd",
    amount: 4299.99,
    status: "Shipped",
  },
  {
    transactionId: "TXN-004",
    transactionType: "Refund",
    businessEntity: "Global Industries",
    amount: 1250.0,
    status: "Pending",
  },
]

export function BusinessAnalyticsPanel() {
  const getAlertPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-800"
      case "High":
        return "bg-orange-100 text-orange-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const getTransactionStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Processing":
        return "bg-blue-100 text-blue-800"
      case "Shipped":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  return (
    <div className="w-[400px] bg-white border-l flex flex-col h-full shadow-sm">
      <div className="p-4 border-b bg-gray-50">
        <h2 className="text-xl font-bold text-gray-900">Business Analytics</h2>
        <p className="text-sm text-gray-600">Real-time performance metrics</p>
      </div>

      <div className="p-4 space-y-6 flex-1 overflow-auto">
        {/* Key Business Metrics */}
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

        {/* System Alerts */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              System Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {systemAlerts.map((alert, index) => (
              <div key={index} className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{alert.message}</div>
                  <div className="text-xs text-gray-500">{alert.timestamp}</div>
                </div>
                <div className={`text-xs px-2 py-1 rounded-full font-medium ${getAlertPriorityColor(alert.priority)}`}>
                  {alert.priority}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Business Transactions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-500" />
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {businessTransactions.map((transaction, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900">{transaction.transactionId}</div>
                  <div className="text-xs text-gray-500">
                    {transaction.transactionType} • {transaction.businessEntity}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-900">${transaction.amount.toLocaleString()}</div>
                  <div className={`text-xs px-2 py-1 rounded-full ${getTransactionStatusColor(transaction.status)}`}>
                    {transaction.status}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Business Actions */}
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
