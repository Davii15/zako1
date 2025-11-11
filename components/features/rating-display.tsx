"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingDisplayProps {
  rating: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
  showNumber?: boolean
  reviewCount?: number
}

export function RatingDisplay({
  rating,
  maxRating = 5,
  size = "md",
  showNumber = true,
  reviewCount,
}: RatingDisplayProps) {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {Array.from({ length: maxRating }, (_, i) => {
          const filled = i < Math.floor(rating)
          const partial = i === Math.floor(rating) && rating % 1 !== 0

          return (
            <Star
              key={i}
              className={cn(
                sizeClasses[size],
                filled || partial ? "text-yellow-400 fill-yellow-400" : "text-gray-300",
                partial && "fill-yellow-400/50",
              )}
            />
          )
        })}
      </div>
      {showNumber && (
        <span className={cn("text-muted-foreground", textSizes[size])}>
          {rating.toFixed(1)}
          {reviewCount !== undefined && ` (${reviewCount})`}
        </span>
      )}
    </div>
  )
}
