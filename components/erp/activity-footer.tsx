export function ActivityFooter() {
  const businessActivities = [
    {
      type: "Sales Order",
      id: "SO-2024-156",
      amount: "$12,450",
      status: "Processing",
      color: "bg-green-500",
      customer: "TechCorp Ltd",
    },
    {
      type: "Purchase Order",
      id: "PO-2024-089",
      amount: "$8,750",
      status: "Approved",
      color: "bg-blue-500",
      supplier: "MetalWorks Inc",
    },
    {
      type: "Invoice",
      id: "INV-2024-234",
      amount: "$5,299",
      status: "Overdue",
      color: "bg-red-500",
      customer: "Global Industries",
    },
  ]

  return (
    <div className="bg-white border-t p-4 shadow-sm">
      <div className="flex gap-4 overflow-x-auto">
        {businessActivities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 min-w-[280px] border border-gray-200"
          >
            <div
              className={`w-10 h-10 ${activity.color} rounded-full flex items-center justify-center text-white font-bold text-sm`}
            >
              {activity.type
                .split(" ")
                .map((word) => word.charAt(0))
                .join("")}
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-gray-900">
                {activity.id} - {activity.amount}
              </div>
              <div className="text-xs text-gray-600">
                {activity.customer || activity.supplier} • {activity.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
