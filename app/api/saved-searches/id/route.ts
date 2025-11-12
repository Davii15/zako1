import { SavedSearchRepository } from "@/lib/mongodb/repositories/saved-search-repo"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const search = await SavedSearchRepository.getById(params.id)
    if (!search) return Response.json({ error: "Saved search not found" }, { status: 404 })
    return Response.json(search)
  } catch (error) {
    return Response.json({ error: "Failed to fetch saved search" }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const search = await SavedSearchRepository.update(params.id, body)
    if (!search) return Response.json({ error: "Saved search not found" }, { status: 404 })
    return Response.json(search)
  } catch (error) {
    return Response.json({ error: "Failed to update saved search" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await SavedSearchRepository.delete(params.id)
    return Response.json({ message: "Saved search deleted" })
  } catch (error) {
    return Response.json({ error: "Failed to delete saved search" }, { status: 500 })
  }
}
