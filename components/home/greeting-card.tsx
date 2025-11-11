"use client"

import { useEffect, useState } from "react"

export function GreetingCard() {
  const [greeting, setGreeting] = useState("")
  const [timeOfDay, setTimeOfDay] = useState("")

  useEffect(() => {
    const updateGreeting = () => {
      const now = new Date()
      const hour = now.getHours()

      if (hour >= 5 && hour < 12) {
        setGreeting("Good Morning")
        setTimeOfDay("sunrise")
      } else if (hour >= 12 && hour < 17) {
        setGreeting("Good Afternoon")
        setTimeOfDay("afternoon")
      } else {
        setGreeting("Good Evening")
        setTimeOfDay("sunset")
      }
    }

    updateGreeting()
  }, [])

  const getBackgroundStyle = () => {
    switch (timeOfDay) {
      case "sunrise":
        return "from-orange-50 via-amber-50 to-emerald-50"
      case "afternoon":
        return "from-blue-50 via-teal-50 to-emerald-50"
      case "sunset":
        return "from-purple-50 via-orange-50 to-emerald-50"
      default:
        return "from-emerald-50 to-teal-50"
    }
  }

  return (
    <div
      className={`w-full bg-gradient-to-r ${getBackgroundStyle()} border-b-2 border-emerald-200 py-8 px-6 shadow-sm`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-2">{greeting}, Welcome! 👋</h1>
            <p className="text-lg md:text-xl text-emerald-700 font-medium">Asante kwa Kututembelea 🤝🏿</p>
            <p className="text-sm md:text-base text-emerald-600 mt-2">
              Thank you for visiting FarmLease Kenya - Your Agricultural Marketplace
            </p>
          </div>

          {/* Time-based emoji decoration */}
          <div className="hidden sm:block text-6xl md:text-7xl">
            {timeOfDay === "sunrise" && "🌅"}
            {timeOfDay === "afternoon" && "☀️"}
            {timeOfDay === "sunset" && "🌆"}
          </div>
        </div>
      </div>
    </div>
  )
}
