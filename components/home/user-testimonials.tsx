"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface Testimonial {
  id: string
  name: string
  role: string
  image: string
  quote: string
  rating: number
  location: string
}

const mockTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Samuel Kipchoge",
    role: "Maize Farmer",
    image: "👨‍🌾",
    quote:
      "FarmLease Kenya transformed my farming business. I found premium equipment at affordable rates and significantly increased my productivity. The platform is easy to use and the support is outstanding.",
    rating: 5,
    location: "Trans Nzoia County",
  },
  {
    id: "2",
    name: "Mary Wanjiru",
    role: "Coffee Plantation Owner",
    image: "👩‍🌾",
    quote:
      "Leasing my coffee plantation through FarmLease Kenya was the best decision. I connected with experienced farmers who take excellent care of my land. The platform provides security and transparency throughout the process.",
    rating: 5,
    location: "Murang'a County",
  },
  {
    id: "3",
    name: "Peter Mwangi",
    role: "Dairy Farmer",
    image: "👨‍💼",
    quote:
      "The seasonal recommendations helped me plan my operations perfectly. I saved 40% on equipment costs by leasing through FarmLease. Highly recommend to any farmer looking to optimize their business.",
    rating: 5,
    location: "Nandi County",
  },
  {
    id: "4",
    name: "Grace Nyambura",
    role: "Horticultural Farmer",
    image: "👩‍💻",
    quote:
      "Amazing platform! The search filters made it easy to find exactly what I needed. Within weeks, I was cultivating on prime horticultural land. The admin team is very responsive and professional.",
    rating: 5,
    location: "Kajiado County",
  },
  {
    id: "5",
    name: "James Ochieng",
    role: "Machinery Supplier",
    image: "👨‍🔧",
    quote:
      "FarmLease Kenya gave me a platform to put my equipment to productive use. Consistent income and well-maintained machinery. The booking system is seamless and farmer response is excellent.",
    rating: 4.8,
    location: "Kisumu County",
  },
  {
    id: "6",
    name: "Catherine Mutua",
    role: "Tea Estate Manager",
    image: "👩‍🌾",
    quote:
      "Leasing our tea estate generated significant revenue while maintaining quality. The farmers using our land follow best practices. FarmLease connects quality-conscious operators with landowners.",
    rating: 5,
    location: "Kericho County",
  },
]

export function UserTestimonials() {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What Our Users Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from farmers, landowners, and machinery suppliers who are transforming agriculture through
            FarmLease Kenya
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTestimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="hover:shadow-lg transition-all border-primary/10 hover:border-primary/30"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-4xl mb-2">{testimonial.image}</div>
                    <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                    <p className="text-sm text-primary font-medium">{testimonial.role}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  </div>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={i < Math.floor(testimonial.rating) ? "text-yellow-400" : "text-gray-300"}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/80 italic">"{testimonial.quote}"</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Join over 5,000+ satisfied users transforming agriculture across Kenya
          </p>
          <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
            Share Your Story
          </button>
        </div>
      </div>
    </section>
  )
}
