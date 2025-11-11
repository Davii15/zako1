export type UserRole = "farmer" | "owner" | "admin"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  phone?: string
  county?: string
  avatar?: string
  bio?: string
  verified: boolean
  rating?: number
  reviewCount?: number
  createdAt: Date
}

export type CropType = "coffee" | "tea" | "maize" | "sugarcane" | "cotton" | "other"
export type ListingType = "land" | "plantation" | "machinery" | "warehouse"
export type ListingStatus = "pending" | "approved" | "rejected"

export interface Listing {
  id: string
  title: string
  description: string
  type: ListingType
  cropType?: CropType
  county: string
  size?: string
  price: number
  priceUnit: string
  photos: string[]
  whatsappNumber: string
  ownerId: string
  owner: {
    id: string
    name: string
    phone?: string
    email?: string
    verified: boolean
    rating?: number
    reviewCount?: number
  }
  status: ListingStatus
  featured: boolean
  views: number
  favorites: number
  averageRating?: number
  reviewCount?: number
  latitude?: number
  longitude?: number
  videos?: Array<{
    id: string
    title: string
    thumbnail: string
    url: string
  }>
  createdAt: Date
  updatedAt: Date
}

export interface ListingFilters {
  type?: ListingType
  cropType?: CropType
  county?: string
  minPrice?: number
  maxPrice?: number
  search?: string
}

export interface Review {
  id: string
  listingId: string
  userId: string
  userName: string
  rating: number
  comment: string
  createdAt: Date
}

export interface SavedSearch {
  id: string
  userId: string
  name: string
  filters: ListingFilters
  alertsEnabled: boolean
  createdAt: Date
}

export interface Favorite {
  id: string
  userId: string
  listingId: string
  createdAt: Date
}

export interface Notification {
  id: string
  userId: string
  type: "new_listing" | "price_change" | "listing_approved" | "review_added"
  title: string
  message: string
  read: boolean
  createdAt: Date
  relatedId?: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  category: "news" | "tips" | "market_update" | "sustainability" | "technology"
  author: string
  image: string
  readTime: number
  featured: boolean
  createdAt: Date
  updatedAt: Date
}
