import type { ActivityLogDocument } from "@/lib/schemas"

export class ActivityLogRepository {
  // Mock mode - replace with MongoDB queries
  private static mockActivityLogs: ActivityLogDocument[] = []

  static async create(activityLog: Omit<ActivityLogDocument, "_id" | "createdAt" | "updatedAt">) {
    try {
      // const db = await connectToDatabase()
      // const collection = db?.collection("activityLogs")
      // const result = await collection?.insertOne({ ...activityLog, createdAt: new Date(), updatedAt: new Date() })
      // return { _id: result?.insertedId, ...activityLog }

      // Mock implementation
      const newLog: ActivityLogDocument = {
        ...activityLog,
        _id: `log-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      this.mockActivityLogs.push(newLog)
      return newLog
    } catch (error) {
      throw new Error(`Failed to create activity log: ${error}`)
    }
  }

  static async getById(id: string) {
    try {
      // const db = await connectToDatabase()
      // const collection = db?.collection("activityLogs")
      // return await collection?.findOne({ _id: new ObjectId(id) })

      // Mock implementation
      return this.mockActivityLogs.find((l) => l._id === id) || null
    } catch (error) {
      throw new Error(`Failed to get activity log: ${error}`)
    }
  }

  static async getByType(type: string) {
    try {
      // const db = await connectToDatabase()
      // const collection = db?.collection("activityLogs")
      // return await collection?.find({ type }).sort({ createdAt: -1 }).toArray()

      // Mock implementation
      return this.mockActivityLogs
        .filter((l) => l.type === type)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    } catch (error) {
      throw new Error(`Failed to get activity logs by type: ${error}`)
    }
  }

  static async getAll() {
    try {
      // const db = await connectToDatabase()
      // const collection = db?.collection("activityLogs")
      // return await collection?.find({}).sort({ createdAt: -1 }).toArray()

      // Mock implementation
      return this.mockActivityLogs.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    } catch (error) {
      throw new Error(`Failed to get activity logs: ${error}`)
    }
  }
}
