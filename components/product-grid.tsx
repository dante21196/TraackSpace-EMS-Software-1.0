import { ProductCard } from "./product-card"

const products = [
  {
    image: "/placeholder.svg?height=160&width=200",
    name: "Wireless Bluetooth Headphones",
    sku: "WBH-001",
    price: 89.99,
    stock: 45,
    category: "Electronics",
    status: "In Stock",
  },
  {
    image: "/placeholder.svg?height=160&width=200",
    name: "Ergonomic Office Chair",
    sku: "EOC-002",
    price: 299.99,
    stock: 12,
    category: "Furniture",
    status: "Low Stock",
  },
  {
    image: "/placeholder.svg?height=160&width=200",
    name: "Stainless Steel Water Bottle",
    sku: "SSW-003",
    price: 24.99,
    stock: 89,
    category: "Accessories",
    status: "In Stock",
  },
  {
    image: "/placeholder.svg?height=160&width=200",
    name: "LED Desk Lamp",
    sku: "LDL-004",
    price: 45.99,
    stock: 0,
    category: "Electronics",
    status: "Out of Stock",
  },
  {
    image: "/placeholder.svg?height=160&width=200",
    name: "Organic Cotton T-Shirt",
    sku: "OCT-005",
    price: 19.99,
    stock: 156,
    category: "Clothing",
    status: "In Stock",
  },
  {
    image: "/placeholder.svg?height=160&width=200",
    name: "Ceramic Coffee Mug Set",
    sku: "CCM-006",
    price: 34.99,
    stock: 23,
    category: "Kitchen",
    status: "In Stock",
  },
]

export function ProductGrid() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </div>
  )
}
