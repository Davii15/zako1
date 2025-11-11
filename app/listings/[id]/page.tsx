import { notFound } from "next/navigation"
import { mockListings } from "@/lib/data"
import { ListingGallery } from "@/components/listings/listing-gallery"
import { ListingDetails } from "@/components/listings/listing-details"
import { ContactOwner } from "@/components/listings/contact-owner"
import { LocationMap } from "@/components/listings/location-map"
import { VideoGallery } from "@/components/listings/video-gallery"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface ListingPageProps {
  params: {
    id: string
  }
}

export default function ListingPage({ params }: ListingPageProps) {
  const listing = mockListings.find((l) => l.id === params.id)

  if (!listing) {
    notFound()
  }

  // Only show approved listings to public
  if (listing.status !== "approved") {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button asChild variant="ghost">
          <Link href="/listings">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Listings
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <ListingGallery photos={listing.photos} title={listing.title} />
          <ListingDetails listing={listing} />
          {listing.videos && listing.videos.length > 0 && <VideoGallery videos={listing.videos} />}
          <LocationMap county={listing.county} latitude={listing.latitude} longitude={listing.longitude} />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <ContactOwner listing={listing} />
        </div>
      </div>
    </div>
  )
}
