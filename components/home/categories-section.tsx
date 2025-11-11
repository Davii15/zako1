"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Wheat, Coffee, Tractor, Warehouse } from "lucide-react"

const categories = [
  {
    title: "Agricultural Land",
    description: "Fertile farmland ready for cultivation",
    icon: Wheat,
    href: "/listings?type=land",
    color: "text-green-600",
  },
  {
    title: "Plantations",
    description: "Established coffee, tea, and crop plantations",
    icon: Coffee,
    href: "/listings?type=plantation",
    color: "text-amber-600",
  },
  {
    title: "Farm Machinery",
    description: "Tractors, harvesters, and farming equipment",
    icon: Tractor,
    href: "/listings?type=machinery",
    color: "text-blue-600",
  },
  {
    title: "Warehouses & Storage",
    description: "Storage facilities and warehouse spaces",
    icon: Warehouse,
    href: "/listings?type=warehouse",
    color: "text-purple-600",
  },
]

export function CategoriesSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % categories.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
          <p className="text-muted-foreground">Find exactly what you're looking for</p>
        </div>

        {/* Desktop view - all categories */}
        <div className="hidden md:grid md:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link key={category.title} href={category.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <Icon className={`h-12 w-12 mx-auto mb-4 ${category.color}`} />
                    <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                    <p className="text-muted-foreground text-sm">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Mobile/Tablet view - rotating cards */}
        <div className="md:hidden">
          <div className="flex gap-4 overflow-hidden">
            {[0, 1, 2].map((offset) => {
              const index = (currentIndex + offset) % categories.length
              const category = categories[index]
              const Icon = category.icon
              return (
                <Link
                  key={index}
                  href={category.href}
                  className="flex-shrink-0 w-full md:w-1/3 transition-all duration-500 ease-in-out"
                >
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <CardContent className="p-6 text-center">
                      <Icon className={`h-12 w-12 mx-auto mb-4 ${category.color}`} />
                      <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
                      <p className="text-muted-foreground text-sm">{category.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>

          {/* Indicator dots */}
          <div className="flex justify-center gap-2 mt-4">
            {categories.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 w-2 rounded-full transition-all ${
                  idx === currentIndex ? "bg-primary w-6" : "bg-muted-foreground/30"
                }`}
                aria-label={`Go to category ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
