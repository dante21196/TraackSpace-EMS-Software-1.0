import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Eye, Package } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  image: string
  name: string
  sku: string
  price: number
  stock: number
  category: string
  status: string
}

export function ProductCard({ image, name, sku, price, stock, category, status }: ProductCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-800"
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800"
      case "Out of Stock":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <img src={image || "/placeholder.svg"} alt={name} className="w-full h-40 object-cover" />
        <Badge className={`absolute top-2 right-2 ${getStatusColor(status)}`}>{status}</Badge>
      </div>
      <div className="p-3">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-sm font-medium line-clamp-2">{name}</h3>
        </div>
        <div className="text-xs text-gray-500 mb-1">SKU: {sku}</div>
        <div className="text-xs text-gray-500 mb-2">Category: {category}</div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-blue-600 font-bold">${price.toFixed(2)}</span>
          <div className="flex items-center gap-1">
            <Package className="h-3 w-3 text-gray-400" />
            <span className="text-xs text-gray-500">{stock} units</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <Eye className="h-3 w-3 mr-1" />
            View
          </Button>
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </Button>
        </div>
      </div>
    </Card>
  )
}
