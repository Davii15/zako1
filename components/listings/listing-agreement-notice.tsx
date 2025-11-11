"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, AlertTriangle, FileText } from "lucide-react"
import { useState } from "react"

export function ListingAgreementNotice() {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card className="w-full bg-gradient-to-br from-emerald-50 to-blue-50 border-emerald-200">
      <CardHeader className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-t-lg">
        <div className="flex items-center gap-3">
          <FileText className="h-5 w-5" />
          <div>
            <CardTitle>Terms & Agreement Notice</CardTitle>
            <CardDescription className="text-emerald-100">
              Please review important terms before listing or contacting owners
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <Alert className="border-emerald-200 bg-emerald-50">
          <AlertTriangle className="h-4 w-4 text-emerald-600" />
          <AlertDescription className="text-emerald-900">
            <strong>For Listing Owners:</strong> By posting a listing, you agree to provide accurate information and
            comply with all agricultural regulations in Kenya. You are responsible for verifying all details and
            maintaining communication with interested parties.
          </AlertDescription>
        </Alert>

        <Alert className="border-blue-200 bg-blue-50">
          <CheckCircle2 className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-900">
            <strong>For Farmers/Visitors:</strong> All listings are subject to verification. We recommend conducting due
            diligence, site visits, and legal verification before making any leasing agreements. FarmLease Kenya is not
            responsible for disputes between parties.
          </AlertDescription>
        </Alert>

        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full py-2 px-4 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-lg transition font-medium text-sm"
        >
          {expanded ? "Hide Full Terms" : "View Full Terms & Conditions"}
        </button>

        {expanded && (
          <div className="mt-4 p-4 bg-white border border-emerald-200 rounded-lg space-y-3 text-sm text-gray-700 max-h-48 overflow-y-auto">
            <h4 className="font-semibold text-emerald-900">Complete Terms of Service</h4>

            <div className="space-y-2">
              <p>
                <strong>1. User Responsibilities:</strong> Users must provide accurate and truthful information on all
                listings and communications.
              </p>

              <p>
                <strong>2. Verification:</strong> Both parties should conduct proper due diligence and legal
                verification before entering into agreements.
              </p>

              <p>
                <strong>3. Dispute Resolution:</strong> FarmLease Kenya facilitates connections but does not participate
                in disputes. Parties must resolve issues independently or through legal channels.
              </p>

              <p>
                <strong>4. Prohibited Activities:</strong> Fraudulent listings, misleading information, and illegal
                activities are strictly prohibited.
              </p>

              <p>
                <strong>5. Liability:</strong> FarmLease Kenya is not liable for losses, damages, or disputes arising
                from transactions made through our platform.
              </p>

              <p>
                <strong>6. Data Protection:</strong> User data is handled according to our Privacy Policy and Kenyan
                data protection laws.
              </p>

              <p>
                <strong>7. Terms Modification:</strong> We reserve the right to modify these terms at any time.
                Continued use of the platform indicates acceptance.
              </p>

              <p>
                <strong>8. Governing Law:</strong> These terms are governed by the laws of Kenya and disputes shall be
                resolved in Kenyan courts.
              </p>
            </div>
          </div>
        )}

        <div className="pt-2 text-xs text-gray-600 border-t border-emerald-200">
          Last updated: November 2024 | For complete details, visit our{" "}
          <a href="/legal/terms-of-service" className="text-emerald-600 hover:underline">
            Terms of Service
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
