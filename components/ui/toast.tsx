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
    const common = "w-5 h-5"
    switch (type) {
      case "success":
        return <CheckCircle className={`${common} text-green-600`} />
      case "error":
        return <XCircle className={`${common} text-red-600`} />
      case "warning":
        return <AlertTriangle className={`${common} text-yellow-600`} />
      case "info":
        return <Info className={`${common} text-blue-600`} />
      default:
        return null
    }
  }

  const getToastStyles = (type: string) => {
    switch (type) {
      case "success":
        return "border-green-300 bg-green-50"
      case "error":
        return "border-red-300 bg-red-50"
      case "warning":
        return "border-yellow-300 bg-yellow-50"
      case "info":
        return "border-blue-300 bg-blue-50"
      default:
        return "border-gray-300 bg-white"
    }
  }

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-6 right-6 z-50 space-y-4 max-w-sm w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-start border rounded-xl p-4 shadow-md transition-all duration-300 ${getToastStyles(toast.type)}`}
        >
          <div className="mr-3 mt-0.5">{getToastIcon(toast.type)}</div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">{toast.title}</p>
            <p className="text-sm text-gray-700 mt-1 break-words">{toast.message}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeToast(toast.id)}
            className="ml-3 p-1 h-auto text-gray-500 hover:text-black"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  )
}
