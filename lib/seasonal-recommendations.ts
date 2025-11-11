export interface SeasonalRecommendation {
  season: string
  period: string
  crops: string[]
  activities: string[]
  description: string
  icon: string
}

export const seasonalRecommendations: SeasonalRecommendation[] = [
  {
    season: "Long Rains (Mar-May)",
    period: "March - May",
    crops: ["Maize", "Beans", "Potatoes", "Tomatoes", "Onions", "Cabbage"],
    activities: [
      "Land preparation and plowing",
      "Seed selection and sorting",
      "Fertilizer application",
      "Pest management preparation",
      "Water harvesting setup",
    ],
    description:
      "Ideal period for planting long-season crops. Adequate moisture ensures good germination and growth. Focus on land preparation and selecting quality seeds.",
    icon: "🌧️",
  },
  {
    season: "Short Rains (Oct-Dec)",
    period: "October - December",
    crops: ["Maize", "Wheat", "Pulses", "Vegetables", "Root Crops"],
    activities: [
      "Weeding and thinning",
      "Fertilizer top-dressing",
      "Pest and disease control",
      "Irrigation planning",
      "Harvest preparation for long-rain crops",
    ],
    description:
      "Secondary growing season with shorter duration crops. Good for farmers who missed long rains. Plan crop rotation and manage soil health.",
    icon: "🌤️",
  },
  {
    season: "Dry Season - Planting (Jan-Feb)",
    period: "January - February",
    crops: ["Coffee", "Tea", "Dairy Pasture", "Fruit Trees", "Agroforestry"],
    activities: [
      "Coffee and tea maintenance",
      "Nursery preparation",
      "Tree planting",
      "Irrigation maintenance",
      "Soil conservation works",
    ],
    description:
      "Season for establishing perennial crops and planning. Ideal for nursery activities and preparing for upcoming rains.",
    icon: "☀️",
  },
  {
    season: "Dry Season - Harvesting (Jun-Sep)",
    period: "June - September",
    crops: ["Cereals", "Coffee", "Tea", "Cotton", "Sunflower"],
    activities: [
      "Harvesting and threshing",
      "Post-harvest handling",
      "Crop storage",
      "Equipment maintenance",
      "Land preparation for next season",
    ],
    description:
      "Harvest season for majority of crops. Focus on proper post-harvest handling to maximize quality and prices. Store grains safely.",
    icon: "🌾",
  },
]
