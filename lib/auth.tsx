"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { User, UserRole } from "./types"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, name: string, password: string, role: UserRole) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("user")
      return stored ? JSON.parse(stored) : null
    }
    return null
  })

  const login = useCallback(async (email: string, password: string) => {
    const mockUser: User = {
      id: "user-" + Math.random().toString(36).substr(2, 9),
      email,
      name: email.split("@")[0],
      role: "farmer",
      verified: false,
      createdAt: new Date(),
    }
    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
  }, [])

  const signup = useCallback(async (email: string, name: string, password: string, role: UserRole) => {
    const newUser: User = {
      id: "user-" + Math.random().toString(36).substr(2, 9),
      email,
      name,
      role,
      verified: false,
      createdAt: new Date(),
    }
    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem("user")
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
