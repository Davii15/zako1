"use client"

import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface LocationMapProps {
  county: string
  latitude?: number
  longitude?: number
}

const kenyaCountyCoordinates: Record<string, { lat: number; lng: number }> = {
  Nairobi: { lat: -1.2864, lng: 36.8172 },
  Kiambu: { lat: -1.1611, lng: 36.8193 },
  Nyeri: { lat: -0.4399, lng: 36.9115 },
  Nakuru: { lat: -0.3031, lng: 36.08 },
  Eldoret: { lat: 0.5143, lng: 35.2799 },
  Kisumu: { lat: -0.1022, lng: 34.7617 },
  Mombasa: { lat: -4.043, lng: 39.6682 },
  Murang: { lat: -0.7149, lng: 37.1497 },
  Thika: { lat: -1.0283, lng: 37.0833 },
  Naivasha: { lat: -0.7144, lng: 36.4328 },
}

export function LocationMap({ county, latitude, longitude }: LocationMapProps) {
  const coords = kenyaCountyCoordinates[county] || { lat: -1.2864, lng: 36.8172 }
  const finalLat = latitude || coords.lat
  const finalLng = longitude || coords.lng

  const mapsUrl = `https://www.google.com/maps/place/${county}/@${finalLat},${finalLng},13z`

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-emerald-600" />
          Location
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-lg border border-emerald-200 text-center">
          <p className="text-lg font-semibold text-emerald-900 mb-4">{county}, Kenya</p>
          <p className="text-sm text-gray-600 mb-4">
            Coordinates: {finalLat.toFixed(4)}, {finalLng.toFixed(4)}
          </p>
          <div className="w-full h-64 bg-gray-200 rounded-lg mb-4 flex items-center justify-center border-2 border-emerald-200">
            <img
              src="/map-location-kenya.jpg"
              alt="Map location"
              className="w-full h-full rounded-lg object-cover"
            />
          </div>
          <Button
            onClick={() => window.open(mapsUrl, "_blank")}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
          >
            <MapPin className="h-4 w-4 mr-2" />
            View on Google Maps
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
