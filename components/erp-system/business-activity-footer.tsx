interface BusinessActivity {
  activityType: string
  activityId: string
  amount: string
  status: string
  statusColor: string
  businessEntity: string
}

const businessActivities: BusinessActivity[] = [
  {
    activityType: "Sales Order",
    activityId: "SO-2024-156",
    amount: "$12,450",
    status: "Processing",
    statusColor: "bg-green-500",
    businessEntity: "TechCorp Ltd",
  },
  {
    activityType: "Purchase Order",
    activityId: "PO-2024-089",
    amount: "$8,750",
    status: "Approved",
    statusColor: "bg-blue-500",
    businessEntity: "MetalWorks Inc",
  },
  {
    activityType: "Invoice",
    activityId: "INV-2024-234",
    amount: "$5,299",
    status: "Overdue",
    statusColor: "bg-red-500",
    businessEntity: "Global Industries",
  },
]

export function BusinessActivityFooter() {
  return (
    <div className="bg-white border-t p-4 shadow-sm">
      <div className="flex gap-4 overflow-x-auto">
        {businessActivities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 min-w-[280px] border border-gray-200"
          >
            <div
              className={`w-10 h-10 ${activity.statusColor} rounded-full flex items-center justify-center text-white font-bold text-sm`}
            >
              {activity.activityType
                .split(" ")
                .map((word) => word.charAt(0))
                .join("")}
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-gray-900">
                {activity.activityId} - {activity.amount}
              </div>
              <div className="text-xs text-gray-600">
                {activity.businessEntity} • {activity.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
