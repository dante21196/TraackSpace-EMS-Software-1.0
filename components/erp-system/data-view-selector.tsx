import type React from "react"
import { Button } from "@/components/ui/button"
import { Grid3X3, List, LayoutGrid } from "lucide-react"

interface ViewMode {
  label: string
  icon: React.ComponentType<{ className?: string }>
  isActive: boolean
}

const viewModes: ViewMode[] = [
  { label: "Grid View", icon: Grid3X3, isActive: true },
  { label: "List View", icon: List, isActive: false },
  { label: "Card View", icon: LayoutGrid, isActive: false },
]

export function DataViewSelector() {
  return (
    <div className="flex gap-2 mb-6">
      {viewModes.map((mode, index) => (
        <Button
          key={index}
          variant={mode.isActive ? "default" : "outline"}
          className={`rounded-lg ${mode.isActive ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-blue-50"}`}
        >
          <mode.icon className="h-4 w-4 mr-2" />
          {mode.label}
        </Button>
      ))}
    </div>
  )
}
