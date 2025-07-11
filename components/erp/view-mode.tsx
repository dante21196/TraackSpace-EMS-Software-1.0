import { Button } from "@/components/ui/button"
import { Grid3X3, List, LayoutGrid } from "lucide-react"

const viewModes = [
  { label: "Grid View", icon: Grid3X3, active: true },
  { label: "List View", icon: List, active: false },
  { label: "Card View", icon: LayoutGrid, active: false },
]

export function ViewMode() {
  return (
    <div className="flex gap-2 mb-6">
      {viewModes.map((mode, index) => (
        <Button
          key={index}
          variant={mode.active ? "default" : "outline"}
          className={`rounded-lg ${mode.active ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-blue-50"}`}
        >
          <mode.icon className="h-4 w-4 mr-2" />
          {mode.label}
        </Button>
      ))}
    </div>
  )
}
