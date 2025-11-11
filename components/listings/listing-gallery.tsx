"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ListingGalleryProps {
  photos: string[]
  title: string
}

export function ListingGallery({ photos, title }: ListingGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  if (photos.length === 0) {
    return (
      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">No photos available</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
        <img
          src={photos[currentIndex] || "/placeholder.svg?height=400&width=600&query=farm"}
          alt={`${title} - Image ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />

        {photos.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Image Counter */}
            <div className="absolute bottom-2 right-2 bg-background/80 px-2 py-1 rounded text-sm">
              {currentIndex + 1} / {photos.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail Strip */}
      {photos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {photos.map((photo, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-20 h-16 rounded overflow-hidden border-2 transition-colors ${
                index === currentIndex ? "border-primary" : "border-transparent"
              }`}
            >
              <img
                src={photo || "/placeholder.svg?height=64&width=80&query=farm"}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
