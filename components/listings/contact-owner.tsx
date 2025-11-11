"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Listing } from "@/lib/types"

interface ContactOwnerProps {
  listing: Listing
}

export function ContactOwner({ listing }: ContactOwnerProps) {
  const handleWhatsAppClick = () => {
    const message = `Hi ${listing.owner.name}, I'm interested in your listing: ${listing.title}. Could you please provide more details?`
    const whatsappUrl = `https://wa.me/${listing.whatsappNumber.replace("+", "")}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleCallClick = () => {
    window.location.href = `tel:${listing.whatsappNumber}`
  }

  const handleSmsClick = () => {
    const message = `Hi, I'm interested in your ${listing.title} listing on FarmLease Kenya. Please contact me for more details.`
    window.location.href = `sms:${listing.whatsappNumber}?body=${encodeURIComponent(message)}`
  }

  const handleEmailClick = () => {
    const subject = `Inquiry about: ${listing.title}`
    const body = `Hello ${listing.owner.name},\n\nI am interested in your listing: ${listing.title}\n\nCould you please provide more information?\n\nThank you.`
    window.location.href = `mailto:${listing.owner.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <Card className="sticky top-4 border-2 border-emerald-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">👤</div>
          Contact Owner
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        {/* Owner Info */}
        <div className="border-b pb-4">
          <p className="font-semibold text-lg text-emerald-900">{listing.owner.name}</p>
          {listing.owner.verified && (
            <div className="flex items-center gap-1 mt-1">
              <span className="text-blue-600 text-sm">✓ Verified Owner</span>
            </div>
          )}
          {listing.owner.rating && (
            <p className="text-sm text-yellow-600 mt-1">
              ⭐ {listing.owner.rating}/5 ({listing.owner.reviewCount} reviews)
            </p>
          )}
        </div>

        {/* Contact Methods */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Quick Contact</p>

          {/* WhatsApp Button */}
          <Button onClick={handleWhatsAppClick} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
            <span className="mr-2">💬</span>
            WhatsApp Owner
          </Button>

          {/* SMS Button */}
          <Button
            onClick={handleSmsClick}
            variant="outline"
            className="w-full border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-transparent"
          >
            <span className="mr-2">📱</span>
            Send SMS
          </Button>

          {/* Call Button */}
          <Button
            onClick={handleCallClick}
            variant="outline"
            className="w-full border-2 border-teal-600 text-teal-600 hover:bg-teal-50 bg-transparent"
          >
            <span className="mr-2">☎️</span>
            Call Owner
          </Button>

          {/* Email Button */}
          {listing.owner.email && (
            <Button
              onClick={handleEmailClick}
              variant="outline"
              className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
            >
              <span className="mr-2">✉️</span>
              Send Email
            </Button>
          )}
        </div>

        {/* Contact Info */}
        <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
          <p className="text-sm font-semibold text-emerald-900 mb-2">Contact Information:</p>
          <p className="text-xs text-gray-600 mb-1">Phone: {listing.whatsappNumber}</p>
          {listing.owner.email && <p className="text-xs text-gray-600">Email: {listing.owner.email}</p>}
        </div>

        {/* Response Time */}
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
          <p className="text-xs text-blue-900">
            <span className="font-semibold">Response Time:</span> Usually within 2 hours
          </p>
          <p className="text-xs text-blue-900">
            <span className="font-semibold">Languages:</span> English, Swahili
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
