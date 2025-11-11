import { GreetingCard } from "@/components/home/greeting-card"
import { HeroSection } from "@/components/home/hero-section"
import { CategoriesSection } from "@/components/home/categories-section"
import { SeasonalRecommendations } from "@/components/home/seasonal-recommendations"
import { FeaturedListings } from "@/components/home/featured-listings"
import { TrustedPartners } from "@/components/home/trusted-partners"
import { UserTestimonials } from "@/components/home/user-testimonials"
import { BlogSection } from "@/components/home/blog-section"
import { NewListingsAlert } from "@/components/home/new-listings-alert"
import { AuthCard } from "@/components/home/auth-card"

export default function HomePage() {
  return (
    <div>
      <NewListingsAlert />
      <GreetingCard />
      <AuthCard />
      <HeroSection />
      <CategoriesSection />
      <SeasonalRecommendations />
      <FeaturedListings />
      <TrustedPartners />
      <UserTestimonials />
      <BlogSection />
    </div>
  )
}
