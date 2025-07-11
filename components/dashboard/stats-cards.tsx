import { Card, CardContent } from "@/components/ui/card"
import { CheckSquare, Users, MessageCircle, Building2, TrendingUp, Clock } from "lucide-react"

const stats = [
  {
    title: "Active Tasks",
    value: "24",
    change: "+3 from yesterday",
    icon: CheckSquare,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Connections",
    value: "156",
    change: "+12 this week",
    icon: Users,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Messages",
    value: "89",
    change: "+45 today",
    icon: MessageCircle,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "Workspaces",
    value: "8",
    change: "+2 this month",
    icon: Building2,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    title: "Productivity",
    value: "92%",
    change: "+5% this week",
    icon: TrendingUp,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    title: "Time Tracked",
    value: "42h",
    change: "This week",
    icon: Clock,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </div>
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
