"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface Toast {
  id: string
  message: string
  type: "success" | "error" | "info"
}

interface ToastContextType {
  toasts: Toast[]
  addToast: (message: string, type: Toast["type"]) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (message: string, type: Toast["type"]) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => removeToast(id), 3000)
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within ToastProvider")
  }
  return context
}

interface ToastContainerProps {
  toasts: Toast[]
  onRemove: (id: string) => void
}

function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 space-y-2 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-6 py-4 rounded-lg shadow-lg text-white font-medium flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 ${
            toast.type === "success"
              ? "bg-gradient-to-r from-emerald-600 to-teal-600"
              : toast.type === "error"
                ? "bg-gradient-to-r from-red-600 to-rose-600"
                : "bg-gradient-to-r from-blue-600 to-cyan-600"
          }`}
        >
          {toast.type === "success" && <span className="text-xl">✓</span>}
          {toast.type === "error" && <span className="text-xl">✕</span>}
          {toast.type === "info" && <span className="text-xl">ℹ</span>}
          {toast.message}
          <button onClick={() => onRemove(toast.id)} className="ml-2 hover:opacity-80 transition-opacity">
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
