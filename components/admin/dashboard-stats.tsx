import { Card, CardContent } from "@/components/ui/card"
import { Building2, Users, DollarSign, TrendingUp, AlertTriangle, CreditCard } from "lucide-react"

interface AdminDashboardStatsProps {
  stats: {
    totalCompanies: number
    activeCompanies: number
    totalUsers: number
    activeUsers: number
    totalRevenue: number
    monthlyRevenue: number
    trialCompanies: number
    churnRate: number
  }
}

export function AdminDashboardStats({ stats }: AdminDashboardStatsProps) {
  const statCards = [
    {
      title: "Total Companies",
      value: stats.totalCompanies.toLocaleString(),
      change: `${stats.activeCompanies} active`,
      icon: Building2,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      change: `${stats.activeUsers} active`,
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Total Revenue",
      value: `$${(stats.totalRevenue / 1000).toFixed(1)}K`,
      change: `$${(stats.monthlyRevenue / 1000).toFixed(1)}K this month`,
      icon: DollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Growth Rate",
      value: "12.5%",
      change: "+2.1% from last month",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Trial Companies",
      value: stats.trialCompanies.toString(),
      change: "Converting to paid",
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Churn Rate",
      value: `${stats.churnRate.toFixed(1)}%`,
      change: "Last 30 days",
      icon: CreditCard,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {statCards.map((stat, index) => (
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
