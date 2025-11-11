"use client"

import { useEffect, useState } from "react"

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Main African landscape gradient */}
      <div className="absolute inset-0 african-landscape-bg animate-gradient-shift opacity-20" />

      {/* Floating elements representing African nature */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-yellow-400/30 rounded-full animate-floating-clouds" />
      <div
        className="absolute top-32 right-20 w-12 h-12 bg-orange-400/25 rounded-full animate-floating-clouds"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-48 left-1/3 w-8 h-8 bg-green-400/30 rounded-full animate-floating-clouds"
        style={{ animationDelay: "4s" }}
      />

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 african-pattern opacity-10" />

      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
