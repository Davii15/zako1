import { ReviewRepository } from "@/lib/mongodb/repositories/review-repo"

export async function GET() {
  try {
    // For now, return empty as there's no getAll in ReviewRepository
    return Response.json({ reviews: [] })
  } catch (error) {
    return Response.json({ error: "Failed to fetch reviews" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const review = await ReviewRepository.create(body)
    return Response.json(review, { status: 201 })
  } catch (error) {
    return Response.json({ error: "Failed to create review" }, { status: 500 })
  }
}
