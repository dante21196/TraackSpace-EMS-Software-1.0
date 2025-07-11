"use client"

import { useEffect, useState } from "react"
import { toastService } from "../../src/services/notifications/toast.service"
import { Button } from "./button"
import { X, CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react"

interface ToastNotification {
  id: string
  type: "success" | "error" | "warning" | "info"
  title: string
  message: string
  duration?: number
  timestamp: string
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastNotification[]>([])

  useEffect(() => {
    const unsubscribe = toastService.subscribe(setToasts)
    return unsubscribe
  }, [])

  const removeToast = (id: string) => {
    toastService.removeToast(id)
  }

  const getToastIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-600" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "info":
        return <Info className="h-5 w-5 text-blue-600" />
    }
  }

  const getToastStyles = (type: string) => {
    switch (type) {
      case "success":
        return "border-green-200 bg-green-50"
      case "error":
        return "border-red-200 bg-red-50"
      case "warning":
        return "border-yellow-200 bg-yellow-50"
      case "info":
        return "border-blue-200 bg-blue-50"
    }
  }

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div key={toast.id} className={`max-w-sm w-full border rounded-lg p-4 shadow-lg ${getToastStyles(toast.type)}`}>
          <div className="flex items-start">
            <div className="flex-shrink-0">{getToastIcon(toast.type)}</div>
            <div className="ml-3 w-0 flex-1">
              <p className="text-sm font-medium text-gray-900">{toast.title}</p>
              <p className="mt-1 text-sm text-gray-600">{toast.message}</p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <Button variant="ghost" size="sm" onClick={() => removeToast(toast.id)} className="p-1 h-auto">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
