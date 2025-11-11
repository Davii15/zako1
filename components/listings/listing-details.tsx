import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { Listing } from "@/lib/types"
import { MapPin, Calendar, Crop, Ruler, DollarSign, Tag } from "lucide-react"

interface ListingDetailsProps {
  listing: Listing
}

export function ListingDetails({ listing }: ListingDetailsProps) {
  const formatPrice = (price: number, unit: string) => {
    return `KSH ${price.toLocaleString()} ${unit}`
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "land":
        return "bg-green-100 text-green-800"
      case "plantation":
        return "bg-amber-100 text-amber-800"
      case "machinery":
        return "bg-blue-100 text-blue-800"
      case "warehouse":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge className={getTypeColor(listing.type)} variant="secondary">
            {listing.type}
          </Badge>
          {listing.featured && <Badge className="bg-primary text-primary-foreground">Featured</Badge>}
        </div>
        <h1 className="text-3xl font-bold text-balance mb-2">{listing.title}</h1>
        <div className="flex items-center text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          {listing.county}, Kenya
        </div>
      </div>

      {/* Price */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-3xl font-bold text-primary">{formatPrice(listing.price, listing.priceUnit)}</div>
        </CardContent>
      </Card>

      {/* Key Details */}
      <Card>
        <CardHeader>
          <CardTitle>Key Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm text-muted-foreground mr-2">Type:</span>
              <span className="capitalize">{listing.type}</span>
            </div>

            {listing.cropType && (
              <div className="flex items-center">
                <Crop className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground mr-2">Crop:</span>
                <span className="capitalize">{listing.cropType}</span>
              </div>
            )}

            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm text-muted-foreground mr-2">Location:</span>
              <span>{listing.county}</span>
            </div>

            {listing.size && (
              <div className="flex items-center">
                <Ruler className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground mr-2">Size:</span>
                <span>{listing.size}</span>
              </div>
            )}

            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm text-muted-foreground mr-2">Price:</span>
              <span>{formatPrice(listing.price, listing.priceUnit)}</span>
            </div>

            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm text-muted-foreground mr-2">Listed:</span>
              <span>{listing.createdAt.toLocaleDateString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{listing.description}</p>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">What's Included</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {listing.type === "plantation" && (
                <>
                  <li>• Established {listing.cropType} plants</li>
                  <li>• Water access and irrigation system</li>
                  <li>• Basic farming tools and equipment</li>
                </>
              )}
              {listing.type === "land" && (
                <>
                  <li>• Cleared and prepared land</li>
                  <li>• Water access (borehole/river)</li>
                  <li>• Road access for transportation</li>
                </>
              )}
              {listing.type === "machinery" && (
                <>
                  <li>• Regular maintenance included</li>
                  <li>• Operator training available</li>
                  <li>• Fuel not included</li>
                </>
              )}
              {listing.type === "warehouse" && (
                <>
                  <li>• Secure storage facility</li>
                  <li>• 24/7 security coverage</li>
                  <li>• Loading and unloading equipment</li>
                </>
              )}
            </ul>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-2">Terms & Conditions</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Minimum lease period: 1 season</li>
              <li>• Payment required upfront</li>
              <li>• Security deposit may be required</li>
              <li>• Insurance recommended</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
