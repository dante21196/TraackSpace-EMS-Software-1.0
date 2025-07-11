import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CheckSquare, MessageCircle, Users, Building2 } from "lucide-react"

const activities = [
  {
    id: 1,
    user: "Sarah Wilson",
    action: "completed task",
    target: "Update user interface",
    time: "2 minutes ago",
    icon: CheckSquare,
    color: "text-green-600",
  },
  {
    id: 2,
    user: "Mike Chen",
    action: "sent message in",
    target: "Design Team",
    time: "5 minutes ago",
    icon: MessageCircle,
    color: "text-blue-600",
  },
  {
    id: 3,
    user: "Emma Davis",
    action: "joined workspace",
    target: "Marketing Hub",
    time: "10 minutes ago",
    icon: Building2,
    color: "text-purple-600",
  },
  {
    id: 4,
    user: "John Smith",
    action: "connected with",
    target: "Lisa Johnson",
    time: "15 minutes ago",
    icon: Users,
    color: "text-orange-600",
  },
  {
    id: 5,
    user: "Alex Johnson",
    action: "completed task",
    target: "Review documentation",
    time: "20 minutes ago",
    icon: CheckSquare,
    color: "text-green-600",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">
                {activity.user
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">
                <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                <span className="font-medium">{activity.target}</span>
              </p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
            <activity.icon className={`h-4 w-4 ${activity.color}`} />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
