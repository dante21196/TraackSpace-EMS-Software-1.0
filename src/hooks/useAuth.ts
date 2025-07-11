"use client"

import { useState, useEffect } from "react"
import { authService } from "../services/auth/auth.service"
import type { User } from "../services/auth/types"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const currentUser = await authService.verifyToken()
      setUser(currentUser)
      setIsAuthenticated(!!currentUser)
    } catch (error) {
      setUser(null)
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string, rememberMe?: boolean) => {
    const response = await authService.login({ email, password, rememberMe })
    setUser(response.user)
    setIsAuthenticated(true)
    return response
  }

  const logout = async () => {
    await authService.logout()
    setUser(null)
    setIsAuthenticated(false)
  }

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    checkAuthStatus,
  }
}
