"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Save, Bell, Trash2, Search } from "lucide-react"
import type { ListingFilters, SavedSearch } from "@/lib/types"

interface SavedSearchesProps {
  currentFilters: ListingFilters
  onLoadSearch: (filters: ListingFilters) => void
}

export function SavedSearches({ currentFilters, onLoadSearch }: SavedSearchesProps) {
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([
    {
      id: "1",
      userId: "user1",
      name: "Coffee Farms in Kiambu",
      filters: { type: "plantation", cropType: "coffee", county: "Kiambu" },
      alertsEnabled: true,
      createdAt: new Date(),
    },
    {
      id: "2",
      userId: "user1",
      name: "Affordable Tractors",
      filters: { type: "machinery", maxPrice: 500000 },
      alertsEnabled: false,
      createdAt: new Date(),
    },
  ])
  const [searchName, setSearchName] = useState("")
  const [alertsEnabled, setAlertsEnabled] = useState(true)
  const [open, setOpen] = useState(false)

  const hasActiveFilters = Object.values(currentFilters).some((value) => value !== undefined && value !== "")

  const saveCurrentSearch = () => {
    if (!searchName.trim() || !hasActiveFilters) return

    const newSearch: SavedSearch = {
      id: Date.now().toString(),
      userId: "user1",
      name: searchName.trim(),
      filters: currentFilters,
      alertsEnabled,
      createdAt: new Date(),
    }

    setSavedSearches((prev) => [newSearch, ...prev])
    setSearchName("")
    setOpen(false)
  }

  const deleteSearch = (id: string) => {
    setSavedSearches((prev) => prev.filter((search) => search.id !== id))
  }

  const toggleAlerts = (id: string) => {
    setSavedSearches((prev) =>
      prev.map((search) => (search.id === id ? { ...search, alertsEnabled: !search.alertsEnabled } : search)),
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <Save className="h-5 w-5 mr-2" />
            Saved Searches
          </span>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" disabled={!hasActiveFilters}>
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Save Current Search</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="searchName">Search Name</Label>
                  <Input
                    id="searchName"
                    placeholder="e.g., Coffee farms in Kiambu"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="alerts" checked={alertsEnabled} onCheckedChange={setAlertsEnabled} />
                  <Label htmlFor="alerts">Enable email alerts for new listings</Label>
                </div>
                <Button onClick={saveCurrentSearch} disabled={!searchName.trim()} className="w-full">
                  Save Search
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {savedSearches.length > 0 ? (
          savedSearches.map((search) => (
            <div key={search.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-sm">{search.name}</h4>
                  {search.alertsEnabled && <Bell className="h-3 w-3 text-primary" />}
                </div>
                <div className="flex flex-wrap gap-1">
                  {Object.entries(search.filters).map(([key, value]) => (
                    <Badge key={key} variant="secondary" className="text-xs">
                      {key}: {String(value)}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" onClick={() => onLoadSearch(search.filters)}>
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => toggleAlerts(search.id)}>
                  <Bell className={`h-4 w-4 ${search.alertsEnabled ? "text-primary" : "text-muted-foreground"}`} />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => deleteSearch(search.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-sm text-center py-4">No saved searches yet</p>
        )}
      </CardContent>
    </Card>
  )
}
