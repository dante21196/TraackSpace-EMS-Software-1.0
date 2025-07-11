"use client"

import { useState, useEffect } from "react"
import { toastService } from "../services/notifications/toast.service"
import type { ToastNotification } from "../services/notifications/types"

export function useToast() {
  const [toasts, setToasts] = useState<ToastNotification[]>([])

  useEffect(() => {
    const unsubscribe = toastService.subscribe(setToasts)
    return unsubscribe
  }, [])

  const removeToast = (id: string) => {
    toastService.removeToast(id)
  }

  const clearAll = () => {
    toastService.clearAll()
  }

  return {
    toasts,
    removeToast,
    clearAll,
  }
}
