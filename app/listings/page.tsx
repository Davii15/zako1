"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { ListingCard } from "@/components/listings/listing-card"
import { SearchFilters } from "@/components/search/search-filters"
import { SavedSearches } from "@/components/features/saved-searches"
import { mockListings } from "@/lib/data"
import type { ListingFilters } from "@/lib/types"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Grid, List, SortAsc } from "lucide-react"

type SortOption = "newest" | "oldest" | "price-low" | "price-high" | "title"
type ViewMode = "grid" | "list"

export default function ListingsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [filters, setFilters] = useState<ListingFilters>({})
  const [showSuccess, setShowSuccess] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>("newest")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")

  const searchParamsString = searchParams.toString()

  const updateURL = useCallback(
    (newFilters: ListingFilters) => {
      const params = new URLSearchParams()

      Object.entries(newFilters).forEach(([key, value]) => {
        if (value !== undefined && value !== "" && value !== null) {
          params.set(key, String(value))
        }
      })

      const newURL = params.toString() ? `${pathname}?${params.toString()}` : pathname
      router.replace(newURL, { scroll: false })
    },
    [pathname, router],
  )

  // Initialize filters from URL params
  useEffect(() => {
    const initialFilters: ListingFilters = {}
    if (searchParams.get("search")) initialFilters.search = searchParams.get("search")!
    if (searchParams.get("type")) initialFilters.type = searchParams.get("type") as any
    if (searchParams.get("county")) initialFilters.county = searchParams.get("county")!
    if (searchParams.get("cropType")) initialFilters.cropType = searchParams.get("cropType") as any
    if (searchParams.get("minPrice")) initialFilters.minPrice = Number(searchParams.get("minPrice"))
    if (searchParams.get("maxPrice")) initialFilters.maxPrice = Number(searchParams.get("maxPrice"))

    setFilters(initialFilters)

    // Show success message if redirected from post-listing
    if (searchParams.get("success")) {
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 5000)
    }
  }, [searchParamsString])

  const filteredListings = useMemo(() => {
    const results = mockListings.filter((listing) => {
      // Only show approved listings
      if (listing.status !== "approved") return false

      // Enhanced search filter with fuzzy matching
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const searchTerms = searchLower.split(" ").filter((term) => term.length > 0)

        const searchableText = [
          listing.title,
          listing.description,
          listing.county,
          listing.cropType || "",
          listing.owner.name,
        ]
          .join(" ")
          .toLowerCase()

        const matchesSearch = searchTerms.every((term) => searchableText.includes(term))

        if (!matchesSearch) return false
      }

      // Type filter
      if (filters.type && listing.type !== filters.type) return false

      // County filter
      if (filters.county && listing.county !== filters.county) return false

      // Crop type filter
      if (filters.cropType && listing.cropType !== filters.cropType) return false

      // Price filters
      if (filters.minPrice && listing.price < filters.minPrice) return false
      if (filters.maxPrice && listing.price > filters.maxPrice) return false

      return true
    })

    results.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "title":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    return results
  }, [filters, sortBy])

  const handleFiltersChange = useCallback(
    (newFilters: ListingFilters) => {
      setFilters(newFilters)
      updateURL(newFilters)
    },
    [updateURL],
  )

  const handleSearch = useCallback(() => {
    // Search is reactive, but we can add analytics here
    console.log("Searching with filters:", filters)
    console.log("Results found:", filteredListings.length)
  }, [filters, filteredListings.length])

  return (
    <div className="container mx-auto px-4 py-8">
      {showSuccess && (
        <Alert className="mb-6 border-green-200 bg-green-50 animate-in slide-in-from-top-2">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Your listing has been submitted successfully and is pending approval.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Enhanced Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <SearchFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onSearch={handleSearch}
            resultsCount={filteredListings.length}
          />

          <SavedSearches currentFilters={filters} onLoadSearch={handleFiltersChange} />
        </div>

        {/* Enhanced Listings Grid */}
        <div className="lg:col-span-3">
          {/* Results Header with Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <h1 className="text-2xl font-bold">
              {filteredListings.length} Listing{filteredListings.length !== 1 ? "s" : ""} Found
            </h1>

            <div className="flex items-center gap-4">
              {/* Sort Controls */}
              <div className="flex items-center gap-2">
                <SortAsc className="h-4 w-4 text-muted-foreground" />
                <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="title">Title A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {filteredListings.length > 0 ? (
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} viewMode={viewMode} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 animate-in fade-in-50">
              <div className="max-w-md mx-auto">
                <p className="text-muted-foreground text-lg mb-2">No listings found matching your criteria.</p>
                <p className="text-muted-foreground mb-4">Try adjusting your filters or search terms.</p>
                <Button onClick={() => handleFiltersChange({})} variant="outline">
                  Clear All Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
