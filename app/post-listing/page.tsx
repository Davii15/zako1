"use client"

import { useAuth } from "@/lib/auth"
import { ListingForm } from "@/components/forms/listing-form"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function PostListingPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert className="max-w-md mx-auto">
          <AlertDescription>Redirecting to login...</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center mb-6">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold text-foreground mb-2">Post Your Listing</h1>
          <p className="text-muted-foreground mb-6">
            Share your agricultural asset with our community of farmers and land managers. Your listing will be reviewed
            by our admin team before going live.
          </p>

          {user && (
            <Alert className="mb-6 border-primary/30 bg-primary/5">
              <AlertDescription>
                Posting as: <span className="font-semibold">{user.name}</span> ({user.role})
              </AlertDescription>
            </Alert>
          )}

          {(user?.role === "owner" || user?.role === "admin") && <ListingForm />}

          {user?.role !== "owner" && user?.role !== "admin" && (
            <Alert className="border-yellow-200 bg-yellow-50">
              <AlertDescription>
                Only landowners and farm operators can post listings. Please contact support if you need to upgrade your
                account.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  )
}
