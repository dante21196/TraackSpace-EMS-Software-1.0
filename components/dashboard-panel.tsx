import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Package, Users, ShoppingCart } from "lucide-react"

const metrics = [
  { title: "Total Revenue", value: "$45,231", change: "+12%", trend: "up", icon: DollarSign },
  { title: "Total Orders", value: "1,234", change: "+8%", trend: "up", icon: ShoppingCart },
  { title: "Active Customers", value: "892", change: "-2%", trend: "down", icon: Users },
  { title: "Low Stock Items", value: "23", change: "+5%", trend: "up", icon: Package },
]

const recentOrders = [
  { id: "ORD-001", customer: "Alice Johnson", amount: 299.99, status: "Completed" },
  { id: "ORD-002", customer: "Bob Smith", amount: 149.5, status: "Processing" },
  { id: "ORD-003", customer: "Carol Davis", amount: 89.99, status: "Shipped" },
  { id: "ORD-004", customer: "David Wilson", amount: 199.99, status: "Pending" },
]

export function DashboardPanel() {
  return (
    <div className="w-[380px] bg-white border-l flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <p className="text-sm text-gray-500">Real-time business metrics</p>
      </div>

      <div className="p-4 space-y-4 flex-1 overflow-auto">
        <div className="grid grid-cols-2 gap-3">
          {metrics.map((metric, index) => (
            <Card key={index} className="p-3">
              <div className="flex items-center justify-between mb-2">
                <metric.icon className="h-4 w-4 text-gray-500" />
                <div
                  className={`flex items-center text-xs ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}
                >
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {metric.change}
                </div>
              </div>
              <div className="text-lg font-bold">{metric.value}</div>
              <div className="text-xs text-gray-500">{metric.title}</div>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentOrders.map((order, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{order.id}</div>
                  <div className="text-xs text-gray-500">{order.customer}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold">${order.amount}</div>
                  <div
                    className={`text-xs px-2 py-1 rounded-full ${
                      order.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Processing"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "Shipped"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-2">
          <Button className="w-full bg-blue-600 hover:bg-blue-700">Generate Report</Button>
          <Button variant="outline" className="w-full bg-transparent">
            Export Data
          </Button>
        </div>
      </div>
    </div>
  )
}
