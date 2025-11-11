"use client"

import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-emerald-900 to-emerald-950 text-white py-16">
      <div className="container mx-auto px-4">
        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div>
            <h3 className="font-bold text-xl mb-4 text-emerald-300">FarmLease Kenya</h3>
            <p className="text-emerald-100 text-sm mb-4">
              Your trusted marketplace for leasing farmland, plantations, and agricultural machinery across Kenya.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-emerald-300 transition">
                📱
              </a>
              <a href="#" className="hover:text-emerald-300 transition">
                🐦
              </a>
              <a href="#" className="hover:text-emerald-300 transition">
                📘
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-emerald-300">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/listings" className="text-emerald-100 hover:text-emerald-300 transition">
                  Browse Listings
                </Link>
              </li>
              <li>
                <Link href="/post-listing" className="text-emerald-100 hover:text-emerald-300 transition">
                  Post a Listing
                </Link>
              </li>
              <li>
                <Link href="/" className="text-emerald-100 hover:text-emerald-300 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="text-emerald-100 hover:text-emerald-300 transition">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-emerald-300">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/legal/terms-of-service" className="text-emerald-100 hover:text-emerald-300 transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy-policy" className="text-emerald-100 hover:text-emerald-300 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/about-us" className="text-emerald-100 hover:text-emerald-300 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/legal/cookie-policy" className="text-emerald-100 hover:text-emerald-300 transition">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-emerald-300">Contact Details</h4>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-semibold text-emerald-300">Email</p>
                <a
                  href="mailto:support@farmleasekenya.com"
                  className="text-emerald-100 hover:text-emerald-300 transition"
                >
                  support@farmleasekenya.com
                </a>
              </div>
              <div>
                <p className="font-semibold text-emerald-300">Phone</p>
                <a href="tel:+254712345678" className="text-emerald-100 hover:text-emerald-300 transition">
                  +254 712 345 678
                </a>
              </div>
              <div>
                <p className="font-semibold text-emerald-300">Office</p>
                <p className="text-emerald-100">Nairobi, Kenya</p>
              </div>
              <div className="pt-2">
                <Link
                  href="/legal/contact"
                  className="text-emerald-300 hover:text-emerald-200 transition font-medium text-xs"
                >
                  Send us a message
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-emerald-800 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-emerald-200 text-sm text-center md:text-left mb-4 md:mb-0">
            PRODUCT OF CTECH SOLUTIONS<span className="text-emerald-300">®™</span> | ALL RIGHTS RESERVED {currentYear}
          </p>
          <p className="text-emerald-300 text-xs">Making agriculture accessible, one listing at a time 🌾</p>
        </div>
      </div>
    </footer>
  )
}
