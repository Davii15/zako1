"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface FavoritesButtonProps {
  listingId: string
  initialFavorited?: boolean
  onToggle?: (favorited: boolean) => void
  size?: "sm" | "md" | "lg"
}

export function FavoritesButton({ listingId, initialFavorited = false, onToggle, size = "md" }: FavoritesButtonProps) {
  const [favorited, setFavorited] = useState(initialFavorited)
  const [loading, setLoading] = useState(false)

  const handleToggle = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300))
      const newFavorited = !favorited
      setFavorited(newFavorited)
      onToggle?.(newFavorited)
    } catch (error) {
      console.error("Failed to toggle favorite:", error)
    } finally {
      setLoading(false)
    }
  }

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  }

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  return (
    <Button
      variant={favorited ? "default" : "outline"}
      size="icon"
      className={cn(
        sizeClasses[size],
        "transition-all duration-200",
        favorited ? "bg-red-500 hover:bg-red-600 text-white" : "hover:bg-red-50 hover:text-red-500",
        loading && "animate-pulse",
      )}
      onClick={handleToggle}
      disabled={loading}
    >
      <Heart className={cn(iconSizes[size], favorited && "fill-current")} />
    </Button>
  )
}
