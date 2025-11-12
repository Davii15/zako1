import { UserRepository } from "@/lib/mongodb/repositories/user-repo"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params
    const user = await UserRepository.getById(id)
    if (!user) {
      return Response.json({ success: false, error: "User not found" }, { status: 404 })
    }
    return Response.json({ success: true, data: user })
  } catch (error) {
    console.error("Error fetching user:", error)
    return Response.json({ success: false, error: "Failed to fetch user" }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params
    const body = await req.json()
    const result = await UserRepository.update(id, body)
    return Response.json({ success: true, data: result })
  } catch (error) {
    console.error("Error updating user:", error)
    return Response.json({ success: false, error: "Failed to update user" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params
    await UserRepository.delete(id)
    return Response.json({ success: true, message: "User deleted" })
  } catch (error) {
    console.error("Error deleting user:", error)
    return Response.json({ success: false, error: "Failed to delete user" }, { status: 500 })
  }
}
