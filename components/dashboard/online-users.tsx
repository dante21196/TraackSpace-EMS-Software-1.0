import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const onlineUsers = [
  { id: 1, name: "Sarah Wilson", status: "Working on design", avatar: "SW" },
  { id: 2, name: "Mike Chen", status: "In meeting", avatar: "MC" },
  { id: 3, name: "Emma Davis", status: "Available", avatar: "ED" },
  { id: 4, name: "John Smith", status: "Coding", avatar: "JS" },
  { id: 5, name: "Lisa Johnson", status: "Away", avatar: "LJ" },
  { id: 6, name: "Tom Brown", status: "Available", avatar: "TB" },
]

export function OnlineUsers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          Online Users
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            {onlineUsers.length} online
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {onlineUsers.map((user) => (
          <div key={user.id} className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">{user.avatar}</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.status}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
