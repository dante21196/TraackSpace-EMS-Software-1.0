export function Footer() {
  const activities = [
    { type: "Sale", id: "S001", amount: "$1,299", status: "Completed", color: "bg-green-400" },
    { type: "Purchase", id: "P045", amount: "$2,450", status: "Pending", color: "bg-blue-400" },
    { type: "Invoice", id: "I123", amount: "$899", status: "Overdue", color: "bg-red-400" },
  ]

  return (
    <div className="bg-white border-t p-4 flex gap-4">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 flex-1">
          <div
            className={`w-8 h-8 ${activity.color} rounded-full flex items-center justify-center text-white font-medium text-xs`}
          >
            {activity.type.charAt(0)}
          </div>
          <div>
            <div className="text-sm font-medium">
              {activity.id} - {activity.amount}
            </div>
            <div className="text-xs text-gray-600">{activity.status}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
