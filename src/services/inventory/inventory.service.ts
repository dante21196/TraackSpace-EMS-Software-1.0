import { apiClient } from "../api/client"
import { API_ENDPOINTS } from "../api/endpoints"
import { toastService } from "../notifications/toast.service"
import { userTrackingService } from "../user-tracking/tracking.service"
import { ActivityAction } from "../user-tracking/types"
import type {
  InventoryProduct,
  CreateProductData,
  InventoryFilters,
  InventoryListResponse,
  StockMovement,
} from "./types"

class InventoryService {
  async getProducts(filters?: InventoryFilters): Promise<InventoryListResponse> {
    try {
      await userTrackingService.logActivity(ActivityAction.VIEW, "inventory", { filters })

      const queryParams = new URLSearchParams()

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined) {
            queryParams.append(key, value.toString())
          }
        })
      }

      const endpoint = `${API_ENDPOINTS.INVENTORY.GET_PRODUCTS}?${queryParams.toString()}`
      const response = await apiClient.get<InventoryListResponse>(endpoint)

      if (response.success) {
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to fetch products", error.message)
      throw error
    }
  }

  async getProduct(id: string): Promise<InventoryProduct> {
    try {
      await userTrackingService.logActivity(ActivityAction.VIEW, "inventory", { productId: id })

      const response = await apiClient.get<InventoryProduct>(API_ENDPOINTS.INVENTORY.GET_PRODUCT(id))

      if (response.success) {
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to fetch product", error.message)
      throw error
    }
  }

  async createProduct(data: CreateProductData): Promise<InventoryProduct> {
    try {
      const response = await apiClient.post<InventoryProduct>(API_ENDPOINTS.INVENTORY.CREATE_PRODUCT, data)

      if (response.success) {
        await userTrackingService.logActivity(ActivityAction.CREATE, "inventory", {
          productId: response.data.id,
          productName: response.data.name,
        })

        toastService.success("Product created", `${data.name} has been added to inventory`)
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to create product", error.message)
      throw error
    }
  }

  async updateProduct(id: string, data: Partial<InventoryProduct>): Promise<InventoryProduct> {
    try {
      const response = await apiClient.put<InventoryProduct>(API_ENDPOINTS.INVENTORY.UPDATE_PRODUCT(id), data)

      if (response.success) {
        await userTrackingService.logActivity(ActivityAction.UPDATE, "inventory", {
          productId: id,
          changes: Object.keys(data),
        })

        toastService.success("Product updated", "Product information has been updated")
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to update product", error.message)
      throw error
    }
  }

  async deleteProduct(id: string): Promise<void> {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.INVENTORY.DELETE_PRODUCT(id))

      if (response.success) {
        await userTrackingService.logActivity(ActivityAction.DELETE, "inventory", {
          productId: id,
        })

        toastService.success("Product deleted", "Product has been removed from inventory")
        return
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to delete product", error.message)
      throw error
    }
  }

  async getLowStockProducts(): Promise<InventoryProduct[]> {
    try {
      await userTrackingService.logActivity(ActivityAction.VIEW, "inventory", { filter: "low-stock" })

      const response = await apiClient.get<InventoryProduct[]>(API_ENDPOINTS.INVENTORY.GET_LOW_STOCK)

      if (response.success) {
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to fetch low stock products", error.message)
      throw error
    }
  }

  async adjustStock(productId: string, quantity: number, reason: string): Promise<StockMovement> {
    try {
      const response = await apiClient.post<StockMovement>("/inventory/stock-adjustment", {
        productId,
        quantity,
        reason,
      })

      if (response.success) {
        await userTrackingService.logActivity(ActivityAction.UPDATE, "inventory", {
          productId,
          action: "stock-adjustment",
          quantity,
          reason,
        })

        toastService.success("Stock adjusted", `Stock has been ${quantity > 0 ? "increased" : "decreased"}`)
        return response.data
      }

      throw new Error(response.message)
    } catch (error: any) {
      toastService.error("Failed to adjust stock", error.message)
      throw error
    }
  }
}

export const inventoryService = new InventoryService()
