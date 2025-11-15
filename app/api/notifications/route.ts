import { MongoDatabase } from "@/lib/mongodb/db"

export async function GET() {
  try {
    const collection = await MongoDatabase.notifications()
    const notifications = await collection?.find({}).toArray()
    return Response.json({ success: true, data: notifications || [] })
  } catch (error) {
    console.error("Error fetching notifications:", error)
    return Response.json({ success: false, error: "Failed to fetch notifications" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const collection = await MongoDatabase.notifications()
    const result = await collection?.insertOne(body)
    return Response.json({ success: true, data: result }, { status: 201 })
  } catch (error) {
    console.error("Error creating notification:", error)
    return Response.json({ success: false, error: "Failed to create notification" }, { status: 500 })
  }
}
