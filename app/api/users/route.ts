import { UserRepository } from "@/lib/mongodb/repositories/user-repo"

export async function GET() {
  try {
    const users = await UserRepository.getAll()
    return Response.json({ success: true, data: users })
  } catch (error) {
    console.error("Error fetching users:", error)
    return Response.json({ success: false, error: "Failed to fetch users" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const result = await UserRepository.create(body)
    return Response.json({ success: true, data: result }, { status: 201 })
  } catch (error) {
    console.error("Error creating user:", error)
    return Response.json({ success: false, error: "Failed to create user" }, { status: 500 })
  }
}
