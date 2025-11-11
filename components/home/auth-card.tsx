"use client"

import { useState } from "react"
import Link from "next/link"

export function AuthCard() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="mt-8 mb-8 max-w-4xl mx-auto px-4">
      <div
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-teal-50 border border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-100 to-transparent rounded-full blur-3xl opacity-20 -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-teal-100 to-transparent rounded-full blur-3xl opacity-20 -ml-48 -mb-48"></div>

        <div className="relative px-8 py-12 sm:px-12 sm:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left side - Text content */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Join FarmLease Today</h3>
              <p className="text-gray-600 text-sm sm:text-base mb-6 leading-relaxed">
                Start leasing farmland, plantations, and machinery from Kenya's most trusted agricultural marketplace.
                Connect with verified owners and access thousands of opportunities.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-emerald-500 text-white text-xs">
                    ✓
                  </span>
                  Access 1000+ verified listings
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-emerald-500 text-white text-xs">
                    ✓
                  </span>
                  Direct messaging with owners
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-emerald-500 text-white text-xs">
                    ✓
                  </span>
                  Save favorites and compare options
                </li>
              </ul>
            </div>

            {/* Right side - Action buttons */}
            <div className="space-y-4">
              <div className="space-y-3">
                <Link
                  href="/register"
                  className="block w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-center"
                >
                  Create Account
                </Link>
                <Link
                  href="/login"
                  className="block w-full bg-white text-emerald-600 font-semibold py-3 px-6 rounded-lg border-2 border-emerald-500 hover:bg-emerald-50 transform hover:scale-105 transition-all duration-200 text-center"
                >
                  Sign In
                </Link>
              </div>

              <p className="text-center text-xs text-gray-600">
                No account? <span className="font-semibold">Register for free</span> and start your farming journey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
