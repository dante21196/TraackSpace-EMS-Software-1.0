interface ToastNotification {
  id: string
  type: "success" | "error" | "warning" | "info"
  title: string
  message: string
  duration?: number
  timestamp: string
}

class ToastService {
  private toasts: ToastNotification[] = []
  private listeners: ((toasts: ToastNotification[]) => void)[] = []

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9)
  }

  private addToast(type: ToastNotification["type"], title: string, message: string, duration = 5000): void {
    const toast: ToastNotification = {
      id: this.generateId(),
      type,
      title,
      message,
      duration,
      timestamp: new Date().toISOString(),
    }

    this.toasts.push(toast)
    this.notifyListeners()

    if (duration > 0) {
      setTimeout(() => {
        this.removeToast(toast.id)
      }, duration)
    }
  }

  success(title: string, message: string, duration?: number): void {
    this.addToast("success", title, message, duration)
  }

  error(title: string, message: string, duration?: number): void {
    this.addToast("error", title, message, duration || 8000)
  }

  warning(title: string, message: string, duration?: number): void {
    this.addToast("warning", title, message, duration || 6000)
  }

  info(title: string, message: string, duration?: number): void {
    this.addToast("info", title, message, duration)
  }

  removeToast(id: string): void {
    this.toasts = this.toasts.filter((toast) => toast.id !== id)
    this.notifyListeners()
  }

  clearAll(): void {
    this.toasts = []
    this.notifyListeners()
  }

  getToasts(): ToastNotification[] {
    return [...this.toasts]
  }

  subscribe(listener: (toasts: ToastNotification[]) => void): () => void {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener([...this.toasts]))
  }
}

export const toastService = new ToastService()
