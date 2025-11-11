"use client"

import { useState } from "react"
import { mockListings } from "@/lib/data"
import Link from "next/link"

interface NotificationCenterProps {
  isOpen?: boolean
}

export function NotificationCenter({ isOpen = false }: NotificationCenterProps) {
  const [open, setOpen] = useState(isOpen)
  const [filter, setFilter] = useState<"all" | "coffee" | "tea" | "maize" | "machinery" | "warehouse">("all")

  // Get recent listings
  const recentListings = mockListings
    .filter((listing) => listing.status === "approved")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10)

  const filteredListings =
    filter === "all" ? recentListings : recentListings.filter((l) => l.cropType === filter || l.type === filter)

  const unreadCount = 5

  return (
    <>
      {/* Notification Bell Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors"
        aria-label="Notifications"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-2xl z-50 max-h-96 flex flex-col">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold text-lg">New Listings Alerts</h3>
            <button onClick={() => setOpen(false)} className="text-xl">
              ✕
            </button>
          </div>

          {/* Filter tabs */}
          <div className="sticky top-14 bg-gray-50 px-6 py-3 border-b overflow-x-auto">
            <div className="flex gap-2">
              {(["all", "coffee", "tea", "maize", "machinery", "warehouse"] as const).map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-all ${
                    filter === category ? "bg-emerald-500 text-white" : "bg-white text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications list */}
          <div className="overflow-y-auto flex-1">
            {filteredListings.length > 0 ? (
              filteredListings.map((listing) => (
                <Link
                  key={listing.id}
                  href={`/listings/${listing.id}`}
                  className="block px-6 py-4 border-b hover:bg-emerald-50 transition-colors"
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                        {listing.type === "machinery" ? "⚙️" : listing.type === "warehouse" ? "📦" : "🌾"}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-gray-900 truncate">{listing.title}</p>
                      <p className="text-xs text-gray-500 truncate">{listing.county}</p>
                      <p className="text-sm font-bold text-emerald-600 mt-1">
                        KES {listing.price.toLocaleString()}/{listing.priceUnit}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="px-6 py-8 text-center text-gray-500">
                <p>No new listings for this category</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 px-6 py-3 border-t rounded-b-lg">
            <Link
              href="/listings"
              className="block text-center text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
            >
              View All Listings →
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
