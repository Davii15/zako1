import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import ClientLayout from "./ClientLayout"

export const metadata: Metadata = {
  title: "FarmLease Kenya - Agricultural Marketplace",
  description: "Lease farmland, plantations, and machinery in Kenya",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans bg-gradient-to-b from-emerald-50 to-teal-50">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
