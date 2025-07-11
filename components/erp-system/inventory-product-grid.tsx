import { InventoryProductCard } from "./inventory-product-card"

interface InventoryProduct {
  productId: string
  productName: string
  productSku: string
  unitPrice: number
  stockQuantity: number
  productCategory: string
  supplierName: string
  stockStatus: string
  reorderLevel: number
  lastUpdated: string
  productImage: string
}

const inventoryProducts: InventoryProduct[] = [
  {
    productId: "PROD-001",
    productImage: "/placeholder.svg?height=160&width=200",
    productName: "Industrial Steel Pipes",
    productSku: "ISP-2024-001",
    unitPrice: 245.99,
    stockQuantity: 156,
    productCategory: "Raw Materials",
    supplierName: "MetalWorks Inc",
    stockStatus: "In Stock",
    reorderLevel: 50,
    lastUpdated: "2024-01-10",
  },
  {
    productId: "PROD-002",
    productImage: "/placeholder.svg?height=160&width=200",
    productName: "Electronic Circuit Boards",
    productSku: "ECB-2024-002",
    unitPrice: 89.5,
    stockQuantity: 23,
    productCategory: "Electronics",
    supplierName: "TechComponents Ltd",
    stockStatus: "Low Stock",
    reorderLevel: 25,
    lastUpdated: "2024-01-09",
  },
  {
    productId: "PROD-003",
    productImage: "/placeholder.svg?height=160&width=200",
    productName: "Premium Office Furniture Set",
    productSku: "POF-2024-003",
    unitPrice: 1299.99,
    stockQuantity: 8,
    productCategory: "Furniture",
    supplierName: "OfficePro Solutions",
    stockStatus: "Low Stock",
    reorderLevel: 10,
    lastUpdated: "2024-01-08",
  },
  {
    productId: "PROD-004",
    productImage: "/placeholder.svg?height=160&width=200",
    productName: "High-Performance Laptops",
    productSku: "HPL-2024-004",
    unitPrice: 1899.99,
    stockQuantity: 0,
    productCategory: "IT Equipment",
    supplierName: "CompuTech Distributors",
    stockStatus: "Out of Stock",
    reorderLevel: 15,
    lastUpdated: "2024-01-07",
  },
  {
    productId: "PROD-005",
    productImage: "/placeholder.svg?height=160&width=200",
    productName: "Industrial Safety Equipment",
    productSku: "ISE-2024-005",
    unitPrice: 156.75,
    stockQuantity: 89,
    productCategory: "Safety",
    supplierName: "SafetyFirst Corp",
    stockStatus: "In Stock",
    reorderLevel: 30,
    lastUpdated: "2024-01-11",
  },
  {
    productId: "PROD-006",
    productImage: "/placeholder.svg?height=160&width=200",
    productName: "Commercial Kitchen Appliances",
    productSku: "CKA-2024-006",
    unitPrice: 2499.99,
    stockQuantity: 12,
    productCategory: "Appliances",
    supplierName: "KitchenPro Industries",
    stockStatus: "In Stock",
    reorderLevel: 5,
    lastUpdated: "2024-01-10",
  },
]

export function InventoryProductGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {inventoryProducts.map((product) => (
        <InventoryProductCard key={product.productId} {...product} />
      ))}
    </div>
  )
}
