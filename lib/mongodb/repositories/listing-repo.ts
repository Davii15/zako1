// Listing Repository - Ready for MongoDB activation

import type { Listing, ListingStatus, ListingFilters } from "@/lib/types"
import { mockListings } from "@/lib/data" // Currently using mock, will be replaced

export class ListingRepository {
  // Create listing
  static async create(listing: Omit<Listing, "id" | "createdAt" | "updatedAt">): Promise<Listing> {
    // MongoDB implementation:
    // const db = await connectToDatabase()
    // const result = await db?.collection('listings').insertOne({
    //   ...listing,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // })
    // return { ...listing, id: result?.insertedId.toString(), createdAt: new Date(), updatedAt: new Date() }

    // Mock implementation
    const newListing: Listing = {
      ...listing,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    mockListings.push(newListing)
    return newListing
  }

  // Get listing by ID
  static async getById(id: string): Promise<Listing | null> {
    // MongoDB implementation:
    // const db = await connectToDatabase()
    // const listing = await db?.collection('listings').findOne({ _id: new ObjectId(id) })
    // return listing || null

    // Mock implementation
    return mockListings.find((l) => l.id === id) || null
  }

  // Get all listings with filters
  static async getAll(filters: ListingFilters = {}): Promise<Listing[]> {
    // MongoDB implementation:
    // const db = await connectToDatabase()
    // const query: any = { status: 'approved' }
    // if (filters.type) query.type = filters.type
    // if (filters.cropType) query.cropType = filters.cropType
    // if (filters.county) query.county = filters.county
    // if (filters.minPrice || filters.maxPrice) {
    //   query.price = {}
    //   if (filters.minPrice) query.price.$gte = filters.minPrice
    //   if (filters.maxPrice) query.price.$lte = filters.maxPrice
    // }
    // return await db?.collection('listings').find(query).toArray() || []

    // Mock implementation
    return mockListings.filter((listing) => {
      if (listing.status !== "approved") return false
      if (filters.type && listing.type !== filters.type) return false
      if (filters.cropType && listing.cropType !== filters.cropType) return false
      if (filters.county && listing.county !== filters.county) return false
      if (filters.minPrice && listing.price < filters.minPrice) return false
      if (filters.maxPrice && listing.price > filters.maxPrice) return false
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        if (
          !listing.title.toLowerCase().includes(searchLower) &&
          !listing.description.toLowerCase().includes(searchLower)
        )
          return false
      }
      return true
    })
  }

  // Get pending listings
  static async getPending(): Promise<Listing[]> {
    // MongoDB implementation:
    // const db = await connectToDatabase()
    // return await db?.collection('listings').find({ status: 'pending' }).toArray() || []

    // Mock implementation
    return mockListings.filter((l) => l.status === "pending")
  }

  // Update listing status
  static async updateStatus(id: string, status: ListingStatus, reason?: string): Promise<Listing | null> {
    // MongoDB implementation:
    // const db = await connectToDatabase()
    // await db?.collection('listings').updateOne(
    //   { _id: new ObjectId(id) },
    //   { $set: { status, rejectionReason: reason, updatedAt: new Date() } }
    // )
    // return this.getById(id)

    // Mock implementation
    const listing = mockListings.find((l) => l.id === id)
    if (listing) {
      listing.status = status
      if (reason) listing.updatedAt = new Date()
    }
    return listing || null
  }

  // Toggle featured status
  static async toggleFeatured(id: string): Promise<Listing | null> {
    // MongoDB implementation:
    // const db = await connectToDatabase()
    // const listing = await db?.collection('listings').findOne({ _id: new ObjectId(id) })
    // await db?.collection('listings').updateOne(
    //   { _id: new ObjectId(id) },
    //   { $set: { featured: !listing?.featured } }
    // )
    // return this.getById(id)

    // Mock implementation
    const listing = mockListings.find((l) => l.id === id)
    if (listing) {
      listing.featured = !listing.featured
    }
    return listing || null
  }

  // Delete listing
  static async delete(id: string): Promise<boolean> {
    // MongoDB implementation:
    // const db = await connectToDatabase()
    // const result = await db?.collection('listings').deleteOne({ _id: new ObjectId(id) })
    // return result?.deletedCount === 1

    // Mock implementation
    const index = mockListings.findIndex((l) => l.id === id)
    if (index > -1) {
      mockListings.splice(index, 1)
      return true
    }
    return false
  }

  // Get listings by owner
  static async getByOwnerId(ownerId: string): Promise<Listing[]> {
    // MongoDB implementation:
    // const db = await connectToDatabase()
    // return await db?.collection('listings').find({ ownerId }).toArray() || []

    // Mock implementation
    return mockListings.filter((l) => l.ownerId === ownerId)
  }
}
