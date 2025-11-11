"use client"

import { useState, useEffect } from "react"
import { seasonalRecommendations } from "@/lib/seasonal-recommendations"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function SeasonalRecommendations() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % seasonalRecommendations.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Seasonal Farming Guide</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Maximize your harvest with our seasonal recommendations based on Kenya's climate patterns
          </p>
        </div>

        {/* Desktop view - 2 cards at a time */}
        <div className="hidden md:grid md:grid-cols-2 gap-6">
          {[0, 1].map((offset) => {
            const index = (currentIndex + offset) % seasonalRecommendations.length
            const rec = seasonalRecommendations[index]
            return (
              <Card
                key={index}
                className="border border-primary/20 hover:border-primary/50 transition-all hover:shadow-lg animate-in fade-in duration-500"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-4xl mb-2">{rec.icon}</div>
                      <CardTitle className="text-xl text-primary">{rec.season}</CardTitle>
                      <CardDescription className="text-sm">{rec.period}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-foreground/80">{rec.description}</p>

                  <div>
                    <h4 className="font-semibold text-sm mb-2 text-primary">Recommended Crops</h4>
                    <div className="flex flex-wrap gap-2">
                      {rec.crops.map((crop) => (
                        <span
                          key={crop}
                          className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                        >
                          {crop}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2 text-primary">Key Activities</h4>
                    <ul className="space-y-1">
                      {rec.activities.map((activity) => (
                        <li key={activity} className="text-sm text-foreground/70 flex items-start">
                          <span className="mr-2">•</span>
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Mobile view - 1 card at a time */}
        <div className="md:hidden">
          <Card className="border border-primary/20 hover:border-primary/50 transition-all hover:shadow-lg animate-in fade-in duration-500">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-4xl mb-2">{seasonalRecommendations[currentIndex].icon}</div>
                  <CardTitle className="text-xl text-primary">{seasonalRecommendations[currentIndex].season}</CardTitle>
                  <CardDescription className="text-sm">{seasonalRecommendations[currentIndex].period}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-foreground/80">{seasonalRecommendations[currentIndex].description}</p>

              <div>
                <h4 className="font-semibold text-sm mb-2 text-primary">Recommended Crops</h4>
                <div className="flex flex-wrap gap-2">
                  {seasonalRecommendations[currentIndex].crops.map((crop) => (
                    <span key={crop} className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      {crop}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2 text-primary">Key Activities</h4>
                <ul className="space-y-1">
                  {seasonalRecommendations[currentIndex].activities.map((activity) => (
                    <li key={activity} className="text-sm text-foreground/70 flex items-start">
                      <span className="mr-2">•</span>
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Indicator dots */}
          <div className="flex justify-center gap-2 mt-6">
            {seasonalRecommendations.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 w-2 rounded-full transition-all ${
                  idx === currentIndex ? "bg-primary w-6" : "bg-muted-foreground/30"
                }`}
                aria-label={`Go to season ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
