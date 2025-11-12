import { SavedSearchRepository } from "@/lib/mongodb/repositories/saved-search-repo"

export async function GET(req: Request) {
  try {
    // Extract userId from query params
    const url = new URL(req.url)
    const userId = url.searchParams.get("userId")

    if (!userId) {
      return Response.json({ error: "userId query parameter required" }, { status: 400 })
    }

    const searches = await SavedSearchRepository.getByUserId(userId)
    return Response.json(searches)
  } catch (error) {
    return Response.json({ error: "Failed to fetch saved searches" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const search = await SavedSearchRepository.create(body)
    return Response.json(search, { status: 201 })
  } catch (error) {
    return Response.json({ error: "Failed to create saved search" }, { status: 500 })
  }
}
