import type { SavedSearchDocument } from "@/lib/schemas"

export class SavedSearchRepository {
  // Mock mode - replace with MongoDB queries
  private static mockSavedSearches: SavedSearchDocument[] = []

  static async create(savedSearch: Omit<SavedSearchDocument, "_id" | "createdAt" | "updatedAt">) {
    try {
      // const db = await connectToDatabase()
      // const collection = db?.collection("savedSearches")
      // const result = await collection?.insertOne({ ...savedSearch, createdAt: new Date(), updatedAt: new Date() })
      // return { _id: result?.insertedId, ...savedSearch }

      // Mock implementation
      const newSearch: SavedSearchDocument = {
        ...savedSearch,
        _id: `search-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      this.mockSavedSearches.push(newSearch)
      return newSearch
    } catch (error) {
      throw new Error(`Failed to create saved search: ${error}`)
    }
  }

  static async getById(id: string) {
    try {
      // const db = await connectToDatabase()
      // const collection = db?.collection("savedSearches")
      // return await collection?.findOne({ _id: new ObjectId(id) })

      // Mock implementation
      return this.mockSavedSearches.find((s) => s._id === id) || null
    } catch (error) {
      throw new Error(`Failed to get saved search: ${error}`)
    }
  }

  static async getByUserId(userId: string) {
    try {
      // const db = await connectToDatabase()
      // const collection = db?.collection("savedSearches")
      // return await collection?.find({ userId }).sort({ createdAt: -1 }).toArray()

      // Mock implementation
      return this.mockSavedSearches
        .filter((s) => s.userId === userId)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    } catch (error) {
      throw new Error(`Failed to get saved searches: ${error}`)
    }
  }

  static async update(id: string, updates: Partial<SavedSearchDocument>) {
    try {
      // const db = await connectToDatabase()
      // const collection = db?.collection("savedSearches")
      // await collection?.updateOne({ _id: new ObjectId(id) }, { $set: { ...updates, updatedAt: new Date() } })
      // return await this.getById(id)

      // Mock implementation
      const index = this.mockSavedSearches.findIndex((s) => s._id === id)
      if (index !== -1) {
        this.mockSavedSearches[index] = { ...this.mockSavedSearches[index], ...updates, updatedAt: new Date() }
        return this.mockSavedSearches[index]
      }
      return null
    } catch (error) {
      throw new Error(`Failed to update saved search: ${error}`)
    }
  }

  static async delete(id: string) {
    try {
      // const db = await connectToDatabase()
      // const collection = db?.collection("savedSearches")
      // await collection?.deleteOne({ _id: new ObjectId(id) })

      // Mock implementation
      this.mockSavedSearches = this.mockSavedSearches.filter((s) => s._id !== id)
      return true
    } catch (error) {
      throw new Error(`Failed to delete saved search: ${error}`)
    }
  }
}
