"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { kenyanCounties, listingTypes } from "@/lib/data"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedCounty, setSelectedCounty] = useState("all")
  const router = useRouter()

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchQuery) params.set("search", searchQuery)
    if (selectedType !== "all") params.set("type", selectedType)
    if (selectedCounty !== "all") params.set("county", selectedCounty)

    router.push(`/listings?${params.toString()}`)
  }

  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
          Find Your Perfect
          <span className="text-primary block">Agricultural Opportunity</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
          Connect with landowners and farmers across Kenya. Lease farmland, plantations, and machinery with ease.
        </p>

        {/* Search Form */}
        <div className="max-w-4xl mx-auto bg-card rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="Search for land, plantations, or machinery..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="h-12"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                {listingTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedCounty} onValueChange={setSelectedCounty}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="All counties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All counties</SelectItem>
                {kenyanCounties.slice(0, 10).map((county) => (
                  <SelectItem key={county} value={county}>
                    {county}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleSearch} className="w-full md:w-auto mt-4 h-12 px-8">
            <Search className="h-4 w-4 mr-2" />
            Search Listings
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">500+</div>
            <div className="text-muted-foreground">Active Listings</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">47</div>
            <div className="text-muted-foreground">Counties Covered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">1000+</div>
            <div className="text-muted-foreground">Happy Farmers</div>
          </div>
        </div>
      </div>
    </section>
  )
}
