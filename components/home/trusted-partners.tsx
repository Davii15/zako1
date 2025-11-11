"use client"

import { useEffect, useRef } from "react"

interface Partner {
  id: string
  name: string
  logo: string
}

const mockPartners: Partner[] = [
  { id: "1", name: "Kenya Agricultural Organization", logo: "🌾" },
  { id: "2", name: "Farm Inputs Ltd", logo: "🔧" },
  { id: "3", name: "Agricultural Bank", logo: "🏦" },
  { id: "4", name: "Green Tech Solutions", logo: "🌱" },
  { id: "5", name: "Harvest Logistics", logo: "🚚" },
  { id: "6", name: "Soil Science Institute", logo: "🧪" },
  { id: "7", name: "Climate Smart Farming", logo: "🌍" },
  { id: "8", name: "Crop Insurance Co", logo: "📋" },
]

export function TrustedPartners() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = containerRef.current
    if (!scrollContainer) return

    let scrollPosition = 0
    const scrollSpeed = 1
    const container1 = scrollContainer.querySelector(".scroll-row-1") as HTMLElement
    const container2 = scrollContainer.querySelector(".scroll-row-2") as HTMLElement

    const interval = setInterval(() => {
      scrollPosition += scrollSpeed

      if (container1) {
        const maxScroll = container1.scrollWidth / 2
        if (scrollPosition > maxScroll) {
          scrollPosition = 0
        }
        container1.style.transform = `translateX(-${scrollPosition}px)`
      }

      if (container2) {
        const maxScroll = container2.scrollWidth / 2
        const position = scrollPosition > maxScroll ? 0 : scrollPosition
        container2.style.transform = `translateX(${position}px)`
      }
    }, 30)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-primary/5 via-background to-primary/5 overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Trusted Partners</h2>
          <p className="text-lg text-muted-foreground">Working together to transform agriculture in Kenya</p>
        </div>

        <div ref={containerRef} className="relative overflow-hidden">
          {/* Row 1 - Scrolling Left */}
          <div className="mb-8">
            <div className="scroll-row-1 flex gap-8 pb-4">
              {[...mockPartners, ...mockPartners].map((partner, idx) => (
                <div
                  key={`row1-${idx}`}
                  className="flex-shrink-0 flex items-center justify-center w-40 h-24 bg-white rounded-lg border-2 border-primary/10 hover:border-primary/30 transition-all shadow-sm hover:shadow-md"
                >
                  <div className="text-center">
                    <div className="text-5xl mb-2">{partner.logo}</div>
                    <p className="text-xs font-medium text-foreground/60">{partner.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 - Scrolling Right */}
          <div>
            <div className="scroll-row-2 flex gap-8">
              {[...mockPartners, ...mockPartners].map((partner, idx) => (
                <div
                  key={`row2-${idx}`}
                  className="flex-shrink-0 flex items-center justify-center w-40 h-24 bg-white rounded-lg border-2 border-primary/10 hover:border-primary/30 transition-all shadow-sm hover:shadow-md"
                >
                  <div className="text-center">
                    <div className="text-5xl mb-2">{partner.logo}</div>
                    <p className="text-xs font-medium text-foreground/60">{partner.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Join hundreds of agricultural partners revolutionizing farming across Kenya
        </p>
      </div>
    </section>
  )
}
