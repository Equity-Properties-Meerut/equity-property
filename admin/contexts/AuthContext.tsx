"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { authAPI } from "@/lib/api"
import { useRouter } from "next/navigation"

interface User {
  _id: string
  name: string
  email: string
  role: string
  image?: {
    url: string
    publicId: string
  }
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await authAPI.getMe()
      if (response.success && response.data) {
        setUser(response.data)
      }
    } catch (error) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login(email, password)
      if (response.success && response.data) {
        setUser(response.data)
        router.push("/admin")
      }
    } catch (error: any) {
      throw new Error(error.message || "Login failed")
    }
  }

  const logout = () => {
    authAPI.logout()
    setUser(null)
    router.push("/admin/login")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

