import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Eye, Package, AlertTriangle } from "lucide-react"

interface InventoryCardProps {
  image: string
  productName: string
  sku: string
  unitPrice: number
  stockQuantity: number
  category: string
  supplier: string
  status: string
  reorderLevel: number
  lastUpdated: string
}

export function InventoryCard({
  image,
  productName,
  sku,
  unitPrice,
  stockQuantity,
  category,
  supplier,
  status,
  reorderLevel,
  lastUpdated,
}: InventoryCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-800 border-green-200"
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Out of Stock":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const isLowStock = stockQuantity <= reorderLevel && stockQuantity > 0

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow border border-gray-200">
      <div className="relative">
        <img src={image || "/placeholder.svg"} alt={productName} className="w-full h-48 object-cover" />
        <Badge className={`absolute top-3 right-3 ${getStatusColor(status)}`}>{status}</Badge>
        {isLowStock && (
          <div className="absolute top-3 left-3 bg-yellow-500 text-white p-1 rounded-full">
            <AlertTriangle className="h-4 w-4" />
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">{productName}</h3>
            <p className="text-xs text-gray-500">SKU: {sku}</p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-gray-500">Category:</span>
              <p className="font-medium text-gray-900">{category}</p>
            </div>
            <div>
              <span className="text-gray-500">Supplier:</span>
              <p className="font-medium text-gray-900 truncate">{supplier}</p>
            </div>
          </div>

          <div className="flex justify-between items-center py-2 border-t border-gray-100">
            <div>
              <span className="text-blue-600 font-bold text-lg">${unitPrice.toFixed(2)}</span>
              <p className="text-xs text-gray-500">Unit Price</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1">
                <Package className="h-3 w-3 text-gray-400" />
                <span
                  className={`font-semibold ${stockQuantity === 0 ? "text-red-600" : stockQuantity <= reorderLevel ? "text-yellow-600" : "text-green-600"}`}
                >
                  {stockQuantity}
                </span>
              </div>
              <p className="text-xs text-gray-500">In Stock</p>
            </div>
          </div>

          <div className="text-xs text-gray-500 mb-3">Last updated: {lastUpdated}</div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 bg-transparent hover:bg-blue-50">
              <Eye className="h-3 w-3 mr-1" />
              View Details
            </Button>
            <Button variant="outline" size="sm" className="flex-1 bg-transparent hover:bg-green-50">
              <Edit className="h-3 w-3 mr-1" />
              Edit Item
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
