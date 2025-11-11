"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { useToast } from "@/components/ui/toast-provider"
import { sendContactEmail } from "@/lib/toast"

export default function Contact() {
  const { addToast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      addToast("Please fill in all fields", "error")
      return
    }

    setIsLoading(true)

    try {
      const result = await sendContactEmail(formData.name, formData.email, formData.subject, formData.message)

      if (result.success) {
        addToast("Message sent successfully! We'll get back to you soon.", "success")
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        addToast("Failed to send message. Please try again.", "error")
      }
    } catch (error) {
      addToast("An error occurred. Please try again later.", "error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-emerald-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-emerald-900 mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-700">Have questions or need assistance? We're here to help!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-emerald-600" />
                  <CardTitle>Email</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <a href="mailto:support@farmleasekenya.com" className="text-emerald-600 hover:underline">
                  support@farmleasekenya.com
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-emerald-600" />
                  <CardTitle>Phone</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <a href="tel:+254712345678" className="text-emerald-600 hover:underline">
                  +254 712 345 678
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-emerald-600" />
                  <CardTitle>Office</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-gray-700">
                <p>FarmLease Kenya</p>
                <p>Nairobi, Kenya</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-emerald-600" />
                  <CardTitle>Hours</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-gray-700 space-y-1">
                <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 5:00 PM</p>
                <p>Sunday: Closed</p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="border-emerald-200">
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>We'll respond as soon as possible</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <Input
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="How can we help?"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Your message..."
                    rows={4}
                    required
                    disabled={isLoading}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400"
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
