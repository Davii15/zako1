"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FavoritesButton } from "@/components/features/favorites-button"
import { RatingDisplay } from "@/components/features/rating-display"
import type { Listing } from "@/lib/types"
import { MapPin, Crop, MessageCircle, Eye, Users, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface ListingCardProps {
  listing: Listing
  viewMode?: "grid" | "list"
}

export function ListingCard({ listing, viewMode = "grid" }: ListingCardProps) {
  const formatPrice = (price: number, unit: string) => {
    return `KSH ${price.toLocaleString()} ${unit}`
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "land":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "plantation":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
      case "machinery":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d ago`
    }
  }

  const handleWhatsAppClick = () => {
    const message = `Hi, I'm interested in your listing: ${listing.title}`
    const whatsappUrl = `https://wa.me/${listing.whatsappNumber.replace("+", "")}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  if (viewMode === "list") {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 hover:scale-[1.01]">
        <div className="flex">
          <div className="w-48 h-32 relative flex-shrink-0">
            <img
              src={listing.photos[0] || "/placeholder.svg?height=200&width=300&query=farm"}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
            {listing.featured && <Badge className="absolute top-2 left-2 bg-primary">Featured</Badge>}
          </div>

          <div className="flex-1 p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-lg">{listing.title}</h3>
                  <Badge className={getTypeColor(listing.type)} variant="secondary">
                    {listing.type}
                  </Badge>
                  {listing.owner.verified && (
                    <Badge variant="outline" className="text-xs">
                      Verified
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {listing.county}
                  </div>
                  {listing.size && (
                    <div className="flex items-center">
                      <span>{listing.size}</span>
                    </div>
                  )}
                  {listing.cropType && (
                    <div className="flex items-center">
                      <Crop className="h-4 w-4 mr-1" />
                      {listing.cropType}
                    </div>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{listing.description}</p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <Eye className="h-3 w-3 mr-1" />
                    {listing.views} views
                  </div>
                  <div className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    {listing.favorites} favorites
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatTimeAgo(listing.createdAt)}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 ml-4">
                <FavoritesButton listingId={listing.id} size="sm" />
                <div className="text-lg font-bold text-primary">{formatPrice(listing.price, listing.priceUnit)}</div>
                {listing.averageRating && (
                  <RatingDisplay rating={listing.averageRating} reviewCount={listing.reviewCount} size="sm" />
                )}
              </div>
            </div>

            <div className="flex gap-2 mt-3">
              <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
                <Link href={`/listings/${listing.id}`}>View Details</Link>
              </Button>
              <Button onClick={handleWhatsAppClick} size="sm" className="flex-1">
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 hover:scale-[1.02] group">
      <div className="aspect-video relative">
        <img
          src={listing.photos[0] || "/placeholder.svg?height=200&width=300&query=farm"}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {listing.featured && <Badge className="absolute top-2 left-2 bg-primary animate-pulse-glow">Featured</Badge>}
        <Badge className={cn("absolute top-2 right-2", getTypeColor(listing.type))} variant="secondary">
          {listing.type}
        </Badge>

        <div className="absolute bottom-2 right-2">
          <FavoritesButton listingId={listing.id} size="sm" />
        </div>

        <div className="absolute bottom-2 left-2 flex gap-2">
          <Badge variant="secondary" className="text-xs bg-black/50 text-white">
            <Eye className="h-3 w-3 mr-1" />
            {listing.views}
          </Badge>
          {listing.owner.verified && (
            <Badge variant="secondary" className="text-xs bg-green-500 text-white">
              Verified
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-2 flex-1">{listing.title}</h3>
        </div>

        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          {listing.county}
          {listing.size && (
            <>
              <span className="mx-2">•</span>
              {listing.size}
            </>
          )}
        </div>

        {listing.cropType && (
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <Crop className="h-4 w-4 mr-1" />
            {listing.cropType}
          </div>
        )}

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{listing.description}</p>

        <div className="flex justify-between items-center mb-3">
          <div className="text-lg font-bold text-primary">{formatPrice(listing.price, listing.priceUnit)}</div>
          {listing.averageRating && (
            <RatingDisplay rating={listing.averageRating} reviewCount={listing.reviewCount} size="sm" />
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-3">
            <span className="flex items-center">
              <Users className="h-3 w-3 mr-1" />
              {listing.favorites}
            </span>
            <span className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {formatTimeAgo(listing.createdAt)}
            </span>
          </div>
          <span className="text-xs">By {listing.owner.name}</span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button asChild variant="outline" className="flex-1 bg-transparent">
          <Link href={`/listings/${listing.id}`}>View Details</Link>
        </Button>
        <Button onClick={handleWhatsAppClick} className="flex-1">
          <MessageCircle className="h-4 w-4 mr-2" />
          WhatsApp
        </Button>
      </CardFooter>
    </Card>
  )
}
