// User Repository - Ready for MongoDB activation
// Replace mock data calls with actual MongoDB queries

import type { User, UserRole } from "@/lib/types"
import { mockUsers } from "@/lib/data" // Currently using mock, will be replaced

export class UserRepository {
  // Create user
  static async create(user: Omit<User, "id" | "createdAt">): Promise<User> {
    // MongoDB implementation:
    // const db = await connectToDatabase()
    // const result = await db?.collection('users').insertOne({
    //   ...user,
    //   createdAt: new Date(),
    // })
    // return { ...user, id: result?.insertedId.toString() }

    // Mock implementation
    const newUser = { ...user, id: Date.now().toString(), createdAt: new Date() }
    mockUsers.push(newUser)
    return newUser
  }

  // Get user by ID
  static async getById(id: string): Promise<User | null> {
    // MongoDB implementation:
    // const db = await connectToDatabase()
    // const user = await db?.collection('users').findOne({ _id: new ObjectId(id) })
    // return user || null

    // Mock implementation
    return mockUsers.find((u) => u.id === id) || null
  }

  // Get user by email
  static async getByEmail(email: string): Promise<User | null> {
    // MongoDB implementation:
    // const db = await connectToDatabase()
    // const user = await db?.collection('users').findOne({ email })
    // return user || null

    // Mock implementation
    return mockUsers.find((u) => u.email === email) || null
  }

  // Get all users
  static async getAll(role?: UserRole): Promise<User[]> {
    // MongoDB implementation:
    // const db = await connectToDatabase()
    // const query = role ? { role } : {}
    // return await db?.collection('users').find(query).toArray() || []

    // Mock implementation
    return role ? mockUsers.filter((u) => u.role === role) : mockUsers
  }

  // Update user
  static async update(id: string, updates: Partial<User>): Promise<User | null> {
    // MongoDB implementation:
    // const db = await connectToDatabase()
    // await db?.collection('users').updateOne(
    //   { _id: new ObjectId(id) },
    //   { $set: { ...updates, updatedAt: new Date() } }
    // )
    // return this.getById(id)

    // Mock implementation
    const user = mockUsers.find((u) => u.id === id)
    if (user) {
      Object.assign(user, updates)
    }
    return user || null
  }

  // Verify user
  static async verify(id: string): Promise<boolean> {
    // MongoDB implementation:
    // const db = await connectToDatabase()
    // const result = await db?.collection('users').updateOne(
    //   { _id: new ObjectId(id) },
    //   { $set: { verified: true } }
    // )
    // return result?.modifiedCount === 1

    // Mock implementation
    const user = mockUsers.find((u) => u.id === id)
    if (user) {
      user.verified = true
    }
    return !!user
  }

  // Delete user
  static async delete(id: string): Promise<boolean> {
    // MongoDB implementation:
    // const db = await connectToDatabase()
    // const result = await db?.collection('users').deleteOne({ _id: new ObjectId(id) })
    // return result?.deletedCount === 1

    // Mock implementation
    const index = mockUsers.findIndex((u) => u.id === id)
    if (index > -1) {
      mockUsers.splice(index, 1)
      return true
    }
    return false
  }
}
