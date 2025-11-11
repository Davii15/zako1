import { ListingCard } from "@/components/listings/listing-card"
import { mockListings } from "@/lib/data"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function FeaturedListings() {
  const featuredListings = mockListings.filter((listing) => listing.featured && listing.status === "approved")

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Opportunities</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover premium agricultural opportunities handpicked for their quality and potential
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredListings.slice(0, 6).map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/listings">View All Listings</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
