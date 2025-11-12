import type { ReviewDocument } from "@/lib/schemas"

export class ReviewRepository {
  // Mock mode - replace with MongoDB queries
  private static mockReviews: ReviewDocument[] = []

  static async create(review: Omit<ReviewDocument, "_id" | "createdAt" | "updatedAt">) {
    try {
      // const db = await connectToDatabase()
      // const collection = db?.collection("reviews")
      // const result = await collection?.insertOne({ ...review, createdAt: new Date(), updatedAt: new Date() })
      // return { _id: result?.insertedId, ...review }

      // Mock implementation
      const newReview: ReviewDocument = {
        ...review,
        _id: `review-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      this.mockReviews.push(newReview)
      return newReview
    } catch (error) {
      throw new Error(`Failed to create review: ${error}`)
    }
  }

  static async getById(id: string) {
    try {
      // const db = await connectToDatabase()
      // const collection = db?.collection("reviews")
      // return await collection?.findOne({ _id: new ObjectId(id) })

      // Mock implementation
      return this.mockReviews.find((r) => r._id === id) || null
    } catch (error) {
      throw new Error(`Failed to get review: ${error}`)
    }
  }

  static async getByListingId(listingId: string) {
    try {
      // const db = await connectToDatabase()
      // const collection = db?.collection("reviews")
      // return await collection?.find({ listingId }).toArray()

      // Mock implementation
      return this.mockReviews.filter((r) => r.listingId === listingId)
    } catch (error) {
      throw new Error(`Failed to get reviews by listing: ${error}`)
    }
  }

  static async update(id: string, updates: Partial<ReviewDocument>) {
    try {
      // const db = await connectToDatabase()
      // const collection = db?.collection("reviews")
      // await collection?.updateOne({ _id: new ObjectId(id) }, { $set: { ...updates, updatedAt: new Date() } })
      // return await this.getById(id)

      // Mock implementation
      const index = this.mockReviews.findIndex((r) => r._id === id)
      if (index !== -1) {
        this.mockReviews[index] = { ...this.mockReviews[index], ...updates, updatedAt: new Date() }
        return this.mockReviews[index]
      }
      return null
    } catch (error) {
      throw new Error(`Failed to update review: ${error}`)
    }
  }

  static async delete(id: string) {
    try {
      // const db = await connectToDatabase()
      // const collection = db?.collection("reviews")
      // await collection?.deleteOne({ _id: new ObjectId(id) })

      // Mock implementation
      this.mockReviews = this.mockReviews.filter((r) => r._id !== id)
      return true
    } catch (error) {
      throw new Error(`Failed to delete review: ${error}`)
    }
  }
}
