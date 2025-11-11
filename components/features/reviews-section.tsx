"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RatingDisplay } from "./rating-display"
import { Star } from "lucide-react"
import type { Review } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ReviewsSectionProps {
  listingId: string
  reviews?: Review[]
  averageRating?: number
  onAddReview?: (review: Omit<Review, "id" | "createdAt">) => void
}

export function ReviewsSection({ listingId, reviews = [], averageRating, onAddReview }: ReviewsSectionProps) {
  const [newReview, setNewReview] = useState("")
  const [newRating, setNewRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmitReview = async () => {
    if (!newReview.trim() || newRating === 0) return

    setSubmitting(true)
    try {
      const review: Omit<Review, "id" | "createdAt"> = {
        listingId,
        userId: "current-user", // This would come from auth context
        userName: "Current User", // This would come from auth context
        rating: newRating,
        comment: newReview.trim(),
      }

      onAddReview?.(review)
      setNewReview("")
      setNewRating(0)
    } catch (error) {
      console.error("Failed to submit review:", error)
    } finally {
      setSubmitting(false)
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Reviews & Ratings</span>
          {averageRating && (
            <div className="flex items-center gap-2">
              <RatingDisplay rating={averageRating} reviewCount={reviews.length} />
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add Review Form */}
        <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
          <h4 className="font-medium">Write a Review</h4>

          {/* Rating Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Your Rating</label>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  className="transition-colors"
                  onMouseEnter={() => setHoveredRating(i + 1)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setNewRating(i + 1)}
                >
                  <Star
                    className={cn(
                      "h-6 w-6",
                      (hoveredRating || newRating) > i
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300 hover:text-yellow-300",
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Your Review</label>
            <Textarea
              placeholder="Share your experience with this listing..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              rows={3}
            />
          </div>

          <Button
            onClick={handleSubmitReview}
            disabled={!newReview.trim() || newRating === 0 || submitting}
            className="w-full"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </Button>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="flex gap-4 p-4 border rounded-lg">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={`/abstract-geometric-shapes.png?height=40&width=40&query=${review.userName}`} />
                  <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">{review.userName}</h5>
                      <RatingDisplay rating={review.rating} showNumber={false} size="sm" />
                    </div>
                    <span className="text-sm text-muted-foreground">{formatDate(review.createdAt)}</span>
                  </div>

                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No reviews yet. Be the first to review this listing!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
