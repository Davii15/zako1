"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { mockListings } from "@/lib/data"
import type { Listing, ListingStatus } from "@/lib/types"
import { Eye, Check, X, Trash2, Star, StarOff } from "lucide-react"
import Link from "next/link"

export function ListingsManagement() {
  const [listings, setListings] = useState(mockListings)
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null)
  const [actionType, setActionType] = useState<"approve" | "reject" | "delete" | null>(null)

  const updateListingStatus = (id: string, status: ListingStatus) => {
    setListings((prev) =>
      prev.map((listing) => (listing.id === id ? { ...listing, status, updatedAt: new Date() } : listing)),
    )
  }

  const toggleFeatured = (id: string) => {
    setListings((prev) =>
      prev.map((listing) =>
        listing.id === id ? { ...listing, featured: !listing.featured, updatedAt: new Date() } : listing,
      ),
    )
  }

  const deleteListing = (id: string) => {
    setListings((prev) => prev.filter((listing) => listing.id !== id))
  }

  const handleAction = () => {
    if (!selectedListing || !actionType) return

    switch (actionType) {
      case "approve":
        updateListingStatus(selectedListing.id, "approved")
        break
      case "reject":
        updateListingStatus(selectedListing.id, "rejected")
        break
      case "delete":
        deleteListing(selectedListing.id)
        break
    }

    setSelectedListing(null)
    setActionType(null)
  }

  const getStatusColor = (status: ListingStatus) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const pendingCount = listings.filter((l) => l.status === "pending").length
  const approvedCount = listings.filter((l) => l.status === "approved").length
  const rejectedCount = listings.filter((l) => l.status === "rejected").length

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{listings.length}</div>
            <p className="text-sm text-muted-foreground">Total Listings</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
            <p className="text-sm text-muted-foreground">Pending Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
            <p className="text-sm text-muted-foreground">Approved</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">{rejectedCount}</div>
            <p className="text-sm text-muted-foreground">Rejected</p>
          </CardContent>
        </Card>
      </div>

      {/* Listings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Listings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>County</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listings.map((listing) => (
                  <TableRow key={listing.id}>
                    <TableCell className="font-medium max-w-xs">
                      <div className="truncate">{listing.title}</div>
                    </TableCell>
                    <TableCell>{listing.ownerName}</TableCell>
                    <TableCell className="capitalize">{listing.type}</TableCell>
                    <TableCell>{listing.county}</TableCell>
                    <TableCell>KSH {listing.price.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(listing.status)} variant="secondary">
                        {listing.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => toggleFeatured(listing.id)}>
                        {listing.featured ? (
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        ) : (
                          <StarOff className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button asChild variant="ghost" size="sm">
                          <Link href={`/listings/${listing.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>

                        {listing.status === "pending" && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedListing(listing)
                                setActionType("approve")
                              }}
                            >
                              <Check className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedListing(listing)
                                setActionType("reject")
                              }}
                            >
                              <X className="h-4 w-4 text-red-600" />
                            </Button>
                          </>
                        )}

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedListing(listing)
                            setActionType("delete")
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog
        open={!!selectedListing && !!actionType}
        onOpenChange={() => {
          setSelectedListing(null)
          setActionType(null)
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "approve" && "Approve Listing"}
              {actionType === "reject" && "Reject Listing"}
              {actionType === "delete" && "Delete Listing"}
            </DialogTitle>
            <DialogDescription>
              {actionType === "approve" && "This listing will be made visible to all users."}
              {actionType === "reject" && "This listing will be hidden from users and the owner will be notified."}
              {actionType === "delete" && "This action cannot be undone. The listing will be permanently removed."}
            </DialogDescription>
          </DialogHeader>
          {selectedListing && (
            <div className="py-4">
              <p className="font-medium">{selectedListing.title}</p>
              <p className="text-sm text-muted-foreground">by {selectedListing.ownerName}</p>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedListing(null)
                setActionType(null)
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleAction} variant={actionType === "delete" ? "destructive" : "default"}>
              {actionType === "approve" && "Approve"}
              {actionType === "reject" && "Reject"}
              {actionType === "delete" && "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
