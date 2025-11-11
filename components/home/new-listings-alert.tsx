"use client"

import { useState, useEffect } from "react"
import { mockListings } from "@/lib/data"
import type { Listing } from "@/lib/types"
import Link from "next/link"

export function NewListingsAlert() {
  const [recentListings, setRecentListings] = useState<Listing[]>([])
  const [showAlert, setShowAlert] = useState(true)

  useEffect(() => {
    // Get listings from last 7 days, sorted by newest first
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const recent = mockListings
      .filter((listing) => new Date(listing.createdAt) > sevenDaysAgo)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3)

    setRecentListings(recent)
  }, [])

  if (!showAlert || recentListings.length === 0) return null

  return (
    <div className="fixed top-20 left-0 right-0 z-40 animate-in slide-in-from-top-2 duration-500">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-5">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-white bg-opacity-20">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </div>
              </div>
              <div>
                <p className="font-semibold text-sm sm:text-base">New Listings Posted!</p>
                <p className="text-sm opacity-90">{recentListings.length} new opportunities just added</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/listings"
                className="bg-white text-emerald-600 hover:bg-opacity-90 px-4 py-2 rounded-lg font-medium transition-all text-sm"
              >
                View All
              </Link>
              <button
                onClick={() => setShowAlert(false)}
                className="text-white hover:bg-white hover:bg-opacity-10 px-3 py-2 rounded-lg transition-all"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
