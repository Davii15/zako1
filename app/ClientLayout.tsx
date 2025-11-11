"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { SplashScreen } from "@/components/ui/splash-screen"
import { Footer } from "@/components/layout/footer"
import { AuthProvider } from "@/lib/auth"
import { ToastProvider } from "@/components/ui/toast-provider"

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    // Only show splash screen on initial mount
    const hasSeen = sessionStorage.getItem("splash-seen")
    if (hasSeen) {
      setShowSplash(false)
    }
  }, [])

  const handleSplashComplete = () => {
    sessionStorage.setItem("splash-seen", "true")
    setShowSplash(false)
  }

  return (
    <AuthProvider>
      <ToastProvider>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
        <main className="min-h-screen relative">{children}</main>
        <Footer />
      </ToastProvider>
    </AuthProvider>
  )
}
