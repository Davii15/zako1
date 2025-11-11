"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { kenyanCounties, cropTypes, listingTypes } from "@/lib/data"
import type { ListingType, CropType } from "@/lib/types"
import { ListingAgreementNotice } from "@/components/listings/listing-agreement-notice"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function ListingForm() {
  const { user } = useAuth()
  const router = useRouter()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "" as ListingType,
    cropType: "" as CropType,
    county: "",
    size: "",
    price: "",
    priceUnit: "",
    whatsappNumber: "",
    photos: [] as string[],
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Validation
    if (
      !formData.title ||
      !formData.description ||
      !formData.type ||
      !formData.county ||
      !formData.price ||
      !formData.whatsappNumber
    ) {
      setError("Please fill in all required fields")
      setLoading(false)
      return
    }

    if (formData.photos.length === 0) {
      setError("Please add at least one photo")
      setLoading(false)
      return
    }

    // Mock submission - in real app, this would call an API
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSubmitted(true)

      // Redirect after 3 seconds
      setTimeout(() => {
        router.push("/listings")
      }, 3000)
    } catch (err) {
      setError("Failed to submit listing. Please try again.")
    }

    setLoading(false)
  }

  const addPhoto = () => {
    if (formData.photos.length >= 5) {
      setError("Maximum 5 photos allowed")
      return
    }
    const photoUrl = `/placeholder.svg?height=300&width=400&query=${formData.type} ${formData.cropType || "farming"} Kenya`
    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, photoUrl],
    }))
  }

  const removePhoto = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }))
  }

  if (!user || (user.role !== "owner" && user.role !== "admin")) {
    return (
      <Card className="w-full max-w-2xl">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">You need to be a landowner to post listings.</p>
        </CardContent>
      </Card>
    )
  }

  if (submitted) {
    return (
      <Card className="w-full max-w-2xl">
        <CardContent className="pt-6">
          <Alert className="border-primary/30 bg-primary/5">
            <AlertTitle>Listing Submitted Successfully</AlertTitle>
            <AlertDescription className="mt-2">
              <p>Your listing has been submitted and is pending admin approval.</p>
              <p className="text-sm mt-2">
                Our admin team will review your listing within 24 hours. Once approved, it will be visible to all users.
                You can track your submission status in your dashboard.
              </p>
              <p className="text-sm text-muted-foreground mt-3">Redirecting...</p>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Post New Listing</CardTitle>
        <CardDescription>
          Share your farmland, plantation, machinery, or warehouse with the community. All listings require admin
          approval before publication.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <ListingAgreementNotice />
        </div>

        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <AlertDescription>
            <strong>Note:</strong> Your listing will be reviewed by our admin team within 24 hours. Once approved, it
            will be visible to all farmers and landowners on the platform.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., 50 Acres Coffee Plantation - Kiambu"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Listing Type *</Label>
            <Select
              value={formData.type}
              onValueChange={(value: ListingType) => setFormData((prev) => ({ ...prev, type: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select listing type" />
              </SelectTrigger>
              <SelectContent>
                {listingTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {(formData.type === "land" || formData.type === "plantation") && (
            <div className="space-y-2">
              <Label htmlFor="cropType">Crop Type</Label>
              <Select
                value={formData.cropType}
                onValueChange={(value: CropType) => setFormData((prev) => ({ ...prev, cropType: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select crop type" />
                </SelectTrigger>
                <SelectContent>
                  {cropTypes.map((crop) => (
                    <SelectItem key={crop.value} value={crop.value}>
                      {crop.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="county">County *</Label>
              <Select
                value={formData.county}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, county: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select county" />
                </SelectTrigger>
                <SelectContent>
                  {kenyanCounties.map((county) => (
                    <SelectItem key={county} value={county}>
                      {county}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="size">Size</Label>
              <Input
                id="size"
                value={formData.size}
                onChange={(e) => setFormData((prev) => ({ ...prev, size: e.target.value }))}
                placeholder={
                  formData.type === "warehouse" ? "e.g., 5000 sqm, 2000 ton capacity" : "e.g., 50 acres, 75HP"
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (KSH) *</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                placeholder="150000"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priceUnit">Price Unit *</Label>
              <Select
                value={formData.priceUnit}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, priceUnit: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select price unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="per year">Per Year</SelectItem>
                  <SelectItem value="per season">Per Season</SelectItem>
                  <SelectItem value="per month">Per Month</SelectItem>
                  <SelectItem value="per week">Per Week</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsappNumber">WhatsApp Number *</Label>
            <Input
              id="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={(e) => setFormData((prev) => ({ ...prev, whatsappNumber: e.target.value }))}
              placeholder="+254712345678"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your listing in detail..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-4">
            <Label>
              Photos <span className="text-destructive">*</span>
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {formData.photos.map((photo, index) => (
                <div key={index} className="relative">
                  <img
                    src={photo || "/placeholder.svg"}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-24 object-cover rounded-md border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                    onClick={() => removePhoto(index)}
                  >
                    X
                  </Button>
                </div>
              ))}
              {formData.photos.length < 5 && (
                <Button
                  type="button"
                  variant="outline"
                  className="h-24 border-dashed bg-transparent"
                  onClick={addPhoto}
                >
                  + Add Photo
                </Button>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Add up to 5 photos to showcase your listing. At least 1 photo is required.
            </p>
          </div>

          {error && (
            <Alert className="border-destructive/50 bg-destructive/10">
              <AlertDescription className="text-destructive">{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting Listing..." : "Submit for Approval"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
