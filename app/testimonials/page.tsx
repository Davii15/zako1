"use client"

import { UserTestimonials } from "@/components/home/user-testimonials"
import { Card, CardContent } from "@/components/ui/card"

export default function TestimonialsPage() {
  const stats = [
    { label: "Active Users", value: "5,000+" },
    { label: "Successful Transactions", value: "12,500+" },
    { label: "Acres Leased", value: "50,000+" },
    { label: "Average Rating", value: "4.8/5" },
  ]

  return (
    <main className="pt-8">
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-12 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">What Our Users Say</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how FarmLease Kenya is revolutionizing agriculture across the country with real stories from our
            community
          </p>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, idx) => (
            <Card key={idx} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Full Testimonials */}
      <UserTestimonials />

      {/* CTA Section */}
      <section className="bg-primary/5 py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Join Our Community?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start your agricultural journey with FarmLease Kenya today. Connect with other farmers, access quality land
            and equipment, and grow your business.
          </p>
          <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
            Get Started Now
          </button>
        </div>
      </section>
    </main>
  )
}
