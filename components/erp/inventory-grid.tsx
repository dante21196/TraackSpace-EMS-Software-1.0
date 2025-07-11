import { InventoryCard } from "./inventory-card"

const inventoryItems = [
  {
    image: "/placeholder.svg?height=160&width=200",
    productName: "Industrial Steel Pipes",
    sku: "ISP-2024-001",
    unitPrice: 245.99,
    stockQuantity: 156,
    category: "Raw Materials",
    supplier: "MetalWorks Inc",
    status: "In Stock",
    reorderLevel: 50,
    lastUpdated: "2024-01-10",
  },
  {
    image: "/placeholder.svg?height=160&width=200",
    productName: "Electronic Circuit Boards",
    sku: "ECB-2024-002",
    unitPrice: 89.5,
    stockQuantity: 23,
    category: "Electronics",
    supplier: "TechComponents Ltd",
    status: "Low Stock",
    reorderLevel: 25,
    lastUpdated: "2024-01-09",
  },
  {
    image: "/placeholder.svg?height=160&width=200",
    productName: "Premium Office Furniture Set",
    sku: "POF-2024-003",
    unitPrice: 1299.99,
    stockQuantity: 8,
    category: "Furniture",
    supplier: "OfficePro Solutions",
    status: "Low Stock",
    reorderLevel: 10,
    lastUpdated: "2024-01-08",
  },
  {
    image: "/placeholder.svg?height=160&width=200",
    productName: "High-Performance Laptops",
    sku: "HPL-2024-004",
    unitPrice: 1899.99,
    stockQuantity: 0,
    category: "IT Equipment",
    supplier: "CompuTech Distributors",
    status: "Out of Stock",
    reorderLevel: 15,
    lastUpdated: "2024-01-07",
  },
  {
    image: "/placeholder.svg?height=160&width=200",
    productName: "Industrial Safety Equipment",
    sku: "ISE-2024-005",
    unitPrice: 156.75,
    stockQuantity: 89,
    category: "Safety",
    supplier: "SafetyFirst Corp",
    status: "In Stock",
    reorderLevel: 30,
    lastUpdated: "2024-01-11",
  },
  {
    image: "/placeholder.svg?height=160&width=200",
    productName: "Commercial Kitchen Appliances",
    sku: "CKA-2024-006",
    unitPrice: 2499.99,
    stockQuantity: 12,
    category: "Appliances",
    supplier: "KitchenPro Industries",
    status: "In Stock",
    reorderLevel: 5,
    lastUpdated: "2024-01-10",
  },
]

export function InventoryGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {inventoryItems.map((item, index) => (
        <InventoryCard key={index} {...item} />
      ))}
    </div>
  )
}
