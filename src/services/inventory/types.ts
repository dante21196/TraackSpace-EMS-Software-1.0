export interface InventoryProduct {
  id: string
  companyId: string
  name: string
  sku: string
  description?: string
  category: ProductCategory
  supplier: Supplier
  unitPrice: number
  costPrice: number
  stockQuantity: number
  reorderLevel: number
  maxStockLevel: number
  unit: string
  weight?: number
  dimensions?: ProductDimensions
  images: string[]
  status: ProductStatus
  tags: string[]
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
}

export interface ProductCategory {
  id: string
  name: string
  description?: string
  parentId?: string
}

export interface Supplier {
  id: string
  name: string
  contactPerson: string
  email: string
  phone: string
  address: SupplierAddress
  paymentTerms: string
  isActive: boolean
}

export interface SupplierAddress {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface ProductDimensions {
  length: number
  width: number
  height: number
  unit: string
}

export enum ProductStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  DISCONTINUED = "discontinued",
}

export interface StockMovement {
  id: string
  productId: string
  type: MovementType
  quantity: number
  reason: string
  reference?: string
  cost?: number
  createdAt: string
  createdBy: string
}

export enum MovementType {
  IN = "in",
  OUT = "out",
  ADJUSTMENT = "adjustment",
  TRANSFER = "transfer",
}

export interface InventoryFilters {
  category?: string
  supplier?: string
  status?: ProductStatus
  lowStock?: boolean
  search?: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
  page?: number
  limit?: number
}

export interface InventoryListResponse {
  products: InventoryProduct[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface CreateProductData {
  name: string
  sku: string
  description?: string
  categoryId: string
  supplierId: string
  unitPrice: number
  costPrice: number
  stockQuantity: number
  reorderLevel: number
  maxStockLevel: number
  unit: string
  weight?: number
  dimensions?: ProductDimensions
  images?: string[]
  tags?: string[]
}
