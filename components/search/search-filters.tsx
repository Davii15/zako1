"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { kenyanCounties, cropTypes, listingTypes } from "@/lib/data"
import type { ListingFilters } from "@/lib/types"
import { Search, Filter, X, MapPin, Crop, DollarSign, Sparkles } from "lucide-react"

interface SearchFiltersProps {
  filters: ListingFilters
  onFiltersChange: (filters: ListingFilters) => void
  onSearch: () => void
  resultsCount?: number
}

export function SearchFilters({ filters, onFiltersChange, onSearch, resultsCount }: SearchFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [priceRange, setPriceRange] = useState([filters.minPrice || 0, filters.maxPrice || 1000000])

  const updateFilter = useCallback(
    (key: keyof ListingFilters, value: string | number | undefined) => {
      const newValue = value === "" || value === "all" ? undefined : value
      onFiltersChange({
        ...filters,
        [key]: newValue,
      })
    },
    [filters, onFiltersChange],
  )

  const clearFilters = useCallback(() => {
    onFiltersChange({})
    setPriceRange([0, 1000000])
    setShowAdvanced(false)
  }, [onFiltersChange])

  const activeFilters = Object.entries(filters).filter(
    ([key, value]) => value !== undefined && value !== "" && value !== null,
  )

  const handlePriceRangeChange = useCallback(
    (values: number[]) => {
      setPriceRange(values)
      updateFilter("minPrice", values[0] > 0 ? values[0] : undefined)
      updateFilter("maxPrice", values[1] < 1000000 ? values[1] : undefined)
    },
    [updateFilter],
  )

  const removeFilter = useCallback(
    (key: keyof ListingFilters) => {
      updateFilter(key, undefined)
    },
    [updateFilter],
  )

  return (
    <div className="space-y-4">
      <Card className="sticky top-4 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-emerald-900">
              <Sparkles className="h-5 w-5 text-emerald-600" />
              <span>Smart Search</span>
            </CardTitle>
            {activeFilters.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
          {resultsCount !== undefined && (
            <p className="text-sm text-emerald-700 font-medium mt-2">
              {resultsCount} listing{resultsCount !== 1 ? "s" : ""} found
            </p>
          )}
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Active Filters Display */}
          {activeFilters.length > 0 && (
            <div className="bg-white rounded-lg p-3 border border-emerald-200">
              <Label className="text-xs font-semibold text-emerald-700 block mb-2">Active Filters:</Label>
              <div className="flex flex-wrap gap-2">
                {activeFilters.map(([key, value]) => (
                  <Badge
                    key={key}
                    variant="secondary"
                    className="text-xs bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200"
                  >
                    {key === "search"
                      ? `"${value}"`
                      : key === "minPrice"
                        ? `Min: KSH ${value?.toLocaleString()}`
                        : key === "maxPrice"
                          ? `Max: KSH ${value?.toLocaleString()}`
                          : String(value)}
                    <button
                      onClick={() => removeFilter(key as keyof ListingFilters)}
                      className="ml-2 hover:text-emerald-950"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Enhanced Search Input */}
          <div className="space-y-2">
            <Label htmlFor="search" className="flex items-center text-sm font-semibold text-emerald-900">
              <Search className="h-4 w-4 mr-2 text-emerald-600" />
              Search listings
            </Label>
            <Input
              id="search"
              placeholder="Search by title, location, crop type..."
              value={filters.search || ""}
              onChange={(e) => updateFilter("search", e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSearch()}
              className="border-emerald-200 bg-white focus:border-emerald-500 focus:ring-emerald-500/20 transition-all"
            />
          </div>

          {/* Quick Filters Grid */}
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center text-sm font-semibold text-emerald-900">
                <Filter className="h-4 w-4 mr-2 text-emerald-600" />
                Listing Type
              </Label>
              <Select value={filters.type || "all"} onValueChange={(value) => updateFilter("type", value)}>
                <SelectTrigger className="border-emerald-200 bg-white hover:border-emerald-400">
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
            </div>

            <div className="space-y-2">
              <Label className="flex items-center text-sm font-semibold text-emerald-900">
                <MapPin className="h-4 w-4 mr-2 text-emerald-600" />
                County
              </Label>
              <Select value={filters.county || "all"} onValueChange={(value) => updateFilter("county", value)}>
                <SelectTrigger className="border-emerald-200 bg-white hover:border-emerald-400">
                  <SelectValue placeholder="All counties" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  <SelectItem value="all">All counties</SelectItem>
                  {kenyanCounties.map((county) => (
                    <SelectItem key={county} value={county}>
                      {county}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center text-sm font-semibold text-emerald-900">
                <Crop className="h-4 w-4 mr-2 text-emerald-600" />
                Crop Type
              </Label>
              <Select value={filters.cropType || "all"} onValueChange={(value) => updateFilter("cropType", value)}>
                <SelectTrigger className="border-emerald-200 bg-white hover:border-emerald-400">
                  <SelectValue placeholder="All crops" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All crops</SelectItem>
                  {cropTypes.map((crop) => (
                    <SelectItem key={crop.value} value={crop.value}>
                      {crop.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Advanced Filters Toggle */}
          <Button
            variant="outline"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full bg-emerald-50 border-emerald-300 text-emerald-900 hover:bg-emerald-100 hover:text-emerald-950 transition-all"
          >
            <Filter className="h-4 w-4 mr-2" />
            {showAdvanced ? "Hide" : "Show"} Advanced Filters
          </Button>

          {/* Advanced Filters */}
          {showAdvanced && (
            <div className="space-y-4 pt-4 border-t-2 border-emerald-200 animate-in slide-in-from-top-2 duration-200 bg-white rounded-lg p-4">
              {/* Price Range Slider */}
              <div className="space-y-3">
                <Label className="flex items-center text-sm font-semibold text-emerald-900">
                  <DollarSign className="h-4 w-4 mr-2 text-emerald-600" />
                  Price Range (KSH)
                </Label>
                <div className="px-2 py-3 bg-emerald-50 rounded-lg">
                  <Slider
                    value={priceRange}
                    onValueChange={handlePriceRangeChange}
                    max={1000000}
                    min={0}
                    step={10000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs font-semibold text-emerald-700 mt-3">
                    <span>KSH {priceRange[0].toLocaleString()}</span>
                    <span>KSH {priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Manual Price Inputs */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="minPrice" className="text-xs font-semibold text-emerald-900">
                    Min Price
                  </Label>
                  <Input
                    id="minPrice"
                    type="number"
                    placeholder="0"
                    value={filters.minPrice || ""}
                    onChange={(e) => {
                      const value = e.target.value ? Number(e.target.value) : undefined
                      updateFilter("minPrice", value)
                      if (value !== undefined) {
                        setPriceRange([value, priceRange[1]])
                      }
                    }}
                    className="border-emerald-200 bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxPrice" className="text-xs font-semibold text-emerald-900">
                    Max Price
                  </Label>
                  <Input
                    id="maxPrice"
                    type="number"
                    placeholder="1000000"
                    value={filters.maxPrice || ""}
                    onChange={(e) => {
                      const value = e.target.value ? Number(e.target.value) : undefined
                      updateFilter("maxPrice", value)
                      if (value !== undefined) {
                        setPriceRange([priceRange[0], value])
                      }
                    }}
                    className="border-emerald-200 bg-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Search Button */}
          <Button
            onClick={onSearch}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold shadow-md hover:shadow-lg transition-all"
          >
            <Search className="h-4 w-4 mr-2" />
            Search Listings
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
