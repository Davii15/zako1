import { ReviewRepository } from "@/lib/mongodb/repositories/review-repo"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const review = await ReviewRepository.getById(params.id)
    if (!review) return Response.json({ error: "Review not found" }, { status: 404 })
    return Response.json(review)
  } catch (error) {
    return Response.json({ error: "Failed to fetch review" }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const review = await ReviewRepository.update(params.id, body)
    if (!review) return Response.json({ error: "Review not found" }, { status: 404 })
    return Response.json(review)
  } catch (error) {
    return Response.json({ error: "Failed to update review" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await ReviewRepository.delete(params.id)
    return Response.json({ message: "Review deleted" })
  } catch (error) {
    return Response.json({ error: "Failed to delete review" }, { status: 500 })
  }
}
