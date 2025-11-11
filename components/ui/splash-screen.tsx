"use client"

import { useEffect, useState } from "react"

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onComplete()
    }, 2000) // 2 seconds splash screen

    return () => clearTimeout(timer)
  }, [onComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* African landscape gradient background */}
      <div className="absolute inset-0 african-landscape-bg animate-gradient-shift" />

      {/* Animated acacia trees silhouettes */}
      <div className="absolute bottom-0 left-0 w-24 h-32 text-emerald-900 opacity-40 animate-gentle-sway">
        <svg viewBox="0 0 100 120" className="w-full h-full">
          <path
            d="M50 120 Q40 100 50 80 Q35 70 50 50 Q30 40 50 20 Q50 0 50 0 M50 120 L50 120"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="50" cy="35" r="18" fill="currentColor" opacity="0.6" />
          <circle cx="65" cy="45" r="15" fill="currentColor" opacity="0.5" />
          <circle cx="35" cy="45" r="15" fill="currentColor" opacity="0.5" />
        </svg>
      </div>

      <div
        className="absolute bottom-0 right-0 w-28 h-36 text-amber-700 opacity-30 animate-gentle-sway"
        style={{ animationDelay: "1s" }}
      >
        <svg viewBox="0 0 100 120" className="w-full h-full">
          <path
            d="M50 120 Q40 100 50 80 Q35 70 50 50 Q30 40 50 20 Q50 0 50 0 M50 120 L50 120"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="50" cy="40" r="20" fill="currentColor" opacity="0.6" />
          <circle cx="68" cy="50" r="16" fill="currentColor" opacity="0.5" />
          <circle cx="32" cy="50" r="16" fill="currentColor" opacity="0.5" />
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
        {/* Logo/Title area */}
        <div className="mb-8 animate-pulse">
          <div className="w-20 h-20 mx-auto mb-4 bg-emerald-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
            🌾
          </div>
          <h1 className="text-5xl font-bold text-white drop-shadow-lg mb-3">FarmLease</h1>
          <h2 className="text-2xl font-semibold text-emerald-50 drop-shadow-md">Kenya</h2>
        </div>

        {/* Tagline */}
        <p className="text-emerald-50 text-lg font-medium drop-shadow-md mb-8 max-w-md">
          Connecting Farmers to Farmland, Machinery & Opportunities
        </p>

        {/* Loading animation */}
        <div className="flex gap-2 items-center justify-center">
          <div className="w-3 h-3 bg-emerald-300 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
          <div className="w-3 h-3 bg-emerald-300 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
          <div className="w-3 h-3 bg-emerald-300 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
        </div>
      </div>

      {/* African pattern overlay */}
      <div className="absolute inset-0 african-pattern opacity-20 pointer-events-none" />
    </div>
  )
}
